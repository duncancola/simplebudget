define([], function () {
	
	var settings = {
		parent: "charts"
	};
	
	var Chart = function (type, data, options) {
		var parentElem = document.getElementById(settings.parent);
		this.settings = $.extend({}, settings, options);
		this.type = type;
		this.startData = (_.isArray(data)) ? data : [];
		this.data = (_.isArray(data)) ? data : [];
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
		this.bars = this.svg.selectAll("g.bar");
	};
	
	var updateExistingElems = function () {
		var thisChart = this;
		this.svg.selectAll("rect")
			.data(this.data, function (d) {return d.id;})
			.attr(makeBarAttr(thisChart));
	};
	
	var makeBarAttr = function (chart) {
		return {
				x: function (d, i) {
					return (i * ((chart.width/chart.data.length) + chart.padding));
				},
				y: function (d) {
					return (chart.height - d.val);
				},
				width: (chart.width/chart.data.length)-chart.padding,
				height: function (d) {
					return (chart.height - d.val);
				},
				fill: "blue"
			};
	};
	
	Chart.prototype.render = function () {
		updateExistingElems.call(this);
		var thisChart = this;
		this.svg.selectAll("rect")
			.data(this.data, function (d) {return d.id;})
			.enter()
			.append("rect")
			.attr(makeBarAttr(thisChart));
	};
	
	Chart.prototype.addData = function () {
		var dataArray = Array.prototype.slice.apply(arguments);
		this.data = this.data.concat(dataArray);
	};
	
	Chart.prototype.updateDataById = function (id, val) {
		var elem = _.find(this.data, function (item) {
			return item.id === id;
		});
		elem.val = val;
	};
	
	return Chart;
	
});
