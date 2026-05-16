import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Chrome as Home, Search } from 'lucide-react';
import { setSEO } from '../utils/seo';

export default function NotFound() {
  useEffect(() => {
    setSEO({
      fullTitle: '404 - Page Not Found | Fluent Future Academy',
      description: 'The page you are looking for could not be found. Return to our homepage to continue exploring Fluent Future Academy.',
      canonicalPath: '/404',
      noindex: true,
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Page Not Found',
        description: 'The requested page could not be found.',
        url: 'https://fluentfutureacademy.org/404',
      },
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-emerald-900 flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <div className="mb-8">
          <h1 className="text-8xl md:text-9xl font-bold text-white mb-4 drop-shadow-lg">404</h1>
          <p className="text-3xl md:text-4xl font-bold text-blue-100 mb-4">Page Not Found</p>
        </div>

        <p className="text-lg text-blue-100 mb-8 leading-relaxed">
          We couldn't find the page you were looking for. It may have been moved, deleted, or the URL might be incorrect. Let's get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-white text-blue-900 rounded-lg font-bold hover:bg-blue-50 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
          >
            <Home size={20} />
            Return to Home
          </Link>
          <Link
            to="/articles"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-700 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
          >
            <Search size={20} />
            Browse Resources
          </Link>
        </div>

        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-left">
          <h2 className="text-xl font-bold text-white mb-4">Quick Links</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <li>
              <Link to="/" className="text-blue-200 hover:text-white transition-colors font-medium">
                Home
              </Link>
            </li>
            <li>
              <Link to="/programs" className="text-blue-200 hover:text-white transition-colors font-medium">
                Programs
              </Link>
            </li>
            <li>
              <Link to="/articles" className="text-blue-200 hover:text-white transition-colors font-medium">
                Articles
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-blue-200 hover:text-white transition-colors font-medium">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/corporate" className="text-blue-200 hover:text-white transition-colors font-medium">
                Corporate Training
              </Link>
            </li>
            <li>
              <Link to="/teacher-application" className="text-blue-200 hover:text-white transition-colors font-medium">
                Careers
              </Link>
            </li>
          </ul>
        </div>

        <div className="mt-12 pt-8 border-t border-white/20">
          <p className="text-blue-200">
            Need help? Contact us at{' '}
            <a href="mailto:hben@fluentfutureacademy.org" className="text-white font-bold hover:underline">
              hben@fluentfutureacademy.org
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
