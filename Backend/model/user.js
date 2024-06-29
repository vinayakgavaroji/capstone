let collection = require('../utilities/connection');



let user = {}

user.signUp = async (userObj) =>{

  let modelInstance = await collection.getSignUpCollection();

  let result = await modelInstance.create(userObj);

  if(result){

    return result;

  }else{

    return null;

  }

}

user.fetchUserDetails = async () => {

  let modelInstance = await collection.getSignUpCollection();

  let result = await modelInstance.find({});

  if(result){

    return result;

  }else{

    return null;

  }

}

user.createNewExpense = async (expenseObj) =>{

  let expenseModel = await collection.getExpensesCollection();

  let result = await expenseModel.create(expenseObj);

  if(result){

    return result;

  }else{

    return null;

  }

}

user.getAllExpenses = async () =>{

  let expenseModel = await collection.getExpensesCollection();

  let result = await expenseModel.find();

  if(result){

    return result;

  }else{

    return null;

  }

}

user.deleteExpense = async (expenseId) => {

  let expenseModel = await collection.getExpensesCollection();

  let result = await expenseModel.deleteOne({expenseId: expenseId});

  if(result.deleteCount === 1){

    return expenseId

  }else{

    return null;

  }

}

user.updateExpense = async (expenseId,expenseObj) => {

  let expenseModel = await collection.getExpensesCollection();

  let result = await expenseModel.findOneAndUpdate({expenseId: expenseId}, expenseObj, {new: true});

  if(result){

    return result;

  }else{

    return null;

  }

}

user.getExpenseById = async (expenseId) => {

  let expenseModel = await collection.getExpensesCollection();

  let result = await expenseModel.findOne({expenseId: expenseId});

  if(result){

    return result;

  }else{

    return null;

  }

}

user.getTotalAmountByCategory = async () => {

  let expenseModel = await collection.getExpensesCollection();

  let result = await expenseModel.aggregate([

    {$group: {

      _id: "$category",

      totalAmount: {$sum: "$amount"}

    }}

  ])

  if(result){

    return result;

  }else{

    return null;

  }

}

module.exports = user;

