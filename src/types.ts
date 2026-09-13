export type Language = 'ky' | 'ru';

export interface Teacher {
  id: string;
  name: string;
  bio: string | null;
  academy_name: string | null;
  category: string | null;
  gender: string | null;
  photo_url: string | null;
  instagram_url: string | null;
  youtube_url: string | null;
  created_at: string;
  reviews?: Review[];
  // Calculated client-side fields
  avgRating?: number;
  reviewCount?: number;
  recommendRate?: number;
  subRatings?: {
    teacher: number;
    practice: number;
    jobSupport: number;
    value: number;
  };
}

export interface Review {
  id: string;
  teacher_id: string;
  author_name: string;
  is_anonymous: boolean;
  author_status: 'graduate' | 'current' | 'dropped_out' | 'prospective' | string;
  is_verified: boolean;
  review_date: string;
  overall_rating: number;
  teacher_rating?: number;
  practice_rating?: number;
  job_support_rating?: number;
  value_rating?: number;
  would_recommend: boolean;
  price_paid_kgs?: number | null;
  duration_months?: number | null;
  cohort_year?: string | null;
  title: string;
  full_review: string;
  pros?: string[];
  cons?: string[];
  advice_for_newcomers?: string | null;
  has_job_scam_report?: boolean;
  helpful_count: number;
  unhelpful_count: number;
  created_at: string;
  is_hidden?: boolean;
  country?: string | null;
  teachers?: {
    name: string;
    photo_url: string | null;
  };
}

export interface Course {
  id: string;
  name: string;
  academy_name: string;
  category: string;
  format: 'online' | 'offline' | 'hybrid' | string;
  duration_text: string;
  price_kgs: number | null;
  website_or_instagram: string | null;
  description: string;
  is_warning_course: boolean;
  warning_notice: string | null;
  created_at: string;
}

export interface FeaturedVideo {
  id: string;
  title: string;
  channel_name: string;
  channel_url: string;
  thumbnail_url: string;
  video_url: string;
  added_at: string;
}

export type ActiveTab = 'home' | 'teachers' | 'leaderboard' | 'videos' | 'report';
export type NavTab = ActiveTab;

export interface NewReviewForm {
  teacherId: string;
  teacherName?: string;
  authorName: string;
  isAnonymous: boolean;
  authorStatus: string;
  overallRating: number;
  teacherRating: number;
  practiceRating: number;
  jobSupportRating: number;
  valueRating: number;
  wouldRecommend: boolean;
  pricePaidKgs?: string;
  durationMonths?: string;
  cohortYear?: string;
  title: string;
  fullReview: string;
  pros: string[];
  cons: string[];
  adviceForNewcomers?: string;
  whatsappNumber?: string;
  hasJobScamReport: boolean;
  isVerified: boolean;
}

export interface NewTeacherForm {
  name: string;
  academyName: string;
  category: string;
  gender: string;
  bio: string;
  photoUrl: string;
  instagramUrl: string;
  youtubeUrl: string;
}
