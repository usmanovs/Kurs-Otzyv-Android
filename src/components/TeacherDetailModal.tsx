import React, { useState } from 'react';
import { Teacher, Review, Language } from '../types';
import { translations } from '../lib/i18n';
import { voteReviewHelpfulness } from '../lib/supabase';
import {
  X,
  Star,
  Building2,
  ThumbsUp,
  ThumbsDown,
  Instagram,
  Youtube,
  Share2,
  CheckCircle2,
  AlertTriangle,
  MessageSquare,
  Award,
  Calendar,
  Wallet,
  Clock,
  Check,
} from 'lucide-react';

interface TeacherDetailModalProps {
  teacher: Teacher;
  lang: Language;
  onClose: () => void;
  onWriteReview: (teacher: Teacher) => void;
}

export const TeacherDetailModal: React.FC<TeacherDetailModalProps> = ({
  teacher,
  lang,
  onClose,
  onWriteReview,
}) => {
  const t = translations[lang];
  const [filterType, setFilterType] = useState<'all' | 'positive' | 'negative' | 'verified'>('all');
  const [copied, setCopied] = useState(false);
  const [votedReviews, setVotedReviews] = useState<Record<string, 'helpful' | 'unhelpful'>>({});
  const [reviewsState, setReviewsState] = useState<Review[]>(teacher.reviews || []);

  const reviews = reviewsState.filter((r) => !r.is_hidden);
  const reviewCount = reviews.length;
  const rating = teacher.avgRating || 0;

  // Score distribution calculation
  const scoreDistribution = [5, 4, 3, 2, 1].map((stars) => {
    const count = reviews.filter((r) => r.overall_rating === stars).length;
    const percentage = reviewCount > 0 ? Math.round((count / reviewCount) * 100) : 0;
    return { stars, count, percentage };
  });

  // Filtered reviews
  const filteredReviews = reviews.filter((r) => {
    if (filterType === 'positive') return r.overall_rating >= 4;
    if (filterType === 'negative') return r.overall_rating < 4;
    if (filterType === 'verified') return r.is_verified;
    return true;
  });

  const handleShare = () => {
    const shareUrl = `https://www.kursotzyv.org/teacher/${teacher.id}`;
    if (navigator.share) {
      navigator.share({
        title: teacher.name,
        text: `${teacher.name} жөнүндө студенттердин сын-пикирлери — Kursotzyv`,
        url: shareUrl,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleVote = async (reviewId: string, isHelpful: boolean) => {
    if (votedReviews[reviewId]) return;

    // Optimistic UI update
    setVotedReviews((prev) => ({ ...prev, [reviewId]: isHelpful ? 'helpful' : 'unhelpful' }));
    setReviewsState((prev) =>
      prev.map((r) => {
        if (r.id === reviewId) {
          return {
            ...r,
            helpful_count: isHelpful ? (r.helpful_count || 0) + 1 : r.helpful_count,
            unhelpful_count: !isHelpful ? (r.unhelpful_count || 0) + 1 : r.unhelpful_count,
          };
        }
        return r;
      })
    );

    const target = reviewsState.find((r) => r.id === reviewId);
    if (!target) return;

    const currentCount = isHelpful ? target.helpful_count : target.unhelpful_count;
    try {
      await voteReviewHelpfulness(reviewId, isHelpful, currentCount);
    } catch (e) {
      console.error('Failed to register vote:', e);
    }
  };

  const categoryName = teacher.category ? t.categories[teacher.category] || teacher.category : null;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex justify-center items-end sm:items-center">
      {/* Container */}
      <div className="bg-slate-900 border border-slate-700/80 rounded-t-3xl sm:rounded-3xl w-full max-w-lg max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-200">
        {/* Top bar with drag handle and close */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-900/90 sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <button
              id="modal-share-btn"
              onClick={handleShare}
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-2.5 py-1.5 rounded-xl transition-all"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? t.teacherDetail.linkCopied : t.teacherDetail.share}</span>
            </button>
          </div>
          <button
            id="modal-close-btn"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-4 space-y-5 flex-1">
          {/* Profile Header */}
          <div className="flex items-start gap-4">
            <div className="relative flex-shrink-0">
              {teacher.photo_url ? (
                <img
                  src={teacher.photo_url}
                  alt={teacher.name}
                  referrerPolicy="no-referrer"
                  className="w-20 h-20 rounded-2xl object-cover ring-2 ring-indigo-500/40 shadow-lg"
                />
              ) : (
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-indigo-700 via-indigo-600 to-violet-500 flex items-center justify-center font-bold text-white text-2xl ring-2 ring-indigo-500/40 shadow-lg">
                  {teacher.name[0]?.toUpperCase() || 'К'}
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-black text-white leading-snug">{teacher.name}</h2>
              {teacher.academy_name && (
                <div className="flex items-center gap-1.5 text-xs text-slate-300 mt-1">
                  <Building2 className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />
                  <span className="truncate">{teacher.academy_name}</span>
                </div>
              )}
              {categoryName && (
                <div className="mt-1.5">
                  <span className="text-[11px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2 py-0.5 rounded-md">
                    {categoryName}
                  </span>
                </div>
              )}

              {/* Social Links */}
              <div className="flex items-center gap-2 mt-2.5">
                {teacher.instagram_url && (
                  <a
                    href={teacher.instagram_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[11px] text-pink-400 hover:text-pink-300 bg-pink-500/15 border border-pink-500/25 px-2 py-0.5 rounded-lg"
                  >
                    <Instagram className="w-3 h-3" />
                    <span>Instagram</span>
                  </a>
                )}
                {teacher.youtube_url && (
                  <a
                    href={teacher.youtube_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[11px] text-red-400 hover:text-red-300 bg-red-500/15 border border-red-500/25 px-2 py-0.5 rounded-lg"
                  >
                    <Youtube className="w-3 h-3" />
                    <span>YouTube</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Bio if exists */}
          {teacher.bio && (
            <div className="text-xs text-slate-300 bg-slate-800/50 p-3 rounded-2xl border border-slate-700/40 leading-relaxed">
              {teacher.bio}
            </div>
          )}

          {/* Overall Rating & Scores Card */}
          <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-black text-white">{rating > 0 ? rating.toFixed(1) : '-'}</span>
                  <span className="text-xs text-slate-400 font-bold">/ 5.0</span>
                </div>
                <div className="flex items-center gap-1 mt-1 text-amber-400">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= Math.round(rating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-slate-600'
                      }`}
                    />
                  ))}
                  <span className="text-xs text-slate-400 ml-1">
                    ({reviewCount} {t.teachersSection.reviewsCount})
                  </span>
                </div>
              </div>

              {teacher.recommendRate !== undefined && reviewCount > 0 && (
                <div className="text-right">
                  <div
                    className={`text-2xl font-black ${
                      teacher.recommendRate >= 70 ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {teacher.recommendRate}%
                  </div>
                  <div className="text-[10px] text-slate-400 font-medium">
                    {lang === 'ky' ? 'Сунушташат' : 'Рекомендуют'}
                  </div>
                </div>
              )}
            </div>

            {/* Sub-scores breakdown */}
            {reviewCount > 0 && teacher.subRatings && (
              <div className="pt-2 border-t border-slate-700/50 space-y-2">
                <div className="text-xs font-bold text-slate-300">{t.teacherDetail.subScoresTitle}</div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-slate-900/60 p-2 rounded-xl border border-slate-800">
                    <div className="text-[10px] text-slate-400">
                      {lang === 'ky' ? 'Мугалимдин сапаты' : 'Качество обучения'}
                    </div>
                    <div className="text-xs font-bold text-indigo-300 mt-0.5">
                      {teacher.subRatings.teacher} / 5
                    </div>
                  </div>
                  <div className="bg-slate-900/60 p-2 rounded-xl border border-slate-800">
                    <div className="text-[10px] text-slate-400">
                      {lang === 'ky' ? 'Практика деңгээли' : 'Практика'}
                    </div>
                    <div className="text-xs font-bold text-indigo-300 mt-0.5">
                      {teacher.subRatings.practice} / 5
                    </div>
                  </div>
                  <div className="bg-slate-900/60 p-2 rounded-xl border border-slate-800">
                    <div className="text-[10px] text-slate-400">
                      {lang === 'ky' ? 'Жумушка көмөк' : 'Трудоустройство'}
                    </div>
                    <div className="text-xs font-bold text-indigo-300 mt-0.5">
                      {teacher.subRatings.jobSupport} / 5
                    </div>
                  </div>
                  <div className="bg-slate-900/60 p-2 rounded-xl border border-slate-800">
                    <div className="text-[10px] text-slate-400">
                      {lang === 'ky' ? 'Баа / Сапат' : 'Цена / Качество'}
                    </div>
                    <div className="text-xs font-bold text-indigo-300 mt-0.5">
                      {teacher.subRatings.value} / 5
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Distribution Bar */}
            {reviewCount > 0 && (
              <div className="pt-2 border-t border-slate-700/50 space-y-1.5">
                <div className="text-[11px] font-bold text-slate-400">{t.teacherDetail.ratingDistribution}</div>
                {scoreDistribution.map(({ stars, count, percentage }) => (
                  <div key={stars} className="flex items-center gap-2 text-[11px]">
                    <span className="w-4 text-slate-400 font-bold">{stars}★</span>
                    <div className="flex-1 h-2 bg-slate-900 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-400 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="w-7 text-right text-slate-400">{count}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action to write review */}
          <button
            id="detail-write-review-btn"
            onClick={() => onWriteReview(teacher)}
            className="w-full py-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 active:scale-[0.98] text-white font-bold text-xs rounded-2xl shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all"
          >
            <MessageSquare className="w-4 h-4" />
            <span>{t.teacherDetail.writeReview}</span>
          </button>

          {/* Reviews Tabs Filter */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white">{t.teacherDetail.reviewsTab}</h3>
              <span className="text-xs text-slate-400">
                {filteredReviews.length} / {reviewCount}
              </span>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs">
              {[
                { key: 'all', label: t.teacherDetail.allReviews },
                { key: 'positive', label: t.teacherDetail.positive },
                { key: 'negative', label: t.teacherDetail.negative },
                { key: 'verified', label: t.teacherDetail.verifiedOnly },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setFilterType(tab.key as any)}
                  className={`px-3 py-1 rounded-xl font-semibold whitespace-nowrap transition-all text-xs ${
                    filterType === tab.key
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Reviews List */}
            {filteredReviews.length > 0 ? (
              <div className="space-y-3">
                {filteredReviews.map((review) => {
                  const userVote = votedReviews[review.id];
                  return (
                    <div
                      key={review.id}
                      className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-3.5 space-y-2.5 shadow-sm"
                    >
                      {/* Author row */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center text-white text-xs font-bold">
                            {review.is_anonymous ? '?' : review.author_name[0]?.toUpperCase() || 'С'}
                          </div>
                          <div>
                            <div className="text-xs font-bold text-white flex items-center gap-1.5">
                              <span>
                                {review.is_anonymous
                                  ? lang === 'ky'
                                    ? 'Анонимдүү студент'
                                    : 'Анонимный студент'
                                  : review.author_name}
                              </span>
                              {review.is_verified && (
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                              )}
                            </div>
                            <div className="text-[10px] text-slate-400">
                              {review.author_status === 'graduate'
                                ? lang === 'ky'
                                ? 'Бүтүрүүчү'
                                : 'Выпускник'
                                : review.author_status === 'current'
                                ? lang === 'ky'
                                ? 'Учурдагы студент'
                                : 'Текущий студент'
                                : review.author_status === 'dropped_out'
                                ? lang === 'ky'
                                ? 'Таштап кеткен'
                                : 'Бросил курс'
                                : review.author_status}
                            </div>
                          </div>
                        </div>

                        {/* Stars */}
                        <div className="flex items-center gap-1 bg-amber-400/15 text-amber-300 px-2 py-0.5 rounded-lg text-xs font-bold">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          <span>{review.overall_rating}</span>
                        </div>
                      </div>

                      {/* Scam warning banner on review */}
                      {review.has_job_scam_report && (
                        <div className="bg-rose-500/15 border border-rose-500/30 rounded-xl p-2 flex items-center gap-2 text-[11px] text-rose-300 font-medium">
                          <AlertTriangle className="w-3.5 h-3.5 text-rose-400 flex-shrink-0" />
                          <span>{t.teacherDetail.scamWarningReported}</span>
                        </div>
                      )}

                      {/* Title & Full Text */}
                      {review.title && (
                        <h4 className="text-xs font-bold text-white">"{review.title}"</h4>
                      )}
                      <p className="text-xs text-slate-200 leading-relaxed whitespace-pre-wrap">
                        {review.full_review}
                      </p>

                      {/* Pros & Cons */}
                      {review.pros && review.pros.length > 0 && (
                        <div className="text-[11px] space-y-1">
                          <span className="font-bold text-emerald-400">{t.teacherDetail.pros}</span>
                          <div className="flex flex-wrap gap-1 mt-0.5">
                            {review.pros.map((p, i) => (
                              <span
                                key={i}
                                className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-200 px-2 py-0.5 rounded-md"
                              >
                                + {p}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {review.cons && review.cons.length > 0 && (
                        <div className="text-[11px] space-y-1">
                          <span className="font-bold text-rose-400">{t.teacherDetail.cons}</span>
                          <div className="flex flex-wrap gap-1 mt-0.5">
                            {review.cons.map((c, i) => (
                              <span
                                key={i}
                                className="bg-rose-500/10 border border-rose-500/20 text-rose-200 px-2 py-0.5 rounded-md"
                              >
                                - {c}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Advice */}
                      {review.advice_for_newcomers && (
                        <div className="text-[11px] text-slate-300 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                          <span className="font-bold text-indigo-300">{t.teacherDetail.advice} </span>
                          <span>{review.advice_for_newcomers}</span>
                        </div>
                      )}

                      {/* Metadata row: cohort, price, duration */}
                      <div className="flex items-center flex-wrap gap-3 text-[10px] text-slate-400 pt-1 border-t border-slate-700/30">
                        {review.cohort_year && (
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-slate-500" />
                            <span>
                              {t.teacherDetail.cohort} {review.cohort_year}
                            </span>
                          </span>
                        )}
                        {review.price_paid_kgs && (
                          <span className="flex items-center gap-1">
                            <Wallet className="w-3 h-3 text-slate-500" />
                            <span>
                              {review.price_paid_kgs.toLocaleString()} сом
                            </span>
                          </span>
                        )}
                        {review.duration_months && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-500" />
                            <span>
                              {review.duration_months} {lang === 'ky' ? 'ай' : 'мес.'}
                            </span>
                          </span>
                        )}
                      </div>

                      {/* Helpfulness voting row */}
                      <div className="flex items-center justify-between pt-1 border-t border-slate-700/30 text-[11px]">
                        <span className="text-slate-400">{t.teacherDetail.helpfulQuestion}</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleVote(review.id, true)}
                            disabled={!!userVote}
                            className={`flex items-center gap-1 px-2 py-0.5 rounded-lg border text-xs transition-all active:scale-95 ${
                              userVote === 'helpful'
                                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold'
                                : 'bg-slate-700/40 text-slate-300 border-slate-600/40 hover:bg-slate-700'
                            }`}
                          >
                            <ThumbsUp className="w-3 h-3" />
                            <span>{review.helpful_count || 0}</span>
                          </button>

                          <button
                            onClick={() => handleVote(review.id, false)}
                            disabled={!!userVote}
                            className={`flex items-center gap-1 px-2 py-0.5 rounded-lg border text-xs transition-all active:scale-95 ${
                              userVote === 'unhelpful'
                                ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 font-bold'
                                : 'bg-slate-700/40 text-slate-300 border-slate-600/40 hover:bg-slate-700'
                            }`}
                          >
                            <ThumbsDown className="w-3 h-3" />
                            <span>{review.unhelpful_count || 0}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 bg-slate-800/40 border border-slate-700/40 rounded-2xl p-4 text-xs text-slate-400">
                {t.teacherDetail.noReviewsYet}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
