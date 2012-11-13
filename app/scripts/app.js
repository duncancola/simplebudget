define(["chart", "budget"], function(Chart, Budget) {
	
	var settings = {
		incomeSlider: "incomeTotal",
		incomeContainer: "incomeContainer",
		expensesContainer: "expensesContainer",
		templates: {
			controls: "controlTemplate"
		},
		btns: {
			addIncome: "addIncome",
			addExpense: "addExpense"
		}
	};
	
	var app = {};
	
	var setEvents = function (c) {
		$(document.getElementById(settings.incomeSlider)).change(function () {
			c.updateData.call(c, parseInt($(this).val(), 10) - 50);
		});
		
		$(document.getElementById(settings.btns.addIncome)).click(function (e) {
			e.preventDefault();
			var template = Mustache.render($(document.getElementById(settings.templates.controls)).html(), {
				"id": _.uniqueId("income_"),
				"name": "New Income"
			});
			console.log(template);
			$(document.getElementById(settings.incomeContainer)).append(template);
		});
		
		$(document.getElementById(settings.btns.addExpense)).click(function (e) {
			e.preventDefault();
			var template = Mustache.render($(document.getElementById(settings.templates.controls)).html(), {
				"id": _.uniqueId("expense"),
				"name": "New Expense"
			});
			$(document.getElementById(settings.expensesContainer)).append(template);
		});
	};
	
	app.init = function () {
		console.log("Simple budget app initialised.");
		var bar = new Chart("bar", d3.range(10,100,10));
		bar.render();
		setEvents(bar);
		
		// budget test
		var b = new Budget();
		var expense = new b.addExpense();
		var income = new b.addIncome();
		console.log(income.val, expense.val);
	};
	
	return app;
	
});
