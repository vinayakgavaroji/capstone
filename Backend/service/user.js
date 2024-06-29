const modelLayer = require("../model/user");

user = {};

user.signUp = async (userObj) => {
  try {
    let response = await modelLayer.signUp(userObj);

    return response;
  } catch (err) {
    let error = new Error("Failed to sign in");

    error.status = 500;

    throw error;
  }
};

user.fetchUserDetails = async () => {
  try {
    let response = await modelLayer.fetchUserDetails();

    return response;
  } catch (err) {
    let error = new Error("Failed to fetch user details");

    error.status = 404;

    throw error;
  }
};

user.createNewExpense = async (expenseObj) => {
  try {
    let response = await modelLayer.createNewExpense(expenseObj);

    return response;
  } catch (err) {
    let error = new Error("failed to add expense.!");

    error.status = 500;

    throw error;
  }
};

user.getAllExpenses = async () => {
  try {
    let result = await modelLayer.getAllExpenses();

    return result;
  } catch (err) {
    let error = new Error("Failed to fetch all expenses");

    error.status = 404;

    throw error;
  }
};

user.deleteExpense = async (expenseId) => {
  try {
    let result = await modelLayer.deleteExpense(expenseId);

    return result;
  } catch (err) {
    let error = new Error("Failed to delete the expense");

    error.status = 404;

    throw error;
  }
};

user.updateExpense = async (expenseId, expenseObj) => {
  try {
    let result = await modelLayer.updateExpense(expenseId, expenseObj);

    return result;
  } catch (err) {
    let error = new Error("Failed to update the expense");

    error.status = 404;

    throw error;
  }
};

user.getExpenseById = async (expenseId) => {
  try {
    let result = await modelLayer.getExpenseById(expenseId);

    return result;
  } catch (err) {
    let error = new Error("Failed to fetch the expense");

    error.status = 404;

    throw error;
  }
};

user.getTotalAmountByCategory = async () => {
  try {
    let result = await modelLayer.getTotalAmountByCategory();

    return result;
  } catch (err) {
    let error = new Error("Failed to fetch the expense");

    error.status = 404;

    throw error;
  }
};

module.exports = user;
