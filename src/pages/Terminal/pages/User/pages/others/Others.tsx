import { ArrowRight, LogOutIcon } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAuth, signOut } from "firebase/auth"
import Header from "../components/Header"
import { app } from "../../Auth/firebase"

function Others() {
    const [modal, setModal] = useState(false)
    const navigate = useNavigate()

    const auth = getAuth(app)

    const handleLogout = async () => {
        try {
            await signOut(auth)

            localStorage.clear()
            sessionStorage.clear()

            navigate("/auth/login", { replace: true })
        } catch (error) {
            console.error("Logout failed:", error)
        }
    }

    return (
        <div className="min-h-screen bg-white">
            <Header label="Others" />

            <button
                className="p-5 flex flex-row justify-between items-center w-full cursor-pointer"
                onClick={() => setModal(true)}
            >
                <div className="flex items-center gap-5">
                    <LogOutIcon />
                    <p className="font-bold text-sm">Logout</p>
                </div>
                <ArrowRight />
            </button>

            {modal && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-xl p-6 w-80 shadow-lg">
                        <h2 className="text-lg font-bold mb-2">
                            Confirm Logout
                        </h2>
                        <p className="text-sm text-gray-600 mb-6">
                            Are you sure you want to logout?
                        </p>

                        <div className="flex justify-end gap-4">
                            <button
                                className="px-4 py-2 bg-gray-200 rounded-lg text-sm"
                                onClick={() => setModal(false)}
                            >
                                Cancel
                            </button>

                            <button
                                className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-semibold"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Others

