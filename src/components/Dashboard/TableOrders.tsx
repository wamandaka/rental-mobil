import { useEffect, useState } from "react";
import { getAllOrders } from "../../sevice/service";
import { Link } from "react-router-dom";
import { IoMdEye } from "react-icons/io";
import { MdDelete, MdEdit } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
interface Order {
  id: string;
  car_id: string;
  order_date: string;
  pickup_date: string;
  dropoff_date: string;
  pickup_location: string;
  dropoff_location: string;
}

const TableOrders = () => {
  const [dataOrders, setDataOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Jumlah item per halaman
  const [editData, setEditData] = useState<Order | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEdit = (order: Order) => {
    setEditData(order);
    setIsEditModalOpen(true);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editData) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/orders/${editData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update order");
      }

      const updatedOrder = await response.json();

      // Perbarui state lokal
      setDataOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === updatedOrder.id ? updatedOrder : order
        )
      );

      toast.success("Order updated successfully");
      setTimeout(() => {
        setIsEditModalOpen(false); // Tutup modal
      }, 2000);
    } catch (error) {
      console.error("Error updating order:", error);
      alert("Failed to update order.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const resp = await getAllOrders(); // Assuming getAllOrders is defined
        console.log(resp);
        setDataOrders(resp);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = dataOrders.slice(indexOfFirstItem, indexOfLastItem);
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  const handleNextPage = () => {
    if (currentPage < Math.ceil(dataOrders.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const getPaginationRange = () => {
    const totalPages = Math.ceil(dataOrders.length / itemsPerPage);
    const range = [];
    const delta = 2; // Jumlah halaman di sekitar halaman saat ini

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 || // Halaman pertama
        i === totalPages || // Halaman terakhir
        (i >= currentPage - delta && i <= currentPage + delta) // Halaman di sekitar halaman saat ini
      ) {
        range.push(i);
      } else if (
        range[range.length - 1] !== "..." // Tambahkan "..." jika belum ada
      ) {
        range.push("...");
      }
    }

    return range;
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/orders/${id}`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to delete order");
        }
        setDataOrders(
          dataOrders.filter((order: Order) => order.id !== id.toString())
        );
      } catch (error) {
        console.error("Error deleting order:", error);
      }
    }
  };

  return (
    <div>
      <div className="px-4 lg:px-0 lg:pl-72 lg:pr-10 lg:pt-24">
        <h1 className="text-2xl font-bold mb-5">Orders</h1>
        {loading ? (
          <p className="min-h-screen">loading....</p>
        ) : (
          <div className="flex flex-col">
            <div className="-m-1.5 overflow-x-auto">
              <div className="p-1.5 min-w-full inline-block align-middle">
                <div className="border border-gray-200 overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                        >
                          Order ID
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                        >
                          Car ID
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                        >
                          Order Date
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                        >
                          Pickup Date
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                        >
                          Dropoff Date
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                        >
                          Pickup Location
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                        >
                          Dropoff Location
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase"
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {currentData.map((order: Order) => {
                        return (
                          <tr key={order.id} className="hover:bg-gray-100">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                              {order.id ? order.id : "ID Order"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 max-w-24 overflow-hidden">
                              {order.car_id ? order.car_id : "ID Car"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 max-w-32 overflow-hidden">
                              {order.order_date
                                ? order.order_date.length > 10
                                  ? `${order.order_date.slice(0, 10)}...`
                                  : order.order_date
                                : "Order Date"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 max-w-32 overflow-hidden">
                              {order.pickup_date
                                ? order.pickup_date.length > 10
                                  ? `${order.pickup_date.slice(0, 10)}...`
                                  : order.pickup_date
                                : "Order Date"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 max-w-32 overflow-hidden">
                              {order.dropoff_date
                                ? order.dropoff_date.length > 10
                                  ? `${order.dropoff_date.slice(0, 10)}...`
                                  : order.dropoff_date
                                : "Order Date"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                              {order.pickup_location
                                ? order.pickup_location
                                : "Pickup Location"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                              {order.dropoff_location
                                ? order.dropoff_location
                                : "Dropoff Location"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                              <Link
                                to={`/dashboard/order/${order.id}`}
                                className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-hidden focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                              >
                                <IoMdEye size={25} className="text-sky-500" />
                              </Link>

                              <button
                                type="button"
                                onClick={() => handleEdit(order)}
                                className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-hidden focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                              >
                                <MdEdit size={25} className="text-yellow-500" />
                              </button>

                              <button
                                onClick={() => handleDelete(Number(order.id))}
                                type="button"
                                className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-hidden focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                              >
                                <MdDelete size={25} className="text-red-500" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            {/* pagination */}
            <div className="flex justify-center my-4">
              <ul className="flex justify-center flex-wrap space-y-3 text-gray-900">
                {/* Tombol Previous */}
                <li>
                  <button
                    disabled={currentPage === 1}
                    onClick={handlePreviousPage}
                    className="grid size-12 place-content-center rounded border border-gray-200 transition-colors hover:bg-gray-300 rtl:rotate-180 cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
                    aria-label="Previous page"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </li>

                {/* Tombol Halaman */}
                {getPaginationRange().map((page, index) => (
                  <li key={index}>
                    {page === "..." ? (
                      <span className="size-12 rounded flex items-center justify-center text-gray-800 cursor-default">
                        ...
                      </span>
                    ) : (
                      <button
                        onClick={() => handlePageChange(page as number)}
                        className={`size-12 mx-1 rounded hover:bg-blue-600 hover:text-white cursor-pointer ${
                          currentPage === page
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 text-gray-800"
                        }`}
                      >
                        {page}
                      </button>
                    )}
                  </li>
                ))}

                {/* Tombol Next */}
                <li>
                  <button
                    disabled={
                      currentPage >= Math.ceil(dataOrders.length / itemsPerPage)
                    }
                    onClick={handleNextPage}
                    className="grid size-12 place-content-center rounded border border-gray-200 transition-colors hover:bg-gray-400 rtl:rotate-180 cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
                    aria-label="Next page"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
      {isEditModalOpen && editData && (
        <div
          className="fixed inset-0 z-50 grid place-content-center bg-black/50 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="editModalTitle"
        >
          <div className="w-full min-w-sm lg:min-w-xl rounded-lg bg-white p-6 shadow-lg">
            <div className="flex items-start justify-between">
              <h2
                id="editModalTitle"
                className="text-xl font-bold text-gray-900 sm:text-2xl"
              >
                Edit Order
              </h2>

              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="-me-4 -mt-4 rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-50 hover:text-gray-600 focus:outline-none"
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="mt-4">
              <form onSubmit={handleUpdate}>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Pickup Date</legend>
                  <input
                    type="date"
                    name="pickup_date"
                    value={editData.pickup_date}
                    onChange={(e) =>
                      setEditData((prev) => ({
                        ...prev!,
                        pickup_date: e.target.value,
                      }))
                    }
                    className="input w-full"
                  />
                </fieldset>

                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Dropoff Date</legend>
                  <input
                    type="date"
                    name="dropoff_date"
                    value={editData.dropoff_date}
                    onChange={(e) =>
                      setEditData((prev) => ({
                        ...prev!,
                        dropoff_date: e.target.value,
                      }))
                    }
                    className="input w-full"
                  />
                </fieldset>

                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Pickup Location</legend>
                  <input
                    type="text"
                    name="pickup_location"
                    value={editData.pickup_location}
                    onChange={(e) =>
                      setEditData((prev) => ({
                        ...prev!,
                        pickup_location: e.target.value,
                      }))
                    }
                    className="input w-full"
                  />
                </fieldset>

                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Dropoff Location</legend>
                  <input
                    type="text"
                    name="dropoff_location"
                    value={editData.dropoff_location}
                    onChange={(e) =>
                      setEditData((prev) => ({
                        ...prev!,
                        dropoff_location: e.target.value,
                      }))
                    }
                    className="input w-full"
                  />
                </fieldset>

                <footer className="mt-6 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="rounded bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                  >
                    Update
                  </button>
                </footer>
              </form>
            </div>
          </div>
        </div>
      )}
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default TableOrders;
