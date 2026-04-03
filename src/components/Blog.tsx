import { motion } from 'motion/react';
import { ArrowUpRight, Calendar, User, Tag, ArrowRight } from 'lucide-react';

export default function Blog() {
  const posts = [
    {
      id: 1,
      title: 'Navigating Digital Transformation: Key Strategies',
      excerpt: 'How to transition legacy infrastructure to modern, cloud-native architectures without compromising integrity.',
      category: 'STRATEGY',
      date: 'MAR 24, 2026',
      author: 'Sarah Chen',
      image: 'https://picsum.photos/seed/strategy/800/500',
    },
    {
      id: 2,
      title: 'Zero-Trust: The New Standard for Enterprise Security',
      excerpt: 'Why perimeter-based security is failing and how to implement a rigid zero-trust protocol across your organization.',
      category: 'CYBER',
      date: 'MAR 18, 2026',
      author: 'Marcus Thorne',
      image: 'https://picsum.photos/seed/cyber/800/500',
    },
    {
      id: 3,
      title: 'Sustainable Urban Planning: A Civil Engineering Perspective',
      excerpt: 'Integrating green infrastructure into modern urban environments while maintaining structural load requirements.',
      category: 'CIVIL',
      date: 'MAR 12, 2026',
      author: 'Dr. Alistair Vance',
      image: 'https://picsum.photos/seed/civil/800/500',
    },
    {
      id: 4,
      title: 'The Future of Web Performance: Edge Computing',
      excerpt: 'How edge computing is redefining low-latency client interfaces and global system scalability.',
      category: 'WEB',
      date: 'MAR 05, 2026',
      author: 'Sarah Chen',
      image: 'https://picsum.photos/seed/web/800/500',
    },
  ];

  return (
    <div className="pt-24 md:pt-32 pb-16 md:pb-24 px-4 md:px-8 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 md:mb-32 max-w-3xl">
          <h2 className="text-xs font-mono text-muted uppercase tracking-[0.3em] mb-6 md:mb-8">Insights and Updates</h2>
          <h1 className="text-4xl md:text-7xl font-heading font-bold tracking-tighter leading-[0.9] uppercase mb-8 md:mb-12">
            Engineering<br /><span className="text-accent">Knowledge</span><br />Base.
          </h1>
          <p className="text-lg md:text-xl text-muted leading-relaxed">
            Deep-dives into architectural principles, security protocols, and the future of infrastructure. Our experts share their findings from the field.
          </p>
        </div>

        {/* Featured Post */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-24 md:mb-32 group cursor-pointer"
          onClick={() => alert('Article system initializing... Full content coming soon.')}
        >
          <div className="aspect-[16/9] bg-surface overflow-hidden relative">
            <img 
              src={posts[0].image} 
              alt={posts[0].title}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 blueprint-grid opacity-20 pointer-events-none" />
            <div className="absolute top-4 md:top-8 left-4 md:left-8 bg-black text-white text-[10px] font-bold tracking-[0.2em] px-4 py-2">
              FEATURED
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-4 md:gap-6 mb-6 md:mb-8 text-[10px] font-bold text-muted uppercase tracking-widest">
              <span className="text-accent">{posts[0].category}</span>
              <span className="flex items-center gap-2"><Calendar size={12} /> {posts[0].date}</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-heading font-bold tracking-tighter uppercase mb-6 md:mb-8 leading-tight group-hover:text-accent transition-colors">
              {posts[0].title}
            </h3>
            <p className="text-base md:text-lg text-muted leading-relaxed mb-8 md:mb-12">{posts[0].excerpt}</p>
            <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest group-hover:gap-6 transition-all">
              READ FULL ARTICLE <ArrowRight size={16} className="text-accent" />
            </div>
          </div>
        </motion.div>

        {/* Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {posts.slice(1).map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
              onClick={() => alert('Article system initializing... Full content coming soon.')}
            >
              <div className="aspect-[16/10] bg-surface overflow-hidden mb-6 md:mb-8 relative">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none" />
              </div>
              <div className="flex items-center gap-4 mb-4 md:mb-6 text-[10px] font-bold text-muted uppercase tracking-widest">
                <span className="text-accent">{post.category}</span>
                <span>{post.date}</span>
              </div>
              <h4 className="text-xl md:text-2xl font-heading font-bold tracking-tighter uppercase mb-4 md:mb-6 group-hover:text-accent transition-colors">
                {post.title}
              </h4>
              <p className="text-muted text-sm leading-relaxed mb-6 md:mb-8 line-clamp-3">{post.excerpt}</p>
              <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest group-hover:gap-5 transition-all">
                READ MORE <ArrowUpRight size={14} className="text-accent" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-24 md:mt-32 p-12 md:p-24 bg-surface border border-gray-100 text-center relative overflow-hidden">
          <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none" />
          <div className="relative z-10 max-w-xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-heading font-bold tracking-tighter uppercase mb-6">Stay Informed</h3>
            <p className="text-sm md:text-base text-muted mb-8 md:mb-12">Receive our monthly architectural digest and security updates directly in your inbox.</p>
            <div className="flex flex-col md:flex-row gap-4">
              <input 
                type="email" 
                placeholder="EMAIL ADDRESS" 
                className="flex-grow bg-white border border-gray-200 px-6 py-4 text-xs font-bold tracking-widest outline-none focus:border-accent transition-colors"
              />
              <button 
                onClick={() => alert('Subscription matrix updated. You are now on the list.')}
                className="bg-black text-white px-8 py-4 text-xs font-bold tracking-widest hover:bg-accent transition-all"
              >
                SUBSCRIBE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
