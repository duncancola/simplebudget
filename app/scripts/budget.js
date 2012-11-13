define([], function () {
	
	/**
	 * A budget is composed of Expense and Income objects which should inherit a common ancestor
	 * FinancialItem
	 */
	 
	function FinancialItem () {
		this.val = 0;
	}
	
	/**
	 * Render in a (Mustache? or generic?) template
	 */
	FinancialItem.prototype.toTemplate = function (html) {
		
	};
	
	function Expense () {
		// super inheritance
		FinancialItem.call(this);
	}
	
	function Income () {
		// super inheritance
		FinancialItem.call(this);
	};
	
	// prototype inheritance
	Expense.prototype = new FinancialItem();
	Income.prototype = new FinancialItem();
	
	function Budget () {
		// array of expense objects (easy to sort array by different facets
		// e.g. get all expenses after a date or over a certain cost, analytics ;)
		this.expenses = [];
		this.income = [];
	}
	
	Budget.prototype = {
		addExpense: Expense,
		addIncome: Income
	};
	
	return Budget;
	
});
