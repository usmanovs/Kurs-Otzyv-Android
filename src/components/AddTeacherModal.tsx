import React, { useState } from 'react';
import { NewTeacherForm, Language } from '../types';
import { translations } from '../lib/i18n';
import { createTeacher } from '../lib/supabase';
import { X, UserPlus, AlertTriangle } from 'lucide-react';

interface AddTeacherModalProps {
  lang: Language;
  onClose: () => void;
  onTeacherCreated: () => void;
}

export const AddTeacherModal: React.FC<AddTeacherModalProps> = ({
  lang,
  onClose,
  onTeacherCreated,
}) => {
  const t = translations[lang];

  const [name, setName] = useState('');
  const [academyName, setAcademyName] = useState('');
  const [category, setCategory] = useState('it_programming');
  const [gender, setGender] = useState('');
  const [bio, setBio] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [instagramUrl, setInstagramUrl] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!name.trim()) {
      setErrorMessage(t.addTeacherModal.errorName);
      return;
    }

    setIsSubmitting(true);

    try {
      const payload: NewTeacherForm = {
        name: name.trim(),
        academyName: academyName.trim(),
        category,
        gender: gender || '',
        bio: bio.trim(),
        photoUrl: photoUrl.trim(),
        instagramUrl: instagramUrl.trim(),
        youtubeUrl: youtubeUrl.trim(),
      };

      await createTeacher(payload);
      onTeacherCreated();
    } catch (err: any) {
      console.error('Failed to create teacher:', err);
      setErrorMessage(err.message || (lang === 'ky' ? 'Ката кетти, кайра аракет кылыңыз' : 'Ошибка при добавлении'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const categoryOptions = Object.entries(t.categories).filter(([key]) => key !== 'all');

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex justify-center items-end sm:items-center">
      <div className="bg-slate-900 border border-slate-700/80 rounded-t-3xl sm:rounded-3xl w-full max-w-lg max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-900/90 sticky top-0 z-10">
          <div>
            <h2 className="text-base font-bold text-white">{t.addTeacherModal.title}</h2>
            <p className="text-[11px] text-slate-400 mt-0.5">{t.addTeacherModal.subtitle}</p>
          </div>
          <button
            id="close-add-teacher-modal-btn"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Form */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-4 space-y-3.5 flex-1">
          {errorMessage && (
            <div className="bg-rose-500/20 border border-rose-500/40 text-rose-200 text-xs rounded-xl p-3 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Full Name */}
          <div>
            <label className="text-xs font-bold text-slate-200 block mb-1">
              {t.addTeacherModal.name} *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={lang === 'ky' ? 'Мисалы: Азамат Жумабеков' : 'Например: Азамат Жумабеков'}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Academy Name */}
          <div>
            <label className="text-xs font-bold text-slate-200 block mb-1">
              {t.addTeacherModal.academy}
            </label>
            <input
              type="text"
              value={academyName}
              onChange={(e) => setAcademyName(e.target.value)}
              placeholder={lang === 'ky' ? 'Мисалы: Geeks, Codify же Жеке ментор' : 'Например: Geeks, Codify или частный ментор'}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Category & Gender */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-200 block mb-1">
                {t.addTeacherModal.category}
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              >
                {categoryOptions.map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-200 block mb-1">
                {t.addTeacherModal.gender}
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="">{t.addTeacherModal.genderNone}</option>
                <option value="male">{t.addTeacherModal.genderMale}</option>
                <option value="female">{t.addTeacherModal.genderFemale}</option>
              </select>
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="text-xs font-bold text-slate-200 block mb-1">
              {t.addTeacherModal.bio}
            </label>
            <textarea
              rows={2}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder={lang === 'ky' ? 'Кыскача маалымат: кесиби, кайсы багытта сабак өтөт...' : 'Специализация, стаж, курсы...'}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Photo URL */}
          <div>
            <label className="text-xs font-bold text-slate-200 block mb-1">
              {t.addTeacherModal.photo}
            </label>
            <input
              type="url"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              placeholder={t.addTeacherModal.photoUrlPlaceholder}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Social links */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-200 block mb-1">
                {t.addTeacherModal.instagram}
              </label>
              <input
                type="url"
                value={instagramUrl}
                onChange={(e) => setInstagramUrl(e.target.value)}
                placeholder="https://instagram.com/..."
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-200 block mb-1">
                {t.addTeacherModal.youtube}
              </label>
              <input
                type="url"
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                placeholder="https://youtube.com/..."
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              id="submit-teacher-form-btn"
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 hover:from-indigo-500 hover:to-violet-500 active:scale-[0.98] text-white font-bold text-xs rounded-2xl shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              <UserPlus className="w-4 h-4" />
              <span>{isSubmitting ? (lang === 'ky' ? 'Сакталууда...' : 'Сохранение...') : t.addTeacherModal.submitBtn}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
