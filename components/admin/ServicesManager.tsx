import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Service {
  _id: string;
  title: string;
  description: string;
  category: 'cybersecurity' | 'development' | 'design' | 'consulting';
  features: string[];
  pricing?: {
    startingAt?: number;
    currency?: string;
  };
  isActive: boolean;
  order: number;
}

const ServicesManager: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'cybersecurity' as const,
    features: [''],
    pricing: { startingAt: 0, currency: 'USD' },
    isActive: true,
    order: 0,
  });

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/services/admin`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error('Failed to fetch services:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingService
        ? `${apiUrl}/api/services/${editingService._id}`
        : `${apiUrl}/api/services`;
      
      const method = editingService ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          features: formData.features.filter(f => f.trim() !== ''),
        }),
      });

      if (response.ok) {
        setShowModal(false);
        setEditingService(null);
        resetForm();
        fetchServices();
      }
    } catch (error) {
      console.error('Failed to save service:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;

    try {
      await fetch(`${apiUrl}/api/services/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchServices();
    } catch (error) {
      console.error('Failed to delete service:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: 'cybersecurity',
      features: [''],
      pricing: { startingAt: 0, currency: 'USD' },
      isActive: true,
      order: 0,
    });
  };

  const openEditModal = (service: Service) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      description: service.description,
      category: service.category,
      features: service.features.length > 0 ? service.features : [''],
      pricing: service.pricing || { startingAt: 0, currency: 'USD' },
      isActive: service.isActive,
      order: service.order,
    });
    setShowModal(true);
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Services Management</h2>
        <button
          onClick={() => {
            resetForm();
            setEditingService(null);
            setShowModal(true);
          }}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          + Add Service
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div
            key={service._id}
            className="bg-white dark:bg-gray-950 p-6 rounded-lg shadow border border-slate-200 dark:border-gray-800"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{service.title}</h3>
                <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded">
                  {service.category}
                </span>
              </div>
              <span
                className={`text-xs px-2 py-1 rounded ${
                  service.isActive
                    ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                }`}
              >
                {service.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-gray-400 mb-4 line-clamp-2">
              {service.description}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => openEditModal(service)}
                className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(service._id)}
                className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white dark:bg-gray-950 rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6"
            >
              <h3 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">
                {editingService ? 'Edit Service' : 'Add New Service'}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                    Description *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-slate-900 dark:text-white"
                  >
                    <option value="cybersecurity">Cybersecurity</option>
                    <option value="development">Development</option>
                    <option value="design">Design</option>
                    <option value="consulting">Consulting</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                    Features
                  </label>
                  {formData.features.map((feature, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => {
                          const newFeatures = [...formData.features];
                          newFeatures[index] = e.target.value;
                          setFormData({ ...formData, features: newFeatures });
                        }}
                        placeholder="Feature description"
                        className="flex-1 px-4 py-2 rounded-lg border border-slate-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-slate-900 dark:text-white"
                      />
                      {formData.features.length > 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            setFormData({
                              ...formData,
                              features: formData.features.filter((_, i) => i !== index),
                            });
                          }}
                          className="px-3 py-2 bg-red-600 text-white rounded-lg"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, features: [...formData.features, ''] })}
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    + Add Feature
                  </button>
                </div>

                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                      Starting Price
                    </label>
                    <input
                      type="number"
                      value={formData.pricing.startingAt}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          pricing: { ...formData.pricing, startingAt: Number(e.target.value) },
                        })
                      }
                      className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                      Currency
                    </label>
                    <select
                      value={formData.pricing.currency}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          pricing: { ...formData.pricing, currency: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-slate-900 dark:text-white"
                    >
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="GBP">GBP</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      className="mr-2"
                    />
                    <span className="text-sm text-slate-700 dark:text-gray-300">Active</span>
                  </label>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                      Order
                    </label>
                    <input
                      type="number"
                      value={formData.order}
                      onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
                      className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    {editingService ? 'Update' : 'Create'} Service
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setEditingService(null);
                      resetForm();
                    }}
                    className="px-4 py-2 bg-slate-200 dark:bg-gray-700 text-slate-900 dark:text-white rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ServicesManager;

