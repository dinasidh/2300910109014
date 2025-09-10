// App.js
import React, { useState, useEffect } from "react";
import ShortenForm from "./ShortenForm";
import UrlList from "./UrlList";
import axios from "axios";

function App() {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    const storedUrls = JSON.parse(localStorage.getItem("urls")) || [];
    setUrls(storedUrls);
  }, []);

  const addUrl = (longUrl) => {
    const shortCode = Math.random().toString(36).substring(2, 8);
    const newUrl = { id: shortCode, longUrl, clicks: [] };
    const updatedUrls = [newUrl, ...urls];
    setUrls(updatedUrls);
    localStorage.setItem("urls", JSON.stringify(updatedUrls));
  };

  const incrementClicks = async (id) => {
    let location = { city: "Unknown", country: "Unknown" };
    try {
      const res = await axios.get("https://ipapi.co/json/");
      location = { city: res.data.city, country: res.data.country_name };
    } catch (err) {
      console.log("Geolocation API error", err);
    }

    const updatedUrls = urls.map((url) =>
      url.id === id
        ? {
            ...url,
            clicks: [
              ...url.clicks,
              {
                timestamp: new Date().toISOString(),
                source: document.referrer || "Direct",
                location,
              },
            ],
          }
        : url
    );

    setUrls(updatedUrls);
    localStorage.setItem("urls", JSON.stringify(updatedUrls));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-6">URL Shortener</h1>
      <ShortenForm addUrl={addUrl} />
      <UrlList urls={urls} incrementClicks={incrementClicks} />
    </div>
  );
}

export default App;
