define(["chart", "budget"], function(Chart, Budget) {
	
	var settings = {
		incomeSlider: "incomeTotal",
		btns: {
			addIncome: "addIncome",
			addExpense: "addExpense"
		}
	};
	
	var app = {};
	
	var setEvents = function (chart, budget) {
		$(document.getElementById(settings.incomeSlider)).change(function () {
			chart.updateData.call(chart, parseInt($(this).val(), 10) - 50);
		});
		
		$(document.getElementById(settings.btns.addIncome)).click(function (e) {
			e.preventDefault();
			var income = new budget.Income();
			income.renderFromTemplate();
		});
		
		$(document.getElementById(settings.btns.addExpense)).click(function (e) {
			e.preventDefault();
			var expense = new budget.Expense();
			expense.renderFromTemplate();
		});
	};
	
	app.init = function () {
		console.log("Simple budget app initialised.");
		var bar = new Chart("bar", d3.range(10,100,10));
		bar.render();
		
		// budget test
		var budget = new Budget();
		
		setEvents(bar, budget);
		
	};
	
	return app;
	
});
