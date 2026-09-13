import React, { useState, useEffect, useCallback } from 'react';
import { Teacher, Course, Review, FeaturedVideo, Language, NavTab } from './types';
import {
  fetchTeachersWithReviews,
  fetchCourses,
  fetchFeaturedVideos,
  getFallbackTeachers,
  getFallbackCourses,
  getFallbackVideos,
} from './lib/supabase';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomeTab } from './components/HomeTab';
import { TeachersTab } from './components/TeachersTab';
import { LeaderboardTab } from './components/LeaderboardTab';
import { VideosTab } from './components/VideosTab';
import { ReportScamTab } from './components/ReportScamTab';
import { TeacherDetailModal } from './components/TeacherDetailModal';
import { AddReviewModal } from './components/AddReviewModal';
import { AddTeacherModal } from './components/AddTeacherModal';
import { CoursesModal } from './components/CoursesModal';
import { SearchModal } from './components/SearchModal';
import { CheckCircle2, RefreshCw, AlertCircle } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('kursotzyv_lang');
    return saved === 'ru' ? 'ru' : 'ky';
  });

  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [videos, setVideos] = useState<FeaturedVideo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Modals state
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [isAddReviewOpen, setIsAddReviewOpen] = useState<boolean>(false);
  const [reviewTeacherTarget, setReviewTeacherTarget] = useState<Teacher | null>(null);
  const [isAddTeacherOpen, setIsAddTeacherOpen] = useState<boolean>(false);
  const [isCoursesOpen, setIsCoursesOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  // Category filter state for Teachers tab
  const [teachersInitialCategory, setTeachersInitialCategory] = useState<string>('all');

  // Success toast message
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleLanguageChange = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem('kursotzyv_lang', newLang);
  };

  const loadData = useCallback(async (isRefresh = false) => {
    if (isRefresh) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }
    setLoadError(null);

    try {
      const [fetchedTeachers, fetchedCourses, fetchedVideos] = await Promise.all([
        fetchTeachersWithReviews(),
        fetchCourses(),
        fetchFeaturedVideos(),
      ]);

      setTeachers(fetchedTeachers.length > 0 ? fetchedTeachers : getFallbackTeachers());
      setCourses(fetchedCourses.length > 0 ? fetchedCourses : getFallbackCourses());
      setVideos(fetchedVideos.length > 0 ? fetchedVideos : getFallbackVideos());
    } catch (err: any) {
      console.error('Error loading data from Supabase:', err);
      // Fallback gracefully so the user always has a functional app
      setTeachers(getFallbackTeachers());
      setCourses(getFallbackCourses());
      setVideos(getFallbackVideos());
      setLoadError(lang === 'ky' ? 'Маалыматты жаңыртууда ката кетти' : 'Ошибка при синхронизации');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [lang]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Aggregate all reviews across all teachers
  const allReviews: Review[] = React.useMemo(() => {
    const list: Review[] = [];
    teachers.forEach((t) => {
      if (t.reviews && t.reviews.length > 0) {
        list.push(...t.reviews);
      }
    });
    return list;
  }, [teachers]);

  const handleSelectCategoryFromHome = (categoryKey: string) => {
    setTeachersInitialCategory(categoryKey);
    setActiveTab('teachers');
  };

  const handleOpenWriteReview = (teacher?: Teacher) => {
    setReviewTeacherTarget(teacher || null);
    setIsAddReviewOpen(true);
  };

  const handleReviewCreated = async () => {
    setIsAddReviewOpen(false);
    showToast(
      lang === 'ky'
        ? 'Сын-пикириңиз ийгиликтүү кошулду! Чоң рахмат!'
        : 'Ваш отзыв успешно сохранен! Спасибо за вклад!'
    );
    await loadData(true);
    // If modal was open for teacher, update selectedTeacher with new reviews
    if (selectedTeacher) {
      const updated = teachers.find((t) => t.id === selectedTeacher.id);
      if (updated) setSelectedTeacher(updated);
    }
  };

  const handleTeacherCreated = async () => {
    setIsAddTeacherOpen(false);
    showToast(
      lang === 'ky'
        ? 'Жаңы мугалим базага ийгиликтүү кошулду!'
        : 'Новый преподаватель успешно добавлен в базу!'
    );
    await loadData(true);
    setActiveTab('teachers');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex justify-center font-sans antialiased selection:bg-indigo-500 selection:text-white">
      {/* Mobile Shell Wrapper */}
      <div className="w-full max-w-md min-h-screen bg-slate-950 flex flex-col relative shadow-2xl border-x border-slate-900">
        {/* Sticky App Header */}
        <Header
          lang={lang}
          onLanguageChange={handleLanguageChange}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenCourses={() => setIsCoursesOpen(true)}
          onOpenAddTeacher={() => setIsAddTeacherOpen(true)}
        />

        {/* Global Toast Notification */}
        {toastMessage && (
          <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 w-11/12 max-w-sm bg-emerald-600 text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 animate-in slide-in-from-top duration-200">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span className="leading-snug">{toastMessage}</span>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 overflow-x-hidden">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-3">
              <div className="w-10 h-10 border-3 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
              <p className="text-xs text-slate-400 font-medium animate-pulse">
                {lang === 'ky' ? 'Базадан жүктөлүүдө...' : 'Загрузка данных...'}
              </p>
            </div>
          ) : (
            <>
              {loadError && (
                <div className="mx-4 mt-2 bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs px-3 py-2 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-400" />
                    <span>{loadError}</span>
                  </div>
                  <button
                    onClick={() => loadData(true)}
                    className="text-[11px] font-bold underline ml-2"
                  >
                    {lang === 'ky' ? 'Кайталоо' : 'Повторить'}
                  </button>
                </div>
              )}

              {activeTab === 'home' && (
                <HomeTab
                  teachers={teachers}
                  courses={courses}
                  reviews={allReviews}
                  lang={lang}
                  onSelectTeacher={(teacher) => setSelectedTeacher(teacher)}
                  onWriteReviewForTeacher={handleOpenWriteReview}
                  onOpenAddReview={() => handleOpenWriteReview()}
                  onOpenAddTeacher={() => setIsAddTeacherOpen(true)}
                  onOpenCourses={() => setIsCoursesOpen(true)}
                  onSelectCategory={handleSelectCategoryFromHome}
                  onOpenSearch={() => setIsSearchOpen(true)}
                  onNavigateToTeachers={() => setActiveTab('teachers')}
                  onNavigateToReport={() => setActiveTab('report')}
                />
              )}

              {activeTab === 'teachers' && (
                <TeachersTab
                  teachers={teachers}
                  lang={lang}
                  initialCategory={teachersInitialCategory}
                  onSelectTeacher={(teacher) => setSelectedTeacher(teacher)}
                  onWriteReviewForTeacher={handleOpenWriteReview}
                  onOpenAddTeacher={() => setIsAddTeacherOpen(true)}
                />
              )}

              {activeTab === 'leaderboard' && (
                <LeaderboardTab
                  teachers={teachers}
                  lang={lang}
                  onSelectTeacher={(teacher) => setSelectedTeacher(teacher)}
                  onWriteReviewForTeacher={handleOpenWriteReview}
                />
              )}

              {activeTab === 'videos' && <VideosTab videos={videos} lang={lang} />}

              {activeTab === 'report' && <ReportScamTab lang={lang} />}
            </>
          )}
        </main>

        {/* Floating Quick Review Action button on Home & Teachers tab */}
        {(activeTab === 'home' || activeTab === 'teachers') && !isLoading && (
          <button
            id="floating-add-review-btn"
            onClick={() => handleOpenWriteReview()}
            className="fixed bottom-20 right-4 sm:right-[max(1rem,calc(50%-210px))] z-30 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs font-black px-4 py-3 rounded-2xl shadow-xl shadow-indigo-600/40 flex items-center gap-2 active:scale-95 transition-all"
          >
            <span className="text-base leading-none font-bold">+</span>
            <span>{lang === 'ky' ? 'Пикир жазуу' : 'Оставить отзыв'}</span>
          </button>
        )}

        {/* Mobile Bottom Navigation Bar */}
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} lang={lang} />

        {/* Modals */}
        {selectedTeacher && (
          <TeacherDetailModal
            teacher={selectedTeacher}
            lang={lang}
            onClose={() => setSelectedTeacher(null)}
            onWriteReview={(tch) => {
              setSelectedTeacher(null);
              handleOpenWriteReview(tch);
            }}
          />
        )}

        {isAddReviewOpen && (
          <AddReviewModal
            teachers={teachers}
            selectedTeacherId={reviewTeacherTarget?.id}
            lang={lang}
            onClose={() => {
              setIsAddReviewOpen(false);
              setReviewTeacherTarget(null);
            }}
            onReviewCreated={handleReviewCreated}
          />
        )}

        {isAddTeacherOpen && (
          <AddTeacherModal
            lang={lang}
            onClose={() => setIsAddTeacherOpen(false)}
            onTeacherCreated={handleTeacherCreated}
          />
        )}

        {isCoursesOpen && (
          <CoursesModal
            courses={courses}
            lang={lang}
            onClose={() => setIsCoursesOpen(false)}
          />
        )}

        {isSearchOpen && (
          <SearchModal
            teachers={teachers}
            courses={courses}
            lang={lang}
            onClose={() => setIsSearchOpen(false)}
            onSelectTeacher={(tch) => setSelectedTeacher(tch)}
            onSelectCourse={(c) => setIsCoursesOpen(true)}
          />
        )}
      </div>
    </div>
  );
}
