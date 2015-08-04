'use strict'

var gulp = require('gulp');
var compass = require('gulp-compass');

gulp.task('compass', function () {
	return gulp.src('./scss/**/*.scss')
		.pipe(compass({
			css: 'build/css',
			sass: 'scss',
			require: ['susy']
		}))
		.on('error', function(err) {
			return;
		});
});