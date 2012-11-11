define([], function () {
	
	var settings = {
		parent: "charts"
	};
	
	var chart = function (type, data, options) {
		var parentElem = document.getElementById(settings.parent);
		this.settings = $.extend({}, settings, options);
		this.type = type;
		this.data = data;
		this.width = $(parentElem).width();
		this.height = (this.settings.height && this.settings.height > 0) ?
			this.settings.height : 200;
		this.padding = 1;
		this.svg = d3.select(parentElem)
			.append("svg")
			.attr({
				width: this.width,
				height: this.height,
				fill: "#FF0000"
			});
	};
	
	chart.prototype.render = function () {
		var thisChart = this;
		this.svg.selectAll("rect")
			.data(this.data)
			.enter()
			.append("rect")
			.attr({
				x: function (d, i) {
					return (i * ((thisChart.width/thisChart.data.length) + thisChart.padding));
				},
				y: function (d) {
					return (thisChart.height - d);
				},
				width: (thisChart.width/thisChart.data.length)-thisChart.padding,
				height: function (d) {
					return (thisChart.height - d);
				},
				fill: "blue"
			});
	};
	
	chart.prototype.updateData = function (num) {
		var scale = 1 + (num/100);
		var thisChart = this;
		this.data = _.map(this.data, function (d) {
			return scale * d;
		});
		console.log(this.data[5]);
		this.svg.selectAll("rect")
			.data(this.data)
			.attr({
				y: function (d) {
					return (thisChart.height - d);
				},
				height: function (d) {
					return d;
				}
			});
	};
	
	return chart;
	
});
