import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import Header from "../pages/components/Header";
import { auth } from "../Auth/firebase";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const validateEmail = (email: string) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleResetPassword = async () => {
        setError("");
        setSuccess("");

        if (!email) {
            setError("Email is required");
            return;
        }

        if (!validateEmail(email)) {
            setError("Invalid email address");
            return;
        }

        try {
            setLoading(true);

            await sendPasswordResetEmail(auth, email);

            setSuccess(
                "Password reset link sent. Please check your email."
            );
        } catch (err: any) {
            switch (err.code) {
                case "auth/user-not-found":
                    setError("No account found with this email");
                    break;
                case "auth/too-many-requests":
                    setError("Too many attempts. Try again later");
                    break;
                default:
                    setError("Failed to send reset email");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-screen w-screen bg-white flex flex-col px-6">
            <div className="pt-3">
                <Header label="Forgot Password" to="/auth/login" />
            </div>

            <div className="flex justify-center mt-6 mb-10">
                <img
                    src="https://m.equinnoxtrading.com/assets/logo-golden-xMz5g5s6.png"
                    alt="Logo"
                    className="h-16"
                />
            </div>

            <label className="text-[#BC8600] text-sm font-semibold mb-2">
                Enter your Email
            </label>

            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Please enter your email address"
                className="w-full bg-gray-100 rounded-full px-5 py-4 text-sm outline-none mb-6"
            />

            {error && (
                <p className="text-red-500 text-sm mb-4 text-center">
                    {error}
                </p>
            )}

            {success && (
                <p className="text-green-600 text-sm mb-4 text-center">
                    {success}
                </p>
            )}

            <button
                onClick={handleResetPassword}
                disabled={loading}
                className="w-full rounded-full py-4 text-white font-semibold text-sm"
                style={{ backgroundColor: "#BC8600" }}
            >
                {loading ? "Sending..." : "Send Reset Link"}
            </button>
        </div>
    );
}

export default ForgotPassword;


