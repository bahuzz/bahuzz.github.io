var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create();


gulp.task('html', function() {
  return gulp.src('src/*.html')
    .pipe(gulp.dest('distillery-test'))
    .pipe(browserSync.stream());
});

gulp.task('img', function() {
  return gulp.src(['src/img/*.png','src/img/*.jpg','src/img/*.svg'])
    .pipe(gulp.dest('distillery-test/img'))
    .pipe(browserSync.stream());
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./distillery-test"
        }
    });
});

gulp.task('sass', function() {
  return gulp.src('src/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('distillery-test/css'))
    .pipe(browserSync.stream());
});
 
gulp.task('watch', function() {
  gulp.watch('src/scss/*.scss', ['sass']);
  gulp.watch('src/*.html', ['html']);
  gulp.watch(['src/img/*.png','src/img/*.jpg','src/img/*.svg'], ['img']);
});



gulp.task('default', ['sass','html','img','browser-sync','watch']);