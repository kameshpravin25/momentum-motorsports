import { useState } from 'react';
import { addTransaction, updateInventoryItem } from '../utils/storage';

export default function ReturnForm({ inventory }) {
    const empty = { itemId: '', action: 'RETURNED', qty: '1', notes: '' };
    const [form, setForm] = useState(empty);
    const [loading, setLoading] = useState(false);

    const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

    const selectedItem = inventory.find((i) => i.id === form.itemId);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.itemId || !form.qty) return;
        const qty = Number(form.qty);
        setLoading(true);
        try {
            let newQty = selectedItem.currentQty;
            if (form.action === 'RETURNED' || form.action === 'RECEIVED') {
                newQty += qty;
            } else if (form.action === 'DAMAGED') {
                newQty = Math.max(0, newQty - qty);
            }
            await updateInventoryItem(form.itemId, { currentQty: newQty });
            await addTransaction({
                itemName: selectedItem.itemName,
                partName: selectedItem.partName,
                action: form.action,
                qty,
                givenTo: form.notes || '',
                carKart: '',
                raceEvent: '',
            });
            setForm(empty);
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    };

    return (
        <div className="card">
            <h2 className="card-title">Return / Receive / Damage</h2>
            <form onSubmit={handleSubmit} className="form-grid">
                <label className="form-field">
                    <span className="form-label">Item / Part</span>
                    <select value={form.itemId} onChange={set('itemId')} required>
                        <option value="">-- Select Part --</option>
                        {inventory.map((i) => (
                            <option key={i.id} value={i.id}>
                                {i.itemName} &rarr; {i.partName} ({i.partNumber}) -- {i.currentQty} left
                            </option>
                        ))}
                    </select>
                </label>
                <label className="form-field">
                    <span className="form-label">Action</span>
                    <select value={form.action} onChange={set('action')}>
                        <option value="RETURNED">Returned</option>
                        <option value="RECEIVED">Received</option>
                        <option value="DAMAGED">Damaged</option>
                    </select>
                </label>
                <label className="form-field">
                    <span className="form-label">Quantity</span>
                    <input type="number" value={form.qty} onChange={set('qty')} min="1" required />
                </label>
                <label className="form-field">
                    <span className="form-label">Notes</span>
                    <input type="text" value={form.notes} onChange={set('notes')} placeholder="Optional notes" />
                </label>
                <button type="submit" className="btn-primary" disabled={loading}>
                    {loading ? 'Updating...' : 'Update Inventory'}
                </button>
            </form>
        </div>
    );
}
