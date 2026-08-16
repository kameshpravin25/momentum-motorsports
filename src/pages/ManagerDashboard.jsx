import { useState, useEffect } from 'react';
import Header from '../components/Header';
import MetricCards from '../components/MetricCards';
import AddItemForm from '../components/AddItemForm';
import GivePartForm from '../components/GivePartForm';
import ReturnForm from '../components/ReturnForm';
import InventoryTable from '../components/InventoryTable';
import TransactionTable from '../components/TransactionTable';
import { subscribeInventory, subscribeTransactions, clearAllData } from '../utils/storage';

export default function ManagerDashboard({ onLogout }) {
    const [inventory, setInventory] = useState([]);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const unsubInv = subscribeInventory(setInventory);
        const unsubTxn = subscribeTransactions(setTransactions);
        return () => { unsubInv(); unsubTxn(); };
    }, []);

    const handleClear = async () => {
        if (window.confirm('Are you sure you want to clear ALL data? This cannot be undone.')) {
            await clearAllData();
        }
    };

    return (
        <div className="dashboard">
            <Header role="Manager" onLogout={onLogout} />
            <main className="dashboard-main">
                <MetricCards inventory={inventory} transactions={transactions} />
                <AddItemForm />
                <GivePartForm inventory={inventory} />
                <ReturnForm inventory={inventory} />
                <InventoryTable inventory={inventory} isManager={true} />
                <TransactionTable transactions={transactions} isManager={true} />
                <div className="card" style={{ padding: '16px' }}>
                    <button className="btn-danger" onClick={handleClear}>Clear All Data</button>
                </div>
                <footer className="app-footer">
                    Momentum Motorsports Inventory V2 -- Data synced via cloud database.
                </footer>
            </main>
        </div>
    );
}
