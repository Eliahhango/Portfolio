import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../constants';
import SectionHeader from './SectionHeader';

const quoteClampStyle: React.CSSProperties = {
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 4,
  overflow: 'hidden',
};

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % TESTIMONIALS_DATA.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section id="testimonials" className="py-12 sm:py-16 md:py-20">
      <SectionHeader
        tag="Testimonials"
        title="What Clients Say"
        subtitle="A few words from clients and collaborators across security, product, and design work."
        variant="proof"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="md:hidden">
          <div className="relative h-[26rem]">
            <AnimatePresence mode="wait">
              <motion.article
                key={currentIndex}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.35 }}
                className="absolute inset-0 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-800/60"
              >
                <Quote className="absolute left-5 top-5 h-10 w-10 text-blue-500/15" />
                <div className="relative flex h-full flex-col">
                  <div className="flex gap-1 text-amber-400">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star key={index} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="mt-5 text-base italic leading-8 text-slate-600 dark:text-slate-200" style={quoteClampStyle}>
                    "{TESTIMONIALS_DATA[currentIndex].quote}"
                  </p>
                  <div className="mt-auto flex items-center gap-4 pt-6">
                    <img
                      src={TESTIMONIALS_DATA[currentIndex].avatarUrl}
                      alt={TESTIMONIALS_DATA[currentIndex].name}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        {TESTIMONIALS_DATA[currentIndex].name}
                      </h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {TESTIMONIALS_DATA[currentIndex].company}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>

          <div className="mt-6 flex justify-center gap-2">
            {TESTIMONIALS_DATA.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrentIndex(index)}
                className={`h-2.5 rounded-full transition-all ${
                  currentIndex === index ? 'w-8 bg-blue-500' : 'w-2.5 bg-slate-300 dark:bg-slate-700'
                }`}
                aria-label={`Show testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="hidden gap-8 md:grid md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS_DATA.map((testimonial, index) => (
            <motion.article
              key={`${testimonial.name}-${index}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="group relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-white/10 dark:bg-slate-800/60"
            >
              <Quote className="absolute left-5 top-5 h-10 w-10 text-blue-500/15" />
              <div className="relative flex h-full flex-col">
                <div className="flex gap-1 text-amber-400">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star key={starIndex} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p
                  className="mt-5 text-sm italic leading-7 text-slate-600 dark:text-slate-200"
                  style={quoteClampStyle}
                >
                  "{testimonial.quote}"
                </p>
                <div className="mt-auto flex items-center gap-4 pt-6">
                  <img
                    src={testimonial.avatarUrl}
                    alt={testimonial.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">{testimonial.name}</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{testimonial.company}</p>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
