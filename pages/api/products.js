import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
export default async function handle(req, res) {
  const { method } = req;

  await mongooseConnect();

  //-------------------------------------//
  //get request
  if (method === "GET") {
    if (req.query?.id) {
      res.json(await Product.findOne({ _id: req.query.id }));
    } else {
      res.json(await Product.find());
    }
  }
  //-------------------------------------//

  //Post request
  if (method === "POST") {
    const { title, description, price } = req.body;

    const ProductDoc = await Product.create({
      title,
      description,
      price,
    });
    res.json(ProductDoc);
  }
  //-------------------------------------//
  //PUT request
  if (method === "PUT") {
    const { title, description, price, _id } = req.body;
    await Product.updateOne({ _id }, { title, description, price });
    res.json(true);
  }

  ///--------------Delete Product---------------------//
  if (method === "DELETE") {
    if (req.query?.id) {
      await Product.deleteOne({ _id: req.query?.id });
      res.json(true);
    }
  }

  //-----------------------------------------------//
}
