import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Zap, LogIn, Eye, EyeOff, AlertCircle, Info } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const result = await login(email, password);

    if (result.success) {
      navigate('/', { replace: true });
    } else {
      setError(result.error || 'Login failed');
    }

    setIsLoading(false);
  };

  const fillDemoCredentials = () => {
    setEmail('demo@learnnova.com');
    setPassword('demo1234');
    setError('');
  };

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }}></div>

      {/* Glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 blur-3xl rounded-full"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/3 blur-3xl rounded-full"></div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/10 text-accent mb-6 shadow-sm">
            <Zap className="w-8 h-8" />
          </div>
          <h2 className="font-display text-3xl font-bold tracking-tight text-text mb-2">LearnNova</h2>
          <p className="text-text-muted font-sans text-sm">
            Welcome back, please sign in to your account.
          </p>
        </motion.div>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="border border-border bg-surface p-8 rounded-2xl shadow-xl"
        >
          <div className="pb-6 mb-6">
            <h1 className="font-display text-2xl font-bold text-text">
              Sign In
            </h1>
            <p className="font-sans text-sm text-text-muted mt-1">
              Enter your details to proceed
            </p>
          </div>

          {/* Error message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 p-3 bg-danger/10 border border-danger/30 text-danger text-xs font-display tracking-wide mb-5"
            >
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="font-sans text-sm font-medium text-text-muted block mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-3 bg-surface-light border border-border rounded-xl text-text text-sm font-sans focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all placeholder:text-text-muted/50"
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="font-sans text-sm font-medium text-text-muted block mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-3 pr-12 bg-surface-light border border-border rounded-xl text-text text-sm font-sans focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all placeholder:text-text-muted/50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 px-6 py-3.5 bg-accent text-white font-medium text-sm rounded-xl shadow-lg shadow-accent/25 hover:bg-accent/90 focus:ring-4 focus:ring-accent/20 transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Logging in...
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Sign In
                </>
              )}
            </button>
          </form>
        </motion.div>

        {/* Demo Credentials Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-6 border border-border bg-surface-light/50 p-5 rounded-xl text-center flex items-center justify-between"
        >
          <div className="text-left">
            <p className="font-sans font-medium text-sm text-text">Demo Access</p>
            <p className="font-sans text-xs text-text-muted mt-1">Use <span className="font-mono text-text bg-border/50 px-1 rounded">demo@learnnova.com</span></p>
          </div>
          <button
            onClick={fillDemoCredentials}
            className="px-4 py-2 bg-surface border border-border text-text font-medium text-xs rounded-lg hover:border-accent hover:text-accent transition-all shadow-sm"
          >
            Auto-Fill
          </button>
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center mt-8 text-xs text-text-muted font-sans"
        >
          LearnNova &copy; {new Date().getFullYear()}
        </motion.p>
      </motion.div>
    </div>
  );
}
