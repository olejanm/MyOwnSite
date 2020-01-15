'use strict';

global.$ = {
	gulp: require('gulp'),
	//gulp-load-plugins init
	gp: require('gulp-load-plugins') ({
		//need to work plugin - "del"
		pattern: ['*', '!gulp'],
		//need to work all this plugin
		rename: {
			'gulp-remove-html': 'gulpRemoveHtml',
			'gulp-group-css-media-queries': 'gcmq',
			'gulp-html-beautify': 'gulpHtmlBeautify',
			'browser-sync': 'browserSync',
			'imagemin-pngquant': 'pngquant',
			'gulp-newer': 'newer',
			'gulp-replace': 'gulpReplace',
			'gulp-responsive-imgz': 'imgRetina',
		},
	}),
	config: {
		configInit: require('./gulp-task/config/config.js'),
		pathVar: require('./gulp-task/config/path-var.js'),
		csscombConfig: require('./gulp-task/config/csscomb.json'),
		retinizeOpts: {
			//if you need additional options
			suffix: {
			// 1: '@1x',
			2: '@2x',
			// 3: '@3x'
		}
		}
	}
};

//cycle for all tasks
$.config.configInit.forEach(function (taskPath) {
	require(taskPath)();
});

//----------#BUILD DEV FOLDER
//build task dev folder TASK ---- gulp build
$.gulp.task('build', [
	'html:build',
	'js:build',
	'css:build',
	'fonts:build',
	'image:build',
	'image-trash:build',
	'css:dev',
	'js:dev',
]);

//default task to build and watch dev folder TASK ---- gulp
$.gulp.task('default', ['build', 'watch', 'webserver']);

//dev folder cleanup TASK  ---- gulp all
$.gulp.task('dev', ['clean'], function () {
	$.gulp.start('build', 'justCss:build', 'other:build', 'watch', 'webserver');
});


//----------#PRODUCTION FOLDER
//build task production folder TASK ---- gulp buildProd
$.gulp.task('buildProd', [
	'html:buildProd',
	'js:buildProd',
	'css:buildProd',
	'fonts:buildProd',
	'image:buildProd',
	'image-trash:buildProd',
]);

//dist folder cleanup TASK  ---- gulp prod
$.gulp.task('dist', ['cleanProd'], function () {
	$.gulp.start('buildProd', 'justCss:buildProd', 'jsMin:buildProd', 'other:buildProd', "watch:prod", 'webserverProd', 'messageProd');
});


//---------#end