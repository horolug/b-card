'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var scsslint = require('gulp-scss-lint');

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

gulp.task('watch', function() {
  gulp.watch('./sass/**/*.scss', gulp.series('sass'));
});
