import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Auth = () => {
    const [active, setactive] = useState(false)
    const [data, setdata] = useState({})
    const navigate = useNavigate()

    const userdata = (e) => {
        setdata({ ...data, [e.target.name]: e.target.value })
    }

    const signup = () => {
        const exist = JSON.parse(localStorage.getItem("userdata")) || []

        if (!data.name || !data.email || !data.password) {
            alert("All fields required")
            return
        }

        const checkuser = exist.find(user => user.email === data.email)

        if (checkuser) {
            alert("User already exists")
            setactive(true)
            return
        }

        localStorage.setItem("userdata", JSON.stringify([...exist, data]))
        setactive(true)
    }

    const login = () => {
        const exist = JSON.parse(localStorage.getItem("userdata")) || []

        const valid = exist.find(
            user => user.email === data.email && user.password === data.password
        )

        if (!valid) {
            alert("Invalid credentials")
            return
        }

        localStorage.setItem("currentUser", JSON.stringify(valid))
        navigate("/")
    }

    return (
        <div className="min-h-screen overflow-hidden flex items-center justify-center bg-black px-4 overflow-hidden">

            {/* 🔥 Animated Blobs */}
            <div className="absolute w-80 h-80 bg-purple-600 rounded-full blur-3xl opacity-30 top-10 left-5 animate-[blob_8s_infinite]"></div>
            <div className="absolute w-80 h-80 bg-pink-500 rounded-full blur-3xl opacity-30 bottom-10 right-5 animate-[blob_10s_infinite]"></div>

            {/* 🔥 Card */}
            <div className="w-full max-w-5xl flex flex-col md:flex-row backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl overflow-hidden shadow-2xl animate-fadeIn">

                {/* LEFT */}
                <div className="w-full md:w-1/2 flex flex-col justify-center p-8 md:p-12 text-white text-center md:text-left">

                    <h1 className="text-3xl md:text-5xl font-bold transition-all duration-500">
                        {active ? "Welcome Back" : "Create Account"}
                    </h1>

                    <p className="mt-3 text-gray-300 transition-all duration-500">
                        {active
                            ? "Login to continue your journey"
                            : "Join us and start your journey"}
                    </p>

                    <button
                        onClick={() => setactive(!active)}
                        className="mt-6 px-6 py-3 bg-white text-black rounded-full hover:scale-110 transition-all duration-300"
                    >
                        {active ? "Switch to Signup" : "Switch to Login"}
                    </button>
                </div>

                {/* RIGHT */}
                <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-6 md:p-10">

                    <h2 className="text-2xl md:text-3xl text-white mb-6 transition-all duration-500">
                        {active ? "Login" : "Signup"}
                    </h2>

                    <div className="flex flex-col gap-4 w-full">

                        {!active && (
                            <input
                                name="name"
                                onChange={userdata}
                                placeholder="Full Name"
                                className="p-3 rounded-xl bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:scale-105 transition"
                            />
                        )}

                        <input
                            name="email"
                            onChange={userdata}
                            placeholder="Email"
                            className="p-3 rounded-xl bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:scale-105 transition"
                        />

                        <input
                            name="password"
                            type="password"
                            onChange={userdata}
                            placeholder="Password"
                            className="p-3 rounded-xl bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:scale-105 transition"
                        />

                        <button
                            onClick={active ? login : signup}
                            className="mt-4 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold hover:scale-110 transition-all duration-300"
                        >
                            {active ? "Login" : "Create Account"}
                        </button>

                    </div>
                </div>
            </div>

            {/* 🔥 Custom Animations */}
            <style>
                {`
                @keyframes blob {
                    0%, 100% { transform: translate(0,0) scale(1); }
                    33% { transform: translate(30px,-50px) scale(1.1); }
                    66% { transform: translate(-20px,20px) scale(0.9); }
                }

                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .animate-fadeIn {
                    animation: fadeIn 0.8s ease forwards;
                }
                `}
            </style>

        </div>
    )
}

export default Auth