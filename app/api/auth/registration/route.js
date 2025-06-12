import { registration } from "@/controllers/authController";

export async function POST(req) {
    return await registration(req);
}