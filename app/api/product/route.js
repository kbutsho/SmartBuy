import { createProduct } from "@/controllers/ProductController";

export async function POST(req) {
    return await createProduct(req);
}