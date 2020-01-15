module.exports = function() {

	// dev style
	$.gulp.task('css:dev', function() {
		return $.gulp.src($.config.pathVar.path.src.styleDev)
			.pipe($.gp.plumber({ errorHandler: $.gp.notify.onError("Error: <%= error.message %>") }))
			.pipe($.gp.sourcemaps.init({loadMaps: true}))
			.pipe($.gp.sass({outputStyle: 'expanded'}))
			.pipe($.gp.sourcemaps.write('./sourcemaps'))
			.pipe($.gulp.dest($.config.pathVar.path.build.css))
			.pipe($.gp.browserSync.reload({stream:true}))
	});

	// dev js
	$.gulp.task('js:dev', function() {
		return $.gulp.src($.config.pathVar.path.src.jsDev)
			.pipe($.gp.plumber({ errorHandler: $.gp.notify.onError("Error: <%= error.message %>") }))
			.pipe($.gp.rigger())
			.pipe($.gulp.dest($.config.pathVar.path.build.js))
	});

	// dev watch task
	$.gulp.task('watch:dev', function() {
		$.gulp.watch([$.config.pathVar.path.watch.dev], ['html:build', 'js:dev', 'css:dev']).on('change', function() {
			$.gp.browserSync.reload();
		});
	});

};