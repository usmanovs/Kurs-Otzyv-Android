import React, { useState } from 'react';
import { Teacher, Language } from '../types';
import { translations } from '../lib/i18n';
import { Star, Building2, ThumbsUp, AlertCircle, MessageSquare, ChevronRight } from 'lucide-react';

interface TeacherCardProps {
  teacher: Teacher;
  lang: Language;
  onSelect: (teacher: Teacher) => void;
  onWriteReview: (teacher: Teacher) => void;
}

export const TeacherCard: React.FC<TeacherCardProps> = ({
  teacher,
  lang,
  onSelect,
  onWriteReview,
}) => {
  const [imgError, setImgError] = useState(false);
  const t = translations[lang];

  const rating = teacher.avgRating || 0;
  const reviewCount = teacher.reviewCount || 0;
  const isFlagged = reviewCount > 0 && rating > 0 && rating < 3.2;
  const hasHighRating = rating >= 4.5 && reviewCount >= 1;

  // Initials for avatar
  const initials = teacher.name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join('')
    .toUpperCase();

  const categoryName = teacher.category ? t.categories[teacher.category] || teacher.category : null;

  return (
    <div
      id={`teacher-card-${teacher.id}`}
      onClick={() => onSelect(teacher)}
      className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 rounded-2xl p-4 shadow-sm active:scale-[0.99] transition-all cursor-pointer relative overflow-hidden group"
    >
      {/* Flagged or Top badge */}
      {isFlagged && (
        <div className="absolute top-0 right-0 bg-rose-500/20 text-rose-300 border-b border-l border-rose-500/30 text-[10px] font-bold px-2 py-0.5 rounded-bl-lg flex items-center gap-1">
          <AlertCircle className="w-3 h-3" />
          <span>⚠️ {lang === 'ky' ? 'Нааразычылык көп' : 'Много жалоб'}</span>
        </div>
      )}
      {!isFlagged && hasHighRating && (
        <div className="absolute top-0 right-0 bg-emerald-500/20 text-emerald-300 border-b border-l border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded-bl-lg flex items-center gap-1">
          <Star className="w-3 h-3 fill-emerald-400 text-emerald-400" />
          <span>{lang === 'ky' ? 'Жогорку баа' : 'Топ рейтинг'}</span>
        </div>
      )}

      <div className="flex items-start gap-3.5">
        {/* Photo Avatar */}
        <div className="relative flex-shrink-0">
          {teacher.photo_url && !imgError ? (
            <img
              src={teacher.photo_url}
              alt={teacher.name}
              onError={() => setImgError(true)}
              referrerPolicy="no-referrer"
              className="w-14 h-14 rounded-2xl object-cover ring-2 ring-slate-700 shadow-md"
            />
          ) : (
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-700 via-indigo-600 to-violet-500 flex items-center justify-center font-bold text-white text-base ring-2 ring-slate-700 shadow-md">
              {initials || 'К'}
            </div>
          )}
          {rating > 0 && (
            <div className="absolute -bottom-1.5 -right-1.5 bg-amber-400 text-slate-950 font-extrabold text-[11px] px-1.5 py-0.2 rounded-md shadow flex items-center gap-0.5">
              <Star className="w-2.5 h-2.5 fill-slate-950" />
              <span>{rating.toFixed(1)}</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-1">
            <h3 className="text-base font-bold text-white truncate group-hover:text-indigo-300 transition-colors">
              {teacher.name}
            </h3>
            <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 transition-colors flex-shrink-0" />
          </div>

          {/* Academy */}
          {teacher.academy_name && (
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-0.5 truncate">
              <Building2 className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />
              <span className="truncate">{teacher.academy_name}</span>
            </div>
          )}

          {/* Category Pill */}
          {categoryName && (
            <div className="mt-1.5">
              <span className="inline-block text-[11px] font-medium bg-slate-700/60 text-indigo-200 border border-slate-600/40 px-2 py-0.5 rounded-md truncate max-w-full">
                {categoryName}
              </span>
            </div>
          )}

          {/* Metrics row */}
          <div className="mt-2.5 flex items-center flex-wrap gap-2 text-xs">
            {reviewCount > 0 ? (
              <>
                <span className="flex items-center gap-1 text-slate-300 font-medium">
                  <MessageSquare className="w-3.5 h-3.5 text-indigo-400" />
                  <span>
                    {reviewCount} {t.teachersSection.reviewsCount}
                  </span>
                </span>

                {teacher.recommendRate !== undefined && (
                  <span
                    className={`flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                      teacher.recommendRate >= 70
                        ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/20'
                        : 'bg-rose-500/15 text-rose-300 border border-rose-500/20'
                    }`}
                  >
                    <ThumbsUp className="w-3 h-3" />
                    <span>
                      {teacher.recommendRate}% {t.courseCard?.recommendRate || (lang === 'ky' ? 'сунуштайт' : 'рекомендуют')}
                    </span>
                  </span>
                )}
              </>
            ) : (
              <span className="text-[11px] text-slate-400 italic">
                {t.teachersSection.noReviewsYet}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Review action footer */}
      <div className="mt-3 pt-2.5 border-t border-slate-700/40 flex items-center justify-between text-xs">
        <span className="text-slate-400 text-[11px]">
          {reviewCount > 0
            ? `${lang === 'ky' ? 'Акыркы пикирлерди окуу' : 'Читать отзывы'}`
            : `${lang === 'ky' ? 'Биринчи болуп баа бериңиз' : 'Оцените первым'}`}
        </span>
        <button
          id={`write-review-btn-${teacher.id}`}
          onClick={(e) => {
            e.stopPropagation();
            onWriteReview(teacher);
          }}
          className="text-xs font-semibold text-indigo-300 hover:text-indigo-200 bg-indigo-500/20 hover:bg-indigo-500/30 px-2.5 py-1 rounded-lg transition-colors active:scale-95"
        >
          {lang === 'ky' ? '+ Пикир жазуу' : '+ Оставить отзыв'}
        </button>
      </div>
    </div>
  );
};
