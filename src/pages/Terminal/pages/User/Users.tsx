import * as Icon from "lucide-react"
import Footer from "../../components/Footer";
import type { LucideIcon } from 'lucide-react'
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getAuth } from "firebase/auth";

function OptionCard({
  icon, name, to = "/terminal/users", onClick = () => { }
}: {
  icon: string,
  name: string,
  to?: string,
  onClick?: () => void
}
) {
  const getIcon = (icon: string) => {
    const IconComponent = Icon[icon as keyof typeof Icon] as LucideIcon | undefined;
    return IconComponent ? <IconComponent size={30} color="#BC8600" /> : null;
  }
  return (
    <NavLink to={to} className="cursor-pointer bg-white rounded-xl flex flex-col justify-center items-center p-5 shadow-lg w-25 h-23 border-2">
      <div className="m-2 mx-4" onClick={onClick}>
        {getIcon(icon)}
      </div>
      <p className="text-xs text-gray-600 text-nowrap">{name}</p>
    </NavLink>
  )
}

function Users() {
  const auth = getAuth();
  const [onlineModal, setOnlineModal] = useState(false);
  const [balance, setBalance] = useState('0.00');
  const [show, setshow] = useState(false);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_BACKEND_SERVER + `/data/balance/${auth.currentUser?.uid}`, {
          method: 'GET',
          headers: {}
        });
        const data = await response.json();
        setBalance(data.balance || '0.00');
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };
    fetchBalance();
  }, []);

  return (
    <div>
      <div className="relative top-0 w-full bg-[radial-gradient(circle_at_top,#FDCE00,#BD8900,#BD8900)] rounded-b-xl">
        <div className="p-5">
          <h3 className="text-white font-bold text-lg">{auth.currentUser?.email}</h3>
          <p className="text-white font-semibold text-xs">{auth.currentUser?.uid}</p>
        </div>
        <div className="p-5 flex flex-row justify-between items-center">
          <div>
            <h3 className="text-white font-bold text-lg">$ {show ? balance : "*******"}</h3>
            <p className="text-white font-semibold text-xs">Available Assets</p>
          </div>
          <button className="text-white font-bold cursor-pointer" onClick={() => setshow(!show)}>
            {show ? <Icon.EyeOff /> : <Icon.Eye />}
          </button>
        </div>
        <div className="flex flex-row justify-between items-center gap-5 mx-5">
          <NavLink to="/terminal/users/deposit" className="cursor-pointer relative -bottom-2 w-full bg-[radial-gradient(circle_at_left,#FDCE00,#BD8900,#FDCE00)] rounded-xl flex flex-row justify-center items-center shadow-amber-100">
            <div className="text-white p-3 w-fit"><Icon.DollarSign /></div>
            <div className="w-full flex flex-col justify-center items-start">
              <p className="text-white font-semibold text-sm">Deposit</p>
              <p className="text-xs text-nowrap text-gray-300">Billing Details{"<<"}</p>
            </div>
          </NavLink>
          <NavLink to="/terminal/users/withdraw" className="cursor-pointer relative -bottom-2 w-full bg-[radial-gradient(circle_at_left,#FDCE00,#BD8900,#FDCE00)] rounded-xl flex flex-row justify-center items-center shadow-amber-100">
            <div className="text-white p-3 w-fit"><Icon.DollarSign /></div>
            <div className="w-full flex flex-col justify-center items-start">
              <p className="text-white font-semibold text-sm">Withdrawal</p>
              <p className="text-xs text-nowrap text-gray-300">Billing Details{"<<"}</p>
            </div>
          </NavLink>
        </div>
      </div>
      <div className="flex flex-wrap justify-center items-start gap-5 w-full p-2 pt-7">
        <OptionCard icon="CreditCard" name="Wallet" to="/terminal/users/wallet" />
        <OptionCard icon="Gem" name="Credit Score" />
        <OptionCard icon="UserCheck" name="Verification" to="/terminal/users/verification" />
        <OptionCard icon="UserPlus" name="Invite Friends" to="/terminal/users/invite" />
        <OptionCard icon="Lock" name="Change Password" to="/terminal/users/changepassword" />
        <OptionCard icon="MessageCircleMore" name="Online Service" onClick={() => { setOnlineModal(true) }} />
        <OptionCard icon="MessageSquareDot" name="Complaint email" to="/terminal/users/contact" />
        <OptionCard icon="Bell" name="announcement" />
        <OptionCard icon="Settings" name="Others" to="/terminal/users/others" />
      </div>
      {onlineModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-80">
            <h2 className="text-lg font-bold mb-4">Online Service</h2>
            <p className="text-sm text-center">The company only sends and replies to members with this email address</p>
            <div className="flex flex-col justify-center items-center">
              <a href="https://t.me/equinnoxtrading09" className="text-blue-600 w-full text-center">equinnoxtrading09</a>
              <a href="https://t.me/equinnoxtrading06" className="text-blue-600 w-full text-center">equinnoxtrading06</a>
            </div>
            <button
              onClick={() => setOnlineModal(false)}
              className="mt-4 w-full bg-amber-600 text-white py-2 rounded-lg font-semibold hover:bg-amber-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  )
}


export default Users;


