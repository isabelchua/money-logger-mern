import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";

//Initial State
const initialState = {
	transactions: [],
	error: null,
	loading: true
	//sample data
	// { id: 1, text: 'Groceries', amount: -180 },
	// { id: 2, text: 'Salary', amount: 900 },
	// { id: 3, text: 'Gas', amount: -40 }
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
	const [state, dispatch] = useReducer(AppReducer, initialState);

	//actions
	async function getTransactions() {
		try {
			const res = await axios.get("/api/v1/transactions");
			//res.data.data
			dispatch({
				type: "GET_TRANSACTIONS",
				payload: res.data.data
			});
		} catch (err) {
			dispatch({
				type: "TRANSACTION_ERROR",
				payload: err.response.data.error
			});
		}
	}

	async function deleteTransaction(id) {
		try {
			await axios.delete(`/api/v1/transactions/${id}`);
			console.log(id);
			dispatch({
				type: "DELETE_TRANSACTION",
				payload: id
			});
		} catch (err) {
			dispatch({
				type: "TRANSACTION_ERROR",
				payload: err.response.data.error
			});
		}
	}

	async function addTransaction(transaction) {
		const config = {
			headers: {
				"Content-Type": "application/json"
			}
		};
		try {
			const res = await axios.post(
				"/api/v1/transactions",
				transaction,
				config
			);

			dispatch({
				type: "ADD_TRANSACTION",
				payload: res.data.data
			});
		} catch (err) {
			dispatch({
				type: "TRANSACTION_ERROR",
				payload: err.response.data.error
			});
		}
	}

	return (
		<GlobalContext.Provider
			value={{
				transactions: state.transactions,
				getTransactions,
				error: state.error,
				loading: state.loading,
				deleteTransaction,
				addTransaction
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};
