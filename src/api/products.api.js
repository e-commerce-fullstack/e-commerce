import api from "./api";

// 1. Get Categories
export const getCategories = async (token) => {
  // Use /products/categories to match Gateway
  const res = await api.get(`/products/categories`, {
    headers: { Authorization: `Bearer ${token}` } 
  });
  return res.data;
};

// 2. Get all products (plural)
export const getAllProducts = async ({ page = 1, limit = 8, search = "", category = "" } = {}) => {
  const res = await api.get("/products", { // <--- Added the 's'
    params: { page, limit, search, category }
  });
  return res.data;
};

// 3. Get a single product by ID
export const getProductById = async (id) => {
  const res = await api.get(`/products/${id}`);
  return res.data;
};

// 4. Create a new product
export const createProduct = async (formData, token) => {
  const res = await api.post(`/products`, formData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

// 5. Update product
export const updateProduct = async (id, formData, token) =>{
    const res = await api.put(`/products/${id}`, formData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
}

// 6. Delete product
export const deleteProduct = async(id, token)=>{
  const res = await api.delete(`/products/${id}`,{
    headers: { Authorization: `Bearer ${token}` } 
  })
  return res.data
}
