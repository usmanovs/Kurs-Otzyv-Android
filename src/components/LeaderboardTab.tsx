import React, { useState } from 'react';
import { Teacher, Language } from '../types';
import { translations } from '../lib/i18n';
import { TeacherCard } from './TeacherCard';
import { Trophy, AlertTriangle, ShieldAlert, Star, Filter } from 'lucide-react';

interface LeaderboardTabProps {
  teachers: Teacher[];
  lang: Language;
  onSelectTeacher: (teacher: Teacher) => void;
  onWriteReviewForTeacher: (teacher: Teacher) => void;
}

export const LeaderboardTab: React.FC<LeaderboardTabProps> = ({
  teachers,
  lang,
  onSelectTeacher,
  onWriteReviewForTeacher,
}) => {
  const t = translations[lang];
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [subTab, setSubTab] = useState<'top' | 'flagged'>('top');

  const filteredTeachers = teachers.filter((tch) => {
    if (selectedCategory !== 'all' && tch.category !== selectedCategory) return false;
    return true;
  });

  // Top Rated: average rating >= 4.0 and reviewCount >= 1, sorted by avgRating then reviewsCount
  const topTeachers = [...filteredTeachers]
    .filter((tch) => (tch.reviewCount || 0) > 0 && (tch.avgRating || 0) >= 3.8)
    .sort((a, b) => (b.avgRating || 0) - (a.avgRating || 0) || (b.reviewCount || 0) - (a.reviewCount || 0));

  // Flagged / Caution list: teachers with rating < 3.8 or scam reports
  const flaggedTeachers = [...filteredTeachers]
    .filter((tch) => {
      const hasReviews = (tch.reviewCount || 0) > 0;
      const lowRating = (tch.avgRating || 0) > 0 && (tch.avgRating || 0) < 3.8;
      const hasScamFlag = tch.reviews?.some((r) => r.has_job_scam_report || !r.would_recommend);
      return hasReviews && (lowRating || hasScamFlag);
    })
    .sort((a, b) => (a.avgRating || 0) - (b.avgRating || 0));

  const currentList = subTab === 'top' ? topTeachers : flaggedTeachers;

  return (
    <div className="space-y-4 pb-24 px-4 pt-3">
      {/* Title */}
      <div>
        <h1 className="text-xl font-black text-white flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-400" />
          <span>{t.leaderboard.title}</span>
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">{t.leaderboard.subtitle}</p>
      </div>

      {/* Sub Tabs: Top Rated vs Caution */}
      <div className="grid grid-cols-2 p-1 bg-slate-800/80 border border-slate-700/60 rounded-2xl">
        <button
          id="leaderboard-top-tab"
          onClick={() => setSubTab('top')}
          className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
            subTab === 'top'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Star className="w-3.5 h-3.5 fill-current" />
          <span>{t.leaderboard.topTitle}</span>
          <span className="text-[10px] bg-indigo-700/60 px-1.5 py-0.2 rounded-full">
            {topTeachers.length}
          </span>
        </button>

        <button
          id="leaderboard-flagged-tab"
          onClick={() => setSubTab('flagged')}
          className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
            subTab === 'flagged'
              ? 'bg-rose-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>{t.leaderboard.flaggedTitle}</span>
          <span className="text-[10px] bg-rose-700/60 px-1.5 py-0.2 rounded-full">
            {flaggedTeachers.length}
          </span>
        </button>
      </div>

      {/* Notice box */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-3 text-[11px] text-slate-300 leading-relaxed">
        {subTab === 'top' ? (
          <p>
            🌟{' '}
            {lang === 'ky'
              ? 'Бул тизмеге студенттердин чынчыл баалоосу боюнча 4.0 жана андан жогору баа алган мугалимдер киргизилди.'
              : 'В этот список вошли преподаватели с оценкой 4.0 и выше по отзывам реальных студентов.'}
          </p>
        ) : (
          <p className="text-rose-200">
            ⚠️{' '}
            {lang === 'ky'
              ? 'Бул тизмеде нааразычылыктар көп түшкөн же баасы төмөн болгон курстар көрсөтүлгөн. Төлөм кылардан мурун кылдат текшериңиз!'
              : 'В этом списке преподаватели с низкими оценками или жалобами на невыполнение обязательств. Будьте внимательны перед оплатой!'}
          </p>
        )}
      </div>

      {/* Category selector */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 text-xs">
        {Object.entries(t.categories).map(([key, label]) => {
          const isSelected = selectedCategory === key;
          return (
            <button
              key={key}
              onClick={() => setSelectedCategory(key)}
              className={`flex-shrink-0 px-2.5 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition-all active:scale-95 ${
                isSelected
                  ? 'bg-indigo-600/30 text-indigo-200 border border-indigo-500/50'
                  : 'bg-slate-800/60 text-slate-400 border border-slate-700/40 hover:text-slate-300'
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* List */}
      <div className="space-y-3">
        {currentList.length > 0 ? (
          currentList.map((teacher, index) => (
            <div key={teacher.id} className="relative">
              {/* Rank Medal */}
              <div
                className={`absolute -top-2 -left-2 z-10 w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shadow-md ${
                  subTab === 'top'
                    ? index === 0
                      ? 'bg-amber-400 text-slate-950 ring-2 ring-amber-300'
                      : index === 1
                      ? 'bg-slate-300 text-slate-900 ring-2 ring-slate-200'
                      : index === 2
                      ? 'bg-amber-700 text-white ring-2 ring-amber-600'
                      : 'bg-slate-700 text-slate-300'
                    : 'bg-rose-600 text-white'
                }`}
              >
                {index + 1}
              </div>
              <TeacherCard
                teacher={teacher}
                lang={lang}
                onSelect={onSelectTeacher}
                onWriteReview={onWriteReviewForTeacher}
              />
            </div>
          ))
        ) : (
          <div className="text-center py-10 bg-slate-800/40 border border-slate-700/40 rounded-3xl p-4 text-xs text-slate-400">
            {lang === 'ky' ? 'Бул категорияда мугалимдер табылган жок' : 'В этой категории преподаватели не найдены'}
          </div>
        )}
      </div>
    </div>
  );
};
