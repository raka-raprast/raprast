import Image from "next/image";
import { AiOutlineHome } from "react-icons/ai";
import {
  BsBook,
  BsBriefcase,
  BsJournal,
  BsLaptop,
  BsMoon,
  BsPeople,
  BsPhone,
  BsSun,
  BsWrench,
} from "react-icons/bs";
import { TiContacts } from "react-icons/ti";
import { FiMail } from "react-icons/fi";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdMenu,
} from "react-icons/md";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
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

const Sidebar = () => {
  const router = useRouter();
  const { isCollapsed, toggleSidebarCollapse } = useContext(SidebarContext);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkLoading, setIsDarkLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false); // Default to light mode
  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.body.classList.remove('dark-mode');
      localStorage.removeItem('theme');
    } else {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark-mode');
    }
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    // Check if the dark mode value is already in localStorage
    setIsDarkLoading(true);
    const theme = localStorage.getItem('theme');
    if (theme === 'dark-mode') {
      document.body.classList.add('dark-mode');
      setIsDarkMode(true);
    }
    setIsDarkLoading(false);

    // Check if the isMobile value is already in localStorage
    const cachedIsMobile = localStorage.getItem('isMobile');
    if (cachedIsMobile !== null) {
      setIsMobile(JSON.parse(cachedIsMobile));
      setIsLoading(false);
    } else {
      // If not found in localStorage, determine and set isMobile
      if (typeof window !== 'undefined') {
        const userAgent = window.navigator.userAgent;
        const isMobileDevice = /Mobi|Android/i.test(userAgent);
        setIsMobile(isMobileDevice);
        setIsLoading(false);

        // Save to localStorage for future use
        localStorage.setItem('isMobile', JSON.stringify(isMobileDevice));
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (isMobile) {
    return (
      <div className="sidebar__wrapper_mobile">
        {!isCollapsed ? null : (
          <div>
            <button className="btnMbl" onClick={toggleSidebarCollapse}>
              {<MdMenu />}
            </button>
          </div>
        )}
        {!isCollapsed ? (
          <div>
            <button className="btn" onClick={toggleSidebarCollapse}>
              {isCollapsed ? <MdKeyboardArrowRight /> : <MdKeyboardArrowLeft />}
            </button>
            <aside className="sidebar" data-collapse={true}>
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
              <ul className="sidebar__list">
                {sidebarItems.map(({ name, href, icon: Icon }) => {
                  return (
                    <li className="sidebar__item" key={name}>
                      <Link
                        href={href}
                        passHref
                        className={`sidebar__link ${router.pathname === href
                          ? "sidebar__link--active"
                          : ""
                          }`}
                      >
                        <span className="sidebar__icon">
                          <Icon />
                        </span>
                        <span className="sidebar__name">{name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <div
                className="sidebar__link"
                onClick={toggleDarkMode}>
                <span className="sidebar__icon">
                  {isDarkMode ? <BsMoon /> : <BsSun />}
                </span>
              </div>
            </aside>
          </div>
        ) : null}
      </div>
    );
  }

  return (
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
          height: "80%",
        } as React.CSSProperties}>
          <ul className="sidebar__list">
            {sidebarItems.map(({ name, href, icon: Icon }) => {
              return (
                <li className="sidebar__item" key={name}>
                  <Link
                    href={href}
                    passHref
                    className={`sidebar__link ${router.pathname === href ? "sidebar__link--active" : ""
                      }`}
                  >
                    <span className="sidebar__icon">
                      <Icon />
                    </span>
                    <span className="sidebar__name">{name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div
          className="sidebar__link"
          onClick={toggleDarkMode}>
          <span className="sidebar__icon">
            {isDarkLoading ? null : isDarkMode ? <BsMoon /> : <BsSun />}
          </span>
          <span className="sidebar__name">{isDarkMode ? "Dark Mode" : "Light Mode"}</span>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
