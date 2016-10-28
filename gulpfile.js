var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    jshint = require('gulp-jshint'),
    del = require('del');

// 格式检查
gulp.task('jshint', function(){
    return gulp.src('lib/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// 压缩
gulp.task('minifyjs', function () {
    return gulp.src('lib/**/*.js')
        .pipe(concat('jquery.learn.js'))
        .pipe(gulp.dest('var/build/'))
        .pipe(rename('jquery.learn.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('var/build/'));
});

// 监测
gulp.task('watch', function(){
    gulp.watch('lib/**/*.js', ['jshint', ['minifyjs']])
});

// 清理旧文件
gulp.task('clear', function(){
    del([
        'var/build/jquery.learn.js',
        'var/build/jquery.learn.min.js'
    ]);
});

gulp.task('default', ['jshint'], function(){
    gulp.start('minifyjs');
});
