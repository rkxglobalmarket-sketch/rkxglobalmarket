import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../pages/components/Header"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "./firebase"

function Login() {
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleLogin = async () => {
        setError("")
        setLoading(true)

        try {
            if (!email || !password) {
                throw new Error("Email and password are required")
            }

            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            )

            const user = userCredential.user

            const token = await user.getIdToken()
            const expirationDate = new Date()
            expirationDate.setDate(expirationDate.getDate() + 30)

            document.cookie = `sessionToken=${token}; expires=${expirationDate.toUTCString()}; path=/`
            document.cookie = `sessionExpiration=${expirationDate.toISOString()}; expires=${expirationDate.toUTCString()}; path=/`
            document.cookie = `userEmail=${user.email || ""}; expires=${expirationDate.toUTCString()}; path=/`

            navigate("/terminal/market")

        } catch (err: any) {
            console.error(err)

            switch (err.code) {
                case "auth/user-not-found":
                    setError("User not found")
                    break
                case "auth/wrong-password":
                    setError("Incorrect password")
                    break
                case "auth/invalid-email":
                    setError("Invalid email address")
                    break
                default:
                    setError(err.message || "Login failed")
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="h-screen w-screen bg-white flex flex-col px-6">
            <div className="pt-3">
                <Header label="" to="/terminal/main" />
            </div>

            <div className="flex justify-center mt-6 mb-10">
                <img
                    src="https://m.equinnoxtrading.com/assets/logo-golden-xMz5g5s6.png"
                    alt="IG Logo"
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

            <label className="text-sm font-semibold mb-2">
                Password
            </label>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Please enter your password"
                className="w-full bg-gray-100 rounded-full px-5 py-4 text-sm outline-none mb-4"
            />

            <div className="flex justify-between text-xs mb-8">
                <span className="text-gray-400">
                    New User?{" "}
                    <button
                        className="text-[#BC8600] font-semibold"
                        onClick={() => navigate("/auth/register")}
                    >
                        Join Now
                    </button>
                </span>

                <button
                    className="text-gray-400"
                    onClick={() => navigate("/auth/forgot-password")}
                >
                    Forgot password
                </button>
            </div>

            {error && (
                <p className="text-red-500 text-sm mb-4 text-center">
                    {error}
                </p>
            )}

            <button
                onClick={handleLogin}
                disabled={loading}
                className="w-full rounded-full py-4 text-white font-semibold text-sm mb-4 disabled:opacity-60"
                style={{ backgroundColor: "#BC8600" }}
            >
                {loading ? "Logging in..." : "Login"}
            </button>
        </div>
    )
}

export default Login

