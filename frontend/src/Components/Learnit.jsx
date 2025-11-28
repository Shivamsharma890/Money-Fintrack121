import React from 'react'
import Pengune from '../assets/pengune.gif'
import bank from '../assets/banking.gif'
import ecosystem from '../assets/eco.gif'
import back from '../assets/back5.gif'
import { useNavigate } from 'react-router-dom'

const Learnit = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* --------------------------------Intelligence-Platform-Section--------------------------------- */}
      <div style={{ backgroundImage: `url(${back})` }} className=" bg-center px-6 py-10 md:px-12 lg:px-20 w-full">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10">
          <div className="w-full lg:w-1/2 space-y-5">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-snug">
              Fintrack Intelligent Finance Platform
            </h1>

            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold">
              The next-generation foundation for digital banking excellence
            </h2>

            <p className="text-base sm:text-lg lg:text-xl text-gray-800 leading-relaxed">
              The financial world is evolving faster than ever — and innovation is no longer optional, it’s essential.
              Money Fintrack is your intelligent finance platform, designed to unify banking, analytics, and automation into one seamless ecosystem.
              Built to eliminate outdated processes and ignite smarter growth, Fintrack empowers institutions to deliver real-time insights, personalized
              services, and dynamic customer experiences. Step into the future of banking — where every transaction is intelligent, every decision is data-driven,
              and your bank stays ahead of change.
            </p>

            <button
              onClick={() => navigate("/account")}
              className="bg-blue-600 px-6 py-3 rounded-md text-white font-semibold text-lg sm:text-xl 
                   hover:bg-blue-700 shadow-lg transition"
            >
              Start Your Fintrack Journey →
            </button>
          </div>

          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
            <img
              src={Pengune}
              alt="future"
              className="h-72 sm:h-96 object-contain"
            />
          </div>

        </div>
      </div>
      {/* ------------------------------Future-Information----------------------------------- */}
      <div className=' p-15 space-y-7'>
        <h1 className=' text-4xl font-extrabold leading-tight'>Legacy limits progress. Fintrack accelerates your future.</h1>
        <h2 className='text-lg'>In today’s AI-powered era, traditional banking systems don’t just slow you down — they block your path to true innovation.
          Money Fintrack is the next-gen platform designed to replace outdated, rigid systems with an intelligent, modular foundation that empowers speed, scalability, and customer-first experiences.</h2>

        <div className='flex gap-x-22 gap-y-5 flex-wrap'>
          <div className=' w-100 space-y-1 p-2'>
            <h2 className='font-bold text-[6.7vmin] text-red-500'>72%</h2>
            <h3 className='text-lg'>of financial institutions still rely on legacy infrastructure that hinders data integration and agility.</h3>
          </div>

          <div className=' w-100 space-y-1 p-2'>
            <h2 className='font-bold text-[6.7vmin] text-red-500'>$1.1 billion</h2>
            <h3 className='text-lg'>in operational costs can be saved by banks adopting AI-driven automation by 2030.</h3>
          </div>

          <div className=' w-100 space-y-1 p-2'>
            <h2 className='font-bold text-[6.7vmin] text-red-500'>46% </h2>
            <h3 className='text-lg'>of digital banking systems plan to migrate to intelligent FinTech platforms within the next 3 years.</h3>
          </div>
        </div>
      </div>

      <div className='flex justify-center gap-x-50 bg-gray-100 items-center flex-wrap'>
        <div className='w-140 space-y-6 p-5'>
          <h1 className=' text-4xl font-extrabold leading-tight'>Unified Smart Banking Ecosystem</h1>
          <h2 className='text-lg'>Money Fintrack powers every stage of your financial journey — from account creation to customer engagement, retention, and intelligent growth.
            Our AI-driven platform removes data silos, connects teams and systems, and delivers seamless digital experiences across channels.</h2>
        </div>
        <div className='flex justify-center'>
          <img className='object-contain' src={bank} alt='future' />
        </div>
      </div>

      {/* ----------------------------Architecture-Section------------------------------- */}
      <div className='pt-15 pl-15 pr-15'>
        <h1 className=' text-4xl font-extrabold leading-tight'>The Architecture of Financial Intelligence</h1>
        <h2 className='text-lg'>Money Fintrack’s AI-driven Banking Platform is built to empower every aspect of digital finance — enabling banks and users to make smarter decisions,
          automate insights, and integrate seamlessly across all financial systems with speed, security, and intelligence.</h2>
      </div>

      <div className='flex justify-center gap-x-50 items-center flex-wrap'>
        <div className='w-140 space-y-6 p-5'>
          <h1 className=' text-4xl leading-tight'>Engagement</h1>
          <h1 className=' text-xl leading-tight font-bold'>Evolve Smarter. Grow Boundlessly.</h1>
          <h2 className='text-lg'>Transform your banking architecture with agility — preserving what matters while eliminating complexity and outdated systems.
            Money Fintrack unifies your entire customer experience across devices — mobile, web, and branches — with a smart AI-first platform that adapts to your
            business pace.Deliver personalized journeys that inspire trust, strengthen loyalty, and accelerate sustainable financial growth.</h2>
        </div>
        <div className='flex justify-center'>
          <img className=' object-contain' src={ecosystem} alt='future' />
        </div>
      </div>

      {/* -------------------------------Digital-Future-Section------------------------------------ */}
      <div className="text-center text-white bg-slate-800 px-6 py-16 sm:px-10 md:px-20 space-y-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">Ready to power your digital future?</h1>
        <h2 className="text-base sm:text-lg md:text-xl pb-3 max-w-3xl mx-auto">We’re excited to connect and show you how Money Fintrack is redefining the future of finance — smarter, faster, and more secure than ever before.</h2>
        <button
          onClick={() => {
            window.scrollTo(0, 0);
            navigate("/account");
          }}
          className="bg-cyan-300 text-black px-6 py-3 rounded-sm font-semibold text-lg sm:text-xl hover:bg-cyan-400 shadow-[0px_0px_10px] shadow-gray-500 transition-all">Start Smarter with Fintrack →</button>
      </div>

    </div>
  )
}

export default Learnit
