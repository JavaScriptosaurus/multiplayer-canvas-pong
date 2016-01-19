var gulp = require('gulp');

var babel = require('gulp-babel');
var babelify = require('babelify');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var sass = require('gulp-sass');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');


const dirs = {
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
}

gulp.task('es2015-server', function () {
    return gulp.src(dirs.serverJS.src)
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(dirs.serverJS.dest));
});

// Requires es2015-client to finish first.
gulp.task('client-browserify', ['es2015-client'], function () {
    return browserify(dirs.clientJS.entry, { debug: true })
        .bundle()
        .on('error', function(err) {
            console.error(err.message); this.emit('end');
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

gulp.task('default', ['es2015-server', 'es2015-client', 'client-browserify', 'sass', 'watch']);

gulp.task('watch', function () {
    gulp.watch(dirs.serverJS.src, ['es2015-server']);
    gulp.watch(dirs.clientJS.src, ['es2015-client', 'client-browserify']);
    gulp.watch(dirs.Sass.src, ['sass']);
});
