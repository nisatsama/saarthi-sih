import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ApplicantProfile } from '../../types';
import { 
  User, 
  Save, 
  CheckCircle2, 
  ShieldCheck, 
  GraduationCap, 
  IndianRupee, 
  Building2, 
  Lock,
  AlertCircle
} from 'lucide-react';

export const ApplicantProfilePage: React.FC = () => {
  const { profile, updateProfile } = useApp();
  const [formData, setFormData] = useState<ApplicantProfile>(profile);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleChange = (field: keyof ApplicantProfile, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Top Header */}
      <div className="bg-white p-5 rounded-lg border border-[#DCE5E2] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-[#123B5D]">Applicant Profile & DBT Registration</h1>
          <p className="text-xs text-[#64757D] mt-0.5">
            Verified academic, social identity, and banking credentials used for eligibility evaluation
          </p>
        </div>

        {savedSuccess && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#E8F4EF] text-[#247A5A] text-xs font-semibold border border-[#247A5A]/30">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Profile Saved</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: Personal Information */}
        <div className="bg-white p-5 rounded-lg border border-[#DCE5E2] space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#DCE5E2]">
            <User className="w-4 h-4 text-[#176B87]" />
            <h2 className="text-sm font-bold text-[#123B5D]">1. Personal Information</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-medium text-[#263640] mb-1">Full Name (as per Certificate) *</label>
              <input
                type="text"
                value={formData.fullName}
                onChange={e => handleChange('fullName', e.target.value)}
                required
                className="w-full px-3 py-2 border border-[#DCE5E2] rounded-md focus:border-[#176B87] focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-medium text-[#263640] mb-1">Date of Birth *</label>
              <input
                type="date"
                value={formData.dob}
                onChange={e => handleChange('dob', e.target.value)}
                required
                className="w-full px-3 py-2 border border-[#DCE5E2] rounded-md focus:border-[#176B87] focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-medium text-[#263640] mb-1">Gender *</label>
              <select
                value={formData.gender}
                onChange={e => handleChange('gender', e.target.value)}
                className="w-full px-3 py-2 border border-[#DCE5E2] rounded-md focus:border-[#176B87] focus:outline-none bg-white"
              >
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </select>
            </div>

            <div>
              <label className="block font-medium text-[#263640] mb-1">Mobile Number (Aadhaar Linked) *</label>
              <input
                type="tel"
                value={formData.mobile}
                onChange={e => handleChange('mobile', e.target.value)}
                required
                className="w-full px-3 py-2 border border-[#DCE5E2] rounded-md focus:border-[#176B87] focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-medium text-[#263640] mb-1">Email Address *</label>
              <input
                type="email"
                value={formData.email}
                disabled
                className="w-full px-3 py-2 border border-[#DCE5E2] bg-slate-50 text-[#64757D] rounded-md cursor-not-allowed"
              />
              <span className="text-[10px] text-[#64757D] mt-0.5 block">Managed via demo account</span>
            </div>

            <div>
              <label className="block font-medium text-[#263640] mb-1">State of Domicile *</label>
              <input
                type="text"
                value={formData.state}
                onChange={e => handleChange('state', e.target.value)}
                required
                className="w-full px-3 py-2 border border-[#DCE5E2] rounded-md focus:border-[#176B87] focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-medium text-[#263640] mb-1">District *</label>
              <input
                type="text"
                value={formData.district}
                onChange={e => handleChange('district', e.target.value)}
                required
                className="w-full px-3 py-2 border border-[#DCE5E2] rounded-md focus:border-[#176B87] focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-medium text-[#263640] mb-1">PIN Code *</label>
              <input
                type="text"
                value={formData.pincode}
                onChange={e => handleChange('pincode', e.target.value)}
                required
                className="w-full px-3 py-2 border border-[#DCE5E2] rounded-md focus:border-[#176B87] focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-medium text-[#263640] mb-1">Permanent Residential Address</label>
              <input
                type="text"
                value={formData.fullAddress}
                onChange={e => handleChange('fullAddress', e.target.value)}
                className="w-full px-3 py-2 border border-[#DCE5E2] rounded-md focus:border-[#176B87] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Tribal Identity & Caste Validation */}
        <div className="bg-white p-5 rounded-lg border border-[#DCE5E2] space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#DCE5E2]">
            <ShieldCheck className="w-4 h-4 text-[#247A5A]" />
            <h2 className="text-sm font-bold text-[#123B5D]">2. Scheduled Tribe (ST) Certification</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-medium text-[#263640] mb-1">Social Category</label>
              <div className="px-3 py-2 bg-[#E8F4EF] border border-[#247A5A]/30 rounded-md text-[#247A5A] font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Scheduled Tribe (ST)</span>
              </div>
            </div>

            <div>
              <label className="block font-medium text-[#263640] mb-1">Tribe / Community Name *</label>
              <input
                type="text"
                value={formData.tribeCommunity}
                onChange={e => handleChange('tribeCommunity', e.target.value)}
                required
                className="w-full px-3 py-2 border border-[#DCE5E2] rounded-md focus:border-[#176B87] focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-medium text-[#263640] mb-1">ST Certificate Number *</label>
              <input
                type="text"
                value={formData.certificateNo}
                onChange={e => handleChange('certificateNo', e.target.value)}
                required
                className="w-full px-3 py-2 border border-[#DCE5E2] rounded-md focus:border-[#176B87] focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block font-medium text-[#263640] mb-1">Issuing Authority *</label>
              <input
                type="text"
                value={formData.issuingAuthority}
                onChange={e => handleChange('issuingAuthority', e.target.value)}
                required
                className="w-full px-3 py-2 border border-[#DCE5E2] rounded-md focus:border-[#176B87] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Educational Qualifications */}
        <div className="bg-white p-5 rounded-lg border border-[#DCE5E2] space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#DCE5E2]">
            <GraduationCap className="w-4 h-4 text-[#176B87]" />
            <h2 className="text-sm font-bold text-[#123B5D]">3. Academic Enrolment & Record</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="sm:col-span-2">
              <label className="block font-medium text-[#263640] mb-1">University / Institute Name *</label>
              <input
                type="text"
                value={formData.institution}
                onChange={e => handleChange('institution', e.target.value)}
                required
                className="w-full px-3 py-2 border border-[#DCE5E2] rounded-md focus:border-[#176B87] focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-medium text-[#263640] mb-1">Current Academic Programme *</label>
              <select
                value={formData.programme}
                onChange={e => handleChange('programme', e.target.value as any)}
                className="w-full px-3 py-2 border border-[#DCE5E2] rounded-md focus:border-[#176B87] focus:outline-none bg-white"
              >
                <option value="PhD">Doctor of Philosophy (PhD)</option>
                <option value="MTech">Master of Technology (MTech)</option>
                <option value="PostGraduate">Post Graduate (MA / MSc / MCom)</option>
                <option value="UnderGraduate">Under Graduate (BTech / MBBS / BA)</option>
              </select>
            </div>

            <div>
              <label className="block font-medium text-[#263640] mb-1">Course / Specialization</label>
              <input
                type="text"
                value={formData.course}
                onChange={e => handleChange('course', e.target.value)}
                className="w-full px-3 py-2 border border-[#DCE5E2] rounded-md focus:border-[#176B87] focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-medium text-[#263640] mb-1">Qualifying Degree Percentage (%) *</label>
              <input
                type="number"
                step="0.1"
                value={formData.marksPercentage}
                onChange={e => handleChange('marksPercentage', parseFloat(e.target.value))}
                required
                className="w-full px-3 py-2 border border-[#DCE5E2] rounded-md focus:border-[#176B87] focus:outline-none font-semibold text-[#185C46]"
              />
              <span className="text-[10px] text-[#64757D] mt-0.5 block">Used for eligibility threshold checks (&gt;= 55%)</span>
            </div>

            <div>
              <label className="block font-medium text-[#263640] mb-1">Enrolment / Roll Number</label>
              <input
                type="text"
                value={formData.rollNo}
                onChange={e => handleChange('rollNo', e.target.value)}
                className="w-full px-3 py-2 border border-[#DCE5E2] rounded-md focus:border-[#176B87] focus:outline-none font-mono"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Income & Financial Information */}
        <div className="bg-white p-5 rounded-lg border border-[#DCE5E2] space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#DCE5E2]">
            <IndianRupee className="w-4 h-4 text-[#C58A27]" />
            <h2 className="text-sm font-bold text-[#123B5D]">4. Income Declaration</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-medium text-[#263640] mb-1">Annual Parental / Family Income (₹) *</label>
              <input
                type="number"
                value={formData.annualFamilyIncome}
                onChange={e => handleChange('annualFamilyIncome', parseInt(e.target.value) || 0)}
                required
                className="w-full px-3 py-2 border border-[#DCE5E2] rounded-md focus:border-[#176B87] focus:outline-none font-semibold"
              />
              <span className="text-[10px] text-[#64757D] mt-0.5 block">
                Must match the value on your revenue income certificate
              </span>
            </div>

            <div>
              <label className="block font-medium text-[#263640] mb-1">Income Certificate Number</label>
              <input
                type="text"
                value={formData.incomeCertificateNo}
                onChange={e => handleChange('incomeCertificateNo', e.target.value)}
                className="w-full px-3 py-2 border border-[#DCE5E2] rounded-md focus:border-[#176B87] focus:outline-none font-mono"
              />
            </div>
          </div>
        </div>

        {/* Section 5: Bank & DBT Connectivity */}
        <div className="bg-white p-5 rounded-lg border border-[#DCE5E2] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#DCE5E2]">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#123B5D]" />
              <h2 className="text-sm font-bold text-[#123B5D]">5. Bank & Direct Benefit Transfer (DBT)</h2>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#E8F4EF] text-[#247A5A] text-[11px] font-semibold border border-[#247A5A]/30">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Aadhaar NPCI Mapper: LINKED</span>
            </div>
          </div>

          <div className="p-3 bg-[#EAF3F8] border border-[#176B87]/20 rounded-md text-xs text-[#263640] flex items-start gap-2.5">
            <Lock className="w-4 h-4 text-[#176B87] shrink-0 mt-0.5" />
            <p className="leading-relaxed text-[11px]">
              Bank account credentials are protected. Direct Benefit Transfers are processed via NPCI Aadhaar Payment Bridge. Sensitive digits remain masked in accordance with data privacy guidelines.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-medium text-[#263640] mb-1">Account Holder Name</label>
              <input
                type="text"
                value={formData.accountHolderName}
                disabled
                className="w-full px-3 py-2 border border-[#DCE5E2] bg-slate-50 text-[#64757D] rounded-md cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block font-medium text-[#263640] mb-1">Bank Name</label>
              <input
                type="text"
                value={formData.bankName}
                disabled
                className="w-full px-3 py-2 border border-[#DCE5E2] bg-slate-50 text-[#64757D] rounded-md cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block font-medium text-[#263640] mb-1">Account Number (Masked)</label>
              <input
                type="text"
                value={formData.maskedAccountNumber}
                disabled
                className="w-full px-3 py-2 border border-[#DCE5E2] bg-slate-50 font-mono text-[#64757D] rounded-md cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block font-medium text-[#263640] mb-1">IFSC Code</label>
              <input
                type="text"
                value={formData.ifscCode}
                disabled
                className="w-full px-3 py-2 border border-[#DCE5E2] bg-slate-50 font-mono text-[#64757D] rounded-md cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="submit"
            className="px-5 py-2.5 bg-[#176B87] hover:bg-[#123B5D] text-white text-xs font-semibold rounded-md transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <Save className="w-4 h-4" />
            <span>Save Profile Updates</span>
          </button>
        </div>
      </form>
    </div>
  );
};
