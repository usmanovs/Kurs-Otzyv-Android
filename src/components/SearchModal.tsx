import React, { useState, useMemo } from 'react';
import { Teacher, Course, Language } from '../types';
import { translations } from '../lib/i18n';
import { Search, X, Star, Building2, BookOpen, ChevronRight } from 'lucide-react';

interface SearchModalProps {
  teachers: Teacher[];
  courses: Course[];
  lang: Language;
  onClose: () => void;
  onSelectTeacher: (teacher: Teacher) => void;
  onSelectCourse: (course: Course) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  teachers,
  courses,
  lang,
  onClose,
  onSelectTeacher,
  onSelectCourse,
}) => {
  const t = translations[lang];
  const [query, setQuery] = useState('');

  const filteredTeachers = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return teachers
      .filter(
        (tch) =>
          tch.name.toLowerCase().includes(q) ||
          tch.academy_name?.toLowerCase().includes(q) ||
          tch.bio?.toLowerCase().includes(q)
      )
      .slice(0, 10);
  }, [teachers, query]);

  const filteredCourses = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return courses
      .filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.academy_name.toLowerCase().includes(q) ||
          c.description?.toLowerCase().includes(q)
      )
      .slice(0, 5);
  }, [courses, query]);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col p-4">
      {/* Search Input Container */}
      <div className="max-w-lg mx-auto w-full flex items-center gap-2 bg-slate-900 border border-slate-700 rounded-2xl px-3.5 py-2.5 shadow-2xl">
        <Search className="w-5 h-5 text-indigo-400 flex-shrink-0" />
        <input
          id="global-search-input"
          autoFocus
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t.searchPlaceholder}
          className="flex-1 bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none"
        />
        {query && (
          <button onClick={() => setQuery('')} className="text-slate-400 hover:text-white p-1">
            <X className="w-4 h-4" />
          </button>
        )}
        <button
          onClick={onClose}
          className="text-xs font-bold text-slate-300 hover:text-white bg-slate-800 px-3 py-1.5 rounded-xl ml-1"
        >
          {lang === 'ky' ? 'Жабуу' : 'Закрыть'}
        </button>
      </div>

      {/* Results Container */}
      <div className="max-w-lg mx-auto w-full flex-1 overflow-y-auto mt-4 space-y-4">
        {/* Popular searches suggestions if query is empty */}
        {!query.trim() && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-3">
            <div className="text-xs font-bold text-slate-400">{t.hero.popularLabel}</div>
            <div className="flex flex-wrap gap-2">
              {['Geeks', 'Makers', 'Python', 'React', 'SMM', 'Трейдинг', 'Англис тили'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700/60 px-3 py-1.5 rounded-xl active:scale-95 transition-all"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Teachers Results */}
        {filteredTeachers.length > 0 && (
          <div className="space-y-2">
            <div className="text-xs font-bold text-slate-400 px-1">
              {t.navTeachers} ({filteredTeachers.length})
            </div>
            {filteredTeachers.map((teacher) => (
              <div
                key={teacher.id}
                onClick={() => {
                  onSelectTeacher(teacher);
                  onClose();
                }}
                className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 rounded-2xl p-3 flex items-center justify-between gap-3 cursor-pointer active:scale-[0.99] transition-all"
              >
                <div className="flex items-center gap-3 min-w-0">
                  {teacher.photo_url ? (
                    <img
                      src={teacher.photo_url}
                      alt={teacher.name}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-xl object-cover ring-1 ring-slate-700"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-700 to-violet-600 flex items-center justify-center font-bold text-white text-xs">
                      {teacher.name[0]?.toUpperCase() || 'К'}
                    </div>
                  )}
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-white truncate">{teacher.name}</div>
                    {teacher.academy_name && (
                      <div className="text-[11px] text-slate-400 truncate">{teacher.academy_name}</div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  {teacher.avgRating ? (
                    <div className="flex items-center gap-1 bg-amber-400/15 text-amber-300 px-2 py-0.5 rounded-lg text-xs font-bold">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{teacher.avgRating.toFixed(1)}</span>
                    </div>
                  ) : null}
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Courses Results */}
        {filteredCourses.length > 0 && (
          <div className="space-y-2">
            <div className="text-xs font-bold text-slate-400 px-1">
              {lang === 'ky' ? 'Курстар' : 'Курсы'} ({filteredCourses.length})
            </div>
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                onClick={() => {
                  onSelectCourse(course);
                  onClose();
                }}
                className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 rounded-2xl p-3 flex items-center justify-between gap-3 cursor-pointer active:scale-[0.99] transition-all"
              >
                <div className="min-w-0 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-white truncate">{course.name}</div>
                    <div className="text-[11px] text-slate-400 truncate">{course.academy_name}</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500 flex-shrink-0" />
              </div>
            ))}
          </div>
        )}

        {query.trim() && filteredTeachers.length === 0 && filteredCourses.length === 0 && (
          <div className="text-center py-12 text-slate-400 text-xs">
            {lang === 'ky' ? 'Эч нерсе табылган жок' : 'Ничего не найдено'}
          </div>
        )}
      </div>
    </div>
  );
};
