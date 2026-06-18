import axios from "axios";

// Simple in-memory cache — revisiting /shop in the same session is instant
let productsCache = null;

export const getAllProducts = async () => {
    if (productsCache) {
        return productsCache;
    }
    try {
        const res = await axios.get(
            `https://dummyjson.com/products?limit=40&skip=90&select=id,title,price,thumbnail,images,category,rating`
        );
        productsCache = res.data.products;
        return productsCache;
    } catch (e) {
        console.error("Error fetching products ->", e);
        throw new Response("Failed to load products. Please try again.", { status: 503 });
    }
};

export const fetchProduct = async ({ params }) => {
    const { id } = params;
    try {
        const res = await axios.get(`https://dummyjson.com/products/${id}`);
        const product = res.data;

        // Get related products: check cache first, else call category API
        let related = [];
        if (productsCache) {
            related = productsCache
                .filter(p => p.category === product.category && p.id !== product.id)
                .slice(0, 4);
        } else {
            const catRes = await axios.get(
                `https://dummyjson.com/products/category/${product.category}?limit=5&select=id,title,price,thumbnail,images,category,rating`
            );
            related = catRes.data.products.filter(p => p.id !== product.id).slice(0, 4);
        }

        return { product, related };
    } catch (e) {
        console.error("Error fetching product ->", e);
        throw new Response("Failed to load product.", { status: 404 });
    }
};
