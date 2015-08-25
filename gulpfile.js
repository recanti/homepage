'use strict'

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var browsersync = require('browser-sync').create();
var compass = require('gulp-compass');
var svgstore = require('gulp-svgstore');
var svgmin = require('gulp-svgmin');
var inject = require('gulp-inject');
var jsmin = require('gulp-jsmin');

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

// this task will compress svgs into one file and inject them into the page
gulp.task('svgstore', function() {

	var svgs = gulp
		.src('resources/images/*.svg')
		.pipe(svgmin())
		.pipe(svgstore({ inlineSvg: true }));

	function fileContents(filePath, file) {
		return file.contents.toString();
	}

	return gulp.src(["index.html"])
		.pipe(inject(svgs, {transform: fileContents}))
		.pipe(gulp.dest('build'))
		.on('error', function(err) {
			this.emit('end');
		});
});


gulp.task('reload', function() {
	browsersync.init({
		server: "./build/"
	});
});

gulp.task('js', function() {

	return gulp.src(["./js/**/*.js"])
		.pipe(jsmin())
		.pipe(gulp.dest('build/js'))
		.on('error', function(err) {
			console.log(err);
			this.emit('end');
		});;
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
	gulp.watch('js/**/*.js', ['js']).on('change', browsersync.reload);
	gulp.watch('resources/images/*.svg', ["svgstore"]);
	gulp.watch('*.html', ['svgstore']).on('change', browsersync.reload);
});

gulp.task('default', ['compass', 'svgstore', 'js', 'resources'], browsersync.reload);