import Image from "next/image";
import {
  BsBriefcase,
  BsLaptop,
  BsMoon,
  BsPeople,
  BsSun,
} from "react-icons/bs";
import { TiContacts } from "react-icons/ti";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdMenu,
} from "react-icons/md";
import Link from "next/link";
import { useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { SidebarContext } from "@/context/SidebarContext";
import { useRouter } from "next/router";

const sidebarItems = [
  {
    name: "About",
    href: "/",
    icon: BsPeople,
  },
  {
    name: "Experience",
    href: "/experience",
    icon: BsBriefcase,
  },
  {
    name: "Project",
    href: "/project",
    icon: BsLaptop,
  },
  {
    name: "Contact",
    href: "/contact",
    icon: TiContacts,
  },
];

interface SidebarContentProps {
  mobile: boolean;
}


const Sidebar = () => {
  const router = useRouter();
  const { isCollapsed, toggleSidebarCollapse } = useContext(SidebarContext);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768); // Initial check without flash
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('theme') === 'dark-mode');

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.body.classList.remove('dark-mode');
      localStorage.removeItem('theme');
    } else {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark-mode');
    }
    setIsDarkMode((prev) => !prev);
  };

  useLayoutEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', checkIsMobile);

    return () => window.removeEventListener('resize', checkIsMobile);
  }, []); // Removed router.events dependency to prevent re-renders on navigation

  const BottomNavBar = () => (
    <nav className="bottom-nav">
      <ul className="bottom-nav__list">
        {sidebarItems.map(({ name, href, icon: Icon }) => (
          <li className="bottom-nav__item" key={name}>
            <Link
              href={href}
              passHref
              className={`sidebar__link ${router.pathname === href ? "sidebar__link--active" : ""}`}
            >
              <span className="sidebar__icon">
                <Icon />
              </span>
            </Link>
          </li>
        ))}
        <li className="bottom-nav__item" onClick={toggleDarkMode}>
          <div className="sidebar__link">
            <span className="sidebar__icon">
            {isDarkMode ? <BsMoon /> : <BsSun />}
          </span></div>
        </li>
      </ul>
    </nav>
  );

  return (
    <>
      {isMobile ? (
        <BottomNavBar />
      ) : (
        <div className="sidebar__wrapper">
          <button className="btn" onClick={toggleSidebarCollapse}>
            {isCollapsed ? <MdKeyboardArrowRight /> : <MdKeyboardArrowLeft />}
          </button>
          <aside className="sidebar" data-collapse={isCollapsed}>
            <div className="sidebar__top">
              <Image
                width={80}
                height={80}
                className="sidebar__logo"
                src="/ai_avatar.png"
                alt="logo"
              />
              <p className="sidebar__logo-name">Raka Prasetyo</p>
            </div>
            <div style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "75%",
            } as React.CSSProperties}>
              <ul className="sidebar__list">
                {sidebarItems.map(({ name, href, icon: Icon }) => (
                  <li className="sidebar__item" key={name}>
                    <Link
                      href={href}
                      passHref
                      className={`sidebar__link ${router.pathname === href ? "sidebar__link--active" : ""}`}
                    >
                      <span className="sidebar__icon">
                        <Icon />
                      </span>
                      <span className="sidebar__name">{name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="sidebar__link" onClick={toggleDarkMode}>
              <span className="sidebar__icon">
                {isDarkMode ? <BsMoon /> : <BsSun />}
              </span>
              <span className="sidebar__name">{isDarkMode ? "Dark Mode" : "Light Mode"}</span>
            </div>
          </aside>
        </div>
      )}
    </>
  );
};

export default Sidebar;
