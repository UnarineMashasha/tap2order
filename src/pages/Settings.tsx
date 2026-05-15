export default function Settings() {
  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold text-textmain">Settings</h1>
        <p className="text-gray-500 mt-2">
          Manage your business profile, contact details, and preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-lg font-bold text-textmain">
              Business Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
              <div>
                <label className="text-sm font-medium text-textmain">
                  Business Name
                </label>
                <input
                  type="text"
                  defaultValue="Tap2Order Demo Store"
                  className="w-full mt-2 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-textmain">
                  Business Type
                </label>
                <select className="w-full mt-2 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5]">
                  <option>Bakery</option>
                  <option>Restaurant</option>
                  <option>Home Kitchen</option>
                  <option>Retail Store</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-textmain">
                  Owner Name
                </label>
                <input
                  type="text"
                  defaultValue="Unarine Mashasha"
                  className="w-full mt-2 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-text,ain">
                  Email Address
                </label>
                <input
                  type="email"
                  defaultValue="owner@tap2order.co.za"
                  className="w-full mt-2 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                />
              </div>
            </div>
          </section>

          <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-lg font-bold text-textmain">
              Contact & WhatsApp
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
              <div>
                <label className="text-sm font-medium text-textmain">
                  Phone Number
                </label>
                <input
                  type="text"
                  defaultValue="072 123 4567"
                  className="w-full mt-2 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-textmain">
                  WhatsApp Number
                </label>
                <input
                  type="text"
                  defaultValue="072 123 4567"
                  className="w-full mt-2 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                />
              </div>
            </div>
          </section>

          <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-lg font-bold text-textmain">Store Address</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-textmain">
                  Address
                </label>
                <input
                  type="text"
                  defaultValue="Johannesburg, South Africa"
                  className="w-full mt-2 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-textmain">
                  City
                </label>
                <input
                  type="text"
                  defaultValue="Johannesburg"
                  className="w-full mt-2 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-textmain">
                  Province
                </label>
                <input
                  type="text"
                  defaultValue="Gauteng"
                  className="w-full mt-2 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                />
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-lg font-bold text-textmain">Branding</h2>

            <div className="mt-5 flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-[#4F46E5] text-white flex items-center justify-center text-2xl font-bold">
                T
              </div>

              <div>
                <p className="font-semibold text-textmain">Business Logo</p>
                <p className="text-sm text-gray-500">Upload logo later</p>
              </div>
            </div>

            <button className="w-full mt-5 border border-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition">
              Change Logo
            </button>
          </section>

          <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-lg font-bold text-textmain">Notifications</h2>

            <div className="space-y-4 mt-5">
              <label className="flex items-center justify-between gap-4">
                <span className="text-sm text-gray-600">New order alerts</span>
                <input type="checkbox" defaultChecked />
              </label>

              <label className="flex items-center justify-between gap-4">
                <span className="text-sm text-gray-600">WhatsApp updates</span>
                <input type="checkbox" defaultChecked />
              </label>

              <label className="flex items-center justify-between gap-4">
                <span className="text-sm text-gray-600">Daily summary</span>
                <input type="checkbox" />
              </label>
            </div>
          </section>

          <button className="w-full bg-[#4F46E5] text-white py-3 rounded-xl font-semibold hover:opacity-90 transition">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
