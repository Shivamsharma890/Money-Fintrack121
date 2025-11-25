import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/logo1.png";
import { FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const active = (path) =>
    location.pathname === path
      ? "px-3 py-2 rounded-xl bg-amber-500 text-black shadow-lg scale-105 transition-all"
      : "px-3 py-2 rounded-xl text-white hover:bg-amber-600 hover:scale-105 hover:shadow-md transition-all duration-300";

  return (
    <div className="w-full px-6 py-3 bg-slate-900 text-white flex justify-between items-center shadow-xl sticky top-0 z-50 backdrop-blur-lg bg-opacity-90">

      {/* ------------------------------Logo ----------------------------------*/}
      <div className="flex items-center gap-2">
        <img
          src={Logo}
          alt="logo"
          className="h-14 w-28 transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* ------------------------------Desktop Menu----------------------------- */}
      <div className="hidden md:flex items-center gap-6 font-semibold">

        <Link className={active("/")} to="/">Dashboard</Link>
        <Link className={active("/tranfer")} to="/tranfer">Fund Transfer</Link>
        <Link className={active("/balance")} to="/balance">Balance Overview</Link>
        <Link className={active("/Delete")} to="/Delete">Close Account</Link>
        <Link className={active("/edit")} to="/edit">Manage Account</Link>
        <Link className={active("/forget")} to="/forget">Password Recovery</Link>
        <Link className={active("/login")} to="/login">Sign In</Link>
        <Link className={active("/account")} to="/account">Account Registration</Link>

      </div>

      {/* --------------------------------Mobile Menu------------------------------- */}
      <div
        className="md:hidden text-3xl cursor-pointer transition-all active:scale-90 hover:text-amber-400"
        onClick={() => setOpen(!open)}
      >
        {open ? <FaTimes /> : <FaBars />}
      </div>

      {open && (
        <div className="absolute top-20 right-4 w-64 bg-slate-800 border border-gray-700 rounded-2xl shadow-2xl p-5 flex flex-col gap-4 md:hidden animate-slideDown">

          <Link className={active("/")} to="/" onClick={() => setOpen(false)}>Dashboard</Link>
          <Link className={active("/tranfer")} to="/tranfer" onClick={() => setOpen(false)}>Fund Transfer</Link>
          <Link className={active("/balance")} to="/balance" onClick={() => setOpen(false)}>Balance Overview</Link>
          <Link className={active("/Delete")} to="/Delete" onClick={() => setOpen(false)}>Close Account</Link>
          <Link className={active("/edit")} to="/edit" onClick={() => setOpen(false)}>Manage Account</Link>
          <Link className={active("/forget")} to="/forget" onClick={() => setOpen(false)}>Password Recovery</Link>
          <Link className={active("/login")} to="/login" onClick={() => setOpen(false)}>Sign In</Link>
          <Link className={active("/account")} to="/account" onClick={() => setOpen(false)}>Account Registration</Link>

        </div>
      )}
    </div>
  );
};

export default Header;
