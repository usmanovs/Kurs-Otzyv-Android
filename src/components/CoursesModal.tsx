import React, { useState } from 'react';
import { Course, Language } from '../types';
import { translations } from '../lib/i18n';
import {
  X,
  BookOpen,
  Building2,
  Clock,
  Wallet,
  ExternalLink,
  AlertTriangle,
  Search,
  Filter,
} from 'lucide-react';

interface CoursesModalProps {
  courses: Course[];
  lang: Language;
  onClose: () => void;
}

export const CoursesModal: React.FC<CoursesModalProps> = ({ courses, lang, onClose }) => {
  const t = translations[lang];
  const [search, setSearch] = useState('');
  const [selectedFormat, setSelectedFormat] = useState<string>('all');

  const filteredCourses = courses.filter((c) => {
    if (search.trim()) {
      const q = search.toLowerCase();
      const match =
        c.name.toLowerCase().includes(q) ||
        c.academy_name.toLowerCase().includes(q) ||
        c.description?.toLowerCase().includes(q);
      if (!match) return false;
    }
    if (selectedFormat !== 'all' && c.format !== selectedFormat) return false;
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex justify-center items-end sm:items-center">
      <div className="bg-slate-900 border border-slate-700/80 rounded-t-3xl sm:rounded-3xl w-full max-w-lg max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-900/90 sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                {lang === 'ky' ? 'Курстар каталогу' : 'Каталог курсов'}
              </h2>
              <p className="text-[11px] text-slate-400">
                {filteredCourses.length} {t.hero.statsCourses}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search and format filter */}
        <div className="p-3 border-b border-slate-800 bg-slate-850 space-y-2">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={lang === 'ky' ? 'Курстун же академиянын атын издеңиз...' : 'Поиск курса или школы...'}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs">
            {Object.entries(t.format).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setSelectedFormat(key)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedFormat === key
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Courses list */}
        <div className="overflow-y-auto p-4 space-y-3.5 flex-1">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => {
              const formatLabel =
                course.format === 'online'
                  ? 'Онлайн'
                  : course.format === 'offline'
                  ? 'Офлайн'
                  : 'Гибрид';

              return (
                <div
                  key={course.id}
                  className={`bg-slate-800/80 border rounded-2xl p-4 space-y-2.5 transition-all ${
                    course.is_warning_course
                      ? 'border-rose-500/40 bg-rose-950/20'
                      : 'border-slate-700/60'
                  }`}
                >
                  {course.is_warning_course && (
                    <div className="bg-rose-500/15 border border-rose-500/30 text-rose-300 text-[10px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-400 flex-shrink-0" />
                      <span>{course.warning_notice || t.courseCard?.warningBadge}</span>
                    </div>
                  )}

                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-bold text-white leading-snug">{course.name}</h3>
                    <span className="text-[10px] font-semibold bg-indigo-500/15 text-indigo-300 border border-indigo-500/25 px-2 py-0.5 rounded-md flex-shrink-0">
                      {formatLabel}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-slate-300">
                    <Building2 className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />
                    <span>{course.academy_name}</span>
                  </div>

                  {course.description && (
                    <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                      {course.description}
                    </p>
                  )}

                  <div className="flex items-center justify-between pt-2 border-t border-slate-700/40 text-xs flex-wrap gap-2">
                    <div className="flex items-center gap-3 text-slate-400 text-[11px]">
                      {course.duration_text && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-500" />
                          <span>{course.duration_text}</span>
                        </span>
                      )}
                      {course.price_kgs ? (
                        <span className="flex items-center gap-1 font-bold text-indigo-300">
                          <Wallet className="w-3 h-3 text-indigo-400" />
                          <span>{course.price_kgs.toLocaleString()} сом</span>
                        </span>
                      ) : (
                        <span className="text-slate-500 text-[10px]">
                          {t.courseCard?.priceNotSpecified || 'Баасы жарыяланган эмес'}
                        </span>
                      )}
                    </div>

                    {course.website_or_instagram && (
                      <a
                        href={course.website_or_instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-[11px] font-bold text-indigo-400 hover:text-indigo-300 bg-indigo-500/10 px-2 py-1 rounded-lg transition-colors"
                      >
                        <span>{lang === 'ky' ? 'Сайты / Instagram' : 'Сайт / Instagram'}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-10 text-slate-400 text-xs">
              {lang === 'ky' ? 'Курстар табылган жок' : 'Курсы не найдены'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
