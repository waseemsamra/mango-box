import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout';
import UnitsManagement from '../components/UnitsManagement';
import OriginManagement from '../components/OriginManagement';
import CurrencyManagement from '../components/CurrencyManagement';

const SettingsManagement = () => {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <AdminLayout 
      title="Shop Configuration" 
      description="Manage your store's identity, logistics, and payment methods."
    >
      {/* Settings Grid */}
      <div className="grid grid-cols-12 gap-8">
        {/* Navigation Tabs (Bento Style Sidebar) */}
        <nav className="col-span-3 space-y-2">
          <button 
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center gap-3 p-4 rounded-xl font-label-lg transition-colors ${
              activeTab === 'profile' 
                ? 'bg-white border border-primary/10 shadow-sm text-primary' 
                : 'text-on-surface-variant hover:bg-white/50'
            }`}
          >
            <span className="material-symbols-outlined">person</span>
            Profile Settings
          </button>
          <button 
            onClick={() => setActiveTab('shipping')}
            className={`w-full flex items-center gap-3 p-4 rounded-xl font-label-lg transition-colors ${
              activeTab === 'shipping' 
                ? 'bg-white border border-primary/10 shadow-sm text-primary' 
                : 'text-on-surface-variant hover:bg-white/50'
            }`}
          >
            <span className="material-symbols-outlined">local_shipping</span>
            Shipping Rules
          </button>
          <button 
            onClick={() => setActiveTab('payment')}
            className={`w-full flex items-center gap-3 p-4 rounded-xl font-label-lg transition-colors ${
              activeTab === 'payment' 
                ? 'bg-white border border-primary/10 shadow-sm text-primary' 
                : 'text-on-surface-variant hover:bg-white/50'
            }`}
          >
            <span className="material-symbols-outlined">account_balance_wallet</span>
            Payment Gateways
          </button>
          <button 
            onClick={() => setActiveTab('units')}
            className={`w-full flex items-center gap-3 p-4 rounded-xl font-label-lg transition-colors ${
              activeTab === 'units' 
                ? 'bg-white border border-primary/10 shadow-sm text-primary' 
                : 'text-on-surface-variant hover:bg-white/50'
            }`}
          >
            <span className="material-symbols-outlined">straighten</span>
            Units Management
          </button>
          <button 
            onClick={() => setActiveTab('origin')}
            className={`w-full flex items-center gap-3 p-4 rounded-xl font-label-lg transition-colors ${
              activeTab === 'origin' 
                ? 'bg-white border border-primary/10 shadow-sm text-primary' 
                : 'text-on-surface-variant hover:bg-white/50'
            }`}
          >
            <span className="material-symbols-outlined">location_on</span>
            Origin Management
          </button>
          <button 
            onClick={() => setActiveTab('currency')}
            className={`w-full flex items-center gap-3 p-4 rounded-xl font-label-lg transition-colors ${
              activeTab === 'currency' 
                ? 'bg-white border border-primary/10 shadow-sm text-primary' 
                : 'text-on-surface-variant hover:bg-white/50'
            }`}
          >
            <span className="material-symbols-outlined">currency_exchange</span>
            Currency Management
          </button>
          <Link
            to="/admin/hybrid-settings"
            className={`w-full flex items-center gap-3 p-4 rounded-xl font-label-lg transition-colors ${
              activeTab === 'hybrid' 
                ? 'bg-white border border-primary/10 shadow-sm text-primary' 
                : 'text-on-surface-variant hover:bg-white/50'
            }`}
          >
            <span className="material-symbols-outlined">sync</span>
            Hybrid Settings
          </Link>
          <Link
            to="/admin/system-testing"
            className={`w-full flex items-center gap-3 p-4 rounded-xl font-label-lg transition-colors ${
              activeTab === 'testing' 
                ? 'bg-white border border-primary/10 shadow-sm text-primary' 
                : 'text-on-surface-variant hover:bg-white/50'
            }`}
          >
            <span className="material-symbols-outlined">bug_report</span>
            System Testing
          </Link>
          <button 
            onClick={() => setActiveTab('notifications')}
            className={`w-full flex items-center gap-3 p-4 rounded-xl font-label-lg transition-colors ${
              activeTab === 'notifications' 
                ? 'bg-white border border-primary/10 shadow-sm text-primary' 
                : 'text-on-surface-variant hover:bg-white/50'
            }`}
          >
            <span className="material-symbols-outlined">notifications_active</span>
            Notifications
          </button>
        </nav>

        {/* Content Area */}
        <div className="col-span-9 space-y-8">
          {activeTab === 'profile' && (
            <>
              {/* Profile Section */}
              <section className="bg-white p-8 rounded-3xl shadow-sm border border-zinc-100">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-headline-md text-on-surface">Admin Profile</h3>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-primary-fixed text-on-primary-fixed rounded-full text-label-sm">Verified Merchant</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2 col-span-2 sm:col-span-1">
                <label className="font-label-lg text-on-surface-variant">Store Name</label>
                <input className="w-full p-3 rounded-xl border border-outline-variant focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" type="text" value="Organic Harvest Lahore"/>
              </div>
              <div className="space-y-2 col-span-2 sm:col-span-1">
                <label className="font-label-lg text-on-surface-variant">Contact Email</label>
                <input className="w-full p-3 rounded-xl border border-outline-variant focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" type="email" value="admin@organicharvest.pk"/>
              </div>
              <div className="space-y-2 col-span-2">
                <label className="font-label-lg text-on-surface-variant">Business Address</label>
                <textarea className="w-full p-3 rounded-xl border border-outline-variant focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" rows="3">Plot 45, Industrial Estate Phase 2, Multan Road, Lahore, Pakistan</textarea>
              </div>
            </div>
          </section>

          {/* Payment Gateways Section */}
          <section className="bg-white p-8 rounded-3xl shadow-sm border border-zinc-100">
            <h3 className="font-headline-md text-on-surface mb-6">Payment Gateways</h3>
            <div className="space-y-4">
              {/* EasyPaisa */}
              <div className="p-6 rounded-2xl bg-surface-container border border-zinc-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center border border-zinc-100">
                    <img alt="EasyPaisa Logo" className="w-8 h-8 object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBF6A-03HLU9bbZvdnkX2tac4tnlznPy_elbT4MCaowHaV1pOLn4HhGRaMzVws8r-4ccxDShANbYhI0JJUUnuwvwDU-7D10fKiSedg7SRn69NmR0drWvSeuXmlEf7jgBzMRv5PN1DRnG3WUyG5-efS-x7WB8i0Ss9jfZiHWg8UQv2k-E9Y9_etm89Bxy-yxlAmzN2hRsuWwxr5wPP6jXC4CQgO1ThuEZqvQthef-K1aHF4PhlxCfYKgS_AnAKDQSnXrfk9hp0fXs3iY"/>
                  </div>
                  <div>
                    <h4 className="font-label-lg text-on-surface">EasyPaisa</h4>
                    <p className="font-label-sm text-on-surface-variant">Active • 0.5% Transaction fee</p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-primary-container text-on-primary-container rounded-lg font-label-lg hover:opacity-90">Configure</button>
              </div>

              {/* JazzCash */}
              <div className="p-6 rounded-2xl bg-surface-container border border-zinc-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center border border-zinc-100">
                    <img alt="JazzCash Logo" className="w-8 h-8 object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuByojza8X9u0ffhkdVsVIGmTwqUbDUCHTgJy7E31bxRb706xAul8pLCBXSzdtO33UvmrrGobp3AYO73vlLB64b0RYzJxR7FgD-9SaHkSkZg4VidxHsdoLIKU5l3S5vBljy1lDJ9EoWHuuvMOs6FSSZdYQoPfOP-Hq4pGbgnYjlz8Hy3Qdm_E9CXieiyHEzLNUbrooYDp_9XHjkYlJvxPaDmRhuDZ0NDzIF_Af4DooXGZOMUwb0h1hpFt8gym3mmYQe7X-agmo4stpnV"/>
                  </div>
                  <div>
                    <h4 className="font-label-lg text-on-surface">JazzCash</h4>
                    <p className="font-label-sm text-on-surface-variant">Inactive • Instant settlement</p>
                  </div>
                </div>
                <button className="px-4 py-2 border border-primary text-primary rounded-lg font-label-lg hover:bg-primary/5">Activate</button>
              </div>
            </div>
          </section>

          {/* Shipping Rules */}
          <section className="bg-white p-8 rounded-3xl shadow-sm border border-zinc-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-headline-md text-on-surface">Shipping Rules</h3>
              <button className="text-primary flex items-center gap-1 font-label-lg">
                <span className="material-symbols-outlined text-[18px]">add_circle</span>
                Add Zone
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 rounded-xl border border-outline-variant border-dashed">
                <div>
                  <p className="font-label-lg text-on-surface">Lahore Metropolitan</p>
                  <p className="font-label-sm text-on-surface-variant">Flat Rate: Rs. 150 • Delivery in 4-6 hours</p>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant">edit</span>
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl border border-outline-variant border-dashed">
                <div>
                  <p className="font-label-lg text-on-surface">Punjab Region</p>
                  <p className="font-label-sm text-on-surface-variant">Weight-based • Rs. 80 per kg • Delivery in 24 hours</p>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant">edit</span>
              </div>
            </div>
          </section>

          {/* Notification Preferences */}
          <section className="bg-white p-8 rounded-3xl shadow-sm border border-zinc-100">
            <h3 className="font-headline-md text-on-surface mb-6">Notification Preferences</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-label-lg text-on-surface">Email Notifications</p>
                  <p className="font-label-sm text-on-surface-variant">Daily summary of orders and inventory alerts</p>
                </div>
                <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-label-lg text-on-surface">SMS Alerts</p>
                  <p className="font-label-sm text-on-surface-variant">Real-time alerts for high-value orders</p>
                </div>
                <div className="w-12 h-6 bg-zinc-200 rounded-full relative cursor-pointer">
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                </div>
              </div>
            </div>
          </section>

          {/* Actions */}
          <div className="flex items-center justify-end gap-4 pb-12">
            <button className="px-8 py-3 rounded-xl border border-outline text-on-surface font-label-lg hover:bg-surface-container transition-colors">Discard Changes</button>
            <button className="px-10 py-3 rounded-xl bg-primary text-on-primary font-label-lg shadow-xl shadow-primary/25 hover:scale-[1.02] active:scale-[0.98] transition-all">Save Configuration</button>
          </div>
          </>
          )}

          {activeTab === 'units' && (
            <UnitsManagement />
          )}

          {activeTab === 'origin' && (
            <OriginManagement />
          )}

          {activeTab === 'currency' && (
            <CurrencyManagement />
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default SettingsManagement;
