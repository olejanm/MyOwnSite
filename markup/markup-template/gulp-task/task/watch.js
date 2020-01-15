module.exports = function() {
	//----------#BUILD FOLDER
	// watch task with DEV
	$.gulp.task('watch', function() {
		$.gp.notify("Watcher is START!").write('');
		$.gulp.watch([$.config.pathVar.path.watch.html], ['html:build']).on('change', function() {
			$.gp.browserSync.reload();
		});
		$.gulp.watch([$.config.pathVar.path.watch.style], ['css:build']);
		$.gulp.watch([$.config.pathVar.path.watch.js], ['js:build']).on('change', function() {
			$.gp.browserSync.reload();
		});
		$.gulp.watch([$.config.pathVar.path.watch.fonts], ['fonts:build']).on('change', function() {
			$.gp.notify("FONTS file was changed!").write('');
			$.gp.browserSync.reload();
		});
		$.gulp.watch([$.config.pathVar.path.watch.img], ['image:build', 'image-trash:build']).on('change', function() {
			$.gp.notify("IMG file was changed!").write('');
			$.gp.browserSync.reload();
		});
	});

	//----------#PRODUCTION FOLDER
		// watch task with PRODUCTION
	$.gulp.task('watch:prod', function() {
		$.gp.notify("Watcher is START!").write('');
		$.gulp.watch([$.config.pathVar.path.watch.html], ['html:buildProd']).on('change', function() {
			$.gp.browserSync.reload();
		});
		$.gulp.watch([$.config.pathVar.path.watch.style], ['css:buildProd']);
		$.gulp.watch([$.config.pathVar.path.watch.js], ['js:buildProd']).on('change', function() {
			$.gp.browserSync.reload();
		});
		$.gulp.watch([$.config.pathVar.path.watch.fonts], ['fonts:build']).on('change', function() {
			$.gp.notify("FONTS file was changed!").write('');
			$.gp.browserSync.reload();
		});
		$.gulp.watch([$.config.pathVar.path.watch.img], ['image:buildProd', 'image-trash:buildProd']).on('change', function() {
			$.gp.notify("IMG file was changed!").write('');
			$.gp.browserSync.reload();
		});
	});

}