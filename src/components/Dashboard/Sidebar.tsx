import { useState } from "react";
import { IoMdClose, IoMdMenu } from "react-icons/io";
import { Link } from "react-router-dom";

interface SidebarProps {
  sidebarItems: { id: number; name: string; href: string }[];
  onTabChange: (tab: string) => void;
  activeTab: string | null;
}

const Sidebar: React.FC<SidebarProps> = ({
  sidebarItems,
  onTabChange,
  activeTab,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const handleTabChange = (tab: string) => {
    toggleSidebar();
    onTabChange(tab);
  };
  return (
    <div>
      <div className="p-4 rounded-md flex items-center justify-end py-5 lg:hidden">
        <button onClick={toggleSidebar}>
          {isSidebarOpen ? <IoMdClose size={25} /> : <IoMdMenu size={25} />}
        </button>
      </div>

      {/* mode dekstop */}
      <div
        className={`hidden lg:flex h-screen flex-col justify-between border-e border-gray-100 bg-white w-64 fixed top-0 left-0 z-50 transition-all duration-300 ease-in-out`}
      >
        <div className="px-4 py-6">
          <Link className="block text-sky-600" to={"/"}>
            <span className="sr-only">Home</span>
            <span className="text-3xl font-bold">RENTCAR</span>
          </Link>

          <ul className="mt-6 space-y-1">
            {sidebarItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => onTabChange(item.name.toLowerCase())}
                  className={`block rounded-lg px-4 py-2 text-sm font-medium w-full text-start ${
                    activeTab === item.name.toLowerCase()
                      ? "bg-gray-100 text-gray-700"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                  }`}
                >
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
        {/* <button onClick={toggleSidebar}>close</button> */}
      </div>

      {/* mode hp and tablet */}
      <div
        className={`flex h-screen flex-col justify-between border-e border-gray-100 bg-white w-64 fixed top-0 left-0 z-50 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="px-4 py-6">
          <Link className="block text-sky-600" to={"/"}>
            <span className="sr-only">Home</span>
            <span className="text-3xl font-bold">RENTCAR</span>
          </Link>

          <ul className="mt-6 space-y-1">
            {sidebarItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleTabChange(item.name.toLowerCase())}
                  className={`block rounded-lg px-4 py-2 text-sm font-medium w-full text-start ${
                    activeTab === item.name.toLowerCase()
                      ? "bg-gray-100 text-gray-700"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                  }`}
                >
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
        {/* <button onClick={toggleSidebar}>close</button> */}
      </div>
    </div>
  );
};

export default Sidebar;
