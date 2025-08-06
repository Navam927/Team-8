import React, { useState } from "react";
import { Link } from "react-router-dom";

const bgClass =
  "bg-gradient-to-tr from-indigo-800 via-purple-900 to-gray-900 min-h-screen";

const Dashboard = () => {
  const documents = [
    { id: 1, name: "Team Roadmap", updatedAt: "2025-08-06 14:30" },
    { id: 2, name: "Project Alpha Plan", updatedAt: "2025-08-05 10:12" },
    { id: 3, name: "Meeting Notes", updatedAt: "2025-08-04 18:45" },
  ];

  const [showModal, setShowModal] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [inviteEmail, setInviteEmail] = useState("");
  const [invited, setInvited] = useState(false);

  const handleCollaborate = (doc) => {
    setSelectedDoc(doc);
    setShowModal(true);
    setInviteEmail("");
    setInvited(false);
  };

  const handleInvite = (e) => {
    e.preventDefault();
    if (inviteEmail) {
      setInvited(true);
    }
  };

  return (
    <div className={`${bgClass} flex`}>
      <aside className="w-72 hidden md:flex flex-col bg-white/90 text-black shadow-xl h-screen sticky top-0 z-10">
        <div className="flex items-center gap-2 p-7 border-b">
          <div className="bg-indigo-700 text-white w-10 h-10 rounded flex items-center justify-center text-2xl font-bold">
            <span>🚀</span>
          </div>
          <div className="text-2xl font-extrabold tracking-tight ml-2">
            Unlocking
            <br />
            Possibilities
          </div>
        </div>
        <nav className="flex-1 py-8 px-4 space-y-2 text-[1rem] font-medium">
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-indigo-50 group transition font-semibold"
          >
            <span>🏠</span>
            <span className="group-hover:text-indigo-700">Dashboard</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-indigo-50 group transition"
          >
            <span>📄</span>
            <span className="group-hover:text-indigo-700">My Documents</span>
          </a>

          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-indigo-50 group transition"
          >
            <span>🚪</span>
            <span className="group-hover:text-red-500">Logout</span>
          </a>
        </nav>
        <div className="p-5">
          <div className="bg-indigo-100 rounded-lg p-4 text-indigo-900 text-sm font-medium">
            <span className="font-bold">Tip:</span> Start a new document and
            invite your collaborators!
          </div>
        </div>
      </aside>

      <main className="flex-1 p-8 md:p-12 flex flex-col">
        <h1 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-indigo-300 via-pink-200 to-purple-200 bg-clip-text text-transparent drop-shadow">
          Welcome Back!
        </h1>
        <p className="text-purple-100/80 mb-10 text-lg font-medium max-w-xl">
          Collaborate in real-time, create stunning documents, and unlock your
          productivity potential.
        </p>

        <div className="flex flex-wrap justify-between items-center mb-7 gap-3">
          <h2 className="text-2xl font-bold text-white drop-shadow">
            Your Documents
          </h2>
          <button className="flex items-center gap-2 bg-gradient-to-tr from-indigo-500 to-purple-500 text-white font-semibold px-5 py-2.5 rounded-lg shadow hover:scale-105 hover:from-pink-500 hover:to-purple-600 transition duration-150 active:scale-95">
            <span className="text-xl">＋</span> Create Document
          </button>
        </div>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="relative group bg-gradient-to-br from-white/70 via-gray-200 to-purple-100/60 border border-gray-100 rounded-2xl shadow-lg overflow-hidden p-5 flex flex-col hover:shadow-2xl transition"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">📑</span>
                <h3 className="font-bold text-lg text-indigo-900 group-hover:text-indigo-700 truncate">
                  {doc.name}
                </h3>
              </div>
              <div className="flex-1" />
              <div className="flex justify-between items-end mt-2 gap-2">
                <span className="text-xs text-gray-700 font-medium">
                  Last edited
                  <br />
                  <span className="text-gray-500">{doc.updatedAt}</span>
                </span>
                <Link
                  to={`/document/${doc.id}`}
                  className="ml-auto group-hover:scale-105 bg-indigo-700 text-white px-4 py-1.5 rounded-lg font-semibold text-sm shadow hover:bg-indigo-800 transition active:scale-95"
                >
                  Open
                </Link>
                
                <button
                  onClick={() => handleCollaborate(doc)}
                  className="ml-1 group-hover:scale-105 bg-pink-600 text-white px-3 py-1.5 rounded-lg font-semibold text-sm shadow hover:bg-pink-700 transition active:scale-95"
                  title="Collaborate"
                >
                  🤝 Collaborate
                </button>
              </div>

              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-gradient-to-tr from-pink-500 to-indigo-400 animate-pulse" />
            </div>
          ))}

          <button
            className="flex flex-col items-center justify-center min-h-[160px] border-2 border-dashed border-indigo-300 rounded-2xl text-indigo-600 hover:text-white hover:bg-indigo-500/70 transition shadow-inner focus:outline-none"
            title="Create a new document"
          >
            <span className="text-4xl mb-2">＋</span>
            <span className="font-semibold">New Document</span>
          </button>
        </div>
      </main>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur">
          <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-sm w-full flex flex-col gap-5">
            <h3 className="text-xl font-bold text-indigo-700 mb-1">
              Invite Collaborators
            </h3>
            <div className="mb-2 text-gray-700 font-medium">
              Document:{" "}
              <span className="font-semibold">{selectedDoc?.name}</span>
            </div>
            <form onSubmit={handleInvite} className="flex flex-col gap-3">
              <input
                type="email"
                className="border border-gray-300 rounded p-2 focus:outline-none focus:border-indigo-400"
                placeholder="Enter collaborator's email"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                required
                disabled={invited}
              />
              <button
                type="submit"
                className="bg-indigo-700 text-white rounded px-4 py-2 font-semibold hover:bg-indigo-800 transition"
                disabled={invited}
              >
                {invited ? "Invited!" : "Send Invite"}
              </button>
            </form>
            {invited && (
              <div className="text-green-700 font-medium">
                Invitation sent to <b>{inviteEmail}</b>!
              </div>
            )}
            <button
              onClick={() => setShowModal(false)}
              className="self-end text-sm text-gray-500 hover:text-indigo-400 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
