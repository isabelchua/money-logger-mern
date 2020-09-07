import React, { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const AddTransaction = () => {
	const [text, setText] = useState('');
	const [amount, setAmount] = useState(0);

	const { addTransaction } = useContext(GlobalContext);

	const onSubmit = e => {
		e.preventDefault();

		const newTransaction = {
			id: Math.floor(Math.random() * 100000000),
			text,
			//convert string to a number
			amount: +amount
		};

		addTransaction(newTransaction);
	};

	const clickExpense = e => {
		e.preventDefault();
		console.log(isNaN(amount));
		if (amount === 0) {
			return alert("Amount can not be '0'");
		} else if (amount === '') {
			return alert('Amount can not be blank or a String!');
		} else if (text === '') {
			return alert('Enter transaction name');
		} else {
			const newTransaction = {
				id: Math.floor(Math.random() * 100000000),
				text,
				amount: -Math.abs(+amount)
			};

			addTransaction(newTransaction);
		}
	};

	return (
		<>
			<form onSubmit={onSubmit}>
				<div className="form-control">
					<label htmlFor="text">Transaction</label>
					<input
						type="text"
						value={text}
						onChange={e => setText(e.target.value)}
						required
					/>
				</div>
				<div className="form-control">
					<label htmlFor="amount">Amount</label>
					<input
						type="number"
						value={amount}
						onChange={e => setAmount(e.target.value)}
						required
					/>
				</div>
				<button className="btn inc">ADD INCOME</button>
				<button onClick={clickExpense} className="exp btn">
					ADD EXPENSE
				</button>
			</form>
		</>
	);
};
