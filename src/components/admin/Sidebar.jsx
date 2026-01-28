import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Package,
  Users,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [submenuOpen, setSubmenuOpen] = useState({
    tours: false,
    forms: false,
  });
  const location = useLocation();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleSubmenu = (menu) => {
    setSubmenuOpen({
      ...submenuOpen,
      [menu]: !submenuOpen[menu],
    });
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="fixed top-4 left-4 z-50 md:hidden bg-blue-600 text-white p-2 rounded-md"
        onClick={toggleSidebar}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 border-b">
            <h1 className="text-xl font-bold text-blue-600">
              RRB Vacations, Kashi Admin
            </h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4 px-3">
            <ul className="space-y-2">
              <li>
                <Link
                  to="/admin/dashboard"
                  className={`flex items-center p-2 rounded-lg ${
                    isActive("/admin/dashboard")
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Home size={20} className="mr-3" />
                  <span>Dashboard</span>
                </Link>
              </li>

              {/* Tours submenu */}
              <li>
                <button
                  className={`flex items-center justify-between w-full p-2 rounded-lg text-left ${
                    isActive("/admin/tours") || isActive("/admin/add-tour")
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => toggleSubmenu("tours")}
                >
                  <div className="flex items-center">
                    <Package size={20} className="mr-3" />
                    <span>Tours</span>
                  </div>
                  {submenuOpen.tours ? (
                    <ChevronDown size={16} />
                  ) : (
                    <ChevronRight size={16} />
                  )}
                </button>
                {submenuOpen.tours && (
                  <ul className="pl-10 mt-2 space-y-1">
                    <li>
                      <Link
                        to="/admin/tours"
                        className={`block p-2 rounded-lg ${
                          isActive("/admin/tours")
                            ? "bg-blue-50 text-blue-600"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        All Tours
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/add-tour"
                        className={`block p-2 rounded-lg ${
                          isActive("/admin/add-tour")
                            ? "bg-blue-50 text-blue-600"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        Add New Tour
                      </Link>
                    </li>
                  </ul>
                )}
              </li>

              {/* Forms submenu */}
              <li>
                <button
                  className={`flex items-center justify-between w-full p-2 rounded-lg text-left ${
                    isActive("/admin/tour-forms") ||
                    isActive("/admin/custom-tour-forms") ||
                    isActive("/admin/contact-forms") ||
                    isActive("/admin/newsletter")
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => toggleSubmenu("forms")}
                >
                  <div className="flex items-center">
                    <MessageSquare size={20} className="mr-3" />
                    <span>Form Submissions</span>
                  </div>
                  {submenuOpen.forms ? (
                    <ChevronDown size={16} />
                  ) : (
                    <ChevronRight size={16} />
                  )}
                </button>
                {submenuOpen.forms && (
                  <ul className="pl-10 mt-2 space-y-1">
                    <li>
                      <Link
                        to="/admin/tour-forms"
                        className={`block p-2 rounded-lg ${
                          isActive("/admin/tour-forms")
                            ? "bg-blue-50 text-blue-600"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        Tour Inquiries
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/custom-tour-forms"
                        className={`block p-2 rounded-lg ${
                          isActive("/admin/custom-tour-forms")
                            ? "bg-blue-50 text-blue-600"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        Custom Tour Requests
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/contact-forms"
                        className={`block p-2 rounded-lg ${
                          isActive("/admin/contact-forms")
                            ? "bg-blue-50 text-blue-600"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        Contact Forms
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/newsletter"
                        className={`block p-2 rounded-lg ${
                          isActive("/admin/newsletter")
                            ? "bg-blue-50 text-blue-600"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        Newsletter Subscribers
                      </Link>
                    </li>
                  </ul>
                )}
              </li>

              <li>
                <Link
                  to="/admin/users"
                  className={`flex items-center p-2 rounded-lg ${
                    isActive("/admin/users")
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Users size={20} className="mr-3" />
                  <span>Users</span>
                </Link>
              </li>

              <li>
                <Link
                  to="/admin/settings"
                  className={`flex items-center p-2 rounded-lg ${
                    isActive("/admin/settings")
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Settings size={20} className="mr-3" />
                  <span>Settings</span>
                </Link>
              </li>
            </ul>
          </nav>

          {/* Logout */}
          <div className="p-4 border-t">
            <button className="flex items-center w-full p-2 rounded-lg text-gray-700 hover:bg-gray-100">
              <LogOut size={20} className="mr-3" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
