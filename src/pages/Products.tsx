import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/products";

type Product = {
  _id: string;
  name: string;
  category: string;
  price: number;
  status: "Available" | "Low Stock" | "Unavailable";
};

const statusStyles: Record<Product["status"], string> = {
  Available: "bg-green-50 text-[#22C55E]",
  "Low Stock": "bg-yellow-50 text-yellow-700",
  Unavailable: "bg-gray-100 text-gray-600",
};

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    status: "Available" as Product["status"],
  });

  const fetchProducts = async () => {
    try {
      const data = await getProducts();

      setProducts(data);
    } catch (error) {
      console.error(error);

      toast.error("Failed to fetch products");
    }
  };
  useEffect(() => {
    const loadOrders = async () => {
      await fetchProducts();
    };

    loadOrders();
  }, []);

  const resetForm = () => {
    setForm({
      name: "",
      category: "",
      price: "",
      status: "Available",
    });

    setEditingProductId(null);
  };

  const openAddProductModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProductId(product._id);

    setForm({
      name: product.name,
      category: product.category,
      price: String(product.price),
      status: product.status,
    });

    setIsModalOpen(true);
  };

  const handleDeleteProduct = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmed) return;

    try {
      await deleteProduct(id);

      setProducts(products.filter((product) => product._id !== id));

      toast.success("Product deleted successfully");
    } catch (error) {
      console.error(error);

      toast.error("Failed to delete product");
    }
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingProductId) {
        const updatedProduct = await updateProduct(editingProductId, {
          name: form.name,
          category: form.category,
          price: Number(form.price),
          status: form.status,
        });

        setProducts(
          products.map((product) =>
            product._id === updatedProduct._id ? updatedProduct : product,
          ),
        );

        toast.success("Product updated successfully");
      } else {
        const newProduct = await createProduct({
          name: form.name,
          category: form.category,
          price: Number(form.price),
          status: form.status,
        });

        setProducts([newProduct, ...products]);

        toast.success("Product created successfully");
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
          <h1 className="text-3xl font-bold text-textmain">Products</h1>

          <p className="text-gray-500 mt-2">
            Manage your menu items, pricing, and availability.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddProductModal}
          className="bg-[#4F46E5] text-white px-5 py-3 rounded-xl font-semibold hover:opacity-90 transition"
        >
          Add Product
        </button>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 hover:shadow-md transition"
          >
            <div className="h-32 rounded-2xl bg-[#EEF2FF] flex items-center justify-center text-4xl mb-5">
              🛒
            </div>

            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="font-bold text-textmain">{product.name}</h2>

                <p className="text-sm text-gray-500 mt-1">{product.category}</p>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                  statusStyles[product.status]
                }`}
              >
                {product.status}
              </span>
            </div>

            <p className="text-2xl font-bold text-textmain mt-5">
              R{product.price.toFixed(2)}
            </p>

            <div className="flex gap-3 mt-5">
              <button
                type="button"
                onClick={() => handleEditProduct(product)}
                className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-xl text-sm font-medium hover:bg-gray-100 transition"
              >
                Edit
              </button>

              <button
                type="button"
                onClick={() => handleDeleteProduct(product._id)}
                className="flex-1 bg-red-500 text-white py-2 rounded-xl text-sm font-medium hover:opacity-90 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {products.length === 0 && (
          <div className="col-span-full bg-white rounded-2xl border border-gray-200 p-10 text-center text-gray-500">
            No products found.
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center px-4 z-50">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-textmain">
                {editingProductId ? "Edit Product" : "Add New Product"}
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

            <form onSubmit={handleSaveProduct} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-textmain">
                  Product Name
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
                  placeholder="Blueberry Scones"
                  className="w-full mt-2 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-textmain">
                  Category
                </label>

                <input
                  type="text"
                  value={form.category}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      category: e.target.value,
                    })
                  }
                  placeholder="Bakery"
                  className="w-full mt-2 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-textmain">
                  Price
                </label>

                <input
                  type="number"
                  value={form.price}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      price: e.target.value,
                    })
                  }
                  placeholder="150"
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
                      status: e.target.value as Product["status"],
                    })
                  }
                  className="w-full mt-2 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                >
                  <option>Available</option>
                  <option>Low Stock</option>
                  <option>Unavailable</option>
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
                  {editingProductId ? "Update Product" : "Save Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
