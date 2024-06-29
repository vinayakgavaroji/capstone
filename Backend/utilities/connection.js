const { Schema } = require("mongoose");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const url = "mongodb://localhost:27017/WealthWiseDB";

const signUpSchema = Schema(
    {
        userId: { type: Number, unique: true },
        username: { type: String, require },
        email: { type: String, require: true, unique: true },
        password: { type: String, require: true },
    },
    { collection: "signup", timestamps: true }
);

let today = new Date();

let cDate =
    today.getMonth() + 1 + "-" + today.getDate() + "-" + today.getFullYear();

const expenseSchema = Schema(
    {
        expenseId: { type: Number, require: true },
        productName: { type: String, require: true },
        amount: { type: Number, require: true },
        category: { type: String, require: true },
        date: { type: Date, require: true, default: cDate },
        description: { type: String, require: true },
    },
    { collection: "expenses", timestamps: true }
);

let connection = {};

connection.getSignUpCollection = async () => {
    try {
        await mongoose.connect(url, console.log("DB Connected Successfully.!"));

        let signUpModel = await mongoose.model("signup", signUpSchema);

        return signUpModel;
    } catch (err) {
        let error = new Error(err.message);
        error.status = 500;
        throw error;
    }
};

connection.getExpensesCollection = async () => {
    try {
        await mongoose.connect(url, console.log("DB Connected Successfully.!"));
        let expenseModel = await mongoose.model("expenses", expenseSchema);
        return expenseModel;
    } catch (err) {
        let error = new Error(err.message);
        error.status = 500;
        throw error;
    }
};

module.exports = connection;
