import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import DeleteIcon from '@material-ui/icons/Delete';

export const Transaction = ({ transaction }) => {
	const { deleteTransaction } = useContext(GlobalContext);
	const sign = transaction.amount < 0 ? '-' : '+';

	return (
		<li className={transaction.amount < 0 ? 'minus' : 'plus'}>
			{transaction.text}{' '}
			<span>
				{sign}${Math.abs(transaction.amount)}
			</span>
			<div
				onClick={() => deleteTransaction(transaction.id)}
				className="delete-btn"
			>
				<DeleteIcon />
			</div>
		</li>
	);
};
