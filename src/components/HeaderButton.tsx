import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

interface NavItemProps {
  label: string;
  onClick?: () => void;
  vertical?: boolean;
  to: string;
}

const NavItem: React.FC<NavItemProps> = ({ label, onClick, vertical , to }) => {
  const { t } = useTranslation();
  return (
    <li className="relative">
      <NavLink
        to = {to}
        className={`font-bold text-sm py-2 px-1 w-full text-left transition-all
        ${vertical
            ? "text-white border-b border-gray-700 hover:text-gray-300 hover:border-gray-500"
            : "hover:text-[#F57920] hover:border-b-2 hover:border-[#F57920] border-b-2 border-transparent"
          }
      `}
        onClick={onClick}
      >
        {t(label)}
      </NavLink>
    </li>
  )
};

interface NavbarProps {
  items: { name: string; link: string }[];
  onItemClick?: (label: string) => void;
  vertical?: boolean;
}

const HeaderButton: React.FC<NavbarProps> = ({
  items,
  onItemClick,
  vertical = false
}) => (
  <nav className={`${vertical ? "bg-transparent" : "bg-white"} p-0`}>
    <ul className={`flex ${vertical ? "flex-col gap-2" : "space-x-6 justify-end py-2"}`}>
      {items.map((item, idx) => (
        <NavItem key={idx} label={item.name} to={item.link} onClick={() => onItemClick && onItemClick(item.name)} vertical={vertical} />
      ))}
    </ul>
  </nav>
);

export default HeaderButton;
