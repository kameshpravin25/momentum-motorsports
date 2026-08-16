import { useState, useEffect } from 'react';
import Header from '../components/Header';
import MetricCards from '../components/MetricCards';
import InventoryTable from '../components/InventoryTable';
import TransactionTable from '../components/TransactionTable';
import { subscribeInventory, subscribeTransactions } from '../utils/storage';

export default function MechanicDashboard({ onLogout }) {
    const [inventory, setInventory] = useState([]);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const unsubInv = subscribeInventory(setInventory);
        const unsubTxn = subscribeTransactions(setTransactions);
        return () => { unsubInv(); unsubTxn(); };
    }, []);

    return (
        <div className="dashboard">
            <Header role="Mechanic" onLogout={onLogout} />
            <main className="dashboard-main">
                <MetricCards inventory={inventory} transactions={transactions} />
                <InventoryTable inventory={inventory} isManager={false} />
                <TransactionTable transactions={transactions} isManager={false} />
                <footer className="app-footer">
                    Momentum Motorsports Inventory V2 -- View Only
                </footer>
            </main>
        </div>
    );
}
