import { createBrand } from "@/controllers/brandController";

export async function POST(req) {
    return await createBrand(req);
}