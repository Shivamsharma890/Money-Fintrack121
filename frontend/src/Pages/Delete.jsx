import React, { useState } from "react";
import axios from "axios";

const Delete = () => {
  const [status, setStatus] = useState("input");
  const [userID, setUserID] = useState("");
  const [password, setPassword] = useState("");

  // ---------------------Authenticate-User---------------------------
  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:5000/delete", {
        userid: userID,
        password: password,
      });

      if (res.data.message === "Account deleted successfully") {
        setStatus("deleted");
        alert("⚠️ Account has been deleted permanently!");
      }
    } catch (err) {
      alert("❌ Invalid credentials or server error!");
    }
  };

  // -----------------------Confirmation-Screen-------------------------------
  const handleConfirm = () => {
    handleAuth({
      preventDefault: () => {}
    });
  };

  if (status === "confirm") {
    return (
      <div className="flex items-center justify-center bg-gray-50 py-10">

        <div className="bg-red-50 p-8 rounded-xl border border-red-300 shadow-lg w-full max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-red-700 mb-4">🗑️ Delete Account Confirmation</h2>
          <p className="text-red-600 mb-6">Your account will be <strong>permanently deleted</strong>.</p><p className="text-gray-700 mb-8">This action cannot be undone. Please confirm your choice.</p>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button onClick={handleConfirm} className="flex-1 py-3 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700">Confirm Deletion</button>
            <button onClick={() => setStatus("input")} className="flex-1 py-3 bg-gray-300 text-gray-800 font-semibold rounded-md hover:bg-gray-400">Cancel</button>
          </div>
        </div>
      </div>
    );
  }

  // ----------------------After-Confirmation---------------------------
  if (status === "deleted") {
    return (
      <div className="flex items-center justify-center bg-gray-50 py-10">
        <div className="bg-green-50 p-8 rounded-xl border border-green-300 shadow-lg w-full max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-green-700 mb-4">✅ Account Deleted Successfully</h2>
          <p className="text-gray-700 mb-6">The account has been permanently removed from the system.</p>
          <button
            onClick={() => {
              setStatus("input");
              setUserID("");
              setPassword("");
            }}
            className="py-3 w-full bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"> Delete Another Account </button>
        </div>
      </div>
    );
  }

  // ----------------------Starting-Screen-Section---------------------------
  return (
    <div className="flex items-center justify-center bg-gray-50 py-10">

      <div className="bg-red-50 p-8 rounded-xl border border-red-300 shadow-lg w-full max-w-4xl mx-auto">
        <h3 className="text-3xl font-extrabold mb-6 text-red-700 text-center">🔐 Authenticate to Delete Account</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setStatus("confirm");
          }}
          className="space-y-5 mx-auto"
        >
          <input
            type="text"
            placeholder="Enter User ID"
            className="p-3 w-full border rounded-md focus:ring-2 focus:ring-red-400"
            required
            value={userID}
            onChange={(e) => setUserID(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter Password"
            className="p-3 w-full border rounded-md focus:ring-2 focus:ring-red-400"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="w-full py-3 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700">Authenticate</button>
        </form>
      </div>
    </div>
  );
};

export default Delete;


