module.exports = function() {
	//----------#BUILD FOLDER
	//delet folder build version project
	$.gulp.task('clean', function() {
		console.log('---------- FOLDER FOR BUILD CLEAN');
		return $.gp.del.sync($.config.pathVar.path.clean, {force: true});
	});

	//fonts file build version project
	$.gulp.task('fonts:build', function() {
		return $.gulp.src($.config.pathVar.path.src.fonts)
			.pipe($.gp.plumber({ errorHandler: $.gp.notify.onError("Error: <%= error.message %>") }))
			.pipe($.gp.newer($.config.pathVar.path.build.fonts))
			.pipe($.gulp.dest($.config.pathVar.path.build.fonts))
	});

	//other file build version project
	$.gulp.task('other:build', function() {
		return $.gulp.src($.config.pathVar.path.src.other)
			.pipe($.gp.plumber({ errorHandler: $.gp.notify.onError("Error: <%= error.message %>") }))
			.pipe($.gulp.dest($.config.pathVar.path.build.other))
	});

	//----------#PRODUCTION FOLDER
	//delet folder production version project
	$.gulp.task('cleanProd', function() {
		console.log('---------- FOLDER FOR PRODUCTION CLEAN');
		return $.gp.del.sync($.config.pathVar.path.cleanProd, {force: true});
	});

	//fonts file production version project
	$.gulp.task('fonts:buildProd', function() {
		return $.gulp.src($.config.pathVar.path.src.fonts)
			.pipe($.gp.plumber({ errorHandler: $.gp.notify.onError("Error: <%= error.message %>") }))
			.pipe($.gulp.dest($.config.pathVar.path.production.fonts))
	});

	//other file build version project
	$.gulp.task('other:buildProd', function() {
		return $.gulp.src($.config.pathVar.path.src.other)
			.pipe($.gp.plumber({ errorHandler: $.gp.notify.onError("Error: <%= error.message %>") }))
			.pipe($.gulp.dest($.config.pathVar.path.production.other))
	});

	//message that you can fill
	$.gulp.task('messageProd', function() {
		$.gp.notify("Production version on project compiled, you may commit and push you project!").write('');
	});

};