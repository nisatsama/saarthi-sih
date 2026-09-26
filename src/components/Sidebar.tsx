import React from 'react';
import { useApp } from '../context/AppContext';
import { useI18n } from '../i18n';
import { 
  LayoutDashboard, 
  BookOpen, 
  FileCheck2, 
  FolderCheck, 
  GraduationCap, 
  Bell, 
  User, 
  AlertCircle, 
  Layers, 
  Award, 
  IndianRupee, 
  BarChart3, 
  ShieldCheck,
  FileSignature
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  activeTab, 
  onSelectTab,
  mobileOpen = false,
  onCloseMobile
}) => {
  const { currentUser, unreadNotificationCount, applications } = useApp();
  const { t } = useI18n();

  // Pending deficiencies count
  const openDeficiencyCount = applications.filter(a => a.status === 'DEFICIENCY_RAISED').length;
  // Pending review applications count
  const pendingReviewCount = applications.filter(a => a.status === 'UNDER_DOCUMENT_REVIEW' || a.status === 'RESUBMITTED').length;

  interface NavItem {
    id: string;
    label: string;
    icon: React.ElementType;
    badge?: number | string;
    badgeColor?: string;
  }

  interface NavGroup {
    groupTitle: string;
    items: NavItem[];
  }

  const getNavGroups = (): NavGroup[] => {
    switch (currentUser.role) {
      case 'APPLICANT':
        return [
          {
            groupTitle: 'WORKSPACE',
            items: [
              { id: 'dashboard', label: t('common.dashboard'), icon: LayoutDashboard },
              { id: 'schemes', label: t('applicant.schemes'), icon: BookOpen },
              { id: 'applications', label: t('applicant.myApplications'), icon: FileCheck2 },
              { 
                id: 'documents', 
                label: t('applicant.documents'), 
                icon: FolderCheck,
                badge: applications.some(a => a.status === 'DEFICIENCY_RAISED') ? 'Action' : undefined,
                badgeColor: 'bg-[#C58A27]'
              },
              { id: 'fellowship', label: t('applicant.fellowship'), icon: GraduationCap }
            ]
          },
          {
            groupTitle: 'COMMUNICATION',
            items: [
              { 
                id: 'notifications', 
                label: t('common.notifications'), 
                icon: Bell, 
                badge: unreadNotificationCount > 0 ? unreadNotificationCount : undefined,
                badgeColor: 'bg-[#176B87]'
              }
            ]
          },
          {
            groupTitle: 'ACCOUNT',
            items: [
              { id: 'profile', label: t('common.profileDbt'), icon: User }
            ]
          }
        ];

      case 'OFFICER':
        return [
          {
            groupTitle: 'WORKSPACE',
            items: [
              { id: 'dashboard', label: t('common.dashboard'), icon: LayoutDashboard },
              { 
                id: 'applications', 
                label: t('officer.applicationQueue'), 
                icon: FileCheck2,
                badge: pendingReviewCount > 0 ? pendingReviewCount : undefined,
                badgeColor: 'bg-[#176B87]'
              },
              { id: 'scrutiny', label: t('officer.documentVerification'), icon: FolderCheck },
              { 
                id: 'deficiencies', 
                label: t('officer.deficiencies'), 
                icon: AlertCircle,
                badge: openDeficiencyCount > 0 ? openDeficiencyCount : undefined,
                badgeColor: 'bg-[#C58A27]'
              },
              { id: 'verified', label: t('officer.verifiedApplications'), icon: ShieldCheck },
              { id: 'reports', label: t('officer.reports'), icon: BarChart3 }
            ]
          },
          {
            groupTitle: 'COMMUNICATION',
            items: [
              { 
                id: 'notifications', 
                label: t('common.notifications'), 
                icon: Bell, 
                badge: unreadNotificationCount > 0 ? unreadNotificationCount : undefined,
                badgeColor: 'bg-[#176B87]'
              }
            ]
          },
          {
            groupTitle: 'ACCOUNT',
            items: [
              { id: 'profile', label: t('common.profile'), icon: User }
            ]
          }
        ];

      case 'SELECTION_COMMITTEE':
        return [
          {
            groupTitle: 'WORKSPACE',
            items: [
              { id: 'selection', label: 'Selection Board', icon: Award },
              { id: 'applications', label: 'Eligible Dossiers', icon: FileCheck2 },
              { id: 'schemes', label: 'Schemes', icon: BookOpen }
            ]
          },
          {
            groupTitle: 'GOVERNANCE',
            items: [
              { id: 'analytics', label: 'Selection Stats', icon: BarChart3 },
              { id: 'audit', label: 'Audit Trail', icon: ShieldCheck }
            ]
          },
          {
            groupTitle: 'ACCOUNT',
            items: [
              { id: 'profile', label: 'Member Profile', icon: User }
            ]
          }
        ];

      case 'FINANCE_OFFICER':
        return [
          {
            groupTitle: 'WORKSPACE',
            items: [
              { id: 'dashboard', label: 'Finance Dashboard', icon: LayoutDashboard },
              { id: 'sanctions', label: 'Sanction Orders', icon: FileSignature },
              { id: 'payments', label: 'DBT Payment Batches', icon: IndianRupee }
            ]
          },
          {
            groupTitle: 'GOVERNANCE',
            items: [
              { id: 'analytics', label: 'Disbursement Stats', icon: BarChart3 },
              { id: 'audit', label: 'Audit Trail', icon: ShieldCheck }
            ]
          },
          {
            groupTitle: 'ACCOUNT',
            items: [
              { id: 'profile', label: 'Finance Profile', icon: User }
            ]
          }
        ];

      case 'SUPER_ADMIN':
      default:
        return [
          {
            groupTitle: 'WORKSPACE',
            items: [
              { id: 'dashboard', label: 'System Overview', icon: LayoutDashboard },
              { id: 'schemes', label: 'Scheme & Rules Builder', icon: Layers },
              { id: 'applications', label: 'All Applications', icon: FileCheck2 },
              { id: 'sanctions', label: 'Sanctions & DBT', icon: IndianRupee }
            ]
          },
          {
            groupTitle: 'SYSTEM',
            items: [
              { id: 'analytics', label: 'Platform Analytics', icon: BarChart3 },
              { id: 'audit', label: 'Audit Logs', icon: ShieldCheck }
            ]
          },
          {
            groupTitle: 'ACCOUNT',
            items: [
              { id: 'profile', label: 'Admin Settings', icon: User }
            ]
          }
        ];
    }
  };

  const navGroups = getNavGroups();

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div 
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      <aside className={`
        fixed lg:static top-0 bottom-0 left-0 z-40
        w-[245px] shrink-0 bg-[#123B5D] text-white flex flex-col justify-between
        transition-transform duration-200 ease-in-out
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Navigation list */}
        <div className="py-4 px-3 overflow-y-auto">
          {navGroups.map((group, gIdx) => (
            <div key={group.groupTitle} className={gIdx > 0 ? 'mt-6' : ''}>
              <div className="px-3 mb-2 text-[10px] font-semibold tracking-wider text-slate-400">
                {group.groupTitle}
              </div>

              <div className="space-y-0.5">
                {group.items.map(item => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        onSelectTab(item.id);
                        if (onCloseMobile) onCloseMobile();
                      }}
                      className={`
                        w-full flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium
                        transition-colors cursor-pointer
                        ${isActive 
                          ? 'bg-[#176B87] text-white shadow-xs font-semibold' 
                          : 'text-slate-200 hover:bg-white/10 hover:text-white'}
                      `}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-300'}`} />
                        <span>{item.label}</span>
                      </div>

                      {item.badge && (
                        <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full text-white ${item.badgeColor || 'bg-[#176B87]'}`}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer info in sidebar */}
        <div className="p-3 border-t border-white/10 text-[11px] text-slate-300 bg-[#0e2f4a]">
          <div className="font-semibold text-white truncate">{currentUser.name}</div>
          <div className="text-[10px] text-slate-400 truncate">{currentUser.email}</div>
          <div className="mt-1 flex items-center gap-1.5 text-[9px] text-[#247A5A] font-semibold bg-[#247A5A]/20 px-1.5 py-0.5 rounded border border-[#247A5A]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#247A5A]" />
            <span>Role: {currentUser.role.replace('_', ' ')}</span>
          </div>
        </div>
      </aside>
    </>
  );
};
