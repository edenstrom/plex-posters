var gulp = require('gulp');
var sass = require('gulp-sass');
var webpack = require('webpack');
var devConfig = require('./webpack.config');
var config = require('./webpack.config-production');


gulp.task('css', function() {
  return gulp.src('./scss/app.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('build', ['css'], function(cb) {
  webpack(config, function(err, res) {
    console.log(err, res);
    cb();
  });
});

gulp.task('build:dev', function(cb) {
  webpack(devConfig, function(err, res) {
    console.log(err, res);
    cb();
  });
});
