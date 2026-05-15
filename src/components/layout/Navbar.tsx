export default function Navbar() {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <div>
        <h2 className="font-semibold text-textmain">Dashboard</h2>
        <p className="text-sm text-gray-500">
          Manage orders, products, and customers
        </p>
      </div>

      <div className="flex items-center gap-4">
        <button className="hidden sm:block bg-accent text-white px-4 py-2 rounded-xl text-sm font-medium hover:opacity-90 transition">
          New Order
        </button>

        <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-semibold">
          U
        </div>
      </div>
    </header>
  );
}
