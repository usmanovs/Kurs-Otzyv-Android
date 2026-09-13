import React, { useState, useMemo } from 'react';
import { Teacher, Language } from '../types';
import { translations } from '../lib/i18n';
import { TeacherCard } from './TeacherCard';
import { Search, UserPlus, Filter, X, Check, SlidersHorizontal } from 'lucide-react';

interface TeachersTabProps {
  teachers: Teacher[];
  lang: Language;
  onSelectTeacher: (teacher: Teacher) => void;
  onWriteReviewForTeacher: (teacher: Teacher) => void;
  onOpenAddTeacher: () => void;
  initialCategory?: string;
}

const ALPHABET = [
  'Бардыгы',
  'А',
  'Б',
  'В',
  'Г',
  'Д',
  'Ж',
  'З',
  'И',
  'К',
  'Л',
  'М',
  'Н',
  'О',
  'П',
  'Р',
  'С',
  'Т',
  'У',
  'Ч',
  'Ш',
  'Э',
  'Ю',
];

export const TeachersTab: React.FC<TeachersTabProps> = ({
  teachers,
  lang,
  onSelectTeacher,
  onWriteReviewForTeacher,
  onOpenAddTeacher,
  initialCategory = 'all',
}) => {
  const t = translations[lang];
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedLetter, setSelectedLetter] = useState<string>('Бардыгы');
  const [onlyWithPhoto, setOnlyWithPhoto] = useState<boolean>(false);
  const [onlyWithReviews, setOnlyWithReviews] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'reviews' | 'rating' | 'name' | 'newest'>('reviews');

  // Filtered and sorted teachers list
  const filteredTeachers = useMemo(() => {
    return teachers
      .filter((tch) => {
        // Search
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = tch.name.toLowerCase().includes(q);
          const matchAcademy = tch.academy_name?.toLowerCase().includes(q);
          const matchBio = tch.bio?.toLowerCase().includes(q);
          if (!matchName && !matchAcademy && !matchBio) return false;
        }

        // Category
        if (selectedCategory !== 'all' && tch.category !== selectedCategory) {
          return false;
        }

        // Alphabet
        if (selectedLetter !== 'Бардыгы') {
          const firstChar = tch.name.trim()[0]?.toUpperCase();
          if (firstChar !== selectedLetter) return false;
        }

        // Photo filter
        if (onlyWithPhoto && !tch.photo_url) {
          return false;
        }

        // Reviews filter
        if (onlyWithReviews && (!tch.reviewCount || tch.reviewCount === 0)) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'reviews') {
          return (b.reviewCount || 0) - (a.reviewCount || 0);
        }
        if (sortBy === 'rating') {
          return (b.avgRating || 0) - (a.avgRating || 0);
        }
        if (sortBy === 'name') {
          return a.name.localeCompare(b.name, 'ky');
        }
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      });
  }, [teachers, searchQuery, selectedCategory, selectedLetter, onlyWithPhoto, onlyWithReviews, sortBy]);

  const categoryOptions = Object.entries(t.categories);

  return (
    <div className="space-y-4 pb-24 px-4 pt-3">
      {/* Header & Add button */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-white">{t.teachersSection.title}</h1>
          <p className="text-xs text-slate-400 mt-0.5">{t.teachersSection.subtitle}</p>
        </div>
        <button
          id="teachers-tab-add-btn"
          onClick={onOpenAddTeacher}
          className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white text-xs font-bold px-3 py-2 rounded-xl shadow-md shadow-indigo-600/30 transition-all"
        >
          <UserPlus className="w-4 h-4" />
          <span>{t.teachersSection.addBtn}</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          id="teachers-search-input"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t.searchPlaceholder}
          className="w-full bg-slate-800/90 border border-slate-700 rounded-2xl pl-10 pr-9 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Alphabet Scrubber */}
      <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-1 text-xs">
        {ALPHABET.map((letter) => {
          const isSelected = selectedLetter === letter;
          return (
            <button
              key={letter}
              id={`alphabet-${letter}`}
              onClick={() => setSelectedLetter(letter)}
              className={`flex-shrink-0 px-2.5 py-1 rounded-lg font-bold text-xs transition-all active:scale-95 ${
                isSelected
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-800/70 text-slate-400 hover:text-slate-200 hover:bg-slate-700/70'
              }`}
            >
              {letter}
            </button>
          );
        })}
      </div>

      {/* Categories Horizontal Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 text-xs">
        {categoryOptions.map(([key, label]) => {
          const isSelected = selectedCategory === key;
          return (
            <button
              key={key}
              id={`cat-filter-${key}`}
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

      {/* Filter Toggles & Sorting row */}
      <div className="flex items-center justify-between gap-2 text-xs flex-wrap pt-1">
        <div className="flex items-center gap-2">
          {/* Only with photo */}
          <button
            id="filter-only-photo"
            onClick={() => setOnlyWithPhoto(!onlyWithPhoto)}
            className={`flex items-center gap-1 text-[11px] font-medium px-2 py-1 rounded-lg border transition-all active:scale-95 ${
              onlyWithPhoto
                ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
                : 'bg-slate-800/50 text-slate-400 border-slate-700/40'
            }`}
          >
            {onlyWithPhoto && <Check className="w-3 h-3 text-indigo-400" />}
            <span>{t.teachersSection.onlyWithPhoto}</span>
          </button>

          {/* Only with reviews */}
          <button
            id="filter-only-reviews"
            onClick={() => setOnlyWithReviews(!onlyWithReviews)}
            className={`flex items-center gap-1 text-[11px] font-medium px-2 py-1 rounded-lg border transition-all active:scale-95 ${
              onlyWithReviews
                ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
                : 'bg-slate-800/50 text-slate-400 border-slate-700/40'
            }`}
          >
            {onlyWithReviews && <Check className="w-3 h-3 text-indigo-400" />}
            <span>{t.teachersSection.onlyWithReviews}</span>
          </button>
        </div>

        {/* Sort select */}
        <select
          id="teachers-sort-select"
          value={sortBy}
          onChange={(e: any) => setSortBy(e.target.value)}
          className="bg-slate-800 border border-slate-700 text-slate-300 text-[11px] rounded-lg px-2 py-1 focus:outline-none focus:border-indigo-500"
        >
          <option value="reviews">{lang === 'ky' ? 'Пикирлердин саны боюнча' : 'По числу отзывов'}</option>
          <option value="rating">{lang === 'ky' ? 'Рейтинги боюнча' : 'По рейтингу'}</option>
          <option value="name">{lang === 'ky' ? 'Аты боюнча (А-Я)' : 'По алфавиту'}</option>
          <option value="newest">{lang === 'ky' ? 'Жаңы кошулгандар' : 'Сначала новые'}</option>
        </select>
      </div>

      {/* Filter result count */}
      <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
        <span>
          {filteredTeachers.length} {t.teachersSection.filteredCount}
        </span>
        {(searchQuery || selectedCategory !== 'all' || selectedLetter !== 'Бардыгы' || onlyWithPhoto || onlyWithReviews) && (
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedLetter('Бардыгы');
              setOnlyWithPhoto(false);
              setOnlyWithReviews(false);
            }}
            className="text-indigo-400 hover:text-indigo-300 font-semibold"
          >
            {t.teachersSection.clearSearch}
          </button>
        )}
      </div>

      {/* Teachers List */}
      {filteredTeachers.length > 0 ? (
        <div className="space-y-3">
          {filteredTeachers.map((teacher) => (
            <TeacherCard
              key={teacher.id}
              teacher={teacher}
              lang={lang}
              onSelect={onSelectTeacher}
              onWriteReview={onWriteReviewForTeacher}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 px-4 bg-slate-800/40 border border-slate-700/40 rounded-3xl space-y-3">
          <p className="text-slate-300 text-sm font-semibold">{t.teachersSection.noSearchResults}</p>
          <p className="text-xs text-slate-400">
            {lang === 'ky'
              ? 'Сиз издеген мугалим тизмеде жок болсо, жаңы мугалим катары кошуңуз'
              : 'Если преподавателя нет в списке, добавьте его сами'}
          </p>
          <button
            onClick={onOpenAddTeacher}
            className="bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all"
          >
            + {t.teachersSection.addBtn}
          </button>
        </div>
      )}
    </div>
  );
};
