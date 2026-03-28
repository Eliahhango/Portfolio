import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Shield, Search, Plus, X } from 'lucide-react';
import { db } from '../../firebase.js';
import { collection, getDocs, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { logUserCreated, logUserDeleted } from '../../utils/activityLogger';
import { auth } from '../../firebase.js';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  status: string;
  joinDate: string;
}

interface AddUserForm {
  email: string;
  name: string;
  role: string;
}

const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState<AddUserForm>({ email: '', name: '', role: 'user' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const usersList: User[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        email: doc.data().email || 'N/A',
        name: doc.data().name || 'Unknown',
        role: String(doc.data().role || 'user').toLowerCase(),
        status: doc.data().status || 'Active',
        joinDate: doc.data().joinDate || new Date().toLocaleDateString(),
      }));
      setUsers(usersList);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      if (!formData.email.trim() || !formData.name.trim()) {
        setError('Email and name are required');
        setIsSubmitting(false);
        return;
      }

      const normalizedEmail = formData.email.trim().toLowerCase();
      const userId = normalizedEmail;
      await setDoc(doc(db, 'users', userId), {
        email: normalizedEmail,
        name: formData.name.trim(),
        role: formData.role.toLowerCase(),
        status: 'Active',
        joinDate: new Date().toLocaleDateString(),
      });

      // Log activity
      await logUserCreated(auth.currentUser?.email || 'Admin', formData.email, userId);

      // Add to local state
      setUsers([
        ...users,
        {
          id: userId,
          email: normalizedEmail,
          name: formData.name.trim(),
          role: formData.role.toLowerCase(),
          status: 'Active',
          joinDate: new Date().toLocaleDateString(),
        },
      ]);

      // Reset form
      setFormData({ email: '', name: '', role: 'user' });
      setShowAddModal(false);
    } catch (error: any) {
      console.error('Error adding user:', error);
      setError(error.message || 'Failed to add user');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    const user = users.find((u) => u.id === userId);
    if (window.confirm(`Are you sure you want to delete ${user?.email}?`)) {
      try {
        await deleteDoc(doc(db, 'users', userId));
        
        // Log activity
        await logUserDeleted(auth.currentUser?.email || 'Admin', user?.email || 'Unknown', userId);

        setUsers(users.filter((u) => u.id !== userId));
      } catch (error) {
        console.error('Error deleting user:', error);
        setError('Failed to delete user');
      }
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">User Management</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage all registered users</p>
        </div>
        <motion.button
          onClick={() => setShowAddModal(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg text-white font-medium hover:shadow-lg hover:shadow-blue-500/50 transition-all"
        >
          <Plus className="w-5 h-5" />
          Add User
        </motion.button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
        <input
          type="text"
          placeholder="Search users by name or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-gray-50 dark:bg-slate-800/50 border border-gray-300 dark:border-slate-700 rounded-lg pl-12 pr-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 outline-none focus:border-blue-500 dark:focus:border-blue-500 transition-colors"
        />
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700/50 rounded-xl overflow-hidden shadow-sm dark:shadow-none">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-300 dark:border-slate-700/50 bg-gray-50 dark:bg-slate-900/50">
                <th className="px-6 py-4 text-left text-gray-900 dark:text-gray-300 font-semibold text-sm">User</th>
                <th className="px-6 py-4 text-left text-gray-900 dark:text-gray-300 font-semibold text-sm">Email</th>
                <th className="px-6 py-4 text-left text-gray-900 dark:text-gray-300 font-semibold text-sm">Role</th>
                <th className="px-6 py-4 text-left text-gray-900 dark:text-gray-300 font-semibold text-sm">Status</th>
                <th className="px-6 py-4 text-left text-gray-900 dark:text-gray-300 font-semibold text-sm">Join Date</th>
                <th className="px-6 py-4 text-left text-gray-900 dark:text-gray-300 font-semibold text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-600 dark:text-gray-400">
                    Loading users...
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-600 dark:text-gray-400">
                    No users found
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user, index) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-gray-200 dark:border-slate-700/30 hover:bg-gray-100 dark:hover:bg-slate-700/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-gray-900 dark:text-white font-medium">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{user.email}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        <span className="text-gray-700 dark:text-gray-300 text-sm capitalize">{user.role}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          user.status === 'Active'
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                            : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400 text-sm">{user.joinDate}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDeleteUser(user.id)}
                          className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg text-red-600 dark:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-slate-800 rounded-xl max-w-md w-full p-6 shadow-xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Add New User</h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-4 bg-red-100 dark:bg-red-500/10 border border-red-300 dark:border-red-500/50 rounded-lg text-red-700 dark:text-red-400 text-sm"
                >
                  {error}
                </motion.div>
              )}

              <form onSubmit={handleAddUser} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-gray-50 dark:bg-slate-700/50 border border-gray-300 dark:border-slate-600 rounded-lg px-4 py-2.5 text-gray-900 dark:text-white outline-none focus:border-blue-500 transition-colors"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-gray-50 dark:bg-slate-700/50 border border-gray-300 dark:border-slate-600 rounded-lg px-4 py-2.5 text-gray-900 dark:text-white outline-none focus:border-blue-500 transition-colors"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Role
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full bg-gray-50 dark:bg-slate-700/50 border border-gray-300 dark:border-slate-600 rounded-lg px-4 py-2.5 text-gray-900 dark:text-white outline-none focus:border-blue-500 transition-colors"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="main">Main Admin</option>
                  </select>
                </div>

                <div className="flex gap-3 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 px-4 py-2.5 bg-gray-200 dark:bg-slate-700 rounded-lg text-gray-900 dark:text-white font-medium hover:bg-gray-300 dark:hover:bg-slate-600 transition-colors"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                    type="submit"
                    disabled={isSubmitting}
                    className={`flex-1 px-4 py-2.5 rounded-lg text-white font-medium transition-all ${
                      isSubmitting
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-600 to-blue-500 hover:shadow-lg hover:shadow-blue-500/50'
                    }`}
                  >
                    {isSubmitting ? 'Adding...' : 'Add User'}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AdminUsers;
