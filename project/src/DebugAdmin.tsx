
import { useEffect } from 'react';

export default function DebugAdmin() {
    useEffect(() => {
        console.log('DebugAdmin mounted');
    }, []);

    return (
        <div className="p-10 bg-red-100 border-2 border-red-500">
            <h1 className="text-2xl font-bold text-red-700">Debug Admin Page</h1>
            <p className="text-red-600">If you see this, routing is working.</p>
        </div>
    );
}
