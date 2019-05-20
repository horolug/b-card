'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var scsslint = require('gulp-scss-lint');
var server = require('gulp-webserver');


sass.compiler = require('node-sass');

gulp.task('sass', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

gulp.task('scss-lint', function() {
  return gulp.src('./sass/**/*.scss')
    .pipe(scsslint());
});

gulp.task('server', function() {
  gulp.src('app')	// <-- your app folder
    .pipe(server({
      livereload: true,
      open: true,
      port: 6000	// set a port to avoid conflicts with other local apps
    }));
});

gulp.task('watch', function() {
  gulp.watch('./sass/**/*.scss', gulp.series('sass'));
});
