import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Varieties from './pages/Varieties';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import UserManagement from './pages/UserManagement';
import InventoryManagement from './pages/InventoryManagement';
import Products from './pages/Products';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';
import CategoriesManagement from './pages/CategoriesManagement';
import AddCategory from './pages/AddCategory';
import EditCategory from './pages/EditCategory';
import ViewCategory from './pages/ViewCategory';
import SettingsManagement from './pages/SettingsManagement';
import HybridSettings from './pages/HybridSettings';
import SystemTesting from './pages/SystemTesting';
import Footer from './components/Footer';
import BottomNav from './components/BottomNav';
import FloatingActionButton from './components/FloatingActionButton';
import SyncStatus from './components/SyncStatus';
import { useDatabase } from './hooks/useDatabase';
import { initDatabase } from './database/init';

function App() {
  const { isInitialized, isLoading, error, retry } = useDatabase();

  useEffect(() => {
    // Initialize database when app starts
    initDatabase().catch(console.error);
    
    // Register service worker for production
    if (process.env.NODE_ENV === 'production') {
      const registerServiceWorker = async () => {
        if ('serviceWorker' in navigator) {
          try {
            const registration = await navigator.serviceWorker.register('/service-worker.js');
            console.log('Service Worker registered:', registration);
          } catch (error) {
            console.log('Service Worker registration failed:', error);
          }
        }
      };
      
      registerServiceWorker();
    }
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-on-surface">Initializing KisanFresh...</h2>
          <p className="text-sm text-on-surface-variant mt-2">Setting up your fresh produce database</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-error/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-error text-2xl">error</span>
          </div>
          <h2 className="text-xl font-semibold text-on-surface">Initialization Failed</h2>
          <p className="text-sm text-on-surface-variant mt-2">{error}</p>
          <button 
            onClick={retry}
            className="mt-4 px-6 py-2 bg-primary text-white rounded-xl font-medium hover:opacity-90 transition-all"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="bg-background text-on-background font-body-md antialiased w-screen overflow-x-hidden">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/varieties" element={<Varieties />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/inventory" element={<InventoryManagement />} />
          <Route path="/admin/products" element={<Products />} />
          <Route path="/admin/products/add" element={<AddProduct />} />
          <Route path="/admin/products/edit/:id" element={<EditProduct />} />
          <Route path="/admin/categories" element={<CategoriesManagement />} />
          <Route path="/admin/categories/add" element={<AddCategory />} />
          <Route path="/admin/categories/edit/:id" element={<EditCategory />} />
          <Route path="/admin/categories/view/:id" element={<ViewCategory />} />
          <Route path="/admin/settings" element={<SettingsManagement />} />
          <Route path="/admin/hybrid-settings" element={<HybridSettings />} />
          <Route path="/admin/system-testing" element={<SystemTesting />} />
        </Routes>
        <BottomNav />
        <FloatingActionButton />
        <SyncStatus />
      </div>
    </Router>
  );
}

export default App;
