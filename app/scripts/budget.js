define([], function () {
	
	/**
	 * A budget is composed of Expense and Income objects which should inherit a common ancestor
	 * FinancialItem
	 */
	 
	var settings = {
		itemTemplate: "controlTemplate",
		incomeContainer: "incomeContainer",
		expensesContainer: "expensesContainer"
	};
	 
	function FinancialItem () {
		this.val = 0;
		this.type = "financialItem";
		this.name = "New Item";
		this.id = _.uniqueId(this.type);
		this.$container = $(".container");
		this.templateHtml = $(document.getElementById(settings.itemTemplate)).html();
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
		this.expenses = [];
		this.income = [];
	}
	
	Budget.prototype = {
		Expense: Expense,
		Income: Income,
		addExpense: function (expense) {
			if (expense instanceof Expense) {
				this.expenses.push(expense);
			}
		},
		addIncome: function (income) {
			if (income instanceof Income) {
				this.income.push(income);
			}
		}
	};
	
	return Budget;
	
});
