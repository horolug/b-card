'use strict';

var gulp = require('gulp');
var sass = require('gulp-dart-sass');
// var scsslint = require('gulp-scss-lint');
// var server = require('gulp-webserver');


// sass.compiler = require('node-sass');

gulp.task('sass', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

gulp.task('lint-css', function lintCssTask() {
  const gulpStylelint = require('gulp-stylelint');

  return gulp
    .src('sass/**/*.scss')
    configFile('.stylelintrc.yml')
    .pipe(gulpStylelint({
      reporters: [
        {formatter: 'string', console: true}
      ]
    }));
});

// gulp.task('server', function() {
//   gulp.src('app')	// <-- your app folder
//     .pipe(server({
//       livereload: true,
//       open: true,
//       port: 6000	// set a port to avoid conflicts with other local apps
//     }));
// });

gulp.task('watch', function() {
  gulp.watch('./sass/**/*.scss', gulp.series('sass'));
});
