var gulp = require('gulp');  
var nodemon = require('gulp-nodemon');  
var autoprefixer = require('gulp-autoprefixer');  
var livereload = require('gulp-livereload'); 
var sass = require('gulp-sass');

// Sass compiler and copy
gulp.task('scss', function () {
  return gulp.src(['./public/scss/*.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('./public/css'))
    .pipe(livereload());
});

/* Livereload scripts */
gulp.task('scripts', function() {  
  return gulp.src('public/js/*.js')
    .pipe(livereload());
});

/* Livereload view */
gulp.task('ejs',function(){  
    return gulp.src('views/**/*.ejs')
    .pipe(livereload());
});

/* Watch for change in client code */
gulp.task('watch', function() {  
    livereload.listen();
    gulp.watch('public/scss/*.scss', ['scss']);
    gulp.watch('public/js/*.js', ['scripts']);
    gulp.watch('views/**/*.ejs', ['ejs']);
});

/* Use nodemon to restart server if change was made, ignore public folder */
gulp.task('server',function(){  
    nodemon({
        'script': 'server.js',
        'ignore': 'public/js/*.js'
    });
});

/* Helper task to run multiple tasks. To run on cammand line: gulp serve */
gulp.task('default', ['server','scss', 'scripts', 'ejs', 'watch']);  