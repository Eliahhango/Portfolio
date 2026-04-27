import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Search, Download, Trash2 } from 'lucide-react';
import { db } from '../../firebase.js';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { logError } from '../../utils/errorHandler.js';

interface Activity {
  id: string;
  type: 'login' | 'post_created' | 'post_published' | 'user_created' | 'settings_updated' | 'content_deleted' | 'user_deleted';
  user: string;
  description: string;
  timestamp: string;
  sortTimestamp: number;
  details: string;
}

const AdminActivity: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const activitiesSnap = await getDocs(collection(db, 'activities'));
      const activitiesList: Activity[] = activitiesSnap.docs
        .map((doc) => {
          const activityData = doc.data();
          const activityDate = activityData.timestamp?.toDate ? activityData.timestamp.toDate() : new Date();

          return {
            id: doc.id,
            type: activityData.type || 'post_created',
            user: activityData.user || 'System',
            description: activityData.description || 'Activity occurred',
            details: activityData.details || '',
            timestamp: activityDate.toLocaleString(),
            sortTimestamp: activityDate.getTime(),
          };
        })
        .sort((a, b) => {
          // Sort by date descending (newest first)
          return b.sortTimestamp - a.sortTimestamp;
        });
      setActivities(activitiesList);
      setError(null);
    } catch (err) {
      logError('AdminActivity.fetchActivities', err);
      // If collection doesn't exist, show empty state instead of error
      setActivities([]);
      setError(null);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteActivity = async (activityId: string) => {
    if (window.confirm('Are you sure you want to delete this activity?')) {
      try {
        await deleteDoc(doc(db, 'activities', activityId));
        setActivities(activities.filter((a) => a.id !== activityId));
        setError(null);
      } catch (err) {
        logError('AdminActivity.handleDeleteActivity', err);
        setError('Failed to delete activity. Please try again.');
      }
    }
  };

  const getActivityIcon = (type: string) => {
    const icons: { [key: string]: string } = {
      login: '🔓',
      post_created: '✍️',
      post_published: '📣',
      user_created: '👤',
      settings_updated: '⚙️',
      content_deleted: '🗑️',
      user_deleted: '👤❌',
    };
    return icons[type] || '📝';
  };

  const getActivityLabel = (type: string) => {
    const labels: { [key: string]: string } = {
      login: 'User Login',
      post_created: 'Post Created',
      post_published: 'Post Published',
      user_created: 'User Created',
      settings_updated: 'Settings Updated',
      content_deleted: 'Content Deleted',
      user_deleted: 'User Deleted',
    };
    return labels[type] || 'Activity';
  };

  const getActivityColor = (type: string) => {
    const colors: { [key: string]: string } = {
      login: 'from-blue-500 to-blue-400',
      post_created: 'from-green-500 to-green-400',
      post_published: 'from-purple-500 to-purple-400',
      user_created: 'from-pink-500 to-pink-400',
      settings_updated: 'from-orange-500 to-orange-400',
      content_deleted: 'from-red-500 to-red-400',
      user_deleted: 'from-red-600 to-red-500',
    };
    return colors[type] || 'from-gray-500 to-gray-400';
  };

  const filteredActivities = activities.filter((activity) => {
    const matchesSearch = activity.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.user.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === 'all' || activity.type === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Activity Log</h1>
          <p className="text-gray-600 dark:text-gray-400">Track all site activities and user actions</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg text-white font-medium hover:shadow-lg hover:shadow-blue-500/50 transition-all"
        >
          <Download className="w-5 h-5" />
          Export Log
        </motion.button>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-red-100 dark:bg-red-500/10 border border-red-300 dark:border-red-500/50 rounded-lg text-red-700 dark:text-red-400 text-sm"
        >
          {error}
        </motion.div>
      )}

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
          <input
            type="text"
            placeholder="Search activities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-50 dark:bg-slate-800/50 border border-gray-300 dark:border-slate-700 rounded-lg pl-12 pr-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 outline-none focus:border-blue-500 dark:focus:border-blue-500 transition-colors"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="flex-1 bg-gray-50 dark:bg-slate-800/50 border border-gray-300 dark:border-slate-700 rounded-lg px-4 py-3 text-gray-900 dark:text-white outline-none focus:border-blue-500 transition-colors"
          >
            <option value="all">All Activities</option>
            <option value="login">User Logins</option>
            <option value="post_created">Posts Created</option>
            <option value="post_published">Posts Published</option>
            <option value="user_created">Users Created</option>
            <option value="settings_updated">Settings Updated</option>
            <option value="content_deleted">Content Deleted</option>
            <option value="user_deleted">Users Deleted</option>
          </select>
        </div>
      </div>

      {/* Activities List */}
      <div className="space-y-3">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-blue-300 rounded-full" />
          </div>
        ) : filteredActivities.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 dark:bg-slate-800/30 rounded-xl">
            <p className="text-gray-600 dark:text-gray-400">No activities found</p>
          </div>
        ) : (
          <AnimatePresence>
            {filteredActivities.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700/50 rounded-lg p-4 hover:border-gray-300 dark:hover:border-slate-600 transition-all group"
              >
                <div className="flex items-start gap-4">
                  {/* Activity Type Badge */}
                  <div className={`flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br ${getActivityColor(activity.type)} flex items-center justify-center text-xl`}>
                    {getActivityIcon(activity.type)}
                  </div>

                  {/* Activity Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <h3 className="text-gray-900 dark:text-white font-semibold text-sm">
                          {getActivityLabel(activity.type)}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                          {activity.description}
                        </p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDeleteActivity(activity.id)}
                        className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg text-red-600 dark:text-red-400 transition-colors flex-shrink-0 opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500">
                      <span>
                        By <span className="font-semibold text-gray-700 dark:text-gray-300">{activity.user}</span>
                      </span>
                      <span>{activity.timestamp}</span>
                    </div>

                    {activity.details && (
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-2 p-2 bg-gray-50 dark:bg-slate-700/30 rounded">
                        {activity.details}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>

      {/* Stats */}
      {!loading && activities.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200 dark:border-slate-700/50">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700/50 rounded-lg p-4"
          >
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Total Activities</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{activities.length}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700/50 rounded-lg p-4"
          >
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Most Active User</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white truncate">
              {activities.length > 0
                ? Object.entries(
                    activities.reduce((acc, act) => {
                      acc[act.user] = (acc[act.user] || 0) + 1;
                      return acc;
                    }, {} as { [key: string]: number })
                  ).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A'
                : 'N/A'
              }
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700/50 rounded-lg p-4"
          >
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Activity Type</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              {getActivityLabel(
                Object.entries(
                  activities.reduce((acc, act) => {
                    acc[act.type] = (acc[act.type] || 0) + 1;
                    return acc;
                  }, {} as { [key: string]: number })
                ).sort((a, b) => b[1] - a[1])[0]?.[0] || 'login'
              )}
            </p>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default AdminActivity;
