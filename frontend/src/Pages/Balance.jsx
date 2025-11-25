import React, { useState } from "react";
import axios from "axios";

const Balance = () => {
  const [status, setStatus] = useState("input");
  const [userID, setUserID] = useState("");
  const [password, setPassword] = useState("");
  const [balance, setBalance] = useState(null);

  // ------------------Check-Balance_Using-Database----------------------
  const handleCheck = async (e) => {
    e.preventDefault();
    setStatus("checking");

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}balance`, {
        userid: userID,
        password: password,
      });

      setBalance(res.data.balance);
      setStatus("success");

    } catch (err) {
      setStatus("input");
      alert("❌ Error: " + (err.response?.data?.error || "Server error"));
    }
  };

  // --------------------------Balance-Show-Section-------------------------------
  if (status === "success") {
    return (
      <div className="flex items-center justify-center bg-gray-50 py-10">
        <div className="bg-cyan-100 p-8 rounded-xl border border-cyan-400 shadow-lg w-full max-w-4xl mx-auto text-center">

          <h2 className="text-3xl font-bold text-cyan-900 mb-4">💰 Current Balance</h2>
          <p className="text-5xl font-extrabold text-cyan-900 mb-6">₹{Number(balance).toLocaleString("en-IN")}</p>
          <button
            onClick={() => {
              setStatus("input");
              setUserID("");
              setPassword("");
            }}
            className="py-3 px-6 bg-cyan-600 text-white font-semibold rounded-md hover:bg-cyan-700 transition">Check Another Account</button>
        </div>
      </div>
    );
  }

  // ----------------------Correct-UserID-Password-Authentication--------------------------
  return (
    <div className="flex items-center justify-center bg-gray-50 py-10">

      <div className="bg-cyan-50 p-8 rounded-xl border border-cyan-300 shadow-lg w-full max-w-4xl mx-auto">
        <h3 className="text-3xl font-extrabold mb-6 text-cyan-800 text-center">🔍 View Balance</h3>
        <form onSubmit={handleCheck} className="space-y-5 mx-auto">

          <input
            type="text"
            placeholder="Enter User ID"
            className="p-3 w-full border rounded-md focus:ring-2 focus:ring-cyan-400 focus:outline-none"
            value={userID}
            onChange={(e) => setUserID(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Enter Password"
            className="p-3 w-full border rounded-md focus:ring-2 focus:ring-cyan-400 focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="w-full py-3 bg-cyan-600 text-white font-semibold rounded-md hover:bg-cyan-700 transition">{status === "checking" ? "Checking..." : "Check Balance"}</button>

        </form>
      </div>
    </div>
  );
};

export default Balance;
