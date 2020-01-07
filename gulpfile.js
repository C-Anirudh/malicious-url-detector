const gulp = require('gulp'),
  minify = require('gulp-minify'),
  rename = require('gulp-rename'),
  del = require('del');
function defaultTask(done) {
    console.log('Please use the following gulp tasks: clean, build')
    done(); 
};

function clean() {
    return del('./dist', {
        force: true
    });
};

function bundlePopup() {
    return gulp.src('./src/scripts/controllers/popup.js')
      .pipe(rename('popup.js'))
      .pipe(gulp.dest('./src'));
};

function bundleOptions() {
    return gulp.src('./src/scripts/controllers/options.js')
      .pipe(rename('options.js'))
      .pipe(gulp.dest('./src'));
};

function minifyFiles() {
    return gulp.src('./src/*.js')
      .pipe(minify({
        ext: {
          min: '.js'
        },
        noSource: true,
        mangle: false
      }))
      .pipe(gulp.dest('./dist/chrome'));
};

function copyDist() {
    gulp.src('./src/assets/**/*').pipe(gulp.dest('./dist/chrome/assets/'));
    gulp.src('./src/views/**/*').pipe(gulp.dest('./dist/chrome/views/'));
    return gulp.src('./src/manifest.json').pipe(gulp.dest('./dist/chrome/'));
};

const bundle = gulp.parallel(bundlePopup, bundleOptions);

const build = gulp.series(clean, bundle, minifyFiles, copyDist);


exports.default = defaultTask;
exports.clean = clean;
exports.build = build;