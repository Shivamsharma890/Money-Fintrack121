import React, { useState } from "react";
import axios from "axios";

const Forgot = () => {
  const [step, setStep] = useState("verify");
  const [phone, setPhone] = useState("");

  const [form, setForm] = useState({
    userid: "",
    password: "",
  });

  // ---------------------Fetch userid + password using phone------------------------
  const handleVerifyPhone = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/forgot`, { phone });

      if (res.data.user) {
        setForm({
          userid: res.data.user.userid,
          password: res.data.user.password,
        });

        setStep("edit");
      } else {
        alert("❌ Phone number not found!");
      }
    } catch (err) {
      console.error(err);
      alert("Server error while verifying phone");
    }
  };

  // ------------------------------Update userid + password in database----------------------------------
  const handleUpdate = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/updateCredentials`, {
        phone,
        userid: form.userid,
        password: form.password,
      });

      if (res.data.message) {
        alert("✅ Credentials updated successfully!");
        setStep("done");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Error updating credentials");
    }
  };


  // ---------------------------Initial-Screen------------------------------
  if (step === "verify") {
    return (
      <div className="flex items-center justify-center py-10 bg-gray-50">
        <div className="bg-blue-50 p-8 rounded-xl shadow-lg w-full max-w-4xl border border-blue-300">
          <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
            🔐 Recover Account
          </h2>

          <form onSubmit={handleVerifyPhone} className="space-y-5">
            <input
              type="text"
              placeholder="Enter Registered Phone Number"
              className="p-3 w-full border rounded-md focus:ring-2 focus:ring-blue-400"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              maxLength={10}
              inputMode="numeric"
              required
            />

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
            >
              Verify Phone
            </button>
          </form>
        </div>
      </div>
    );
  }

  // -----------------------It-Shows-Previous-Credentials-with-Edit------------------------
  if (step === "edit") {
    return (
      <div className="flex items-center justify-center bg-gray-50 py-10">
        <div className="bg-green-50 p-8 rounded-xl shadow-lg w-full max-w-4xl border border-green-300">
          <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
            ✏️ Update Login Credentials
          </h2>

          <div className="space-y-5">
            <input
              type="text"
              placeholder="User-ID"
              className="p-3 w-full border rounded-md"
              value={form.userid}
              onChange={(e) =>
                setForm({ ...form, userid: e.target.value })
              }
              required
            />

            <input
              type="text"
              placeholder="Password"
              className="p-3 w-full border rounded-md"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              required
            />

            <button
              onClick={handleUpdate}
              className="w-full py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --------------------------Final-Screen-------------------------------
  if (step === "done") {
    return (
      <div className="flex items-center justify-center bg-gray-50 py-10">
        <div className="bg-purple-50 p-8 rounded-xl shadow-lg w-full max-w-4xl text-center border border-purple-300">
          <h2 className="text-3xl font-bold text-purple-700 mb-4">
            🎉 Credentials Updated
          </h2>
          <p className="text-gray-700 mb-6">
            Your User-ID and Password have been successfully updated.
          </p>
          <button
            onClick={() => {
              setPhone("");
              setForm({ userid: "", password: "" });
              setStep("verify");
            }}
            className="w-full py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }
};

export default Forgot;

