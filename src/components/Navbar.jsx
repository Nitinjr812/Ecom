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
                <div className="flex justify-between items-center rounded-xl 
                border border-white/10 
                bg-[#0f172a]/70 backdrop-blur-lg 
                px-5 py-3 shadow-lg">

                    {/* Logo */}
                    <h1
                        onClick={() => navigate("/")}
                        className="text-lg font-bold text-white cursor-pointer"
                    >
                        Ecom
                    </h1>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex gap-6">
                        {navItems.map((item, index) => (
                            <div key={index} className="relative group cursor-pointer">
                                <p className="text-gray-300 text-sm font-medium group-hover:text-white transition">
                                    {item}
                                </p>
                                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
                            </div>
                        ))}
                    </div>

                    {/* Right Section */}
                    <div className="hidden md:flex items-center gap-3">
                        {name ? (
                            <>
                                <span className="text-gray-300 text-sm">
                                    👋 Hi <span className="text-white font-semibold">{name}</span>
                                </span>

                                <button
                                    onClick={logout}
                                    className="px-3 py-1 text-xs rounded-md bg-red-500/80 hover:bg-red-600 text-white transition"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() => navigate("/auth")}
                                className="px-4 py-2 rounded-lg text-sm 
                                bg-blue-500/80 hover:bg-blue-600 text-white transition"
                            >
                                Sign Up
                            </button>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(true)}
                        className="md:hidden text-white"
                    >
                        <Menu size={24} />
                    </button>
                </div>
            </nav>

            {/* Overlay */}
            <div
                onClick={() => setIsOpen(false)}
                className={`fixed inset-0 bg-black/50 z-40 transition ${
                    isOpen ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
            ></div>

            {/* Mobile Sidebar */}
            <div
                className={`fixed top-0 right-0 h-screen w-[240px] z-50
                bg-[#020617] text-white p-5
                transition-transform duration-300
                ${isOpen ? "translate-x-0" : "translate-x-full"}`}
            >
                {/* Close */}
                <div className="flex justify-end">
                    <button onClick={() => setIsOpen(false)}>
                        <X size={24} />
                    </button>
                </div>

                {/* Menu */}
                <div className="mt-8 flex flex-col gap-6">
                    {navItems.map((item, index) => (
                        <div
                            key={index}
                            className="flex justify-between items-center border-b border-gray-700 pb-2 cursor-pointer"
                        >
                            <p className="text-gray-300">{item}</p>
                            <ChevronRight size={18} />
                        </div>
                    ))}

                    {/* Mobile User */}
                    {name ? (
                        <>
                            <p className="text-gray-400 mt-4">
                                👋 Hi <span className="text-white">{name}</span>
                            </p>
                            <button
                                onClick={logout}
                                className="mt-2 px-4 py-2 rounded-md bg-red-500"
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
                            className="mt-4 px-4 py-2 rounded-md bg-blue-500"
                        >
                            Sign Up
                        </button>
                    )}
                </div>
            </div>
            <Crousel/>
        </>
    );
};

export default Navbar;