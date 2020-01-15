module.exports = function() {
	//----------#BUILD FOLDER
	//scss build version project
	$.gulp.task('css:build', function() {
		return $.gulp.src($.config.pathVar.path.src.style)
			.pipe($.gp.plumber({ errorHandler: $.gp.notify.onError("Error: <%= error.message %>") }))
			.pipe($.gp.sourcemaps.init({loadMaps: true}))
			.pipe($.gp.sass({outputStyle: 'expanded'}))
			.pipe($.gp.sourcemaps.write('./sourcemaps'))
			.pipe($.gulp.dest($.config.pathVar.path.build.css))
			.pipe($.gp.browserSync.reload({stream:true}))
	});

	//just css build
	$.gulp.task('justCss:build', function() {
		return $.gulp.src($.config.pathVar.path.src.styleCss)
			.pipe($.gp.plumber({ errorHandler: $.gp.notify.onError("Error: <%= error.message %>") }))
			.pipe($.gulp.dest($.config.pathVar.path.build.styleCss))
	});

	//----------#PRODUCTION FOLDER
	//scss production version project
	$.gulp.task('css:buildProd', function() {
		return $.gulp.src($.config.pathVar.path.src.styleProd)
			.pipe($.gp.plumber({ errorHandler: $.gp.notify.onError("Error: <%= error.message %>") }))
			.pipe($.gp.sass())
			.pipe($.gp.autoprefixer())
			.pipe($.gp.gcmq())
			.pipe($.gp.csso({
				//Disable or enable a structure optimisations.
				restructure: true,
				//Specify what comments to leave
				comments: true,
			}))
			.pipe($.gp.cssbeautify())
			.pipe($.gp.csscomb($.config.csscombConfig))
			.pipe($.gulp.dest($.config.pathVar.path.production.css))
			.pipe($.gp.browserSync.reload({stream:true}))
	});

	//just css prod
	$.gulp.task('justCss:buildProd', function() {
		return $.gulp.src($.config.pathVar.path.src.styleCss)
			.pipe($.gp.plumber({ errorHandler: $.gp.notify.onError("Error: <%= error.message %>") }))
			.pipe($.gulp.dest($.config.pathVar.path.production.styleCss))
	});

	// how group-css-media-queries work
	// Queries order
	// Output CSS is ordered by these rules:
	// non-media-query code goes first unmodified,
	// then all only min-width rules, sorted ascending by px
	// then all only max-width rules, sorted descending by px
	// then all interval rules, without reordering
	// then all other rules
};