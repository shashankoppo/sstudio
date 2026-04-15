import { useState, useEffect } from 'react';
import { Plus, Trash2, Printer, Eye, Save, X } from 'lucide-react';
import { api } from '../../lib/api';
import { Invoice, InvoiceItem } from '../../types/database';

export function Invoices() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [currentInvoice, setCurrentInvoice] = useState<Partial<Invoice> | null>(null);
  const [items, setItems] = useState<Partial<InvoiceItem>[]>([]);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const stats = {
    total: invoices.reduce((sum, inv) => sum + inv.total_amount, 0),
    paid: invoices.filter(inv => inv.status === 'paid').reduce((sum, inv) => sum + inv.total_amount, 0),
    pending: invoices.filter(inv => inv.status !== 'paid' && inv.status !== 'cancelled').reduce((sum, inv) => sum + inv.total_amount, 0),
    count: invoices.length
  };

  const fetchInvoices = async () => {
    try {
      const data = await api.invoices.list();
      setInvoices(data);
    } catch (error) {
      console.error('Error fetching invoices:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setCurrentInvoice({
      client_name: '',
      client_email: '',
      client_phone: '',
      client_address: '',
      status: 'draft',
      tax_amount: 0,
      discount_amount: 0,
      notes: ''
    });
    setItems([{ description: '', quantity: 1, unit_price: 0, amount: 0 }]);
    setShowModal(true);
  };

  const handleAddItem = () => {
    setItems([...items, { description: '', quantity: 1, unit_price: 0, amount: 0 }]);
  };

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: keyof InvoiceItem, value: any) => {
    const newItems = [...items];
    const item = { ...newItems[index], [field]: value };
    
    if (field === 'quantity' || field === 'unit_price') {
      item.amount = (item.quantity || 0) * (item.unit_price || 0);
    }
    
    newItems[index] = item;
    setItems(newItems);
  };

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + (item.amount || 0), 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    return subtotal + (Number(currentInvoice?.tax_amount) || 0) - (Number(currentInvoice?.discount_amount) || 0);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const invoiceData = {
        ...currentInvoice,
        items,
        total_amount: calculateTotal()
      };

      if (currentInvoice?.id) {
        await api.invoices.update(currentInvoice.id, invoiceData);
      } else {
        await api.invoices.create(invoiceData);
      }

      setShowModal(false);
      fetchInvoices();
    } catch (error) {
      alert('Error saving invoice');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this invoice?')) {
      await api.invoices.delete(id);
      fetchInvoices();
    }
  };

  const handleView = async (invoice: Invoice) => {
    try {
      const fullInvoice = await api.invoices.get(invoice.id);
      setCurrentInvoice(fullInvoice);
      setItems(fullInvoice.items || []);
      setShowViewModal(true);
    } catch (error) {
      alert('Error fetching invoice details');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'sent': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Invoices</h1>
          <p className="text-gray-600 mt-1">{invoices.length} total invoices</p>
        </div>

        <button
          onClick={handleCreate}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Invoice
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500 mb-1">Total Invoiced</p>
          <p className="text-2xl font-bold text-gray-900">₹{stats.total.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500 mb-1">Total Paid</p>
          <p className="text-2xl font-bold text-green-600">₹{stats.paid.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500 mb-1">Pending Payment</p>
          <p className="text-2xl font-bold text-orange-600">₹{stats.pending.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500 mb-1">Total Invoices</p>
          <p className="text-2xl font-bold text-blue-600">{stats.count}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Inv #</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{invoice.invoice_number}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{invoice.client_name}</td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {new Date(invoice.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                  ₹{invoice.total_amount.toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                    {invoice.status.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-medium">
                  <div className="flex space-x-3">
                    <button 
                      onClick={() => handleView(invoice)}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => { handleView(invoice); setTimeout(() => window.print(), 500); }}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      <Printer className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(invoice.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50">
              <h2 className="text-xl font-bold text-gray-900">
                {currentInvoice?.id ? 'Edit Invoice' : 'Create New Invoice'}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSave} className="flex-1 overflow-auto p-6">
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-700">Client Information</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Client Name *</label>
                    <input
                      type="text"
                      required
                      value={currentInvoice?.client_name || ''}
                      onChange={(e) => setCurrentInvoice({ ...currentInvoice!, client_name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={currentInvoice?.client_email || ''}
                      onChange={(e) => setCurrentInvoice({ ...currentInvoice!, client_email: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <input
                        type="text"
                        value={currentInvoice?.client_phone || ''}
                        onChange={(e) => setCurrentInvoice({ ...currentInvoice!, client_phone: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                      <select
                        value={currentInvoice?.status || 'draft'}
                        onChange={(e) => setCurrentInvoice({ ...currentInvoice!, status: e.target.value as any })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="draft">Draft</option>
                        <option value="sent">Sent</option>
                        <option value="paid">Paid</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-700">Client Address</h3>
                  <textarea
                    rows={4}
                    value={currentInvoice?.client_address || ''}
                    onChange={(e) => setCurrentInvoice({ ...currentInvoice!, client_address: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                </div>
              </div>

              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-gray-700">Line Items</h3>
                  <button
                    type="button"
                    onClick={handleAddItem}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    + Add Item
                  </button>
                </div>

                <table className="w-full">
                  <thead>
                    <tr className="text-left text-xs font-semibold text-gray-500 uppercase border-b border-gray-200">
                      <th className="pb-2">Description</th>
                      <th className="pb-2 w-24 text-center">Qty</th>
                      <th className="pb-2 w-32 text-right">Unit Price</th>
                      <th className="pb-2 w-32 text-right">Amount</th>
                      <th className="pb-2 w-12"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {items.map((item, index) => (
                      <tr key={index}>
                        <td className="py-3">
                          <input
                            type="text"
                            required
                            value={item.description || ''}
                            onChange={(e) => updateItem(index, 'description', e.target.value)}
                            className="w-full text-sm border-0 focus:ring-0 p-0"
                            placeholder="Description"
                          />
                        </td>
                        <td className="py-3 px-2">
                          <input
                            type="number"
                            required
                            value={item.quantity || 0}
                            onChange={(e) => updateItem(index, 'quantity', parseFloat(e.target.value))}
                            className="w-full text-sm text-center border-0 focus:ring-0 p-0"
                          />
                        </td>
                        <td className="py-3 px-2">
                          <input
                            type="number"
                            required
                            value={item.unit_price || 0}
                            onChange={(e) => updateItem(index, 'unit_price', parseFloat(e.target.value))}
                            className="w-full text-sm text-right border-0 focus:ring-0 p-0"
                          />
                        </td>
                        <td className="py-3 text-sm text-right font-medium">
                          ₹{(item.amount || 0).toLocaleString()}
                        </td>
                        <td className="py-3 text-right">
                          <button
                            type="button"
                            onClick={() => handleRemoveItem(index)}
                            className="text-red-400 hover:text-red-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="grid grid-cols-2 gap-8 pt-6 border-t border-gray-200">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <textarea
                    rows={3}
                    value={currentInvoice?.notes || ''}
                    onChange={(e) => setCurrentInvoice({ ...currentInvoice!, notes: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                  ></textarea>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{calculateSubtotal().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <span>Tax Amount</span>
                    <input
                      type="number"
                      value={currentInvoice?.tax_amount || 0}
                      onChange={(e) => setCurrentInvoice({ ...currentInvoice!, tax_amount: parseFloat(e.target.value) })}
                      className="w-24 px-2 py-1 border border-gray-300 rounded text-right text-sm"
                    />
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <span>Discount</span>
                    <input
                      type="number"
                      value={currentInvoice?.discount_amount || 0}
                      onChange={(e) => setCurrentInvoice({ ...currentInvoice!, discount_amount: parseFloat(e.target.value) })}
                      className="w-24 px-2 py-1 border border-gray-300 rounded text-right text-sm"
                    />
                  </div>
                  <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t border-gray-100">
                    <span>Total</span>
                    <span>₹{calculateTotal().toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Invoice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showViewModal && currentInvoice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 print:bg-white print:p-0">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col print:shadow-none print:max-h-none print:w-full print:rounded-none">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50 print:hidden">
              <h2 className="text-xl font-bold text-gray-900">Invoice Details</h2>
              <div className="flex items-center space-x-3">
                <button
                  onClick={handlePrint}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Printer className="w-4 h-4 mr-2" />
                  Print
                </button>
                <button onClick={() => setShowViewModal(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-auto p-12 bg-white print:overflow-visible" id="printable-invoice">
              <div className="flex justify-between items-start mb-12">
                <div>
                  <h1 className="text-4xl font-black text-blue-600 tracking-tighter">SURAJ STUDIO</h1>
                  <p className="text-gray-500 mt-2">Premium Cinematic Photography</p>
                </div>
                <div className="text-right">
                  <h2 className="text-2xl font-bold text-gray-900">INVOICE</h2>
                  <p className="text-gray-600">#{currentInvoice.invoice_number}</p>
                  <p className="text-gray-600 mt-1">Date: {new Date(currentInvoice.created_at!).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-12 mb-12">
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Invoice To</p>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{currentInvoice.client_name}</h3>
                  <p className="text-gray-600 whitespace-pre-wrap leading-relaxed">{currentInvoice.client_address}</p>
                  <p className="text-gray-600 mt-2">{currentInvoice.client_email}</p>
                  <p className="text-gray-600">{currentInvoice.client_phone}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Company Details</p>
                  <p className="text-gray-900 font-semibold">Suraj Studio</p>
                  <p className="text-gray-600">Sector 12, Main Road</p>
                  <p className="text-gray-600">Raipur, Chhattisgarh</p>
                  <p className="text-gray-600 mt-2">+91 98765 43210</p>
                  <p className="text-gray-600">hello@surajstudio.com</p>
                </div>
              </div>

              <table className="w-full mb-12">
                <thead>
                  <tr className="border-b-2 border-gray-100">
                    <th className="py-4 text-left font-bold text-gray-900">Description</th>
                    <th className="py-4 text-center font-bold text-gray-900 w-24">Qty</th>
                    <th className="py-4 text-right font-bold text-gray-900 w-32">Unit Price</th>
                    <th className="py-4 text-right font-bold text-gray-900 w-32">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {items.map((item, index) => (
                    <tr key={index}>
                      <td className="py-5 text-gray-700">{item.description}</td>
                      <td className="py-5 text-center text-gray-600">{item.quantity}</td>
                      <td className="py-5 text-right text-gray-600">₹{item.unit_price?.toLocaleString()}</td>
                      <td className="py-5 text-right font-semibold text-gray-900">₹{item.amount?.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex justify-end">
                <div className="w-64 space-y-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{items.reduce((sum, i) => sum + (i.amount || 0), 0).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span>₹{currentInvoice.tax_amount?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Discount</span>
                    <span className="text-red-500">- ₹{currentInvoice.discount_amount?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-2xl font-bold text-blue-600 pt-3 border-t-2 border-gray-100">
                    <span>Total</span>
                    <span>₹{currentInvoice.total_amount?.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {currentInvoice.notes && (
                <div className="mt-12 pt-12 border-t border-gray-100">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Additional Notes</p>
                  <p className="text-gray-600 italic leading-relaxed">{currentInvoice.notes}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
