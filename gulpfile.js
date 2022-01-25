var gulp        = require('gulp'), 
    sass        = require('gulp-sass'), 
    browserSync = require('browser-sync'),
    mincss      = require('gulp-minify-css'),
    minjs       = require('gulp-uglify-es'),
    minhtml     = require('gulp-minify-html');

gulp.task('sass', function(){ 
    return gulp.src('app/sass/**/*.scss') 
        .pipe(sass()) 
        .pipe(gulp.dest('app/css')) 
        .pipe(browserSync.reload({stream: true})) 
});

gulp.task('browser-sync', function(done) { 
    browserSync({ 
        server: { 
            baseDir: 'app' 
        },
        notify: false 
    });
    done()
});

gulp.task('watch', gulp.series('browser-sync', 'sass', function(done) {
    gulp.watch('app/sass/**/*.scss', gulp.series('sass')); 
    gulp.watch('app/*.html').on('change', browserSync.reload);
    gulp.watch('app/js/*.js').on('change', browserSync.reload); 
    done()
}));

gulp.task('mincss', function() {
    return gulp.src('app/css/main.css')
        .pipe(mincss())
        .pipe(gulp.dest('dist/css'))
});

gulp.task('minjs', function() {
    return gulp.src('app/js/*.js')
        .pipe(minjs.default())
        .pipe(gulp.dest('dist/js'))
});

gulp.task('minhtml', function() {
    return gulp.src('app/index.html')
        .pipe(minhtml())
        .pipe(gulp.dest('dist'))
});

gulp.task('copy-img', function() {
    return gulp.src('app/img/*.*')
        .pipe(gulp.dest('dist/img'))
});

gulp.task('copy-svg', function() {
    return gulp.src('app/img/svg/*.*')
        .pipe(gulp.dest('dist/img/svg'))
});

gulp.task('copy-fonts', function() {
    return gulp.src('app/fonts/*.*')
        .pipe(gulp.dest('dist/fonts'))
});

gulp.task('copy-docs', function() {
    return gulp.src('app/docs/*.*')
        .pipe(gulp.dest('dist/docs'))
});

gulp.task('mincopyall', gulp.series('mincss', 'minhtml', 'minjs', 'copy-img', 'copy-svg', 'copy-fonts', 'copy-docs'));