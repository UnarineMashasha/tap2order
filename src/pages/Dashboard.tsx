import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getDashboardStats } from "../services/dashboard";

type Order = {
  _id: string;
  customer: string;
  item: string;
  total: number;
  status: string;
};

type DashboardStats = {
  totalOrders: number;
  totalProducts: number;
  totalCustomers: number;
  totalRevenue: number;
  recentOrders: Order[];
};

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);

  const fetchStats = async () => {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load dashboard stats");
    }
  };
  useEffect(() => {
    const loadStats = async () => {
      await fetchStats();
    };

    loadStats();
  }, []);
  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold text-textmain">Welcome back 👋</h1>
        <p className="text-gray-500 mt-2">
          Here’s what’s happening with your Tap2Order business today.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <p className="text-sm text-gray-500">Total Orders</p>
          <h2 className="text-3xl font-bold text-textmain mt-2">
            {stats?.totalOrders ?? 0}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <p className="text-sm text-gray-500">Revenue</p>
          <h2 className="text-3xl font-bold text-textmain mt-2">
            R{(stats?.totalRevenue ?? 0).toFixed(2)}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <p className="text-sm text-gray-500">Products</p>
          <h2 className="text-3xl font-bold text-textmain mt-2">
            {stats?.totalProducts ?? 0}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <p className="text-sm text-gray-500">Customers</p>
          <h2 className="text-3xl font-bold text-textmain mt-2">
            {stats?.totalCustomers ?? 0}
          </h2>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm mt-8 p-6">
        <h3 className="font-bold text-textmain">Recent Orders</h3>
        <p className="text-sm text-gray-500 mt-1">
          Latest customer activity from your business.
        </p>

        <div className="mt-5 divide-y divide-gray-100">
          {stats?.recentOrders?.map((order) => (
            <div
              key={order._id}
              className="py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3"
            >
              <div>
                <p className="font-semibold text-textmain">{order.item}</p>
                <p className="text-sm text-gray-500">{order.customer}</p>
              </div>

              <div className="flex items-center gap-4">
                <p className="font-semibold text-textmain">
                  R{order.total.toFixed(2)}
                </p>

                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-[#4F46E5]">
                  {order.status}
                </span>
              </div>
            </div>
          ))}

          {stats?.recentOrders?.length === 0 && (
            <div className="py-8 text-center text-gray-500">
              No recent orders yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
