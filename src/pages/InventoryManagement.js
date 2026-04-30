import React from 'react';
import AdminLayout from '../components/AdminLayout';

const InventoryManagement = () => {
  return (
    <AdminLayout 
      title="Inventory Management" 
      description="Manage your fresh produce stock and pricing with real-time updates and analytics."
    >
      {/* Inventory Stats (Bento Grid Style) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center text-green-600">
              <span className="material-symbols-outlined">inventory</span>
            </div>
            <span className="text-xs font-bold text-green-600">+12%</span>
          </div>
          <p className="text-zinc-500 font-label-sm uppercase tracking-wider">Total Products</p>
          <h3 className="text-2xl font-bold mt-1">1,284</h3>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-lg bg-secondary-container/10 flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined">warning</span>
            </div>
          </div>
          <p className="text-zinc-500 font-label-sm uppercase tracking-wider">Low Stock</p>
          <h3 className="text-2xl font-bold mt-1">18 Items</h3>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-lg bg-tertiary-container/10 flex items-center justify-center text-tertiary">
              <span className="material-symbols-outlined">trending_up</span>
            </div>
          </div>
          <p className="text-zinc-500 font-label-sm uppercase tracking-wider">Top Category</p>
          <h3 className="text-2xl font-bold mt-1">Mangoes</h3>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-lg bg-primary-container/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">eco</span>
            </div>
          </div>
          <p className="text-zinc-500 font-label-sm uppercase tracking-wider">Organic Ratio</p>
          <h3 className="text-2xl font-bold mt-1">84%</h3>
        </div>
      </div>

      {/* Table Filters */}
      <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-zinc-100 flex items-center justify-between bg-surface-bright/50">
          <div className="flex items-center gap-4">
            <select className="bg-white border border-zinc-200 rounded-lg px-4 py-2 font-label-lg focus:ring-2 focus:ring-green-500/20 outline-none appearance-none cursor-pointer pr-10">
              <option>All Categories</option>
              <option>Mangoes</option>
              <option>Citrus</option>
              <option>Stone Fruits</option>
            </select>
            <select className="bg-white border border-zinc-200 rounded-lg px-4 py-2 font-label-lg focus:ring-2 focus:ring-green-500/20 outline-none appearance-none cursor-pointer pr-10">
              <option>Stock Status</option>
              <option>In Stock</option>
              <option>Low Stock</option>
              <option>Out of Stock</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 border border-zinc-200 rounded-lg text-zinc-500 hover:bg-zinc-50">
              <span className="material-symbols-outlined">filter_list</span>
            </button>
            <button className="p-2 border border-zinc-200 rounded-lg text-zinc-500 hover:bg-zinc-50">
              <span className="material-symbols-outlined">download</span>
            </button>
          </div>
        </div>

        {/* Inventory Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-50/50">
                <th className="px-6 py-4 font-label-lg text-on-surface-variant">
                  <div className="flex items-center gap-2">
                    Product <span className="material-symbols-outlined text-xs">unfold_more</span>
                  </div>
                </th>
                <th className="px-6 py-4 font-label-lg text-on-surface-variant">Category</th>
                <th className="px-6 py-4 font-label-lg text-on-surface-variant">Price</th>
                <th className="px-6 py-4 font-label-lg text-on-surface-variant">Stock Level</th>
                <th className="px-6 py-4 font-label-lg text-on-surface-variant">Status</th>
                <th className="px-6 py-4 font-label-lg text-on-surface-variant text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              {/* Product Row 1 */}
              <tr className="hover:bg-green-50/30 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <img alt="Sindhri Mango" className="w-12 h-12 rounded-xl object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuADWPnv3Zj9Lgacr_zprz4aKfAe_wWQ2SdS2RxoIZo15JmOWHFWhLuWQw3uz3YCPbEbAeZaJfEWmouEXsx9QcU71ZEQY5qPwxh811leNmTd6c31BO8LiIHKN4pOJTTZ51RADcQveepvf6yyQoF_bwCoXx4VpvdBPp-pgrmDJVPieUSONMPZFy3MTNUiZ5QjmbcNUQ50dWUm1Ti1tmaUpur-T_b3G1w3TAkhaJR91bdVZ5AdF4MN_loru8ehs5Ul3LdEs_j2Tm3K_zm3"/>
                    <div>
                      <p className="font-label-lg text-on-surface">Sindhri Mango</p>
                      <p className="text-xs text-zinc-500">ID: KF-MN-001</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-full bg-secondary-container/10 text-secondary-fixed-dim font-label-sm">Mangoes</span>
                </td>
                <td className="px-6 py-4">
                  <p className="font-semibold text-tertiary">Rs. 450/kg</p>
                </td>
                <td className="px-6 py-4">
                  <div className="w-full max-w-[120px]">
                    <div className="flex justify-between text-xs mb-1">
                      <span>450kg</span>
                      <span className="text-zinc-400">/ 500kg</span>
                    </div>
                    <div className="h-1.5 w-full bg-zinc-100 rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-[90%] rounded-full"></div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="flex items-center gap-1.5 text-primary">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                    <span className="font-label-sm">In Stock</span>
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 hover:bg-white rounded-lg text-zinc-500 hover:text-primary transition-all">
                      <span className="material-symbols-outlined">edit</span>
                    </button>
                    <button className="p-2 hover:bg-white rounded-lg text-zinc-500 hover:text-error transition-all">
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </div>
                </td>
              </tr>

              {/* Product Row 2 */}
              <tr className="hover:bg-green-50/30 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <img alt="Chaunsa Mango" className="w-12 h-12 rounded-xl object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuArH4mff3om9a0-zsPlyLw_fRe8FGrn49kC_y3cZpXk_jHmkg5ONTcnRYWK-BmA_Z5F7FCgrNV7O-c3b7vh0kiB5JCgn81U1p_GIUDOnuLFQKDEzN-xa509QW9m2BcU4NcT5u7G5U4hTFWxN0t6V7YNk_Q5rugoOd0h65G3HCbo68oyQUP5eiI4zZ-79EboKbIPMSUgMVYXTbLlmy5Uk6cCyjMM-NPCjp-h87z8RJaGIeEWuZBTAKfMaDrX9bZUq5SeyXiOQQgz81Kf"/>
                    <div>
                      <p className="font-label-lg text-on-surface">Chaunsa Mango</p>
                      <p className="text-xs text-zinc-500">ID: KF-MN-002</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-full bg-secondary-container/10 text-secondary-fixed-dim font-label-sm">Mangoes</span>
                </td>
                <td className="px-6 py-4">
                  <p className="font-semibold text-tertiary">Rs. 580/kg</p>
                </td>
                <td className="px-6 py-4">
                  <div className="w-full max-w-[120px]">
                    <div className="flex justify-between text-xs mb-1">
                      <span>24kg</span>
                      <span className="text-zinc-400">/ 300kg</span>
                    </div>
                    <div className="h-1.5 w-full bg-zinc-100 rounded-full overflow-hidden">
                      <div className="h-full bg-secondary w-[8%] rounded-full"></div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="flex items-center gap-1.5 text-secondary">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
                    <span className="font-label-sm">Low Stock</span>
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 hover:bg-white rounded-lg text-zinc-500 hover:text-primary transition-all">
                      <span className="material-symbols-outlined">edit</span>
                    </button>
                    <button className="p-2 hover:bg-white rounded-lg text-zinc-500 hover:text-error transition-all">
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </div>
                </td>
              </tr>

              {/* Product Row 3 */}
              <tr className="hover:bg-green-50/30 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <img alt="Kino Citrus" className="w-12 h-12 rounded-xl object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6l2IMZl-qGxhhupmOiUKwJJkvAl6teVOEmsftNx3HnwpWwsDLqMUbWZ5W7rZJWgCDk7-j87HzuUpg_v59nzNLIP6aghxBQHZh6qCmckrADc4OFjGjx3bFp3YFQNNLccDSuyLsgCkxHv2sveLxs4wRtQBy1ozDLMIb-emrRd8dczLnh8mg0suzZkYhSSfFfxfxjlYCT5nmNGwbJFfrCI8V140nrCoU3ZjFAsiVeguXw_XNdCbW_nlykKir_8MLQR7XTxqkAW4QfTM2"/>
                    <div>
                      <p className="font-label-lg text-on-surface">Kino Citrus</p>
                      <p className="text-xs text-zinc-500">ID: KF-CT-042</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-full bg-tertiary-container/10 text-tertiary font-label-sm">Citrus</span>
                </td>
                <td className="px-6 py-4">
                  <p className="font-semibold text-tertiary">Rs. 120/kg</p>
                </td>
                <td className="px-6 py-4">
                  <div className="w-full max-w-[120px]">
                    <div className="flex justify-between text-xs mb-1">
                      <span>0kg</span>
                      <span className="text-zinc-400">/ 1000kg</span>
                    </div>
                    <div className="h-1.5 w-full bg-zinc-100 rounded-full overflow-hidden">
                      <div className="h-full bg-error w-0 rounded-full"></div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="flex items-center gap-1.5 text-error">
                    <span className="w-1.5 h-1.5 rounded-full bg-error"></span>
                    <span className="font-label-sm">Out of Stock</span>
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 hover:bg-white rounded-lg text-zinc-500 hover:text-primary transition-all">
                      <span className="material-symbols-outlined">edit</span>
                    </button>
                    <button className="p-2 hover:bg-white rounded-lg text-zinc-500 hover:text-error transition-all">
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </div>
                </td>
              </tr>

              {/* Product Row 4 */}
              <tr className="hover:bg-green-50/30 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <img alt="Swat Peaches" className="w-12 h-12 rounded-xl object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuADo59gKSE_K7z4gkDjqWwW_Yva8we07MQkzhPNxl8YNSpycDQWP61NdgrldaG7YH2zgcRDHpNK7GGn3fc47GPFPMsYqZsT34wVv_tE4OjSobSzU1_ETD71oH4LXKqp7azZTCHWAaNuuv_eIPbQ-8H8OSqCCWYu3ujHiL_VDf7FaPEY6OCrjhItjP89NSPNDgvSWa9BXsrdkVHxuaWemX9FZdZ_nrkv2wbmhcNSQaVvo0DSNk33_us1kv-271E5BfSrIo3JYi5yqpOk"/>
                    <div>
                      <p className="font-label-lg text-on-surface">Swat Peaches</p>
                      <p className="text-xs text-zinc-500">ID: KF-SF-015</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-full bg-tertiary-container/10 text-tertiary font-label-sm">Stone Fruits</span>
                </td>
                <td className="px-6 py-4">
                  <p className="font-semibold text-tertiary">Rs. 320/kg</p>
                </td>
                <td className="px-6 py-4">
                  <div className="w-full max-w-[120px]">
                    <div className="flex justify-between text-xs mb-1">
                      <span>180kg</span>
                      <span className="text-zinc-400">/ 250kg</span>
                    </div>
                    <div className="h-1.5 w-full bg-zinc-100 rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-[72%] rounded-full"></div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="flex items-center gap-1.5 text-primary">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                    <span className="font-label-sm">In Stock</span>
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 hover:bg-white rounded-lg text-zinc-500 hover:text-primary transition-all">
                      <span className="material-symbols-outlined">edit</span>
                    </button>
                    <button className="p-2 hover:bg-white rounded-lg text-zinc-500 hover:text-error transition-all">
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Table Footer/Pagination */}
        <div className="p-6 bg-zinc-50/50 flex items-center justify-between">
          <span className="text-sm text-zinc-500">Showing 1-4 of 1,284 products</span>
          <div className="flex items-center gap-2">
            <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-400 cursor-not-allowed">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-primary bg-primary text-on-primary">1</button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50">2</button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50">3</button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default InventoryManagement;
