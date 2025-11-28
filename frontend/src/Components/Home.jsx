import React, { useState } from 'react'
import video from '../assets/mainlogo.gif'
import Card from './Card'
import Pengune from '../assets/pengune.gif'
import truck from '../assets/truck1.gif'
import fincore from '../assets/Fincore.gif'
import suite from '../assets/Suite.webp'
import { useNavigate } from 'react-router-dom'
import back from '../assets/back5.gif'


const Home = () => {
  const navigate = useNavigate();
  const [play, setPlay] = useState(false);

  return (
    <div>

      {/* ---------------------------------main-Logo---------------------------------- */}
      <div style={{ backgroundImage: `url(${back})` }} className='text-center bg-gray-100 pl-10 pr-10 space-y-5 pb-20 pt-5'>
        <h1 className=' text-5xl font-extrabold leading-tight'>Money Fintrack. Banking Made Smart.</h1>
        <h2 className='text-xl pb-3'>Introducing the world’s first AI-powered Banking Platform that tells a story of trust.</h2>
        <button onClick={() => navigate("/learn")} className='bg-blue-600 px-4 py-2 cursor-pointer rounded-sm text-white font-semibold text-xl hover:bg-blue-700 shadow-[0px_0px_10px] shadow-gray-500'>Learn More →</button>
        <div className='flex justify-center gap-1 items-center'>
          <img className='w-170' src={video} alt='Logo' />
        </div>

        <div className='p-10 flex gap-10 flex-wrap justify-center pb-20'>
          <Card user="Introducing the Fintech Lab" name="Move from experimentation to execution fast, with our AI experts" />
          <Card user="Introducing the Smart Fintrack Suite" name="Unify sales and servicing journeys for efficiency & growth" />
          <Card user="Introducing the Fintrack Intelligence Core" name="Unify data and AI for smarter operations" />
        </div>


        <h1 className=' text-5xl font-extrabold leading-tight'>Unleash the power of AI – starting now</h1>
        <h2 className='text-xl'>The next growth curve belongs to banks that put intelligence at their core. </h2>
        <h2 className='text-xl pb-5'>Move from legacy tech that handcuffs your ambitions, to a nimble, AI-powered Banking Platform that sets you free.</h2>

        <div className='text-center flex justify-center'>
          {!play ? (
            <button
              className="bg-blue-600 px-4 py-2 cursor-pointer rounded-sm text-white font-semibold text-xl hover:bg-blue-700 shadow-[0px_0px_10px] shadow-gray-500"
              onClick={() => setPlay(true)}
            >
              Watch new manifesto video →
            </button>
          ) : (
            <div className="w-full max-w-3xl">
              <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
                  src="https://www.youtube.com/embed/OyokCk5y7wU?autoplay=1"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
              </div>
            </div>
          )}
        </div>

      </div>
      {/* --------------------------------more-information-------------------------------- */}

      <div className='flex justify-center gap-15 pt-5 items-center flex-wrap'>
        <div className='w-full lg:w-1/2 flex justify-center'>
          <img className='h-72 sm:h-96 object-contain' src={Pengune} alt='future' />
        </div>
        <div className='w-160 space-y-5 p-5'>
          <h3 className='bg-blue-600 w-fit px-4 text-center font-semibold py-1 rounded-4xl text-white text-sm '>AI-POWERED BANKING PLATFORM</h3>
          <h1 className=' text-2xl font-extrabold leading-tight'>The Future of Banking is Fintrack</h1>
          <h2 className='text-lg'>The AI-powered Money Fintrack Platform gives you a smarter way to manage and grow your banking system — unlocking new revenue opportunities, improving efficiency, and transforming traditional operations into a modern, unified financial experience.</h2>
          <h2 className='text-lg'>With seamless integration, intelligent automation, and a complete digital suite for every banking function, you’re not adapting the old system — you’re building the next generation of banking.</h2>
          <h2 className='text-lg'>Lead the future of finance with a platform designed for performance, trust, and remarkable growth — and discover what’s possible when every transaction works as one.</h2>
          <h2 onClick={() => { window.scrollTo(0, 0); navigate("/learn"); }} className='text-blue-600 text-lg font-bold cursor-pointer hover:text-blue-700'>Explore Money Fintrack →</h2>
        </div>
      </div>

      <div className='flex justify-center gap-15 pt-5 items-center flex-wrap-reverse'>
        <div className='w-160 space-y-5 p-5'>
          <h3 className='bg-blue-600 w-fit px-4 text-center font-semibold py-1 rounded-4xl text-white text-sm '>FINTECH LAB</h3>
          <h1 className=' text-2xl font-extrabold leading-tight'>The platform is just the beginning — our innovators make it powerful.</h1>
          <h2 className='text-lg'>Digital transformation demands more than tools — it needs expertise.That’s why we built the Fintech Lab, an integrated innovation center within Money Fintrack, designed to bridge the gap between technology and real-world banking needs.</h2>
          <h2 className='text-lg'>By connecting our fintech specialists directly with your teams, banks can rapidly co-create impactful financial solutions, drive smarter operations, and turn ideas into action — with speed, trust, and precision.</h2>
          <h2 className='text-blue-600 text-lg font-bold cursor-pointer hover:text-blue-700'>Explore the Fintech Lab →</h2>
        </div>
        <div className='w-full lg:w-1/2 flex justify-center'>
          <img className='h-72 sm:h-96 object-contain' src={truck} alt='future' />
        </div>
      </div>

      <div className='flex justify-center gap-15 pt-5 items-center flex-wrap'>
        <div className='w-full lg:w-1/2 flex justify-center'>
          <img className='h-72 sm:h-96 object-contain' src={suite} alt='future' />
        </div>
        <div className='w-160 space-y-5 p-5'>
          <h3 className='bg-blue-600 w-fit px-4 text-center font-semibold py-1 rounded-4xl text-white text-sm '>THE SMART FINTRACK SUITE</h3>
          <h1 className=' text-2xl font-extrabold leading-tight'>The intelligent banking suite engineered for innovation.</h1>
          <h2 className='text-lg'>Transform your financial operations with the Smart Fintrack Suite — where data, automation, and digital intelligence unite to power a seamless banking experience.</h2>
          <h2 className='text-lg'>Simplify workflows, strengthen security, and accelerate growth across every branch, client, and transaction — all within one connected ecosystem built for the future of banking.</h2>
          <h2 className='text-blue-600 text-lg font-bold cursor-pointer hover:text-blue-700'>Explore the Fintrack Suite →</h2>
        </div>
      </div>

      <div className='flex justify-center gap-20 pt-5 items-center flex-wrap-reverse'>
        <div className='w-160 space-y-5 p-5'>
          <h3 className='bg-blue-600 w-fit px-4 text-center font-semibold py-1 rounded-4xl text-white text-sm '>SOLUTIONS WE POWER</h3>
          <h1 className=' text-2xl font-extrabold leading-tight'>Explore our solutions for every financial sector</h1>
          <h2 className='text-lg'>Revolutionize every banking operation — from Retail and SMB to Enterprise and Digital Banking — with a platform engineered to optimize performance, boost customer trust, and accelerate revenue growth.</h2>
          <h2 className='text-lg'>Scale stronger client relationships with AI-powered modules, personalized dashboards, and real-time insights that help financial teams deliver smarter services with confidence.</h2>
          <h2 className='text-lg'>Deliver accuracy and innovation at scale — the right solution, at the right time, every time.</h2>
          <h2 className='text-blue-600 text-lg font-bold cursor-pointer hover:text-blue-700'>Explore the Solutions →</h2>
        </div>
        <div className='w-full lg:w-1/2 flex justify-center'>
          <img className='h-72 sm:h-110 object-contain' src={fincore} alt='future' />
        </div>
      </div>
      {/* ------------------------Elevate-Section--------------------------- */}
      <div className="text-center text-white bg-slate-800 py-20 px-5 sm:px-10 space-y-6">
        <div className="max-w-5xl mx-auto space-y-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">Ready to elevate your banking experience?</h1>
          <h2 className="text-lg sm:text-xl md:text-2xl pb-3">We’re excited to connect and show you how Money Fintrack is redefining the future of finance — smarter, faster, and more secure than ever before.</h2>
          <button onClick={() => {
            window.scrollTo(0, 0);
            navigate("/account");
          }}
            className="bg-cyan-300 text-black w-full sm:w-auto px-6 py-3 cursor-pointer rounded-sm font-semibold text-lg sm:text-xl hover:bg-cyan-400 shadow-[0px_0px_10px] shadow-gray-500 transition">Start Your Fintrack Journey →</button>
        </div>
      </div>

    </div>
  )
}

export default Home
