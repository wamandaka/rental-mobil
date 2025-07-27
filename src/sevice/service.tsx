const BASE_URL = import.meta.env.VITE_API_URL;

export const getAllCars = async () => {
  try {
    const response = await fetch(`${BASE_URL}/cars`);
    if (!response.ok) {
      throw new Error("Failed to fetch cars");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching all cars:", error);
    return [];
  }
};

export const getCarById = async (id: number) => {
  const response = await fetch(`${BASE_URL}/cars/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch car with id ${id}`);
  }
  const data = await response.json();
  return data;
};

export const getAllOrders = async () => {
  const response = await fetch(`${BASE_URL}/orders`);
  if (!response.ok) {
    throw new Error("Failed to fetch orders");
  }
  const data = await response.json();
  return data;
};

export const getOrderById = async (id: number) => {
  const response = await fetch(`${BASE_URL}/orders/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch order with id ${id}`);
  }
  const data = await response.json();
  return data;
}
