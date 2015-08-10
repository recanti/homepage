'use strict'

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var browsersync = require('browser-sync').create();
var compass = require('gulp-compass');

// this will compile sass files to css and move them to the build folder
// afterwards, call browsersync
gulp.task('compass', function () {
	return gulp.src('./scss/**/*.scss')
		.pipe(compass({
			css: 'build/css',
			sass: 'scss',
			require: ['susy']
		}))
		.on('error', function(err) {
			console.log(err);
			this.emit('end');
		})
		.pipe(browsersync.stream());
});

// this will simply move the html to the build folder
gulp.task('html', function() {
	return gulp.src(['*.html'])
		.pipe(gulp.dest('build'))
		.on('error', function(err) {
			console.log(err);
			this.emit('end');
		});
});

// this will copy the resources folder whenever there is a change
gulp.task('resources', function() {
	return gulp.src(['./resources/**/*.*'])
		.pipe(gulp.dest('build/resources'))
		.on('error', function(err) {
			console.log(err);
			this.emit('end');
		});
})

// watches for changes and runs the appropriate task
gulp.task('watch', function() {

	browsersync.init({
		server: "./build/"
	});

	gulp.watch('scss/**/*.scss', ['compass']);
	gulp.watch('resources/**/*.*', ['resources']);
	gulp.watch('*.html', ['html']).on('change', browsersync.reload);
});

gulp.task('default', ['compass', 'watch']);