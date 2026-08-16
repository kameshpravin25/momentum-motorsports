import { useState } from 'react';
import { exportInventoryCSV, deleteInventoryItem } from '../utils/storage';
import './Tables.css';

export default function InventoryTable({ inventory, isManager }) {
    const [search, setSearch] = useState('');

    const filtered = inventory.filter((i) => {
        const q = search.toLowerCase();
        return (
            (i.itemName || '').toLowerCase().includes(q) ||
            (i.partName || '').toLowerCase().includes(q) ||
            (i.partNumber || '').toLowerCase().includes(q) ||
            (i.category || '').toLowerCase().includes(q)
        );
    });

    const handleDelete = async (id) => {
        if (window.confirm('Delete this inventory item?')) {
            await deleteInventoryItem(id);
        }
    };

    return (
        <div className="card">
            <h2 className="card-title">Inventory</h2>
            <input
                type="text"
                className="search-input"
                placeholder="Search item, part, number, category..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            {isManager && (
                <button className="btn-secondary" onClick={() => exportInventoryCSV(filtered)}>
                    Export Inventory CSV
                </button>
            )}
            <div className="table-wrap">
                <table>
                    <thead>
                        <tr>
                            <th>Item Name</th>
                            <th>Part Name</th>
                            <th>Part No.</th>
                            <th>Category</th>
                            <th>Location</th>
                            <th>Qty</th>
                            <th>Min</th>
                            {isManager && <th></th>}
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.length === 0 ? (
                            <tr><td colSpan={isManager ? 8 : 7} className="empty-row">No items found</td></tr>
                        ) : (
                            filtered.map((i) => (
                                <tr key={i.id} className={i.currentQty <= (i.minQty || 0) ? 'low-stock-row' : ''}>
                                    <td>{i.itemName}</td>
                                    <td>{i.partName}</td>
                                    <td>{i.partNumber}</td>
                                    <td>{i.category}</td>
                                    <td>{i.location}</td>
                                    <td><strong>{i.currentQty}</strong></td>
                                    <td>{i.minQty}</td>
                                    {isManager && (
                                        <td>
                                            <button className="btn-delete-sm" onClick={() => handleDelete(i.id)}>Delete</button>
                                        </td>
                                    )}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
