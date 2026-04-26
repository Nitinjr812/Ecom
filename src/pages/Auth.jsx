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
        const token = true
        localStorage.setItem("userdata", JSON.stringify([...exist, data]))
        alert("Signup success")
        setactive(true)
        navigate("/")
        localStorage.setItem("token", JSON.stringify(token))
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
        alert("welcome back")
        navigate("/")
        const token = true
        localStorage.setItem("token", JSON.stringify(token))
    }

    return (
        <div className="h-screen w-screen overflow-hidden relative bg-black flex items-center justify-center px-4">

            <div className="absolute inset-0 -z-10 animate-gradient bg-[linear-gradient(270deg,#ff00cc,#3333ff,#00ffcc,#ff00cc)] bg-[length:600%_600%]"></div>

            <div className="absolute w-[500px] h-[500px] bg-pink-500 opacity-20 blur-3xl rounded-full top-[-100px] left-[-100px] animate-float"></div>
            <div className="absolute w-[400px] h-[400px] bg-purple-500 opacity-20 blur-3xl rounded-full bottom-[-100px] right-[-100px] animate-float2"></div>

            <div className="w-full max-w-5xl flex flex-col md:flex-row backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl overflow-hidden shadow-2xl">

                <div className="w-full md:w-1/2 flex flex-col justify-center p-8 md:p-12 text-white text-center md:text-left">
                    <h1 className="text-3xl md:text-5xl font-bold">
                        {active ? "Welcome Back" : "Create Account"}
                    </h1>

                    <p className="mt-3 text-gray-300">
                        {active
                            ? "Login to continue your journey"
                            : "Join us and start your journey"}
                    </p>

                    <button
                        onClick={() => setactive(!active)}
                        className="mt-6 px-6 py-3 bg-white text-black rounded-full  transition"
                    >
                        {active ? "Switch to Signup" : "Switch to Login"}
                    </button>
                </div>

                {/* RIGHT */}
                <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-6 md:p-10">

                    <h2 className="text-2xl md:text-3xl text-white mb-6">
                        {active ? "Login" : "Signup"}
                    </h2>

                    <div className="flex flex-col gap-4 w-full">

                        {!active && (
                            <input
                                name="name"
                                onChange={userdata}
                                placeholder="Full Name"
                                className="p-3 rounded-xl bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500  transition"
                            />
                        )}

                        <input
                            name="email"
                            onChange={userdata}
                            placeholder="Email"
                            className="p-3 rounded-xl bg-white/10 text-white placeholder-gray-400 focus:outline-none  focus:ring-2 focus:ring-pink-500 transition"
                        />

                        <input
                            name="password"
                            type="password"
                            onChange={userdata}
                            placeholder="Password"
                            className="p-3 rounded-xl bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500  transition"
                        />

                        <button
                            onClick={active ? login : signup}
                            className="mt-4 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold hover:scale-110 transition"
                        >
                            {active ? "Login" : "Create Account"}
                        </button>

                    </div>
                </div>
            </div>

            <style>
                {`
                @keyframes gradientMove {
                  0% { background-position: 0% 50%; }
                  50% { background-position: 100% 50%; }
                  100% { background-position: 0% 50%; }
                }

                .animate-gradient {
                  animation: gradientMove 12s ease infinite;
                }

                @keyframes float {
                  0%,100% { transform: translateY(0px); }
                  50% { transform: translateY(-40px); }
                }

                @keyframes float2 {
                  0%,100% { transform: translateY(0px); }
                  50% { transform: translateY(40px); }
                }

                .animate-float {
                  animation: float 6s ease-in-out infinite;
                }

                .animate-float2 {
                  animation: float2 8s ease-in-out infinite;
                }
                `}
            </style>

        </div>
    )
}

export default Auth