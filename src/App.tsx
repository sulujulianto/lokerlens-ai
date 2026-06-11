import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  Briefcase, 
  Code, 
  FolderGit2, 
  FileText, 
  Sparkles, 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle, 
  Copy, 
  Check, 
  Layers, 
  Target, 
  ArrowLeft, 
  Lightbulb, 
  AlertCircle,
  Info,
  Clock,
  User,
  ArrowUpRight,
  ExternalLink
} from 'lucide-react';
import { CareerProfile, AnalysisResponse } from './types';
import { demoTemplates } from './demoData';
import { mockAnalyses } from './mockResponse';

export default function App() {
  // Candidate Profile State Management
  const [education, setEducation] = useState<string>('');
  const [skills, setSkills] = useState<string>('');
  const [projects, setProjects] = useState<string>('');
  const [experience, setExperience] = useState<string>('');
  const [targetRole, setTargetRole] = useState<string>('');
  const [language, setLanguage] = useState<'Indonesian' | 'English'>('Indonesian');
  const [jobPosting, setJobPosting] = useState<string>('');
  const [geminiConfigured, setGeminiConfigured] = useState<boolean>(false);

  // Interface State Handlers
  const [viewState, setViewState] = useState<'edit' | 'loading' | 'result'>('edit');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResponse | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [activeTemplateIdx, setActiveTemplateIdx] = useState<number | null>(0); // Default with the first template
  const [loadingStep, setLoadingStep] = useState<string>('Memulai analisis profil...');
  const [copiedMessage, setCopiedMessage] = useState<boolean>(false);
  const [copiedCV, setCopiedCV] = useState<number | null>(null);

  // Auto-load first demo scenario on initial rendering to guide the user
  useEffect(() => {
    loadTemplate(0);
    // Fetch backend API health check to see if Gemini is configured
    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data.geminiConfigured === 'boolean') {
          setGeminiConfigured(data.geminiConfigured);
        }
      })
      .catch((err) => console.error("Gagal mengambil status kesehatan API:", err));
  }, []);

  // Progression of detailed sub-processes for scanning state
  useEffect(() => {
    if (viewState === 'loading') {
      const messages = [
        "Membaca data biografi & kualifikasi pendidikan...",
        "Mengurai rincian kebutuhan wajib (must-have) dalam job description...",
        "Menghubungi layanan Gemini AI untuk menganalisis kesiapan kerja...",
        "Menghitung skor kecocokan berdasarkan matriks keahlian aktual...",
        "Menyusun visualisasi rencana aksi 30 hari secara bertahap...",
        "Mengonfigurasi saran aktif CV dan draf pengantar lamaran..."
      ];
      let currentMsgIdx = 0;
      setLoadingStep(messages[0]);

      const interval = setInterval(() => {
        if (currentMsgIdx < messages.length - 1) {
          currentMsgIdx++;
          setLoadingStep(messages[currentMsgIdx]);
        }
      }, 750);

      return () => clearInterval(interval);
    }
  }, [viewState]);

  // Loading templates function
  const loadTemplate = (idx: number) => {
    const template = demoTemplates[idx];
    setEducation(template.profile.education);
    setSkills(template.profile.skills);
    setProjects(template.profile.projects);
    setExperience(template.profile.experience);
    setTargetRole(template.profile.targetRole);
    setLanguage(template.profile.language);
    setJobPosting(template.jobPosting);
    setActiveTemplateIdx(idx);
    setApiError(null);
  };

  const handleResetForm = () => {
    setEducation('');
    setSkills('');
    setProjects('');
    setExperience('');
    setTargetRole('');
    setLanguage('Indonesian');
    setJobPosting('');
    setActiveTemplateIdx(null);
    setApiError(null);
  };

  // Triggers offline simulated dashboard for quick evaluation
  const runSandboxDemo = () => {
    setApiError(null);
    setViewState('loading');
    
    setTimeout(() => {
      let result = mockAnalyses[activeTemplateIdx !== null ? activeTemplateIdx : 0];
      
      if (activeTemplateIdx === null) {
        result = {
          ...mockAnalyses[0],
          summary: language === 'Indonesian' 
            ? `Analisis Sandbox untuk target peran: ${targetRole || 'Junior Web Developer'}. Pasang kunci API Anda pada Settings > Secrets untuk melakukan penyesuaian evaluasi dinamis.` 
            : `Sandbox diagnostic review for target role: ${targetRole || 'Junior Web Developer'}. Define your GEMINI_API_KEY inside workspace secrets to customize analytical feedback.`,
        };
      }
      
      setAnalysisResult(result);
      setViewState('result');
    }, 2400);
  };

  // Live api requester via Node backend proxy
  const runLiveAnalysis = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetRole.trim() || !jobPosting.trim() || !skills.trim() || !education.trim()) {
      alert(language === 'Indonesian' 
        ? 'Harap lengkapi semua isian bertanda bintang (*) sebelum memulai analisis!' 
        : 'Please fill in all mandatory fields (*) before beginning the analysis!'
      );
      return;
    }

    setApiError(null);
    setViewState('loading');

    const profileData: CareerProfile = {
      education,
      skills,
      projects,
      experience,
      targetRole,
      language
    };

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          profile: profileData,
          jobPosting: jobPosting
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || errorData.details || `Sistem mengembalikan respons gagal (${response.status})`);
      }

      const parsedData = await response.json();
      
      // Sanitization fallback to prevent any runtime UI crashes
      const validatedData: AnalysisResponse = {
        matchScore: typeof parsedData.matchScore === 'number' ? parsedData.matchScore : 50,
        verdict: typeof parsedData.verdict === 'string' ? parsedData.verdict : 'Apply with improvements',
        summary: typeof parsedData.summary === 'string' ? parsedData.summary : 'Evaluasi karier selesai diproses.',
        strengths: Array.isArray(parsedData.strengths) ? parsedData.strengths : [],
        missingSkills: Array.isArray(parsedData.missingSkills) ? parsedData.missingSkills : [],
        mustHaveRequirements: Array.isArray(parsedData.mustHaveRequirements) ? parsedData.mustHaveRequirements : 
                              (parsedData.requirements && Array.isArray(parsedData.requirements.mustHave) ? parsedData.requirements.mustHave : []),
        niceToHaveRequirements: Array.isArray(parsedData.niceToHaveRequirements) ? parsedData.niceToHaveRequirements :
                                (parsedData.requirements && Array.isArray(parsedData.requirements.niceToHave) ? parsedData.requirements.niceToHave : []),
        risks: Array.isArray(parsedData.risks) ? parsedData.risks : (Array.isArray(parsedData.redFlags) ? parsedData.redFlags : []),
        roadmap30Days: parsedData.roadmap30Days && typeof parsedData.roadmap30Days === 'object' ? {
          week1: Array.isArray(parsedData.roadmap30Days.week1) ? parsedData.roadmap30Days.week1 : [],
          week2: Array.isArray(parsedData.roadmap30Days.week2) ? parsedData.roadmap30Days.week2 : [],
          week3: Array.isArray(parsedData.roadmap30Days.week3) ? parsedData.roadmap30Days.week3 : [],
          week4: Array.isArray(parsedData.roadmap30Days.week4) ? parsedData.roadmap30Days.week4 : []
        } : { week1: [], week2: [], week3: [], week4: [] },
        portfolioSuggestions: Array.isArray(parsedData.portfolioSuggestions) ? parsedData.portfolioSuggestions : 
                              (Array.isArray(parsedData.portfolioImprovements) ? parsedData.portfolioImprovements : []),
        cvBulletSuggestions: Array.isArray(parsedData.cvBulletSuggestions) ? parsedData.cvBulletSuggestions : [],
        applicationMessage: typeof parsedData.applicationMessage === 'string' ? parsedData.applicationMessage : '',
        disclaimer: typeof parsedData.disclaimer === 'string' ? parsedData.disclaimer : 'Ulasan diagnostik ini bersifat informasional berbasis kecerdasan buatan.'
      };

      setAnalysisResult(validatedData);
      setViewState('result');
    } catch (err: any) {
      console.error(err);
      setApiError(err.message || 'Konektivitas ke server API terputus atau kunci API tidak terdaftar.');
      setViewState('edit');
    }
  };

  const copyToClipboard = (text: string, isCV: boolean = false, index: number | null = null) => {
    navigator.clipboard.writeText(text);
    if (isCV && index !== null) {
      setCopiedCV(index);
      setTimeout(() => setCopiedCV(null), 1800);
    } else {
      setCopiedMessage(true);
      setTimeout(() => setCopiedMessage(false), 1800);
    }
  };

  const getVerdictStyles = (verdict: string) => {
    const v = verdict.toLowerCase();
    if (v.includes('now') || (v.includes('ready') && !v.includes('not'))) {
      return {
        bg: 'bg-emerald-50/70 border-emerald-200 text-emerald-950',
        badge: 'bg-emerald-600 text-white',
        bullet: 'text-emerald-600',
        border: 'border-emerald-200',
        indicator: 'bg-emerald-500',
        desc: 'Profil dinilai sangat optimal dan siap bersaing di pasar kerja.'
      };
    } else if (v.includes('improvement')) {
      return {
        bg: 'bg-amber-50/70 border-amber-200 text-amber-950',
        badge: 'bg-amber-600 text-white',
        bullet: 'text-amber-600',
        border: 'border-amber-200',
        indicator: 'bg-amber-500',
        desc: 'Cukup berpeluang, direkomendasikan melengkapi portofolio pendukung.'
      };
    } else {
      return {
        bg: 'bg-rose-50/70 border-rose-200 text-rose-950',
        badge: 'bg-rose-600 text-white',
        bullet: 'text-rose-500',
        border: 'border-rose-200',
        indicator: 'bg-rose-500',
        desc: 'Kesenjangan kualifikasi cukup tinggi, pelajari rute 30 hari terlebih dahulu.'
      };
    }
  };

  // Helper check for field completion
  const getFieldProgress = () => {
    let complete = 0;
    if (targetRole.trim()) complete++;
    if (education.trim()) complete++;
    if (skills.trim()) complete++;
    if (projects.trim()) complete++;
    if (jobPosting.trim()) complete++;
    return complete;
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800 antialiased" id="lokerlens-app">
      
      {/* PROFESSIONAL NAV BAR */}
      <nav id="navbar" className="h-14 bg-slate-900 text-white flex items-center justify-between px-4 sm:px-6 shrink-0 shadow-sm border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-indigo-600 rounded-md flex items-center justify-center font-extrabold text-white text-base shadow-sm select-none border border-indigo-500">
            LL
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm sm:text-base font-bold leading-none tracking-tight">LokerLens AI</h1>
              <span className="text-[9px] bg-indigo-950 border border-indigo-700/60 px-1.5 py-0.2 rounded font-mono text-indigo-300 font-semibold uppercase">v1.2</span>
            </div>
            <p className="text-[9px] text-slate-400 font-semibold uppercase tracking-wider mt-0.5">Asisten Diagnostik Kesiapan Kerja SMK & Bootcamp</p>
          </div>
        </div>
        
        {/* Scenario preset pills on the header bar */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden lg:flex items-center gap-1.5">
            <span className="text-[11px] text-slate-400 font-medium">Skenario Evaluator:</span>
            <div className="flex gap-1.5 bg-slate-800/80 p-0.5 rounded-md border border-slate-700/60">
              {demoTemplates.map((tpl, i) => (
                <button
                  key={i}
                  id={`demo-btn-${i}`}
                  onClick={() => loadTemplate(i)}
                  className={`px-2.5 py-1 rounded text-[10.5px] font-medium transition-all ${
                    activeTemplateIdx === i 
                      ? 'bg-indigo-600 text-white shadow-sm font-semibold' 
                      : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                  }`}
                  title={tpl.name}
                >
                  Skenario {i + 1}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2.5 bg-slate-800/60 py-1.5 px-3.5 rounded-full border border-slate-700/50 select-none">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300">
              {geminiConfigured ? "Gemini API key terpasang" : "Mode demo aktif"}
            </span>
            <span className={`w-1.5 h-1.5 rounded-full ${geminiConfigured ? "bg-emerald-400 animate-pulse" : "bg-amber-400 animate-pulse"}`}></span>
          </div>
        </div>
      </nav>

      {/* METRIC SUBHEADER WITH BRIEFING BAR */}
      <section className="bg-white border-b border-slate-200 py-3 px-4 sm:px-6 shadow-sm shrink-0">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <div className="flex items-center gap-1.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-indigo-600"></span>
              <p className="text-[11px] text-indigo-700 font-bold uppercase tracking-wider">Evaluasi Profil dan Lowongan</p>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">Analisis Kesiapan Melamar Kerja</h2>
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            {/* Template select dropdown for small screens */}
            <div className="lg:hidden flex items-center gap-1 bg-slate-100 p-1 rounded border border-slate-200">
              <span className="text-[10px] text-slate-500 font-bold px-1 uppercase">Preset:</span>
              <select 
                className="text-[11px] bg-white border-0 rounded p-1 text-slate-800 font-semibold focus:ring-1 focus:ring-indigo-300"
                value={activeTemplateIdx !== null ? activeTemplateIdx : ''}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val !== '') loadTemplate(Number(val));
                }}
              >
                <option value="">-- Kustom Sendiri --</option>
                {demoTemplates.map((tpl, i) => (
                  <option key={i} value={i}>Model {i + 1}: {tpl.name.substring(0, 15)}...</option>
                ))}
              </select>
            </div>

            {viewState === 'result' && (
              <button
                id="back-to-input-btn"
                onClick={() => setViewState('edit')}
                className="bg-indigo-600 text-white hover:bg-indigo-700 border border-indigo-600 px-3 py-1.5 rounded text-[11px] font-bold flex items-center gap-1.5 transition-all shadow-sm"
              >
                <ArrowLeft size={13} />
                Kembali ke Form
              </button>
            )}

            <button
              onClick={handleResetForm}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 border border-slate-300/80 px-2.5 py-1.5 rounded text-[11px] font-bold flex items-center gap-1 transition-all"
              title="Mengosongkan semua isian data profil"
            >
              <RotateCcw size={12} />
              Reset & Tulis Sendiri
            </button>
          </div>
        </div>
      </section>

      {/* CORE FRAME LAYOUT */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-3 sm:p-4 flex flex-col overflow-hidden">
        
        {/* Error alerting bar */}
        {apiError && (
          <div className="mb-3 p-3.5 bg-rose-50 border border-rose-200 text-rose-950 rounded-lg flex items-start gap-3 shadow-xs animate-fadeIn" id="error-bar">
            <AlertCircle className="text-rose-600 shrink-0 mt-0.5 animate-pulse" size={16} />
            <div className="text-[11.5px] leading-relaxed">
              <p className="font-bold text-rose-900">Validasi API Terkendala</p>
              <p className="text-slate-600 mt-0.5">{apiError}</p>
              <div className="mt-2 text-[11px] flex flex-wrap items-center gap-2">
                <span className="text-rose-800 font-semibold">Tindakan Cepat:</span>
                <button 
                  type="button"
                  onClick={runSandboxDemo}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-2.5 py-1 rounded font-bold shadow-xs transition-colors cursor-pointer"
                >
                  Gunakan Fitur Coba Demo Cepat &rarr;
                </button>
              </div>
            </div>
            <button onClick={() => setApiError(null)} className="ml-auto text-slate-400 hover:text-slate-600 font-bold text-sm">&times;</button>
          </div>
        )}

        {/* 1. EDIT MODE CONTAINER */}
        {viewState === 'edit' && (
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-3.5" id="view-edit">
            
            {/* INPUT FORM SIDE (7 Columns) */}
            <div className="lg:col-span-7 flex flex-col bg-white rounded-lg border border-slate-250 shadow-xs overflow-hidden">
              <div className="bg-slate-50 border-b border-slate-200 px-3.5 py-2.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1 bg-slate-200 rounded text-slate-700">
                    <User size={14} />
                  </div>
                  <div>
                    <h3 className="font-bold text-xs text-slate-800 uppercase tracking-wider">Langkah 1: Lengkapi Portofolio Karier</h3>
                    <p className="text-[10px] text-slate-500 leading-none mt-0.5">Berdasarkan profil asli lulusan vokasi / rekayasa baru</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[10.5px]">
                  <span className="text-slate-400 font-medium font-mono uppercase">Output:</span>
                  <div className="inline-flex rounded-md border border-slate-200 py-0.5 px-1 bg-slate-100">
                    <button
                      type="button"
                      onClick={() => setLanguage('Indonesian')}
                      className={`px-1.5 py-0.5 rounded text-[10px] font-bold transition-all ${
                        language === 'Indonesian' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-800'
                      }`}
                    >
                      Indonesia
                    </button>
                    <button
                      type="button"
                      onClick={() => setLanguage('English')}
                      className={`px-1.5 py-0.5 rounded text-[10px] font-bold transition-all ${
                        language === 'English' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-800'
                      }`}
                    >
                      English
                    </button>
                  </div>
                </div>
              </div>

              {/* Progress counter for form completion */}
              <div className="h-1 bg-slate-100 w-full relative">
                <div 
                  className="absolute left-0 top-0 h-full bg-indigo-600 transition-all duration-300"
                  style={{ width: `${(getFieldProgress() / 5) * 100}%` }}
                ></div>
              </div>

              <div id="career-form" className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3.5 flex-1 overflow-y-auto">
                
                {/* Target Role Field */}
                <div className="sm:col-span-2 space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider flex items-center gap-1">
                      <Target size={11} className="text-slate-400" />
                      Peran yang Ditargetkan <span className="text-indigo-600">*</span>
                    </label>
                    <span className="text-[9px] font-semibold text-slate-400 italic">E.g., Junior Frontend Developer</span>
                  </div>
                  <input
                    id="input-target-role"
                    type="text"
                    required
                    value={targetRole}
                    onChange={(e) => {
                      setTargetRole(e.target.value);
                      if (activeTemplateIdx !== null) setActiveTemplateIdx(null);
                    }}
                    placeholder="Contoh: Junior React Developer, Junior Backend Developer"
                    className="w-full text-[11.5px] px-2.5 py-2 border border-slate-300 rounded focus:border-indigo-500 focus:ring-1 focus:ring-indigo-120/40 outline-none transition-all placeholder:text-slate-400 text-slate-900 font-semibold"
                  />
                </div>

                {/* Education Background Field */}
                <div className="sm:col-span-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider flex items-center gap-1">
                      <GraduationCap size={11} className="text-slate-400" />
                      Latar Belakang Vokasi/Pendidikan <span className="text-indigo-600">*</span>
                    </label>
                  </div>
                  <input
                    id="input-education"
                    type="text"
                    required
                    value={education}
                    onChange={(e) => {
                      setEducation(e.target.value);
                      if (activeTemplateIdx !== null) setActiveTemplateIdx(null);
                    }}
                    placeholder="E.g., SMK RPL, Career Switcher, atau Lulusan Bootcamp"
                    className="w-full text-[11.5px] px-2.5 py-2 border border-slate-300 rounded focus:border-indigo-500 focus:ring-1 focus:ring-indigo-120/40 outline-none transition-all text-slate-900"
                  />
                </div>

                {/* Core Technical list field */}
                <div className="sm:col-span-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider flex items-center gap-1">
                      <Code size={11} className="text-slate-400" />
                      Keahlian Utama (Pisahkan Koma) <span className="text-indigo-600">*</span>
                    </label>
                  </div>
                  <input
                    id="input-skills"
                    type="text"
                    required
                    value={skills}
                    onChange={(e) => {
                      setSkills(e.target.value);
                      if (activeTemplateIdx !== null) setActiveTemplateIdx(null);
                    }}
                    placeholder="React, CSS, Node, MySQL, Git, Docker"
                    className="w-full text-[11.5px] px-2.5 py-2 border border-slate-300 rounded focus:border-indigo-500 focus:ring-1 focus:ring-indigo-120/40 outline-none transition-all text-slate-900"
                  />
                </div>

                {/* Projects / Portfolio text box */}
                <div className="sm:col-span-2 space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider flex items-center gap-1">
                      <FolderGit2 size={11} className="text-slate-400" />
                      Detail Proyek & Studi Kasus Unggulan <span className="text-indigo-600">*</span>
                    </label>
                    <span className="text-[9px] text-slate-400">STAR method sangat direkomendasikan</span>
                  </div>
                  <textarea
                    id="input-projects"
                    required
                    rows={4}
                    value={projects}
                    onChange={(e) => {
                      setProjects(e.target.value);
                      if (activeTemplateIdx !== null) setActiveTemplateIdx(null);
                    }}
                    placeholder="- Proyek ChatApp: React web app dengan sinkronisasi Firebase, realtime messaging, dan Redux state.&#10;- Portofolio Port: Kumpulan visual responsive murni memakai Tailwind."
                    className="w-full text-[11px] p-2.5 border border-slate-300 rounded focus:border-indigo-500 focus:ring-1 focus:ring-indigo-120/40 outline-none transition-all text-slate-900 font-mono leading-relaxed"
                  />
                  <div className="p-2 bg-indigo-50 rounded text-[10px] text-indigo-800 border border-indigo-100 flex gap-1.5">
                    <Lightbulb size={12} className="text-indigo-600 shrink-0 mt-0.5" />
                    <span><strong>Tips Portofolio:</strong> Tuliskan nama proyek secara jelas, tumpukan teknologi (tech stack), dan fungsi pemecahan masalah utama.</span>
                  </div>
                </div>

                {/* Practical Experience Text Field */}
                <div className="sm:col-span-2 space-y-1">
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-wider">
                    Pengalaman Kerja Praktik / Kegiatan Magang / Karier Lainnya
                  </label>
                  <textarea
                    id="input-experience"
                    rows={2}
                    value={experience}
                    onChange={(e) => {
                      setExperience(e.target.value);
                      if (activeTemplateIdx !== null) setActiveTemplateIdx(null);
                    }}
                    placeholder="Contoh: Magang Industri selama 3 bulan di Software House Lokal sebagai asisten pengembang web."
                    className="w-full text-[11px] p-2 border border-slate-300 rounded focus:border-indigo-500 focus:ring-1 focus:ring-indigo-120/40 outline-none text-slate-900"
                  />
                </div>

              </div>

              <div className="bg-slate-50/70 py-2 px-4 border-t border-slate-100 flex items-center justify-between text-[10.5px] text-slate-500">
                <div className="flex items-center gap-1">
                  <Info size={12} />
                  <span>Dioptimasi untuk ATS seleksi berkas Indonesia</span>
                </div>
                <span>* Wajib diisi</span>
              </div>
            </div>

            {/* JOB DESCRIPTION INPUT SIDE (5 Columns) */}
            <div className="lg:col-span-5 flex flex-col bg-white rounded-lg border border-slate-250 shadow-xs overflow-hidden">
              <div className="bg-slate-50 border-b border-slate-200 px-3.5 py-2.5 flex items-center">
                <div className="p-1 bg-slate-200 rounded text-slate-700 mr-2">
                  <FileText size={14} />
                </div>
                <div>
                  <h3 className="font-bold text-xs text-slate-800 uppercase tracking-wider">Langkah 2: Teks Loker Asli</h3>
                  <p className="text-[10px] text-slate-500 leading-none mt-0.5">Tempel persyaratan lowongan yang ditarget</p>
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col gap-3">
                <div className="flex-1 flex flex-col space-y-1">
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-wider">
                    Persyaratan Loker (Salin Tempel) <span className="text-indigo-600">*</span>
                  </label>
                  <textarea
                    id="input-job-posting"
                    required
                    value={jobPosting}
                    onChange={(e) => {
                      setJobPosting(e.target.value);
                      if (activeTemplateIdx !== null) setActiveTemplateIdx(null);
                    }}
                    placeholder="Mencari Junior Web Developer:&#10;- Menguasai dasar ReactJS fungsional&#10;- Paham integrasi REST API&#10;- Mengerti alur kerja Git"
                    className="w-full flex-1 min-h-[220px] text-[11px] p-3 border border-slate-300 rounded focus:border-indigo-500 focus:ring-1 focus:ring-indigo-120/40 outline-none transition-all text-slate-900 font-mono leading-relaxed"
                  />
                </div>

                {/* Submits and Sandbox Control */}
                <div className="flex flex-col gap-2 pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={runLiveAnalysis}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold py-2.5 px-4 rounded-md transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                    title="Jalankan analisis kecocokan real-time dengan model Gemini AI"
                  >
                    <Sparkles size={13} className="animate-pulse" />
                    Analisis dengan Gemini
                  </button>

                  <div className="flex items-center gap-2 select-none py-1">
                    <span className="h-px bg-slate-200 flex-1"></span>
                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Atau</span>
                    <span className="h-px bg-slate-200 flex-1"></span>
                  </div>

                  <button
                    type="button"
                    onClick={runSandboxDemo}
                    className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 text-xs font-bold py-2.5 px-4 rounded-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    title="Lihat contoh visualisasi dan data simulasi"
                  >
                    <Layers size={13} className="text-slate-500" />
                    Coba Demo Cepat <span className="text-[10px] font-normal text-slate-500">(Data Simulasi / Preview)</span>
                  </button>
                </div>

                <div className="p-2.5 bg-indigo-50/60 rounded border border-indigo-100 flex gap-2">
                  <Sparkles size={13} className="text-indigo-600 shrink-0 mt-0.5 animate-pulse" />
                  <p className="text-[10px] text-indigo-950 leading-relaxed">
                    <strong>Pilihan Analisis:</strong> Jalankan analisis utama menggunakan <strong>Analisis dengan Gemini</strong> jika kunci API Anda telah terdaftar. Anda juga dapat memilih <strong>Coba Demo Cepat</strong> untuk mempelajari contoh laporan evaluasi kesiapan kerja siap pakai.
                  </p>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* 2. PROGRESS TUNING SCREEN (LOADING) */}
        {viewState === 'loading' && (
          <div className="flex-1 flex flex-col items-center justify-center min-h-[380px] bg-white rounded-lg border border-slate-200 p-8 text-center animate-fadeIn" id="view-loading">
            <div className="relative mb-5">
              {/* Spinning visual wrapper */}
              <div className="w-14 h-14 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <Sparkles size={20} className="text-indigo-600 animate-pulse" />
              </div>
            </div>

            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Analisis Kesiapan LokerLens AI</h3>
            <p className="text-[11.5px] text-indigo-700 mt-1.5 font-mono bg-indigo-50 px-3 py-1 rounded border border-indigo-100 font-semibold">{loadingStep}</p>
            
            <p className="text-[11px] text-slate-400 mt-5 max-w-sm leading-relaxed">
              Kecerdasan Buatan mendiagnosis keselarasan keahlian, standar industri, serta menyusun rekomendasi peningkatan portofolio karier Anda.
            </p>
          </div>
        )}

        {/* 3. REPORT RESULT VIEW STATE */}
        {viewState === 'result' && analysisResult && (
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-3.5 overflow-visible lg:overflow-hidden h-full" id="view-result">
            
            {/* COLUMN 1: RECORDED PROFILE & SOURCE INFO (lg:col-span-3) */}
            <div className="lg:col-span-3 flex flex-col gap-3 h-full">
              
              {/* Captured info overview */}
              <section className="bg-white rounded-lg border border-slate-200 p-3.5 flex flex-col shrink-0 shadow-2xs">
                <div className="flex items-center gap-2 mb-2.5 border-b border-slate-100 pb-2">
                  <span className="text-[10px] font-black text-indigo-700 uppercase tracking-wider flex items-center gap-1">
                    <User size={12} />
                    Profil Kandidat
                  </span>
                  <span className="ml-auto bg-slate-100 text-slate-700 font-bold px-2 py-0.5 rounded text-[9px] border border-slate-200 uppercase">
                    {language === 'Indonesian' ? 'Indonesia' : 'English'}
                  </span>
                </div>

                <div className="space-y-2.5 text-[11.5px] text-slate-600">
                  <div>
                    <span className="text-[9px] font-black text-slate-450 uppercase block tracking-wider leading-none">Pendidikan</span>
                    <p className="font-bold text-slate-800 leading-tight mt-0.5">{education}</p>
                  </div>
                  <div>
                    <span className="text-[9px] font-black text-slate-450 uppercase block tracking-wider leading-none">Peran yang Ditargetkan</span>
                    <p className="font-black text-indigo-900 leading-tight mt-0.5">{targetRole}</p>
                  </div>
                  <div>
                    <span className="text-[9px] font-black text-slate-450 uppercase block tracking-wider leading-none">Keahlian Saat Ini</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {skills.split(',').map((item, idx) => {
                        const sTrim = item.trim();
                        if (!sTrim) return null;
                        return (
                          <span key={idx} className="bg-slate-50 px-1.5 py-0.2 rounded border border-slate-200 text-slate-800 text-[10px] font-semibold leading-tight">
                            {sTrim}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                  {experience && (
                    <div>
                      <span className="text-[9px] font-black text-slate-450 uppercase block tracking-wider leading-none">Riwayat Kerja/Praktik</span>
                      <p className="text-slate-700 text-[11px] leading-tight line-clamp-2 mt-0.5" title={experience}>{experience}</p>
                    </div>
                  )}
                </div>
              </section>

              {/* Source job advertisement summary */}
              <section className="bg-white rounded-lg border border-slate-200 p-3.5 flex-1 flex flex-col min-h-[180px] lg:min-h-0 overflow-hidden shadow-2xs">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-black text-slate-700 uppercase tracking-wider flex items-center gap-1">
                    <FileText size={12} />
                    Rincian Lowongan Sumber
                  </span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded border border-slate-150 flex-1 flex flex-col overflow-hidden">
                  <div className="flex-1 overflow-y-auto text-[11px] text-slate-650 font-mono leading-relaxed whitespace-pre-wrap max-h-[120px] lg:max-h-none pr-1">
                    {jobPosting}
                  </div>
                  <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-center justify-between text-[9px] text-indigo-700 italic">
                    <div className="flex items-center gap-1 font-sans">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                      <span>Teks Loker Aktif</span>
                    </div>
                  </div>
                </div>
              </section>

            </div>

            {/* COLUMN 2: ANALYSIS VERDICT & ACCORDION (lg:col-span-5) */}
            <div className="lg:col-span-12 xl:col-span-5 flex flex-col gap-3.5 h-full">
              
              {/* Header metrics card - Score & Verdict banner */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 shrink-0">
                
                {/* Circular indicator container */}
                <div className="bg-white rounded-lg border border-slate-180 p-4 flex flex-col items-center justify-center relative shadow-2xs">
                  <span className="text-slate-400 text-[10px] font-black uppercase tracking-wider mb-2">Kecocokan Berkas</span>
                  <div className="relative flex items-center justify-center">
                    <svg className="w-20 h-20 transform -rotate-90 text-slate-100">
                      <circle cx="40" cy="40" r="34" stroke="currentColor" strokeWidth="6.5" fill="transparent" />
                      <circle 
                        cx="40" 
                        cy="40" 
                        r="34" 
                        stroke={analysisResult.matchScore >= 80 ? "#16a34a" : analysisResult.matchScore >= 60 ? "#d97706" : "#dc2626"} 
                        strokeWidth="6.5" 
                        fill="transparent" 
                        strokeDasharray="213.5" 
                        strokeDashoffset={213.5 - (213.5 * analysisResult.matchScore) / 100} 
                        className="progress-ring-circle"
                        strokeLinecap="round" 
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center justify-center">
                      <span className="text-2xl font-black text-slate-800 leading-none">{analysisResult.matchScore}</span>
                      <span className="text-[8px] text-slate-450 uppercase font-black leading-none mt-0.5">Persen</span>
                    </div>
                  </div>
                  
                  <div className="mt-2 text-[9px] font-bold text-slate-400 uppercase tracking-widest text-center">
                    {analysisResult.matchScore >= 80 ? 'Sangat Kompatibel' : analysisResult.matchScore >= 60 ? 'Potensi Sedang' : 'Mismatch Tinggi'}
                  </div>
                </div>

                {/* Verdict block container with helper design styles */}
                <div className={`rounded-lg border p-4 flex flex-col items-center justify-center text-center shadow-2xs ${getVerdictStyles(analysisResult.verdict).bg} ${getVerdictStyles(analysisResult.verdict).border}`}>
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1.5">Keputusan Peninjau</span>
                  <div className="font-extrabold text-[12.5px] px-2.5 py-1 rounded bg-black/5 text-slate-900 tracking-tight leading-tight uppercase">
                    {analysisResult.verdict}
                  </div>
                  <p className="text-[10.5px] mt-2 opacity-90 leading-relaxed font-semibold text-slate-800">
                    {analysisResult.summary}
                  </p>
                </div>

              </div>

              {/* Strengths & Missing skills detailed diagnostics panel */}
              <div className="bg-white rounded-lg border border-slate-200 flex-1 flex flex-col overflow-hidden min-h-[280px] lg:min-h-0 shadow-2xs">
                
                {/* Visualizer split row */}
                <div className="flex flex-col sm:flex-row flex-1 border-b border-slate-100 overflow-hidden">
                  
                  {/* Strengths listing */}
                  <div className="flex-1 p-3.5 border-r border-slate-100 overflow-y-auto max-h-[160px] lg:max-h-none">
                    <div className="text-emerald-700 font-bold text-[10px] uppercase mb-2.5 flex items-center gap-1.5 tracking-wider border-b border-slate-100 pb-1">
                      <CheckCircle2 size={13} className="text-emerald-600" />
                      Kekuatan Kandidat Relevan
                    </div>
                    {analysisResult.strengths && analysisResult.strengths.length > 0 ? (
                      <ul className="text-[11px] space-y-2 text-slate-700">
                        {analysisResult.strengths.map((str, sIdx) => (
                          <li key={sIdx} className="flex gap-1.5 items-start">
                            <span className="text-emerald-500 font-black shrink-0 mt-0.5">&bull;</span>
                            <span className="leading-snug">{str}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-[10px] text-slate-400 italic">Tidak terdeteksi kualifikasi unggulan khusus.</p>
                    )}
                  </div>

                  {/* Kesenjangan skill (Gap checks) */}
                  <div className="flex-1 p-3.5 bg-slate-50/40 overflow-y-auto max-h-[160px] lg:max-h-none">
                    <div className="text-amber-800 font-bold text-[10px] uppercase mb-2.5 flex items-center gap-1.5 tracking-wider border-b border-slate-200/60 pb-1 frame-amber">
                      <AlertTriangle size={13} className="text-amber-600" />
                      Kesenjangan Skill Utama (Mismatch)
                    </div>
                    {analysisResult.missingSkills && analysisResult.missingSkills.length > 0 ? (
                      <ul className="text-[11px] space-y-2 text-slate-700">
                        {analysisResult.missingSkills.map((gap, gIdx) => (
                          <li key={gIdx} className="flex gap-1.5 items-start">
                            <span className="text-amber-600 font-black shrink-0 mt-0.5">&bull;</span>
                            <span className="leading-snug">{gap}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-[10px] text-slate-400 italic">Profil memenuhi semua aspek kualifikasi utama loker!</p>
                    )}
                  </div>

                </div>

                {/* Grid checklist highlights for easy scan */}
                <div className="p-3 bg-slate-50/80 border-b border-slate-200 text-[11px]">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="font-extrabold text-indigo-950 block text-[9px] uppercase tracking-wider mb-1">Mesti Dimiliki (Must-Have)</span>
                      <div className="flex flex-wrap gap-1">
                        {analysisResult.mustHaveRequirements && analysisResult.mustHaveRequirements.map((item, iIdx) => (
                          <span key={iIdx} className="bg-indigo-50 border border-indigo-100 rounded px-1.5 py-0.5 text-[9.5px] text-indigo-800 font-semibold leading-tight">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="font-extrabold text-slate-500 block text-[9px] uppercase tracking-wider mb-1">Nilai Tambah (Nice-to-Have)</span>
                      <div className="flex flex-wrap gap-1">
                        {analysisResult.niceToHaveRequirements && analysisResult.niceToHaveRequirements.map((item, iIdx) => (
                          <span key={iIdx} className="bg-slate-100 border border-slate-200 rounded px-1.5 py-0.5 text-[9.5px] text-slate-700 leading-tight font-medium">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Interactive modern connection message preview */}
                <div className="p-3.5 bg-slate-50/50 flex flex-col shrink-0 border-t border-slate-200">
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-[9.5px] font-black text-slate-500 uppercase tracking-widest">Draf Pesan Lamaran Cepat (WhatsApp/LinkedIn)</label>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(analysisResult.applicationMessage)}
                      className="text-indigo-700 hover:text-white hover:bg-indigo-600 text-[10.5px] font-bold flex items-center gap-1.5 bg-white px-2 py-1 rounded border border-slate-200 shadow-3xs transition-all cursor-pointer"
                    >
                      {copiedMessage ? (
                        <>
                          <Check size={11} className="text-emerald-500" />
                          <span className="text-emerald-600 text-[10px]">Pesan Tersalin!</span>
                        </>
                      ) : (
                        <>
                          <Copy size={11} />
                          <span>Salin Solusi</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="bg-white border border-slate-200 rounded p-2.5 text-[11.5px] text-slate-650 leading-relaxed font-serif italic max-h-[85px] overflow-y-auto select-all pr-1">
                    "{analysisResult.applicationMessage}"
                  </div>
                </div>

              </div>
            </div>

            {/* COLUMN 3: ACTION ROADMAP, PORTFOLIO TIPS, & ATS BULLETS (lg:col-span-4) */}
            <div className="lg:col-span-12 xl:col-span-4 flex flex-col gap-3.5 h-full overflow-y-auto pr-0.5">
              
              {/* study program Roadmap for SMK / grads */}
              <section className="bg-indigo-950 text-white rounded-lg p-4 flex flex-col shadow-xs">
                <div className="flex items-center justify-between mb-3 border-b border-indigo-900 pb-2">
                  <span className="text-indigo-200 text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5">
                    <Clock size={12} />
                    Rencana Aksi 30 Hari
                  </span>
                  <span className="text-[9px] text-indigo-300 bg-indigo-900/60 px-1.5 py-0.5 rounded border border-indigo-800 font-mono">Fase Terarah</span>
                </div>

                <div className="space-y-4">
                  {([
                    { weekNum: 1, title: language === 'Indonesian' ? 'Minggu 1: Fondasi & Gap Utama' : 'Week 1: Core Foundation & Fill Gaps', actions: analysisResult.roadmap30Days?.week1 },
                    { weekNum: 2, title: language === 'Indonesian' ? 'Minggu 2: Praktik & Proyek Saku' : 'Week 2: Deep Dive Practice & Mini Projects', actions: analysisResult.roadmap30Days?.week2 },
                    { weekNum: 3, title: language === 'Indonesian' ? 'Minggu 3: Integrasi & Uji Skenario' : 'Week 3: Integration & Scenario Testing', actions: analysisResult.roadmap30Days?.week3 },
                    { weekNum: 4, title: language === 'Indonesian' ? 'Minggu 4: Poles Berkas & CV Lamaran' : 'Week 4: Polish Portfolio & Submit Application', actions: analysisResult.roadmap30Days?.week4 }
                  ]).map((item, sIdx) => {
                    if (!item.actions || item.actions.length === 0) return null;
                    return (
                      <div key={sIdx} className="flex gap-2.5 items-start">
                        <div className="w-4.5 h-4.5 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0 text-[10px] font-extrabold shadow-sm mt-0.5 font-mono">
                          {item.weekNum}
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-[12px] font-black text-white tracking-tight leading-snug">{item.title}</h4>
                          <ul className="text-[11px] text-indigo-250 space-y-1 pl-3.5 list-disc">
                            {item.actions.map((act, aIdx) => (
                              <li key={aIdx} className="leading-relaxed">
                                {act}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Warnings / Red flags checks if they exist */}
              {analysisResult.risks && analysisResult.risks.length > 0 && (
                <section className="bg-amber-50 border border-amber-200 p-3 rounded-lg shadow-3xs">
                  <div className="text-amber-800 font-bold text-[10px] uppercase tracking-wider flex items-center gap-1.5 mb-1.5 pb-1 border-b border-amber-100">
                    <AlertTriangle size={12} className="text-amber-600" />
                    Risiko atau Peringatan (Risks / Red Flags)
                  </div>
                  <ul className="text-[11px] text-amber-950 space-y-1 pl-1">
                    {analysisResult.risks.map((rf, rIdx) => (
                      <li key={rIdx} className="flex items-start gap-1 pb-0.5 leading-snug">
                        <span className="text-amber-500 font-bold select-none">&bull;</span>
                        <span>{rf}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Suggested active bullets for resume rewrite */}
              <section className="bg-white rounded-lg border border-slate-200 p-4 shadow-2xs">
                <div className="text-indigo-700 text-[10px] font-black uppercase mb-2.5 tracking-wider flex items-center gap-1.5 border-b border-slate-100 pb-2">
                  <Sparkles size={11} />
                  Usulan Kalimat Aktif CV (Kompatibel ATS)
                </div>

                <div className="space-y-2.5">
                  {analysisResult.cvBulletSuggestions && analysisResult.cvBulletSuggestions.length > 0 ? (
                    analysisResult.cvBulletSuggestions.map((bullet, bIdx) => (
                      <div key={bIdx} className="p-2 bg-slate-50/80 rounded border-l-4 border-indigo-500 text-[11px] group hover:bg-slate-100/40 transition-all shadow-3xs">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-slate-700 leading-normal font-sans italic">"{bullet}"</p>
                          <button
                            onClick={() => copyToClipboard(bullet, true, bIdx)}
                            className="bg-white hover:bg-slate-200 border border-slate-200 p-1 rounded inline-flex shrink-0 text-slate-500 hover:text-slate-800 transition-colors"
                            title="Salin kalimat usulan ini"
                          >
                            {copiedCV === bIdx ? <Check size={11} className="text-emerald-600" /> : <Copy size={11} />}
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-[10px] text-slate-400 italic">Gagal membuat rekomendasi bullet CV.</p>
                  )}
                </div>
              </section>

              {/* Showcase / portfolio recommendations */}
              <section className="bg-white rounded-lg border border-slate-200 p-4 shadow-2xs">
                <div className="text-slate-800 font-black text-[10px] uppercase mb-2.5 tracking-wider flex items-center gap-1.5 border-b border-slate-200/60 pb-2">
                  <Lightbulb size={12} className="text-amber-500" />
                  Rekomendasi Portofolio Proyek
                </div>
                <ul className="text-[11px] text-slate-650 space-y-2.5 pl-3 list-none">
                  {analysisResult.portfolioSuggestions && analysisResult.portfolioSuggestions.map((imp, iIdx) => (
                    <li key={iIdx} className="flex items-start gap-1.5 pr-0.5 text-slate-700 leading-relaxed font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0 mt-1.5"></span>
                      <span>{imp}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Dynamic Disclaimer banner */}
              {analysisResult.disclaimer && (
                <div className="p-3 bg-amber-50/50 border border-amber-200/60 rounded-lg text-[10px] text-amber-900 leading-relaxed">
                  <span className="font-extrabold block uppercase text-[8.5px] tracking-wider text-amber-950 mb-0.5">Disclaimer LokerLens</span>
                  {analysisResult.disclaimer}
                </div>
              )}

            </div>

          </div>
        )}

      </main>

      {/* FOOTER BAR */}
      <footer className="py-4 bg-slate-100 border-t border-slate-200 flex flex-col gap-2 px-4 shrink-0 text-[10px] text-slate-500 font-medium">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>Saran ini ditujukan untuk evaluasi kesiapan kerja, keputusan akhir rekrutmen ada di tangan tim rekruter perusahaan.</div>
          <div className="flex gap-4 font-mono text-[9px] text-slate-400 shrink-0">
            <span className="font-semibold text-indigo-600">v1.0.0 · Juara Vibe Coding Edition</span>
            <span>&copy; 2026 LokerLens AI Indonesia</span>
          </div>
        </div>
        <div className="text-[10px] leading-relaxed text-slate-400 border-t border-slate-200/65 pt-2 font-normal">
          <strong className="text-slate-500">Project Journey:</strong> LokerLens AI started as a Juara Vibe Coding project focused on helping entry-level IT job seekers understand their readiness before applying to a job posting. Future versions will expand it into a broader manual-first job readiness assistant for multiple entry-level fields.
        </div>
      </footer>
    </div>
  );
}
