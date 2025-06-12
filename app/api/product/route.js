import { createProduct, getAllProducts } from "@/controllers/ProductController";

export async function POST(req) {
    return await createProduct(req);
}

export async function GET() {
    return await getAllProducts();
}