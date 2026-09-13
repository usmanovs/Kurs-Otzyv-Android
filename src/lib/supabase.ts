import { createClient } from '@supabase/supabase-js';
import { Course, FeaturedVideo, NewReviewForm, NewTeacherForm, Review, Teacher } from '../types';

export const SUPABASE_URL = 'https://gjztmndexekeenunygem.supabase.co';
export const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdqenRtbmRleGVrZWVudW55Z2VtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg0MjQ4NjIsImV4cCI6MjEwNDAwMDg2Mn0.FWmbPjpi2UiBE1JlQJxJAZ66FrCcQvqXeabVh0Bp1mI';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export function getFullPhotoUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  if (url.startsWith('/')) return `https://www.kursotzyv.org${url}`;
  return `https://www.kursotzyv.org/${url}`;
}

export function computeTeacherStats(teacher: any): Teacher {
  const reviews: Review[] = (teacher.reviews || []).filter((r: any) => !r.is_hidden);
  const count = reviews.length;

  let avgRating = 0;
  let recommendRate = 100;
  let subRatings = {
    teacher: 0,
    practice: 0,
    jobSupport: 0,
    value: 0,
  };

  if (count > 0) {
    const sumOverall = reviews.reduce((acc, r) => acc + (r.overall_rating || 0), 0);
    avgRating = Number((sumOverall / count).toFixed(1));

    const recommendedCount = reviews.filter((r) => r.would_recommend).length;
    recommendRate = Math.round((recommendedCount / count) * 100);

    const sumT = reviews.reduce((acc, r) => acc + (r.teacher_rating || r.overall_rating || 0), 0);
    const sumP = reviews.reduce((acc, r) => acc + (r.practice_rating || r.overall_rating || 0), 0);
    const sumJ = reviews.reduce((acc, r) => acc + (r.job_support_rating || r.overall_rating || 0), 0);
    const sumV = reviews.reduce((acc, r) => acc + (r.value_rating || r.overall_rating || 0), 0);

    subRatings = {
      teacher: Number((sumT / count).toFixed(1)),
      practice: Number((sumP / count).toFixed(1)),
      jobSupport: Number((sumJ / count).toFixed(1)),
      value: Number((sumV / count).toFixed(1)),
    };
  }

  return {
    ...teacher,
    photo_url: getFullPhotoUrl(teacher.photo_url),
    reviews,
    avgRating,
    reviewCount: count,
    recommendRate,
    subRatings,
  };
}

export async function fetchTeachersWithReviews(): Promise<Teacher[]> {
  const { data, error } = await supabase
    .from('teachers')
    .select('*, reviews(*)')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching teachers:', error);
    throw error;
  }

  return (data || []).map(computeTeacherStats);
}

export async function fetchCourses(): Promise<Course[]> {
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }

  return data || [];
}

export async function fetchFeaturedVideos(): Promise<FeaturedVideo[]> {
  const { data, error } = await supabase
    .from('featured_videos')
    .select('*')
    .order('added_at', { ascending: false });

  if (error) {
    console.error('Error fetching videos:', error);
    throw error;
  }

  return data || [];
}

export async function createTeacher(form: NewTeacherForm): Promise<Teacher> {
  const teacherId = `teacher-${Date.now()}`;
  const payload = {
    id: teacherId,
    name: form.name.trim(),
    academy_name: form.academyName.trim() || null,
    category: form.category || null,
    gender: form.gender || null,
    bio: form.bio.trim() || null,
    photo_url: form.photoUrl.trim() || null,
    instagram_url: form.instagramUrl.trim() || null,
    youtube_url: form.youtubeUrl.trim() || null,
  };

  const { data, error } = await supabase.from('teachers').insert(payload).select().single();

  if (error) {
    console.error('Error creating teacher:', error);
    throw error;
  }

  return computeTeacherStats({ ...data, reviews: [] });
}

export async function createReview(form: NewReviewForm): Promise<Review> {
  let targetTeacherId = form.teacherId;

  // If new teacher name was specified because teacher wasn't in list
  if (!targetTeacherId && form.teacherName?.trim()) {
    const newT = await createTeacher({
      name: form.teacherName.trim(),
      academyName: '',
      category: '',
      gender: '',
      bio: '',
      photoUrl: '',
      instagramUrl: '',
      youtubeUrl: '',
    });
    targetTeacherId = newT.id;
  }

  const reviewId = `rev-${Date.now()}`;
  const payload = {
    id: reviewId,
    teacher_id: targetTeacherId,
    author_name: form.authorName.trim() || 'Студент',
    is_anonymous: form.isAnonymous,
    author_status: form.authorStatus,
    is_verified: form.isVerified,
    review_date: new Date().toISOString().split('T')[0],
    overall_rating: form.overallRating,
    teacher_rating: form.teacherRating,
    practice_rating: form.practiceRating,
    job_support_rating: form.jobSupportRating,
    value_rating: form.valueRating,
    would_recommend: form.wouldRecommend,
    price_paid_kgs: form.pricePaidKgs ? Number(form.pricePaidKgs) : null,
    duration_months: form.durationMonths ? Number(form.durationMonths) : null,
    cohort_year: form.cohortYear?.trim() || null,
    title: form.title.trim(),
    full_review: form.fullReview.trim(),
    pros: form.pros.filter((p) => p.trim().length > 0),
    cons: form.cons.filter((c) => c.trim().length > 0),
    advice_for_newcomers: form.adviceForNewcomers?.trim() || null,
    has_job_scam_report: form.hasJobScamReport,
    helpful_count: 0,
    unhelpful_count: 0,
    is_hidden: false,
  };

  const { data, error } = await supabase.from('reviews').insert(payload).select().single();

  if (error) {
    console.error('Error inserting review:', error);
    throw error;
  }

  // Save optional WhatsApp contact info if provided
  if (form.whatsappNumber?.trim()) {
    try {
      await supabase.from('review_contact_info').insert({
        review_id: reviewId,
        whatsapp_number: form.whatsappNumber.trim(),
      });
    } catch (e) {
      console.warn('Could not insert review_contact_info', e);
    }
  }

  return data;
}

export async function voteReviewHelpfulness(
  reviewId: string,
  isHelpful: boolean,
  currentCount: number
): Promise<number> {
  const column = isHelpful ? 'helpful_count' : 'unhelpful_count';
  const newCount = (currentCount || 0) + 1;

  const { error } = await supabase
    .from('reviews')
    .update({ [column]: newCount })
    .eq('id', reviewId);

  if (error) {
    console.error(`Error updating ${column}:`, error);
    throw error;
  }

  return newCount;
}

export function getFallbackTeachers(): Teacher[] {
  return [
    {
      id: 'mock-1',
      name: 'Улукбек Турдубеков',
      bio: 'Python жана Django боюнча ментор, Fullstack иштеп чыгуучу',
      academy_name: 'Geeks (ITC)',
      category: 'it_programming',
      gender: 'male',
      photo_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      instagram_url: 'https://instagram.com',
      youtube_url: null,
      created_at: new Date().toISOString(),
      avgRating: 4.8,
      reviewCount: 14,
      recommendRate: 93,
      subRatings: { teacher: 4.9, practice: 4.7, jobSupport: 4.2, value: 4.6 },
      reviews: [
        {
          id: 'rev-1',
          teacher_id: 'mock-1',
          author_name: 'Айбек Нурланов',
          is_anonymous: false,
          author_status: 'graduate',
          is_verified: true,
          review_date: '2024-11-15',
          overall_rating: 5,
          teacher_rating: 5,
          practice_rating: 5,
          job_support_rating: 4,
          value_rating: 5,
          would_recommend: true,
          price_paid_kgs: 48000,
          duration_months: 6,
          cohort_year: '2024',
          title: 'Практикасы жана түшүндүрүүсү абдан жогору деңгээлде',
          full_review: 'Сабактар түшүнүктүү өтөт, кодду нөлдөн баштап жазып үйрөттү. Баардык суроолорго убагында жооп берип турду. Курсту бүткөндөн кийин стажировкага өттүм.',
          pros: ['Түшүнүктүү түшүндүрөт', 'Практикалык тапшырмалар көп', 'Күнү-түнү суроолорго жооп берет'],
          cons: ['Үй тапшырмалар оор'],
          advice_for_newcomers: 'Эринбей күн сайын код жазгыла, ошондо гана жыйынтык болот.',
          has_job_scam_report: false,
          helpful_count: 12,
          unhelpful_count: 0,
          created_at: '2024-11-15T12:00:00Z',
        }
      ]
    },
    {
      id: 'mock-2',
      name: 'Бекназар Жолдошев',
      bio: 'Frontend React / JavaScript адиси',
      academy_name: 'Makers Bootcamp',
      category: 'it_programming',
      gender: 'male',
      photo_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
      instagram_url: 'https://instagram.com',
      youtube_url: null,
      created_at: new Date().toISOString(),
      avgRating: 4.6,
      reviewCount: 9,
      recommendRate: 89,
      subRatings: { teacher: 4.8, practice: 4.6, jobSupport: 4.0, value: 4.4 },
      reviews: []
    },
    {
      id: 'mock-3',
      name: 'Динара Салиева',
      bio: 'SMM жана Таргет боюнча эксперт, 50дөн ашык долбоорлорду иштеткен',
      academy_name: 'TargetPro Academy',
      category: 'smm_marketing',
      gender: 'female',
      photo_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
      instagram_url: 'https://instagram.com',
      youtube_url: null,
      created_at: new Date().toISOString(),
      avgRating: 4.9,
      reviewCount: 18,
      recommendRate: 100,
      subRatings: { teacher: 5.0, practice: 4.9, jobSupport: 4.7, value: 4.8 },
      reviews: []
    }
  ];
}

export function getFallbackCourses(): Course[] {
  return [
    {
      id: 'fc-1',
      name: 'Python Fullstack иштеп чыгуу',
      academy_name: 'Geeks',
      category: 'it_programming',
      format: 'offline',
      duration_text: '7-9 ай',
      price_kgs: 68000,
      website_or_instagram: 'https://geeks.kg',
      description: 'Python, Django, PostgreSQL, Docker, Git, REST API. Нөлдөн баштап жумушка чейин даярдоо.',
      is_warning_course: false,
      warning_notice: null,
      created_at: new Date().toISOString()
    },
    {
      id: 'fc-2',
      name: 'Frontend React & Next.js Bootcamp',
      academy_name: 'Makers',
      category: 'it_programming',
      format: 'hybrid',
      duration_text: '5 ай',
      price_kgs: 75000,
      website_or_instagram: 'https://makers.kg',
      description: 'Интерактивдүү веб-сайттарды жана тиркемелерди жасоо.',
      is_warning_course: false,
      warning_notice: null,
      created_at: new Date().toISOString()
    },
    {
      id: 'fc-3',
      name: 'Криптовалюта жана Трейдинг «1000$ гарантия»',
      academy_name: 'Шектүү курстар',
      category: 'crypto_trading',
      format: 'online',
      duration_text: '2 жума',
      price_kgs: 35000,
      website_or_instagram: null,
      description: '«100% пайда, 2 жумада баюу» деп убада кылган курстар. Студенттерден акча кайтарылбай жаткандыгы боюнча арыздар бар.',
      is_warning_course: true,
      warning_notice: '⚠️ Көптөгөн арыздар түшкөн! Төлөм кылуу сунушталбайт!',
      created_at: new Date().toISOString()
    }
  ];
}

export function getFallbackVideos(): FeaturedVideo[] {
  return [
    {
      id: 'vid-1',
      title: 'Инфоцыгандар кантип алдашат? Курстардын көмүскө сырлары',
      channel_name: 'Али Токтакунов | МедиаХаб',
      channel_url: 'https://youtube.com',
      thumbnail_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
      video_url: 'https://youtube.com',
      added_at: new Date().toISOString()
    },
    {
      id: 'vid-2',
      title: 'IT курстарына 100 000 сом төлөп, жумушсуз калгандар',
      channel_name: 'Эмне үчүн? Иликтөө',
      channel_url: 'https://youtube.com',
      thumbnail_url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80',
      video_url: 'https://youtube.com',
      added_at: new Date().toISOString()
    }
  ];
}
