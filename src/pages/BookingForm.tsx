import { useParams } from "react-router-dom";
import Navbar from "../components/Home/Navbar";
import { useEffect, useState } from "react";
import Footer from "../components/Home/Footer";
import { getCarById } from "../sevice/service";
import CarImgFallback from "../assets/CarImageFallback.jpg";
import { toast, ToastContainer } from "react-toastify";
import type { Car } from "../types/car.types";
interface BookingFormProps {
  pickup_date: string;
  pickup_location: string;
  dropoff_date: string;
  dropoff_location: string;
}

const BookingForm = () => {
  const param = useParams();
  const idCar = param.id;
  const [formBooking, setFormBooking] = useState<BookingFormProps>({
    pickup_date: "",
    pickup_location: "",
    dropoff_date: "",
    dropoff_location: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dataCar, setDataCar] = useState<Car>({
    id: 0,
    name: "",
    day_rate: 0,
    month_rate: 0,
    image: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormBooking((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (error) {
      setError("");
    }
  };

  const validateForm = (): string | null => {
    // Check if all fields are filled
    if (
      !formBooking.pickup_date ||
      !formBooking.pickup_location ||
      !formBooking.dropoff_date ||
      !formBooking.dropoff_location
    ) {
      return "All fields are required.";
    }

    // Validate pickup location (minimum 3 characters)
    if (formBooking.pickup_location.trim().length < 3) {
      return "Pickup location must be at least 3 characters long.";
    }

    // Validate dropoff location (minimum 3 characters)
    if (formBooking.dropoff_location.trim().length < 3) {
      return "Dropoff location must be at least 3 characters long.";
    }

    // Validate dates
    const pickupDate = new Date(formBooking.pickup_date);
    const dropoffDate = new Date(formBooking.dropoff_date);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to start of day

    // Check if pickup date is not in the past
    if (pickupDate < today) {
      return "Pickup date cannot be in the past.";
    }

    // Check if dropoff date is after pickup date
    if (dropoffDate <= pickupDate) {
      return "Dropoff date must be after pickup date.";
    }

    // Check if booking period doesn't exceed reasonable limit (e.g., 1 year)
    const oneYearFromNow = new Date();
    oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);

    if (pickupDate > oneYearFromNow || dropoffDate > oneYearFromNow) {
      return "Booking dates cannot be more than 1 year from now.";
    }

    return null; // No validation errors
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Validate car ID
      if (!idCar || idCar == "" || isNaN(Number(idCar))) {
        throw new Error("Invalid car ID");
      }

      // Validate form fields
      const validationError = validateForm();
      if (validationError) {
        setError(validationError);
        setLoading(false);
        return; // Early return to prevent API call
      }

      const resp = await fetch(`${import.meta.env.VITE_API_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formBooking,
          pickup_location: formBooking.pickup_location.trim(),
          dropoff_location: formBooking.dropoff_location.trim(),
          car_id: Number(idCar), // Ensure it's a number
          order_date: new Date().toISOString().split("T")[0],
        }),
      });

      if (!resp.ok) {
        const errorData = await resp.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to submit booking form");
      }

      const responseData = await resp.json();
      console.log("Booking successful:", responseData);

      toast.success("Booking successful! Redirecting to homepage...");

      setTimeout(() => {
        window.location.href = "/";
      }, 3000);
    } catch (err) {
      console.error("Booking error:", err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to submit booking form. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check if idCar is valid
    if (!idCar || idCar == null || isNaN(Number(idCar))) {
      window.location.href = "/";
    }

    const fetchDataCar = async () => {
      try {
        await getCarById(Number(idCar))
          .then((data) => {
            console.log("Fetched car data:", data);

            setDataCar(data);
          })
          .catch((error) => {
            console.error("Error fetching car data:", error);
            setError("Failed to fetch car details. Please try again later.");
          });
      } catch (error) {
        console.error("Error fetching car data:", error);
        setError("Failed to fetch car details. Please try again later.");
      }
    };
    fetchDataCar();
  }, [idCar]);

  // Helper function to get minimum date (today)
  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  // Helper function to get minimum dropoff date (pickup + 1 day)
  const getMinDropoffDate = () => {
    if (formBooking.pickup_date) {
      const pickupDate = new Date(formBooking.pickup_date);
      pickupDate.setDate(pickupDate.getDate() + 1);
      return pickupDate.toISOString().split("T")[0];
    }
    return getMinDate();
  };

  return (
    <div>
      <Navbar />
      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8 lg:mt-32">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
              <strong className="font-bold">Error:</strong>
              <span className="block sm:inline"> {error}</span>
            </div>
          )}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:items-center md:gap-8">
            <div>
              <form onSubmit={handleSubmit}>
                <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl mb-5">
                  Booking Form
                </h2>

                {/* pickup date */}
                <div className="max-w-sm mb-4">
                  <label
                    htmlFor="pickupDate"
                    className="block text-sm font-medium mb-2"
                  >
                    Pickup Date *
                  </label>
                  <input
                    onChange={handleInputChange}
                    value={formBooking.pickup_date}
                    type="date"
                    id="pickupDate"
                    name="pickup_date"
                    min={getMinDate()}
                    // required
                    className="py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                  />
                </div>

                {/* pickup location */}
                <div className="max-w-sm mb-4">
                  <label
                    htmlFor="pickupLocation"
                    className="block text-sm font-medium mb-2"
                  >
                    Pickup Location *
                  </label>
                  <input
                    onChange={handleInputChange}
                    value={formBooking.pickup_location}
                    type="text"
                    id="pickupLocation"
                    name="pickup_location"
                    minLength={3}
                    maxLength={100}
                    // required
                    className="py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                    placeholder="Enter pickup location (min. 3 characters)"
                  />
                </div>

                {/* dropoff date */}
                <div className="max-w-sm mb-4">
                  <label
                    htmlFor="dropoffDate"
                    className="block text-sm font-medium mb-2"
                  >
                    Dropoff Date *
                  </label>
                  <input
                    onChange={handleInputChange}
                    value={formBooking.dropoff_date}
                    type="date"
                    id="dropoffDate"
                    name="dropoff_date"
                    min={getMinDropoffDate()}
                    // required
                    className="py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                  />
                </div>

                {/* dropoff location */}
                <div className="max-w-sm mb-4">
                  <label
                    htmlFor="dropoffLocation"
                    className="block text-sm font-medium mb-2"
                  >
                    Dropoff Location *
                  </label>
                  <input
                    onChange={handleInputChange}
                    value={formBooking.dropoff_location}
                    type="text"
                    id="dropoffLocation"
                    name="dropoff_location"
                    minLength={3}
                    maxLength={100}
                    // required
                    className="py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                    placeholder="Enter dropoff location (min. 3 characters)"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-block rounded bg-indigo-600 px-6 py-3 text-white font-medium transition-colors hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200 cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
                >
                  {loading ? "Submitting..." : "Submit Booking"}
                </button>
              </form>
            </div>

            <div>
              <img
                src={dataCar.image ? dataCar.image : CarImgFallback}
                className="rounded"
                alt="Car rental booking"
              />
            </div>
          </div>
        </div>
      </section>
      <ToastContainer position="top-right" autoClose={3000} />
      <Footer />
    </div>
  );
};

export default BookingForm;
