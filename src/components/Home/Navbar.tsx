import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";

const Navigation = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "All Cars",
    path: "/all-cars",
  },
];

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const toggleNav = () => {
    setNav(!nav);

    if (!nav) {
      // Tambahkan kelas no-scroll ke body
      document.body.classList.add("no-scroll");
    } else {
      // Hapus kelas no-scroll dari body
      document.body.classList.remove("no-scroll");
    }
  };
  return (
    <div>
      <header className="bg-white lg:absolute top-0 left-0 right-0 z-50">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-24 items-center justify-between">
            <div className="md:flex md:items-center md:gap-12">
              <Link className="block text-sky-600" to={"/"}>
                <span className="sr-only">Home</span>
                <span className="text-3xl font-bold">RENTCAR</span>
              </Link>
            </div>

            <div className="hidden md:block">
              <nav aria-label="Global">
                <ul className="flex items-center gap-6 text-sm">
                  {Navigation.map((navItem, index) => {
                    return (
                      <li key={index}>
                        <Link
                          to={navItem.path}
                          className="text-gray-500 transition hover:text-gray-500/75"
                        >
                          {navItem.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>

            {/* button menu */}
            <div className="block md:hidden">
              <button
                onClick={toggleNav}
                className="rounded-sm bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="md:hidden">
            <div
              className={`fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-white/20 bg-opacity-50 px-10 py-16 transition-all duration-300 ease-in-out backdrop-blur-lg ${
                nav ? "translate-x-0" : "-translate-x-full"
              }`}
            >
              <button
                onClick={toggleNav}
                className="absolute top-5 right-1 p-4"
              >
                <IoMdClose size={30} />
              </button>
              <nav aria-label="Global">
                <ul className="flex flex-col items-center gap-10 text-sm font-medium">
                  {Navigation.map((navItem, index) => {
                    return (
                      <li key={index}>
                        <Link
                          to={navItem.path}
                          onClick={toggleNav}
                          className="text-sky-500 text-shadow-2xs text-lg transition hover:text-gray-500/75 underline"
                        >
                          {navItem.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
