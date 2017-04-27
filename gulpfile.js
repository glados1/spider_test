var gulp = require('gulp');
var browserify = require('gulp-browserify');
var fs = require('fs');
var path = require('path');
var nodemon = require('nodemon');

gulp.task('default', function(){
    console.log('defualt task begin...');

    gulp.run('all', 'listen');
});

gulp.task('all', function(){
    console.log('all task begin...');

    gulp.src('./public/js/**/*.js', { base : './public/js'})
        .pipe(browserify())
        .pipe(gulp.dest('./dist/'));

    gulp.run('nodemon');
});


gulp.task('listen', function(){
    console.log('listen task begin...');

    gulp.watch('./public/js/**/*.js', function(event){

        gulp.src(event.path, { base : './public/js'})
            .pipe(browserify())
            .pipe(gulp.dest('./dist/'));

    });
});


gulp.task('nodemon', function(cb){
    console.log('nodemon task begin...');

    var started = false;

    return nodemon({
        script : './bin/www',
        ignore : [],
        watch : ['./views','./util','./routes','./public','./controllers', './models', './proxy', 'middlewares'],
        tasks : function(changeFiles){
            var tasks = [];
            changeFiles.forEach(function(file){
                console.log(file);
            });
            return tasks;
        }   
    }).on('start', function(){
        if(!started) {
            cb();
            started = true;
        }

        console.log('restart...');
    });
});