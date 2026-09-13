import React, { useState } from 'react';
import { Teacher, NewReviewForm, Language } from '../types';
import { translations } from '../lib/i18n';
import { createReview } from '../lib/supabase';
import {
  X,
  Star,
  CheckCircle2,
  AlertTriangle,
  Send,
  HelpCircle,
  ThumbsUp,
  ThumbsDown,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface AddReviewModalProps {
  teachers: Teacher[];
  selectedTeacherId?: string;
  lang: Language;
  onClose: () => void;
  onReviewCreated: () => void;
}

export const AddReviewModal: React.FC<AddReviewModalProps> = ({
  teachers,
  selectedTeacherId,
  lang,
  onClose,
  onReviewCreated,
}) => {
  const t = translations[lang];

  const [teacherId, setTeacherId] = useState<string>(selectedTeacherId || teachers[0]?.id || '');
  const [isOtherTeacher, setIsOtherTeacher] = useState<boolean>(!selectedTeacherId && teachers.length === 0);
  const [customTeacherName, setCustomTeacherName] = useState<string>('');

  const [authorName, setAuthorName] = useState<string>('');
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [authorStatus, setAuthorStatus] = useState<string>('graduate');

  const [overallRating, setOverallRating] = useState<number>(5);
  const [teacherRating, setTeacherRating] = useState<number>(5);
  const [practiceRating, setPracticeRating] = useState<number>(4);
  const [jobSupportRating, setJobSupportRating] = useState<number>(3);
  const [valueRating, setValueRating] = useState<number>(4);
  const [wouldRecommend, setWouldRecommend] = useState<boolean>(true);

  const [title, setTitle] = useState<string>('');
  const [fullReview, setFullReview] = useState<string>('');

  const [showMoreDetails, setShowMoreDetails] = useState<boolean>(false);
  const [pricePaidKgs, setPricePaidKgs] = useState<string>('');
  const [durationMonths, setDurationMonths] = useState<string>('');
  const [cohortYear, setCohortYear] = useState<string>('2024');
  const [prosText, setProsText] = useState<string>('');
  const [consText, setConsText] = useState<string>('');
  const [adviceText, setAdviceText] = useState<string>('');
  const [whatsappNumber, setWhatsappNumber] = useState<string>('');

  const [hasJobScamReport, setHasJobScamReport] = useState<boolean>(false);
  const [isVerified, setIsVerified] = useState<boolean>(true);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (isOtherTeacher && !customTeacherName.trim()) {
      setErrorMessage(lang === 'ky' ? 'Мугалимдин атын жазыңыз' : 'Укажите имя преподавателя');
      return;
    }

    if (!isOtherTeacher && !teacherId) {
      setErrorMessage(lang === 'ky' ? 'Мугалимди тандаңыз' : 'Выберите преподавателя');
      return;
    }

    if (!fullReview.trim() || fullReview.trim().length < 15) {
      setErrorMessage(
        lang === 'ky'
          ? 'Толук сын-пикириңизди жазыңыз (кеминде 15 белги)'
          : 'Напишите подробный отзыв (минимум 15 символов)'
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const pros = prosText
        .split(/[,\n]/)
        .map((s) => s.trim())
        .filter(Boolean);

      const cons = consText
        .split(/[,\n]/)
        .map((s) => s.trim())
        .filter(Boolean);

      const payload: NewReviewForm = {
        teacherId: isOtherTeacher ? '' : teacherId,
        teacherName: isOtherTeacher ? customTeacherName.trim() : undefined,
        authorName: isAnonymous ? 'Аноним' : authorName.trim() || 'Студент',
        isAnonymous,
        authorStatus,
        overallRating,
        teacherRating,
        practiceRating,
        jobSupportRating,
        valueRating,
        wouldRecommend,
        pricePaidKgs: pricePaidKgs.trim() || undefined,
        durationMonths: durationMonths.trim() || undefined,
        cohortYear: cohortYear.trim() || undefined,
        title: title.trim() || (overallRating >= 4 ? 'Жакшы тажрыйба' : 'Сын-пикир'),
        fullReview: fullReview.trim(),
        pros,
        cons,
        adviceForNewcomers: adviceText.trim() || undefined,
        whatsappNumber: whatsappNumber.trim() || undefined,
        hasJobScamReport,
        isVerified,
      };

      await createReview(payload);
      onReviewCreated();
    } catch (err: any) {
      console.error('Error submitting review:', err);
      setErrorMessage(err.message || (lang === 'ky' ? 'Ката кетти, кайра аракет кылыңыз' : 'Произошла ошибка'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const StarPicker = ({
    value,
    onChange,
    label,
  }: {
    value: number;
    onChange: (v: number) => void;
    label: string;
  }) => (
    <div className="flex items-center justify-between py-1.5">
      <span className="text-xs text-slate-300 font-medium">{label}</span>
      <div className="flex items-center gap-1 text-amber-400">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            type="button"
            key={star}
            onClick={() => onChange(star)}
            className="p-1 text-amber-400 hover:scale-110 active:scale-95 transition-transform"
          >
            <Star
              className={`w-5 h-5 ${
                star <= value ? 'fill-amber-400 text-amber-400' : 'text-slate-600'
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex justify-center items-end sm:items-center">
      <div className="bg-slate-900 border border-slate-700/80 rounded-t-3xl sm:rounded-3xl w-full max-w-lg max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-900/90 sticky top-0 z-10">
          <div>
            <h2 className="text-base font-bold text-white">{t.addReviewModal.title}</h2>
            <p className="text-[11px] text-slate-400 mt-0.5">{t.addReviewModal.subtitle}</p>
          </div>
          <button
            id="close-add-review-modal-btn"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Form */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-4 space-y-4 flex-1">
          {errorMessage && (
            <div className="bg-rose-500/20 border border-rose-500/40 text-rose-200 text-xs rounded-xl p-3 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Teacher Selection */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-200">
              {t.addReviewModal.teacherName} *
            </label>
            {!isOtherTeacher ? (
              <select
                id="review-teacher-select"
                value={teacherId}
                onChange={(e) => {
                  if (e.target.value === '__OTHER__') {
                    setIsOtherTeacher(true);
                  } else {
                    setTeacherId(e.target.value);
                  }
                }}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
              >
                {teachers.map((tch) => (
                  <option key={tch.id} value={tch.id}>
                    {tch.name} {tch.academy_name ? `(${tch.academy_name})` : ''}
                  </option>
                ))}
                <option value="__OTHER__">
                  + {lang === 'ky' ? 'Тизмеде жок (Атын кол менен жазуу)' : 'Нет в списке (Ввести имя вручную)'}
                </option>
              </select>
            ) : (
              <div className="space-y-1.5">
                <input
                  type="text"
                  value={customTeacherName}
                  onChange={(e) => setCustomTeacherName(e.target.value)}
                  placeholder={t.addReviewModal.newTeacherNamePlaceholder}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                />
                <button
                  type="button"
                  onClick={() => setIsOtherTeacher(false)}
                  className="text-[11px] text-indigo-400 hover:text-indigo-300 font-medium"
                >
                  ← {lang === 'ky' ? 'Тизмеден тандоого кайтуу' : 'Вернуться к выбору из списка'}
                </button>
              </div>
            )}
          </div>

          {/* Overall Rating */}
          <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-3.5 space-y-1">
            <StarPicker
              value={overallRating}
              onChange={setOverallRating}
              label={t.addReviewModal.overallRating}
            />
          </div>

          {/* Sub-ratings */}
          <div className="bg-slate-800/50 border border-slate-700/40 rounded-2xl p-3.5 space-y-1">
            <div className="text-[11px] font-bold text-slate-400 mb-1">
              {lang === 'ky' ? 'Критерийлер боюнча баа:' : 'Оценки по критериям:'}
            </div>
            <StarPicker
              value={teacherRating}
              onChange={setTeacherRating}
              label={t.addReviewModal.teacherRating}
            />
            <StarPicker
              value={practiceRating}
              onChange={setPracticeRating}
              label={t.addReviewModal.practiceRating}
            />
            <StarPicker
              value={jobSupportRating}
              onChange={setJobSupportRating}
              label={t.addReviewModal.jobSupportRating}
            />
            <StarPicker
              value={valueRating}
              onChange={setValueRating}
              label={t.addReviewModal.valueRating}
            />
          </div>

          {/* Recommend Toggle */}
          <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-3.5 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-200">
              {t.addReviewModal.recommendQuestion}
            </span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setWouldRecommend(true)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  wouldRecommend
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>{t.addReviewModal.yes}</span>
              </button>
              <button
                type="button"
                onClick={() => setWouldRecommend(false)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  !wouldRecommend
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <ThumbsDown className="w-3.5 h-3.5" />
                <span>{t.addReviewModal.no}</span>
              </button>
            </div>
          </div>

          {/* Author info & Status */}
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-200 block mb-1">
                  {t.addReviewModal.authorName}
                </label>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  disabled={isAnonymous}
                  placeholder={isAnonymous ? 'Аноним' : 'Азамат'}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 disabled:opacity-50"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-200 block mb-1">
                  {t.addReviewModal.authorStatus}
                </label>
                <select
                  value={authorStatus}
                  onChange={(e) => setAuthorStatus(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="graduate">{t.addReviewModal.statusGraduate}</option>
                  <option value="current">{t.addReviewModal.statusCurrent}</option>
                  <option value="dropped_out">{t.addReviewModal.statusDropped}</option>
                </select>
              </div>
            </div>

            {/* Anonymous checkbox */}
            <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300 select-none">
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 bg-slate-800 border-slate-700"
              />
              <span>{lang === 'ky' ? 'Анонимдүү пикир калтыруу (атым жашырылсын)' : 'Оставить отзыв анонимно'}</span>
            </label>
          </div>

          {/* Review Title & Full text */}
          <div className="space-y-3">
            <div>
              <label className="text-xs font-bold text-slate-200 block mb-1">
                {t.addReviewModal.reviewTitle}
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={lang === 'ky' ? 'Мис: Практикасы абдан күчтүү өттү' : 'Напр: Сильная подача и практика'}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-200 block mb-1">
                {t.addReviewModal.fullReview} *
              </label>
              <textarea
                rows={4}
                value={fullReview}
                onChange={(e) => setFullReview(e.target.value)}
                placeholder={lang === 'ky' ? 'Окутуу кандай өттү? Мугалим убадаларын аткардыбы? Чыныгы тажрыйбаңызды жазыңыз...' : 'Как проходило обучение? Выполнил ли преподаватель обещания? Напишите реальный опыт...'}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Toggle additional fields */}
          <button
            type="button"
            onClick={() => setShowMoreDetails(!showMoreDetails)}
            className="flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300 py-1"
          >
            {showMoreDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            <span>{showMoreDetails ? t.addReviewModal.showLessDetails : t.addReviewModal.showMoreDetails}</span>
          </button>

          {/* More details container */}
          {showMoreDetails && (
            <div className="bg-slate-850 border border-slate-800 rounded-2xl p-3.5 space-y-3">
              {/* Pros & Cons */}
              <div>
                <label className="text-xs font-bold text-emerald-400 block mb-1">
                  {t.addReviewModal.prosLabel}
                </label>
                <input
                  type="text"
                  value={prosText}
                  onChange={(e) => setProsText(e.target.value)}
                  placeholder={lang === 'ky' ? 'Түшүнүктүү түшүндүрөт, үй тапшырманы текшерет' : 'Понятная подача, быстрая проверка ДЗ'}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-400"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-rose-400 block mb-1">
                  {t.addReviewModal.consLabel}
                </label>
                <input
                  type="text"
                  value={consText}
                  onChange={(e) => setConsText(e.target.value)}
                  placeholder={lang === 'ky' ? 'Сабактар кечигип башталды, куратор жооп бербейт' : 'Задержки уроков, слабый куратор'}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-400"
                />
              </div>

              {/* Advice */}
              <div>
                <label className="text-xs font-bold text-slate-200 block mb-1">
                  {t.addReviewModal.adviceLabel}
                </label>
                <input
                  type="text"
                  value={adviceText}
                  onChange={(e) => setAdviceText(e.target.value)}
                  placeholder={lang === 'ky' ? 'Курска чейин базалык видеолорду көрүп алыңыздар' : 'Посмотрите базовые уроки заранее'}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-400"
                />
              </div>

              {/* Price, duration, cohort */}
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[10px] font-bold text-slate-300 block mb-1">
                    {lang === 'ky' ? 'Төлөнгөн сом' : 'Оплата (сом)'}
                  </label>
                  <input
                    type="number"
                    value={pricePaidKgs}
                    onChange={(e) => setPricePaidKgs(e.target.value)}
                    placeholder="45000"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-300 block mb-1">
                    {lang === 'ky' ? 'Ай (мөөнөт)' : 'Месяцев'}
                  </label>
                  <input
                    type="number"
                    value={durationMonths}
                    onChange={(e) => setDurationMonths(e.target.value)}
                    placeholder="6"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-300 block mb-1">
                    {lang === 'ky' ? 'Жылы' : 'Год'}
                  </label>
                  <input
                    type="text"
                    value={cohortYear}
                    onChange={(e) => setCohortYear(e.target.value)}
                    placeholder="2024"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-white"
                  />
                </div>
              </div>

              {/* WhatsApp number optional */}
              <div>
                <label className="text-xs font-bold text-slate-200 block mb-0.5">
                  {t.addReviewModal.whatsappLabel}
                </label>
                <input
                  type="tel"
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                  placeholder="+996 700 000 000"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-400"
                />
                <p className="text-[10px] text-slate-400 mt-1">{t.addReviewModal.whatsappNote}</p>
              </div>
            </div>
          )}

          {/* Scam warning checkbox */}
          <div className="bg-rose-500/10 border border-rose-500/25 rounded-2xl p-3">
            <label className="flex items-start gap-2.5 cursor-pointer text-xs text-rose-200 select-none">
              <input
                type="checkbox"
                checked={hasJobScamReport}
                onChange={(e) => setHasJobScamReport(e.target.checked)}
                className="w-4 h-4 rounded text-rose-600 focus:ring-rose-500 bg-slate-800 border-slate-700 flex-shrink-0 mt-0.5"
              />
              <span className="leading-snug">{t.addReviewModal.scamWarningCheckbox}</span>
            </label>
          </div>

          {/* Verified checkbox */}
          <div className="bg-slate-800/60 border border-slate-700/40 rounded-2xl p-3">
            <label className="flex items-center gap-2.5 cursor-pointer text-xs text-slate-300 select-none">
              <input
                type="checkbox"
                checked={isVerified}
                onChange={(e) => setIsVerified(e.target.checked)}
                className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 bg-slate-800 border-slate-700"
              />
              <span>{t.addReviewModal.verifiedCheckbox}</span>
            </label>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              id="submit-review-form-btn"
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 hover:from-indigo-500 hover:to-violet-500 active:scale-[0.98] text-white font-bold text-xs rounded-2xl shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              <Send className={`w-4 h-4 ${isSubmitting ? 'animate-pulse' : ''}`} />
              <span>{isSubmitting ? (lang === 'ky' ? 'Сакталууда...' : 'Сохранение...') : t.addReviewModal.submitBtn}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
