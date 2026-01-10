import { useState } from "react";
import {
    createUserWithEmailAndPassword,
    sendEmailVerification,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Header from "../pages/components/Header";

import { auth } from "../Auth/firebase";

function Register() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const validateEmail = (email: string) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleRegister = async () => {
        setError("");
        setSuccess("");

        if (!email || !password || !confirmPassword) {
            setError("All fields are required");
            return;
        }

        if (!validateEmail(email)) {
            setError("Invalid email address");
            return;
        }

        if (password.length < 8) {
            setError("Password must be at least 8 characters");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            setLoading(true);

            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            await fetch(import.meta.env.VITE_BACKEND_SERVER + "/data/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ uid: userCredential.user.uid }),
            });

            await sendEmailVerification(userCredential.user);

            setSuccess(
                "Registration successful. Please check your email to verify your account."
            );

            setTimeout(() => navigate("/auth/login"), 2000);
        } catch (err: any) {
            switch (err.code) {
                case "auth/email-already-in-use":
                    setError("Email already registered");
                    break;
                case "auth/weak-password":
                    setError("Password is too weak");
                    break;
                default:
                    setError("Registration failed. Try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-screen w-screen bg-white flex flex-col px-6">
            <div className="pt-3">
                <Header label="" to="/auth/login" />
            </div>

            <div className="flex justify-center mt-6 mb-10">
                <img
                    src="https://m.equinnoxtrading.com/assets/logo-golden-xMz5g5s6.png"
                    alt="Logo"
                    className="h-16"
                />
            </div>

            <label className="text-[#BC8600] text-sm font-semibold mb-2">
                Email
            </label>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                className="w-full bg-gray-100 rounded-full px-5 py-4 text-sm outline-none mb-6"
            />

            <label className="text-sm font-semibold mb-2">Password</label>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 8 characters"
                className="w-full bg-gray-100 rounded-full px-5 py-4 text-sm outline-none mb-6"
            />

            <label className="text-sm font-semibold mb-2">
                Confirm Password
            </label>
            <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter password"
                className="w-full bg-gray-100 rounded-full px-5 py-4 text-sm outline-none mb-6"
            />

            {error && (
                <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
            )}

            {success && (
                <p className="text-green-600 text-sm mb-4 text-center">
                    {success}
                </p>
            )}

            <button
                onClick={handleRegister}
                disabled={loading}
                className="w-full rounded-full py-4 text-white font-semibold text-sm"
                style={{ backgroundColor: "#BC8600" }}
            >
                {loading ? "Registering..." : "Register"}
            </button>
        </div>
    );
}

export default Register;


