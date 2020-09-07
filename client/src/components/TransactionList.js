import React, { useContext } from 'react';
import { Transaction } from './Transaction';

import { GlobalContext } from '../context/GlobalState';

export const TransactionList = () => {
	const { transactions } = useContext(GlobalContext);

	//transactions is an array so we loop through it
	//console.log(context);
	return (
		<>
			<h3>Transactions</h3>
			<ul className='list'>
				{transactions.map(transaction => (
					<Transaction key={transaction.id} transaction={transaction} />
				))}
			</ul>
		</>
	);
};
