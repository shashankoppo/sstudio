import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Users, FolderOpen, Tag, MessageSquare, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function AdminLayout() {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex h-screen bg-gray-50">
      <aside className="w-64 bg-white border-r border-gray-200">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900">Suraj Studio</h1>
          <p className="text-sm text-gray-500 mt-1">Admin Panel</p>
        </div>

        <nav className="mt-6 px-3">
          <Link
            to="/admin/leads"
            className={`flex items-center px-4 py-3 mb-2 rounded-lg transition-colors ${isActive('/admin/leads')
              ? 'bg-blue-50 text-blue-700'
              : 'text-gray-700 hover:bg-gray-100'
              }`}
          >
            <Users className="w-5 h-5 mr-3" />
            Leads
          </Link>

          <Link
            to="/admin/portfolio"
            className={`flex items-center px-4 py-3 mb-2 rounded-lg transition-colors ${isActive('/admin/portfolio')
              ? 'bg-blue-50 text-blue-700'
              : 'text-gray-700 hover:bg-gray-100'
              }`}
          >
            <FolderOpen className="w-5 h-5 mr-3" />
            Portfolio
          </Link>

          <Link
            to="/admin/categories"
            className={`flex items-center px-4 py-3 mb-2 rounded-lg transition-colors ${isActive('/admin/categories')
              ? 'bg-blue-50 text-blue-700'
              : 'text-gray-700 hover:bg-gray-100'
              }`}
          >
            <Tag className="w-5 h-5 mr-3" />
            Categories
          </Link>

          <Link
            to="/admin/testimonials"
            className={`flex items-center px-4 py-3 mb-2 rounded-lg transition-colors ${isActive('/admin/testimonials')
              ? 'bg-blue-50 text-blue-700'
              : 'text-gray-700 hover:bg-gray-100'
              }`}
          >
            <MessageSquare className="w-5 h-5 mr-3" />
            Testimonials
          </Link>

          <Link
            to="/admin/settings"
            className={`flex items-center px-4 py-3 mb-2 rounded-lg transition-colors ${isActive('/admin/settings')
              ? 'bg-blue-50 text-blue-700'
              : 'text-gray-700 hover:bg-gray-100'
              }`}
          >
            <Settings className="w-5 h-5 mr-3" />
            Settings
          </Link>
        </nav>

        <div className="absolute bottom-0 w-64 p-4 border-t border-gray-200">
          <button
            onClick={handleSignOut}
            className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Sign Out
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
