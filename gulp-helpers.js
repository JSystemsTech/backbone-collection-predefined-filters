'use strict';
var eventStream = require('event-stream');
var badgeUrl = require('shields-badge-url-custom');
var _ = require('underscore');
var fs = require('fs');
var util = require('gulp-util');
var jsdocParser = require('comment-parser');

var buildMDTableRowFromCommentSection = function(commentSection) {
	var Notes = commentSection.description;
	var ExpectedParameters = [];
	var FunctionName = '';
	_.each(commentSection.tags, function(tag) {
		switch (tag.tag) {
			case 'declaration':
				FunctionName = tag.name;
				break;
			case 'property':
				ExpectedParameters.push('**' + tag.name + '** (*' + tag.type + '* - ' + tag.description + ')');
				break;
			default:
				break;
		}
	});
	return '|' + FunctionName + '|' + ExpectedParameters.join('<br/>') + '|' + Notes + '|';
};
var buildOptionsTable = function(commentSection) {
	var tableHeader = '| Option Name | Expected Input Type | Default Value | Notes |\n' +
		'|     ---	    |	---    			  | --- | --- |\n';
	var rows = [];
	_.each(commentSection.tags, function(tag) {
		var defaultValue = '';
		var description = tag.description;
		if (tag.description.indexOf('{{default}}') !== -1) {
			defaultValue = tag.description.split('{{default}}')[1];
			description = tag.description.split('{{default}}')[0];
		}
		rows.push('|' + tag.name + '|' + tag.type + '|' + defaultValue + '|' + description + '|');
	});
	return '##### Configuarable Option Parameters\n' + tableHeader + rows.join('\n') + '\n\n';
};
var addFilterOptionsTable = function(toTitleCase) {
	var transform = function(file, callback) {
		var filterName = file.path.split('filter_templates/')[1].split('/TEMPLATE_DOC.md')[0];
		var filterTitle = toTitleCase(filterName.replace('_', ' ')) + ' Filter Template';
		var contents = String(file.contents);
		if (contents.trim() === '') {
			contents = 'documentation for ' + filterTitle + ' still under construction';
		}
		var inputPath = './src/filter_templates/' + filterName + '/' + filterName.replace('_', '-') + '-filter.js';
		getFile(inputPath, function(data) {
			var output = String(file.contents);
			var tableRows = [];
			var constructorText = '';
			var optionsTable = '';
			_.each(jsdocParser(data), function(commentSection) {
				if (commentSection.description.indexOf('{{constructor}}') !== -1) {
					constructorText = commentSection.description.split('{{constructor}}')[1] + '\n\n';
					optionsTable = buildOptionsTable(commentSection);
				}
			});
			var examplesInputPath = './src/filter_templates/' + filterName + '/examples-doc.js';
			getFile(examplesInputPath, function(examples) {

				var codeExamples = '<details>\n<summary>Code Examples\n</summary>\n``` javascript\n' + examples + '\n```\n</details>'
				contents = constructorText.trim() + '\n' + optionsTable + '\n' + codeExamples + '\n' + contents + '\n\n[Return to Top](#pagetop)';
				file.contents = new Buffer(contents);
				callback(null, file);
			});
		});
	}
	return eventStream.map(transform);
};
var buildMDTablefromJSDoc = function(mainSource) {
	var tableHeader = '#### Available Collection Functions\n' +
		'| Function Name | Expected Parameters | Notes |\n' +
		'|     ---	    |	---    			  | --- |\n';
	var transform = function(file, callback) {
		getFile(mainSource, function(data) {
			var output = String(file.contents);
			var tableRows = [];
			var constructorText = '';
			var optionsTable = '';
			_.each(jsdocParser(data), function(commentSection) {
				if (commentSection.description.indexOf('{{constructor}}') !== -1) {
					constructorText = commentSection.description.split('{{constructor}}')[1] + '\n\n';
					optionsTable = buildOptionsTable(commentSection);
				} else {
					tableRows.push(buildMDTableRowFromCommentSection(commentSection));
				}

			});
			output = output.replace('{{>available-collection-functions}}', constructorText + optionsTable + tableHeader + tableRows.join('\n'));
			file.contents = new Buffer(output);
			callback(null, file);
		});
	}
	return eventStream.map(transform);
};
var getColorFromPercent = function(percent) {
	var color = 'lightgrey';
	if (percent <= 50) {
		color = 'red'
	} else if (percent <= 60) {
		color = 'orange'
	} else if (percent <= 70) {
		color = 'yellow'
	} else if (percent <= 80) {
		color = 'yellowgreen'
	} else if (percent <= 90) {
		color = 'green'
	} else if (percent <= 100) {
		color = 'brightgreen'
	}
	return color;
};
var getBadgeUrl = function(report, label, options) {
	if (!_.isUndefined(options)) {
		return badgeUrl(options).image
	}
	var percent = (report.covered / report.total) * 100;
	var status = '' + report.covered + '%2F' + report.total + '%20' + percent + '%25';
	return badgeUrl({
		'label': label,
		'status': status,
		'color': getColorFromPercent(percent)
	}).image;
};
var setBadgeUrls = function() {
	var data = require('./coverage-summary.json');
	var testOutput = require('./mocha-output.json');
	var passed = 0;
	var failed = 0;
	var total = 0;
	_.each(testOutput, function(testBlock) {
		_.each(testBlock, function(test) {
			total++;
			if (test === 'PASSED') {
				passed++;
			} else {
				failed++;
			}
		});
	});
	var badgeUrls = {
		"coverage-lines-badge": getBadgeUrl(data.total.lines, 'Lines'),
		"coverage-statements-badge": getBadgeUrl(data.total.statements, 'Statements'),
		"coverage-branches-badge": getBadgeUrl(data.total.branches, 'Branches'),
		"coverage-functions-badge": getBadgeUrl(data.total.functions, 'Functions'),
		"tests-passed-badge": getBadgeUrl(null, null, {
			'label': 'Tests%20Passed',
			'status': passed.toString(),
			'color': getColorFromPercent((passed / total) * 100)
		}),
		"tests-failed-badge": getBadgeUrl(null, null, {
			'label': 'Tests%20Failed',
			'status': failed.toString(),
			'color': getColorFromPercent((passed / total) * 100)
		}),
		"tests-total-badge": getBadgeUrl(null, null, {
			'label': 'Number%20of%20Tests',
			'status': total.toString(),
			'color': 'blue'
		})
	};
	var valueToAppend = '\n'
	_.each(badgeUrls, function(url, label) {
		valueToAppend = valueToAppend + '\n[' + label + ']: ' + url;
	});

	function transform(file, callback) {
		file.contents = new Buffer(String(file.contents) + valueToAppend);
		callback(null, file);
	}
	return eventStream.map(transform);
};
var getFile = function(path, callback) {
	fs.readFile(path, 'utf8', function(err, data) {
		if (err) {
			return callback('');
		}
		return callback(data);
	});
}
var setFilterTemplateDocs = function(tableOfContentsRows, filterTemplateRows) {
	var transform = function(file, callback) {
		getFile('./README_TEMPLATE.md', function(data) {
			data = data.replace('{{>filter-templates-table-of-contents-content}}', tableOfContentsRows.join('\n')).replace('{{>filter-templates-content}}', filterTemplateRows.join('\n'));
			file.contents = new Buffer(data);
			callback(null, file);
		});

	}
	return eventStream.map(transform);
};
var getVersionNumber = function(buildNumber, settingPackageDotJson) {
	var transform = function(file, callback) {
		var data = JSON.parse(String(file.contents));
		file.contents = new Buffer(data.baseVersion + '.' + buildNumber);
		if(settingPackageDotJson){
			data.version = data.baseVersion + '.' + buildNumber
			file.contents = new Buffer(JSON.stringify(data));
		}
		callback(null, file);
	}
	return eventStream.map(transform);
};
var setBuildHistory = function(tableOfContentsRows, filterTemplateRows) {
	var buildHistory = require('./build_history');
	var buildHistoryTable = '<table><tr><th>Build Number</th><th>Result</th></tr>\n';
	var sortedBuilds = Object.keys(buildHistory).sort(function(a, b) {
		return parseInt(b) - parseInt(a);
	});
	_.each(sortedBuilds, function(build) {
		var travisURL = 'https://travis-ci.org/JSystemsTech/backbone-collection-predefined-filters/builds';
		buildHistoryTable = buildHistoryTable + '<tr><td colspan="2"><a href="' + travisURL + '"><img src="' + buildHistory[build].badgeUrl + '"/></a></td></tr>\n';
	});
	var transform = function(file, callback) {
		var data = String(file.contents).replace('{{>build-history-content}}', buildHistoryTable + '</table>\n');
		file.contents = new Buffer(data);
		callback(null, file);
	};
	return eventStream.map(transform);
};
var addBuildHistory = function(buildNumber) {
	var data = require('./coverage-summary.json');
	var testOutput = require('./mocha-output.json');
	var VERSION_NUMBER = require('./package.json').version;
	var passed = 0;
	var failed = 0;
	var total = 0;
	var status = 'Passed';
	var percent = 100;
	if (failed > 0) {
		status = 'Failed';
		percent = 0;
	}
	_.each(testOutput, function(testBlock) {
		_.each(testBlock, function(test) {
			total++;
			if (test === 'PASSED') {
				passed++;
			} else {
				failed++;
			}
		});
	});
	var transform = function(file, callback) {
		var buildNumberLabel = 'TravisCI%20' + VERSION_NUMBER + '.' + buildNumber;
		var data = JSON.parse(String(file.contents));
		data[buildNumber] = {
			badgeUrl: getBadgeUrl(null, null, {
				'label': buildNumberLabel,
				'status': status,
				'color': getColorFromPercent(percent)
			})
		}
		file.contents = new Buffer(JSON.stringify(data));
		callback(null, file);
	}
	return eventStream.map(transform);
};
module.exports = {
	setBadgeUrls: setBadgeUrls,
	setFilterTemplateDocs: setFilterTemplateDocs,
	addBuildHistory: addBuildHistory,
	setBuildHistory: setBuildHistory,
	getVersionNumber: getVersionNumber,
	buildMDTablefromJSDoc: buildMDTablefromJSDoc,
	addFilterOptionsTable: addFilterOptionsTable
};