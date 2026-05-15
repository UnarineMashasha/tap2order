import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  getOrders,
  createOrder,
  updateOrder,
  deleteOrder,
} from "../services/orders";

type Order = {
  _id: string;
  customer: string;
  item: string;
  total: number;
  status: "Pending" | "Preparing" | "Ready" | "Completed";
};

const statusStyles: Record<Order["status"], string> = {
  Pending: "bg-yellow-50 text-yellow-700",
  Preparing: "bg-indigo-50 text-[#4F46E5]",
  Ready: "bg-green-50 text-[#22C55E]",
  Completed: "bg-gray-100 text-gray-600",
};

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOrderId, setEditingOrderId] = useState<string | null>(null);

  const [form, setForm] = useState({
    customer: "",
    item: "",
    total: "",
    status: "Pending" as Order["status"],
  });

  const fetchOrders = async () => {
    try {
      const data = await getOrders();
      setOrders(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch orders");
    }
  };

  useEffect(() => {
    const loadStats = async () => {
      await fetchOrders();
    };

    loadStats();
  }, []);
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order._id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All Statuses" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const resetForm = () => {
    setForm({
      customer: "",
      item: "",
      total: "",
      status: "Pending",
    });

    setEditingOrderId(null);
  };

  const openNewOrderModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const handleEditOrder = (order: Order) => {
    setEditingOrderId(order._id);

    setForm({
      customer: order.customer,
      item: order.item,
      total: String(order.total),
      status: order.status,
    });

    setIsModalOpen(true);
  };

  const handleDeleteOrder = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this order?",
    );

    if (!confirmed) return;

    try {
      await deleteOrder(id);

      setOrders(orders.filter((order) => order._id !== id));

      toast.success("Order deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete order");
    }
  };

  const handleSaveOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingOrderId) {
        const updatedOrder = await updateOrder(editingOrderId, {
          customer: form.customer,
          item: form.item,
          total: Number(form.total),
          status: form.status,
        });

        setOrders(
          orders.map((order) =>
            order._id === updatedOrder._id ? updatedOrder : order,
          ),
        );

        toast.success("Order updated successfully");
      } else {
        const newOrder = await createOrder({
          customer: form.customer,
          item: form.item,
          total: Number(form.total),
          status: form.status,
        });

        setOrders([newOrder, ...orders]);

        toast.success("Order created successfully");
      }

      resetForm();
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-textmain">Orders</h1>
          <p className="text-gray-500 mt-2">
            Manage and track customer orders in real-time
          </p>
        </div>

        <button
          type="button"
          onClick={openNewOrderModal}
          className="bg-[#4F46E5] text-white px-5 py-3 rounded-xl font-semibold hover:opacity-90 transition"
        >
          New Order
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm mt-8 overflow-hidden">
        <div className="p-5 border-b border-gray-200 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
          <input
            type="text"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-80 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
          >
            <option>All Statuses</option>
            <option>Pending</option>
            <option>Preparing</option>
            <option>Ready</option>
            <option>Completed</option>
          </select>
        </div>

        <div className="divide-y divide-gray-100">
          {filteredOrders.map((order) => (
            <div
              key={order._id}
              className="p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:bg-gray-50 transition"
            >
              <div>
                <p className="font-semibold text-textmain">{order.item}</p>

                <p className="text-sm text-gray-500 mt-1">
                  #{order._id.slice(-5)} • {order.customer}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <p className="font-semibold text-textmain">
                  R{order.total.toFixed(2)}
                </p>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    statusStyles[order.status]
                  }`}
                >
                  {order.status}
                </span>

                <button
                  type="button"
                  onClick={() => handleEditOrder(order)}
                  className="border border-gray-300 text-gray-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-100 transition"
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() => handleDeleteOrder(order._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-xl text-sm font-medium hover:opacity-90 transition"
                >
                  Delete
                </button>

                <button
                  type="button"
                  className="bg-[#22C55E] text-white px-4 py-2 rounded-xl text-sm font-medium hover:opacity-90 transition"
                >
                  WhatsApp
                </button>
              </div>
            </div>
          ))}

          {filteredOrders.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              No orders found.
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center px-4 z-50">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-textmain">
                {editingOrderId ? "Edit Order" : "Create New Order"}
              </h2>

              <button
                type="button"
                onClick={() => {
                  resetForm();
                  setIsModalOpen(false);
                }}
                className="text-gray-400 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveOrder} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-textmain">
                  Customer Name
                </label>

                <input
                  type="text"
                  value={form.customer}
                  onChange={(e) =>
                    setForm({ ...form, customer: e.target.value })
                  }
                  className="w-full mt-2 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-textmain">
                  Order Item
                </label>

                <input
                  type="text"
                  value={form.item}
                  onChange={(e) => setForm({ ...form, item: e.target.value })}
                  className="w-full mt-2 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-textmain">
                  Total Amount
                </label>

                <input
                  type="number"
                  value={form.total}
                  onChange={(e) => setForm({ ...form, total: e.target.value })}
                  placeholder="150.00"
                  className="w-full mt-2 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-textmain">
                  Status
                </label>

                <select
                  value={form.status}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      status: e.target.value as Order["status"],
                    })
                  }
                  className="w-full mt-2 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                >
                  <option>Pending</option>
                  <option>Preparing</option>
                  <option>Ready</option>
                  <option>Completed</option>
                </select>
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => {
                    resetForm();
                    setIsModalOpen(false);
                  }}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 bg-[#4F46E5] text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
                >
                  {editingOrderId ? "Update Order" : "Save Order"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
