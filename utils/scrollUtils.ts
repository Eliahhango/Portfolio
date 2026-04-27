/**
 * Utility functions for smooth scrolling
 */

export const scrollToSection = (sectionId: string, offset: number = 100) => {
    // Map 'skills' to 'expertise' since that's the actual section ID
    const mappedId = sectionId === 'skills' ? 'expertise' : sectionId;
    
    // Use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(() => {
        const element = document.getElementById(mappedId);
        if (element) {
            // Offset accounts for fixed header (80px) + extra spacing (20px) = 100px total
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: Math.max(0, offsetPosition),
                behavior: 'smooth'
            });
        }
    });
};

export const handleSectionClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    navigate?: (path: string) => void,
    currentPath?: string,
    onComplete?: () => void
) => {
    e.preventDefault();
    const targetId = href.substring(1); // Remove the '#'
    
    // If we're not on the home page, navigate to home first
    if (navigate && currentPath && currentPath !== '/') {
        navigate('/');
        // Wait for navigation and DOM update, then scroll
        setTimeout(() => {
            scrollToSection(targetId);
            if (onComplete) onComplete();
        }, 150);
    } else {
        scrollToSection(targetId);
        if (onComplete) onComplete();
    }
};
