'use strict';

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var path = require('path');
var eventStream = require('event-stream');
var badgeUrl = require('shields-badge-url-custom');
var _ = require('underscore');

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
    var input = path.resolve('./documentation/coverage-summary.json');
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
        // you're going to receive Vinyl files as chunks
        function transform(file, cb) {
            // read and modify file contents
            file.contents = new Buffer(String(file.contents) + valueToAppend);

            // if there was some error, just pass as the first parameter here
            cb(null, file);
        }

        // returning the map will cause your transform function to be called
        // for each one of the chunks (files) you receive. And when this stream
        // receives a 'end' signal, it will end as well.
        // 
        // Additionally, you want to require the `event-stream` somewhere else.
        return eventStream.map(transform);
    };
    return gulp.src('./README_DEV.md')
        .pipe(setBadgeUrls())
        .pipe(rename('README.md'))
        .pipe(buffer())
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