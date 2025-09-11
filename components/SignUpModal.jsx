"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

const SignUpModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const router = useRouter();

    if (!isOpen) return null;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        alert(`Signed up as ${formData.name} (${formData.email})`);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="bg-gradient-to-br from-orange-50 via-pink-100 to-purple-150 rounded-2xl w-full max-w-md p-6 relative shadow-2xl border border-white/30 animate-slideUpFadeIn">

                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-900"
                >
                    <X size={24} />
                </button>

                {/* Modal Heading */}
                <h2 className="text-2xl font-bold text-center mb-6 text-purple-700">
                    Sign Up
                </h2>

                {/* Form Inputs */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white"
                        required
                    />
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white"
                        required
                    />

                    {/* Sign Up button */}
                    <button
                        type="submit"
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-semibold"
                    >
                        Sign Up
                    </button>
                </form>

                {/* Divider with "or" */}
                <div className="flex items-center my-4">
                    <hr className="flex-grow border-purple-300" />
                    <span className="mx-2 text-purple-600 font-medium">or</span>
                    <hr className="flex-grow border-purple-300" />
                </div>

                {/* Login button */}
                <button
                    onClick={() => router.push("/login")}
                    className="w-full border border-purple-600 text-purple-600 hover:bg-purple-50 py-3 rounded-xl font-semibold"
                >
                    Login
                </button>
            </div>
        </div>
    );
};

export default SignUpModal;
