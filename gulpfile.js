var gulp = require('gulp'),
  sass = require('gulp-sass'),
  browserSync = require('browser-sync').create(),
  pug = require('gulp-pug'),
  prettyHtml = require('gulp-pretty-html');

gulp.task('sass', function() {
  return gulp.src('src/scss/main.scss')
  .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
  .pipe(gulp.dest('src/css'))
  .pipe(browserSync.stream());
});

gulp.task('pug', function() {
  return gulp.src('src/pug/*.pug')
  .pipe(pug())
  .pipe(prettyHtml({indent_size: 2, extra_linears: []}))
  .pipe(gulp.dest('src'))
  .pipe(browserSync.stream());
});

gulp.task('serve', ['sass', 'pug'], function() {
  browserSync.init({
    server: "src/"
  });
  gulp.watch("src/scss/**/*.scss", ['sass']);
  gulp.watch("src/pug/*.pug", ['pug']);
  gulp.watch("src/*.html").on('change', browserSync.reload);
});

gulp.task('default', ['serve']);

gulp.task('copy', function(){
  return gulp.src(['src/**/*.*', '!src/scss/**/*.*', '!src/pug/**.*'])
  .pipe(gulp.dest('app/'));
});
