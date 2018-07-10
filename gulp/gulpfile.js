const gulp = require('gulp');
      rename = require('gulp-rename'),
      minifycss = require('gulp-minify-css'),
      minifyhtml = require("gulp-minify-html"),
      jshint = require('gulp-jshint'),
      uglify = require('gulp-uglify'),
      concat = require('gulp-concat'),
      less = require('gulp-less'),
      cssmin = require('gulp-minify-css'),
      changed  = require('gulp-changed'),//检查改变状态 
      imageMin = require('gulp-imagemin'),//压缩图片
      pngquant = require('imagemin-pngquant'), // 深度压缩
      del = require('del'),
      babel = require('gulp-babel'),
      gutil = require('gulp-util'),
      fileinclude = require('gulp-file-include'), //合并html
      rev = require('gulp-rev'), // 对文件名加MD5后缀
      sourcemaps = require('gulp-sourcemaps'),
      revCollector = require('gulp-rev-collector'), // 路径替换
      notify = require('gulp-notify'), //提示信息 
      autoprefixer = require('gulp-autoprefixer'),//自动添加版本号
      zip = require('gulp-zip'), // 压缩为.zip文件
      browserSync = require("browser-sync").create();//浏览器实时刷新

// css合并压缩
gulp.task('minifyCss',function() {
    gulp.src("src/css/*.css")
        .pipe(cssmin({
            advanced: false,//类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
            compatibility: 'ie7',//保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
            keepBreaks: true,//类型：Boolean 默认：false [是否保留换行]
            keepSpecialComments: '*'
            //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
        }))
        .pipe(sourcemaps.init())  //???????????????
        .pipe(autoprefixer())
        .pipe(concat('main.css'))
        .pipe(minifycss())
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.reload({stream:true}));
});

// js合并压缩
// gulp.task('minifyJs', function() {
//   gulp.src('src/js/*.js')
//     .pipe(concat('index.js'))
//     .pipe(uglify())
//     .pipe(gulp.dest('dist/js'))
//     .pipe(browserSync.reload({stream:true}));
// });

// 压缩html
gulp.task('minifyHtml', function () {
  var options = {
      removeComments: true,//清除HTML注释
      collapseWhitespace: true,//压缩HTML
      collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
      removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
      removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
      removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
      minifyJS: true,//压缩页面JS
      minifyCSS: true//压缩页面CSS
  };
  gulp.src('src/html/*.html')
      .pipe(fileinclude())
      .pipe(minifyhtml(options))
      .pipe(gulp.dest('dist'))
      .pipe(browserSync.reload({stream:true}));
});

// 编译less
gulp.task('less',function(){
  gulp.src('src/less/**.less')
    .pipe(less())
    .pipe(concat('main.css'))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/less'))
    .pipe(browserSync.reload({stream:true}));
})


// 监视网页的html自动刷新
gulp.task('html', function () {
  gulp.src('src/html/*.html')
    .pipe(fileinclude())
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload());
});

//删除dist下的所有文件  
gulp.task('delete',function(cb){  
  return del(['dist/*','!dist/images'],cb);  
})  

// 压缩图片  
gulp.task('imagesMin', function () {  
    gulp.src('src/images/*.*')  
        .pipe(changed('dist/images', {hasChanged: changed.compareSha1Digest}))  
        .pipe(imageMin({  
            progressive: true,// 无损压缩JPG图片  
            svgoPlugins: [{removeViewBox: false}], // 不移除svg的viewbox属性  
            use: [pngquant()] // 使用pngquant插件进行深度压缩  
        }))  
        .pipe(gulp.dest('dist/images'))  
        .pipe(browserSync.reload({stream:true}));  
});  

// ES6转化为ES5并压缩js
gulp.task("minifyJs", function () {
    return gulp.src("src/js/*.js")// ES6 源码存放的路径
        .pipe(babel()) 
        .pipe(concat('index.js'))   //合并js
        .pipe(uglify())     //压缩js
        .pipe(gulp.dest("dist/js")) //存放路径
        .pipe(browserSync.reload({stream:true})); //热更新
});


gulp.task("php",function(){
    gulp.src("src/*.php")
        .pipe(gulp.dest('dist'))
});

//启动热更新  
gulp.task('serve', ['delete'], function() {  
  gulp.start('less','minifyHtml','minifyCss','imagesMin','minifyJs','php');  
//   browserSync.init({  
//       port: 8888,  
//       host: '127.0.0.1',
//       server: {  
//           baseDir: ['dist']  
//       }  
//   });  

    //监控文件变化，自动更新  
    gulp.watch('src/less/*.less', ['less']);  
    gulp.watch('src/html/min/*.html', ['minifyHtml']);  
    gulp.watch('src/css/*.css', ['minifyCss']);  
    gulp.watch('src/images/*.*', ['imagesMin']); 
    gulp.watch('src/js/*.js', ['minifyJs']);
    gulp.watch('src/*.php',['php']);
});  

//打包
gulp.task('revCss',['minifyCss'], function () {
    gulp.src('dist/css/*.css')
    .pipe(rename({suffix: '.min'}))
    .pipe(rev())  // 文件名加MD5后缀
    .pipe(gulp.dest('./build/css'))
    .pipe(rev.manifest()) // 生成一个rev-manifest.json
    .pipe(gulp.dest("rev/css"))
})

gulp.task('revJs',['minifyJs'], function () {
    gulp.src('dist/js/*.js')
    .pipe(rename({ suffix: '.min' })) // 添加后缀.min
    .pipe(rev())  // 文件名加MD5后缀
    .pipe(gulp.dest('./build/js'))
    .pipe(rev.manifest()) // 生成一个rev-manifest.json
    .pipe(gulp.dest("rev/js"))
})


gulp.task('revHtml',['minifyHtml'], function () {
    gulp.src(['./rev/**/*.json', './dist/*.html']) // 找到相应生成的rev-manifest.json
        .pipe(revCollector()) // 替换path.html中的名字
        .pipe(gulp.dest('./build'))
        .pipe(notify({ message: '打包成功' }))
})


gulp.task('collect', ['revJs', 'revCss'], function () {
    gulp.run('revHtml')
})

//打包为一个压缩文件
gulp.task('zip', function () {
    gulp.src('build/**')
        .pipe(zip('gulp-demo' + '.zip'))
        .pipe(gulp.dest('zip'))
})

gulp.task('default',['serve']);  //运行
gulp.task('build',['collect']);  //编译
gulp.task('ziped', ['zip']); //打包



