import { useState } from 'react';
import { addTransaction, updateInventoryItem } from '../utils/storage';

export default function GivePartForm({ inventory }) {
    const empty = { itemId: '', qty: '1', givenTo: '', carKart: '', raceEvent: '' };
    const [form, setForm] = useState(empty);
    const [loading, setLoading] = useState(false);

    const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

    const selectedItem = inventory.find((i) => i.id === form.itemId);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.itemId || !form.qty || !form.givenTo) return;
        const qty = Number(form.qty);
        if (!selectedItem || qty > selectedItem.currentQty) return;
        setLoading(true);
        try {
            await updateInventoryItem(form.itemId, { currentQty: selectedItem.currentQty - qty });
            await addTransaction({
                itemName: selectedItem.itemName,
                partName: selectedItem.partName,
                action: 'GIVEN',
                qty,
                givenTo: form.givenTo,
                carKart: form.carKart,
                raceEvent: form.raceEvent,
            });
            setForm(empty);
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    };

    return (
        <div className="card">
            <h2 className="card-title">Give Part to Team / Mechanic</h2>
            <p className="card-desc">Enter who received the part. The software automatically records the exact date and time and subtracts the quantity from stock.</p>
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
                    <span className="form-label">Quantity Given</span>
                    <input type="number" value={form.qty} onChange={set('qty')} min="1" max={selectedItem?.currentQty || 999} required />
                </label>
                <label className="form-field">
                    <span className="form-label">Given To: Team / Mechanic</span>
                    <input type="text" value={form.givenTo} onChange={set('givenTo')} placeholder="e.g. Momentum Team / John" required />
                </label>
                <label className="form-field">
                    <span className="form-label">Car / Kart</span>
                    <input type="text" value={form.carKart} onChange={set('carKart')} placeholder="e.g. FLGB #27" />
                </label>
                <label className="form-field">
                    <span className="form-label">Race / Event</span>
                    <input type="text" value={form.raceEvent} onChange={set('raceEvent')} placeholder="e.g. Kari Round 4" />
                </label>
                <button type="submit" className="btn-primary" disabled={loading}>
                    {loading ? 'Processing...' : 'Give Part & Update Stock'}
                </button>
            </form>
        </div>
    );
}
