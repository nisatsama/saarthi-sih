import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SaarthiLogo } from '../../components/SaarthiLogo';
import { 
  Mail, 
  Lock, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  AlertCircle,
  ArrowLeft
} from 'lucide-react';

interface LoginPageProps {
  onSuccess: () => void;
  onGoToRegister: () => void;
  onGoToLanding: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onSuccess,
  onGoToRegister,
  onGoToLanding
}) => {
  const { login, setToast } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password) {
      setError('Incorrect email or password.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const result = login(email, password);
      setLoading(false);

      if (result.success) {
        onSuccess();
      } else {
        setError(result.error || 'Incorrect email or password.');
      }
    }, 200);
  };

  return (
    <div className="min-h-screen bg-[#F8FAF9] flex flex-col justify-between font-sans text-[#263640]">
      {/* Top Institutional Header */}
      <div className="bg-[#123B5D] text-white px-4 lg:px-8 py-2 text-xs flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="font-semibold">भारत सरकार • Government of India</span>
          <span className="text-slate-400">|</span>
          <span className="text-slate-300">Ministry of Tribal Affairs (MoTA)</span>
        </div>
        <button
          onClick={onGoToLanding}
          className="text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer text-xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Public Portal</span>
        </button>
      </div>

      {/* Main Login Center Card */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md bg-white rounded-lg border border-[#DCE5E2] shadow-sm overflow-hidden">
          {/* Brand Header */}
          <div className="p-6 pb-4 border-b border-[#DCE5E2] bg-white">
            <div className="flex items-center gap-3">
              <SaarthiLogo size={36} />
              <div>
                <h2 className="text-base font-bold text-[#123B5D] leading-tight">
                  SAARTHI
                </h2>
                <p className="text-[11px] text-[#64757D]">
                  Scholarship & Fellowship Management
                </p>
              </div>
            </div>
            <div className="mt-4">
              <h1 className="text-lg font-bold text-[#123B5D] tracking-tight">
                Sign in to your account
              </h1>
            </div>
          </div>

          {/* Form */}
          <div className="p-6">
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-start gap-2.5 text-xs text-[#C84B4B] animate-in fade-in">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email field */}
              <div>
                <label className="block text-xs font-semibold text-[#123B5D] mb-1.5">
                  Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full pl-9 pr-3.5 py-2 text-xs border border-[#DCE5E2] rounded-md focus:outline-none focus:border-[#176B87] focus:ring-1 focus:ring-[#176B87] text-[#263640] transition"
                  />
                </div>
              </div>

              {/* Password field */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-[#123B5D]">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setToast('Password reset instructions will be sent to your registered email.')}
                    className="text-[11px] text-[#176B87] hover:underline cursor-pointer"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-9 pr-9 py-2 text-xs border border-[#DCE5E2] rounded-md focus:outline-none focus:border-[#176B87] focus:ring-1 focus:ring-[#176B87] text-[#263640] transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 bg-[#123B5D] hover:bg-[#176B87] text-white rounded-md text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 mt-2"
              >
                {loading ? (
                  <span>Signing in...</span>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Registration link */}
            <div className="mt-5 pt-4 border-t border-[#DCE5E2] text-center text-xs text-[#64757D]">
              <span>Don't have an account? </span>
              <button
                type="button"
                onClick={onGoToRegister}
                className="font-bold text-[#176B87] hover:underline cursor-pointer"
              >
                Create an account
              </button>
            </div>

            {/* Subtle testing reference in details (not prominent on interface) */}
            <details className="mt-4 pt-2 border-t border-slate-100 text-[10px] text-slate-400 text-center">
              <summary className="cursor-pointer hover:text-slate-600 transition-colors">
                Role Accounts Reference
              </summary>
              <div className="mt-2 text-left bg-[#F8FAF9] p-2.5 rounded border border-[#DCE5E2] space-y-1 font-mono text-[10px] text-slate-600">
                <div 
                  onClick={() => { setEmail('applicant@saarthi.demo'); setPassword('Demo@123'); }}
                  className="cursor-pointer hover:text-[#123B5D] hover:underline"
                >
                  Applicant: applicant@saarthi.demo
                </div>
                <div 
                  onClick={() => { setEmail('officer@saarthi.demo'); setPassword('Demo@123'); }}
                  className="cursor-pointer hover:text-[#123B5D] hover:underline"
                >
                  Officer: officer@saarthi.demo
                </div>
                <div 
                  onClick={() => { setEmail('selection@saarthi.demo'); setPassword('Demo@123'); }}
                  className="cursor-pointer hover:text-[#123B5D] hover:underline"
                >
                  Selection Board: selection@saarthi.demo
                </div>
                <div 
                  onClick={() => { setEmail('finance@saarthi.demo'); setPassword('Demo@123'); }}
                  className="cursor-pointer hover:text-[#123B5D] hover:underline"
                >
                  Finance: finance@saarthi.demo
                </div>
                <div 
                  onClick={() => { setEmail('admin@saarthi.demo'); setPassword('Demo@123'); }}
                  className="cursor-pointer hover:text-[#123B5D] hover:underline"
                >
                  Admin: admin@saarthi.demo
                </div>
              </div>
            </details>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-[#DCE5E2] py-4 px-4 lg:px-8 text-xs text-[#64757D]">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px]">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#123B5D]">SAARTHI</span>
            <span>· Scholarship & Fellowship Management System</span>
          </div>
          <div>
            <span>Ministry of Tribal Affairs, Government of India</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
