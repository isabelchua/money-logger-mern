const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");

dotenv.config({ path: "./config/config.env" });

connectDB();

const transactions = require("./routes/transactions");

const app = express();

// this will allow the use of body parser
app.use(express.json());

// Morgan
if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}

app.use("/api/v1/transactions", transactions);

const PORT = process.env.PORT || 5000;

app.listen(
	PORT,
	console.log(
		`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
			.bold
	)
);
// app.get("/", (req, res) => res.send("Hello"));
