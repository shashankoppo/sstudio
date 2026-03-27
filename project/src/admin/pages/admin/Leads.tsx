import { useState, useEffect } from 'react';
import { Download, Upload, Trash2 } from 'lucide-react';
import Papa from 'papaparse';
import { api } from '../../lib/api';
import { Lead } from '../../types/database';

export function Leads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    const data = await api.leads.list();
    setLeads(data);
    setLoading(false);
  };

  const updateStatus = async (id: string, status: string) => {
    await api.leads.update(id, { status });
    fetchLeads();
  };

  const deleteLead = async (id: string) => {
    if (confirm('Delete this lead?')) {
      await api.leads.delete(id);
      fetchLeads();
    }
  };

  const exportToCSV = () => {
    const csv = Papa.unparse(leads);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leads-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const importFromCSV = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      complete: async (results) => {
        try {
          for (const lead of results.data) {
            if (lead.name && lead.email) {
              await api.leads.create(lead);
            }
          }
          alert('Leads imported successfully!');
          fetchLeads();
        } catch {
          alert('Error importing leads');
        }
      },
    });
  };

  const filteredLeads = statusFilter === 'all'
    ? leads
    : leads.filter(lead => lead.status === statusFilter);

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Leads</h1>
          <p className="text-gray-600 mt-1">{leads.length} total leads</p>
        </div>

        <div className="flex gap-3">
          <label className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 cursor-pointer transition-colors">
            <Upload className="w-4 h-4 mr-2" />
            Import CSV
            <input type="file" accept=".csv" onChange={importFromCSV} className="hidden" />
          </label>

          <button
            onClick={exportToCSV}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </button>
        </div>
      </div>

      <div className="mb-4">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Status</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="converted">Converted</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">City</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Service</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredLeads.map((lead) => (
              <tr key={lead.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">{lead.name}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{lead.email}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{lead.phone || '-'}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{lead.city || '-'}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{lead.service || '-'}</td>
                <td className="px-6 py-4">
                  <select
                    value={lead.status}
                    onChange={(e) => updateStatus(lead.id, e.target.value)}
                    className="text-sm px-3 py-1 border border-gray-300 rounded"
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="converted">Converted</option>
                    <option value="closed">Closed</option>
                  </select>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => deleteLead(lead.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
