import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const MyDocuments = () => {
  const [documents, setDocuments] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchDocuments = async () => {
      try {
        const res = await axios.get('/api/documents', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDocuments(res.data.documents);
      } catch (err) {
        console.error('Error fetching documents:', err);
      }
    };

    fetchDocuments();
  }, [token, navigate]);

  const handleCreateNew = async () => {
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
      const newDoc = res.data.document;
      navigate(`/editor/${newDoc._id}`);
    } catch (err) {
      console.error('Error creating document:', err);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Documents</h2>
        <button
          onClick={handleCreateNew}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Create New
        </button>
      </div>

      {documents.length === 0 ? (
        <p className="text-gray-500">No documents found.</p>
      ) : (
        <ul className="space-y-4">
          {documents.map((doc) => (
            <li
              key={doc._id}
              className="p-4 border border-gray-200 rounded shadow-sm hover:shadow-md"
            >
              <Link
                to={`/editor/${doc._id}`}
                className="text-blue-600 font-semibold hover:underline"
              >
                {doc.title || 'Untitled Document'}
              </Link>
              <p className="text-sm text-gray-500">
                Last updated: {new Date(doc.updatedAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyDocuments;
