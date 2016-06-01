var gulp       = require('gulp'),
    Server     = require('karma').Server;

gulp.task('test', [], function(done){
    return new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun : true
    }, done).start()
})

gulp.task('watch-test',['test'], function(){
    gulp.watch(['./src/**/*.js'], ['test'])
    gulp.watch(['./tst/**/*.js'], ['test'])
})

gulp.task('default', ['test'])