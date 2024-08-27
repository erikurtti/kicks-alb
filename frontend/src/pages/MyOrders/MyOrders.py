from flask import Flask, jsonify, request, send_file
from fpdf import FPDF
import io

app = Flask(__name__)

# Sample order data
orders = [
    {
        'id': 1,
        'items': [
            {'name': 'Game1', 'description': 'Description1', 'quantity': 1},
            {'name': 'Game2', 'description': 'Description2', 'quantity': 2}
        ],
        'amount': 50,
        'status': 'Shipped',
        'name': 'John Doe',
        'phone': '123-456-7890',
        'email': 'john.doe@example.com'
    }
]

@app.route('/api/orders', methods=['GET'])
def get_orders():
    return jsonify(orders)

@app.route('/api/invoice/<int:order_id>', methods=['GET'])
def generate_invoice(order_id):
    # Find the order by ID
    order = next((o for o in orders if o['id'] == order_id), None)
    if not order:
        return jsonify({'error': 'Order not found'}), 404

    # Create PDF
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font('Arial', 'B', 16)
    
    # Header
    pdf.cell(0, 10, 'Invoice', 0, 1, 'C')
    pdf.set_font('Arial', '', 12)
    pdf.cell(0, 10, f"Name: {order['name']}", 0, 1)
    pdf.cell(0, 10, f"Phone: {order['phone']}", 0, 1)
    pdf.cell(0, 10, f"Email: {order['email']}", 0, 1)
    pdf.cell(0, 10, '', 0, 1)  # Empty line
    
    # Order details
    pdf.cell(0, 10, 'Order Details:', 0, 1, 'L')
    for item in order['items']:
        pdf.cell(0, 10, f"{item['name']} x {item['description']} x {item['quantity']}", 0, 1)
    
    pdf.cell(0, 10, '', 0, 1)  # Empty line
    pdf.cell(0, 10, f"Amount: ${order['amount']}.00", 0, 1)
    pdf.cell(0, 10, f"Status: {order['status']}", 0, 1)

    # Save PDF to a BytesIO object
    pdf_output = io.BytesIO()
    pdf.output(pdf_output)
    pdf_output.seek(0)

    return send_file(pdf_output, as_attachment=True, download_name='invoice.pdf', mimetype='application/pdf')

if __name__ == '__main__':
    app.run(debug=True)
