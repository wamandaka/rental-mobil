import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import BookingForm from "../pages/BookingForm";
import ListCars from "../pages/ListCars";
import Dashboard from "../pages/Dashboard";
import DetailCar from "../pages/DetailCar";
import DetailOrder from "../pages/DetailOrder";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<p>404 Not found</p>} />
        <Route path="/" element={<Home />} />
        <Route path="/booking-form/:id" element={<BookingForm />} />
        <Route path="/all-cars" element={<ListCars />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/car/:id" element={<DetailCar />} />
        <Route path="/dashboard/order/:id" element={<DetailOrder />} />
        {/* Add other routes here as needed */}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
