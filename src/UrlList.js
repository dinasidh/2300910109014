// UrlList.js
import React from "react";

function UrlList({ urls, incrementClicks }) {
  const handleCopy = async (url) => {
    await navigator.clipboard.writeText(window.location.origin + "/" + url.id);
    await incrementClicks(url.id);
    alert("Copied & Click tracked: " + window.location.origin + "/" + url.id);
  };

  return (
    <div className="flex flex-col gap-3 items-center">
      {urls.map((url) => (
        <div key={url.id} className="bg-white p-4 rounded shadow w-96">
          <p className="text-gray-800 font-semibold">{url.longUrl}</p>
          <p className="text-gray-500">
            Short:{" "}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() => handleCopy(url)}
            >
              {window.location.origin}/{url.id}
            </span>
          </p>
          <p className="text-gray-400 text-sm">Total Clicks: {url.clicks.length}</p>

          {url.clicks.length > 0 && (
            <div className="mt-2 text-gray-600 text-sm">
              <p>Click History:</p>
              <ul className="list-disc ml-5">
                {url.clicks.map((click, index) => (
                  <li key={index}>
                    {new Date(click.timestamp).toLocaleString()} | {click.source} |{" "}
                    {click.location.city}, {click.location.country}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default UrlList;
