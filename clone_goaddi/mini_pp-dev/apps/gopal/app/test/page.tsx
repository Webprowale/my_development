"use client";
import React, { useState } from "react";
import axios from "axios";

const ApiTester = () => {
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState("GET");
  const [headers, setHeaders] = useState("");
  const [body, setBody] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponse(null);
    setError(null);

    const requestOptions = {
      method,
      url,
      headers: {
        // Token: "gopaddi@v1",
        // Userid: "565",
        Authorization: "Bearer gopaddi@v1",
      },
      data: body
        ? JSON.parse(body)
        : {
            Userid: "1",
          },
    };

    try {
      const res = await axios(requestOptions);
      setResponse(res.data);
    } catch (err) {
      setError(
        err.response ? err.response.data : "Error: Unable to fetch data",
      );
    }
  };

  return (
    <div>
      <header className="bg-indigo-600 text-white py-4">
        <h1 className="text-center text-3xl font-bold">API Tester</h1>
      </header>
      <div className="flex items-start gap-5">
        <div className="max-w-2xl w-full mt-10 p-5 border rounded-lg shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                URL:
              </label>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2  border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Method:
              </label>
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="GET">GETT</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Headers (JSON format):
              </label>
              <textarea
                value={headers}
                onChange={(e) => setHeaders(e.target.value)}
                className="mt-1 block w-full px-3  py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Body (JSON format):
              </label>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="mt-1 block w-full px-3 py-2 min-h-[250px] h-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Send Request
            </button>
          </form>
        </div>
        <div className="mt-8 h-screen overflow-y-auto">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Response:
          </h3>
          {response && (
            <pre className="mt-2 p-4   bg-gray-100 rounded-lg overflow-auto">
              {JSON.stringify(response, null, 2)}
            </pre>
          )}
          {error && (
            <pre className="mt-2 p-4 bg-red-100 text-red-800 rounded-lg overflow-auto">
              {error}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApiTester;
