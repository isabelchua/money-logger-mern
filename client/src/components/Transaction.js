import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import DeleteIcon from "@material-ui/icons/Delete";
import { numberWithCommas } from "../utils/format";

export const Transaction = ({ transaction }) => {
	const { deleteTransaction } = useContext(GlobalContext);
	const sign = transaction.amount < 0 ? "-" : "+";

	return (
		<li className={transaction.amount < 0 ? "minus" : "plus"}>
			{transaction.text}{" "}
			<span>
				{sign}${numberWithCommas(Math.abs(transaction.amount))}
			</span>
			<div
				onClick={() => deleteTransaction(transaction._id)}
				className="delete-btn"
			>
				<DeleteIcon />
			</div>
		</li>
	);
};
