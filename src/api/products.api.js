import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL; // http://localhost:4000/api/v1

// Get all products
export const getAllProducts = async () => {
  const res = await axios.get(`${BASE_URL}/product`);
  return res.data.products;
};

// Get a single product by ID
export const getProductById = async (id) => {
  const res = await axios.get(`${BASE_URL}/product/${id}`);
  return res.data;
};

// Create a new product
export const createProduct = async (productData, token) => {
  const res = await axios.post(`${BASE_URL}/products`, productData, {
    headers: { Authorization: `Bearer ${token}` } // for protected routes
  });
  return res.data;
};
