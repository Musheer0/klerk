import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const useHash = () => {
    const [hash, setHash] = useState(window.location.hash);
   const route = useRouter()
    useEffect(() => {
        const handleHashChange = () => {
            setHash(window.location.hash);
        };

        // Attach the event listener for hash changes
        window.addEventListener('hashchange', handleHashChange);

        // Call once to set initial hash value
        handleHashChange();

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, [route]); // No dependencies here

    return hash;
};

export default useHash;
