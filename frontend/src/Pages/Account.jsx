import React, { useState } from 'react';
import axios from "axios";

const Account = () => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    address: "",
    age: "",
    work_email: "",
    userid: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/account`,
        form,
        {
          headers: { "Content-Type": "application/json" }
        }
      );
      alert(res.data.message);

      window.location.reload();
    } catch (err) {
      alert("Error saving account: " + err.message);
    }
  };

  // ----------------------Password-confirmation-logic----------------------------
  const handleConfirmChange = (e) => {
    const value = e.target.value;
    setConfirm(value);

    if (value === "") {
      setMessage("");
    } else if (value === password && value !== "") {
      setMessage("✅ Passwords match");
    } else if (value !== "") {
      setMessage("❌ Passwords do not match");
    }

  };

  // -------------------Contact-number-validation (only numbers)--------------------
  const handleContactChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setContact(value);


      setForm({ ...form, phone: value });
    }
  };


  return (
    <div className='min-h-screen p-6 pb-10 md:p-8'>

      <div className='flex flex-col lg:flex-row max-w-8xl mx-auto gap-12 lg:gap-20'>

        {/* -----------------------Theory-Container---------------------------- */}
        <div className='lg:w-8/12 space-y-6 md:pt-16 md:p-4'>
          <h1 className='text-3xl md:text-4xl font-extrabold leading-tight text-gray-900'>
            💰 Ready to take control of your finances? Create your Fintrack account today.
          </h1>
          <h2 className='text-lg md:text-xl font-semibold text-gray-700'>
            Join Money Fintrack and experience the smarter way to manage your money. Our AI-powered platform helps you
            track expenses, grow savings, and make intelligent financial decisions — all from one seamless dashboard.
          </h2>

          <div className='space-y-3 text-gray-600'>
            <p className='text-base md:text-lg flex items-start'>
              <span className="text-blue-500 mr-2 mt-1">&#10003;</span> Get real-time insights into your spending and saving patterns.
            </p>
            <p className='text-base md:text-lg flex items-start'>
              <span className="text-blue-500 mr-2 mt-1">&#10003;</span> Unlock personalized finance goals and recommendations powered by AI.
            </p>
            <p className='text-base md:text-lg flex items-start'>
              <span className="text-blue-500 mr-2 mt-1">&#10003;</span> Experience secure, fast, and user-friendly banking at your fingertips.
            </p>
          </div>

          <p className='text-base md:text-lg italic text-gray-600'>
            Our promise: Creating your Fintrack account is just the beginning of your smarter money journey.
            With every login, you’ll gain clarity, control, and confidence in your financial future.
          </p>
        </div>

        {/* --------------------------Registration-Form-Section------------------------- */}
        <form onSubmit={handleSubmit} className='lg:w-9/12 space-y-6 md:p-8'>

          <div className='text-base md:text-xl w-full font-bold p-3 rounded-lg transition-colors duration-300'></div>

          {/* --------------------------Name-Inputs-------------------------- */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
            <div>
              <label htmlFor="firstName" className='text-lg font-medium text-gray-700 mb-1 block'>First Name*</label>
              <input
                id="firstName"
                className='bg-gray-100 p-3 h-12 w-full text-base text-gray-900 rounded-lg placeholder-gray-400 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150'
                type='text'
                name="first_name"
                placeholder="First Name"
                value={form.first_name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="lastName" className='text-lg font-medium text-gray-700 mb-1 block'>Last Name*</label>
              <input
                id="lastName"
                className='bg-gray-100 p-3 h-12 w-full text-base text-gray-900 rounded-lg placeholder-gray-400 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150'
                type='text'
                name="last_name"
                placeholder="Last Name"
                value={form.last_name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* --------------------Age-and-Email----------------------- */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
            <div>
              <label htmlFor="age" className='text-lg font-medium text-gray-700 mb-1 block'>Age*</label>
              <input
                id="age"
                className='bg-gray-100 p-3 h-12 w-full text-base text-gray-900 rounded-lg placeholder-gray-400 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150'
                type='number'
                name="age"
                value={form.age}
                onChange={handleChange}
                min="18"
                max="100"
                placeholder='Enter your age (18+)'
                required
              />
            </div>

            <div>
              <label htmlFor="email" className='text-lg font-medium text-gray-700 mb-1 block'>Work Email*</label>
              <input
                id="email"
                className='bg-gray-100 p-3 h-12 w-full text-base text-gray-900 rounded-lg placeholder-gray-400 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150'
                type='email'
                name="work_email"
                value={form.work_email}
                onChange={handleChange}
                placeholder='Enter your email'
                required
              />
            </div>
          </div>

          {/* ---------------------------Phone-and-Address---------------------------*/}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
            <div>
              <label htmlFor="contact" className='text-lg font-medium text-gray-700 mb-1 block'>Phone Number*</label>
              <input
                id="contact"
                className='bg-gray-100 p-3 h-12 w-full text-base text-gray-900 rounded-lg placeholder-gray-400 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150'
                value={contact}
                onChange={handleContactChange}
                type='text'
                name="phone"
                inputMode='numeric'
                maxLength="10"
                placeholder='Enter contact number'
                required
              />
            </div>
            <div>
              <label htmlFor="address" className='text-lg font-medium text-gray-700 mb-1 block'>Address*</label>
              <input
                id="address"
                className='bg-gray-100 p-3 h-12 w-full text-base text-gray-900 rounded-lg placeholder-gray-400 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150'
                type='text'
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder='Enter full address'
                required
              />
            </div>
          </div>

          {/* ---------------------User ID-and-Passwords----------------------- */}
          <div className='space-y-5'>
            <div>
              <label htmlFor="userID" className='text-lg font-medium text-gray-700 mb-1 block'>User-ID*</label>
              <input
                id="userID"
                className='bg-gray-100 p-3 h-12 w-full text-base text-gray-900 rounded-lg placeholder-gray-400 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150'
                type='text'
                name="userid"
                value={form.userid}
                onChange={handleChange}
                placeholder='Enter user ID'
                required
              />
            </div>

            <div>
              <label htmlFor="password" className='text-lg font-medium text-gray-700 mb-1 block'>Password*</label>
              <input
                id="password"
                className='bg-gray-100 p-3 h-12 w-full text-base text-gray-900 rounded-lg placeholder-gray-400 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150'
                type='password'
                name="password"
                value={form.password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  handleChange(e);
                }}
                placeholder='Enter password'
                required
              />
            </div>

            <div>
              <label htmlFor="confirm" className='text-lg font-medium text-gray-700 mb-1 block'>Confirm Password*</label>
              <input
                id="confirm"
                value={confirm}
                onChange={handleConfirmChange}
                className='bg-gray-100 p-3 h-12 w-full text-base text-gray-900 rounded-lg placeholder-gray-400 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150'
                type='password'
                placeholder='Confirm password'
                required
              />
              <p className={`mt-2 text-sm font-medium ${message.includes("✅") ? "text-green-600" : "text-red-600"}`}>{message}</p>
            </div>
          </div>

          {/* ----------------------Checkbox-Policy------------------------- */}
          <div className='flex items-start gap-x-3'>
            <input
              id="agree-updates"
              className='mt-1.5 h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer'
              type='checkbox'
              required
            />
            <label htmlFor="agree-updates" className="text-gray-700 text-sm cursor-pointer leading-relaxed">
              Get the latest from Money Fintrack: insights, updates, and smart financial tools to help you manage your money better.
            </label>
          </div>

          <div className='flex items-start gap-x-3'>
            <input
              id="agree-policy"
              className='mt-1.5 h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer'
              type='checkbox'
              required
            />
            <label htmlFor="agree-policy" className="text-gray-700 text-sm cursor-pointer leading-relaxed">
              Yes, I agree to be contacted by Money Fintrack. I understand my information will be kept private and used only to provide secure and personalized banking experiences, as described in the Money Fintrack Privacy Policy.*
            </label>
          </div>

          {/* -----------------------------Submit-Button-------------------------------- */}
          <div>
            <button type="submit" className='bg-blue-600 px-6 py-3 cursor-pointer rounded-lg text-white font-bold text-xl hover:bg-blue-700 shadow-lg transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed' >Submit</button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default Account;
