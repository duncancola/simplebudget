define(["chart", "budget"], function(Chart, Budget) {
	
	var settings = {
		budgetForm: "budgetForm",
		btns: {
			addIncome: "addIncome",
			addExpense: "addExpense"
		}
	};
	
	var app = {};
	
	var setEvents = function (chart, budget) {
		/*$(document.getElementById(settings.incomeSlider)).change(function () {
			chart.updateData.call(chart, parseInt($(this).val(), 10) - 50);
		});*/
		
		// add new blank income field
		$(document.getElementById(settings.btns.addIncome)).click(function (e) {
			e.preventDefault();
			var income = budget.Income();
			chart.addData(income.getAsChartData());
			income.renderFromTemplate();
		});
		
		// add new blank expense field
		$(document.getElementById(settings.btns.addExpense)).click(function (e) {
			e.preventDefault();
			var expense = budget.Expense();
			expense.renderFromTemplate();
		});
		
		// change label to text box
		$(document.getElementById(settings.budgetForm)).on("click", "label", function (e) {
			e.preventDefault();
			var labelText = $(this).text();
			var id = $(this).parent().attr("id");
			var $input = $("<input>")
					.attr("type", "text")
					.addClass("editLabel");
			var budgetItem = budget.getItem(id);
			if (budgetItem && (!budgetItem.nameUpdated || budgetItem.name === budget.getDefaultName())) {
				$input.val("");
			} else {
				$input.val(labelText);
			}
			$(this).replaceWith(
				$input
			);
			$input.focus();
		});
		
		// change text box back to label
		$(document.getElementById(settings.budgetForm)).on("blur", ".editLabel", function (e) {
			e.preventDefault();
			var val = $(this).val() || budget.getDefaultName();
			var inputFor = $(this).next().find("input[type=text]").attr("name");
			var $label = $("<label>")
					.attr("for", inputFor)
					.addClass("control-label")
					.html(val);
			// update budget item
			var id = $(this).parent().attr("id");
			budget.updateItem(id, {"name": val});
			$(this).replaceWith(
				$label
			);
		});
		
		// input blur - reset range
		$(document.getElementById(settings.budgetForm)).on("blur", ".financialItemValue", function () {
			var $range = $(this).parent().find("input[type=range]");
			var val = $(this).val();
			var valInt = parseInt(val, 10);
			if (!isNaN(valInt)) {
				$range.attr({
					value: valInt,
					min: Math.round(valInt - (valInt/10)),
					max: Math.round(valInt + (valInt/10))
				});
			}
		});
		
		// input change - update data point in chart and update FinancialItem
		$(document.getElementById(settings.budgetForm)).on("change", ".financialItemValue", function () {
			var val = parseInt($(this).val(), 10);
			var id = $(this).parent().parent().attr("id");
			if (!isNaN(val)) {
				// TODO: find the data point in chart by ID and update the data value
				chart.updateDataById(id, val);
				chart.render();
				budget.updateItem(id, {"val": val});
			} else {
				console.log("Error: value must be an integer!");
			}
		});
		
		// range change
		$(document.getElementById(settings.budgetForm)).on("change", "input[type=range]", function () {
			$(this).parent().find(".financialItemValue").val($(this).val()).change();
		});
		
	};
	
	app.init = function () {
		console.log("Simple budget app initialised.");
		/*var mockData = _.map(d3.range(10, 100, 10), function (val) {
			return {
				id: _.uniqueId(),
				val: val
			};
		});*/
		var bar = new Chart("bar");
		bar.render();
		// budget test
		var budget = new Budget();
		setEvents(bar, budget);
		
	};
	
	return app;
	
});
