import { mongooseConnect } from '@/lib/mongoose';
import { isAdminRequest } from './auth/[...nextauth]';
import { Order } from '@/models/Order';

export default async function handler(req, res) {
  await mongooseConnect();
  await isAdminRequest(req, res);

  //get request
  res.json(await Order.find().sort({ createdAt: -1 }));
}
