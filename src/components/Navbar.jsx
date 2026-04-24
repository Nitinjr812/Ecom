import React, { useState } from "react";
import { Menu, X, ChevronRight } from "lucide-react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);

    const navItems = ["Home", "About", "Products", "More"];
    const minSwipeDistance = 50;

    // Swipe Start
    const onTouchStart = (e) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    // Swipe Move
    const onTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    // Swipe End
    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;

        // Right to Left swipe = open sidebar
        if (distance > minSwipeDistance) {
            setIsOpen(true);
        }
    };

    return (
        <div
            className="min-h-screen bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#111827]"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
        >
            {/* Navbar */}
            <nav className="fixed top-0 left-0 w-full z-50 px-4 py-3">
                <div className="flex justify-between items-center rounded-xl border border-white/20 bg-white/10 backdrop-blur-md px-5 py-3 shadow-md">

                    {/* Logo */}
                    <h1 className="text-lg font-bold text-white cursor-pointer">
                        Ecom
                    </h1>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex gap-6">
                        {navItems.map((item, index) => (
                            <div
                                key={index}
                                className="relative group cursor-pointer"
                            >
                                <p className="text-white text-sm font-medium">
                                    {item}
                                </p>

                                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
                            </div>
                        ))}
                    </div>

                    {/* Desktop Button */}
                    <button
                        className="
                            hidden md:block
                            px-4 py-2 rounded-lg
                            text-sm font-medium text-white
                            border border-white/30
                            bg-white/10 backdrop-blur-md
                            hover:shadow-[0_0_15px_rgba(255,255,255,0.4)]
                            transition-all duration-300
                        "
                    >
                        Sign Up
                    </button>

                    {/* Mobile Hamburger */}
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
                className={`fixed inset-0 bg-black/40 z-40 transition-all duration-300 md:hidden ${
                    isOpen
                        ? "opacity-100 visible"
                        : "opacity-0 invisible"
                }`}
            ></div>

            {/* Mobile Sidebar Slider */}
            <div
                className={`fixed top-0 right-0 h-screen w-[240px] z-50
                bg-[#111827] text-white p-5
                transition-all duration-300 md:hidden
                ${
                    isOpen
                        ? "translate-x-0"
                        : "translate-x-full"
                }`}
            >
                {/* Close Button */}
                <div className="flex justify-end">
                    <button onClick={() => setIsOpen(false)}>
                        <X size={24} />
                    </button>
                </div>

                {/* Sidebar Menu */}
                <div className="mt-8 flex flex-col gap-6">
                    {navItems.map((item, index) => (
                        <div
                            key={index}
                            className="flex justify-between items-center cursor-pointer border-b border-white/10 pb-2"
                        >
                            <p>{item}</p>
                            <ChevronRight size={18} />
                        </div>
                    ))}

                    {/* Glow Button */}
                    <button
                        className="
                            mt-4
                            px-4 py-2 rounded-lg
                            border border-white/20
                            bg-white/10
                            hover:shadow-[0_0_15px_rgba(255,255,255,0.4)]
                            transition-all duration-300
                        "
                    >
                        Sign Up
                    </button>
                </div>
            </div>

            {/* Dummy Home Section */}
            <div className="pt-28 px-6 text-white">
                <h1 className="text-3xl font-bold">
                    Welcome to Ecom
                </h1>
                <p className="mt-4 text-sm opacity-80">
                    Mobile pe right to left swipe karo → sidebar open ho jayega.
                </p>
            </div>
        </div>
    );
};

export default Navbar;