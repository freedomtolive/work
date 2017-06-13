//引入插件
var gulp = require('gulp'),
    minifycss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    htmlmin = require('gulp-htmlmin'),
    del = require('del');

//合并、压缩、重命名css
gulp.task('minifycss', function() {
    return gulp.src('css/*.css')      //压缩的文件
        .pipe(gulp.dest('minified/css'))   //输出文件夹
        .pipe(minifycss());   //执行压缩
});

//压缩js
gulp.task('minifyjs', function() {
    return gulp.src(['js/jquery.min.js','js/editorCom.js','js/colpick.js','js/plugin.js','js/jquery-ui.js','js/power-slider.min.js','js/filterShow.js','js/index.js'])
        .pipe(concat('main.js'))    //合并所有js到main.js
        .pipe(gulp.dest('minified/js'))    //输出main.js到文件夹
        .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
        .pipe(uglify())    //压缩
        .pipe(gulp.dest('minified/js'));  //输出
});

//执行压缩前，先删除文件夹里的内容
gulp.task('clean', function(cb) {
    del(['minified/css', 'minified/js'], cb)
});

//默认命令，在cmd中输入gulp后，执行的就是这个命令
gulp.task('default', function() {
    gulp.start('minifycss', 'minifyjs');
});