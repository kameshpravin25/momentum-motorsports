import './MetricCards.css';

export default function MetricCards({ inventory, transactions }) {
    const differentParts = inventory.length;
    const totalUnits = inventory.reduce((sum, i) => sum + (i.currentQty || 0), 0);
    const lowStock = inventory.filter((i) => (i.currentQty || 0) <= (i.minQty || 0)).length;
    const itemsGiven = transactions.filter((t) => t.action === 'GIVEN').reduce((sum, t) => sum + (t.qty || 0), 0);

    const cards = [
        { label: 'Different Parts', value: differentParts },
        { label: 'Total Units Remaining', value: totalUnits },
        { label: 'Low Stock', value: lowStock },
        { label: 'Items Given', value: itemsGiven },
    ];

    return (
        <div className="metric-cards">
            {cards.map((c) => (
                <div className="metric-card" key={c.label}>
                    <span className="metric-label">{c.label}</span>
                    <span className="metric-value">{c.value}</span>
                </div>
            ))}
        </div>
    );
}
