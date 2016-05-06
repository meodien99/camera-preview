var gulp = require('gulp');
   browserSync = require('browser-sync').create(),
   sass = require('gulp-sass'),
   concat = require('gulp-concat'),
   uglify = require('gulp-uglify'),
   rename = require('gulp-rename'),
   sourcemaps = require('gulp-sourcemaps');



//Static server + watching scss/html files
gulp.task('serve', ['sass', 'uglifyjs'], function(){
   browserSync.init({
      server: "."
   });

   gulp.watch("css/*.scss", ['sass']);
   gulp.watch("js/*.js", ['uglifyjs']);
   gulp.watch("*.html").on('change', browserSync.reload);
})

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
   return gulp.src("css/*.scss")
      .pipe(sass())
      .pipe(gulp.dest("css"))
      .pipe(browserSync.stream());
});

var jses = [
   'js/classie.js',
   'js/main.js'
];
gulp.task('uglifyjs', function(){
    return gulp.src(jses)
        .pipe(sourcemaps.init())
        .pipe(concat('concat.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('uglify.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);