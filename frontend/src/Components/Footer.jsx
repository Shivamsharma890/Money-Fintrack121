import React from 'react'
import Logo from '../assets/logo1.png'
import Face from '../assets/face.png'
import Linkd from '../assets/linkd.png'
import Insta from '../assets/insta.jpg'
import You from '../assets/you.jpg'

const Footer = () => {
    return (
        <div className="bg-slate-800">
            <div className="bg-gray-100 p-6 sm:p-10 md:p-14 rounded-tr-[180px] rounded-bl-[160px]">

                {/* ---------------------------Logo + Social-------------------------- */}
                <div className="flex flex-col md:flex-row flex-wrap items-center justify-between gap-6 md:gap-0 px-6 sm:px-10">
                    <img className="h-16 w-auto bg-slate-800 p-2 rounded" src={Logo} alt="Logo" />

                    <div className="flex items-center flex-wrap gap-3">
                        <h2 className="text-gray-500 text-lg font-bold">Follow us</h2>
                        <img className="h-8 rounded cursor-pointer hover:scale-105" src={Linkd} alt="LinkedIn" />
                        <img className="h-8 rounded cursor-pointer hover:scale-105" src={Face} alt="Facebook" />
                        <img className="h-8 rounded cursor-pointer hover:scale-105" src={Insta} alt="Instagram" />
                        <img className="h-8 rounded cursor-pointer hover:scale-105" src={You} alt="YouTube" />
                    </div>
                </div>

                {/* ---------------------------Main Links Section--------------------------- */}
                <div className="flex flex-wrap gap-10 lg:gap-20 pt-10 text-center justify-center md:text-left">

                    {/* Segments */}
                    <div>
                        <h2 className="text-2xl font-semibold pb-3">Segments</h2>
                        <h2 className="cursor-pointer hover:underline">Retail banking</h2>
                        <h2 className="cursor-pointer hover:underline">Small business banking</h2>
                        <h2 className="cursor-pointer hover:underline">Commercial banking</h2>
                        <h2 className="cursor-pointer hover:underline">Private banking</h2>
                        <h2 className="cursor-pointer hover:underline">Wealth management</h2>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold pb-3">Solutions</h2>
                        <h2 className="cursor-pointer hover:underline">Fintrack suite</h2>
                        <h2 className="cursor-pointer hover:underline">Grow sales</h2>
                        <h2 className="cursor-pointer hover:underline">Service customers</h2>
                        <h2 className="cursor-pointer hover:underline">Modernization</h2>
                        <h2 className="cursor-pointer hover:underline">AI transformation</h2>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold pb-3">Platform</h2>
                        <h2 className="cursor-pointer hover:underline">Banking Platform</h2>
                        <h2 className="cursor-pointer hover:underline">Digital Banking fabric</h2>
                        <h2 className="cursor-pointer hover:underline">Intelligence fabric</h2>
                        <h2 className="cursor-pointer hover:underline">Integration fabric</h2>
                        <h2 className="cursor-pointer hover:underline">Marketplace</h2>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold pb-3">Services</h2>
                        <h2 className="cursor-pointer hover:underline">Managed hosting</h2>
                        <h2 className="cursor-pointer hover:underline">Managed services</h2>
                        <h2 className="cursor-pointer hover:underline">Implementation services</h2>
                        <h2 className="cursor-pointer hover:underline">Value consulting</h2>
                        <h2 className="cursor-pointer hover:underline">Training services</h2>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold pb-3">Insights</h2>
                        <h2 className="cursor-pointer hover:underline">Blog</h2>
                        <h2 className="cursor-pointer hover:underline">Events</h2>
                        <h2 className="cursor-pointer hover:underline">Guides</h2>
                        <h2 className="cursor-pointer hover:underline">Podcasts</h2>
                        <h2 className="cursor-pointer hover:underline">Reports</h2>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold pb-3">Company</h2>
                        <h2 className="cursor-pointer hover:underline">About Backbase</h2>
                        <h2 className="cursor-pointer hover:underline">Press and media</h2>
                        <h2 className="cursor-pointer hover:underline">Careers</h2>
                        <h2 className="cursor-pointer hover:underline">Social responsibility</h2>
                        <h2 className="cursor-pointer hover:underline">Contact</h2>
                    </div>

                </div>

                {/* ----------------------------Footer Bottom--------------------------------- */}
                <div className="flex flex-col items-center justify-center gap-6 pt-10">

                    <div className="flex flex-wrap justify-center gap-4 text-center">
                        <h2 className="hover:underline cursor-pointer">Terms & Legal</h2>
                        <h2 className="hover:underline cursor-pointer">Privacy policy</h2>
                        <h2 className="hover:underline cursor-pointer">Modern slavery statement</h2>
                    </div>

                    <h2 className="font-semibold text-center">© Money Fintrack | All rights reserved.</h2>

                    <div className="flex items-center gap-2">
                        <h1>Global:</h1>
                        <select className="border rounded p-1 cursor-pointer">
                            <option>(global) English</option>
                            <option>Arabic</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
