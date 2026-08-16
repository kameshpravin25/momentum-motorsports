import { exportTransactionsCSV } from '../utils/storage';
import './Tables.css';

export default function TransactionTable({ transactions, isManager }) {
    return (
        <div className="card">
            <h2 className="card-title">Issue / Transaction History</h2>
            {isManager && (
                <button className="btn-secondary" onClick={() => exportTransactionsCSV(transactions)}>
                    Export Transaction CSV
                </button>
            )}
            <div className="table-wrap">
                <table>
                    <thead>
                        <tr>
                            <th>Date & Time</th>
                            <th>Item</th>
                            <th>Part</th>
                            <th>Action</th>
                            <th>Qty</th>
                            <th>Given To / Person</th>
                            <th>Car / Kart</th>
                            <th>Race / Event</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.length === 0 ? (
                            <tr><td colSpan="8" className="empty-row">No transactions yet</td></tr>
                        ) : (
                            transactions.map((t) => (
                                <tr key={t.id}>
                                    <td className="nowrap">{t.timestamp}</td>
                                    <td>{t.itemName}</td>
                                    <td>{t.partName}</td>
                                    <td><span className={`action-badge action-${(t.action || '').toLowerCase()}`}>{t.action}</span></td>
                                    <td>{t.qty}</td>
                                    <td>{t.givenTo}</td>
                                    <td>{t.carKart}</td>
                                    <td>{t.raceEvent}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
