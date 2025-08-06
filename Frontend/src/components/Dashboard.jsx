import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [userName, setUserName] = useState('');
  const [documentCount, setDocumentCount] = useState(0);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchDashboardData = async () => {
      try {
        const res = await axios.get('/api/dashboard', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserName(res.data.user.name);
        setDocumentCount(res.data.totalDocuments);
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
      }
    };

    fetchDashboardData();
  }, [token, navigate]);

  const handleCreateNewDoc = async () => {
    try {
      const res = await axios.post(
        '/api/documents',
        { title: 'Untitled Document' },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate(`/editor/${res.data.document._id}`);
    } catch (err) {
      console.error('Error creating document:', err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">
        Welcome, {userName || 'User'} 👋
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="p-4 bg-blue-100 rounded shadow">
          <h2 className="text-xl font-semibold text-blue-700">Total Documents</h2>
          <p className="text-3xl mt-2 text-blue-800">{documentCount}</p>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleCreateNewDoc}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Create New Document
        </button>

        <Link
          to="/my-documents"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          View My Documents
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
