import { ArrowLeft } from "lucide-react"
import { NavLink } from "react-router-dom"

function Header({
    label , to = '/terminal/users/'
}: {
    label: string , to? : string
}) {

    return (
        <NavLink to={to} className="p-2 flex flex-row justify-between items-center gap-5">
            <ArrowLeft />
            <h1 className="font-semibold">{label}</h1>
            <p></p>
        </NavLink>
    )
}

export default Header
