import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Download, Lock } from 'lucide-react';

const DownloadPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [password, setPassword] = useState('');
  const [isPasswordProtected, setIsPasswordProtected] = useState(true);
  const [error, setError] = useState('');

  // Mock file data (replace with actual data fetching logic)
  const fileData = {
    name: 'example_file.zip',
    size: '25 MB',
    expirationDate: new Date(2024, 5, 15),
  };

  const handleDownload = () => {
    if (isPasswordProtected && !password) {
      setError('Please enter the password to download the file.');
      return;
    }

    // TODO: Implement actual file download logic here
    console.log('Downloading file with ID:', id, 'Password:', password);
    // Reset error and password after successful download
    setError('');
    setPassword('');
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Download File</h2>
      <div className="mb-6">
        <p className="text-lg font-semibold">{fileData.name}</p>
        <p className="text-gray-600">Size: {fileData.size}</p>
        <p className="text-gray-600">Expires on: {fileData.expirationDate.toLocaleDateString()}</p>
      </div>
      {isPasswordProtected && (
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <div className="relative">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 pr-10"
              placeholder="Enter password to download"
            />
            <Lock className="absolute right-3 top-3 text-gray-400" />
          </div>
        </div>
      )}
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <button
        onClick={handleDownload}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 flex items-center justify-center"
      >
        <Download className="mr-2" />
        Download File
      </button>
    </div>
  );
};

export default DownloadPage;