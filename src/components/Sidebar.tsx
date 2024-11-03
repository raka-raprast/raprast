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
import { useContext, useEffect, useRef, useState } from "react";
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
// Define prop types for SidebarContent
interface SidebarContentProps {
  mobile: boolean;
}


const Sidebar = () => {
  const router = useRouter();
  const { isCollapsed, toggleSidebarCollapse } = useContext(SidebarContext);
  const isMobileRef = useRef<boolean>(false); // Initialize to false
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false); // Default to light mode

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

  useEffect(() => {
    // Check for dark mode in localStorage
    const theme = localStorage.getItem('theme');
    if (theme === 'dark-mode') {
      document.body.classList.add('dark-mode');
      setIsDarkMode(true);
    }

    // Determine if the device is mobile once on mount
    const userAgent = window.navigator.userAgent;
    isMobileRef.current = /Mobi|Android/i.test(userAgent);
    localStorage.setItem('isMobile', JSON.stringify(isMobileRef.current));

    // Collapse sidebar on route change
    const handleRouteChange = () => {
      if (isMobileRef.current) {
        toggleSidebarCollapse(); // Collapse the sidebar on navigation
      }
    };

    router.events.on('routeChangeStart', handleRouteChange);

    // Cleanup event listener on unmount
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router.events]);

  // Memoized sidebar component to prevent unnecessary re-renders
  const SidebarContent = ({ mobile }: SidebarContentProps) => (
    <>
      {mobile && (
        <button className="mobile-menu-toggle" onClick={toggleSidebarCollapse}>
          <MdMenu />
        </button>
      )}

      {/* Overlay to close the menu when clicking outside */}
      {!isCollapsed && mobile && (
        <div className="sidebar__overlay" onClick={toggleSidebarCollapse}></div>
      )}

      {/* Fullscreen Sidebar */}
      <div className={`sidebar__mobile_fullscreen ${!isCollapsed ? 'sidebar__mobile_fullscreen--open' : ''}`}>
        <aside className="sidebar">
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
            <div className="sidebar__link" onClick={toggleDarkMode}>
              <span className="sidebar__icon">{isDarkMode ? <BsMoon /> : <BsSun />}</span>
              <span className="sidebar__name">{isDarkMode ? 'Dark Mode' : 'Light Mode'}</span>
            </div>
          </ul>
        </aside>
      </div>
    </>
  );

  return (
    <>
      {isMobileRef.current ? (
        <SidebarContent mobile />
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
