import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SaarthiLogo } from '../../components/SaarthiLogo';
import { 
  User, 
  Mail, 
  Lock, 
  Phone, 
  ArrowRight, 
  ArrowLeft, 
  AlertCircle, 
  MapPin
} from 'lucide-react';

interface RegisterPageProps {
  onSuccess: () => void;
  onGoToLogin: () => void;
  onGoToLanding: () => void;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({
  onSuccess,
  onGoToLogin,
  onGoToLanding
}) => {
  const { applicantRegister } = useApp();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [stateName, setStateName] = useState('Jharkhand');
  const [district, setDistrict] = useState('Ranchi');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const statesWithDistricts: Record<string, string[]> = {
    Jharkhand: ['Ranchi', 'Khunti', 'Gumla', 'Simdega', 'West Singhbhum', 'East Singhbhum', 'Dumka', 'Latehar'],
    Odisha: ['Mayurbhanj', 'Sundargarh', 'Koraput', 'Rayagada', 'Malkangiri', 'Nabarangpur', 'Bhubaneswar'],
    Chhattisgarh: ['Bastar', 'Dantewada', 'Sukma', 'Kanker', 'Bijapur', 'Narayanpur', 'Raipur'],
    'Madhya Pradesh': ['Dhar', 'Jhabua', 'Barwani', 'Khargone', 'Mandla', 'Dindori', 'Bhopal'],
    Assam: ['Karbi Anglong', 'Dima Hasao', 'Kokrajhar', 'Chirang', 'Baksa', 'Guwahati'],
    Meghalaya: ['East Khasi Hills', 'West Garo Hills', 'Ri-Bhoi', 'South Garo Hills', 'Shillong'],
    Nagaland: ['Kohima', 'Dimapur', 'Mokokchung', 'Mon', 'Tuensang'],
    Manipur: ['Churachandpur', 'Senapati', 'Tamenglong', 'Ukhrul', 'Chandel'],
    Tripura: ['Dhalai', 'Khowai', 'Gomati', 'West Tripura'],
    'Arunachal Pradesh': ['Papum Pare', 'Changlang', 'Tirap', 'West Kameng'],
    Rajasthan: ['Banswara', 'Dungarpur', 'Pratapgarh', 'Udaipur'],
    Gujarat: ['Dahod', 'Panchmahal', 'Valsad', 'Tapi', 'Narmada'],
    Maharashtra: ['Nandurbar', 'Gadchiroli', 'Palghar', 'Nashik']
  };

  const handleStateChange = (newState: string) => {
    setStateName(newState);
    const districts = statesWithDistricts[newState] || ['District 1'];
    setDistrict(districts[0]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!fullName.trim()) {
      setError('Please provide your full legal name.');
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!mobile.trim() || mobile.replace(/\D/g, '').length < 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }

    if (password.length < 6) {
      setError('Password must contain at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Password and Confirm Password do not match.');
      return;
    }

    if (!stateName || !district) {
      setError('Please select your state and district.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      // Security enforcement: always registers role = APPLICANT
      const res = applicantRegister({
        fullName,
        email,
        password,
        mobile,
        category: 'ST',
        state: stateName,
        district
      });
      setLoading(false);

      if (res.success) {
        onSuccess();
      } else {
        setError(res.error || 'Registration failed. Please verify the entered data.');
      }
    }, 250);
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

      {/* Main Registration Card */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-lg bg-white rounded-lg border border-[#DCE5E2] shadow-sm overflow-hidden my-4">
          {/* Header */}
          <div className="p-6 pb-4 border-b border-[#DCE5E2] bg-white">
            <div className="flex items-center gap-3">
              <SaarthiLogo size={36} />
              <div>
                <h2 className="text-base font-bold text-[#123B5D] leading-tight">
                  SAARTHI
                </h2>
                <p className="text-[11px] text-[#64757D]">
                  Scholarship & Fellowship Management System
                </p>
              </div>
            </div>
            <div className="mt-4">
              <h1 className="text-lg font-bold text-[#123B5D] tracking-tight">
                Create your SAARTHI account
              </h1>
              <p className="text-xs text-[#64757D] mt-1">
                Register to discover scholarships, submit applications and track your awards.
              </p>
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

            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-[#123B5D] mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full pl-9 pr-3.5 py-2 text-xs border border-[#DCE5E2] rounded-md focus:outline-none focus:border-[#176B87] focus:ring-1 focus:ring-[#176B87] text-[#263640] transition"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-semibold text-[#123B5D] mb-1">
                  Email Address *
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

              {/* Mobile Number */}
              <div>
                <label className="block text-xs font-semibold text-[#123B5D] mb-1">
                  Mobile Number *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="tel"
                    required
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="10-digit mobile number"
                    className="w-full pl-9 pr-3.5 py-2 text-xs border border-[#DCE5E2] rounded-md focus:outline-none focus:border-[#176B87] focus:ring-1 focus:ring-[#176B87] text-[#263640] transition"
                  />
                </div>
              </div>

              {/* Password & Confirm Password */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#123B5D] mb-1">
                    Password *
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Min. 6 characters"
                      className="w-full pl-9 pr-3.5 py-2 text-xs border border-[#DCE5E2] rounded-md focus:outline-none focus:border-[#176B87] text-[#263640]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#123B5D] mb-1">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter password"
                      className="w-full pl-9 pr-3.5 py-2 text-xs border border-[#DCE5E2] rounded-md focus:outline-none focus:border-[#176B87] text-[#263640]"
                    />
                  </div>
                </div>
              </div>

              {/* State and District */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#123B5D] mb-1">
                    State *
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <select
                      value={stateName}
                      onChange={(e) => handleStateChange(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs border border-[#DCE5E2] rounded-md focus:outline-none focus:border-[#176B87] bg-white text-[#263640]"
                    >
                      {Object.keys(statesWithDistricts).map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#123B5D] mb-1">
                    District *
                  </label>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-[#DCE5E2] rounded-md focus:outline-none focus:border-[#176B87] bg-white text-[#263640]"
                  >
                    {(statesWithDistricts[stateName] || ['Select District']).map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 bg-[#123B5D] hover:bg-[#176B87] text-white rounded-md text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 mt-3"
              >
                {loading ? (
                  <span>Creating Account...</span>
                ) : (
                  <>
                    <span>Create Account</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Login Link */}
            <div className="mt-5 pt-4 border-t border-[#DCE5E2] text-center text-xs text-[#64757D]">
              <span>Already have an account? </span>
              <button
                type="button"
                onClick={onGoToLogin}
                className="font-bold text-[#176B87] hover:underline cursor-pointer"
              >
                Sign in
              </button>
            </div>
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
