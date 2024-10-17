import React, { useState } from 'react';
import { format } from 'date-fns';
import { Trash2, Download, Edit, Plus, X } from 'lucide-react';

// Mock data for active links
const mockLinks = [
  { id: 1, url: 'https://fileshare.com/abc123', expirationDate: new Date(2024, 5, 15), downloads: 5 },
  { id: 2, url: 'https://fileshare.com/def456', expirationDate: new Date(2024, 6, 1), downloads: 2 },
  { id: 3, url: 'https://fileshare.com/ghi789', expirationDate: new Date(2024, 7, 10), downloads: 8 },
];

const AdminDashboard: React.FC = () => {
  const [links, setLinks] = useState(mockLinks);
  const [maxFileSize, setMaxFileSize] = useState(100);
  const [allowedIPs, setAllowedIPs] = useState(['192.168.1.1', '10.0.0.1']);
  const [showIPModal, setShowIPModal] = useState(false);
  const [newIP, setNewIP] = useState('');

  const handleDeleteLink = (id: number) => {
    setLinks(links.filter(link => link.id !== id));
  };

  const handleDownloadFiles = (id: number) => {
    console.log(`Downloading files for link ${id}`);
    // TODO: Implement actual file download logic
  };

  const handleEditLink = (id: number) => {
    console.log(`Editing link ${id}`);
    // TODO: Implement link editing functionality
  };

  const handleMaxFileSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxFileSize(Number(e.target.value));
  };

  const handleAddIP = () => {
    if (newIP && !allowedIPs.includes(newIP)) {
      setAllowedIPs([...allowedIPs, newIP]);
      setNewIP('');
      setShowIPModal(false);
    }
  };

  const handleRemoveIP = (ip: string) => {
    setAllowedIPs(allowedIPs.filter(allowedIP => allowedIP !== ip));
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>

      <div>
        <h3 className="text-xl font-semibold mb-4">Active Links</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">URL</th>
                <th className="px-4 py-2 text-left">Expiration Date</th>
                <th className="px-4 py-2 text-left">Downloads</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {links.map(link => (
                <tr key={link.id} className="border-t">
                  <td className="px-4 py-2">{link.url}</td>
                  <td className="px-4 py-2">{format(link.expirationDate, 'MMM dd, yyyy')}</td>
                  <td className="px-4 py-2">{link.downloads}</td>
                  <td className="px-4 py-2 space-x-2">
                    <button onClick={() => handleEditLink(link.id)} className="text-blue-600 hover:text-blue-800">
                      <Edit size={18} />
                    </button>
                    <button onClick={() => handleDownloadFiles(link.id)} className="text-green-600 hover:text-green-800">
                      <Download size={18} />
                    </button>
                    <button onClick={() => handleDeleteLink(link.id)} className="text-red-600 hover:text-red-800">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">Global Settings</h3>
        <div className="bg-white shadow-md rounded-lg p-4 space-y-4">
          <div>
            <label htmlFor="maxFileSize" className="block text-sm font-medium text-gray-700 mb-2">
              Maximum File Size (MB)
            </label>
            <input
              type="number"
              id="maxFileSize"
              value={maxFileSize}
              onChange={handleMaxFileSizeChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>

          <div>
            <h4 className="text-lg font-medium mb-2">Allowed IP Addresses</h4>
            <div className="flex flex-wrap gap-2 mb-2">
              {allowedIPs.map(ip => (
                <div key={ip} className="bg-gray-200 rounded-full px-3 py-1 text-sm flex items-center">
                  <span>{ip}</span>
                  <button onClick={() => handleRemoveIP(ip)} className="ml-2 text-red-600 hover:text-red-800">
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowIPModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 flex items-center"
            >
              <Plus size={18} className="mr-2" />
              Add IP Address
            </button>
          </div>
        </div>
      </div>

      {showIPModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Add IP Address</h3>
            <input
              type="text"
              value={newIP}
              onChange={(e) => setNewIP(e.target.value)}
              placeholder="Enter IP address"
              className="w-full px-3 py-2 border rounded-md mb-4"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowIPModal(false)}
                className="px-4 py-2 border rounded-md hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleAddIP}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;