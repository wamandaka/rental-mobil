import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getOrderById } from "../sevice/service";
import type { Order } from "../types/order.types";

const DetailOrder = () => {
  const [dataOrder, setDataOrder] = useState<Order | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getOrderById(Number(id));
        setDataOrder(response);
      } catch (error) {
        console.error("Error fetching car details:", error);
      }
    };
    if (id) {
      fetchData();
    }
  }, [id]);
  return (
    <div>
      <div className="container mx-auto px-4 py-8 pt-24 w-full ">
        <div>
          <Link
            to={"/dashboard?tab=orders"}
            className="my-5  items-center gap-4 inline-flex text-sky-500 text-lg"
          >
            <span>{"<"}</span>Back
          </Link>
        </div>
        <div className="flow-root">
          <dl className="-my-3 divide-y divide-gray-200 rounded border border-gray-200 text-sm">
            <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">ID Order</dt>

              <dd className="text-gray-700 sm:col-span-2">{id}</dd>
            </div>
            <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">ID Car</dt>

              <dd className="text-gray-700 sm:col-span-2">
                {dataOrder?.car_id}
              </dd>
            </div>

            <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Order Date</dt>

              <dd className="text-gray-700 sm:col-span-2">
                {dataOrder?.order_date}
              </dd>
            </div>

            <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Pickup Date</dt>

              <dd className="text-gray-700 sm:col-span-2">
                {dataOrder?.pickup_date}
              </dd>
            </div>

            <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Dropoff Date</dt>

              <dd className="text-gray-700 sm:col-span-2">
                {dataOrder?.dropoff_date}
              </dd>
            </div>

            <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Pickup Location</dt>

              <dd className="text-gray-700 sm:col-span-2">
                {dataOrder?.pickup_location}
              </dd>
            </div>

            <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Dropoff Location</dt>

              <dd className="text-gray-700 sm:col-span-2">
                {dataOrder?.dropoff_location}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default DetailOrder;
