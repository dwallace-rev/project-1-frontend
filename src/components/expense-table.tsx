import axios from "axios"
import { useEffect, useState } from "react"
import { Employee, Expense } from "../dtos/dtos"
import ExpenseTableRow from "./expense-table-row";



export default function ExpenseTable(){
    
    const employeeData: Employee = JSON.parse(sessionStorage.getItem("employeeData"))
    const empId = employeeData.id;

    const [expenses, setExpenses] = useState([]);
    const tableRows = expenses.map(e => <ExpenseTableRow key={e.id} {...e}/>)

    async function getExpenses(){
        const expenses = await (await axios.get(`http://localhost:5000/employeeExpenses/${empId}`)).data
        setExpenses(expenses);
    }

    useEffect(()=>{
        getExpenses();
    },[])
    



    return(<><hr/>
    <h4>Your Expense Requests:</h4>
    <table>
        <thead>
            <tr>
                <th>Date</th>
                <th>Amount</th>
                <th className="expenseHeader">Reason</th>
                <th>Approved?</th>
                <th>Comment</th>
            </tr>
        </thead>
        <tbody>
            {tableRows}
        </tbody>
    </table>
    </>)
}