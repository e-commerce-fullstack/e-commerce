import axios from "axios";
import { BASE_URL } from "./api";

// 1. Get Categories (Moved this logic up)
export const getCategories = async (token) => {
  // We add a config object to ensure no old tokens interfere
  const res = await axios.get(`${BASE_URL}/product/categories`, {
    headers: { Authorization: `Bearer ${token}` } 
  });
  return res.data;
};

// Get all products with pagination
export const getAllProducts = async ({ page = 1, limit = 8, search = "" , category = "" } = {}) => {
  const res = await axios.get(`${BASE_URL}/product`, {
    params: { page, limit, search, category } // pass page & limit as query params
  });

  // return full response so store can read totalPages and products
  return res.data; // { page, limit, totalPages, totalItems, products }
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


