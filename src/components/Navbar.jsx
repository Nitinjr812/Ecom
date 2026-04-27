import React, { useState, useEffect } from "react";
import { Menu, X, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Crousel from "./Crousel";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState("");

    const navigate = useNavigate();
    const navItems = ["Home", "About", "Products", "Cart"];

    const getoken = () => {
        const exist = JSON.parse(localStorage.getItem("userdata")) || [];
        const token = JSON.parse(localStorage.getItem("token"));

        if (token && exist.length > 0) {
            setName(exist[0].name);
        }
    };

    const logout = () => {
        localStorage.removeItem("userdata");
        localStorage.removeItem("token");
        setName("");
        navigate("/auth");
    };

    useEffect(() => {
        getoken();
    }, []);

    return (
        <>
            {/* Navbar */}
            <nav className="fixed top-0 left-0 w-full z-50 px-4 py-3">
                <div className="flex justify-between items-center rounded-2xl 
                border border-white/10 
                bg-gradient-to-r from-[#0f172a]/80 via-[#020617]/80 to-[#0f172a]/80
                backdrop-blur-xl 
                px-6 py-3 shadow-[0_0_20px_rgba(59,130,246,0.2)]">

                    {/* Logo */}
                    <h1
                        onClick={() => navigate("/")}
                        className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent cursor-pointer"
                    >
                        Ecom
                    </h1>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex gap-8">
                        {navItems.map((item, index) => (
                            <div key={index} className="relative group cursor-pointer">
                                <p className="text-gray-300 text-sm font-medium group-hover:text-white transition">
                                    {item}
                                </p>

                                {/* Animated underline */}
                                <span className="absolute left-0 -bottom-1 w-0 h-[2px] 
                                bg-gradient-to-r from-blue-400 to-purple-500 
                                transition-all duration-300 group-hover:w-full"></span>
                            </div>
                        ))}
                    </div>

                    {/* Right Section */}
                    <div className="hidden md:flex items-center gap-4">
                        {name ? (
                            <>
                                <span className="text-gray-300 text-sm">
                                    👋 Hi <span className="text-white font-semibold">{name}</span>
                                </span>

                                <button
                                    onClick={logout}
                                    className="px-3 py-1 text-xs rounded-md 
                                    bg-red-500/80 hover:bg-red-600 
                                    shadow-md hover:shadow-red-500/30
                                    transition"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() => navigate("/auth")}
                                className="px-4 py-2 rounded-lg text-sm 
                                bg-gradient-to-r from-blue-500 to-purple-500 
                                hover:scale-105 transition transform shadow-lg"
                            >
                                Sign Up
                            </button>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(true)}
                        className="md:hidden text-white hover:scale-110 transition"
                    >
                        <Menu size={26} />
                    </button>
                </div>
            </nav>

            {/* Overlay */}
            <div
                onClick={() => setIsOpen(false)}
                className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition ${
                    isOpen ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
            ></div>

            {/* Mobile Sidebar */}
            <div
                className={`fixed top-0 right-0 h-screen w-[260px] z-50
                bg-gradient-to-b from-[#020617] to-[#0f172a]
                text-white p-6
                transition-transform duration-300
                shadow-[-10px_0_30px_rgba(0,0,0,0.6)]
                ${isOpen ? "translate-x-0" : "translate-x-full"}`}
            >
                {/* Close */}
                <div className="flex justify-end">
                    <button onClick={() => setIsOpen(false)}>
                        <X size={26} />
                    </button>
                </div>

                {/* Menu */}
                <div className="mt-10 flex flex-col gap-6">
                    {navItems.map((item, index) => (
                        <div
                            key={index}
                            className="flex justify-between items-center 
                            border-b border-gray-700 pb-3 
                            cursor-pointer group"
                        >
                            <p className="text-gray-300 group-hover:text-white transition">
                                {item}
                            </p>
                            <ChevronRight className="group-hover:translate-x-1 transition" size={18} />
                        </div>
                    ))}

                    {/* Mobile User */}
                    {name ? (
                        <>
                            <p className="text-gray-400 mt-6">
                                👋 Hi <span className="text-white">{name}</span>
                            </p>
                            <button
                                onClick={logout}
                                className="mt-3 px-4 py-2 rounded-md 
                                bg-red-500 hover:bg-red-600 transition"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => {
                                setIsOpen(false);
                                navigate("/auth");
                            }}
                            className="mt-6 px-4 py-2 rounded-md 
                            bg-gradient-to-r from-blue-500 to-purple-500"
                        >
                            Sign Up
                        </button>
                    )}
                </div>
            </div>

            <Crousel />
        </>
    );
};

export default Navbar;