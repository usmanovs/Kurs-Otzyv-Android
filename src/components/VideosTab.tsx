import React, { useState } from 'react';
import { FeaturedVideo, Language } from '../types';
import { translations } from '../lib/i18n';
import { Video, ExternalLink, Play, X, ShieldAlert } from 'lucide-react';

interface VideosTabProps {
  videos: FeaturedVideo[];
  lang: Language;
}

export const VideosTab: React.FC<VideosTabProps> = ({ videos, lang }) => {
  const t = translations[lang];
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  return (
    <div className="space-y-4 pb-24 px-4 pt-3">
      {/* Title */}
      <div>
        <h1 className="text-xl font-black text-white flex items-center gap-2">
          <Video className="w-5 h-5 text-indigo-400" />
          <span>{t.featuredVideosTitle}</span>
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">{t.featuredVideosSubtitle}</p>
      </div>

      {/* Warning banner */}
      <div className="bg-amber-500/10 border border-amber-500/25 rounded-2xl p-3 flex items-start gap-2.5 text-xs text-amber-200">
        <ShieldAlert className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          {lang === 'ky'
            ? 'Бул видеолор жалган убадалар жана шектүү курстар тууралуу көз карандысыз журналисттер менен блогерлердин иликтөөлөрү.'
            : 'Эти видеоматериалы — независимые расследования журналистов и блогеров о сомнительных курсах и инфоцыганстве.'}
        </p>
      </div>

      {/* Videos List */}
      <div className="space-y-4">
        {videos.map((video) => (
          <div
            key={video.id}
            id={`video-card-${video.id}`}
            className="bg-slate-800/80 border border-slate-700/60 rounded-2xl overflow-hidden shadow-lg"
          >
            {/* Thumbnail with play overlay */}
            <div className="relative aspect-video bg-slate-900 group cursor-pointer overflow-hidden">
              <img
                src={video.thumbnail_url}
                alt={video.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div
                onClick={() => setActiveVideoId(video.id)}
                className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/30 transition-colors"
              >
                <div className="w-14 h-14 rounded-full bg-red-600 hover:bg-red-500 text-white flex items-center justify-center shadow-xl shadow-red-600/50 active:scale-90 transition-transform">
                  <Play className="w-6 h-6 fill-white ml-0.5" />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-2">
              <h3 className="text-sm font-bold text-white leading-snug">
                {video.title}
              </h3>

              <div className="flex items-center justify-between pt-1">
                <a
                  href={video.channel_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 truncate max-w-[200px]"
                >
                  {video.channel_name}
                </a>

                <a
                  href={video.video_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs font-bold text-slate-300 hover:text-white bg-slate-700/60 hover:bg-slate-700 px-3 py-1.5 rounded-xl transition-colors active:scale-95"
                >
                  <span>{t.featuredVideosWatchBtn}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* In-app YouTube Player Modal */}
      {activeVideoId && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl relative">
            <div className="flex items-center justify-between p-3 border-b border-slate-800">
              <span className="text-xs font-bold text-white">YouTube Player</span>
              <button
                onClick={() => setActiveVideoId(null)}
                className="w-8 h-8 rounded-full bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="aspect-video w-full bg-black">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activeVideoId}?autoplay=1`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
