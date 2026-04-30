import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// Temporarily bypass database to test admin route
// import { authService } from '../database/services';

const AdminLogin = () => {
  console.log('AdminLogin component rendering...');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Temporarily bypass database authentication for testing
      if (email === 'admin@kisanfresh.com' && password === 'admin123') {
        console.log('Login successful (mock authentication)');
        // Redirect to admin dashboard
        navigate('/admin/dashboard');
      } else {
        throw new Error('Invalid credentials. Use admin@kisanfresh.com / admin123');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    const passwordInput = document.getElementById('password');
    const visibilityIcon = document.querySelector('[data-visibility-toggle] span');
    
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      visibilityIcon.textContent = 'visibility_off';
    } else {
      passwordInput.type = 'password';
      visibilityIcon.textContent = 'visibility';
    }
  };

  return (
    <div className="bg-surface text-on-surface overflow-hidden">
      <main className="flex h-screen w-full">
        {/* Left Panel: Visual & Narration */}
        <section className="hidden lg:flex lg:w-3/5 relative overflow-hidden bg-primary-container">
          <div className="absolute inset-0 z-0">
            <img 
              alt="Agricultural Logistics" 
              className="w-full h-full object-cover opacity-80 mix-blend-multiply" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4yYo2GASMwubm4iMMT5FC11qqqqZb6eW4Kfi4WWmNEMvcS6jBKEODUA7z8Vqcwh9IVPachK5HEez4Gv0AKKNgxiT7idf6bzLqt9YBlb7mO8SlEyu1fz3i5XlHvQJbSWBv1wQ4ZybVwqeN9lIFgGJPcgTgh_uu-EWccOfJqGmsXcGmlxK1s-mIXk0qU_Bt792pX4eE6cRB8mhfg5H3fj87Yhhai4lbvIZ-j9FwUA_DJknDf8wtxJvjXAbgt4dsJQuqVlOUTXjRJXav"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-transparent to-primary/30"></div>
          </div>
          <div className="relative z-10 flex flex-col justify-end p-20 w-full text-on-primary">
            <div className="mb-8">
              <span className="inline-block bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full font-label-lg text-label-lg mb-4">
                Enterprise Portal
              </span>
              <h1 className="font-display text-display leading-tight mb-6">
                Powering Freshness<br/>Across the Nation.
              </h1>
              <p className="font-body-lg text-body-lg max-w-xl opacity-90 leading-relaxed">
                Optimizing the journey from Pakistan's fertile fields to the urban doorstep. Manage supply chains, monitor inventory levels, and ensure quality standards are met at every node.
              </p>
            </div>
            <div className="flex gap-12 mt-12 border-t border-white/20 pt-12">
              <div>
                <div className="font-headline-md text-headline-md">24/7</div>
                <p className="font-label-sm text-label-sm opacity-70">Supply Monitoring</p>
              </div>
              <div>
                <div className="font-headline-md text-headline-md">500+</div>
                <p className="font-label-sm text-label-sm opacity-70">Verified Farmers</p>
              </div>
              <div>
                <div className="font-headline-md text-headline-md">15m</div>
                <p className="font-label-sm text-label-sm opacity-70">Average Harvest-to-Hub</p>
              </div>
            </div>
          </div>
        </section>

        {/* Right Panel: Login Form */}
        <section className="w-full lg:w-2/5 flex flex-col justify-center px-8 md:px-16 lg:px-24 bg-surface relative">
          <div className="max-w-md w-full mx-auto">
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-8">
                <div className="w-10 h-10 bg-primary-container rounded-xl flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-primary-container" style={{fontVariationSettings: "'FILL' 1"}}>eco</span>
                </div>
                <span className="text-green-700 dark:text-green-400 text-xl font-extrabold tracking-tight">SabziFresh</span>
              </div>
              <h2 className="font-headline-lg text-headline-lg text-on-surface mb-2">Admin Gateway</h2>
              <p className="font-body-md text-body-md text-on-surface-variant">Please enter your credentials to access the marketplace dashboard.</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-error-container text-on-error-container rounded-xl">
                <p className="font-body-sm text-body-sm">{error}</p>
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block font-label-lg text-label-lg text-on-surface-variant mb-2" htmlFor="email">
                  Work Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-outline text-[20px]">mail</span>
                  </div>
                  <input 
                    className="block w-full pl-10 pr-4 py-3 bg-surface-container-low border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary focus:border-primary font-body-md transition-all outline-none" 
                    id="email" 
                    name="email" 
                    placeholder="admin@kisanfresh.com" 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block font-label-lg text-label-lg text-on-surface-variant" htmlFor="password">
                    Password
                  </label>
                  <Link className="font-label-sm text-label-sm text-primary hover:underline" to="/forgot-password">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-outline text-[20px]">lock</span>
                  </div>
                  <input 
                    className="block w-full pl-10 pr-12 py-3 bg-surface-container-low border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary focus:border-primary font-body-md transition-all outline-none" 
                    id="password" 
                    name="password" 
                    placeholder="••••••••" 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button 
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-outline" 
                    type="button"
                    onClick={togglePasswordVisibility}
                    data-visibility-toggle
                  >
                    <span className="material-symbols-outlined text-[20px]">visibility</span>
                  </button>
                </div>
              </div>

              <div className="flex items-center">
                <input 
                  className="h-4 w-4 text-primary focus:ring-primary border-outline-variant rounded" 
                  id="remember-me" 
                  name="remember-me" 
                  type="checkbox"
                />
                <label className="ml-2 block font-label-sm text-label-sm text-on-surface-variant" htmlFor="remember-me">
                  Keep me logged in for 30 days
                </label>
              </div>

              <button 
                className="w-full py-4 px-6 bg-primary text-on-primary rounded-xl font-headline-md text-body-md shadow-md shadow-primary/20 hover:bg-primary/90 active:scale-[0.98] transition-all flex items-center justify-center gap-2" 
                type="submit"
              >
                Sign In to Dashboard
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </button>
            </form>

            <div className="mt-12 pt-8 border-t border-outline-variant/30 text-center">
              <p className="font-label-sm text-label-sm text-on-surface-variant">
                Secure Enterprise Authentication. 
                <br/>Authorized personnel only.
              </p>
            </div>
          </div>

          {/* Decorative Organic Element */}
          <div className="absolute bottom-0 right-0 opacity-5 pointer-events-none translate-x-1/4 translate-y-1/4">
            <span className="material-symbols-outlined text-[300px]" style={{fontVariationSettings: "'FILL' 1"}}>potted_plant</span>
          </div>
        </section>
      </main>

      {/* Success/Info Snackbars - purely visual for the login state */}
      <div className="fixed top-8 right-8 flex flex-col gap-4 pointer-events-none">
        <div className="bg-surface-container-highest border-l-4 border-secondary-container p-4 rounded-lg shadow-xl flex items-center gap-4 max-w-sm animate-fade-in">
          <span className="material-symbols-outlined text-on-secondary-container">info</span>
          <div className="font-label-sm text-label-sm text-on-surface">System Status: All logistics nodes operational in Punjab region.</div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
