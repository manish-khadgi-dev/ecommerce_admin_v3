import { mongooseConnect } from '@/lib/mongoose';
import { Category } from '@/models/Category';

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();

  //==========GET REQUEST==========
  if (method === 'GET') {
    res.json(await Category.find().populate('parent'));
  }

  //=======POST REQUEST=========

  if (method === 'POST') {
    const { name, parentCategory } = req.body;

    const categoryDoc = await Category.create({
      name,
      parent: parentCategory,
    });
    res.json(categoryDoc);
  }
  //=============PUT==================
  if (method === 'PUT') {
    const { name, parentCategory, _id } = req.body;

    const categoryDoc = await Category.updateOne(
      { _id },
      {
        name,
        parent: parentCategory,
      }
    );
    res.json(categoryDoc);
  }
}
