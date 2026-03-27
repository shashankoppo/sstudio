
import { useState, useEffect } from 'react';
import { Plus, Trash2, Upload, Download, Check, Edit2 } from 'lucide-react';
import { api } from '../../lib/api';
import { PortfolioItem, PortfolioCategory } from '../../types/database';

export function Portfolio() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [categories, setCategories] = useState<PortfolioCategory[]>([]);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [subCategoryFilter, setSubCategoryFilter] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    category_id: '',
    sub_category: '',
    title: '',
    description: '',
    image: null as File | null,
    image_url: '' // For preview when editing
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [items, categories] = await Promise.all([
      api.portfolio.items.list(),
      api.portfolio.categories.list(),
    ]);

    setItems(items);
    setCategories(categories);
    setLoading(false);
  };

  const handleImageUpload = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        resolve(result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.image && !editingId) return; // Image required for new items

    try {
      let imageUrl = formData.image_url;
      if (formData.image) {
        imageUrl = await handleImageUpload(formData.image);
      }

      const itemData = {
        category_id: formData.category_id,
        sub_category: formData.sub_category || null,
        title: formData.title,
        description: formData.description || null,
        image_url: imageUrl,
      };

      if (editingId) {
        await api.portfolio.items.update(editingId, itemData);
      } else {
        await api.portfolio.items.create(itemData);
      }

      setFormData({ category_id: '', sub_category: '', title: '', description: '', image: null, image_url: '' });
      setShowAddForm(false);
      setEditingId(null);
      fetchData();
    } catch (error) {
      alert('Error saving item');
      console.error(error);
    }
  };

  const openEditModal = (item: PortfolioItem) => {
    setEditingId(item.id);
    setFormData({
      category_id: item.category_id,
      sub_category: item.sub_category || '',
      title: item.title,
      description: item.description || '',
      image: null,
      image_url: item.image_url
    });
    setShowAddForm(true);
  };

  const toggleSelectItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent opening edit modal when selecting
    const newSelected = new Set(selectedItems);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedItems(newSelected);
  };

  const deleteSelected = async () => {
    if (selectedItems.size === 0) return;
    if (!confirm(`Delete ${selectedItems.size} items?`)) return;

    for (const id of selectedItems) {
      await api.portfolio.items.delete(id);
    }
    setSelectedItems(new Set());
    fetchData();
  };

  const exportToJSON = () => {
    const json = JSON.stringify(items, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  const importFromJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        for (const item of data) {
          await api.portfolio.items.create(item);
        }
        alert('Import successful!');
        fetchData();
      } catch {
        alert('Invalid JSON file');
      }
    };
    reader.readAsText(file);
  };

  const uniqueSubCategories = [...new Set(items.map(i => i.sub_category).filter(Boolean))];

  const filteredItems = items.filter(item => {
    if (categoryFilter !== 'all' && item.category_id !== categoryFilter) return false;
    if (subCategoryFilter !== 'all' && item.sub_category !== subCategoryFilter) return false;
    return true;
  });

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Portfolio Manager</h1>
          <p className="text-gray-600 mt-1">{items.length} total items</p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => {
              setEditingId(null);
              setFormData({ category_id: '', sub_category: '', title: '', description: '', image: null, image_url: '' });
              setShowAddForm(true);
            }}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Item
          </button>

          <label className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 cursor-pointer">
            <Upload className="w-4 h-4 mr-2" />
            Import JSON
            <input type="file" accept=".json" onChange={importFromJSON} className="hidden" />
          </label>

          <button onClick={exportToJSON} className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
            <Download className="w-4 h-4 mr-2" />
            Export JSON
          </button>
        </div>
      </div>

      {showAddForm && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">{editingId ? 'Edit Item' : 'Add Portfolio Item'}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={formData.category_id}
                  onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select category</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sub-Category</label>
                <input
                  type="text"
                  value={formData.sub_category}
                  onChange={(e) => setFormData({ ...formData, sub_category: e.target.value })}
                  placeholder="e.g., Haldi, Reception"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
              {formData.image_url && !formData.image && (
                <div className="mb-2">
                  <img src={formData.image_url} alt="Current" className="h-20 w-20 object-cover rounded" />
                  <p className="text-xs text-gray-500 mt-1">Current Image</p>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFormData({ ...formData, image: e.target.files?.[0] || null })}
                required={!editingId}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div className="flex gap-3">
              <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                {editingId ? 'Update Item' : 'Add Item'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false);
                  setEditingId(null);
                }}
                className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="flex gap-4 mb-6">
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg"
        >
          <option value="all">All Categories</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>

        <select
          value={subCategoryFilter}
          onChange={(e) => setSubCategoryFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg"
        >
          <option value="all">All Sub-Categories</option>
          {uniqueSubCategories.map(sub => (
            <option key={sub} value={sub}>{sub}</option>
          ))}
        </select>

        {selectedItems.size > 0 && (
          <button
            onClick={deleteSelected}
            className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Selected ({selectedItems.size})
          </button>
        )}
      </div>

      <div className="grid grid-cols-4 gap-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className={`relative bg-white rounded-lg shadow overflow-hidden group border-2 transition-all ${selectedItems.has(item.id) ? 'border-blue-500' : 'border-transparent'
              }`}
          >
            <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
              <button
                onClick={(e) => { e.stopPropagation(); openEditModal(item); }}
                className="bg-white text-gray-600 hover:text-blue-600 rounded-full p-2 shadow-sm"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => toggleSelectItem(item.id, e)}
                className={`bg-white rounded-full p-2 shadow-sm ${selectedItems.has(item.id) ? 'text-blue-600' : 'text-gray-400'}`}
              >
                <Check className="w-4 h-4" />
              </button>
            </div>

            <img src={item.image_url} alt={item.title} className="w-full h-48 object-cover" />

            <div className="p-4">
              <h3 className="font-semibold text-gray-900 truncate" title={item.title}>{item.title}</h3>
              {item.sub_category && (
                <p className="text-sm text-gray-500">{item.sub_category}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
