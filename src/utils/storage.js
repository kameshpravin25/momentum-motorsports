import { db } from '../firebase';
import {
    collection,
    addDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    doc,
    onSnapshot,
    writeBatch,
    query,
    orderBy,
    serverTimestamp,
} from 'firebase/firestore';

const INVENTORY_COL = 'inventory';
const TRANSACTIONS_COL = 'transactions';

// ---- Inventory ----
export function subscribeInventory(callback) {
    const q = query(collection(db, INVENTORY_COL));
    return onSnapshot(q, (snapshot) => {
        const items = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
        callback(items);
    });
}

export async function addInventoryItem(item) {
    return addDoc(collection(db, INVENTORY_COL), {
        ...item,
        openingQty: Number(item.openingQty),
        currentQty: Number(item.openingQty),
        minQty: Number(item.minQty),
        createdAt: serverTimestamp(),
    });
}

export async function updateInventoryItem(id, updates) {
    return updateDoc(doc(db, INVENTORY_COL, id), updates);
}

export async function deleteInventoryItem(id) {
    return deleteDoc(doc(db, INVENTORY_COL, id));
}

// ---- Transactions ----
export function subscribeTransactions(callback) {
    const q = query(collection(db, TRANSACTIONS_COL), orderBy('timestamp', 'desc'));
    return onSnapshot(q, (snapshot) => {
        const txns = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
        callback(txns);
    });
}

export async function addTransaction(txn) {
    return addDoc(collection(db, TRANSACTIONS_COL), {
        ...txn,
        qty: Number(txn.qty),
        timestamp: new Date().toLocaleString('en-GB'),
    });
}

// ---- Clear All ----
export async function clearAllData() {
    const batch = writeBatch(db);
    const invSnap = await getDocs(collection(db, INVENTORY_COL));
    invSnap.forEach((d) => batch.delete(d.ref));
    const txnSnap = await getDocs(collection(db, TRANSACTIONS_COL));
    txnSnap.forEach((d) => batch.delete(d.ref));
    return batch.commit();
}

// ---- CSV Export ----
function downloadCSV(filename, csvContent) {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
}

export function exportInventoryCSV(items) {
    const headers = ['Item Name', 'Part Name', 'Part No.', 'Category', 'Location', 'Current Qty', 'Min Qty'];
    const rows = items.map((i) =>
        [i.itemName, i.partName, i.partNumber, i.category, i.location, i.currentQty, i.minQty].join(',')
    );
    downloadCSV('inventory_export.csv', [headers.join(','), ...rows].join('\n'));
}

export function exportTransactionsCSV(txns) {
    const headers = ['Date & Time', 'Item', 'Part', 'Action', 'Qty', 'Given To', 'Car / Kart', 'Race / Event'];
    const rows = txns.map((t) =>
        [t.timestamp, t.itemName, t.partName, t.action, t.qty, t.givenTo || '', t.carKart || '', t.raceEvent || ''].join(',')
    );
    downloadCSV('transactions_export.csv', [headers.join(','), ...rows].join('\n'));
}
