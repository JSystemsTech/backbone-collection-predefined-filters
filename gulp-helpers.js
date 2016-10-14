'use strict';
var eventStream = require('event-stream');
var badgeUrl = require('shields-badge-url-custom');
var _ = require('underscore');
var fs = require('fs');

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
			callback('');
		}
		callback(data);
	});
}
var setFilterTemplateDocs = function(tableOfContentsRows, filterTemplateRows) {
	var transform = function(file, callback) {
		getFile('./README_DEV.md', function(data) {
			data = data.replace('<#filter-templates-table-of-contents-content>', tableOfContentsRows.join('\n')).replace('<#filter-templates-content>', filterTemplateRows.join('\n'));
			file.contents = new Buffer(data);
			callback(null, file);
		});

	}
	return eventStream.map(transform);
};

module.exports = {
	setBadgeUrls: setBadgeUrls,
	setFilterTemplateDocs: setFilterTemplateDocs
};