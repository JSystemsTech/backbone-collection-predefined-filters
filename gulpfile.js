'use strict';

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var mocha = require('gulp-mocha');
var concat = require('gulp-concat');
var flatmap = require('gulp-flatmap');
var istanbul = require('gulp-istanbul');
var util = require('gulp-util');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var path = require('path');
var eventStream = require('event-stream');
var badgeUrl = require('shields-badge-url-custom');
var _ = require('underscore');
var gulpHelpers = require('./gulp-helpers');
var jsdocParser = require('comment-parser');

gulp.task('test', function() {
    return gulp.src('./src/**/*-spec.js', {
            read: false
        })
        .pipe(mocha({
            require: [path.resolve('./mocha-helper.js')]
        }));
});

gulp.task('coverage', function() {
    return gulp.src(['./src/**/*.js', '!./src/**/*-spec.js'])
        .pipe(istanbul())
        .pipe(istanbul.hookRequire())
        .on('finish', function() {
            gulp.src(['./src/**/*-spec.js'])
                .pipe(mocha({
                    require: [path.resolve('./mocha-helper.js')]
                }))
                .pipe(istanbul.writeReports())
        });
});
gulp.task('buildreadme', function() {
    var tableOfContentsRows = [];
    var filterTemplateRows = [];
    var mainSource = './src/backbone-collection-predefined-filters.js';
    var toTitleCase = function(str) {
        return str.replace(/\w\S*/g, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }
    return gulp.src(['./src/filter_templates/*/TEMPLATE_DOC.md'], {
            base: './src/filter-templates/'
        })
        .pipe(gulpHelpers.addFilterOptionsTable(toTitleCase))
        .pipe(flatmap(function(stream, file) {
            var filterName = file.path.split('filter_templates/')[1].split('/TEMPLATE_DOC.md')[0];
            var filterTag = 'filter-templates-' + filterName.replace('_', '-');
            var filterTitle = toTitleCase(filterName.replace('_', ' ')) + ' Filter Template';
            var tableOfContentsRow = '  * [' + filterTitle + '](#' + filterTag + ')';
            var contents = String(file.contents);
            var filterTemplateRow = '#### <a name="' + filterTag + '"></a>' + filterTitle + '\n   ' + contents + '\n';
            tableOfContentsRows.push(tableOfContentsRow);
            filterTemplateRows.push(filterTemplateRow);
            return stream;
        }))
        .pipe(concat('result.md', {
            newLine: '\n'
        }))
        .pipe(gulpHelpers.setFilterTemplateDocs(tableOfContentsRows, filterTemplateRows))
        .pipe(gulpHelpers.setBadgeUrls())
        .pipe(gulpHelpers.setBuildHistory())
        .pipe(gulpHelpers.buildMDTablefromJSDoc(mainSource))
        .pipe(rename('README.md'))
        .pipe(buffer())
        .pipe(gulp.dest('./'));
});
gulp.task('updatebuildhistory', function() {
    return gulp.src(['./build_history.json'])
        .pipe(gulpHelpers.addBuildHistory(util.env.buildnumber))
        .pipe(buffer())
        .pipe(gulp.dest('./'));
});
gulp.task('documentation', function() {
    return gulp.src(['./src/backbone-collection-predefined-filters.js'])
        .pipe(gulpHelpers.buildMDTablefromJSDoc())
        .pipe(buffer())
        .pipe(rename('./README_TEMPLATE.md'))
        .pipe(gulp.dest('./'));
});
gulp.task('getversionnumber', function() {
    return gulp.src(['./package.json'])
        .pipe(gulpHelpers.getVersionNumber(util.env.buildnumber))
        .pipe(buffer())
        .pipe(rename('version_number.txt'))
        .pipe(gulp.dest('./'));
});
gulp.task('browserify', function() {
    var input = './src/backbone-collection-predefined-filters.js';
    return browserify({
            entries: [path.resolve(input)],
            standalone: 'backbone-collection-predefined-filters'
        })
        .bundle()
        .pipe(source(input))
        .pipe(rename('backbone-collection-predefined-filters.js'))
        .pipe(buffer())
        .pipe(gulp.dest('./dist'))
        .pipe(rename('backbone-collection-predefined-filters.min.js'))
        .pipe(uglify({
            compress: {
                dead_code: true
            }
        }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['browserify']);