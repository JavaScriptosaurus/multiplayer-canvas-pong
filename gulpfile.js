const gulp = require('gulp');

const babel = require('gulp-babel');
const browserify = require('browserify');
const buffer = require('vinyl-buffer');
const eslint = require('gulp-eslint');
const sass = require('gulp-sass');
const source = require('vinyl-source-stream');
const sourcemaps = require('gulp-sourcemaps');

const dirs = {
    src: './src/**/*.js',
    serverJS: {
        src: './src/server/**/*.js',
        dest: './'
    },
    clientJS: {
        src: './src/client/**/*.js',
        tempDest: './pre-build',
        entry: './pre-build/app.js',
        dest: './public/js'
    },
    Sass: {
        src: './src/client/sass/**/*.scss',
        dest: './public/css'
    }
};

gulp.task('es2015-server', function () {
    return gulp.src(dirs.serverJS.src)
        .pipe(sourcemaps.init())
        .pipe(babel())
        .on('error', function(err) {
          console.log('[BABEL]', err.message);
          this.emit('end');
        })
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(dirs.serverJS.dest));
});

// Requires es2015-client to finish first.
gulp.task('client-browserify', ['es2015-client'], function () {
    return browserify(dirs.clientJS.entry, { debug: true })
        .bundle()
        .on('error', function(err) {
            console.error('[BROWSERIFY]', err.message);
            this.emit('end');
        })
        .pipe(source('build.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(dirs.clientJS.dest));
});

gulp.task('es2015-client', function () {
    return gulp.src(dirs.clientJS.src)
        .pipe(sourcemaps.init())
        .pipe(babel())
        .on('error', function(err) {
          console.log('[BABEL]', err.message);
          this.emit('end');
        })
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(dirs.clientJS.tempDest));
});

gulp.task('sass', function () {
    return gulp.src(dirs.Sass.src)
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'nested'
        })
        .on('error', sass.logError))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(dirs.Sass.dest));
});

gulp.task('lint', function () {
    return gulp.src(dirs.src)
        .pipe(eslint({
            "globals": {
                "require": true
            }
        }))
        .pipe(eslint.format());
});

gulp.task('default', ['watch', 'es2015-server', 'es2015-client', 'client-browserify', 'sass', 'lint']);

gulp.task('watch', function () {
    gulp.watch(dirs.serverJS.src, ['es2015-server']);
    gulp.watch(dirs.clientJS.src, ['es2015-client', 'client-browserify', 'lint']);
    gulp.watch(dirs.Sass.src, ['sass']);
    gulp.watch(dirs.src, ['lint']);
});
