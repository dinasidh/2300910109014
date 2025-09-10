// ShortenForm.js
import React, { useState } from "react";

function ShortenForm({ addUrl }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input) return alert("Enter a valid URL!");
    addUrl(input);
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center mb-6">
      <input
        type="url"
        placeholder="Enter URL here"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="p-2 border border-gray-400 rounded-l w-80"
        required
      />
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded-r hover:bg-blue-600"
      >
        Shorten
      </button>
    </form>
  );
}

export default ShortenForm;
