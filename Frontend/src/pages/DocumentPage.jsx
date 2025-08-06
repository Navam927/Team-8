import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const mockDocuments = [
  { id: 1, name: "Team Roadmap", content: "Here is the roadmap for our team..." },
  { id: 2, name: "Project Alpha Plan", content: "Initial planning for Project Alpha..." },
  { id: 3, name: "Meeting Notes", content: "Notes from recent meetings..." },
];

const DocumentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doc, setDoc] = useState(null);

  useEffect(() => {
    const found = mockDocuments.find((d) => d.id === parseInt(id));
    setDoc(found);
  }, [id]);

  if (!doc) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black">
        <div className="text-center">
          <p className="text-lg">Document not found</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-900 via-purple-900 to-indigo-900 text-white p-10">
      <div className="max-w-3xl mx-auto bg-white/10 rounded-xl p-8 shadow-lg backdrop-blur">
        <h1 className="text-3xl font-bold mb-4 text-indigo-200">{doc.name}</h1>
        <div className="bg-white/5 p-4 rounded text-indigo-100 leading-relaxed font-mono">
          {doc.content}
        </div>
        <button
          onClick={() => navigate("/")}
          className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
        >
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default DocumentPage;
