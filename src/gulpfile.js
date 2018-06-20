const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat-util');
const fileinclude = require('gulp-file-include');
const htmlextend = require('gulp-html-extend');
const htmlmin = require('gulp-htmlmin');
const rename = require("gulp-rename");
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const replace = require('gulp-replace'); //Added variable for gulp-replace
const merge = require('merge-stream');
const imagemin = require('gulp-imagemin');
const cssimport = require("gulp-cssimport");
const cache = require('gulp-cache');
const ngAnnotate = require('gulp-ng-annotate');

const cssPath = [
    './public/vendor/bootstrap/dist/css/bootstrap.css',
    './src/css/**/*.css'
];

const jsPath = [
    './public/vendor/jquery/dist/jquery.js',
    './public/vendor/angular/angular.js',
    './public/vendor/angular-ui-router/release/angular-ui-router.js',
    './public/vendor/bootstrap/dist/js/bootstrap.js',
    './public/vendor/jquery-slimscroll/jquery.slimscroll.js',
    './public/vendor/sticky-kit/jquery.sticky-kit.js',
    './src/**/*.js'
];
gulp.task('build-css', () => {
    var fonts = gulp.src('./src/icons/**/*.{eot,svg,ttf,woff,woff2}', function (err) { })
        .pipe(rename({ dirname: '' }))
        .pipe(replace("url('", "url('../../../fonts/"))
        .pipe(gulp.dest('dist/css/fonts'));

    var imageCopy = gulp.src('./src/images/**/*.{png,jpg,gif}')
        .pipe(gulp.dest('dist/images'))
        .pipe(browserSync.reload({
            stream: true
        }));

    var imageMini = gulp.src('src/images/**/*.(png|jpg|jpeg|gif|svg)')
        // Caching images that ran through imagemin
        .pipe(cache(imagemin({
            interlaced: true
        })))
        .pipe(gulp.dest('dist/images'));


    var finalCSS = gulp.src(cssPath)
        .pipe(cssimport())
        .pipe(concat('crudStyle'))
        .pipe(concat.header('/* !!! WARNING !!! \nThis file is auto-generated. \nDo not edit it or else you will lose changes next time you compile! */\n\n'))
        .pipe(cleanCSS()).on('error', (e) => console.log(e))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({
            stream: true
        }));

    return merge(fonts, finalCSS, imageCopy);
});

gulp.task('build-js', () => {
    return gulp.src(jsPath)
        .pipe(concat('crud'))
       // .pipe(ngAnnotate())
        .pipe(uglify().on('error', (e) => console.log(e)))
        .pipe(rename({ extname: '.min.js' }))
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('build-html', () => {
    var htmlFiles = gulp.src(['./*.html', './src/**/*.html', '!src/html/includes/**/*.html'])
        .pipe(htmlextend({
            annotations: false,
            verbose: false,
            root: '/dist'
        }).on('error', (e) => console.log(e)))
        .pipe(fileinclude({
            prefix: '@@',
            basepath: './src/**/*.html'
        }).on('error', (e) => console.log(e)))
        .pipe(htmlmin({  removeComments: true,collapseWhitespace: true }).on('error', (e) => console.log(e)))
        .pipe(gulp.dest('./dist'))
        .pipe(browserSync.reload({
            stream: true
        }));

    var indexFile = gulp.src("./*.html")
        .pipe(htmlmin({ collapseWhitespace: true }).on('error', (e) => console.log(e)))
        .pipe(gulp.dest('./dist'));

    return merge(indexFile, htmlFiles);

});


//gulp.task('build', ['build-sass', 'build-js', 'build-html']);
gulp.task('build', ['build-css', 'build-js', 'build-html']);

gulp.task('watch', ['browser-sync'], function () {
    gulp.watch(['./*.html', './src/app/**/*.html', './src/**/*.html'], ['build-html']);
    gulp.watch('src/css/**/*.css', ['build-css']);
    gulp.watch('src/**/*.js', ['build-js']);
});



gulp.task('browser-sync', function () {
    browserSync.init(['./**/*.html', './dist/css/**/*.css', './dist/js/**/*.js'], {
        open: true,
        index: 'index.html',
        server: {
            baseDir: './dist',
            routes: {
                "/bower_components": "bower_components",
                "/node_modules": "node_modules"             
            }
        },
        port: 3000,
       // startPath: './dist',
        browser: "Chrome"
    });
});

gulp.task('start', ['watch', 'browser-sync', 'build']);