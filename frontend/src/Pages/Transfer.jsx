import React, { useState } from "react";
import axios from "axios";

const Transfer = () => {
  const [stage, setStage] = useState("auth");
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState(0);

  // -------------------User-personal-details-fetched-from-backend--------------------
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  // ---------------------Load-Razorpay---------------------------
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // -----------------------Authenticate-User-------------------------------
  const handleAuth = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/transfer`, {
        userid,
        password,
        action: "auth",
      });

      setName(res.data.name);
      setBalance(res.data.balance);
      setEmail(res.data.email);
      setPhone(res.data.phone);

      setStage("options");
      setMessage("");
    } catch (err) {
      alert("❌ Invalid credentials!");
    }
  };

  // --------------------------Deposit-Money-using-Razorpay----------------------------
  const handleDepositPayment = async () => {
    if (!amount || Number(amount) <= 0) {
      alert("Enter valid amount");
      return;
    }
    const loaded = await loadRazorpayScript();
    if (!loaded) {
      alert("Razorpay failed to load");
      return;
    }

    try {
      const orderRes = await axios.post(`${import.meta.env.VITE_API_URL}/create_order`, {
        amount: Number(amount),
      });

      const { order_id, amount: orderAmount } = orderRes.data;

      const options = {
        key: import.meta.env.RAZORPAY_KEY_ID,
        amount: Number(orderAmount) * 100,
        currency: "INR",
        name: "Money Fintrack Secure Deposit",
        description:
          "A trusted, compliant, and encrypted payment flow for seamless financial operations.",
        order_id: order_id,

        prefill: {
          name: name,
          email: email,
          contact: phone,
        },

        notes: { userid: userid },

        theme: { color: "#1A73E8" },

        handler: async function (razorpayResponse) {
          try {
            const verifyRes = await axios.post(
              `${import.meta.env.VITE_API_URL}/verify_payment`,
              {
                razorpay_payment_id: razorpayResponse.razorpay_payment_id,
                razorpay_order_id: razorpayResponse.razorpay_order_id,
                razorpay_signature: razorpayResponse.razorpay_signature,
              }
            );

            if (verifyRes.data.success) {
              const updateRes = await axios.post(
                `${import.meta.env.VITE_API_URL}/transfer`,
                {
                  userid,
                  password,
                  action: "deposit",
                  amount: Number(amount),
                  payment_id: razorpayResponse.razorpay_payment_id,
                }
              );

              setBalance(updateRes.data.new_balance);
              setMessage(`₹${amount} deposited successfully!`);
              setAmount("");
              setStage("options");
            } else {
              alert("Payment signature invalid");
            }
          } catch (err) {
            alert("Payment verification failed");
          }
        },
      };

      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", function (response) {
        alert("Payment failed: " + response.error.description);
      });

      rzp.open();
    } catch (err) {
      alert("Order creation failed!");
    }
  };

  // -----------------------Withdraw-Section----------------------------
  const handleWithdraw = async () => {
    if (!amount || Number(amount) <= 0) {
      alert("Enter valid amount");
      return;
    }

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/transfer`, {
        userid,
        password,
        action: "withdraw",
        amount: Number(amount),
      });

      setBalance(res.data.new_balance);
      setMessage(`₹${amount} withdrawn successfully!`);
      setAmount("");
      setStage("options");
    } catch (err) {
      alert("Withdraw failed");
    }
  };

  // --------------------UserID-Password-Verification-------------------------
  if (stage === "auth") {
    return (
      <div className="flex items-center justify-center bg-gray-50 py-10">
        <div className="bg-amber-50 p-8 rounded-xl border border-amber-300 shadow-lg w-full max-w-4xl mx-auto">
          <h3 className="text-3xl font-extrabold mb-6 text-amber-800 text-center">
            💳 Authenticate to Transfer
          </h3>

          <form onSubmit={handleAuth} className="space-y-5 mx-auto">
            <input
              type="text"
              placeholder="Enter User ID"
              className="p-3 w-full border rounded-md focus:ring-2 focus:ring-amber-400"
              value={userid}
              onChange={(e) => setUserid(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Enter Password"
              className="p-3 w-full border rounded-md focus:ring-2 focus:ring-amber-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button className="w-full py-3 bg-amber-600 text-white font-semibold rounded-md hover:bg-amber-700">
              Authenticate
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (stage === "options") {
    return (
      <div className="flex items-center justify-center bg-gray-50 py-10">
        <div className="bg-amber-50 p-8 rounded-xl border border-amber-300 shadow-lg w-full max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-amber-800 mb-4">
            Welcome Back, {name}!
          </h2>

          <p className="text-xl text-gray-700 mb-6">
            Current Balance:{" "}
            <span className="font-bold text-amber-700">₹{balance}</span>
          </p>

          {message && (
            <p className="text-green-700 font-semibold mb-4">{message}</p>
          )}

          <div className="flex flex-col md:flex-row gap-4 justify-center mt-6">
            <button
              onClick={() => setStage("deposit")}
              className="flex-1 py-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 shadow"
            >
              Deposit Money (Razorpay)
            </button>

            <button
              onClick={() => setStage("withdraw")}
              className="flex-1 py-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 shadow"
            >
              Withdraw Money
            </button>
          </div>

          <button
            onClick={() => setStage("auth")}
            className="w-full mt-6 py-3 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 shadow"
          >
            Reset
          </button>
        </div>
      </div>
    );
  }
  // -------------------Deposite-Screen-Section----------------------------
  const isDeposit = stage === "deposit";

  return (
    <div className="flex items-center justify-center bg-gray-50 py-10">
      <div className="bg-amber-50 p-8 rounded-xl border border-amber-300 shadow-lg w-full max-w-4xl mx-auto">
        <h3 className="text-3xl font-extrabold mb-6 text-amber-800 text-center">
          {isDeposit ? "Deposit Money (Razorpay)" : "Withdraw Money"}
        </h3>

        <p className="text-center text-gray-700 mb-2 text-lg">Current Balance:</p>
        <p className="text-center text-3xl font-bold text-amber-700 mb-6">
          ₹{balance}
        </p>

        <div className="max-w-md mx-auto w-full space-y-5">
          <input
            type="number"
            placeholder="Enter amount"
            className="p-4 w-full border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-sm"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <button
            onClick={() => {
              if (isDeposit) handleDepositPayment();
              else handleWithdraw();
            }}
            className={`w-full py-4 rounded-lg text-white font-semibold shadow-lg transition ${isDeposit
                ? "bg-green-600 hover:bg-green-700"
                : "bg-red-600 hover:bg-red-700"
              }`}
          >
            {isDeposit ? "Pay & Deposit" : "Withdraw"}
          </button>
        </div>

        <button
          onClick={() => setStage("options")}
          className="w-full mt-6 py-3 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 shadow"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default Transfer;
