define([], function () {
	
	/**
	 * A budget is composed of Expense and Income objects which should inherit a common ancestor
	 * FinancialItem
	 */
	 
	var settings = {
		itemTemplate: "controlTemplate",
		incomeContainer: "incomeContainer",
		expensesContainer: "expensesContainer",
		incomeTotal: "incomeTotal",
		expensesTotal: "expensesTotal",
		defaultName: "New Item"
	};
	 
	function FinancialItem () {
		this.val = 0;
		this.type = "financialItem";
		this.name = settings.defaultName;
		this.id = _.uniqueId(this.type);
		this.$container = $(".container");
		this.templateHtml = $(document.getElementById(settings.itemTemplate)).html();
		this.nameUpdated = false
	}
	
	/**
	 * Render in a (Mustache? or generic?) template
	 */
	FinancialItem.prototype.renderFromTemplate = function () {
		var renderedHtml = Mustache.render(this.templateHtml, {
			name: this.name,
			id: this.id
		});
		this.$container.append(renderedHtml);
	};
	
	FinancialItem.prototype.getAsChartData = function () {
		return _.pick(this, "id", "val");
	};
	
	function Expense () {
		// super inheritance
		FinancialItem.call(this);
		this.type = "expense";
		this.$container = $(document.getElementById(settings.expensesContainer));
	}
	
	function Income () {
		// super inheritance
		FinancialItem.call(this);
		this.type = "income";
		this.$container = $(document.getElementById(settings.incomeContainer));
	};
	
	// prototype inheritance
	Expense.prototype = new FinancialItem();
	Income.prototype = new FinancialItem();
	
	function Budget (options) {
		// array of expense objects (easy to sort array by different facets
		// e.g. get all expenses after a date or over a certain cost, analytics ;)
		settings = _.extend(settings, options);
		this.financialItems = [];
	}
	
	var getTotal = function (arr, type) {
		return _.chain(arr)
			.filter(function (item) {
				return (item.type === type);
			})
			.reduce(function (memo, item) {
				return (item.val + memo);
			}, 0)
			.value();
	};
	
	Budget.prototype = {
		Expense: function () {
			var expense = new Expense();
			this.financialItems.push(expense);
			return expense;
		},
		Income: function () {
			var income = new Income();
			this.financialItems.push(income);
			return income;
		},
		addExpense: function (expense) {
			if (expense instanceof Expense) {
				this.expenses.push(expense);
			}
		},
		addIncome: function (income) {
			if (income instanceof Income) {
				this.income.push(income);
			}
		},
		getItem: function (id) {
			return _.find(this.financialItems, function (item) {
				return (item.id === id);
			});
		},
		getData: function (type) {
			var data = [];
			if (type === "expenses") {
				data = this.expenses;
			} else if (type === "income") {
				data = this.income;
			} else {
				data = this.expenses.concat(this.income);
			}
			return _.map(data, function (item) {
				return item.getAsChartData();
			});
		},
		updateItem: function (id, options) {
			var item = this.getItem(id);
			item = _.extend(item, options);
			if (options.name) {
				item.nameUpdated = true;
			}
			if (options.val) {
				this.updateTotals();
			}
		},
		updateTotals: function () {
			var incomeTotal = getTotal(this.financialItems, "income");
			var expensesTotal = getTotal(this.financialItems, "expense");
			$(document.getElementById(settings.incomeTotal)).html(incomeTotal);
			$(document.getElementById(settings.expensesTotal)).html(expensesTotal);
		},
		getDefaultName: function () {
			return settings.defaultName;
		}
	};
	
	return Budget;
	
});
