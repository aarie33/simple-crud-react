import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { RiErrorWarningLine, RiHome3Line, RiNewspaperLine, RiUserLine } from '@remixicon/react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Modal } from "flowbite-react";
import { authService } from '../services/AuthService';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
}

const BackofficeLayout: React.FC<LayoutProps> = ({ children, title }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !((dropdownRef.current as any).contains(event.target))) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const confirmLogout = () => {
    setOpenModal(true)
  }
  const logout = async () => {
    setOpenModal(false);

    authService.logout();
    dispatch({ type: 'LOGOUT' });

    navigate('/backoffice')
  }

  const modalConfirm = () => {
    return (
      <>
        <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <RiErrorWarningLine className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to logout?
              </h3>
              <div className="flex justify-center gap-4">
                <Button color="failure" onClick={() => logout()}>
                  {"Yes, I'm sure"}
                </Button>
                <Button color="gray" onClick={() => setOpenModal(false)}>
                  No, cancel
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="p-4 space-y-4 overflow-y-auto bg-white w-64">
        <h2 className="text-xl font-semibold flex items-center">
          <img src={process.env.PUBLIC_URL + '/logo192.png'} alt="React Logo" className="rounded-full w-10 h-10 me-1" />
          Simple CRUD
        </h2>
        <nav className='text-sm'>
          <div className="text-gray-500 text-xs font-semibold px-3 py-2">Menu</div>
          <Link to="/backoffice/dashboard" className="block py-2 px-4 rounded transition duration-200 hover:bg-blue-500 hover:text-white flex items-center">
            <RiHome3Line size="14px" className="me-2" />
            Dashboard
          </Link>
          <Link to="/backoffice/users" className="block py-2 px-4 rounded transition duration-200 hover:bg-blue-500 hover:text-white flex items-center">
            <RiUserLine size="14px" className="me-2" />
            User
          </Link>
          <Link to="/backoffice/posts" className="block py-2 px-4 rounded transition duration-200 hover:bg-blue-500 hover:text-white flex items-center">
            <RiNewspaperLine size="14px" className="me-2" />
            Post
          </Link>
        </nav>
      </div>
      <div className="flex flex-col flex-1">
        <header className="py-2 px-4 bg-white text-black flex justify-between items-center">
          {title}
          <div className="relative inline-block text-left" ref={dropdownRef}>
            <div>
              <button type="button" onClick={toggleDropdown} className="inline-flex items-center justify-center w-full rounded-md px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">
                <img src={process.env.PUBLIC_URL + '/logo192.png'} alt="React Logo" className="rounded-full w-8 h-8 shadow" />
                <span className="ml-2">{user.name}</span>
              </button>
            </div>

            {dropdownOpen && (
              <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Profile</a>
                  <span
                    onClick={confirmLogout}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
                    role="menuitem">
                    Logout
                  </span>
                </div>
              </div>
            )}
          </div>
        </header>
        <main className="p-4 overflow-y-auto">
          <h2 className="text-lg font-semibold mb-3">{title}</h2>
          {children}
        </main>
      </div>

      {modalConfirm()}
    </div>
  );
};

export default BackofficeLayout;