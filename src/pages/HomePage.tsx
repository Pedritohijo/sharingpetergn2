import React from 'react';
import { Link } from 'react-router-dom';
import { Upload, Shield, Clock } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to FileShare</h1>
      <p className="text-xl mb-8">Securely share your files with ease</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <FeatureCard
          icon={<Upload className="w-12 h-12 text-blue-500" />}
          title="Easy Upload"
          description="Upload multiple files with a single click"
        />
        <FeatureCard
          icon={<Shield className="w-12 h-12 text-green-500" />}
          title="Secure Sharing"
          description="Password-protect your downloads for added security"
        />
        <FeatureCard
          icon={<Clock className="w-12 h-12 text-purple-500" />}
          title="Expiration Control"
          description="Set expiration dates for automatic file deletion"
        />
      </div>
      <Link
        to="/upload"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300"
      >
        Start Uploading
      </Link>
    </div>
  );
};

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default HomePage;