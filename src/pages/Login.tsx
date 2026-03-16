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
          <div className="inline-flex items-center gap-2.5 bg-accent text-dark px-5 py-3 mb-6">
            <Zap className="w-6 h-6 fill-current" />
            <span className="font-display text-2xl tracking-tighter leading-none">LEARNNOVA</span>
          </div>
          <p className="text-text-muted font-display text-[10px] tracking-widest uppercase">
            Login to your account
          </p>
        </motion.div>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="border border-border bg-surface p-6 sm:p-8 brutal-shadow"
        >
          <div className="border-b border-border pb-4 mb-6">
            <h1 className="font-display text-xl sm:text-2xl font-black text-text uppercase tracking-tight">
              Sign <span className="text-accent">In</span>
            </h1>
            <p className="font-display text-[10px] tracking-widest text-text-muted uppercase mt-1">
              Authenticate to proceed
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
              <label className="font-display text-[10px] tracking-widest text-text-muted uppercase block mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                required
                className="w-full px-4 py-3 bg-dark border border-border text-text text-sm font-display tracking-wide focus:outline-none focus:border-accent transition-colors placeholder:text-text-muted/50"
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="font-display text-[10px] tracking-widest text-text-muted uppercase block mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-3 pr-12 bg-dark border border-border text-text text-sm font-display tracking-wide focus:outline-none focus:border-accent transition-colors placeholder:text-text-muted/50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-accent transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 px-6 py-3.5 bg-accent text-dark font-display font-black text-xs tracking-widest uppercase border border-transparent hover:bg-dark hover:text-accent hover:border-accent transition-all disabled:opacity-60 disabled:cursor-not-allowed brutal-shadow-sm"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-dark/30 border-t-dark rounded-full animate-spin"></div>
                  Logging in...
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
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
          className="mt-4 border border-border bg-dark p-4 sm:p-5"
        >
          <div className="flex items-start gap-3">
            <Info className="w-4 h-4 text-accent shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-display text-[10px] tracking-widest text-accent uppercase mb-3">
                Demo Credentials Available
              </p>
              <div className="space-y-1.5 mb-4">
                <p className="text-xs text-text-muted font-display tracking-wide">
                  Email: <span className="text-text font-mono">demo@learnnova.com</span>
                </p>
                <p className="text-xs text-text-muted font-display tracking-wide">
                  Password: <span className="text-text font-mono">demo1234</span>
                </p>
              </div>
              <button
                onClick={fillDemoCredentials}
                className="px-4 py-2 bg-surface border border-border text-text font-display font-bold text-[10px] tracking-widest uppercase hover:border-accent hover:text-accent transition-all"
              >
                Auto-Fill Demo
              </button>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center mt-6 text-[10px] text-text-muted font-display tracking-widest uppercase"
        >
          LearnNova v1.0 // Learning Platform
        </motion.p>
      </motion.div>
    </div>
  );
}
