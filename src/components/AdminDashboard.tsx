import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  FileText, 
  Briefcase, 
  MessageSquare, 
  Mail, 
  Users, 
  Settings, 
  TrendingUp, 
  Plus, 
  Trash2, 
  Edit3, 
  Eye, 
  CheckCircle2, 
  XCircle, 
  Search,
  ChevronRight,
  DollarSign,
  Calendar,
  ArrowUpRight,
  LogOut,
  Bell,
  Menu,
  X,
  Filter,
  Download,
  MoreVertical,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart,
  Area
} from 'recharts';

type AdminSection = 'OVERVIEW' | 'BLOG' | 'CASES' | 'MESSAGES' | 'COMMENTS' | 'CONSULTATIONS' | 'PRICING' | 'SETTINGS';

export default function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [activeSection, setActiveSection] = useState<AdminSection>('OVERVIEW');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Mock Data for Analytics
  const visitorData = [
    { name: 'Mon', visits: 400 },
    { name: 'Tue', visits: 300 },
    { name: 'Wed', visits: 600 },
    { name: 'Thu', visits: 800 },
    { name: 'Fri', visits: 500 },
    { name: 'Sat', visits: 900 },
    { name: 'Sun', visits: 1200 },
  ];

  const revenueData = [
    { name: 'Jan', amount: 4000 },
    { name: 'Feb', amount: 3000 },
    { name: 'Mar', amount: 5000 },
    { name: 'Apr', amount: 4500 },
    { name: 'May', amount: 6000 },
    { name: 'Jun', amount: 8500 },
  ];

  // Mock Data for Management
  const [blogPosts, setBlogPosts] = useState([
    { id: 1, title: 'Navigating Digital Transformation', author: 'Sarah Chen', date: 'MAR 24, 2026', status: 'Published', views: '1.2K' },
    { id: 2, title: 'Zero-Trust: The New Standard', author: 'Marcus Thorne', date: 'MAR 18, 2026', status: 'Published', views: '850' },
    { id: 3, title: 'Sustainable Urban Planning', author: 'Dr. Vance', date: 'MAR 12, 2026', status: 'Draft', views: '0' },
  ]);

  const [messages, setMessages] = useState([
    { id: 1, from: 'John Smith', email: 'john@example.com', subject: 'Inquiry about Civil Project', date: '2 hours ago', status: 'Unread' },
    { id: 2, from: 'Alice Wong', email: 'alice@tech.co', subject: 'Web Architecture Consultation', date: '5 hours ago', status: 'Read' },
    { id: 3, from: 'Robert Brown', email: 'robert@secure.net', subject: 'Cyber Audit Request', date: '1 day ago', status: 'Replied' },
  ]);

  const [consultations, setConsultations] = useState([
    { id: 1, client: 'Global Finance Corp', service: 'Cyber Security', date: 'APR 10, 2026', status: 'Confirmed' },
    { id: 2, client: 'Urban Dev Group', service: 'Civil Engineering', date: 'APR 12, 2026', status: 'Pending' },
  ]);

  const [comments, setComments] = useState([
    { id: 1, author: 'Troll123', text: 'This is a bad comment with spam links...', date: '10 mins ago', post: 'Zero-Trust Migration' },
    { id: 2, author: 'James Wilson', text: 'Great article, very insightful!', date: '2 hours ago', post: 'Digital Transformation' },
  ]);

  const stats = [
    { label: 'Total Visitors', value: '12.4K', trend: '+14%', icon: Users, color: 'text-blue-500' },
    { label: 'Active Projects', value: '48', trend: '+5%', icon: Briefcase, color: 'text-purple-500' },
    { label: 'Unread Messages', value: '12', trend: '-2', icon: Mail, color: 'text-orange-500' },
    { label: 'Revenue (MTD)', value: '$42.5K', trend: '+22%', icon: DollarSign, color: 'text-green-500' },
  ];

  const sidebarItems = [
    { id: 'OVERVIEW', label: 'Overview', icon: LayoutDashboard },
    { id: 'BLOG', label: 'Blog Posts', icon: FileText },
    { id: 'CASES', label: 'Case Studies', icon: Briefcase },
    { id: 'MESSAGES', label: 'Messages', icon: Mail },
    { id: 'COMMENTS', label: 'Comments', icon: MessageSquare },
    { id: 'CONSULTATIONS', label: 'Consultations', icon: Calendar },
    { id: 'PRICING', label: 'Pricing & Plans', icon: DollarSign },
    { id: 'SETTINGS', label: 'Site Settings', icon: Settings },
  ];

  const renderSection = () => {
    switch (activeSection) {
      case 'OVERVIEW':
        return (
          <div className="space-y-6 md:space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {stats.map((stat, i) => (
                <motion.div 
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-surface ${stat.color}`}>
                      <stat.icon size={20} />
                    </div>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.trend.startsWith('+') ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                      {stat.trend}
                    </span>
                  </div>
                  <div className="text-3xl font-heading font-bold tracking-tight mb-1">{stat.value}</div>
                  <div className="text-[10px] text-muted uppercase tracking-[0.2em] font-bold">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-widest mb-1">Traffic Overview</h3>
                    <p className="text-[10px] text-muted font-bold uppercase tracking-widest">Weekly visitor analytics</p>
                  </div>
                  <button className="p-2 hover:bg-surface rounded-lg transition-colors">
                    <Filter size={16} className="text-muted" />
                  </button>
                </div>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={visitorData}>
                      <defs>
                        <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#000" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#000" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold'}} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold'}} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                      />
                      <Area type="monotone" dataKey="visits" stroke="#000" fillOpacity={1} fill="url(#colorVisits)" strokeWidth={3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-widest mb-1">Revenue Growth</h3>
                    <p className="text-[10px] text-muted font-bold uppercase tracking-widest">Monthly financial performance</p>
                  </div>
                  <button className="p-2 hover:bg-surface rounded-lg transition-colors">
                    <Download size={16} className="text-muted" />
                  </button>
                </div>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold'}} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold'}} />
                      <Tooltip 
                        cursor={{fill: '#f8f8f8'}}
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                      />
                      <Bar dataKey="amount" fill="#000" radius={[6, 6, 0, 0]} barSize={40} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
              <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-surface/50">
                  <h3 className="text-xs font-bold uppercase tracking-widest">Recent Messages</h3>
                  <button className="text-[10px] font-bold text-accent uppercase tracking-widest hover:underline">View All</button>
                </div>
                <div className="divide-y divide-gray-50">
                  {messages.map(msg => (
                    <div key={msg.id} className="p-6 flex items-center justify-between hover:bg-surface transition-colors cursor-pointer group">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-xs font-bold group-hover:bg-accent group-hover:text-white transition-colors">
                          {msg.from.charAt(0)}
                        </div>
                        <div>
                          <div className="text-sm font-bold uppercase tracking-tight">{msg.from}</div>
                          <div className="text-[10px] text-muted uppercase tracking-widest">{msg.subject}</div>
                        </div>
                      </div>
                      <div className="text-right hidden sm:block">
                        <div className="text-[10px] font-bold text-muted uppercase tracking-widest mb-1 flex items-center justify-end gap-1">
                          <Clock size={10} /> {msg.date}
                        </div>
                        <span className={`text-[8px] font-bold px-2 py-1 rounded-full uppercase tracking-widest ${
                          msg.status === 'Unread' ? 'bg-accent text-white' : 'bg-gray-100 text-muted'
                        }`}>
                          {msg.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 bg-surface/50">
                  <h3 className="text-xs font-bold uppercase tracking-widest">System Health</h3>
                </div>
                <div className="p-8 space-y-8">
                  {[
                    { label: 'Server Load', value: 24, color: 'bg-green-500' },
                    { label: 'Database Latency', value: 12, color: 'bg-green-500' },
                    { label: 'Storage Usage', value: 68, color: 'bg-accent' },
                    { label: 'Security Score', value: 98, color: 'bg-green-500' },
                  ].map(item => (
                    <div key={item.label}>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-muted flex items-center gap-2">
                          {item.label === 'Security Score' && <ShieldCheck size={12} className="text-green-500" />}
                          {item.label}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-widest">{item.value}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${item.value}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className={`h-full ${item.color}`} 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case 'BLOG':
        return (
          <div className="space-y-6 md:space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <h2 className="text-xl font-heading font-bold uppercase tracking-tight">Blog Management</h2>
              <button className="w-full sm:w-auto bg-black text-white px-6 py-3 rounded-xl text-[10px] font-bold tracking-widest hover:bg-accent transition-all flex items-center justify-center gap-2">
                <Plus size={14} /> CREATE NEW POST
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100 bg-surface/30 flex flex-col md:flex-row items-center gap-4">
                <div className="relative flex-grow w-full md:max-w-md">
                  <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
                  <input 
                    type="text" 
                    placeholder="SEARCH POSTS..." 
                    className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-[10px] font-bold tracking-widest outline-none focus:border-accent"
                  />
                </div>
                <div className="flex items-center gap-2 w-full md:w-auto">
                  <button className="flex-grow md:flex-grow-0 flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-surface transition-colors">
                    <Filter size={14} /> Filter
                  </button>
                  <button className="flex-grow md:flex-grow-0 flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-surface transition-colors">
                    <Download size={14} /> Export
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[800px]">
                  <thead>
                    <tr className="bg-surface/50 border-b border-gray-100">
                      <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-muted">Post Title</th>
                      <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-muted">Author</th>
                      <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-muted">Date</th>
                      <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-muted">Views</th>
                      <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-muted">Status</th>
                      <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-muted text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {blogPosts.map(post => (
                      <tr key={post.id} className="hover:bg-surface transition-colors">
                        <td className="p-6">
                          <div className="text-sm font-bold uppercase tracking-tight">{post.title}</div>
                        </td>
                        <td className="p-6">
                          <div className="text-[10px] font-bold text-muted uppercase tracking-widest">{post.author}</div>
                        </td>
                        <td className="p-6">
                          <div className="text-[10px] font-bold text-muted uppercase tracking-widest">{post.date}</div>
                        </td>
                        <td className="p-6">
                          <div className="text-[10px] font-bold text-muted uppercase tracking-widest flex items-center gap-2">
                            <TrendingUp size={12} className="text-green-500" /> {post.views}
                          </div>
                        </td>
                        <td className="p-6">
                          <span className={`text-[8px] font-bold px-3 py-1 rounded-full uppercase tracking-widest ${
                            post.status === 'Published' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                          }`}>
                            {post.status}
                          </span>
                        </td>
                        <td className="p-6 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-gray-100 text-muted hover:text-accent transition-all">
                              <Eye size={16} />
                            </button>
                            <button className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-gray-100 text-muted hover:text-accent transition-all">
                              <Edit3 size={16} />
                            </button>
                            <button className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-gray-100 text-muted hover:text-red-500 transition-all">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      case 'COMMENTS':
        return (
          <div className="space-y-6 md:space-y-8">
            <h2 className="text-xl font-heading font-bold uppercase tracking-tight">Comment Moderation</h2>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="divide-y divide-gray-50">
                {comments.map(comment => (
                  <div key={comment.id} className="p-6 md:p-8 flex flex-col sm:flex-row gap-6 hover:bg-surface transition-colors">
                    <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center text-xs font-bold flex-shrink-0">
                      {comment.author.charAt(0)}
                    </div>
                    <div className="flex-grow">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                        <div>
                          <span className="text-sm font-bold uppercase tracking-tight mr-4">{comment.author}</span>
                          <span className="text-[10px] text-muted uppercase tracking-widest">on {comment.post}</span>
                        </div>
                        <span className="text-[10px] text-muted uppercase tracking-widest flex items-center gap-1">
                          <Clock size={10} /> {comment.date}
                        </span>
                      </div>
                      <p className="text-sm text-muted leading-relaxed mb-6 bg-surface/50 p-4 rounded-xl border border-gray-50">{comment.text}</p>
                      <div className="flex items-center gap-6">
                        <button 
                          onClick={() => setComments(prev => prev.filter(c => c.id !== comment.id))}
                          className="flex items-center gap-2 text-[10px] font-bold text-red-500 hover:text-red-600 uppercase tracking-widest transition-colors"
                        >
                          <Trash2 size={14} /> Delete
                        </button>
                        <button className="flex items-center gap-2 text-[10px] font-bold text-muted hover:text-accent uppercase tracking-widest transition-colors">
                          <CheckCircle2 size={14} /> Approve
                        </button>
                        <button className="flex items-center gap-2 text-[10px] font-bold text-muted hover:text-accent uppercase tracking-widest transition-colors ml-auto">
                          <MoreVertical size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'PRICING':
        return (
          <div className="space-y-6 md:space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <h2 className="text-xl font-heading font-bold uppercase tracking-tight">Pricing & Plans</h2>
              <button className="w-full sm:w-auto bg-black text-white px-6 py-3 rounded-xl text-[10px] font-bold tracking-widest hover:bg-accent transition-all">
                UPDATE ALL PRICES
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {[
                { name: 'Standard', price: 2500, features: 12, color: 'bg-blue-50' },
                { name: 'Professional', price: 5000, features: 24, color: 'bg-purple-50' },
                { name: 'Enterprise', price: 12000, features: 48, color: 'bg-green-50' },
              ].map(plan => (
                <div key={plan.name} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden group">
                  <div className={`absolute top-0 right-0 w-24 h-24 ${plan.color} rounded-bl-full -mr-12 -mt-12 transition-all group-hover:scale-150`} />
                  <div className="relative z-10">
                    <div className="text-[10px] font-bold text-accent uppercase tracking-widest mb-4">{plan.name} Plan</div>
                    <div className="flex items-baseline gap-2 mb-8">
                      <span className="text-xs font-bold text-muted">$</span>
                      <input 
                        type="number" 
                        defaultValue={plan.price}
                        className="text-4xl font-heading font-bold outline-none focus:text-accent w-full bg-transparent"
                      />
                      <span className="text-xs font-bold text-muted">/mo</span>
                    </div>
                    <div className="space-y-4 mb-8">
                      <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-muted">
                        <span>Included Features</span>
                        <span>{plan.features}</span>
                      </div>
                      <div className="w-full h-[1px] bg-gray-100" />
                    </div>
                    <button className="w-full border border-black py-4 rounded-xl text-[10px] font-bold tracking-widest hover:bg-black hover:text-white transition-all uppercase">
                      Edit Features
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center px-4">
            <div className="w-20 h-20 bg-surface rounded-3xl flex items-center justify-center mb-8 shadow-inner">
              <Settings size={40} className="text-muted animate-spin-slow" />
            </div>
            <h2 className="text-2xl font-heading font-bold uppercase tracking-tight mb-4">Module Initializing</h2>
            <p className="text-sm text-muted max-w-xs leading-relaxed">We are currently architecting the full management interface for this module. Check back shortly.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfcfc] flex flex-col lg:flex-row">
      {/* Mobile Header */}
      <div className="lg:hidden h-20 bg-black text-white flex items-center justify-between px-6 sticky top-0 z-[60]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-accent flex items-center justify-center font-bold text-white text-xs rounded-lg">EW</div>
          <span className="font-heading font-bold tracking-tighter uppercase">EliTechWiz</span>
        </div>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 z-[50] lg:hidden backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`
        w-72 bg-black text-white flex flex-col fixed h-full z-[55] transition-transform duration-500 ease-in-out
        lg:translate-x-0 lg:static
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-8 border-b border-white/10 hidden lg:block">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-accent flex items-center justify-center font-bold text-white text-xs rounded-lg">EW</div>
            <span className="font-heading font-bold tracking-tighter uppercase">EliTechWiz</span>
          </div>
          <div className="text-[8px] font-bold text-gray-500 uppercase tracking-[0.3em]">Control Center v1.0</div>
        </div>

        <nav className="flex-grow p-4 py-8 space-y-1 overflow-y-auto">
          {sidebarItems.map(item => (
            <button
              key={item.id}
              onClick={() => {
                setActiveSection(item.id as AdminSection);
                setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all group ${
                activeSection === item.id 
                  ? 'bg-accent text-white shadow-lg shadow-accent/20' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon size={18} className={activeSection === item.id ? 'text-white' : 'text-gray-500 group-hover:text-accent'} />
              {item.label}
              {activeSection === item.id && <ChevronRight size={12} className="ml-auto" />}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-4 px-4 py-4 rounded-xl text-[10px] font-bold uppercase tracking-widest text-red-400 hover:bg-red-500/10 transition-all"
          >
            <LogOut size={18} />
            Logout System
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow relative">
        {/* Header */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-6 md:px-12 sticky top-0 lg:top-0 z-40">
          <div className="hidden md:flex items-center gap-4">
            <div className="text-[10px] font-bold text-muted uppercase tracking-widest">System Status</div>
            <div className="flex items-center gap-2 bg-green-50 px-3 py-1 rounded-full">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[9px] font-bold uppercase tracking-widest text-green-600">Operational</span>
            </div>
          </div>

          <div className="flex items-center gap-4 md:gap-8 ml-auto">
            <div className="relative">
              <button 
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="p-2 hover:bg-surface rounded-xl transition-colors relative"
              >
                <Bell size={20} className="text-muted" />
                <div className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full border-2 border-white" />
              </button>
              
              <AnimatePresence>
                {isNotificationsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-4 w-80 bg-white border border-gray-100 shadow-2xl rounded-2xl overflow-hidden z-50"
                  >
                    <div className="p-4 border-b border-gray-100 bg-surface/50 flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-widest">Notifications</span>
                      <button className="text-[9px] font-bold text-accent uppercase tracking-widest">Clear All</button>
                    </div>
                    <div className="max-h-96 overflow-y-auto divide-y divide-gray-50">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="p-4 hover:bg-surface transition-colors cursor-pointer">
                          <div className="text-[11px] font-bold uppercase tracking-tight mb-1">New Message Received</div>
                          <p className="text-[10px] text-muted line-clamp-2 mb-2">You have a new inquiry regarding the Smart City project from Urban Dev Group.</p>
                          <span className="text-[8px] text-muted uppercase font-bold tracking-widest">5 mins ago</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex items-center gap-4 pl-4 md:pl-8 border-l border-gray-100">
              <div className="text-right hidden sm:block">
                <div className="text-[10px] font-bold uppercase tracking-tight">Eliah Hango</div>
                <div className="text-[8px] text-muted uppercase tracking-widest">Super Administrator</div>
              </div>
              <div className="w-10 h-10 bg-black text-white rounded-xl flex items-center justify-center font-bold text-xs shadow-lg shadow-black/10">
                EH
              </div>
            </div>
          </div>
        </header>

        {/* Section Content */}
        <div className="p-6 md:p-12 max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {renderSection()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background: #f0f0f0;
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #e0e0e0;
        }
      `}</style>
    </div>
  );
}
