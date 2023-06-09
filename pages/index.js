import Layout from '@/components/Layout';
import { useSession } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession();

  return (
    <Layout>
      <div className=" text-blue-900 flex justify-between">
        <h1>
          Hello, <b>{session?.user?.name}</b>{' '}
        </h1>
        <div className="flex bg-gray-300 py-1 mb-3 gap-1 text-black  rounded-lg overflow-hidden ">
          <img src={session?.user?.image} alt="" className="w-6 h-6 ml-1" />
          <span className="px-2">{session?.user?.name}</span>
        </div>
      </div>
    </Layout>
  );
}
