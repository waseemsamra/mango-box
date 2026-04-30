import React from 'react';
import AdminLayout from '../components/AdminLayout';

const UserManagement = () => {
  return (
    <AdminLayout 
      title="User Management" 
      description="Manage platform access, roles, and security permissions for all registered users."
    >
      {/* Stats Overview - Bento Style */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-lg bg-green-50 text-green-600 flex items-center justify-center">
              <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>groups</span>
            </div>
            <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">+12%</span>
          </div>
          <p className="text-zinc-500 font-label-sm uppercase tracking-wider">Total Users</p>
          <h3 className="text-2xl font-bold text-zinc-900">2,840</h3>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>verified_user</span>
            </div>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">Active</span>
          </div>
          <p className="text-zinc-500 font-label-sm uppercase tracking-wider">Active Now</p>
          <h3 className="text-2xl font-bold text-zinc-900">1,124</h3>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>shield_person</span>
            </div>
          </div>
          <p className="text-zinc-500 font-label-sm uppercase tracking-wider">Administrators</p>
          <h3 className="text-2xl font-bold text-zinc-900">14</h3>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
              <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>block</span>
            </div>
          </div>
          <p className="text-zinc-500 font-label-sm uppercase tracking-wider">Blocked</p>
          <h3 className="text-2xl font-bold text-zinc-900">38</h3>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-zinc-100 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h3 className="font-headline-md text-zinc-900">User Directory</h3>
            <span className="bg-zinc-100 text-zinc-600 px-3 py-1 rounded-full text-xs font-bold">2,840 Users</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-zinc-200 rounded-lg text-sm font-label-lg text-zinc-600 hover:bg-zinc-50">
              <span className="material-symbols-outlined text-lg">filter_list</span>
              Filters
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-zinc-200 rounded-lg text-sm font-label-lg text-zinc-600 hover:bg-zinc-50">
              <span className="material-symbols-outlined text-lg">download</span>
              Export
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-50/50">
                <th className="px-6 py-4 font-label-lg text-zinc-500 border-b border-zinc-100">
                  <div className="flex items-center gap-2">
                    Name <span className="material-symbols-outlined text-sm">unfold_more</span>
                  </div>
                </th>
                <th className="px-6 py-4 font-label-lg text-zinc-500 border-b border-zinc-100">Email Address</th>
                <th className="px-6 py-4 font-label-lg text-zinc-500 border-b border-zinc-100">Role</th>
                <th className="px-6 py-4 font-label-lg text-zinc-500 border-b border-zinc-100">Last Login</th>
                <th className="px-6 py-4 font-label-lg text-zinc-500 border-b border-zinc-100">Status</th>
                <th className="px-6 py-4 font-label-lg text-zinc-500 border-b border-zinc-100 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              <tr className="hover:bg-zinc-50/80 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img alt="User" className="w-10 h-10 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvUghRszWP1TlY1FdYUnIdZ7EjuEwYyOrg5XLeKbcydR4mrRtkVCgswXX272XUQq7NbqKZ1r2K4ERhsl_mNwKMqVPKS6-P6FLQZi9PBkVD_Q_RQu23Fjq3xfUofjToF-ijbEej8NvsJe7yY9yGCiApgltW4378Shj4Hg9AV6NlN32kkaiApOHMALTlMHGbwuvTO3iEAt3ajioCde1dmd6AhHOAqBNCxcp297t0yfBWKre2V6SkH3QbUfSv7kkP58kNIoT0zfwm1vAU"/>
                    <div>
                      <p className="font-label-lg text-zinc-900">Ahmed Khan</p>
                      <p className="text-xs text-zinc-500">ID: #8829</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 font-body-md text-zinc-600">ahmed.khan@example.pk</td>
                <td className="px-6 py-4">
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700">Admin</span>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm">
                    <p className="text-zinc-900">2 mins ago</p>
                    <p className="text-[10px] text-zinc-400">IP: 192.168.1.1</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="flex items-center gap-1.5 text-xs font-bold text-green-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>
                    Active
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 text-zinc-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all">
                      <span className="material-symbols-outlined">edit</span>
                    </button>
                    <button className="p-2 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                      <span className="material-symbols-outlined">shield_lock</span>
                    </button>
                  </div>
                </td>
              </tr>
              
              <tr className="hover:bg-zinc-50/80 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img alt="User" className="w-10 h-10 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-UY7tV3kQDNaIBiFxtEPwbFDxuHPJP0oT27iCZXWfgpMWz-ownO6ecgIJ6bpLA3Jw043eVOG3zTt_M9PD8CjYkGTZ_7S77SCUlebf-o_lFT5iB2qL_td1AvuYR2TUpTEVdIRUl6z9iO1ARollvZhg5EyB3CD1XdGJhXvk2SDnd-15W_o--zOJvZ1dyjFSGfTQRnG_RoXYV3vJvMemBF0F5OKHIU9_m2xmNc_Uu0_Y2gTs91Or7p2Lxl8Dtu9dgp3FQBGoHBDxsvcQ"/>
                    <div>
                      <p className="font-label-lg text-zinc-900">Zainab Malik</p>
                      <p className="text-xs text-zinc-500">ID: #9012</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 font-body-md text-zinc-600">z.malik@harvest.com</td>
                <td className="px-6 py-4">
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-green-50 text-green-700">Customer</span>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm">
                    <p className="text-zinc-900">Oct 24, 2023</p>
                    <p className="text-[10px] text-zinc-400">IP: 182.162.4.92</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="flex items-center gap-1.5 text-xs font-bold text-green-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>
                    Active
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 text-zinc-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all">
                      <span className="material-symbols-outlined">edit</span>
                    </button>
                    <button className="p-2 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                      <span className="material-symbols-outlined">shield_lock</span>
                    </button>
                  </div>
                </td>
              </tr>
              
              <tr className="hover:bg-zinc-50/80 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-zinc-200 flex items-center justify-center text-zinc-500">
                      <span className="material-symbols-outlined">person</span>
                    </div>
                    <div>
                      <p className="font-label-lg text-zinc-900">Omar Siddiqui</p>
                      <p className="text-xs text-zinc-500">ID: #7741</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 font-body-md text-zinc-600">omar.sid@provider.net</td>
                <td className="px-6 py-4">
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-green-50 text-green-700">Customer</span>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm">
                    <p className="text-zinc-900">5 days ago</p>
                    <p className="text-[10px] text-zinc-400">IP: 202.163.5.12</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="flex items-center gap-1.5 text-xs font-bold text-zinc-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-400"></span>
                    Inactive
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 text-zinc-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all">
                      <span className="material-symbols-outlined">edit</span>
                    </button>
                    <button className="p-2 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                      <span className="material-symbols-outlined">shield_lock</span>
                    </button>
                  </div>
                </td>
              </tr>
              
              <tr className="hover:bg-zinc-50/80 transition-colors group bg-red-50/5">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img alt="User" className="w-10 h-10 rounded-full object-cover grayscale" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDr936g_EVppXvdBvL-4BqsFI6QDBeQC3j_zK6Ge4hPChjGe-afnqT1V7EEmmc3UKiMOQu0UoFi4fqK4chj3YZ5EzAIPcfYqURdNJhySTqRWIyTgndvXn_KTjxIIGSTCxzchA9ZkFqUjBvgBfWNeTpINu8VNzGAgPJO3ium_nE7DeRrWgMEipyggVfirsXEBirC-No6MhCwysJqrYfcwcq1n1qYEq2_6-dtc1p_AB-whzQawtFTBXVj0EsqLViXZCzupd9ltT2-c44M"/>
                    <div>
                      <p className="font-label-lg text-zinc-900">Ibrahim Shah</p>
                      <p className="text-xs text-zinc-500">ID: #6652</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 font-body-md text-zinc-600">i.shah@blocked.com</td>
                <td className="px-6 py-4">
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-green-50 text-green-700">Customer</span>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm">
                    <p className="text-zinc-900">Never</p>
                    <p className="text-[10px] text-zinc-400">Account flagged</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="flex items-center gap-1.5 text-xs font-bold text-red-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
                    Blocked
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 text-zinc-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all">
                      <span className="material-symbols-outlined">edit</span>
                    </button>
                    <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-all">
                      <span className="material-symbols-outlined">lock_open</span>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="p-6 bg-zinc-50/50 flex items-center justify-between">
          <p className="text-sm text-zinc-500">Showing 1 to 10 of 2,840 users</p>
          <div className="flex items-center gap-1">
            <button className="w-10 h-10 flex items-center justify-center border border-zinc-200 rounded-lg text-zinc-400 hover:bg-zinc-50 disabled:opacity-50" disabled>
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button className="w-10 h-10 flex items-center justify-center bg-primary text-white rounded-lg font-label-lg">1</button>
            <button className="w-10 h-10 flex items-center justify-center hover:bg-zinc-50 rounded-lg text-zinc-600 font-label-lg">2</button>
            <button className="w-10 h-10 flex items-center justify-center hover:bg-zinc-50 rounded-lg text-zinc-600 font-label-lg">3</button>
            <span className="px-2 text-zinc-400">...</span>
            <button className="w-10 h-10 flex items-center justify-center hover:bg-zinc-50 rounded-lg text-zinc-600 font-label-lg">284</button>
            <button className="w-10 h-10 flex items-center justify-center border border-zinc-200 rounded-lg text-zinc-400 hover:bg-zinc-50">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* Permission Management Panel */}
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-surface-container p-8 rounded-3xl border border-outline-variant/30">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white">
              <span className="material-symbols-outlined">policy</span>
            </div>
            <div>
              <h4 className="font-headline-md text-zinc-900">Role Permissions</h4>
              <p className="text-sm text-zinc-500 font-body-md">Configure what different user groups can access</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-zinc-100">
              <div>
                <p className="font-label-lg text-zinc-900">Inventory Management</p>
                <p className="text-xs text-zinc-500">Allow users to add or edit stock</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-zinc-400">Admins Only</span>
                <div className="w-10 h-5 bg-primary-container rounded-full relative">
                  <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-zinc-100">
              <div>
                <p className="font-label-lg text-zinc-900">Financial Reports</p>
                <p className="text-xs text-zinc-500">View sales data and revenue charts</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-zinc-400">Super Admin</span>
                <div className="w-10 h-5 bg-zinc-200 rounded-full relative">
                  <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                </div>
              </div>
            </div>
          </div>
          <button className="w-full mt-6 py-3 border border-dashed border-zinc-300 text-zinc-500 rounded-xl text-sm font-label-lg hover:bg-zinc-50 transition-colors">
            View All Permissions Systems
          </button>
        </div>
        
        <div className="relative rounded-3xl overflow-hidden group min-h-[300px] flex flex-col justify-end p-8">
          <img alt="Fresh Produce" className="absolute inset-0 w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUPiMUxEaV5mRnk8LDqB6o0mG6tr_u_DApPXTePMJ6SElRjhXyBMapnQd2GQmpDlkhuI1q5D8Pe4rO5wc44dJslQIbetvJDn6yTZ0ym_-G7kPnhelexXMvdEtcB4gxrH-WppOnCQ3jvndHK4XTlrJimmsOGtuitwPR07Ey0RLx9vafkL6UYfkXO87E8lwTeeYiYKO-JKjqTjaGw1oWTfVGSABHGqoTQuiYb03OvhyI8j4FGpTuEB4BX6dwnX0mLx-afj4pL_1xFf1M"/>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          <div className="relative z-10">
            <span className="bg-primary text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 inline-block">Security Update</span>
            <h4 className="text-2xl font-bold text-white mb-2 leading-tight">Enhanced Security for Administrative Logins</h4>
            <p className="text-zinc-200 text-sm font-body-md mb-6">We've added mandatory 2FA for all users with 'Admin' or 'Staff' roles to protect the supply chain data.</p>
            <a className="inline-flex items-center gap-2 text-primary-fixed font-label-lg hover:underline" href="#">
              Read Documentation
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </a>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default UserManagement;
