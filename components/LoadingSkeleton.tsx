import React from 'react';

interface LoadingSkeletonProps {
    className?: string;
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ className = '' }) => {
    return (
        <div className={`animate-pulse ${className}`}>
            <div className="bg-slate-200 dark:bg-gray-700 rounded"></div>
        </div>
    );
};

export const ModalSkeleton: React.FC = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl p-6 max-w-2xl w-full mx-4 animate-pulse">
                <div className="h-8 bg-slate-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                <div className="space-y-3">
                    <div className="h-4 bg-slate-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-4 bg-slate-200 dark:bg-gray-700 rounded w-5/6"></div>
                    <div className="h-4 bg-slate-200 dark:bg-gray-700 rounded w-4/6"></div>
                </div>
            </div>
        </div>
    );
};

export default LoadingSkeleton;
