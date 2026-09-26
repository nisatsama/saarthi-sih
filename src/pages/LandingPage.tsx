import React from 'react';
import { useApp } from '../context/AppContext';
import { SaarthiLogo } from '../components/SaarthiLogo';
import { 
  ArrowRight, 
  CheckCircle2, 
  Search, 
  Shield, 
  Clock, 
  FileText, 
  Users, 
  Building2,
  Lock,
  Sparkles,
  Zap,
  CreditCard,
  Layers,
  ChevronRight,
  ShieldCheck,
  UserCheck,
  GraduationCap
} from 'lucide-react';

interface LandingPageProps {
  onExploreSchemes: () => void;
  onGoToLogin: () => void;
  onGoToRegister: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ 
  onExploreSchemes, 
  onGoToLogin,
  onGoToRegister 
}) => {
  const { schemes } = useApp();

  return (
    <div className="min-h-screen bg-[#F8FAF9] flex flex-col font-sans text-[#263640]">
      {/* Top Government Notice Bar */}
      <div className="bg-[#123B5D] text-white px-4 lg:px-8 py-2 text-xs flex flex-wrap items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="font-semibold">भारत सरकार • Government of India</span>
          <span className="text-slate-400">|</span>
          <span className="text-slate-300">Ministry of Tribal Affairs (MoTA)</span>
        </div>
        <div className="flex items-center gap-3 text-slate-300">
          <span className="inline-flex items-center gap-1 text-[11px] bg-[#247A5A] text-white px-2.5 py-0.5 rounded-full font-bold">
            Official Ministry Portal
          </span>
          <span className="text-[11px] hidden sm:inline">Direct Benefit Transfer (DBT) Enabled</span>
        </div>
      </div>

      {/* Institutional Top Navbar */}
      <nav className="bg-white border-b border-[#DCE5E2] px-4 lg:px-8 py-3.5 flex items-center justify-between sticky top-0 z-30 shadow-xs">
        <SaarthiLogo size={36} />

        <div className="hidden md:flex items-center gap-6 text-xs font-semibold text-[#123B5D]">
          <a href="#journey" className="hover:text-[#176B87] transition-colors">Student Journey</a>
          <a href="#why" className="hover:text-[#176B87] transition-colors">Why SAARTHI</a>
          <a href="#schemes" className="hover:text-[#176B87] transition-colors">Featured Schemes</a>
          <a href="#roles" className="hover:text-[#176B87] transition-colors">Role-Based Governance</a>
        </div>

        <div className="flex items-center gap-2.5 sm:gap-3">
          <button
            onClick={onExploreSchemes}
            className="hidden sm:inline-block px-3 py-1.5 text-xs font-semibold text-[#176B87] hover:bg-[#EAF3F8] rounded-md transition-colors cursor-pointer"
          >
            Explore Schemes
          </button>
          
          <button
            onClick={onGoToRegister}
            className="px-3.5 py-1.5 text-xs font-semibold border border-[#123B5D] text-[#123B5D] hover:bg-[#EAF3F8] rounded-md transition-colors cursor-pointer"
          >
            Register
          </button>

          <button
            onClick={onGoToLogin}
            className="px-4 py-1.5 text-xs font-bold bg-[#123B5D] hover:bg-[#176B87] text-white rounded-md transition-colors shadow-xs cursor-pointer flex items-center gap-1.5"
          >
            <span>Sign In</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-white border-b border-[#DCE5E2] py-12 lg:py-16 px-4 lg:px-8 relative overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Heading and Narrative */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F4EF] text-[#185C46] text-xs font-semibold border border-[#247A5A]/30">
                <Sparkles className="w-3.5 h-3.5 text-[#247A5A]" />
                <span>Configurable ST Educational Empowerment Architecture</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#123B5D] tracking-tight leading-tight">
                Scholarships & Fellowships, <br />
                <span className="text-[#247A5A]">Within Reach.</span>
              </h1>

              <p className="text-sm sm:text-base text-[#64757D] leading-relaxed max-w-xl">
                A transparent, intelligent platform connecting Scheduled Tribe students with educational opportunities. From automated eligibility scoring to AI-assisted document verification and Direct Benefit Transfer (DBT).
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={onGoToRegister}
                  className="px-5 py-2.5 bg-[#123B5D] hover:bg-[#176B87] text-white rounded-md text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>Register as Applicant</span>
                </button>
                <button
                  onClick={onGoToLogin}
                  className="px-4 py-2.5 bg-[#EAF3F8] hover:bg-[#d5e7f1] text-[#176B87] rounded-md text-xs font-semibold border border-[#176B87]/30 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Portal Sign In</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={onExploreSchemes}
                  className="px-3.5 py-2.5 text-[#64757D] hover:text-[#123B5D] text-xs font-medium cursor-pointer"
                >
                  Explore Schemes →
                </button>
              </div>

              <div className="pt-4 grid grid-cols-3 gap-4 border-t border-[#DCE5E2] text-xs">
                <div>
                  <div className="text-xl font-bold text-[#123B5D]">100%</div>
                  <div className="text-[11px] text-[#64757D]">Paperless Aadhaar DBT</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-[#247A5A]">99.4%</div>
                  <div className="text-[11px] text-[#64757D]">Direct Bank Clearance</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-[#176B87]">14 Days</div>
                  <div className="text-[11px] text-[#64757D]">Average Scrutiny Cycle</div>
                </div>
              </div>
            </div>

            {/* Right Column: Student Stepper Card */}
            <div className="lg:col-span-5" id="journey">
              <div className="bg-[#F8FAF9] p-5 rounded-xl border border-[#DCE5E2] shadow-xs">
                <h3 className="text-xs font-bold text-[#123B5D] uppercase tracking-wider mb-4 pb-2 border-b border-[#DCE5E2] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#247A5A]" />
                  <span>The Transparent Student Lifecycle</span>
                </h3>

                <div className="space-y-3.5 text-xs">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#123B5D] text-white flex items-center justify-center font-bold text-[10px] shrink-0">1</div>
                    <div>
                      <div className="font-semibold text-[#123B5D]">1. Register & Apply</div>
                      <div className="text-[11px] text-[#64757D]">Aadhaar-authenticated profile with auto-eligibility evaluation</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#176B87] text-white flex items-center justify-center font-bold text-[10px] shrink-0">2</div>
                    <div>
                      <div className="font-semibold text-[#123B5D]">2. Scrutiny & AI Document Verification</div>
                      <div className="text-[11px] text-[#64757D]">Automated income & caste certificate validation</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#C58A27] text-white flex items-center justify-center font-bold text-[10px] shrink-0">3</div>
                    <div>
                      <div className="font-semibold text-[#123B5D]">3. Structured Deficiency Redressal</div>
                      <div className="text-[11px] text-[#64757D]">Direct re-upload loop without rejecting genuine applicants</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#247A5A] text-white flex items-center justify-center font-bold text-[10px] shrink-0">4</div>
                    <div>
                      <div className="font-semibold text-[#123B5D]">4. Selection Committee Merit Scoring</div>
                      <div className="text-[11px] text-[#64757D]">Merit-cum-means evaluation & award sanction ordering</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#185C46] text-white flex items-center justify-center font-bold text-[10px] shrink-0">5</div>
                    <div>
                      <div className="font-semibold text-[#123B5D]">5. DBT Disburse & Fellowship</div>
                      <div className="text-[11px] text-[#64757D]">Direct credit via APBS & multi-year milestone tracking</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Role-Based Access Governance section */}
      <section className="bg-[#EAF3F8] border-b border-[#DCE5E2] py-8 px-4 lg:px-8" id="roles">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#176B87]" />
              <h3 className="text-xs font-bold text-[#123B5D] uppercase tracking-wider">
                Role-Based Access Governance
              </h3>
            </div>
            <button
              onClick={onGoToLogin}
              className="text-xs font-semibold text-[#176B87] hover:text-[#123B5D] flex items-center gap-1 cursor-pointer"
            >
              <span>Access Secure Sign In</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
            <div className="p-3 bg-white rounded-lg border border-[#DCE5E2] shadow-xs">
              <div className="text-base mb-1">🎓</div>
              <div className="font-bold text-[#123B5D]">Applicant Portal</div>
              <div className="text-[11px] text-[#64757D] mt-1">Application submission, document locker, deficiency resolution, fellowship progress</div>
            </div>

            <div className="p-3 bg-white rounded-lg border border-[#DCE5E2] shadow-xs">
              <div className="text-base mb-1">🔍</div>
              <div className="font-bold text-[#123B5D]">Scrutiny Officer</div>
              <div className="text-[11px] text-[#64757D] mt-1">Application scrutiny queue, OCR verification, deficiency generation, eligibility checks</div>
            </div>

            <div className="p-3 bg-white rounded-lg border border-[#DCE5E2] shadow-xs">
              <div className="text-base mb-1">⚖️</div>
              <div className="font-bold text-[#123B5D]">Selection Board</div>
              <div className="text-[11px] text-[#64757D] mt-1">Merit-cum-means criteria scoring, dossier evaluation, final award selection</div>
            </div>

            <div className="p-3 bg-white rounded-lg border border-[#DCE5E2] shadow-xs">
              <div className="text-base mb-1">💳</div>
              <div className="font-bold text-[#123B5D]">Finance & DBT</div>
              <div className="text-[11px] text-[#64757D] mt-1">Sanction order generation, NPCI payment batch settlement, failure reconciliation</div>
            </div>

            <div className="p-3 bg-white rounded-lg border border-[#DCE5E2] shadow-xs">
              <div className="text-base mb-1">⚙️</div>
              <div className="font-bold text-[#123B5D]">System Admin</div>
              <div className="text-[11px] text-[#64757D] mt-1">Dynamic rule engine builder, tamper-evident audit logs, platform analytics</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Schemes Section */}
      <section className="py-10 px-4 lg:px-8 max-w-5xl mx-auto w-full" id="schemes">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-[#123B5D]">Available Opportunities</h2>
            <p className="text-xs text-[#64757D]">Centrally managed educational support programs for Scheduled Tribe scholars</p>
          </div>
          <button 
            onClick={onExploreSchemes}
            className="text-xs font-semibold text-[#176B87] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>View All ({schemes.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {schemes.slice(0, 3).map(sch => (
            <div 
              key={sch.id}
              className="p-5 bg-white border border-[#DCE5E2] rounded-xl shadow-xs hover:border-[#176B87]/40 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] text-[#64757D] mb-2">
                  <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded">{sch.code}</span>
                  <span className="text-[#247A5A] font-semibold">{sch.academicLevel}</span>
                </div>
                <h3 className="font-bold text-sm text-[#123B5D] mb-1.5">{sch.name}</h3>
                <p className="text-xs text-[#64757D] line-clamp-3 leading-relaxed mb-4">
                  {sch.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#DCE5E2] flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-[#64757D]">Scholarship Award</div>
                  <div className="font-bold text-xs text-[#123B5D]">
                    ₹{(sch.annualAmount ? Math.round(sch.annualAmount / 12) : 28000).toLocaleString()}/mo
                  </div>
                </div>
                <button
                  onClick={onGoToRegister}
                  className="px-3 py-1.5 bg-[#123B5D] hover:bg-[#176B87] text-white text-xs font-bold rounded-md transition-colors cursor-pointer"
                >
                  Apply
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Core Architectural Pillars */}
      <section className="bg-white border-t border-[#DCE5E2] py-12 px-4 lg:px-8" id="why">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-xl font-bold text-[#123B5D]">Why SAARTHI?</h2>
            <p className="text-xs text-[#64757D] mt-1">
              Purpose-built to eliminate systemic bottlenecks in tribal welfare scholarship distribution
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-lg border border-[#DCE5E2] bg-[#F8FAF9]">
              <div className="w-8 h-8 rounded-lg bg-[#EAF3F8] text-[#176B87] flex items-center justify-center mb-3">
                <Layers className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-[#123B5D] mb-1">Dynamic Policy & Rule Engine</h3>
              <p className="text-xs text-[#64757D] leading-relaxed">
                Rules are maintained as deterministic JSON configurations rather than hardcoded logic. Schemes can be updated without redeploying code.
              </p>
            </div>

            <div className="p-5 rounded-lg border border-[#DCE5E2] bg-[#F8FAF9]">
              <div className="w-8 h-8 rounded-lg bg-[#E8F4EF] text-[#247A5A] flex items-center justify-center mb-3">
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-[#123B5D] mb-1">AI Document Intelligence</h3>
              <p className="text-xs text-[#64757D] leading-relaxed">
                Automated optical extraction cross-verifies applicant declared values with revenue certificates, flagging anomalies instantly.
              </p>
            </div>

            <div className="p-5 rounded-lg border border-[#DCE5E2] bg-[#F8FAF9]">
              <div className="w-8 h-8 rounded-lg bg-[#FCF5E8] text-[#C58A27] flex items-center justify-center mb-3">
                <Clock className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-[#123B5D] mb-1">Deficiency Redressal Loop</h3>
              <p className="text-xs text-[#64757D] leading-relaxed">
                Instead of rejecting genuine applications for minor clerical mismatches, officers issue specific deficiencies with time-bounded cure periods.
              </p>
            </div>

            <div className="p-5 rounded-lg border border-[#DCE5E2] bg-[#F8FAF9]">
              <div className="w-8 h-8 rounded-lg bg-[#EAF3F8] text-[#123B5D] flex items-center justify-center mb-3">
                <CreditCard className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-[#123B5D] mb-1">Automated Sanctions & DBT</h3>
              <p className="text-xs text-[#64757D] leading-relaxed">
                Direct integration with Aadhaar Payment Bridge (APBS) and automated batch generation with real-time exception diagnostics.
              </p>
            </div>

            <div className="p-5 rounded-lg border border-[#DCE5E2] bg-[#F8FAF9]">
              <div className="w-8 h-8 rounded-lg bg-[#E8F4EF] text-[#185C46] flex items-center justify-center mb-3">
                <GraduationCap className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-[#123B5D] mb-1">Fellowship Lifecycle Management</h3>
              <p className="text-xs text-[#64757D] leading-relaxed">
                Multi-year tracking for PhD/MPhil scholars with annual progress report milestones, supervisor certifications, and installment releases.
              </p>
            </div>

            <div className="p-5 rounded-lg border border-[#DCE5E2] bg-[#F8FAF9]">
              <div className="w-8 h-8 rounded-lg bg-[#EAF3F8] text-[#176B87] flex items-center justify-center mb-3">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-[#123B5D] mb-1">Tamper-Evident Audit Trail</h3>
              <p className="text-xs text-[#64757D] leading-relaxed">
                Every state transition, deficiency inquiry, and payment execution is immutably timestamped with actor and old/new values.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Institutional Footer */}
      <footer className="bg-white border-t border-[#DCE5E2] py-6 px-4 lg:px-8 text-xs text-[#64757D]">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <SaarthiLogo size={24} showText={false} />
            <span className="font-bold text-[#123B5D]">SAARTHI</span>
            <span>· Scholarship & Fellowship Management System</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>Ministry of Tribal Affairs, Government of India</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
