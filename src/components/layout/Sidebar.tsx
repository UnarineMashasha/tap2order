import { Link, useLocation } from "react-router-dom";

const navItems = [
  { name: "Dashboard", path: "/" },
  { name: "Orders", path: "/orders" },
  { name: "Products", path: "/Products" },
  { name: "Customers", path: "/Customers" },
  { name: "Settings", path: "/Settings" },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="hidden md:flex w-64 min-h-screen bg-white border-r border-gray-200 flex-col p-6">
      <div className="flex items-center gap-3 mb-10">
        <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-bold">
          Logo
        </div>
        <div>
          <h1 className="text-lg font-bold text-textmain">Tap2Order</h1>
          <p className="text-xs text-gray-500">Business Dashboard</p>
        </div>
      </div>

      <nav className="space-y-2">
        {navItems.map((items) => {
          const active = location.pathname === items.path;

          return (
            <Link
              key={items.name}
              to={items.path}
              className={`block px-4 py-3 rounded-xl text-sm font-medium transition ${
                active
                  ? "bg-primary text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-100 hover:text-textmain"
              }`}
            >
              {items.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
