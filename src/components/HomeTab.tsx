import React from 'react';
import { Teacher, Course, Review, Language } from '../types';
import { translations } from '../lib/i18n';
import { TeacherCard } from './TeacherCard';
import {
  Search,
  AlertTriangle,
  ShieldCheck,
  Star,
  Users,
  BookOpen,
  MessageSquare,
  Sparkles,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
} from 'lucide-react';

interface HomeTabProps {
  teachers: Teacher[];
  courses: Course[];
  reviews: Review[];
  lang: Language;
  onSelectTeacher: (teacher: Teacher) => void;
  onWriteReviewForTeacher: (teacher: Teacher) => void;
  onOpenAddReview: () => void;
  onOpenAddTeacher: () => void;
  onOpenCourses: () => void;
  onSelectCategory: (categoryKey: string) => void;
  onOpenSearch: () => void;
  onNavigateToTeachers: () => void;
  onNavigateToReport: () => void;
}

export const HomeTab: React.FC<HomeTabProps> = ({
  teachers,
  courses,
  reviews,
  lang,
  onSelectTeacher,
  onWriteReviewForTeacher,
  onOpenAddReview,
  onOpenAddTeacher,
  onOpenCourses,
  onSelectCategory,
  onOpenSearch,
  onNavigateToTeachers,
  onNavigateToReport,
}) => {
  const t = translations[lang];

  // Top rated teachers (sorted by avgRating * reviewCount or avgRating with min 1 review)
  const topRated = [...teachers]
    .filter((t) => (t.reviewCount || 0) > 0 && (t.avgRating || 0) >= 4.0)
    .sort((a, b) => (b.avgRating || 0) - (a.avgRating || 0) || (b.reviewCount || 0) - (a.reviewCount || 0))
    .slice(0, 4);

  // Recent reviews from all teachers
  const recentReviews = [...reviews]
    .filter((r) => !r.is_hidden)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5);

  const categoriesList = Object.entries(t.categories).filter(([key]) => key !== 'all');

  return (
    <div className="space-y-5 pb-24 px-4 pt-3">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-900 border border-indigo-500/20 p-5 shadow-xl">
        <div className="absolute top-0 right-0 w-44 h-44 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        
        {/* Anti-ad badge */}
        <div className="inline-flex items-center gap-1.5 bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-[11px] font-semibold px-2.5 py-1 rounded-full mb-3">
          <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
          <span>{t.hero.badge}</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-100 to-indigo-300">
            {t.hero.headlineLine1}
          </span>{' '}
          <span className="text-indigo-400">{t.hero.headlineLine2}</span>
        </h1>

        <p className="text-slate-300 text-xs sm:text-sm mt-1.5 leading-relaxed max-w-sm">
          {t.hero.subtitle}
        </p>

        {/* Search Bar Input (Triggers Search Modal) */}
        <div
          id="home-search-trigger"
          onClick={onOpenSearch}
          className="mt-4 flex items-center gap-3 bg-slate-800/90 hover:bg-slate-800 text-slate-400 border border-slate-700/80 rounded-2xl px-3.5 py-2.5 shadow-inner cursor-pointer active:scale-[0.99] transition-all"
        >
          <Search className="w-4 h-4 text-indigo-400 flex-shrink-0" />
          <span className="text-xs text-slate-400 truncate">{t.hero.searchPlaceholder}</span>
          <span className="ml-auto text-[10px] font-semibold bg-indigo-600/30 text-indigo-300 px-2 py-0.5 rounded-lg border border-indigo-500/30">
            {t.hero.searchBtn}
          </span>
        </div>

        {/* Quick Popular Tags */}
        <div className="mt-3 flex items-center gap-1.5 overflow-x-auto no-scrollbar text-[11px]">
          <span className="text-slate-400 text-[10px] font-medium flex-shrink-0">{t.hero.popularLabel}</span>
          {t.hero.popularTags.map((tag, idx) => (
            <button
              key={idx}
              onClick={() => {
                // Find category key matching tag
                const found = Object.entries(t.categories).find(([_, label]) => label === tag);
                if (found) onSelectCategory(found[0]);
                else onOpenSearch();
              }}
              className="flex-shrink-0 bg-slate-800/60 hover:bg-slate-700/60 text-slate-300 px-2 py-0.5 rounded-md border border-slate-700/40 active:scale-95 transition-all"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Live Stats Bar */}
      <div className="grid grid-cols-3 gap-2.5 text-center">
        <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-2.5">
          <div className="text-xl font-extrabold text-indigo-400">{reviews.length}+</div>
          <div className="text-[10px] text-slate-400 font-medium">{t.stats.reviewsCount}</div>
        </div>
        <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-2.5">
          <div className="text-xl font-extrabold text-emerald-400">{teachers.length}</div>
          <div className="text-[10px] text-slate-400 font-medium">{t.hero.statsTeachers}</div>
        </div>
        <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-2.5">
          <div className="text-xl font-extrabold text-violet-400">{courses.length}</div>
          <div className="text-[10px] text-slate-400 font-medium">{t.stats.coursesCount}</div>
        </div>
      </div>

      {/* Warning Anti-Scam Alert Banner */}
      <div
        id="home-warning-card"
        onClick={onNavigateToReport}
        className="bg-amber-950/30 border border-amber-500/30 rounded-2xl p-3.5 flex items-start gap-3 cursor-pointer hover:bg-amber-950/40 active:scale-[0.99] transition-all group"
      >
        <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0 mt-0.5">
          <AlertTriangle className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-amber-200">{t.warningBanner.title}</h4>
            <ArrowRight className="w-3.5 h-3.5 text-amber-400 group-hover:translate-x-0.5 transition-transform flex-shrink-0" />
          </div>
          <p className="text-[11px] text-amber-300/80 mt-1 leading-relaxed line-clamp-2">
            {t.warningBanner.point1}
          </p>
        </div>
      </div>

      {/* Categories Horizontal Carousel */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <h2 className="text-sm font-bold text-white flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>{t.allCategories}</span>
          </h2>
          <button
            id="home-all-teachers-link"
            onClick={onNavigateToTeachers}
            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-0.5"
          >
            <span>{lang === 'ky' ? 'Бардыгы' : 'Все'}</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {categoriesList.slice(0, 8).map(([key, label]) => {
            const count = teachers.filter((tch) => tch.category === key).length;
            return (
              <button
                key={key}
                id={`cat-chip-${key}`}
                onClick={() => onSelectCategory(key)}
                className="flex-shrink-0 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 rounded-xl px-3 py-2 text-left active:scale-95 transition-all"
              >
                <div className="text-xs font-bold text-slate-200">{label}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  {count} {lang === 'ky' ? 'мугалим' : 'учителей'}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Top Rated Mentors Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-sm font-bold text-white flex items-center gap-1.5">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>{t.leaderboard.topTitle}</span>
            </h2>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {lang === 'ky' ? 'Студенттердин жогорку баасына ээ болгондор' : 'Высокий рейтинг от студентов'}
            </p>
          </div>
          <button
            id="home-leaderboard-link"
            onClick={onNavigateToTeachers}
            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300"
          >
            {lang === 'ky' ? 'Көбүрөөк' : 'Больше'}
          </button>
        </div>

        <div className="space-y-3">
          {topRated.map((teacher) => (
            <TeacherCard
              key={teacher.id}
              teacher={teacher}
              lang={lang}
              onSelect={onSelectTeacher}
              onWriteReview={onWriteReviewForTeacher}
            />
          ))}
        </div>
      </div>

      {/* Quick Action Bar */}
      <div className="bg-gradient-to-r from-indigo-900/40 via-violet-900/40 to-slate-800 border border-indigo-500/20 rounded-2xl p-4 flex items-center justify-between gap-3">
        <div>
          <h3 className="text-xs font-bold text-white">
            {lang === 'ky' ? 'Мугалимиңизди тизмеден таппадыңызбы?' : 'Не нашли своего преподавателя?'}
          </h3>
          <p className="text-[11px] text-slate-400 mt-0.5">
            {lang === 'ky' ? 'Базага жаңы мугалим кошуп, пикир жазыңыз' : 'Добавьте в базу и оцените'}
          </p>
        </div>
        <button
          id="home-add-teacher-btn"
          onClick={onOpenAddTeacher}
          className="flex-shrink-0 bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white text-xs font-bold px-3 py-2 rounded-xl shadow-md shadow-indigo-600/30 transition-all"
        >
          {t.teachersSection.addBtn}
        </button>
      </div>

      {/* Recent Reviews Stream */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-white flex items-center gap-1.5">
            <MessageSquare className="w-4 h-4 text-indigo-400" />
            <span>{lang === 'ky' ? 'Акыркы сын-пикирлер' : 'Свежие отзывы студентов'}</span>
          </h2>
          <span className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>Live</span>
          </span>
        </div>

        <div className="space-y-2.5">
          {recentReviews.map((review) => {
            const targetTeacher = teachers.find((tch) => tch.id === review.teacher_id);
            return (
              <div
                key={review.id}
                id={`recent-review-${review.id}`}
                onClick={() => {
                  if (targetTeacher) onSelectTeacher(targetTeacher);
                }}
                className="bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 rounded-2xl p-3.5 cursor-pointer active:scale-[0.99] transition-all"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 truncate">
                    <span className="text-xs font-bold text-indigo-300 truncate">
                      {targetTeacher?.name || lang === 'ky' ? 'Мугалим' : 'Преподаватель'}
                    </span>
                    {review.is_verified && (
                      <span className="flex items-center gap-0.5 text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.2 rounded-md font-medium">
                        <CheckCircle2 className="w-2.5 h-2.5" />
                        <span>{lang === 'ky' ? 'Тастыкталган' : 'Проверен'}</span>
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 bg-amber-400/15 text-amber-300 px-1.5 py-0.5 rounded-md text-[11px] font-bold">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{review.overall_rating}</span>
                  </div>
                </div>

                <h4 className="text-xs font-bold text-white mt-1.5 truncate">
                  "{review.title || (lang === 'ky' ? 'Пикир' : 'Отзыв')}"
                </h4>

                <p className="text-[11px] text-slate-300 mt-1 line-clamp-2 leading-relaxed">
                  {review.full_review}
                </p>

                <div className="mt-2 pt-2 border-t border-slate-700/30 flex items-center justify-between text-[10px] text-slate-400">
                  <span>
                    {review.is_anonymous ? (lang === 'ky' ? 'Анонимдүү студент' : 'Анонимный студент') : review.author_name}
                  </span>
                  <span>{review.review_date || review.created_at.split('T')[0]}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
