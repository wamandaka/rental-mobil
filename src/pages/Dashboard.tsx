// import Navbar from "../components/Navbar";

// import { useState } from "react";
import Sidebar from "../components/Dashboard/Sidebar";
import TableCars from "../components/Dashboard/TableCars";
import TableOrders from "../components/Dashboard/TableOrders";
import { useSearchParams } from "react-router-dom";
const sidebarItems = [
  {
    id: 1,
    name: "Cars",
    href: "#",
  },
  {
    id: 2,
    name: "Orders",
    href: "#",
  },
];
const Dashboard = () => {
  //   const [activeTab, setActiveTab] = useState("cars");
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "cars"; // Default to "cars" if no tab is set

  const handleTabChange = (tab: string) => {
    setSearchParams({ tab }); // Update the query parameter
  };

  return (
    <div>
      {/* <Navbar /> */}
      <Sidebar
        sidebarItems={sidebarItems}
        onTabChange={handleTabChange}
        activeTab={activeTab}
      />

      {/* table */}
      {activeTab === "cars" ? (
        <>
          <TableCars />
        </>
      ) : (
        <>
          <TableOrders />
        </>
      )}
    </div>
  );
};

export default Dashboard;
