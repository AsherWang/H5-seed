var gulp = require('gulp');
var inlinesource = require('gulp-inline-source');
var postcss = require('gulp-postcss');
var px2rem = require('postcss-px2rem');


gulp.task('cphtml', function () {
    return gulp.src('./src/*.html')
        .pipe(gulp.dest('./build'));
});

gulp.task('postcss', function() {
    var processors = [px2rem({remUnit: 75})];
    return gulp.src(['./src/*.css',"!reset.css"])
      .pipe(postcss(processors))
      .pipe(gulp.dest('./build'));
});

gulp.task('inline', ['cphtml','postcss'], function () {
    return gulp.src('./build/*.html')
        .pipe(inlinesource())
        .pipe(gulp.dest('./dist'));
});


gulp.task('default',['inline']);

// watch files' change
gulp.watch(['./src/*.css','./src/*.html'], ['inline']);
