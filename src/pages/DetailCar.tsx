import { useEffect, useState } from "react";
import type { Car } from "../types/car.types";
import { Link, useParams } from "react-router-dom";
import { getCarById } from "../sevice/service";
import CarImgFallback from "../assets/CarImageFallback.jpg";

const DetailCar = () => {
  const [dataCar, setDataCar] = useState<Car | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCarById(Number(id));
        setDataCar(response);
      } catch (error) {
        console.error("Error fetching car details:", error);
      }
    };
    if (id) {
      fetchData();
    }
  }, [id]);

  return (
    <div className="container mx-auto px-4 py-8 pt-24 w-full ">
      <div>
        <Link
          to={"/dashboard?tab=cars"}
          className="my-5  items-center gap-4 inline-flex text-sky-500 text-lg"
        >
          <span>{"<"}</span>Back
        </Link>
      </div>
      <div className="flow-root">
        <dl className="-my-3 divide-y divide-gray-200 rounded border border-gray-200 text-sm">
          <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">ID Car</dt>

            <dd className="text-gray-700 sm:col-span-2">{id}</dd>
          </div>

          <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">Car Name</dt>

            <dd className="text-gray-700 sm:col-span-2">{dataCar?.name}</dd>
          </div>

          <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">Day Rate</dt>

            <dd className="text-gray-700 sm:col-span-2">{dataCar?.day_rate}</dd>
          </div>

          <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">Month Rate</dt>

            <dd className="text-gray-700 sm:col-span-2">
              {dataCar?.month_rate}
            </dd>
          </div>

          <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">Image</dt>

            <dd className="text-gray-700 sm:col-span-2">
              <img
                src={dataCar?.image ? dataCar.image : CarImgFallback}
                alt={dataCar?.name ? dataCar.name : "Car Image"}
                className="h-56 w-full lg:w-md rounded-md object-cover"
              />
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default DetailCar;
