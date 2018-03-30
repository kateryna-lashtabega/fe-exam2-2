"use strict";

var gulp = require('gulp'),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	prefixer = require('gulp-autoprefixer'),
	watch = require('gulp-watch'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload,
	include = require('gulp-include'),
	notify = require('gulp-notify'),
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant'),
	uglify = require('gulp-uglify');

var paths= {
	src: {
		html: ["src/**/*.html", "!src/templates{,/**}"],
		css: "src/css/style.scss",
		img: "src/img/**/*.*",
		fonts: "src/fonts/**/*.*",
		js_main: "src/js/script.js",
		js: "src/js/",		
		images: "src/img/**/*.*"
	},
	dest: {
		css: "docs/css/",
		html: "docs/",
		images: "docs/img/",
		js: "docs/js/",
		fonts: "docs/fonts/"
	},
	watch: {
		css: "src/css/**/*.scss",
		html: "src/**/*.html",
		images: "src/img/**/*.*",
		js: "src/**/*.js",
		fonts: "src/fonts/**/*.*"
	},
	bootstrap: './node_modules/bootstrap/dist/js/',
	jquery: './node_modules/jquery/dist/',
	slick: './node_modules/slick-carousel/slick/',
	isotope: './node_modules/isotope-layout/dist/'
}

gulp.task('css', function(){
	gulp.src(paths.src.css)
		.pipe(sourcemaps.init())
		.pipe(sass({
			outputStyle: 'compressed',
			sourceMap: true,
			errorToConsole: true }))
		.pipe(prefixer())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(paths.dest.css))
		.pipe(reload({stream: true}))
});

gulp.task('html', function(){
	gulp.src(paths.src.html)
		.pipe(include({
				extensions: "html",
				hardFail: true,
			})).on('error', notify.onError(
					{
						message: "<%= error.message %>",
						title  : "HTML build error!"
					}
				)
			)
		.pipe(gulp.dest(paths.dest.html))
		.pipe(reload({stream: true}))
});

gulp.task('images', function () {
	gulp.src(paths.src.images)
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()],
			interlaced: true
		}))
		.pipe(gulp.dest(paths.dest.images))
		.pipe(reload({stream: true}));
});
gulp.task('fonts', function () {
	gulp.src(paths.src.fonts)
		.pipe(gulp.dest(paths.dest.fonts))
		.pipe(reload({stream: true}));
});

gulp.task('js', function () {
	gulp.src(paths.src.js_main)
		.pipe(include({
				extensions: "js",
				hardFail: true,
				includePaths: [paths.isotope, paths.slick, paths.bootstrap, paths.jquery, paths.src.js]
			}).on('error', notify.onError(
					{
						message: "<%= error.message %>",
						title  : "JS Error!"
					}
				)
			)
		)
		.pipe(uglify().on('error', notify.onError(
						{
							message: "<%= error.message %>",
							title  : "JS Error!"
						}
					)
				)
			)
		.pipe(gulp.dest(paths.dest.js))
		//.pipe(notify({ message: 'JS task complete', sound: false, onLast: true }))
		.pipe(reload({stream: true}));
});

gulp.task('watch', function() {
	gulp.watch([paths.watch.css], function(event, cb){
		gulp.start('css');
	});

	gulp.watch([paths.watch.html], function(event, cb){
		gulp.start('html');
	});

	gulp.watch([paths.watch.images], function(event, cb){
		gulp.start('images');
	});

	gulp.watch([paths.watch.js], function(event, cb){
		gulp.start('js');
	});
	gulp.watch([paths.watch.fonts], function(event, cb){
		gulp.start('fonts');
	});
});

gulp.task('refresh', function(){
	browserSync({
		server: {
			baseDir: './docs'
		},
		injectChanges: true
	});
});

gulp.task('build', [
	'html', 
	'css',
	'images',
	'js',
	'fonts'
]);

gulp.task('default', ['build', 'refresh', 'watch']);