import { useEffect, useState } from "react";
import { CiUser } from "react-icons/ci";
import { GiGearStickPattern } from "react-icons/gi";
import { Link } from "react-router-dom";
import CarImgFallback from "../../assets/CarImageFallback.jpg";
import { getAllCars } from "../../sevice/service";
import { formatCurrency } from "../../utils/formatCurrency";
interface Car {
  id: string;
  name: string;
  day_rate: number;
  month_rate: number;
  image: string;
}
const PopularDeals = () => {
  const [dataCars, setDataCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const resp = await getAllCars();
        console.log(resp);
        setDataCars(resp.slice(0, 4)); // Ambil 4 data pertama
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [API_URL]);
  return (
    <section id="deals" className="p-4 lg:px-44 max-w-screen-3xl mx-auto">
      <div className="flex justify-center flex-col items-center mb-5">
        <p className="uppercase px-5 text-center py-2 bg-sky-200 text-sky-500 font-medium rounded-md">
          Popular rental cars
        </p>
        <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl mt-5">
          Most popular rental deals
        </h2>
      </div>
      <div>
        {loading ? (
          <div className="flex justify-center items-center h-56">
            <p>Loading...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-8">
            {dataCars.map((car: Car) => (
              <div
                key={car.id}
                className="block rounded-lg p-4 shadow-xs shadow-indigo-100 hover:shadow-xl transition-all duration-300"
              >
                <img
                  src={car.image ? car.image : CarImgFallback}
                  alt={car.name ? car.name : "Car Image"}
                  className="h-56 w-full rounded-md object-cover"
                />

                <div className="mt-2">
                  <dl>
                    <div>
                      <dt className="sr-only">Price</dt>

                      <dd className="text-sm text-gray-500">
                        {car.day_rate ? formatCurrency(car.day_rate) : "RP 0"} /
                        day
                      </dd>
                    </div>

                    <div>
                      <dt className="sr-only">Address</dt>

                      <dd className="font-medium line-clamp-1">
                        {car.name ? car.name : "Name Car"}
                      </dd>
                    </div>
                  </dl>

                  <div className="mt-3 flex items-center gap-8 text-xs">
                    <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                      <CiUser size={25} className="text-blue-800" />

                      <div className="mt-1.5 sm:mt-0">
                        <p className="text-gray-500">Seat</p>

                        <p className="font-medium">3</p>
                      </div>
                    </div>

                    <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                      <GiGearStickPattern size={25} className="text-blue-800" />

                      <div className="mt-1.5 sm:mt-0">
                        <p className="text-gray-500">Transmition</p>

                        <p className="font-medium">Auto</p>
                      </div>
                    </div>
                  </div>

                  <Link
                    to={`/booking-form/${car.id}`}
                    className="group relative inline-flex items-center overflow-hidden rounded-sm bg-indigo-600 px-8 py-3 text-white focus:ring-3 focus:outline-hidden mt-5 w-full justify-center"
                  >
                    <span className="absolute -end-full transition-all group-hover:end-1/3">
                      <svg
                        className="size-5 shadow-sm rtl:rotate-180"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </span>

                    <span className="text-sm font-medium transition-all group-hover:me-4">
                      Book now
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex justify-center mt-10">
        <Link
          to={"/all-cars"}
          className="group relative inline-block text-sm font-medium text-indigo-600 focus:ring-3 focus:outline-hidden"
        >
          <span className="absolute inset-0 translate-x-0.5 translate-y-0.5 bg-indigo-600 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"></span>

          <span className="relative block border border-current bg-white px-8 py-3">
            Show all cars
          </span>
        </Link>
      </div>
    </section>
  );
};

export default PopularDeals;
