/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	/**
	 * Created by kepeng on 16/5/10.
	 */

	(function() {

	    $(document).ready(function() {

	        $('#header-title').text('省批次线');
	        $('#header-menu').show();
	        $('.container-header').on('click', function(){
	            if($(this).hasClass('open-drop-list')){
	                $(this).removeClass('open-drop-list');

	                $('.containert-content').removeClass('hidden');
	                $('.backdrop').addClass('hidden');
	                $('.province-option-list').addClass('hidden');
	            } else {
	                $(this).addClass('open-drop-list');

	                $('.containert-content').addClass('hidden');
	                $('.backdrop').removeClass('hidden');
	                $('.province-option-list').removeClass('hidden');
	            }
	        });
	        $('.backdrop').on('click', function(){
	            $('.container-header').trigger('click');
	        });
	        $('.province-item').on('click', function(){
	            $('.province-item').removeClass('active');
	            $(this).toggleClass('active');
	            $('.container-header span').text($(this).text());
	            $('.container-header').trigger('click');
	            var index = $(this).index();
	            $($('.containert-content').get(index)).show().siblings().hide();
	        });

	        var index = $('.province-item.active').index();
	        $($('.containert-content').get(index)).show().siblings().hide();
	    });
	})();


/***/ }
/******/ ]);