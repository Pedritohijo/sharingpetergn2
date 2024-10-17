import React from 'react';
import { Link } from 'react-router-dom';
import { Upload } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold flex items-center">
          <Upload className="mr-2" />
          FileShare
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Link to="/" className="hover:text-blue-200">Home</Link></li>
            <li><Link to="/upload" className="hover:text-blue-200">Upload</Link></li>
            <li><Link to="/admin" className="hover:text-blue-200">Admin</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;