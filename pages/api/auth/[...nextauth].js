import clientPromise from '@/lib/mongodb';
import NextAuth, { getServerSession } from 'next-auth';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';

import GoogleProvider from 'next-auth/providers/google';

const adminEmail = ['manishkhadgi123@gmail.com'];

export const adminOption = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    session: ({ session, token, user }) => {
      if (adminEmail.includes(session?.user?.email)) {
        return session;
      } else {
        return ' Unsuccessful, Please login Using Admin Details';
      }
    },
  },
};

export default NextAuth(adminOption);

export async function isAdminRequest(req, res) {
  const session = await getServerSession(req, res, adminOption);
  if (!adminEmail.includes(session?.user?.email)) {
    res.status(401);
    res.end();
    throw 'Not an Admin';
  }
}
