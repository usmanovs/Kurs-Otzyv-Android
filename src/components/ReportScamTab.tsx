import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../lib/i18n';
import {
  AlertTriangle,
  PhoneCall,
  FileCheck,
  Building,
  Scale,
  ExternalLink,
  ShieldCheck,
  CheckSquare,
  Square,
  Copy,
  Check,
} from 'lucide-react';

interface ReportScamTabProps {
  lang: Language;
}

export const ReportScamTab: React.FC<ReportScamTabProps> = ({ lang }) => {
  const t = translations[lang];
  const [copied, setCopied] = useState(false);

  // Interactive evidence checklist
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    contract: false,
    receipt: false,
    chat: false,
    passportOrName: false,
    offerScreenshot: false,
  });

  const toggleCheck = (key: string) => {
    setCheckedItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const sampleTemplateKy = `Бишкек шаарынын (же районуңуздун) РОВД башчысына
Арыз ээси: [Сиздин аты-жөнүңүз]
Жашаган дареги: [Дарегиңиз]
Тел: [Телефонуңуз]

АРЫЗ
(КР Кылмыш-жаза кодексинин 209-беренеси «Алдамчылык» боюнча)

202_ -жылдын «__» _________ күнү [Мугалимдин же курстун аты] жалган убадалар менен («1 айда жумушка орноштурам / акчаңызды толук кайтарып берем») менин ишенимиме кирип, [Төлөнгөн сумма] сом өлчөмүндө акча каражатымды алган. 
Убада кылынган билим жана шарттар аткарылган жок, акчаны кайтарып берүүдөн баш тартууда. 
Кылмыш ишин козгоп, акчамды өндүрүп берүүнү суранам.

Тиркеме: төлөм чеги, чаттардын скриншоттору, келишим көчүрмөсү.
Датасы: _________     Колу: _________`;

  const sampleTemplateRu = `Начальнику РОВД / УВД
От: [Ваше ФИО]
Адрес: [Ваш адрес]
Тел: [Номер телефона]

ЗАЯВЛЕНИЕ
(по признакам состава преступления, предусмотренного ст. 209 УК КР «Мошенничество»)

Прошу принять меры в отношении [ФИО преподавателя / организатора курса], который путем обмана и злоупотребления доверием завладел моими денежными средствами в размере [Сумма] сомов под предлогом гарантированного трудоустройства / оказания образовательных услуг.
Обязательства не выполнены, деньги возвращать отказываются.
Приложения: банковские квитанции, скриншоты переписок, копии договора.
Дата: _________     Подпись: _________`;

  const copyTemplate = () => {
    navigator.clipboard.writeText(lang === 'ky' ? sampleTemplateKy : sampleTemplateRu);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4 pb-24 px-4 pt-3">
      {/* Title */}
      <div>
        <div className="inline-flex items-center gap-1.5 bg-rose-500/15 border border-rose-500/30 text-rose-300 text-[11px] font-semibold px-2.5 py-1 rounded-full mb-2">
          <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
          <span>{lang === 'ky' ? 'Укуктук коргонуу' : 'Правовая защита'}</span>
        </div>
        <h1 className="text-xl font-black text-white">{t.reportScam.title}</h1>
        <p className="text-xs text-slate-300 mt-1 leading-relaxed">{t.reportScam.subtitle}</p>
      </div>

      {/* Quick Emergency Call Cards */}
      <div className="grid grid-cols-2 gap-3">
        <a
          href="tel:102"
          className="bg-red-950/40 hover:bg-red-950/60 border border-red-500/40 rounded-2xl p-3 flex flex-col items-center justify-center text-center shadow-md active:scale-95 transition-all"
        >
          <div className="w-10 h-10 rounded-full bg-red-600/30 text-red-400 flex items-center justify-center mb-1">
            <PhoneCall className="w-5 h-5" />
          </div>
          <div className="text-base font-black text-white tracking-wider">102</div>
          <div className="text-[10px] text-red-300 font-semibold mt-0.5">
            {lang === 'ky' ? 'Милиция' : 'Милиция'}
          </div>
        </a>

        <a
          href="tel:112"
          className="bg-amber-950/40 hover:bg-amber-950/60 border border-amber-500/40 rounded-2xl p-3 flex flex-col items-center justify-center text-center shadow-md active:scale-95 transition-all"
        >
          <div className="w-10 h-10 rounded-full bg-amber-600/30 text-amber-400 flex items-center justify-center mb-1">
            <PhoneCall className="w-5 h-5" />
          </div>
          <div className="text-base font-black text-white tracking-wider">112</div>
          <div className="text-[10px] text-amber-300 font-semibold mt-0.5">
            {lang === 'ky' ? 'Куткаруу кызматы' : 'Служба спасения'}
          </div>
        </a>
      </div>

      {/* Interactive Evidence Checklist */}
      <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-4 shadow-sm space-y-3">
        <div className="flex items-center gap-2">
          <FileCheck className="w-4 h-4 text-indigo-400" />
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">
            {lang === 'ky' ? 'Арыз берүү үчүн далилдер тизмеси:' : 'Чек-лист доказательств для заявления:'}
          </h3>
        </div>

        <div className="space-y-2 text-xs">
          {[
            { key: 'receipt', textKy: 'Төлөм чеги же банктык көчүрмө (MBank, Optima, Demir ж.б.)', textRu: 'Чеки или выписка банка (MBank, Optima, Demir и др.)' },
            { key: 'chat', textKy: 'WhatsApp / Telegram / Instagram кат алышууларынын толук скриншоту', textRu: 'Полные скриншоты переписок в WhatsApp / Telegram / Instagram' },
            { key: 'offerScreenshot', textKy: 'Жарнаманын жана убадалардын скриншоту («100% жумуш», «2000$ киреше»)', textRu: 'Скриншот рекламы и обещаний («100% работа», «$2000 в месяц»)' },
            { key: 'contract', textKy: 'Келишимдин көчүрмөсү же оферта тексти (эгер берилген болсо)', textRu: 'Копия договора или публичной оферты (если была)' },
            { key: 'passportOrName', textKy: 'Уюштуруучунун аты-жөнү, телефону же карта номери', textRu: 'ФИО организатора, номер телефона или номер карты' },
          ].map((item) => {
            const isDone = checkedItems[item.key];
            return (
              <div
                key={item.key}
                onClick={() => toggleCheck(item.key)}
                className={`flex items-start gap-2.5 p-2 rounded-xl border cursor-pointer select-none transition-all ${
                  isDone
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200'
                    : 'bg-slate-900/40 border-slate-700/40 text-slate-300'
                }`}
              >
                {isDone ? (
                  <CheckSquare className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                ) : (
                  <Square className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
                )}
                <span className="leading-snug">{lang === 'ky' ? item.textKy : item.textRu}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step by step guide */}
      <div className="space-y-3">
        <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-3.5 space-y-1">
          <h4 className="text-xs font-bold text-indigo-300">{t.reportScam.step1Title}</h4>
          <p className="text-xs text-slate-300 leading-relaxed">{t.reportScam.step1Text}</p>
        </div>

        <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-3.5 space-y-1">
          <h4 className="text-xs font-bold text-indigo-300">{t.reportScam.step2Title}</h4>
          <p className="text-xs text-slate-300 leading-relaxed">{t.reportScam.step2Text}</p>
        </div>

        <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-3.5 space-y-1">
          <h4 className="text-xs font-bold text-indigo-300">{t.reportScam.step4Title}</h4>
          <p className="text-xs text-slate-300 leading-relaxed">{t.reportScam.step4Text}</p>
          <a
            href="https://portal.mvd.gov.kg/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-bold text-indigo-400 hover:text-indigo-300 mt-1"
          >
            <span>{t.reportScam.linkMvd}</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-3.5 space-y-1">
          <h4 className="text-xs font-bold text-indigo-300">{t.reportScam.step5Title}</h4>
          <p className="text-xs text-slate-300 leading-relaxed">{t.reportScam.step5Text}</p>
          <a
            href="https://prokuror.kg/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-bold text-indigo-400 hover:text-indigo-300 mt-1"
          >
            <span>{t.reportScam.linkProkuror}</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Copy Sample Police Statement */}
      <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-4 space-y-2.5">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-white">
            {lang === 'ky' ? 'Милицияга арыздын үлгүсү' : 'Образец заявления в милицию'}
          </h3>
          <button
            id="copy-statement-btn"
            onClick={copyTemplate}
            className="flex items-center gap-1 text-xs font-bold bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-200 border border-indigo-500/40 px-2.5 py-1 rounded-lg transition-all active:scale-95"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? (lang === 'ky' ? 'Көчүрүлдү!' : 'Скопировано!') : (lang === 'ky' ? 'Көчүрүү' : 'Копировать')}</span>
          </button>
        </div>

        <pre className="text-[10px] text-slate-300 bg-slate-900/80 p-3 rounded-xl whitespace-pre-wrap font-mono leading-relaxed border border-slate-800 max-h-40 overflow-y-auto">
          {lang === 'ky' ? sampleTemplateKy : sampleTemplateRu}
        </pre>
      </div>

      {/* Disclaimer */}
      <div className="text-[11px] text-slate-400 bg-slate-900/60 border border-slate-800 rounded-xl p-3 leading-relaxed">
        {t.reportScam.disclaimer}
      </div>
    </div>
  );
};
