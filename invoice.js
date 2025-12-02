
document.addEventListener('DOMContentLoaded', function () {
    const invoice = JSON.parse(localStorage.getItem('latestInvoice'));
    const container = document.getElementById('invoice-content');

    if (!invoice) {
        container.innerHTML = '<p>No invoice found. Please complete a checkout first.</p>';
        return;
    }

    const html = `
        <div style="border: 1px solid #ccc; padding: 1.5rem; border-radius: 8px; background: #fafafa;">
            <h2>Lily of the Valley Spa</h2>
            <p><strong>Invoice #:</strong> ${invoice.invoiceNumber}</p>
            <p><strong>Date:</strong> ${invoice.date}</p>
            <p><strong>TRN:</strong> ${invoice.trn}</p>
            <h3>Shipping Information</h3>
            <p>${invoice.firstName} ${invoice.lastName}</p>
            <p>${invoice.address}, ${invoice.city}</p>
            <p>${invoice.email}</p>

            <h3 style="margin-top: 1.5rem;">Purchased Items</h3>
            <table style="width: 100%; border-collapse: collapse; margin: 1rem 0;">
                <thead>
                    <tr style="border-bottom: 2px solid #333;">
                        <th style="text-align: left;">Item</th>
                        <th>Qty</th>
                        <th>Price</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${invoice.items.map(item => `
                        <tr style="border-bottom: 1px solid #ddd;">
                            <td>${item.name}</td>
                            <td>${item.quantity}</td>
                            <td>$${item.price.toFixed(2)}</td>
                            <td>$${(item.price * item.quantity).toFixed(2)}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>

            <div style="text-align: right; margin-top: 1rem;">
                <p><strong>Subtotal:</strong> $${invoice.subtotal.toFixed(2)}</p>
                <p><strong>Discount (10%):</strong> -$${invoice.discount.toFixed(2)}</p>
                <p><strong>Tax (15%):</strong> $${invoice.tax.toFixed(2)}</p>
                <h3>Total: $${invoice.total.toFixed(2)}</h3>
            </div>

            <p style="margin-top: 1.5rem; color: green;">
                 Invoice has been sent to <strong>${invoice.email}</strong>
            </p>
        </div>
    `;
    container.innerHTML = html;
});