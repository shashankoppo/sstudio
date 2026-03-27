import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WebsiteApp from './WebsiteApp';
import AdminApp from './admin/AdminApp';
import DebugAdmin from './DebugAdmin';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/admin/*" element={<AdminApp />} />
                <Route path="/debug-admin" element={<DebugAdmin />} />
                <Route path="/*" element={<WebsiteApp />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
