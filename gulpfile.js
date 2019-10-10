
var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    maps = require('gulp-sourcemaps'),
     del = require('del'),
     autoprefixer = require('gulp-autoprefixer'),
     browserSync = require('browser-sync').create(),
     htmlreplace = require('gulp-html-replace'),
     cssmin = require('gulp-cssmin');

gulp.task("concatScripts", function() {
    return gulp.src([
        'assets/js/vendor/jquery-3.3.1.min.js',
        'assets/js/vendor/popper.min.js',
        'assets/js/vendor/bootstrap.min.js'
        ])
    .pipe(maps.init())
    .pipe(concat('main.js'))
    .pipe(maps.write('./'))
    .pipe(gulp.dest('assets/js'))
    .pipe(browserSync.stream());
});

gulp.task("minifyScripts", ["concatScripts"], function() {
  return gulp.src("assets/js/main.js")
    .pipe(uglify())
    .pipe(rename('main.min.js'))
    .pipe(gulp.dest('docs/assets/js'));
});

gulp.task('compileSass', function() {
  return gulp.src([
    'assets/css/main.scss'
    ])
    .pipe(sass())
    .pipe(gulp.dest('src/css/'))
    .pipe(browserSync.stream());
});

gulp.task("minifyCss", ["compileSass"], function() {
  return gulp.src("assets/css/main.css")
    .pipe(cssmin())
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest('docs/assets/css/'));
});


gulp.task('serve', function() {
    browserSync.init({
        server: './'
    });
});

gulp.watch(['assets/css/main.css'], ['minifyCss']);
gulp.watch(['assets/js/vendor/jquery-3.3.1.min.js',
'assets/js/vendor/popper.min.js',
'assets/js/vendor/bootstrap.min.js'], ['concatScripts']);
gulp.watch('./*.html').on('change', browserSync.reload);

// Start server on default task

gulp.task('default',['minifyScripts','minifyCss','serve']);