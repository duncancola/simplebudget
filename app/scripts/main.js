require.config({
  shim: {
  },

  paths: {
    jquery: 'vendor/jquery.min'
  }
});
 
require(['app'], function(app) {
	$(document).ready(function () {
		app.init();
	});
});
