import React from 'react';
import { ActiveTab, Language } from '../types';
import { translations } from '../lib/i18n';
import { Home, Users, Trophy, Video, AlertTriangle, PlusCircle } from 'lucide-react';

interface BottomNavProps {
  activeTab: ActiveTab;
  onChangeTab: (tab: ActiveTab) => void;
  onOpenAddReview: () => void;
  lang: Language;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onChangeTab,
  onOpenAddReview,
  lang,
}) => {
  const t = translations[lang];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-xl border-t border-slate-800/80 px-2 py-1.5 pb-safe shadow-[0_-8px_20px_rgba(0,0,0,0.35)]">
      <div className="max-w-md mx-auto flex items-center justify-around relative">
        {/* Home */}
        <button
          id="nav-tab-home"
          onClick={() => onChangeTab('home')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all duration-200 ${
            activeTab === 'home'
              ? 'text-indigo-400 font-semibold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Home className={`w-5 h-5 mb-0.5 transition-transform ${activeTab === 'home' ? 'scale-110 stroke-[2.5]' : ''}`} />
          <span className="text-[10px] tracking-tight">{t.navHome}</span>
        </button>

        {/* Teachers */}
        <button
          id="nav-tab-teachers"
          onClick={() => onChangeTab('teachers')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all duration-200 ${
            activeTab === 'teachers'
              ? 'text-indigo-400 font-semibold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Users className={`w-5 h-5 mb-0.5 transition-transform ${activeTab === 'teachers' ? 'scale-110 stroke-[2.5]' : ''}`} />
          <span className="text-[10px] tracking-tight">{t.navTeachers}</span>
        </button>

        {/* Center Action: Write Review */}
        <button
          id="nav-action-add-review"
          onClick={onOpenAddReview}
          title={t.submitReviewBtn}
          className="flex flex-col items-center -mt-5 group"
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 text-white flex items-center justify-center shadow-lg shadow-indigo-600/40 ring-4 ring-slate-900 group-active:scale-95 transition-transform">
            <PlusCircle className="w-6 h-6 stroke-[2.2]" />
          </div>
          <span className="text-[9px] font-bold text-indigo-300 mt-0.5 tracking-tight">
            {lang === 'ky' ? 'Пикир' : 'Отзыв'}
          </span>
        </button>

        {/* Leaderboard */}
        <button
          id="nav-tab-leaderboard"
          onClick={() => onChangeTab('leaderboard')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all duration-200 ${
            activeTab === 'leaderboard'
              ? 'text-indigo-400 font-semibold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Trophy className={`w-5 h-5 mb-0.5 transition-transform ${activeTab === 'leaderboard' ? 'scale-110 stroke-[2.5]' : ''}`} />
          <span className="text-[10px] tracking-tight">{t.navLeaderboard}</span>
        </button>

        {/* Videos */}
        <button
          id="nav-tab-videos"
          onClick={() => onChangeTab('videos')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all duration-200 ${
            activeTab === 'videos'
              ? 'text-indigo-400 font-semibold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Video className={`w-5 h-5 mb-0.5 transition-transform ${activeTab === 'videos' ? 'scale-110 stroke-[2.5]' : ''}`} />
          <span className="text-[10px] tracking-tight">{t.navVideos}</span>
        </button>

        {/* Report / Legal */}
        <button
          id="nav-tab-report"
          onClick={() => onChangeTab('report')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all duration-200 ${
            activeTab === 'report'
              ? 'text-amber-400 font-semibold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <AlertTriangle className={`w-5 h-5 mb-0.5 transition-transform ${activeTab === 'report' ? 'scale-110 stroke-[2.5]' : ''}`} />
          <span className="text-[10px] tracking-tight">{lang === 'ky' ? '102 / Укук' : '102 / Помощь'}</span>
        </button>
      </div>
    </nav>
  );
};
