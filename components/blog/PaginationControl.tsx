import React from 'react';
import { motion } from 'framer-motion';

interface PaginationControlProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationControl: React.FC<PaginationControlProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const maxVisiblePages = 5;

  // Calculate which pages to show
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  const visiblePages = pages.slice(startPage - 1, endPage);

  const buttonVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.08 },
    tap: { scale: 0.92 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="flex items-center justify-center gap-2 flex-wrap"
    >
      {/* Previous Button */}
      <motion.button
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="p-2 rounded-lg border border-slate-300 text-slate-600 hover:text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        aria-label="Previous page"
      >
        ‹
      </motion.button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {startPage > 1 && (
          <>
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => onPageChange(1)}
              className="w-10 h-10 rounded-lg border border-slate-300 text-slate-600 hover:text-slate-700 hover:border-slate-400 transition-colors duration-200 font-medium"
            >
              1
            </motion.button>
            {startPage > 2 && (
              <span className="text-slate-400 px-2">…</span>
            )}
          </>
        )}

        {visiblePages.map((page) => (
          <motion.button
            key={page}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={() => onPageChange(page)}
            className={`w-10 h-10 rounded-lg border font-medium transition-all duration-200 ${
              currentPage === page
                ? 'bg-blue-100 border-blue-300 text-blue-700 shadow-sm'
                : 'border-slate-300 text-slate-600 hover:text-slate-700 hover:border-slate-400'
            }`}
            aria-current={currentPage === page ? 'page' : undefined}
          >
            {page}
          </motion.button>
        ))}

        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && (
              <span className="text-slate-400 px-2">…</span>
            )}
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => onPageChange(totalPages)}
              className="w-10 h-10 rounded-lg border border-slate-300 text-slate-600 hover:text-slate-700 hover:border-slate-400 transition-colors duration-200 font-medium"
            >
              {totalPages}
            </motion.button>
          </>
        )}
      </div>

      {/* Next Button */}
      <motion.button
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg border border-slate-300 text-slate-600 hover:text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        aria-label="Next page"
      >
        ›
      </motion.button>

      {/* Page Info */}
      <div className="ml-4 text-sm text-slate-600">
        Page <span className="text-slate-700 font-medium">{currentPage}</span> of{' '}
        <span className="text-slate-700 font-medium">{totalPages}</span>
      </div>
    </motion.div>
  );
};

export default PaginationControl;
