import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [status, setStatus] = useState("input");
  const [userID, setUserID] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setStatus("checking");

    try {
      const res = await axios.post("http://127.0.0.1:5000/login", {
        userid: userID,
        password: password,
      });

      setUser(res.data.user);
      setStatus("success");
    } catch (err) {
      setStatus("fail");
      alert("❌ Login failed: " + (err.response?.data?.error || "Server error"));
    }
  };

  const handleLogout = () => {
    setStatus("input");
    setUserID("");
    setPassword("");
    setUser(null);
  };

  // ------------------------After-Login--------------------------
  if (status === "success" && user) {
    return (
      <div className="flex flex-col items-center justify-center bg-gray-50 py-10">
        <div className="bg-green-50 p-8 rounded-xl border border-green-300 shadow-lg w-full max-w-4xl mx-auto">

          <h2 className="text-3xl font-bold text-green-700 text-center mb-4">
            Welcome, {user.first_name} {user.last_name}! 🎉
          </h2>

          <p className="text-center text-gray-700 mb-6">
            Your account is active and secure.
          </p>

          <div className="flex flex-col md:flex-row justify-center gap-4 w-full">

            {/* -----------------------User-Full-Details------------------------ */}
            <button
              className="flex-1 py-3 bg-blue-200 text-blue-800 font-semibold rounded-md hover:bg-blue-300 transition"
              onClick={() =>
                alert(
                  `👤 Full Name: ${user.first_name} ${user.last_name}
📧 Email: ${user.work_email}
📞 Phone: ${user.phone}
🎂 Age: ${user.age}
📍 Address: ${user.address}`
                )
              }
            >
              View Details
            </button>

            {/* ----------------------User-Balance---------------------------- */}
            <button
              className="flex-1 py-3 bg-blue-200 text-blue-800 font-semibold rounded-md hover:bg-blue-300 transition"
              onClick={() =>
                alert(`💰 Current Balance: ₹${user.balance}`)
              }
            >
              View Balance
            </button>

            {/* ---------------------User-Transactions---------------------- */}

            <button
              className="flex-1 py-3 bg-blue-200 text-blue-800 font-semibold rounded-md hover:bg-blue-300 transition"
              onClick={() => {
                const tx = user.transactions;

                if (!tx || tx.length === 0) {
                  alert("📭 No transactions available.");
                  return;
                }

                const formatted = tx
                  .map((t, i) => {
                    const date = t.created_at
                      ? new Date(t.created_at + "+05:30").toLocaleString()
                      : "No Date";
                    return `
${i + 1}. ${t.type ? t.type.toUpperCase() : "UNKNOWN"}
Amount: ₹${t.amount || 0}
Balance After: ₹${t.balance_after || "N/A"}
Description: ${t.description || "None"}
Date: ${date}
--------------------------------`;
                  })
                  .join("\n\n");

                alert(formatted);
              }}
            >
              Transactions
            </button>
          </div>

          <button
            onClick={handleLogout}
            className="w-full mt-6 py-3 bg-gray-300 text-gray-800 font-semibold rounded-md hover:bg-gray-400 transition"
          >
            Logout / Reset
          </button>
        </div>
      </div>
    );
  }

  // ----------------------UserID-Password-Verification---------------------------
  return (
    <div className="flex items-center justify-center bg-gray-50 py-10">
      <div className="bg-blue-50 p-8 rounded-xl border border-blue-300 shadow-lg w-full max-w-4xl mx-auto">

        <h3 className="text-3xl font-extrabold mb-6 text-blue-800 text-center">
          🔐 Secure User Login
        </h3>

        <form onSubmit={handleLogin} className="space-y-5 mx-auto">
          <div>
            <input
              type="text"
              placeholder="Enter User ID"
              className="p-3 w-full border rounded-md focus:ring-2 focus:ring-blue-400"
              required
              value={userID}
              onChange={(e) => setUserID(e.target.value)}
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Enter Password"
              className="p-3 w-full border rounded-md focus:ring-2 focus:ring-blue-400"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
          >
            {status === "checking" ? "Checking..." : "Login"}
          </button>
        </form>

        {status === "fail" && (
          <p className="text-red-500 text-center mt-4">
            ❌ Invalid credentials. Try again.
          </p>
        )}

      </div>
    </div>
  );
};

export default Login;
