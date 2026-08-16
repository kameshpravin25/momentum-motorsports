import { useState } from 'react';
import { addInventoryItem } from '../utils/storage';

export default function AddItemForm() {
    const empty = { itemName: '', partName: '', partNumber: '', category: '', location: '', openingQty: '', minQty: '' };
    const [form, setForm] = useState(empty);
    const [loading, setLoading] = useState(false);

    const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.itemName || !form.partName || !form.openingQty) return;
        setLoading(true);
        try {
            await addInventoryItem(form);
            setForm(empty);
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    };

    return (
        <div className="card">
            <h2 className="card-title">Add New Inventory Item</h2>
            <p className="card-desc">Create the stock item first. "Item Name" can be the broad item and "Part Name" the exact component.</p>
            <form onSubmit={handleSubmit} className="form-grid">
                <label className="form-field">
                    <span className="form-label">Item Name</span>
                    <input type="text" value={form.itemName} onChange={set('itemName')} placeholder="e.g. Brake System" required />
                </label>
                <label className="form-field">
                    <span className="form-label">Part Name</span>
                    <input type="text" value={form.partName} onChange={set('partName')} placeholder="e.g. Front brake pad" required />
                </label>
                <label className="form-field">
                    <span className="form-label">Part Number</span>
                    <input type="text" value={form.partNumber} onChange={set('partNumber')} placeholder="e.g. Xx21xF" />
                </label>
                <label className="form-field">
                    <span className="form-label">Category</span>
                    <input type="text" value={form.category} onChange={set('category')} placeholder="e.g. Brakes" />
                </label>
                <label className="form-field">
                    <span className="form-label">Location / Bin</span>
                    <input type="text" value={form.location} onChange={set('location')} placeholder="e.g. Rack 4 /2" />
                </label>
                <label className="form-field">
                    <span className="form-label">Opening Qty</span>
                    <input type="number" value={form.openingQty} onChange={set('openingQty')} min="0" required />
                </label>
                <label className="form-field">
                    <span className="form-label">Min Qty (Low Stock Alert)</span>
                    <input type="number" value={form.minQty} onChange={set('minQty')} min="0" />
                </label>
                <button type="submit" className="btn-primary" disabled={loading}>
                    {loading ? 'Adding...' : 'Add to Inventory'}
                </button>
            </form>
        </div>
    );
}
