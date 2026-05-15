import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { openWhatsApp } from "../utils/whatsapp";
import {
  getCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "../services/customers";

type Customer = {
  _id: string;
  name: string;
  phone: string;
  totalOrders: number;
  lastOrder: string;
  status: "Active" | "New" | "VIP";
};

const statusStyles: Record<Customer["status"], string> = {
  Active: "bg-green-50 text-[#22C55E]",
  New: "bg-indigo-50 text-[#4F46E5]",
  VIP: "bg-yellow-50 text-yellow-700",
};

export default function Customers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCustomerId, setEditingCustomerId] = useState<string | null>(
    null,
  );

  const [form, setForm] = useState({
    name: "",
    phone: "",
    status: "New" as Customer["status"],
  });
  const fetchCustomers = async () => {
    try {
      const data = await getCustomers();

      setCustomers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch customers");
    }
  };

  useEffect(() => {
    const loadOrders = async () => {
      await fetchCustomers();
    };

    loadOrders();
  }, []);

  const filteredCustomers = customers
    .filter((customer) => customer && customer.name && customer.phone)
    .filter((customer) => {
      const matchesSearch =
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || customer.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  const resetForm = () => {
    setForm({
      name: "",
      phone: "",
      status: "New",
    });

    setEditingCustomerId(null);
  };

  const openAddCustomerModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const handleEditCustomer = (customer: Customer) => {
    setEditingCustomerId(customer._id);

    setForm({
      name: customer.name,
      phone: customer.phone,
      status: customer.status,
    });

    setIsModalOpen(true);
  };

  const handleDeleteCustomer = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this customer?",
    );

    if (!confirmed) return;

    try {
      await deleteCustomer(id);

      setCustomers(customers.filter((customer) => customer._id !== id));

      toast.success("Customer deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete customer");
    }
  };

  const handleSaveCustomer = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingCustomerId) {
        const updatedCustomer = await updateCustomer(editingCustomerId, {
          name: form.name,
          phone: form.phone,
          status: form.status,
        });

        setCustomers(
          customers.map((customer) =>
            customer._id === updatedCustomer._id ? updatedCustomer : customer,
          ),
        );

        toast.success("Customer updated successfully");
      } else {
        const newCustomer = await createCustomer({
          name: form.name,
          phone: form.phone,
          status: form.status,
        });

        setCustomers([newCustomer, ...customers]);

        toast.success("Customer created successfully");
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
          <h1 className="text-3xl font-bold text-textmain">Customers</h1>
          <p className="text-gray-500 mt-2">
            Track customer activity and manage repeat buyers.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddCustomerModal}
          className="bg-[#4F46E5] text-white px-5 py-3 rounded-xl font-semibold hover:opacity-90 transition"
        >
          Add Customer
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm mt-8 overflow-hidden">
        <div className="p-5 border-b border-gray-200 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
          <input
            type="text"
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-80 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
          >
            <option>All</option>
            <option>New</option>
            <option>Active</option>
            <option>VIP</option>
          </select>
        </div>

        <div className="divide-y divide-gray-100">
          {filteredCustomers.map((customer) => (
            <div
              key={customer._id}
              className="p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#EEF2FF] text-[#4F46E5] flex items-center justify-center font-bold">
                  {customer.name.charAt(0)}
                </div>

                <div>
                  <p className="font-semibold text-textmain">{customer.name}</p>
                  <p className="text-sm text-gray-500">{customer.phone}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <div>
                  <p className="text-xs text-gray-500">Orders</p>
                  <p className="font-semibold text-textmain">
                    {customer.totalOrders}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Last Order</p>
                  <p className="font-semibold text-textmain">
                    {customer.lastOrder}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    statusStyles[customer.status]
                  }`}
                >
                  {customer.status}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    openWhatsApp(
                      customer.phone,
                      `Hi ${customer.name}, thank you for ordering from Tap2Order. How can we help you today?`,
                    )
                  }
                  className="bg-[#22C55E] text-white px-4 py-2 rounded-xl text-sm font-medium hover:opacity-90 transition"
                >
                  WhatsApp
                </button>

                <button
                  type="button"
                  onClick={() => handleEditCustomer(customer)}
                  className="border border-gray-300 text-gray-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-100 transition"
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() => handleDeleteCustomer(customer._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-xl text-sm font-medium hover:opacity-90 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

          {filteredCustomers.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              No customers found.
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center px-4 z-50">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-textmain">
                {editingCustomerId ? "Edit Customer" : "Add Customer"}
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

            <form onSubmit={handleSaveCustomer} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-textmain">
                  Customer Name
                </label>

                <input
                  type="text"
                  value={form.name}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name: e.target.value,
                    })
                  }
                  placeholder="Enter customer name"
                  className="w-full mt-2 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-textmain">
                  Phone Number
                </label>

                <input
                  type="text"
                  value={form.phone}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      phone: e.target.value,
                    })
                  }
                  placeholder="072 123 4567"
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
                      status: e.target.value as Customer["status"],
                    })
                  }
                  className="w-full mt-2 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                >
                  <option>New</option>
                  <option>Active</option>
                  <option>VIP</option>
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
                  {editingCustomerId ? "Update Customer" : "Save Customer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
