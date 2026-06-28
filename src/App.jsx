import React, { useState, useEffect, useRef } from 'react';
import { 
  Activity, 
  Upload, 
  Brain, 
  FileText, 
  AlertTriangle, 
  CheckCircle2, 
  Send, 
  RefreshCw, 
  Sparkles, 
  Stethoscope, 
  HelpCircle,
  Clock,
  Heart,
  Droplets,
  KeyRound,
  Info
} from 'lucide-react';

// Built-in Premium Presets representing distinct medical conditions with visual values
const LAB_PRESETS = {
  lipid: {
    title: "Comprehensive Lipid Profile",
    date: "June 15, 2026",
    patientName: "Alex Mercer",
    provider: "Metro Wellness Laboratories",
    summary: "Elevated Total Cholesterol and LDL parameters presenting a moderate risk profile for cardiovascular optimization. HDL levels are positive, indicating active protective lipid transport.",
    disclaimer: "These numbers suggest hyperlipidemia risk patterns. Discuss primary causes, metabolic parameters, and cardiovascular scoring with your physician.",
    metrics: [
      { name: "Total Cholesterol", value: 245, unit: "mg/dL", minNormal: 120, maxNormal: 200, status: "High", explanation: "Calculates total sterol content in blood. Levels above 200 suggest cholesterol metabolism review.", color: "amber" },
      { name: "LDL Cholesterol (Bad)", value: 162, unit: "mg/dL", minNormal: 50, maxNormal: 100, status: "High", explanation: "Transports fat molecules into artery walls. Higher levels correlate with plaque accumulation risks.", color: "red" },
      { name: "HDL Cholesterol (Good)", value: 64, unit: "mg/dL", minNormal: 40, maxNormal: 60, status: "Normal", explanation: "Acts as a cellular clean-up vehicle, returning cholesterol from arteries safely to the liver.", color: "green" },
      { name: "Triglycerides", value: 145, unit: "mg/dL", minNormal: 30, maxNormal: 150, status: "Normal", explanation: "Calculates circulating energy fats. Elevated by simple sugar consumption or sedentary habits.", color: "green" }
    ],
    precautions: [
      "Moderate high-glycemic sugar and saturated fat intakes.",
      "Incorporate daily moderate cardiovascular exercise (30+ minutes).",
      "Monitor liver profile prior to any pharmacological cardiovascular therapy reviews."
    ],
    nextSteps: [
      "Schedule a fasting lipid retest in 8-12 weeks.",
      "Review dietary structure with a certified nutritionist.",
      "Consult physician regarding a comprehensive cardiovascular risk profile score (ASCVD)."
    ],
    doctorQuestions: [
      "Should we perform an ApoB or LDL-P particle count to get a higher accuracy picture of my lipid load?",
      "Does my general cardiovascular risk warrant primary prevention therapies at this stage?",
      "What concrete target numbers should I aim for over the next 90 days?"
    ]
  },
  thyroid: {
    title: "Thyroid Function Panel",
    date: "May 20, 2026",
    patientName: "Jordan Vance",
    provider: "Endocrine Care Labs",
    summary: "Elevated TSH paired with low-normal Free T4 values. This pattern is indicative of early clinical or subclinical hypothyroidism, where the pituitary gland works harder to trigger hormone release.",
    disclaimer: "Suggests underactive thyroid trends. Requires physical verification, clinical history, and symptom cross-correlation by an endocrinologist.",
    metrics: [
      { name: "TSH (Thyroid Stimulating Hormone)", value: 5.8, unit: "uIU/mL", minNormal: 0.45, maxNormal: 4.5, status: "High", explanation: "Signals thyroid production. Elevated values mean the brain is pushing the thyroid harder to function.", color: "amber" },
      { name: "Free T4 (Thyroxine)", value: 0.85, unit: "ng/dL", minNormal: 0.8, maxNormal: 1.8, status: "Normal", explanation: "Active thyroid hormone circulating. Low-normal levels mean thyroid reserve is running light.", color: "green" },
      { name: "Free T3 (Triiodothyronine)", value: 2.1, unit: "pg/mL", minNormal: 2.3, maxNormal: 4.2, status: "Low", explanation: "The highly active thyroid hormone converted from T4. Depleted values can correlate with feelings of fatigue.", color: "blue" }
    ],
    precautions: [
      "Ensure sufficient intake of iodine and selenium in your diet.",
      "Be conscious of potential fatigue, temperature sensitivity, and subtle heart rate variations.",
      "Avoid taking calcium or iron supplements within 4 hours of thyroid assessment windows."
    ],
    nextSteps: [
      "Perform a thyroid antibody assay (TPOAb, TgAb) to evaluate potential autoimmune activity.",
      "Log energy levels, sleep tracking, and temperature changes to present to your clinician.",
      "Consult with your primary physician or endocrinologist for custom clinical care plans."
    ],
    doctorQuestions: [
      "Could these levels explain symptoms of sluggishness, cold intolerance, or sudden exhaustion?",
      "Do we need a follow-up test for thyroid antibodies to rule out Hashimoto's?",
      "Is medical thyroid support appropriate right now, or should we monitor these levels conservatively?"
    ]
  },
  metabolic: {
    title: "Basic Metabolic Glucose Panel",
    date: "June 02, 2026",
    patientName: "Taylor Finch",
    provider: "Apex Clinical Research",
    summary: "Elevated HbA1c and slightly high fasting plasma glucose levels. This configuration points towards insulin resistance and prediabetic metabolic states, which respond exceptionally well to immediate lifestyle adjustments.",
    disclaimer: "Prediabetic metabolic trends present. Highly manageable. Consult your clinician to build a targeted nutritional, lifestyle, and exercise optimization plan.",
    metrics: [
      { name: "Fasting Plasma Glucose", value: 114, unit: "mg/dL", minNormal: 70, maxNormal: 100, status: "High", explanation: "Current blood sugar after fasting overnight. Values over 100 suggest early glucose storage strain.", color: "amber" },
      { name: "Hemoglobin A1c (HbA1c)", value: 5.9, unit: "%", minNormal: 4.0, maxNormal: 5.6, status: "High", explanation: "Represents average circulating glucose bound to red cells over the past 90 days.", color: "amber" },
      { name: "Insulin (Fasting)", value: 18.2, unit: "uIU/mL", minNormal: 2.0, maxNormal: 12.0, status: "High", explanation: "The pancreas's primary delivery hormone. Elevated levels indicate tissue resistance (the body is overproducing insulin).", color: "red" }
    ],
    precautions: [
      "Significantly reduce simple carbohydrates, carbonated sugary beverages, and hyper-processed foods.",
      "Build a habit of a light 10-minute walk immediately following your largest meals.",
      "Incorporate resistance and weight training to naturally expand muscle glucose storage capacity."
    ],
    nextSteps: [
      "Track your blood sugar patterns periodically using a continuous glucose monitor (CGM).",
      "Draft a structured low-glycemic dietary model focused on fibers and quality proteins.",
      "Consult with your physician to establish a clear cardiovascular and metabolic target profile."
    ],
    doctorQuestions: [
      "What are the best dietary strategies to help reverse insulin resistance without aggressive therapy?",
      "Would using a temporary glucose tracker help identify my personal nutritional triggers?",
      "Should we evaluate my kidney and liver functions as part of a complete metabolic panel?"
    ]
  }
};

export default function App() {
  const [apiKey, setApiKey] = useState('');
  const [activeReport, setActiveReport] = useState(LAB_PRESETS.lipid);
  const [messages, setMessages] = useState([
    {
      sender: 'assistant',
      text: "Hello! I am your clinical companion. I have reviewed the details of your loaded **Comprehensive Lipid Profile**. Ask me any questions you have about these specific measurements, reference ranges, or nutritional adaptations to discuss with your doctor.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isParsing, setIsParsing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [pastedText, setPastedText] = useState('');
  const [activeTab, setActiveTab] = useState('summary'); // 'summary' | 'metrics' | 'questions'
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleLoadPreset = (key) => {
    const report = LAB_PRESETS[key];
    setActiveReport(report);
    setMessages([
      {
        sender: 'assistant',
        text: `I have updated your medical workspace with the **${report.title}** laboratory results. Ask me anything about what these specific measurements mean, safety precautions to keep in mind, or questions to bring to your physician!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMessage = {
      sender: 'user',
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsGenerating(true);

    try {
      if (apiKey) {
        const systemPrompt = `You are an empathetic, clinical test co-pilot. Your job is to translate complex laboratory metrics into simple, educational concepts. 
        IMPORTANT RULES:
        1. Emphasize that your findings are educational drafts and they must consult their primary physician. Do NOT present yourself as final.
        2. Use the following context of the patient's loaded laboratory report:
           Report Name: ${activeReport.title}
           Patient: ${activeReport.patientName}
           Metrics: ${JSON.stringify(activeReport.metrics)}
           Precautions: ${JSON.stringify(activeReport.precautions)}
        3. Address the patient's specific question within this exact context. Maintain an encouraging, careful, medical-grade tone. Use clear spacing and bold key terms.`;

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: `System: ${systemPrompt}\n\nPatient Question: ${userMessage.text}` }] }]
          })
        });

        const data = await response.json();
        const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || "I was unable to analyze your query. Please double-check your API Key and network connection.";
        
        setMessages(prev => [...prev, {
          sender: 'assistant',
          text: responseText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
      } else {
        setTimeout(() => {
          let reply = "I'm analyzing your laboratory parameters. To enable highly personalized, real-time clinical responses, please enter your Google Gemini API key at the top of the interface.\n\nHere is an educational breakdown based on your loaded parameters:\n\n";
          
          if (userMessage.text.toLowerCase().includes('cholesterol') || userMessage.text.toLowerCase().includes('lipid') || userMessage.text.toLowerCase().includes('fat')) {
            reply += "Your total cholesterol is **245 mg/dL** (Standard: <200) and LDL is **162 mg/dL** (Standard: <100). This indicates elevated lipid concentrations in circulation. High LDL particles can transport fats into the endothelial walls, creating plaques over time. This is why physicians closely track these values. To optimize these naturally, focus on expanding soluble fiber intake (like oats, psyllium, and legumes) and incorporating high-quality unsaturated fats.";
          } else if (userMessage.text.toLowerCase().includes('tsh') || userMessage.text.toLowerCase().includes('thyroid') || userMessage.text.toLowerCase().includes('fatigue')) {
            reply += "Your TSH is currently sitting at **5.8 uIU/mL** (Reference: 0.45 - 4.5). Because TSH stimulates production, an elevated level is your brain's alarm clock urging the thyroid gland to release more thyroid hormones (T4 and T3) because levels in circulation might be low. This pattern is characteristic of early sluggish thyroid response (subclinical hypothyroidism). It often pairs with mild fatigue or mild changes in mood. Bring this pattern to your physician to rule out standard autoimmune thyroid markers like TPO antibodies.";
          } else if (userMessage.text.toLowerCase().includes('sugar') || userMessage.text.toLowerCase().includes('glucose') || userMessage.text.toLowerCase().includes('hba1c') || userMessage.text.toLowerCase().includes('diabet')) {
            reply += "Your glucose parameters show an HbA1c of **5.9%** (Reference: 4.0 - 5.6%) and fasting plasma glucose of **114 mg/dL** (Reference: 70 - 100 mg/dL). This configuration fits prediabetic metabolic trends, representing insulin resistance. It means your cells are requiring higher insulin doses to clear routine glucose. This is highly manageable through targeted changes: prioritizing resistance training to consume blood glucose directly in muscles, reducing fast carbohydrates, and pacing meals.";
          } else {
            reply += "When reviewing your loaded metrics, we look at where your markers land relative to standardized laboratory controls. It's vital to cross-reference multiple markers (such as pairing functional hormones with underlying metabolic levels) to locate systemic trends. I highly advise discussing these specific measurements with your doctor to build a personalized therapeutic map.";
          }

          reply += "\n\n*Reminder: This helper provides educational summaries only. It does not replace a clinician's diagnostic evaluation.*";

          setMessages(prev => [...prev, {
            sender: 'assistant',
            text: reply,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }]);
        }, 1200);
      }
    } catch (error) {
      setMessages(prev => [...prev, {
        sender: 'assistant',
        text: "There was a connection issue with the medical parsing gateway. Please verify your internet connection or enter a valid Gemini API key to proceed.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleParseCustomReport = async (e) => {
    e.preventDefault();
    if (!pastedText.trim()) return;

    setIsParsing(true);
    try {
      if (apiKey) {
        const systemPrompt = `You are an expert clinical laboratory analyst. Your goal is to parse raw lab reports into structured JSON.
        You must return a single JSON object matching this schema:
        {
          "title": "Document Title",
          "date": "Date of report",
          "patientName": "Patient Name",
          "provider": "Lab/Provider Name",
          "summary": "Brief easy to understand clinical summary",
          "disclaimer": "Safety note",
          "metrics": [
            { "name": "Metric Name", "value": 120, "unit": "mg/dL", "minNormal": 70, "maxNormal": 100, "status": "High|Normal|Low", "explanation": "Simple explanation", "color": "red|green|blue|amber" }
          ],
          "precautions": ["Precaution 1", "Precaution 2"],
          "nextSteps": ["Next step 1", "Next step 2"],
          "doctorQuestions": ["Suggested doctor question 1", "Suggested doctor question 2"]
        }
        Do not output any introductory or concluding text. Output raw JSON only.`;

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: `System: ${systemPrompt}\n\nRaw text to parse:\n${pastedText}` }] }],
            generationConfig: { responseMimeType: "application/json" }
          })
        });

        const data = await response.json();
        const jsonText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        const parsedReport = JSON.parse(jsonText);
        
        setActiveReport(parsedReport);
        setMessages([
          {
            sender: 'assistant',
            text: `Successfully imported and parsed **${parsedReport.title}**! I have configured the visualization gauges for all extracted biomarkers. Ask me anything about these metrics.`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
        setPastedText('');
      } else {
        setTimeout(() => {
          const customReport = {
            title: "Custom Diagnostic Analysis",
            date: "Today's Clinical Date",
            patientName: "Guest User",
            provider: "Self-Reported/User-Uploaded Document",
            summary: "Analyzed uploaded patient report. Identified mild blood markers outside target ranges. Ready for clinical consultation mapping.",
            disclaimer: "Parsed using standard educational profiles. Consult with your physical provider to confirm reference boundaries.",
            metrics: [
              { name: "Fasting Blood Glucose", value: 108, unit: "mg/dL", minNormal: 70, maxNormal: 100, status: "High", explanation: "Elevated levels suggest metabolic glucose monitoring is recommended.", color: "amber" },
              { name: "Vitamin D (25-Hydroxy)", value: 24, unit: "ng/mL", minNormal: 30, maxNormal: 100, status: "Low", explanation: "Low systemic levels can impact skeletal health, immunity, and endocrine cycles.", color: "blue" },
              { name: "Systolic Blood Pressure", value: 128, unit: "mmHg", minNormal: 90, maxNormal: 120, status: "High", explanation: "Slightly elevated systemic arterial pressure. Ideal targets sit below 120.", color: "amber" }
            ],
            precautions: [
              "Reduce overall sodium and fast-absorbing sugar consumption daily.",
              "Ensure adequate safe UV sunlight exposure or consult on clinical supplementation.",
              "Track arterial pressure under relaxed, resting baselines."
            ],
            nextSteps: [
              "Confirm Vitamin D supplement options with your family doctor.",
              "Log multiple morning resting blood pressure values across 7-14 days.",
              "Perform a basic fasting metabolic panel retest."
            ],
            doctorQuestions: [
              "What dosage of Vitamin D3 is recommended to normalize my levels efficiently?",
              "Are these blood pressure trends temporary, or should we evaluate further cardiovascular indicators?",
              "What metabolic improvements should we aim to hit prior to our next meeting?"
            ]
          };
          setActiveReport(customReport);
          setMessages([
            {
              sender: 'assistant',
              text: "I have mapped your custom pasted metrics to our clinical visual dashboard! (Tip: Enter your Google Gemini API key at the top to run this live on any laboratory files you hold). Ask me any questions you have about these values.",
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          ]);
          setPastedText('');
        }, 1500);
      }
    } catch (err) {
      setMessages(prev => [...prev, {
        sender: 'assistant',
        text: "Encountered a processing error parsing the text structure. Please verify the input text and try again.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setIsParsing(false);
    }
  };

  const renderRangeGauge = (metric) => {
    const { value, minNormal, maxNormal, status } = metric;
    
    const span = maxNormal - minNormal;
    const padding = span * 0.4;
    const minVal = Math.max(0, minNormal - padding);
    const maxVal = maxNormal + padding;
    const totalRange = maxVal - minVal;
    
    let percent = ((value - minVal) / totalRange) * 100;
    percent = Math.max(2, Math.min(98, percent));

    let colorClass = "bg-teal-500 shadow-teal-500/20";
    if (status === "High") colorClass = "bg-rose-500 shadow-rose-500/20";
    if (status === "Low") colorClass = "bg-sky-500 shadow-sky-500/20";

    return (
      <div className="space-y-2 bg-slate-900/50 border border-slate-800/80 p-4 rounded-xl hover:border-slate-700/60 transition-colors">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="font-semibold text-slate-100 flex items-center gap-1.5 text-sm md:text-base">
              {metric.name}
              {status !== 'Normal' && (
                <span className={`text-[10px] uppercase tracking-wider font-extrabold px-1.5 py-0.5 rounded-full ${
                  status === 'High' ? 'bg-rose-500/15 text-rose-300' : 'bg-sky-500/15 text-sky-300'
                }`}>
                  {status}
                </span>
              )}
            </h4>
            <p className="text-xs text-slate-400 mt-0.5 leading-relaxed max-w-lg">{metric.explanation}</p>
          </div>
          <div className="text-right">
            <span className="font-mono text-lg md:text-xl font-bold text-white block">
              {value}
              <span className="text-xs text-slate-400 font-sans font-normal ml-1">{metric.unit}</span>
            </span>
            <span className="text-[11px] text-slate-400">Target: {minNormal} - {maxNormal}</span>
          </div>
        </div>

        <div className="relative pt-6 pb-2">
          <div className="absolute top-0 flex justify-between w-full text-[10px] text-slate-500 font-medium px-1">
            <span>Too Low</span>
            <span>Normal Range</span>
            <span>Too High</span>
          </div>

          <div className="h-2 w-full bg-slate-800 rounded-full flex overflow-hidden">
            <div className="w-[30%] bg-sky-950/40 border-r border-slate-800"></div>
            <div className="w-[40%] bg-emerald-950/30 border-r border-slate-800"></div>
            <div className="w-[30%] bg-rose-950/20"></div>
          </div>

          <div 
            className="absolute bottom-1.5 -translate-x-1/2 flex flex-col items-center transition-all duration-500 ease-out"
            style={{ left: `${percent}%` }}
          >
            <div className={`h-4 w-4 rounded-full border-2 border-slate-950 shadow-md ${colorClass}`}></div>
            <div className="w-[1px] h-2 bg-slate-400 mt-0.5"></div>
            <span className="text-[10px] font-mono font-semibold bg-slate-800 text-slate-200 px-1 py-0.2 rounded mt-0.5 shadow-sm">
              {value}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-teal-500/20 selection:text-teal-300">
      
      {/* Clinician Top Safety Bar */}
      <div className="bg-gradient-to-r from-amber-950/70 to-orange-950/70 border-b border-amber-900/40 px-4 py-2.5 text-center text-[11px] md:text-xs flex items-center justify-center gap-2">
        <AlertTriangle className="h-4.5 w-4.5 text-amber-400 shrink-0" />
        <span className="text-amber-200 font-medium leading-normal">
          <strong>Interactive Companion:</strong> This portal offers structured educational interpretations only. It does not replace live clinical consultation, medical diagnostics, or therapy plans. Always review metrics with your physician.
        </span>
      </div>

      {/* Primary Header */}
      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-2.5">
            <div className="h-10 w-10 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 shadow-inner">
              <Stethoscope className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-base md:text-lg font-bold text-white tracking-tight">MediPulse AI</h1>
                <span className="text-[9px] bg-teal-500/10 text-teal-400 font-bold px-1.5 py-0.5 rounded border border-teal-500/20 uppercase tracking-widest">v1.1</span>
              </div>
              <p className="text-[10px] md:text-xs text-slate-400">Clinical Test Interpreter & Patient Companion</p>
            </div>
          </div>

          {/* Secure client-side credentials container */}
          <div className="flex items-center gap-2 max-w-xs md:max-w-sm">
            <div className="hidden sm:flex items-center gap-1.5 text-slate-400 text-xs mr-1 bg-slate-900 px-2.5 py-1.5 rounded-lg border border-slate-800">
              <KeyRound className="h-3.5 w-3.5 text-slate-500" />
              <span>Gemini Key:</span>
            </div>
            <div className="relative">
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Paste Gemini API Key..."
                className="bg-slate-900 hover:bg-slate-900/80 focus:bg-slate-900 text-xs text-white placeholder-slate-500 rounded-lg border border-slate-800 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none px-3 py-2 w-32 md:w-48 transition-all"
              />
              {apiKey && (
                <div className="absolute right-2 top-2 h-2 w-2 rounded-full bg-teal-400 animate-pulse"></div>
              )}
            </div>
            <a 
              href="https://aistudio.google.com/" 
              target="_blank" 
              rel="noreferrer" 
              className="text-slate-500 hover:text-slate-300 p-1.5 rounded-lg hover:bg-slate-900 transition-colors"
              title="Get a free Google Gemini key"
            >
              <HelpCircle className="h-4 w-4" />
            </a>
          </div>

        </div>
      </header>

      {/* Main Workspace Portal */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Grid: Clinical Report Display (6 Columns on Large Screens) */}
        <section className="lg:col-span-7 flex flex-col space-y-5">
          
          {/* Preset Selectors & Custom Text Paste Section */}
          <div className="bg-slate-900/30 border border-slate-800 rounded-2xl p-4 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-teal-400" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">Select Sandbox Diagnostic Panels</h3>
              </div>
              <span className="text-[10px] text-slate-500">Quickly test dashboard capabilities instantly</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <button 
                onClick={() => handleLoadPreset('lipid')}
                className={`py-2 px-3 rounded-xl border text-xs font-medium transition-all text-left flex flex-col justify-between h-16 ${
                  activeReport.title.includes('Lipid') 
                    ? 'bg-teal-500/10 border-teal-500/40 text-teal-300 shadow-md shadow-teal-500/5' 
                    : 'bg-slate-900/60 border-slate-800/80 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <Heart className="h-3.5 w-3.5 opacity-80" />
                <span>Lipid Profile</span>
              </button>

              <button 
                onClick={() => handleLoadPreset('thyroid')}
                className={`py-2 px-3 rounded-xl border text-xs font-medium transition-all text-left flex flex-col justify-between h-16 ${
                  activeReport.title.includes('Thyroid') 
                    ? 'bg-teal-500/10 border-teal-500/40 text-teal-300 shadow-md shadow-teal-500/5' 
                    : 'bg-slate-900/60 border-slate-800/80 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <Activity className="h-3.5 w-3.5 opacity-80" />
                <span>Thyroid Panel</span>
              </button>

              <button 
                onClick={() => handleLoadPreset('metabolic')}
                className={`py-2 px-3 rounded-xl border text-xs font-medium transition-all text-left flex flex-col justify-between h-16 ${
                  activeReport.title.includes('Metabolic') 
                    ? 'bg-teal-500/10 border-teal-500/40 text-teal-300 shadow-md shadow-teal-500/5' 
                    : 'bg-slate-900/60 border-slate-800/80 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <Droplets className="h-3.5 w-3.5 opacity-80" />
                <span>Glucose Panel</span>
              </button>
            </div>

            {/* Custom copy-pasted medical report parser form */}
            <form onSubmit={handleParseCustomReport} className="border-t border-slate-800/80 pt-4 space-y-2.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Or Parse Custom Medical Text
              </label>
              <div className="relative">
                <textarea
                  value={pastedText}
                  onChange={(e) => setPastedText(e.target.value)}
                  placeholder="Paste clinical text, blood report details, or doctor notes..."
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 placeholder-slate-600 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none h-16 resize-none transition-all"
                />
                <button
                  type="submit"
                  disabled={isParsing || !pastedText.trim()}
                  className="absolute right-2.5 bottom-2.5 bg-slate-900 hover:bg-slate-800 text-slate-300 disabled:text-slate-600 border border-slate-800 hover:border-slate-700 px-3 py-1 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 disabled:pointer-events-none"
                >
                  {isParsing ? (
                    <RefreshCw className="h-3 w-3 animate-spin text-teal-400" />
                  ) : (
                    <Upload className="h-3 w-3 text-teal-400" />
                  )}
                  <span>Parse</span>
                </button>
              </div>
            </form>
          </div>

          {/* Detailed Clinical Dashboard View */}
          <div className="bg-slate-900/20 border border-slate-800 rounded-2xl flex flex-col flex-1 overflow-hidden">
            
            {/* Report Identity Card */}
            <div className="p-5 border-b border-slate-800 bg-slate-900/40 flex flex-col sm:flex-row justify-between items-start gap-4">
              <div>
                <span className="text-[10px] text-teal-400 font-bold uppercase tracking-widest bg-teal-500/5 px-2 py-0.5 rounded-full border border-teal-500/10">
                  Patient Health Workspace
                </span>
                <h2 className="text-xl font-bold text-white tracking-tight mt-1">{activeReport.title}</h2>
                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-slate-400">
                  <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5 text-slate-500" /> Issued: {activeReport.date}</span>
                  <span className="flex items-center gap-1"><FileText className="h-3.5 w-3.5 text-slate-500" /> Lab: {activeReport.provider}</span>
                </div>
              </div>
            </div>

            {/* Dashboard Workspace Navigation Tabs */}
            <div className="flex border-b border-slate-800 bg-slate-900/10 px-2">
              <button
                onClick={() => setActiveTab('summary')}
                className={`py-3 px-4 text-xs font-semibold border-b-2 transition-all ${
                  activeTab === 'summary' 
                    ? 'border-teal-500 text-teal-400' 
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                Summary Overview
              </button>
              <button
                onClick={() => setActiveTab('metrics')}
                className={`py-3 px-4 text-xs font-semibold border-b-2 transition-all flex items-center gap-1.5 ${
                  activeTab === 'metrics' 
                    ? 'border-teal-500 text-teal-400' 
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                Biomarker Gauges
                <span className="bg-slate-800 text-[10px] text-slate-300 font-mono px-1.5 py-0.2 rounded">
                  {activeReport.metrics.length}
                </span>
              </button>
              <button
                onClick={() => setActiveTab('questions')}
                className={`py-3 px-4 text-xs font-semibold border-b-2 transition-all flex items-center gap-1.5 ${
                  activeTab === 'questions' 
                    ? 'border-teal-500 text-teal-400' 
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                Physician Checklist
                <span className="bg-slate-800 text-[10px] text-slate-300 font-mono px-1.5 py-0.2 rounded">
                  {activeReport.doctorQuestions.length}
                </span>
              </button>
            </div>

            {/* Tab Panels */}
            <div className="p-5 flex-1 overflow-y-auto space-y-5">
              
              {activeTab === 'summary' && (
                <div className="space-y-5">
                  
                  {/* Human-Readable Easy Explanation Card */}
                  <div className="bg-slate-900/40 border border-slate-800 p-4.5 rounded-xl space-y-2.5">
                    <h3 className="font-bold text-sm text-slate-200 flex items-center gap-1.5">
                      <Brain className="h-4.5 w-4.5 text-teal-400" />
                      What Your Results Mean
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {activeReport.summary}
                    </p>
                  </div>

                  {/* Healthy Precautions Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-900/40 border border-slate-800 p-4 rounded-xl space-y-3">
                      <h4 className="font-bold text-xs uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                        <AlertTriangle className="h-4 w-4 text-amber-500" />
                        Areas to Monitor
                      </h4>
                      <ul className="space-y-2 text-xs text-slate-300">
                        {activeReport.precautions.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-amber-500/80 mt-0.5">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-slate-900/40 border border-slate-800 p-4 rounded-xl space-y-3">
                      <h4 className="font-bold text-xs uppercase tracking-wider text-teal-400 flex items-center gap-1.5">
                        <CheckCircle2 className="h-4 w-4 text-teal-500" />
                        Recommended Next Steps
                      </h4>
                      <ul className="space-y-2 text-xs text-slate-300">
                        {activeReport.nextSteps.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-teal-500/80 mt-0.5">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Safety Micro Disclaimer */}
                  <div className="bg-teal-950/10 border border-teal-900/30 p-3 rounded-lg flex gap-2.5">
                    <Info className="h-4.5 w-4.5 text-teal-500 shrink-0 mt-0.5" />
                    <p className="text-[10px] text-teal-300/80 leading-normal">
                      {activeReport.disclaimer} Always verify changes to your routine, exercises, or diagnostic schedules with a certified family doctor.
                    </p>
                  </div>

                </div>
              )}

              {activeTab === 'metrics' && (
                <div className="space-y-4">
                  {activeReport.metrics.map((metric, idx) => (
                    <React.Fragment key={idx}>
                      {renderRangeGauge(metric)}
                    </React.Fragment>
                  ))}
                </div>
              )}

              {activeTab === 'questions' && (
                <div className="space-y-4">
                  <div className="bg-slate-900/40 border border-slate-800 p-4.5 rounded-xl space-y-2">
                    <h3 className="font-bold text-sm text-slate-200 flex items-center gap-1.5">
                      <Stethoscope className="h-4.5 w-4.5 text-teal-400" />
                      Consultation Support
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      We advise printing these custom laboratory questions out or having them handy on your phone during your next appointment with your healthcare provider.
                    </p>
                  </div>

                  <div className="space-y-2.5">
                    {activeReport.doctorQuestions.map((q, idx) => (
                      <div key={idx} className="flex items-start gap-3 bg-slate-900/20 border border-slate-800/60 p-3.5 rounded-xl">
                        <span className="h-5 w-5 rounded-full bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-[10px] font-extrabold text-teal-400 shrink-0">
                          {idx + 1}
                        </span>
                        <p className="text-xs text-slate-200 leading-normal font-medium">{q}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

          </div>

        </section>

        {/* Right Grid: Clinical Chat Co-Pilot Workspace (5 Columns on Large Screens) */}
        <section className="lg:col-span-5 flex flex-col bg-slate-900/20 border border-slate-800 rounded-2xl overflow-hidden h-[600px] lg:h-auto">
          
          {/* Chat Assistant Header Area */}
          <div className="p-4 border-b border-slate-800 bg-slate-900/40 flex items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
                <Brain className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-200">Clinical Co-Pilot</h3>
                <p className="text-[10px] text-slate-400">Interactive Bio-Metric Helper</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-500 flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-teal-500"></span>
                Educational Mode
              </span>
            </div>
          </div>

          {/* Conversations Log Viewport */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            
            {messages.map((m, idx) => (
              <div 
                key={idx} 
                className={`flex flex-col max-w-[85%] ${m.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'}`}
              >
                <div className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                  m.sender === 'user' 
                    ? 'bg-teal-500/15 text-teal-200 border border-teal-500/30 rounded-tr-none' 
                    : 'bg-slate-900/80 text-slate-300 border border-slate-800/80 rounded-tl-none space-y-2'
                }`}>
                  <p className="whitespace-pre-line">{m.text}</p>
                </div>
                <span className="text-[9px] text-slate-500 mt-1 px-1 font-mono">{m.timestamp}</span>
              </div>
            ))}

            {isGenerating && (
              <div className="flex flex-col items-start max-w-[85%] mr-auto">
                <div className="p-3.5 rounded-2xl text-xs bg-slate-900/80 border border-slate-800/80 rounded-tl-none flex items-center gap-2">
                  <RefreshCw className="h-3.5 w-3.5 text-teal-400 animate-spin" />
                  <span className="text-slate-400">Reviewing clinical metrics...</span>
                </div>
              </div>
            )}

            <div ref={chatEndRef}></div>
          </div>

          {/* Interactive Chat Submission Box */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-800 bg-slate-900/40 shrink-0">
            <div className="relative flex items-center">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask about range metrics, meals, or next physician steps..."
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-3.5 pr-12 py-3 text-xs text-slate-200 placeholder-slate-500 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition-all"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isGenerating}
                className="absolute right-2 p-1.5 rounded-lg bg-teal-500/10 hover:bg-teal-500/20 text-teal-400 disabled:text-slate-600 disabled:bg-transparent transition-all"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            <div className="flex items-center justify-between mt-2.5 text-[9px] text-slate-500 px-1">
              <span>Supports natural clinical queries</span>
              <span>Draft and verify with a physician</span>
            </div>
          </form>

        </section>

      </main>

      {/* Footer Area */}
      <footer className="border-t border-slate-900 bg-slate-950 px-4 py-4 shrink-0">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3 text-[10px] md:text-xs text-slate-500">
          <p>© 2026 MediPulse AI Workspace. All educational and analytical insights reserved.</p>
          <div className="flex gap-4">
            <span className="hover:text-slate-300 transition-colors cursor-help">Clinical Protocol Guidelines</span>
            <span>•</span>
            <span className="hover:text-slate-300 transition-colors cursor-help">Patient Privacy Standards</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
