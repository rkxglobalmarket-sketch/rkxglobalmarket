import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home/Home";
import ContactUs from "./pages/ContactUs/ContactUs";
import Platform from "./pages/Platform/Platform";
import Products from "./pages/Products/Products";
import Risk from "./pages/Risk/Risk";
import AboutUS from "./pages/AboutUs/AboutUS";

import TerminalLayout from "./pages/Terminal/Terminal";
import Market from "./pages/Terminal/pages/Market/Market";
import { Orders } from "./pages/Terminal/pages/Orders/Orders";
import Rank from "./pages/Terminal/pages/Rank/Rank";
import Users from "./pages/Terminal/pages/User/Users";
import Main from "./pages/Terminal/pages/Terminal/Main";

import Wallet from "./pages/Terminal/pages/User/pages/wallet/Wallet";
import Verification from "./pages/Terminal/pages/User/pages/verification/Verification";
import ChangePassword from "./pages/Terminal/pages/User/pages/changePassword/ChangePassword";
import Contact from "./pages/Terminal/pages/User/pages/Complaintemail/Contact";
import Others from "./pages/Terminal/pages/User/pages/others/Others";
import Invite from "./pages/Terminal/pages/User/pages/inviteFriends/Invite";

import UsersLayout from "./pages/Terminal/pages/User/UsersLayout";
import MarketOutlet from "./pages/Terminal/pages/Market/MarketOutlet";
import Search from "./pages/Terminal/pages/Market/pages/Search";

import Login from "./pages/Terminal/pages/User/Auth/Login";
import Register from "./pages/Terminal/pages/User/Auth/Register";
import ForgotPassword from "./pages/Terminal/pages/User/Auth/ForgotPassword";
import Recharge from "./pages/Terminal/pages/User/pages/balances/Deposit";
import Withdraw from "./pages/Terminal/pages/User/pages/balances/Withdraw";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/contact-us", element: <ContactUs /> },
  { path: "/platform", element: <Platform /> },
  { path: "/products", element: <Products /> },
  { path: "/risk", element: <Risk /> },
  { path: "/about-us", element: <AboutUS /> },

  {
    path: "/auth",
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "forgot-password", element: <ForgotPassword /> },
    ],
  },

  {
    path: "/terminal",
    element: <TerminalLayout />,
    children: [
      { index: true, element: <Market /> },

      {
        path: "market",
        element: <MarketOutlet />,
        children: [
          { index: true, element: <Market /> },
          { path: "search", element: <Search /> },
        ],
      },

      { path: "orders", element: <Orders /> },
      { path: "rank", element: <Rank /> },

      {
        path: "users",
        element: <UsersLayout />,
        children: [
          { index: true, element: <Users /> },
          { path: "wallet", element: <Wallet /> },
          { path: "deposit", element: <Recharge /> },
          { path: "withdraw", element: <Withdraw /> },
          { path: "verification", element: <Verification /> },
          { path: "changepassword", element: <ChangePassword /> },
          { path: "contact", element: <Contact /> },
          { path: "others", element: <Others /> },
          { path: "invite", element: <Invite /> },
        ],
      },

      { path: "main/:product", element: <Main /> },
      { path: "main", element: <Main /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
