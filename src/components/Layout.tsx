import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Preloader from './Preloader';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation();

    useEffect(() => {
        // Skip preloader for the landing page
        if (location.pathname === '/') {
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        // Simulate loading time
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000); // Adjust this time as needed

        return () => clearTimeout(timer);
    }, [location.pathname]);

    // Don't render preloader on landing page
    const showPreloader = location.pathname !== '/';

    return (
        <>
            {showPreloader && <Preloader isLoading={isLoading} />}
            {(!isLoading || !showPreloader) && children}
        </>
    );
};

export default Layout; 