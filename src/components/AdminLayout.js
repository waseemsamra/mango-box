import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const AdminLayout = ({ children, title, description, actionButtons }) => {
  const location = useLocation();
  
  const navigationItems = [
    {
      name: 'Dashboard',
      href: '/admin/dashboard',
      icon: 'leaderboard',
      active: location.pathname === '/admin/dashboard'
    },
    {
      name: 'Inventory',
      href: '/admin/inventory',
      icon: 'inventory_2',
      active: location.pathname === '/admin/inventory'
    },
    {
      name: 'Products',
      href: '/admin/products',
      icon: 'inventory',
      active: location.pathname === '/admin/products'
    },
    {
      name: 'Categories',
      href: '/admin/categories',
      icon: 'category',
      active: location.pathname === '/admin/categories'
    },
    {
      name: 'Users',
      href: '/admin/users',
      icon: 'group',
      active: location.pathname === '/admin/users'
    },
    {
      name: 'Settings',
      href: '/admin/settings',
      icon: 'settings',
      active: location.pathname === '/admin/settings'
    }
  ];

  return (
    <div className="bg-background text-on-background min-h-screen overflow-hidden">
      {/* SideNavBar */}
      <aside className="h-screen w-64 border-r fixed left-0 top-0 bg-white dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800 shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-40">
        <div className="flex flex-col h-full p-4">
          {/* Brand Logo Header */}
          <div className="flex items-center gap-3 px-4 py-6 mb-4">
            <div className="w-10 h-10 bg-primary-container rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-white" style={{fontVariationSettings: "'FILL' 1"}}>eco</span>
            </div>
            <div>
              <h1 className="text-xl font-extrabold tracking-tight text-green-700 dark:text-green-500">Organic Harvest</h1>
              <p className="font-['Plus_Jakarta_Sans'] text-sm font-medium text-zinc-500">Admin Dashboard</p>
            </div>
          </div>
          
          {/* Navigation Links */}
          <nav className="flex-1 space-y-1">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                  item.active
                    ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 font-semibold'
                    : 'text-zinc-500 dark:text-zinc-400 hover:text-green-600 dark:hover:text-green-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
                }`}
                to={item.href}
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                <span className="font-['Plus_Jakarta_Sans'] text-sm">{item.name}</span>
              </Link>
            ))}
          </nav>
          
          {/* CTA & Footer */}
          <div className="mt-auto space-y-4">
            <button className="w-full py-3 px-4 bg-primary text-on-primary rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:opacity-90 transition-all active:scale-95">
              <span className="material-symbols-outlined">add_circle</span>
              Add New Product
            </button>
            <div className="pt-4 border-t border-zinc-100">
              <Link className="flex items-center gap-3 px-4 py-3 text-zinc-500 dark:text-zinc-400 hover:text-error dark:hover:text-error transition-colors duration-200" to="/admin">
                <span className="material-symbols-outlined">logout</span>
                <span className="font-['Plus_Jakarta_Sans'] text-sm font-medium">Logout</span>
              </Link>
            </div>
          </div>
        </div>
      </aside>

      {/* TopNavBar - Fixed Position */}
      <header className="fixed top-0 left-64 right-0 h-16 z-30 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-zinc-100 dark:border-zinc-800">
        <div className="flex items-center justify-between px-4 h-full">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-96">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-sm">search</span>
              <input 
                className="w-full pl-10 pr-4 py-2 bg-surface-container rounded-full border-none focus:ring-2 focus:ring-primary/20 text-sm outline-none" 
                placeholder="Search..." 
                type="text"
              />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button className="text-zinc-400 hover:text-green-600 transition-colors relative">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-0 right-0 w-2 h-2 bg-error rounded-full"></span>
            </button>
            <button className="text-zinc-400 hover:text-green-600 transition-colors">
              <span className="material-symbols-outlined">help</span>
            </button>
            <div className="h-8 w-8 rounded-full overflow-hidden border-2 border-primary-container">
              <img 
                alt="Admin User Profile" 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgjev8t7cmvw_n0EB0hu7WtJTq3-6EqwNCI1r6DZssibb5gWXIAAfL6xjBu7lMAnzRk_SGrt11zTRWaz5Y0_clm88Fyz_9Q2HBbij02-t84YnX9ERQkYTSnKUiJtSWuormj4Luza6Z3Ig7RS0QvGaW2_nmpXjf-UlWvfaq-H9QcrD4NgVGydpWMZOM0M0dc6rGbsDmko2ozj1l95QBXwGgUV7mhKbadwP9n3jh_46xvhEXAVSrCJfCH_b03AKpBelq6KKh11FQHoOR"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area - SPA Style */}
      <main className="pt-16 ml-64 min-h-screen overflow-y-auto">
        {/* Page Header */}
        <div className="px-4 py-4 border-b border-zinc-100 dark:border-zinc-800">
          <div className="flex items-end justify-between">
            <div>
              {title && <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">{title}</h2>}
              {description && <p className="font-body-md text-body-md text-on-surface-variant mt-1">{description}</p>}
            </div>
            <div className="flex gap-3">
              {actionButtons ? (
                actionButtons
              ) : (
                <>
                  <button className="flex items-center gap-2 px-4 py-2 bg-white border border-outline-variant text-on-surface-variant rounded-xl font-bold hover:bg-zinc-50 transition-colors active:scale-95 shadow-sm">
                    <span className="material-symbols-outlined text-xl">file_download</span>
                    Export
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-xl font-bold hover:opacity-90 transition-all active:scale-95 shadow-lg shadow-primary/20">
                    <span className="material-symbols-outlined text-xl">add</span>
                    Add New
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Content Area - SPA Component */}
        <div className="p-4">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
