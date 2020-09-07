import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

//Initial State
const initialState = {
	transactions: [
		//sample data
		{ id: 1, text: 'Groceries', amount: -180 },
		{ id: 2, text: 'Salary', amount: 900 },
		{ id: 3, text: 'Gas', amount: -40 }
	]
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
	const [state, dispatch] = useReducer(AppReducer, initialState);

	//actions
	function deleteTransaction(id) {
		dispatch({
			type: 'DELETE_TRANSACTION',
			payload: id
		});
	}

	function addTransaction(transaction) {
		dispatch({
			type: 'ADD_TRANSACTION',
			payload: transaction
		});
	}

	return (
		<GlobalContext.Provider
			value={{
				transactions: state.transactions,
				deleteTransaction,
				addTransaction
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};
