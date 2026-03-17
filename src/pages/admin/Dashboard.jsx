import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import { toast } from "react-toastify";
import {
  Plus,
  Edit,
  Trash2,
  LogOut,
  Package as PackageIcon,
  Settings,
  X,
  Home,
  Menu,
} from "lucide-react";

const Dashboard = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [creds, setCreds] = useState({
    currentPassword: "",
    newUsername: "",
    newPassword: "",
  });

  const handleUpdateCredentials = async (e) => {
    e.preventDefault();
    try {
      await api.put("/auth/change-credentials", creds);
      toast.success("Credentials updated successfully");
      setShowSettings(false);
      setCreds({ currentPassword: "", newUsername: "", newPassword: "" });
    } catch (err) {
      toast.error(err.response?.data?.msg || "Failed to update credentials");
    }
  };

  useEffect(() => {
    if (!admin) {
      navigate("/admin/login");
      return;
    }
    fetchPackages();
  }, [admin]);

  const fetchPackages = async () => {
    try {
      const res = await api.get("/packages");
      setPackages(res.data);
      setLoading(false);
    } catch (err) {
      toast.error("Failed to fetch packages");
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this package?")) {
      try {
        await api.delete(`/packages/${id}`);
        toast.success("Package deleted successfully");
        setPackages(packages.filter((pkg) => pkg.id !== id));
      } catch (err) {
        toast.error("Failed to delete package");
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  if (loading)
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

  return (
    <div className="h-screen bg-gray-950 text-white flex overflow-hidden">
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-gray-900 border-r border-gray-800 p-6 flex flex-col transform transition-transform duration-300 ease-in-out h-full ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <PackageIcon size={24} className="text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              RRB Admin
            </h1>
          </div>
          <button 
            className="md:hidden text-gray-400 hover:text-white"
            onClick={() => setMobileMenuOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto pr-2">
          <Link
            to="/admin/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-4 py-3 bg-blue-600/10 text-blue-400 rounded-lg border border-blue-600/20"
          >
            <Home size={20} />
            <span>Dashboard</span>
          </Link>
          <Link
            to="/admin/package/new"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-800 text-gray-400 hover:text-white rounded-lg transition-colors group"
          >
            <Plus
              size={20}
              className="group-hover:text-blue-400 transition-colors"
            />
            <span>Add Package</span>
          </Link>
        </nav>

        <div className="mt-auto pt-4 border-t border-gray-800">
          <button
            onClick={() => {
              setShowSettings(true);
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors mb-2"
          >
            <Settings size={20} />
            <span>Settings</span>
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="flex justify-between items-center p-4 md:p-8 shrink-0 mb-4 md:mb-10">
          <div className="flex items-center gap-4">
            <button 
              className="md:hidden text-gray-400 hover:text-white p-2 rounded-lg bg-gray-800 border border-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu size={20} />
            </button>
            <div>
              <h2 className="text-xl md:text-3xl font-bold">Tour Packages</h2>
              <p className="text-gray-400 mt-1 hidden sm:block text-sm md:text-base">
                Manage your website's domestic and international tours
              </p>
            </div>
          </div>
          <Link
            to="/admin/package/new"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg font-medium transition-all shadow-lg shadow-blue-600/20"
          >
            <Plus size={20} />
            <span className="hidden sm:inline">Add New Package</span>
            <span className="sm:hidden">Add</span>
          </Link>
        </header>

        <div className="flex-1 overflow-y-auto px-4 md:px-8 pb-8">
          <div className="bg-gray-900 border border-gray-800 rounded-xl shadow-xl overflow-x-auto">
            <div className="min-w-[800px]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-800/50 border-b border-gray-800">
                  <th className="px-6 py-4 font-semibold text-gray-300">
                    Package Details
                  </th>
                  <th className="px-6 py-4 font-semibold text-gray-300">
                    Category
                  </th>
                  <th className="px-6 py-4 font-semibold text-gray-300">
                    Type
                  </th>
                  <th className="px-6 py-4 font-semibold text-gray-300">
                    Duration
                  </th>
                  <th className="px-6 py-4 font-semibold text-gray-300 text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {packages.map((pkg) => (
                  <tr
                    key={pkg.id}
                    className="hover:bg-gray-800/30 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        {/* Replace image path if needed for display */}
                        <div className="w-12 h-12 rounded-lg bg-gray-800 overflow-hidden shrink-0 border border-gray-700">
                          <img
                            src={
                              pkg.image && pkg.image.startsWith("/uploads")
                                ? `http://localhost:5000${pkg.image}`
                                : pkg.image || "https://placehold.co/150"
                            }
                            alt={pkg.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = "https://placehold.co/150";
                            }}
                          />
                        </div>
                        <div>
                          <div className="font-bold text-white">
                            {pkg.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            {pkg.location}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-300">
                      <span className="px-2 py-1 bg-gray-800 rounded text-xs text-gray-400 border border-gray-700">
                        {pkg.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          pkg.type === "domestic"
                            ? "bg-green-600/10 text-green-400 border border-green-600/20"
                            : "bg-purple-600/10 text-purple-400 border border-purple-600/20"
                        }`}
                      >
                        {pkg.type.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-400">{pkg.duration}</td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-3 text-right">
                        <Link
                          to={`/admin/package/edit/${pkg.id}`}
                          className="p-2 hover:bg-blue-600/10 text-gray-400 hover:text-blue-400 rounded-lg transition-colors border border-transparent hover:border-blue-600/20"
                        >
                          <Edit size={18} />
                        </Link>
                        <button
                          onClick={() => handleDelete(pkg.id)}
                          className="p-2 hover:bg-red-600/10 text-gray-400 hover:text-red-400 rounded-lg transition-colors border border-transparent hover:border-red-600/20"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>
        </div>
      </main>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 w-full max-w-md relative shadow-2xl">
            <button
              onClick={() => setShowSettings(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-white"
            >
              <X size={20} />
            </button>
            <h2 className="text-2xl font-bold mb-6 text-white">
              Admin Settings
            </h2>
            <form onSubmit={handleUpdateCredentials} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Current Password (Required)
                </label>
                <input
                  type="password"
                  required
                  value={creds.currentPassword}
                  onChange={(e) =>
                    setCreds({ ...creds, currentPassword: e.target.value })
                  }
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  New Username (Optional)
                </label>
                <input
                  type="text"
                  value={creds.newUsername}
                  onChange={(e) =>
                    setCreds({ ...creds, newUsername: e.target.value })
                  }
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  New Password (Optional)
                </label>
                <input
                  type="password"
                  value={creds.newPassword}
                  onChange={(e) =>
                    setCreds({ ...creds, newPassword: e.target.value })
                  }
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors mt-4"
              >
                Update Credentials
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
