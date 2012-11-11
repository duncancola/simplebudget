define(["chart"], function(Chart) {
	
	var settings = {
		incomeSlider: "income"
	};
	
	var app = {};
	
	var setEvents = function (c) {
		$(document.getElementById(settings.incomeSlider)).change(function () {
			c.updateData.call(c, parseInt($(this).val(), 10) - 50);
		});
	};
	
	app.init = function () {
		console.log("Simple budget app initialised.");
		var bar = new Chart("bar", d3.range(10,100,10));
		bar.render();
		setEvents(bar);
	};
	
	return app;
	
});
