import { useState } from "react";
import Header from "../components/Header";
import { sendPasswordResetEmail, updatePassword } from "firebase/auth";
import { auth } from "../../Auth/firebase"; // adjust path if needed


function ChangePassword() {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const user = auth.currentUser;

    const handleSendResetEmail = async () => {
        setError("");
        setMessage("");

        if (!user?.email) {
            setError("User email not found. Please re-login.");
            return;
        }

        try {
            await sendPasswordResetEmail(auth, user.email);
            setMessage("Password reset email sent. Please check your inbox.");
        } catch (err: any) {
            setError(err.message);
        }
    };

    const handleChangePassword = async () => {
        setError("");
        setMessage("");
        setLoading(true);

        try {
            if (!newPassword || !confirmPassword) {
                throw new Error("All fields are required");
            }

            if (newPassword !== confirmPassword) {
                throw new Error("Passwords do not match");
            }

            if (!user) {
                throw new Error("User not authenticated");
            }

            await updatePassword(user, newPassword);
            setMessage("Password updated successfully");
            setNewPassword("");
            setConfirmPassword("");
        } catch (err: any) {
            if (err.code === "auth/requires-recent-login") {
                setError("Please re-login and try again.");
            } else {
                setError(err.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Header label="Change Password" />

            <div className="p-6 space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-2">
                        New Password
                    </label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter new password"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                        style={{ borderColor: "#BC8600" }}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm password"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                        style={{ borderColor: "#BC8600" }}
                    />
                </div>

                <button
                    onClick={handleSendResetEmail}
                    className="w-full px-4 py-2 rounded-lg font-medium text-white"
                    style={{ backgroundColor: "#BC8600" }}
                >
                    Send Reset Email
                </button>

                {error && (
                    <p className="text-red-500 text-sm text-center">{error}</p>
                )}
                {message && (
                    <p className="text-green-600 text-sm text-center">{message}</p>
                )}

                <button
                    onClick={handleChangePassword}
                    disabled={loading}
                    className="w-full px-4 py-2 rounded-lg font-medium text-white mt-4"
                    style={{ backgroundColor: "#BC8600" }}
                >
                    {loading ? "Updating..." : "Submit"}
                </button>
            </div>
        </div>
    );
}

export default ChangePassword;

