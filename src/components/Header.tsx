import React from 'react';
import { Language } from '../types';
import { translations } from '../lib/i18n';
import { ShieldCheck, Search, Database, RefreshCw, BookOpen } from 'lucide-react';

interface HeaderProps {
  lang: Language;
  onToggleLang: () => void;
  onOpenSearch: () => void;
  onOpenCourses: () => void;
  onRefresh: () => void;
  isRefreshing: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  onToggleLang,
  onOpenSearch,
  onOpenCourses,
  onRefresh,
  isRefreshing,
}) => {
  const t = translations[lang];

  return (
    <header className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white px-4 py-3 shadow-md">
      <div className="flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/30 text-white font-bold text-base tracking-wider">
            K
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg tracking-tight text-white">Kursotzyv</span>
              <span className="text-[10px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                Mobile
              </span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="truncate max-w-[140px]">Live Database Sync</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1.5">
          {/* Refresh Button */}
          <button
            id="header-refresh-btn"
            onClick={onRefresh}
            title="Жаңыртуу"
            aria-label="Refresh database"
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-300 hover:text-white flex items-center justify-center transition-all"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-indigo-400' : ''}`} />
          </button>

          {/* Courses Catalog Button */}
          <button
            id="header-courses-btn"
            onClick={onOpenCourses}
            title="Курстар каталогу"
            className="flex items-center gap-1 text-xs font-medium px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-200 border border-slate-700/60 transition-all"
          >
            <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden sm:inline">Курстар</span>
          </button>

          {/* Search Button */}
          <button
            id="header-search-btn"
            onClick={onOpenSearch}
            title="Издөө"
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-300 hover:text-white flex items-center justify-center transition-all"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Language Toggle */}
          <button
            id="header-lang-btn"
            onClick={onToggleLang}
            className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-200 border border-indigo-500/40 active:scale-95 transition-all"
          >
            <span>{lang === 'ky' ? '🇰🇬 KG' : '🇷🇺 RU'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
