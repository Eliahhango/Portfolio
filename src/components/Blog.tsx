import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Calendar, User, Tag, ArrowRight, ArrowLeft, Share2, Bookmark, MessageSquare, Send, Twitter, Linkedin, Link as LinkIcon, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

export default function Blog() {
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [commentText, setCommentText] = useState('');
  const [isSharing, setIsSharing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [comments, setComments] = useState<Record<number, any[]>>({
    1: [
      { id: 1, author: 'James Wilson', text: 'This structural approach to digital transformation is exactly what we need in the manufacturing sector.', date: '2 hours ago' },
      { id: 2, author: 'Elena Rodriguez', text: 'Great point about architectural debt. It is often overlooked in initial planning phases.', date: '5 hours ago' }
    ],
    2: [
      { id: 3, author: 'David Chen', text: 'Zero-trust is definitely the future. The micro-segmentation part is the hardest to implement correctly though.', date: '1 day ago' }
    ]
  });

  const handlePostComment = (postId: number) => {
    if (!commentText.trim()) return;
    
    const newComment = {
      id: Date.now(),
      author: 'Guest User',
      text: commentText,
      date: 'Just now'
    };

    setComments(prev => ({
      ...prev,
      [postId]: [newComment, ...(prev[postId] || [])]
    }));
    setCommentText('');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const posts = [
    {
      id: 1,
      title: 'Navigating Digital Transformation: Key Strategies',
      excerpt: 'How to transition legacy infrastructure to modern, cloud-native architectures without compromising integrity.',
      category: 'STRATEGY',
      date: 'MAR 24, 2026',
      author: 'Sarah Chen',
      image: 'https://picsum.photos/seed/strategy/800/500',
      content: `
        <p>Digital transformation is no longer a choice but a necessity for survival in the modern industrial landscape. However, the path from legacy systems to cloud-native architectures is fraught with structural risks that can compromise data integrity and system availability.</p>
        
        <h3>The Legacy Burden</h3>
        <p>Most established firms operate on what we call "architectural debt"—systems built for a different era of connectivity and scale. These systems are often monolithic, making them resistant to the rapid changes required by today's market demands.</p>
        
        <h3>The Structural Approach</h3>
        <p>At EliTechWiz, we treat digital transformation as a structural engineering challenge. We don't just move code; we re-architect the load paths of data. This involves:</p>
        <ul>
          <li><strong>Decomposition:</strong> Breaking down monoliths into resilient microservices.</li>
          <li><strong>Abstraction:</strong> Creating layers that decouple hardware from software.</li>
          <li><strong>Redundancy:</strong> Implementing multi-region failover protocols that ensure 99.999% uptime.</li>
        </ul>
        
        <h3>Conclusion</h3>
        <p>Success in digital transformation requires a shift in mindset—from seeing IT as a support function to seeing it as the very foundation of the enterprise's structural integrity.</p>
      `
    },
    {
      id: 2,
      title: 'Zero-Trust: The New Standard for Enterprise Security',
      excerpt: 'Why perimeter-based security is failing and how to implement a rigid zero-trust protocol across your organization.',
      category: 'CYBER',
      date: 'MAR 18, 2026',
      author: 'Marcus Thorne',
      image: 'https://picsum.photos/seed/cyber/800/500',
      content: `
        <p>The traditional "castle and moat" approach to cybersecurity is dead. In an era of remote work and cloud-integrated supply chains, the perimeter has dissolved. Zero-Trust is the only logical response to this new reality.</p>
        
        <h3>The Core Principle</h3>
        <p>Zero-Trust operates on a simple but rigid principle: <strong>Never Trust, Always Verify.</strong> No user or device, whether inside or outside the network, is granted access until their identity and integrity are proven.</p>
        
        <h3>Implementation Pillars</h3>
        <p>A successful Zero-Trust implementation rests on three pillars:</p>
        <ol>
          <li><strong>Identity-Centric Access:</strong> Moving security from the network layer to the identity layer.</li>
          <li><strong>Micro-Segmentation:</strong> Dividing the network into small, isolated zones to prevent lateral movement by attackers.</li>
          <li><strong>Continuous Monitoring:</strong> Real-time analysis of every request, looking for anomalies that indicate a breach.</li>
        </ol>
        
        <h3>The Result</h3>
        <p>By assuming that the network is already compromised, we build systems that are inherently resilient to attack, protecting the organization's most critical digital assets.</p>
      `
    },
    {
      id: 3,
      title: 'Sustainable Urban Planning: A Civil Engineering Perspective',
      excerpt: 'Integrating green infrastructure into modern urban environments while maintaining structural load requirements.',
      category: 'CIVIL',
      date: 'MAR 12, 2026',
      author: 'Dr. Alistair Vance',
      image: 'https://picsum.photos/seed/civil/800/500',
      content: `
        <p>As our cities grow, the pressure on our physical infrastructure reaches critical levels. Sustainable urban planning is no longer just about aesthetics; it's about the long-term structural viability of our living environments.</p>
        
        <h3>The Green Integration Challenge</h3>
        <p>Integrating green spaces and sustainable materials into high-density urban areas presents unique engineering challenges. We must balance the weight of rooftop gardens and permeable pavements with the load-bearing capacity of existing structures.</p>
        
        <h3>Digital Twins in Planning</h3>
        <p>We use advanced computational modeling—Digital Twins—to simulate the impact of environmental changes on urban infrastructure. This allows us to:</p>
        <ul>
          <li>Predict heat island effects and mitigate them through strategic vegetation.</li>
          <li>Analyze stormwater runoff and design permeable systems that prevent flooding.</li>
          <li>Evaluate the lifecycle carbon footprint of construction materials.</li>
        </ul>
        
        <h3>The Future City</h3>
        <p>The city of the future is a living organism, where physical structures and natural systems work in harmony, guided by the rigid principles of civil engineering excellence.</p>
      `
    },
    {
      id: 4,
      title: 'The Future of Web Performance: Edge Computing',
      excerpt: 'How edge computing is redefining low-latency client interfaces and global system scalability.',
      category: 'WEB',
      date: 'MAR 05, 2026',
      author: 'Sarah Chen',
      image: 'https://picsum.photos/seed/web/800/500',
      content: `
        <p>The laws of physics are the ultimate bottleneck in web performance. No matter how fast our servers are, the speed of light limits how quickly data can travel across the globe. Edge computing is our way of fighting back.</p>
        
        <h3>Moving to the Edge</h3>
        <p>Edge computing involves moving computation and data storage closer to the user. Instead of a single central server, we deploy a global network of "edge nodes" that handle requests locally.</p>
        
        <h3>Benefits of Edge Architecture</h3>
        <p>By architecting for the edge, we achieve:</p>
        <ul>
          <li><strong>Sub-Millisecond Latency:</strong> Responses are served from a node just miles away from the user.</li>
          <li><strong>Reduced Core Load:</strong> Central databases are shielded from the massive volume of edge requests.</li>
          <li><strong>Enhanced Reliability:</strong> If one edge node fails, traffic is automatically routed to the next nearest node.</li>
        </ul>
        
        <h3>Conclusion</h3>
        <p>The future of the web is distributed. By embracing edge computing, we can build digital experiences that feel instantaneous, regardless of where the user is located.</p>
      `
    },
  ];

  if (selectedPost) {
    return (
      <div className="pt-24 md:pt-32 pb-16 md:pb-24 px-4 md:px-8 min-h-screen bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => setSelectedPost(null)}
            className="flex items-center gap-2 text-xs font-bold text-muted hover:text-accent transition-colors mb-12 uppercase tracking-widest group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Insights
          </motion.button>

          <div className="mb-12">
            <div className="flex items-center gap-6 mb-8 text-[10px] font-bold text-muted uppercase tracking-widest">
              <span className="text-accent">{selectedPost.category}</span>
              <span className="flex items-center gap-2"><Calendar size={12} /> {selectedPost.date}</span>
              <span className="flex items-center gap-2"><User size={12} /> {selectedPost.author}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-bold tracking-tighter leading-[0.9] uppercase mb-8">
              {selectedPost.title}
            </h1>
          </div>

          <div className="aspect-[21/9] bg-surface overflow-hidden relative mb-16">
            <img 
              src={selectedPost.image} 
              alt={selectedPost.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 blueprint-grid opacity-20 pointer-events-none" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8">
              <div 
                className="article-content space-y-8 text-muted leading-relaxed"
                dangerouslySetInnerHTML={{ __html: selectedPost.content }}
              />
              
              <style>{`
                .article-content h3 {
                  font-family: var(--font-heading);
                  font-weight: 700;
                  font-size: 1.5rem;
                  letter-spacing: -0.025em;
                  text-transform: uppercase;
                  color: black;
                  margin-top: 2.5rem;
                  margin-bottom: 1rem;
                }
                .article-content p {
                  margin-bottom: 1.5rem;
                }
                .article-content ul, .article-content ol {
                  margin-bottom: 1.5rem;
                  padding-left: 1.5rem;
                }
                .article-content li {
                  margin-bottom: 0.5rem;
                  list-style-type: disc;
                }
                .article-content strong {
                  color: black;
                  font-weight: 700;
                }
              `}</style>
              
              <div className="mt-16 pt-16 border-t border-gray-100">
                <div className="flex items-center justify-between mb-12">
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <button 
                        onClick={() => setIsSharing(!isSharing)}
                        className="flex items-center gap-2 text-[10px] font-bold text-muted hover:text-accent transition-colors uppercase tracking-widest"
                      >
                        <Share2 size={16} /> Share
                      </button>
                      
                      <AnimatePresence>
                        {isSharing && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute bottom-full left-0 mb-4 p-4 bg-white border border-gray-100 shadow-xl z-20 min-w-[200px]"
                          >
                            <div className="text-[10px] font-bold text-muted uppercase tracking-widest mb-4">Share Insight</div>
                            <div className="space-y-2">
                              <button className="w-full flex items-center gap-3 p-2 hover:bg-surface text-xs font-medium transition-colors">
                                <Twitter size={14} className="text-[#1DA1F2]" /> Twitter
                              </button>
                              <button className="w-full flex items-center gap-3 p-2 hover:bg-surface text-xs font-medium transition-colors">
                                <Linkedin size={14} className="text-[#0077B5]" /> LinkedIn
                              </button>
                              <button 
                                onClick={handleCopyLink}
                                className="w-full flex items-center gap-3 p-2 hover:bg-surface text-xs font-medium transition-colors"
                              >
                                {copied ? <CheckCircle2 size={14} className="text-green-500" /> : <LinkIcon size={14} />}
                                {copied ? 'Copied!' : 'Copy Link'}
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    <button className="flex items-center gap-2 text-[10px] font-bold text-muted hover:text-accent transition-colors uppercase tracking-widest">
                      <Bookmark size={16} /> Save
                    </button>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-muted uppercase tracking-widest">
                    <MessageSquare size={16} /> {(comments[selectedPost.id]?.length || 0)} Comments
                  </div>
                </div>

                {/* Comment Section */}
                <div className="space-y-12">
                  <div className="p-8 bg-surface border border-gray-100 relative overflow-hidden">
                    <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none" />
                    <h4 className="text-xs font-bold text-muted uppercase tracking-[0.2em] mb-6 relative z-10">Post a Comment</h4>
                    <div className="relative z-10">
                      <textarea 
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="ENTER YOUR TECHNICAL FEEDBACK..."
                        className="w-full bg-white border border-gray-200 p-6 text-xs font-medium outline-none focus:border-accent transition-colors min-h-[120px] resize-none mb-4"
                      />
                      <div className="flex justify-end">
                        <button 
                          onClick={() => handlePostComment(selectedPost.id)}
                          className="bg-black text-white px-8 py-3 text-[10px] font-bold tracking-widest hover:bg-accent transition-all flex items-center gap-2"
                        >
                          POST COMMENT <Send size={12} />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-8">
                    {(comments[selectedPost.id] || []).map((comment: any) => (
                      <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        key={comment.id} 
                        className="flex gap-4"
                      >
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex-shrink-0 flex items-center justify-center text-[10px] font-bold text-muted">
                          {comment.author.charAt(0)}
                        </div>
                        <div className="flex-grow">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold uppercase tracking-tight">{comment.author}</span>
                            <span className="text-[10px] text-muted uppercase tracking-widest">{comment.date}</span>
                          </div>
                          <p className="text-sm text-muted leading-relaxed">{comment.text}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-12">
              <div className="p-8 bg-surface border border-gray-100">
                <h4 className="text-xs font-bold text-muted uppercase tracking-[0.2em] mb-6">About the Author</h4>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                    <img src={`https://picsum.photos/seed/${selectedPost.author}/100/100`} alt={selectedPost.author} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="text-sm font-bold uppercase tracking-tight">{selectedPost.author}</div>
                    <div className="text-[10px] text-muted uppercase tracking-widest">Principal Architect</div>
                  </div>
                </div>
                <p className="text-xs text-muted leading-relaxed">
                  Leading expert in {selectedPost.category.toLowerCase()} with over 15 years of experience in complex infrastructure projects.
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-muted uppercase tracking-[0.2em] mb-8">Related Insights</h4>
                <div className="space-y-8">
                  {posts.filter(p => p.id !== selectedPost.id).slice(0, 2).map(post => (
                    <button 
                      key={post.id}
                      onClick={() => {
                        setSelectedPost(post);
                        window.scrollTo(0, 0);
                      }}
                      className="group text-left block"
                    >
                      <div className="text-[10px] font-bold text-accent uppercase tracking-widest mb-2">{post.category}</div>
                      <h5 className="text-sm font-bold uppercase tracking-tight group-hover:text-accent transition-colors line-clamp-2">
                        {post.title}
                      </h5>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
          onClick={() => {
            setSelectedPost(posts[0]);
            window.scrollTo(0, 0);
          }}
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
              onClick={() => {
                setSelectedPost(post);
                window.scrollTo(0, 0);
              }}
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
