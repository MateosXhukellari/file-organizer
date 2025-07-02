import {calculateInvestmentResults} from'./investment'
import {formatter} from "./investment";

export default function Results({inputs}){
    const results = calculateInvestmentResults(inputs)
    const initialInvestment = results[0].valueEndOfYear - results[0].interest - results[0].annualInvestment;

    return <table id='result'>
        <thead>
        <tr>
            <th>Year</th>
            <th>Investment</th>
            <th>Interest</th>
            <th>Total Interest</th>
            <th>Invested Capital</th>
        </tr>
        </thead>
        <tbody>
        {results.map((yearData) => {
            const totalYear = yearData.valueEndOfYear - yearData.annualInvestment * yearData.year - initialInvestment
            const totalAmountInvested = yearData.valueEndOfYear - totalYear
            return <tr key={yearData.year}>
                <td>{yearData.year}</td>
                <td>{formatter.format(yearData.valueEndOfYear)}</td>
                <td>{formatter.format(yearData.interest)}</td>
                <td>{formatter.format(totalYear)}</td>
                <td>{formatter.format(totalAmountInvested)}</td>
            </tr>
        })}
        </tbody>
    </table>
}