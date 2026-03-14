import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Bell, Lock, Globe, Mail, Database } from 'lucide-react';

const AdminSettings: React.FC = () => {
  const [settings, setSettings] = useState({
    siteName: 'EliTechWiz',
    siteUrl: 'https://elitechwiz.com',
    adminEmail: 'admin@elitechwiz.com',
    timezone: 'UTC',
    emailNotifications: true,
    securityAlerts: true,
    backupFrequency: 'weekly',
    theme: 'dark',
  });

  const [isSaved, setIsSaved] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setSettings({ ...settings, [name]: val });
    setIsSaved(false);
  };

  const handleSave = () => {
    console.log('Settings saved:', settings);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const settingsGroups = [
    {
      title: 'General Settings',
      icon: Globe,
      fields: [
        { name: 'siteName', label: 'Site Name', type: 'text' },
        { name: 'siteUrl', label: 'Site URL', type: 'text' },
        { name: 'timezone', label: 'Timezone', type: 'select', options: ['UTC', 'EST', 'CST', 'PST'] },
      ],
    },
    {
      title: 'Email Settings',
      icon: Mail,
      fields: [
        { name: 'adminEmail', label: 'Admin Email', type: 'text' },
        { name: 'emailNotifications', label: 'Email Notifications', type: 'checkbox' },
      ],
    },
    {
      title: 'Security Settings',
      icon: Lock,
      fields: [
        { name: 'securityAlerts', label: 'Security Alerts', type: 'checkbox' },
      ],
    },
    {
      title: 'Backup Settings',
      icon: Database,
      fields: [
        { name: 'backupFrequency', label: 'Backup Frequency', type: 'select', options: ['daily', 'weekly', 'monthly'] },
      ],
    },
    {
      title: 'Notifications',
      icon: Bell,
      fields: [
        { name: 'theme', label: 'Theme', type: 'select', options: ['light', 'dark', 'auto'] },
      ],
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        <p className="text-gray-400">Configure your admin panel and site settings</p>
      </div>

      {/* Settings Form */}
      <div className="space-y-6">
        {settingsGroups.map((group, groupIndex) => {
          const Icon = group.icon;
          return (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: groupIndex * 0.1 }}
              className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-lg bg-blue-900/30">
                  <Icon className="w-5 h-5 text-blue-400" />
                </div>
                <h2 className="text-lg font-bold text-white">{group.title}</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {group.fields.map((field, fieldIndex) => (
                  <motion.div
                    key={field.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: groupIndex * 0.1 + fieldIndex * 0.05 }}
                  >
                    {field.type === 'checkbox' ? (
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          name={field.name}
                          checked={(settings as any)[field.name]}
                          onChange={handleChange}
                          className="w-5 h-5 rounded border-slate-700 bg-slate-800 cursor-pointer accent-blue-600"
                        />
                        <span className="text-gray-300 font-medium">{field.label}</span>
                      </label>
                    ) : field.type === 'select' ? (
                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">
                          {field.label}
                        </label>
                        <select
                          name={field.name}
                          value={(settings as any)[field.name]}
                          onChange={handleChange}
                          className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white outline-none focus:border-blue-500 transition-colors"
                        >
                          {field.options?.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt.charAt(0).toUpperCase() + opt.slice(1)}
                            </option>
                          ))}
                        </select>
                      </div>
                    ) : (
                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">
                          {field.label}
                        </label>
                        <input
                          type={field.type}
                          name={field.name}
                          value={(settings as any)[field.name]}
                          onChange={handleChange}
                          className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white outline-none focus:border-blue-500 transition-colors"
                        />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Danger Zone */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-br from-red-900/20 to-red-900/10 border border-red-900/30 rounded-xl p-6"
      >
        <h2 className="text-lg font-bold text-red-400 mb-4">Danger Zone</h2>
        <p className="text-red-300/70 text-sm mb-4">
          These actions cannot be undone. Please proceed with caution.
        </p>
        <div className="flex flex-col gap-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-4 py-2 bg-red-600/20 border border-red-600/50 text-red-400 rounded-lg hover:bg-red-600/30 transition-colors font-medium text-sm"
          >
            Clear Cache
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-4 py-2 bg-red-600/20 border border-red-600/50 text-red-400 rounded-lg hover:bg-red-600/30 transition-colors font-medium text-sm"
          >
            Reset Database
          </motion.button>
        </div>
      </motion.div>

      {/* Save Button */}
      <motion.button
        onClick={handleSave}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg text-white font-bold hover:shadow-lg hover:shadow-blue-500/50 transition-all"
      >
        <Save className="w-5 h-5" />
        Save Settings
      </motion.button>

      {/* Success Message */}
      {isSaved && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="fixed bottom-6 right-6 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2"
        >
          <span className="w-2 h-2 bg-white rounded-full" />
          Settings saved successfully!
        </motion.div>
      )}
    </motion.div>
  );
};

export default AdminSettings;
