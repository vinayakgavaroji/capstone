class Expense{

    constructor(obj){
  
      this.expenseId = obj.expenseId
  
      this.productName = obj.productName;
  
      this.amount = obj.amount
  
      this.category = obj.category
  
      this.date = obj.date
  
      this.description = obj.description
  
    }
  
  }
  
  module.exports = Expense;