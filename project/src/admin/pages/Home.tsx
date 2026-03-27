import { Link } from 'react-router-dom';
import { Camera, Star, FolderOpen } from 'lucide-react';

export function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Suraj Studio</h1>
            <p className="text-gray-600">Professional Photography</p>
          </div>
          <nav className="flex gap-6">
            <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">
              Home
            </Link>
            <Link to="/portfolio" className="text-gray-700 hover:text-blue-600 font-medium">
              Portfolio
            </Link>
          </nav>
        </div>
      </header>

      <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <Camera className="w-16 h-16 mx-auto text-blue-600 mb-6" />
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Capturing Life's Beautiful Moments
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Professional photography services for weddings, events, and special occasions
          </p>
          <Link
            to="/portfolio"
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg"
          >
            <FolderOpen className="w-5 h-5 mr-2" />
            View Portfolio
          </Link>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Services</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Weddings</h4>
              <p className="text-gray-600">Beautiful wedding photography to capture your special day</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Events</h4>
              <p className="text-gray-600">Corporate and social event photography services</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FolderOpen className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Commercial</h4>
              <p className="text-gray-600">Professional product and commercial photography</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-400">
            2024 Suraj Studio. All rights reserved.
          </p>
          <Link to="/login" className="text-gray-500 hover:text-gray-300 text-sm mt-2 inline-block">
            Admin
          </Link>
        </div>
      </footer>
    </div>
  );
}
