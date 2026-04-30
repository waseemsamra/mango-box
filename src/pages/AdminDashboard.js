import React from 'react';
import AdminLayout from '../components/AdminLayout';

const AdminDashboard = () => {
  return (
    <AdminLayout 
      title="Marketplace Overview" 
      description="Welcome back! Here's what's happening with your harvest today."
    >
      {/* Bento Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Card 1: Sales */}
        <div className="bg-white dark:bg-stone-800 p-6 rounded-2xl shadow-sm border border-stone-100 dark:border-stone-700/50 flex flex-col gap-4 relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-green-50 dark:bg-green-900/10 rounded-full transition-transform group-hover:scale-110"></div>
          <div className="flex items-center justify-between relative z-10">
            <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-700 dark:text-green-400">
              <span className="material-symbols-outlined">payments</span>
            </div>
            <span className="text-green-600 text-xs font-bold bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full">+12.5%</span>
          </div>
          <div className="relative z-10">
            <p className="text-label-sm text-stone-500 uppercase tracking-widest">Today's Sales</p>
            <h3 className="text-headline-md font-headline-md mt-1">Rs. 42,850</h3>
          </div>
        </div>

        {/* Card 2: Pending Orders */}
        <div className="bg-white dark:bg-stone-800 p-6 rounded-2xl shadow-sm border border-stone-100 dark:border-stone-700/50 flex flex-col gap-4 relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-yellow-50 dark:bg-yellow-900/10 rounded-full transition-transform group-hover:scale-110"></div>
          <div className="flex items-center justify-between relative z-10">
            <div className="w-12 h-12 rounded-xl bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-yellow-700 dark:text-yellow-400">
              <span className="material-symbols-outlined">pending_actions</span>
            </div>
            <span className="text-yellow-600 text-xs font-bold bg-yellow-50 dark:bg-yellow-900/20 px-2 py-1 rounded-full">18 new</span>
          </div>
          <div className="relative z-10">
            <p className="text-label-sm text-stone-500 uppercase tracking-widest">Pending Orders</p>
            <h3 className="text-headline-md font-headline-md mt-1">124</h3>
          </div>
        </div>

        {/* Card 3: Stock Alerts */}
        <div className="bg-white dark:bg-stone-800 p-6 rounded-2xl shadow-sm border border-stone-100 dark:border-stone-700/50 flex flex-col gap-4 relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-red-50 dark:bg-red-900/10 rounded-full transition-transform group-hover:scale-110"></div>
          <div className="flex items-center justify-between relative z-10">
            <div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-700 dark:text-red-400">
              <span className="material-symbols-outlined">warning</span>
            </div>
            <span className="text-red-600 text-xs font-bold bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded-full">Low Stock</span>
          </div>
          <div className="relative z-10">
            <p className="text-label-sm text-stone-500 uppercase tracking-widest">Stock Alerts</p>
            <h3 className="text-headline-md font-headline-md mt-1">12 Items</h3>
          </div>
        </div>

        {/* Card 4: Active Users */}
        <div className="bg-white dark:bg-stone-800 p-6 rounded-2xl shadow-sm border border-stone-100 dark:border-stone-700/50 flex flex-col gap-4 relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-50 dark:bg-blue-900/10 rounded-full transition-transform group-hover:scale-110"></div>
          <div className="flex items-center justify-between relative z-10">
            <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-700 dark:text-blue-400">
              <span className="material-symbols-outlined">person_search</span>
            </div>
            <span className="text-blue-600 text-xs font-bold bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded-full">Live</span>
          </div>
          <div className="relative z-10">
            <p className="text-label-sm text-stone-500 uppercase tracking-widest">Customer Visits</p>
            <h3 className="text-headline-md font-headline-md mt-1">2,840</h3>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Chart Section */}
        <div className="lg:col-span-2 bg-white dark:bg-stone-800 rounded-3xl p-8 border border-stone-100 dark:border-stone-700/50 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-headline-md font-headline-md">Revenue Analytics</h3>
              <p className="text-label-sm text-stone-500">Weekly organic growth trends</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-primary"></span>
                <span className="text-label-sm">Gross Sales</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-secondary"></span>
                <span className="text-label-sm">Orders</span>
              </div>
            </div>
          </div>
          
          {/* Mock Chart Visualization */}
          <div className="h-64 flex items-end justify-between gap-4 px-2">
            <div className="flex flex-col items-center gap-4 w-full">
              <div className="w-full bg-green-50 dark:bg-green-900/10 rounded-t-xl h-32 relative group">
                <div className="absolute bottom-0 left-0 w-full bg-primary rounded-t-xl h-2/3 group-hover:h-3/4 transition-all duration-500"></div>
              </div>
              <span className="text-label-sm text-stone-400">Mon</span>
            </div>
            <div className="flex flex-col items-center gap-4 w-full">
              <div className="w-full bg-green-50 dark:bg-green-900/10 rounded-t-xl h-48 relative group">
                <div className="absolute bottom-0 left-0 w-full bg-primary rounded-t-xl h-3/4 group-hover:h-5/6 transition-all duration-500"></div>
              </div>
              <span className="text-label-sm text-stone-400">Tue</span>
            </div>
            <div className="flex flex-col items-center gap-4 w-full">
              <div className="w-full bg-green-50 dark:bg-green-900/10 rounded-t-xl h-40 relative group">
                <div className="absolute bottom-0 left-0 w-full bg-primary rounded-t-xl h-1/2 group-hover:h-2/3 transition-all duration-500"></div>
              </div>
              <span className="text-label-sm text-stone-400">Wed</span>
            </div>
            <div className="flex flex-col items-center gap-4 w-full">
              <div className="w-full bg-green-50 dark:bg-green-900/10 rounded-t-xl h-56 relative group">
                <div className="absolute bottom-0 left-0 w-full bg-primary rounded-t-xl h-5/6 group-hover:h-full transition-all duration-500"></div>
              </div>
              <span className="text-label-sm text-stone-400">Thu</span>
            </div>
            <div className="flex flex-col items-center gap-4 w-full">
              <div className="w-full bg-green-50 dark:bg-green-900/10 rounded-t-xl h-44 relative group">
                <div className="absolute bottom-0 left-0 w-full bg-primary rounded-t-xl h-2/3 group-hover:h-3/4 transition-all duration-500"></div>
              </div>
              <span className="text-label-sm text-stone-400">Fri</span>
            </div>
            <div className="flex flex-col items-center gap-4 w-full">
              <div className="w-full bg-green-50 dark:bg-green-900/10 rounded-t-xl h-60 relative group">
                <div className="absolute bottom-0 left-0 w-full bg-primary rounded-t-xl h-full group-hover:h-5/6 transition-all duration-500"></div>
              </div>
              <span className="text-label-sm text-stone-400">Sat</span>
            </div>
            <div className="flex flex-col items-center gap-4 w-full">
              <div className="w-full bg-green-50 dark:bg-green-900/10 rounded-t-xl h-36 relative group">
                <div className="absolute bottom-0 left-0 w-full bg-primary rounded-t-xl h-1/3 group-hover:h-1/2 transition-all duration-500"></div>
              </div>
              <span className="text-label-sm text-stone-400">Sun</span>
            </div>
          </div>
        </div>

        {/* Featured Card: Stock Highlight */}
        <div className="lg:col-span-1 bg-gradient-to-br from-green-600 to-green-800 text-white rounded-3xl p-8 flex flex-col justify-between shadow-lg shadow-green-900/20 relative overflow-hidden">
          <img alt="Fresh harvest background" className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCawSggLYE9VAxClLIewIDZax1A743nAwi1y1kjz1UvE9rTmo5YQ0rfQNiwly9qOogQFR_I29M70EwjJ32s8tfJKBP0fYOsbI-c7k5M5FJdS1zam9pToxdd7KnQGDiuCAeDCUzDYWxpd4IGBUbMLe-ipjUYcJxtM3NT33EKkU1Bms1y0ILsi0Scoh7cMWUtchslLpExRieTYeqOZtXIkyEe-GdFR0N2xI_8x16H47HifNebIzX1aF0hs2qMrCxziNES6hOwOvmexbLY"/>
          <div className="relative z-10">
            <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/30">Fresh Arrival</span>
            <h3 className="text-headline-lg font-headline-lg mt-4 leading-tight">Seasonal Mangoes Now Live</h3>
            <p className="text-body-md mt-2 opacity-90">Stock up on premium Sindhri mangoes. High demand expected this weekend.</p>
          </div>
          <div className="relative z-10 pt-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-label-sm opacity-80">Inventory Status</span>
              <span className="text-label-sm font-bold">85% Full</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div className="bg-secondary-container h-full rounded-full w-[85%]"></div>
            </div>
            <button className="mt-8 w-full bg-white text-green-800 py-3 rounded-xl font-bold hover:bg-stone-50 transition-colors shadow-xl">
              Update Listings
            </button>
          </div>
        </div>
      </div>

      {/* Recent Activity Table Section */}
      <div className="lg:col-span-3 bg-white dark:bg-stone-800 rounded-3xl border border-stone-100 dark:border-stone-700/50 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-stone-100 dark:border-stone-700/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h3 className="text-headline-md font-headline-md">Recent Orders</h3>
          <div className="flex items-center gap-2">
            <span className="text-label-sm text-stone-500">Filter by:</span>
            <div className="flex p-1 bg-stone-100 dark:bg-stone-700/50 rounded-lg">
              <button className="px-4 py-1 text-xs font-bold bg-white dark:bg-stone-600 rounded shadow-sm">All</button>
              <button className="px-4 py-1 text-xs font-medium text-stone-500">Pending</button>
              <button className="px-4 py-1 text-xs font-medium text-stone-500">Completed</button>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-stone-50/50 dark:bg-stone-800/50">
                <th className="px-8 py-4 text-left text-label-sm text-stone-400 uppercase tracking-widest font-semibold">Order ID</th>
                <th className="px-8 py-4 text-left text-label-sm text-stone-400 uppercase tracking-widest font-semibold">Product</th>
                <th className="px-8 py-4 text-left text-label-sm text-stone-400 uppercase tracking-widest font-semibold">Customer</th>
                <th className="px-8 py-4 text-left text-label-sm text-stone-400 uppercase tracking-widest font-semibold">Amount</th>
                <th className="px-8 py-4 text-left text-label-sm text-stone-400 uppercase tracking-widest font-semibold">Status</th>
                <th className="px-8 py-4 text-right text-label-sm text-stone-400 uppercase tracking-widest font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-stone-700/50">
              <tr className="hover:bg-stone-50 dark:hover:bg-stone-700/30 transition-colors group">
                <td className="px-8 py-5 text-label-lg font-bold">#KF-9428</td>
                <td className="px-8 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-green-50 p-1">
                      <img alt="Potatoes" className="w-full h-full object-cover rounded" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4QXVMGQlK5VM4yJgNjfgqgZjAwOSQmVHwrE53WvQAo4m2Z5M5fLpHfjmPg1EoCj_j_P_cIuDWBWpGYq6flipNBEDl62HRSqOFaHAvdey3f4BCrMoA6Ok9MF-xnJ9fm3krDCkzKw2K_FWkrzvf3kPBQckZg4XxTOIZW0jwGfosz649rSRJCS9UxKB4C9E_xMcdW70OXK8KG46Rr6zZGKQ0ornLFDDZYgYGsiTb8lMTqylH5fxrceWqcPSgjPiRgWlscvk9lB6Y8vjg"/>
                    </div>
                    <span className="text-label-lg">Organic Potatoes</span>
                  </div>
                </td>
                <td className="px-8 py-5 text-body-md">Ali Ahmed</td>
                <td className="px-8 py-5 text-label-lg font-bold">Rs. 1,250</td>
                <td className="px-8 py-5">
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">Delivered</span>
                </td>
                <td className="px-8 py-5 text-right">
                  <button className="p-2 text-stone-400 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined">more_vert</span>
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-stone-50 dark:hover:bg-stone-700/30 transition-colors">
                <td className="px-8 py-5 text-label-lg font-bold">#KF-9429</td>
                <td className="px-8 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-green-50 p-1">
                      <img alt="Tomatoes" className="w-full h-full object-cover rounded" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8H2LbYpE6hlc2t7Y3GSNzzVdwAQ7lEXRy__nPv1lkoP3YgiSmILCRYHiR_-J7meFQEH0cstlw4fhdwrDkSgjf6NCg71Phb356HNR2xjU76QQOq9dWKtYk272Mkc_3POGve_MMd0xfvzhAfFDRgr7yrVKAxcdAtHxp5VJpUEuFJqQfBqL8soDafZ2vIOHUNlfeQfReyWwkdy_hQyR1MuYoX7Na5zV8Xeuuh2pZGz-xEnevtBqt3HbxMUuIJCk_riNNr-8ctesoMUoi"/>
                    </div>
                    <span className="text-label-lg">Vine Tomatoes</span>
                  </div>
                </td>
                <td className="px-8 py-5 text-body-md">Sara Khan</td>
                <td className="px-8 py-5 text-label-lg font-bold">Rs. 450</td>
                <td className="px-8 py-5">
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-bold rounded-full">Processing</span>
                </td>
                <td className="px-8 py-5 text-right">
                  <button className="p-2 text-stone-400 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined">more_vert</span>
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-stone-50 dark:hover:bg-stone-700/30 transition-colors">
                <td className="px-8 py-5 text-label-lg font-bold">#KF-9430</td>
                <td className="px-8 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-green-50 p-1">
                      <img alt="Spinach" className="w-full h-full object-cover rounded" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1UrolnYS-wzd0sonPAxGJJI08-R_WRX4gTpEbnA_CNTcZXWJXSf6D-hhqMMd-mDbrq7KUs0CTEtze3SBaYp6E-sf33AhCXYqN4RgYiO3FnTnBLJ9zuRw3dQKwuWO9tofxb32rYRi41G6t3qJ4JqHSjG_OKxWB7zoceUVgxk3CDsH-f7YDSjqhHD7aV4arNrVHmOF8tvhwWIV65ZLsuouj0WlypvqCTHnmdy91NV8z7PFXCXY2F3g872QA9i9zLVuBnbVxzNo1pUf0"/>
                    </div>
                    <span className="text-label-lg">Baby Spinach</span>
                  </div>
                </td>
                <td className="px-8 py-5 text-body-md">Usman Sheikh</td>
                <td className="px-8 py-5 text-label-lg font-bold">Rs. 320</td>
                <td className="px-8 py-5">
                  <span className="px-3 py-1 bg-stone-100 text-stone-500 text-xs font-bold rounded-full">Pending</span>
                </td>
                <td className="px-8 py-5 text-right">
                  <button className="p-2 text-stone-400 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined">more_vert</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="p-6 bg-stone-50 dark:bg-stone-800/50 flex justify-center">
          <button className="text-primary font-bold text-label-lg hover:underline transition-all">View All Orders</button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
