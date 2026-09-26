import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useI18n } from '../i18n';
import { LanguageSelector } from '../i18n/LanguageSelector';
import { SaarthiLogo } from './SaarthiLogo';
import { UserRole } from '../types';
import { 
  Bell, 
  Search, 
  ChevronDown, 
  ExternalLink,
  LogOut,
  User as UserIcon,
  ShieldCheck,
  Building2,
  CheckCircle2
} from 'lucide-react';

interface HeaderProps {
  onOpenSearch: () => void;
  onNavigate?: (tab: string) => void;
  onGoToLanding?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSearch, onNavigate, onGoToLanding }) => {
  const { 
    currentUser, 
    notifications, 
    unreadNotificationCount, 
    markNotificationRead, 
    markAllNotificationsRead,
    logout
  } = useApp();
  const { t } = useI18n();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const roleLabels: Record<UserRole, { title: string; badgeColor: string }> = {
    APPLICANT: { title: 'Applicant', badgeColor: 'bg-[#247A5A] text-white' },
    OFFICER: { title: 'Scrutiny Officer', badgeColor: 'bg-[#176B87] text-white' },
    SELECTION_COMMITTEE: { title: 'Selection Board', badgeColor: 'bg-[#123B5D] text-white' },
    FINANCE_OFFICER: { title: 'Finance & DBT', badgeColor: 'bg-[#C58A27] text-white' },
    SUPER_ADMIN: { title: 'Super Admin', badgeColor: 'bg-slate-700 text-white' }
  };

  const handleLogout = () => {
    setShowUserMenu(false);
    logout();
    if (onGoToLanding) {
      onGoToLanding();
    }
  };

  return (
    <header className="bg-white border-b border-[#DCE5E2] sticky top-0 z-30 px-4 lg:px-6 py-2.5 flex items-center justify-between">
      {/* Left: Brand + Official Ministry Info */}
      <div className="flex items-center gap-3">
        <SaarthiLogo size={32} />
        
        <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-[#DCE5E2]">
          <span className="text-xs font-semibold text-[#123B5D]">
            Ministry of Tribal Affairs
          </span>
          <span className="text-slate-300">|</span>
          <span className="text-xs text-[#64757D]">
            Government of India
          </span>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Language Selector */}
        <LanguageSelector variant="header" />

        {/* Public Portal Button */}
        {onGoToLanding && (
          <button
            onClick={onGoToLanding}
            className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-[#176B87] hover:text-[#123B5D] hover:bg-[#EAF3F8] rounded-md transition-colors cursor-pointer border border-transparent hover:border-[#DCE5E2]"
            title={t('common.publicPortal')}
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>{t('common.publicPortal')}</span>
          </button>
        )}

        {/* Global Search Button */}
        <button
          onClick={onOpenSearch}
          className="flex items-center gap-2 px-2.5 py-1.5 text-xs text-[#64757D] bg-[#F8FAF9] hover:bg-slate-100 border border-[#DCE5E2] rounded-md transition-colors cursor-pointer"
          title={t('common.searchPlaceholder')}
        >
          <Search className="w-3.5 h-3.5 text-[#64757D]" />
          <span className="hidden sm:inline">{t('common.search')}...</span>
          <kbd className="hidden sm:inline text-[10px] bg-white border border-[#DCE5E2] px-1.5 rounded text-slate-500 font-mono">⌘K</kbd>
        </button>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-1.5 text-[#64757D] hover:text-[#123B5D] hover:bg-[#F8FAF9] rounded-md border border-[#DCE5E2] transition-colors cursor-pointer"
            title={t('common.notifications')}
          >
            <Bell className="w-4 h-4" />
            {unreadNotificationCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#C84B4B] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {unreadNotificationCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-[#DCE5E2] rounded-lg shadow-lg z-50 overflow-hidden animate-in fade-in">
              <div className="px-3.5 py-2.5 bg-[#F8FAF9] border-b border-[#DCE5E2] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-[#263640]">{t('common.notifications')}</span>
                  {unreadNotificationCount > 0 && (
                    <span className="text-[10px] bg-[#176B87] text-white px-1.5 py-0.5 rounded-full font-medium">
                      {unreadNotificationCount} new
                    </span>
                  )}
                </div>
                {unreadNotificationCount > 0 && (
                  <button 
                    onClick={markAllNotificationsRead}
                    className="text-[11px] text-[#176B87] hover:underline font-medium cursor-pointer"
                  >
                    {t('common.markAllRead')}
                  </button>
                )}
              </div>

              <div className="max-h-72 overflow-y-auto divide-y divide-[#DCE5E2]">
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-xs text-[#64757D]">
                    {t('common.noNotifications')}
                  </div>
                ) : (
                  notifications.map(n => (
                    <div 
                      key={n.id} 
                      onClick={() => markNotificationRead(n.id)}
                      className={`p-3 text-xs transition-colors hover:bg-[#F8FAF9] cursor-pointer ${n.read ? 'opacity-70' : 'bg-[#EAF3F8]/30 font-medium'}`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <span className={`font-semibold ${n.type === 'DEFICIENCY' ? 'text-[#C58A27]' : 'text-[#263640]'}`}>
                          {n.title}
                        </span>
                        <span className="text-[10px] text-[#64757D] shrink-0">{n.createdAt.split(' ')[1] || n.createdAt}</span>
                      </div>
                      <p className="text-[#64757D] text-[11px] leading-relaxed mb-1.5">{n.message}</p>
                      {n.applicationId && (
                        <span className="inline-block text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded border border-slate-200 font-mono">
                          {n.applicationId}
                        </span>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Authenticated User Profile Menu (No persona switcher!) */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 pl-2 pr-2.5 py-1 bg-white hover:bg-slate-50 text-[#123B5D] border border-[#DCE5E2] rounded-md text-xs font-medium transition-colors cursor-pointer"
            title="User Profile and Account"
          >
            <div className="w-6 h-6 rounded-full bg-[#123B5D] text-white flex items-center justify-center font-bold text-[11px]">
              {currentUser.name[0]}
            </div>
            <div className="text-left hidden sm:block">
              <div className="text-[11px] font-bold text-[#123B5D] leading-tight truncate max-w-[130px]">
                {currentUser.name}
              </div>
              <div className="text-[10px] text-[#64757D] leading-none">
                {roleLabels[currentUser.role]?.title || currentUser.role}
              </div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-0.5" />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-white border border-[#DCE5E2] rounded-lg shadow-lg z-50 overflow-hidden py-1 animate-in fade-in">
              {/* User Bio Header */}
              <div className="px-3.5 py-3 bg-[#F8FAF9] border-b border-[#DCE5E2]">
                <div className="font-bold text-xs text-[#123B5D] truncate">{currentUser.name}</div>
                <div className="text-[11px] text-[#64757D] truncate mt-0.5">{currentUser.email}</div>
                <div className="mt-2 flex items-center justify-between">
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${roleLabels[currentUser.role]?.badgeColor || 'bg-slate-700 text-white'}`}>
                    {roleLabels[currentUser.role]?.title || currentUser.role}
                  </span>
                  <span className="text-[10px] text-[#64757D]">
                    {currentUser.state || 'Central'}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="py-1">
                {onNavigate && (
                  <button
                    onClick={() => {
                      onNavigate('profile');
                      setShowUserMenu(false);
                    }}
                    className="w-full text-left px-3.5 py-2 text-xs text-[#263640] hover:bg-[#EAF3F8] transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <UserIcon className="w-3.5 h-3.5 text-[#176B87]" />
                    <span>{t('common.profileSettings')}</span>
                  </button>
                )}

                {onGoToLanding && (
                  <button
                    onClick={() => {
                      onGoToLanding();
                      setShowUserMenu(false);
                    }}
                    className="w-full text-left px-3.5 py-2 text-xs text-[#263640] hover:bg-[#EAF3F8] transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-[#176B87]" />
                    <span>{t('common.publicPortal')}</span>
                  </button>
                )}
              </div>

              {/* Sign Out */}
              <div className="pt-1 border-t border-[#DCE5E2]">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3.5 py-2 text-xs text-[#C84B4B] hover:bg-red-50 transition-colors flex items-center gap-2 font-semibold cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5 text-[#C84B4B]" />
                  <span>{t('common.logout')}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
