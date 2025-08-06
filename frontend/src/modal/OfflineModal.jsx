import React from "react";

const OfflineModal = ({ onClose }) => {
  const handleDownload = () => {
    const zipUrl = "/CardioPrep_Python_Packages.zip";
    const link = document.createElement("a");
    link.href = zipUrl;
    link.download = "CardioPrep-python-package.zip";
    link.click();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-gradient-to-br from-pink-100 via-purple-100 to-white border border-pink-300 rounded-xl p-6 w-[90%] max-w-xl shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-pink-700">Offline Setup Instructions</h2>
          <button onClick={onClose} className="text-2xl font-bold text-pink-700 hover:text-purple-700">&times;</button>
        </div>

        <ul className="list-disc list-inside text-sm text-gray-800 space-y-2">
          <li>Click the button below to download the offline Python backend (includes <code>app.py</code> and <code>readme.txt</code>).</li>
          <li>Install <strong>Ollama</strong>: <a className="text-blue-600 underline" href="https://ollama.com" target="_blank" rel="noreferrer">https://ollama.com</a></li>
          <li>After installation, open terminal and run: <code>ollama pull gemma3n:e2b</code></li>
          <li>Run the backend with: <code>python app.py</code></li>
          <li>The app will then connect to <code>http://localhost:5000</code> when offline.</li>
          <li>Offline support is only available for desktop, as mobile cannot run LLMs locally.</li>
        </ul>

        <div className="mt-6 flex justify-center">
          <button
            onClick={handleDownload}
            className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-full transition"
          >
            Download Python Backend
          </button>
        </div>
      </div>
    </div>
  );
};

export default OfflineModal;
