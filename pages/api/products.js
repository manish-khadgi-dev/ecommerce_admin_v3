import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
export default async function handle(req, res) {
  const { method } = req;

  await mongooseConnect();
  if (method === "POST") {
    res.json("post");
  }
}
