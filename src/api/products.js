const BASE_URL = import.meta.env.VITE_BASE_URL || "https://dummyjson.com";

// Fetching all the products/data from the base url

export const fetchProducts = async (limit = 12, skip=0)=>{
    const res = await fetch(`${BASE_URL}/products?limit=${limit}&skip=${skip}`);
    if(!res.ok){
        throw new Error("Failed to fetch products");
    }
    const data = await res.json();
    return data;
}

// Fetching all the categories from the base url

export const fetchCategories = async () =>{
    const res = await fetch(`${BASE_URL}/products/categories`);
    if(!res.ok){
        throw new Error("Failed to fetch categories");
    }
    const data = await res.json();
    return data;
}


// Fetching all the products by category from the base url

export const fetchProductsByCategory = async (category, limit = 100, skip=0) => {
    const res = await fetch(`${BASE_URL}/products/category/${category}?limit=${limit}&skip=${skip}`);
    if(!res.ok){
        throw new Error("Failed to fetch category products")
    }
    const data = await res.json();
    return data;
}

// Fetching single product by ID

export const fetchProductById = async (id) => {
    const res = await fetch(`${BASE_URL}/products/${id}`);
    if(!res.ok){
        throw new Error("Failed to fetch product");
    }
    const data = await res.json();
    return data;
}


// Fetch all the products

export const fetchAllProducts = async () => {
    const res = await fetch(`${BASE_URL}/products?limit=0`);
    if(!res.ok){
        throw new Error("Failed to fetch all products'");
    }
    const data = await res.json();
    return data;
}