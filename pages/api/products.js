import { mongooseConnect } from '@/lib/mongoose';
import { Product } from '@/models/Product';
import { isAdminRequest } from './auth/[...nextauth]';
export default async function handle(req, res) {
  const { method } = req;

  await mongooseConnect();
  await isAdminRequest(req, res);

  //-------------------------------------//
  //get request
  if (method === 'GET') {
    if (req.query?.id) {
      res.json(await Product.findOne({ _id: req.query.id }));
    } else {
      res.json(await Product.find());
    }
  }
  //-------------------------------------//

  //Post request
  if (method === 'POST') {
    const { title, description, price, images, category, properties } =
      req.body;

    const ProductDoc = await Product.create({
      title,
      description,
      price,
      images,
      category,
      properties,
    });
    res.json(ProductDoc);
  }
  //-------------------------------------//
  //PUT request
  if (method === 'PUT') {
    const { title, description, price, images, category, properties, _id } =
      req.body;
    await Product.updateOne(
      { _id },
      { title, description, price, images, category, properties }
    );
    res.json(true);
  }

  ///--------------Delete Product---------------------//
  if (method === 'DELETE') {
    if (req.query?.id) {
      await Product.deleteOne({ _id: req.query?.id });
      res.json(true);
    }
  }

  //-----------------------------------------------//
}
