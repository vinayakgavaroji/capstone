const express = require("express");

const routing = express.Router();

const service = require("../service/user");

generateId = () => {
  return Math.floor(Math.random() * 10000) + 1;
};

routing.post("/api/signup", async (req, res, next) => {
  try {
    let userObj = {
      userId: generateId(),
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    };
    const user = await service.signUp(userObj);
    res
      .status(200)
      .json({
        user,
        message: "User signed up successfully: " + userObj.userId,
      });
  } catch (err) {
    next(err);
  }
});

routing.post("/api/login", async (req, res, next) => {
  try {
    let { email, password } = req.body;
    let users = await service.fetchUserDetails();
    const user = users.find((u) => {
      if (u.email === email && u.password === password) {
        return true;
      } else {
        return false;
      }
    });
    if (user) {
      return res
        .status(200)
        .json({ user, message: "User logged in successfull" });
    } else {
      return res.status(404).json({ message: "Invalid email and password" });
    }
  } catch (err) {
    next(err);
  }
});

routing.get("/getAllUsers", async (req, res, next) => {
  try {
    let users = await service.fetchUserDetails();
    if (users) {
      return res
        .status(200)
        .json({ users, message: "Users fetched successfully" });
    } else {
      return res.status(404).json({ message: "No users found" });
    }
  } catch (err) {
    next(err);
  }
});

routing.post("/addExpenses", async (req, res, next) => {
  try {
    let expenseObj = {
      expenseId: generateId(),
      productName: req.body.productName,
      amount: req.body.amount,
      category: req.body.category,
      date: req.body.date,
      description: req.body.description,
    };
    let expense = await service.createNewExpense(expenseObj);
    if (expense) {
      return res
        .status(200)
        .json({
          expense,
          message: `Expense added successfully: ${expenseObj.expenseId}`,
        });
    } else {
      return res.status(404).json({ message: `Failed to add the expense` });
    }
  } catch (err) {
    next(err);
  }
});

routing.get("/getAllExpenses", async (req, res, next) => {
  try {
    let result = await service.getAllExpenses();

    if (result) {
      return res.status(200).json(result);
    } else {
      return res.status(404).json({ message: "No expenses found" });
    }
  } catch (err) {
    next(err);
  }
});

routing.get("/getExpenseById/:expenseId", async (req, res, next) => {
  try {
    let expenseId = req.params.expenseId;

    let result = await service.getExpenseById(expenseId);

    if (result) {
      return res.status(200).json(result);
    } else {
      return res.status(404).json({ message: "No expense found on this id" });
    }
  } catch (err) {
    next(err);
  }
});

routing.delete("/deleteExpense/:expenseId", async (req, res, next) => {
  try {
    let expenseId = req.params.expenseId;

    let result = await service.deleteExpense(expenseId);

    return res
      .status(200)
      .json({ message: "Expense deleted successfully: " + expenseId });
  } catch (err) {
    next(err);
  }
});

routing.put("/updateExpense/:expenseId", async (req, res, next) => {
  try {
    let expenseId = req.params.expenseId;

    let expenseObj = req.body;

    let result = await service.updateExpense(expenseId, expenseObj);

    return res
      .status(200)
      .json({ result, message: "expense updated successfully: " + expenseId });
  } catch (err) {
    next(err);
  }
});

routing.get("/getTotalAmountByCatgeory", async (req, res, next) => {
  try {
    let result = await service.getTotalAmountByCategory();

    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

module.exports = routing;
