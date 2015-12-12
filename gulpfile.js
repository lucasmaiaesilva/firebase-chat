var gulp 		= require('gulp'),
	plumber		= require('gulp-plumber'),
	koutoSwiss	= require('kouto-swiss'),
	prefixer	= require('autoprefixer-stylus'),
	jeet		= require('jeet'),
	rupture		= require('rupture'),
	minHtml 	= require('gulp-minify-html'),
	browserSync = require('browser-sync'),
    stylus 		= require('gulp-stylus'),
	uglify 		= require('gulp-uglify'),
	concat 		= require('gulp-concat'),
	minifyCss 	= require('gulp-minify-css'),
	imagemin   	= require('gulp-imagemin'),
	concatCss 	= require('gulp-concat-css'),
	deploy		= require('gulp-gh-pages'),
	gutil		= require('gulp-util'), // mostrar mensagens de log no console sobre o processo de build
	source		= require('vinyl-source-stream'), // gerenciar o source stream
	browserify	= require('browserify'), // responsável por definir qual parte do código pertence a qual parte via require
	watchify	= require('watchify'), // recompila o código assim que alguma mudança é detectada
	reactify	= require('reactify'), // transform jsx files in js
	notifier	= require('node-notifier');


gulp.task('browser-sync', function () {
   var files = [
      'app/**/*.html',
      'app/src/css/**/*.css',
      'app/src/img/**/*',
      'app/src/js/**/*.js',
      'app/src/jsx/**/*.jsx'
   ];

   browserSync.init(files, {
      server: {
         baseDir: 'build/'
      }
   });
});

gulp.task('imagemin', function() {
	return gulp.src('app/src/img/**/*')
		.pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
		.pipe(gulp.dest('build/img'));
});

gulp.task('react', function () {
	var bundler = watchify(browserify({
		entries: ['./app/src/jsx/app.jsx'], 
		transform: [reactify],
		extensions: ['.jsx'],
		debug: true,
		cache: {},
		packageCache: {},
		fullPaths: true
	}, watchify.args))
		.on('update', function () { gutil.log('Rebundling...'); })
		.on('time', function (time) {
			gutil.log('Rebundled in:', gutil.colors.cyan(time + 'ms'));
		});

	bundler.transform(reactify);
	bundler.on('update', rebundle);

	function rebundle() {
		return bundler.bundle()
			.on('error', function (err) {
				gutil.log(err);
				notifier.notify({ title: 'Browserify Error', message: 'Something went wrong :/' });
			})
			.pipe(source('components.js'))
			.pipe(gulp.dest('./build/js'))
			.pipe(browserSync.reload({ stream: true }));
	}

	return rebundle();
});

gulp.task('scripts', function () {
	var bundler = watchify(browserify({
		entries: ['./app/src/js/main.js'], 
		extensions: ['.js'],
		debug: true,
		cache: {},
		packageCache: {},
		fullPaths: true
	}, watchify.args))
		.on('update', function () { gutil.log('Rebundling...'); })
		.on('time', function (time) {
			gutil.log('Rebundled in:', gutil.colors.cyan(time + 'ms'));
		});

	bundler.transform(reactify);
	bundler.on('update', rebundle);

	function rebundle() {
		return bundler.bundle()
			.on('error', function (err) {
				gutil.log(err);
				notifier.notify({ title: 'Browserify Error', message: 'Something went wrong :/' });
			})
			.pipe(source('main.js'))
			.pipe(gulp.dest('./build/js'))
			.pipe(browserSync.reload({ stream: true }));
	}

	return rebundle();
});

gulp.task('fonts', function(){
    gulp.src('app/src/fonts/**/*')
    .pipe(gulp.dest('build/fonts'))
});

gulp.task('stylus', function(){
	gulp.src('app/src/styl/main.styl')
	.pipe(plumber())
	.pipe(stylus({
		use:[koutoSwiss(), prefixer(), jeet(),rupture()],
		compress: true
	}))
	.pipe(browserSync.reload({stream:true}))
	.pipe(gulp.dest('build/css'))
});

 

gulp.task('css', function(){
	gulp.src('app/src/css/*.css')
	.pipe(minifyCss())
	.pipe(concatCss('plugins.min.css'))
	.pipe(gulp.dest('build/css'))
});

gulp.task('html', function () {
  gulp.src('app/**/*.html')
	.pipe(gulp.dest('build/'))
});

gulp.task('watch', function () {
  gulp.watch(['app/**/*.html'], ['html']);
  gulp.watch('app/src/js/*.js', ['scripts']);
  gulp.watch('app/src/jsx/*.jsx', ['jsx']);
  gulp.watch('app/src/css/*.css', ['css']);
  gulp.watch('app/src/styl/*.styl', ['stylus']);
  //gulp.watch('app/src/fonts/**/*', ['fonts']);
});

// just run gulp deploy-pages to send build files to gh-pages
gulp.task('deploy-pages', function () {
	return gulp.src("build/**/*")
		.pipe(deploy());
});

gulp.task('default', ['html', 'stylus', 'fonts', 'watch', 'imagemin', 'react', 'scripts', 'css', 'browser-sync']);
