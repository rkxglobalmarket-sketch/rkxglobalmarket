import { useEffect, useState } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { onAuthStateChanged } from "firebase/auth"
import type { User } from "firebase/auth"
import { auth } from "./Auth/firebase"

export default function UsersLayout() {
    const [user, setUser] = useState<User | null>(null)
    const [checking, setChecking] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser)
            setChecking(false)
        })

        return () => unsubscribe()
    }, [])

    if (checking) {
        return (
            <div className="h-screen w-screen flex items-center justify-center">
                <span className="text-sm text-gray-400">Checking session...</span>
            </div>
        )
    }

    if (!user) {
        return <Navigate to="/auth/login" replace />
    }

    return <Outlet />
}

