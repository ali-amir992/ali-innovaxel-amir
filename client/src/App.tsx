import { useState } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api/v1/shorten"; 

interface ApiResponse {
  id?: string;
  url?: string;
  shortCode?: string;
  createdAt?: string;
  updatedAt?: string;
  accessCount?: number;
}

export default function App() {
  const [longUrl, setLongUrl] = useState("");
  const [shortCode, setShortCode] = useState("");
  const [updatedUrl, setUpdatedUrl] = useState("");
  const [response, setResponse] = useState<ApiResponse | null>(null);

  const shortenUrl = async () => {
    try {
      const res = await axios.post<ApiResponse>(API_BASE_URL, { url: longUrl });
      setResponse(res.data);
    } catch (error) {
      console.error(error);
    }
  };


  const fetchOriginalUrl = async () => {
    window.location.href = `${API_BASE_URL}/${shortCode}`; // ✅ Backend handles redirection
  };


  const updateShortUrl = async () => {
    try {
      const res = await axios.put<ApiResponse>(`${API_BASE_URL}/${shortCode}`, { url: updatedUrl });
      setResponse(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteShortUrl = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/${shortCode}`);
      setResponse({ url: "Deleted successfully" });
    } catch (error) {
      console.error(error);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await axios.get<ApiResponse>(`${API_BASE_URL}/${shortCode}/stats`);
      setResponse(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">URL Shortener</h1>
      <input
        type="text"
        placeholder="Enter long URL"
        value={longUrl}
        onChange={(e) => setLongUrl(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <button onClick={shortenUrl} className="bg-blue-500 text-white p-2 rounded w-full">Shorten URL</button>

      <input
        type="text"
        placeholder="Enter Short Code"
        value={shortCode}
        onChange={(e) => setShortCode(e.target.value)}
        className="border p-2 w-full mt-4 mb-2"
      />
      <button onClick={fetchOriginalUrl} className="bg-green-500 text-white p-2 rounded w-full mb-2">Fetch Original URL</button>
      <button onClick={fetchStats} className="bg-yellow-500 text-white p-2 rounded w-full mb-2">View Stats</button>
      <button onClick={deleteShortUrl} className="bg-red-500 text-white p-2 rounded w-full">Delete Short URL</button>

      <input
        type="text"
        placeholder="Enter updated URL"
        value={updatedUrl}
        onChange={(e) => setUpdatedUrl(e.target.value)}
        className="border p-2 w-full mt-4 mb-2"
      />
      <button onClick={updateShortUrl} className="bg-purple-500 text-white p-2 rounded w-full">Update Short URL</button>

      {response && <pre className="bg-gray-100 p-4 mt-4">{JSON.stringify(response, null, 2)}</pre>}
    </div>
  );
}
