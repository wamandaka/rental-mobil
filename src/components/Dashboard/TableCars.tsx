import { useEffect, useState } from "react";
import { getAllCars } from "../../sevice/service";
import type { Car } from "../../types/car.types";
// import CarImgFallback from "../../assets/CarImageFallback.jpg";
import { MdDelete, MdEdit } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import { IoMdEye } from "react-icons/io";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils/formatCurrency";

const TableCars = () => {
  const [dataCars, setDataCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState<Car | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    day_rate: "",
    month_rate: "",
    image: "",
  });
  const API_URL = import.meta.env.VITE_API_URL;
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Jumlah item per halaman
  const [formData, setFormData] = useState({
    name: "",
    day_rate: 0,
    month_rate: 0,
    image: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({
      name: "",
      day_rate: "",
      month_rate: "",
      image: "",
    });
    // Validate form data
    if (
      !formData.name ||
      formData.day_rate <= 0 ||
      formData.month_rate <= 0 ||
      !formData.image
    ) {
      setErrors({
        name: formData.name ? "" : "Name is required",
        day_rate:
          formData.day_rate > 0 ? "" : "Day rate must be greater than 0",
        month_rate:
          formData.month_rate > 0 ? "" : "Month rate must be greater than 0",
        image: formData.image ? "" : "Image URL is required",
      });
      toast.error("Please fill in all fields correctly.");
      return;
    }
    try {
      const response = await fetch(`${API_URL}/cars`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Failed to add new car");
      }
      const newCar = await response.json();
      setDataCars((prevCars) => [...prevCars, newCar]);
      toast.success("New car added successfully!");
      handleOpenModal();
      setFormData({ name: "", day_rate: 0, month_rate: 0, image: "" });
    } catch (error) {
      console.error("Error adding new car:", error);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editData) return;

    try {
      const response = await fetch(`${API_URL}/cars/${editData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editData),
      });

      if (!response.ok) {
        throw new Error("Failed to update car");
      }

      const updatedCar = await response.json();

      // Perbarui state lokal
      setDataCars((prevCars) =>
        prevCars.map((car) => (car.id === updatedCar.id ? updatedCar : car))
      );

      toast.success("Car updated successfully!");
      setIsEditModalOpen(false); // Tutup modal
    } catch (error) {
      console.error("Error updating car:", error);
      toast.error("Failed to update car.");
    }
  };

  const handleEdit = (car: Car) => {
    setEditData(car);
    setIsEditModalOpen(true);
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const resp = await getAllCars();
      console.log(resp);
      setDataCars(resp);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    // Implement delete functionality here
    console.log(`Delete car with id: ${id}`);
    if (window.confirm("Are you sure you want to delete this car?")) {
      try {
        const resp = await fetch(`${API_URL}/cars/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!resp.ok) {
          throw new Error("Failed to delete car");
        }
        await fetchData(); // Refresh the data after deletion
      } catch (error) {
        console.error("Error deleting car:", error);
      }
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = dataCars.slice(indexOfFirstItem, indexOfLastItem);
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  const handleNextPage = () => {
    if (currentPage < Math.ceil(dataCars.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleOpenModal = () => {
    setOpenModal(!openModal);
    // setFormData({ name: "", day_rate: 0, month_rate: 0, image: "" });
    setErrors({
      name: "",
      day_rate: "",
      month_rate: "",
      image: "",
    });
  };
  return (
    <div>
      <div className="px-4 lg:px-0 lg:pl-72 lg:pr-10 pt-10 lg:pt-24">
        <h1 className="text-2xl font-bold">Cars</h1>
        {/* Open the modal using document.getElementById('ID').showModal() method */}
        <button
          className="btn my-5 bg-blue-500 text-white"
          onClick={handleOpenModal}
        >
          Add New Car
        </button>
        {loading ? (
          <>
            <p className="min-h-screen">loading...</p>
          </>
        ) : (
          <>
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
                            Car ID
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                          >
                            Car Name
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                          >
                            Day Rate
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                          >
                            Month Rate
                          </th>
                          {/* <th
                            scope="col"
                            className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                          >
                            Image
                          </th> */}
                          <th
                            scope="col"
                            className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase"
                          >
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {currentData.map((car: Car) => {
                          return (
                            <tr className="hover:bg-gray-100" key={car.id}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                                {car.id ? car.id : "ID Car"}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                                {car.name ? car.name : "Name Car"}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                {car.day_rate
                                  ? formatCurrency(car.day_rate)
                                  : "Rp 0"}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                {car.month_rate
                                  ? formatCurrency(car.month_rate)
                                  : "Rp 0"}
                              </td>
                              {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                <img
                                  src={car.image ? car.image : CarImgFallback}
                                  alt={car.name ? car.name : "Car Image"}
                                  className="h-16 w-16 object-cover rounded-md"
                                />
                              </td> */}
                              <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium gap-2 flex justify-end items-center">
                                {/* <div className="flex justify-center items-center"> */}
                                <Link
                                  to={`/dashboard/car/${car.id}`}
                                  className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-hidden focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                                >
                                  <IoMdEye size={25} className="text-sky-500" />
                                </Link>

                                <button
                                  type="button"
                                  onClick={() => handleEdit(car)}
                                  className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-hidden focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                                >
                                  <MdEdit
                                    size={25}
                                    className="text-yellow-500"
                                  />
                                </button>

                                <button
                                  onClick={() => handleDelete(Number(car.id))}
                                  type="button"
                                  className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-hidden focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                                >
                                  <MdDelete
                                    size={25}
                                    className="text-red-500"
                                  />
                                </button>
                                {/* </div> */}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="flex justify-center my-4">
                <ul className="flex justify-center gap-1 text-gray-900">
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

                  {Array.from(
                    { length: Math.ceil(dataCars.length / itemsPerPage) },
                    (_, index) => (
                      <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className={`size-12 mx-1 rounded hover:bg-blue-600 hover:text-white cursor-pointer ${
                          currentPage === index + 1
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 text-gray-800"
                        }`}
                      >
                        {index + 1}
                      </button>
                    )
                  )}

                  <li>
                    <button
                      disabled={
                        currentPage >= Math.ceil(dataCars.length / itemsPerPage)
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
          </>
        )}
      </div>
      {openModal && (
        <div
          className="fixed inset-0 z-50 grid place-content-center bg-black/50 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modalTitle"
        >
          <div className="w-full min-w-sm lg:min-w-xl rounded-lg bg-white p-6 shadow-lg">
            <div className="flex items-start justify-between">
              <h2
                id="modalTitle"
                className="text-xl font-bold text-gray-900 sm:text-2xl"
              >
                Add New Car
              </h2>

              <button
                type="button"
                onClick={handleOpenModal}
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
              <form onSubmit={handleSubmit}>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Car Name</legend>
                  <input
                    type="text"
                    onChange={handleInputChange}
                    name="name"
                    value={formData.name}
                    className="input w-full"
                    placeholder="Type here"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">{errors.name}</p>
                  )}
                  {/* <p className="label">Optional</p> */}
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Day Rate</legend>
                  <input
                    type="number"
                    onChange={handleInputChange}
                    name="day_rate"
                    value={formData.day_rate}
                    className="input w-full"
                    placeholder="Type here"
                  />
                  {errors.day_rate && (
                    <p className="text-red-500 text-sm">{errors.day_rate}</p>
                  )}
                  {/* <p className="label">Optional</p> */}
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Month Rate</legend>
                  <input
                    type="number"
                    onChange={handleInputChange}
                    name="month_rate"
                    value={formData.month_rate}
                    className="input w-full"
                    placeholder="Type here"
                  />
                  {errors.month_rate && (
                    <p className="text-red-500 text-sm">{errors.month_rate}</p>
                  )}
                  {/* <p className="label">Optional</p> */}
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Image</legend>
                  <input
                    type="url"
                    onChange={handleInputChange}
                    name="image"
                    value={formData.image}
                    className="input w-full"
                    placeholder="Type here"
                  />
                  {errors.image && (
                    <p className="text-red-500 text-sm">{errors.image}</p>
                  )}
                  {/* <p className="label">Optional</p> */}
                </fieldset>
                <footer className="mt-6 flex justify-end gap-2">
                  <button
                    onClick={handleOpenModal}
                    type="button"
                    className="rounded bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                  >
                    Submit
                  </button>
                </footer>
              </form>
            </div>
          </div>
        </div>
      )}

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
                Edit Car
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
                  <legend className="fieldset-legend">Car Name</legend>
                  <input
                    type="text"
                    name="name"
                    value={editData.name}
                    onChange={(e) =>
                      setEditData((prev) => ({
                        ...prev!,
                        name: e.target.value,
                      }))
                    }
                    className="input w-full"
                    placeholder="Type here"
                  />
                </fieldset>

                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Day Rate</legend>
                  <input
                    type="number"
                    name="day_rate"
                    value={editData.day_rate}
                    onChange={(e) =>
                      setEditData((prev) => ({
                        ...prev!,
                        day_rate: Number(e.target.value),
                      }))
                    }
                    className="input w-full"
                    placeholder="Type here"
                  />
                </fieldset>

                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Month Rate</legend>
                  <input
                    type="number"
                    name="month_rate"
                    value={editData.month_rate}
                    onChange={(e) =>
                      setEditData((prev) => ({
                        ...prev!,
                        month_rate: Number(e.target.value),
                      }))
                    }
                    className="input w-full"
                    placeholder="Type here"
                  />
                </fieldset>

                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Image</legend>
                  <input
                    type="url"
                    name="image"
                    value={editData.image}
                    onChange={(e) =>
                      setEditData((prev) => ({
                        ...prev!,
                        image: e.target.value,
                      }))
                    }
                    className="input w-full"
                    placeholder="Type here"
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
      <ToastContainer />
    </div>
  );
};

export default TableCars;
