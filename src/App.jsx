import React, { useState, useEffect, useRef } from 'react';
import { 
  FileText, 
  Upload, 
  Send, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  Activity, 
  User, 
  Bot, 
  HelpCircle, 
  RotateCcw, 
  HeartPulse, 
  Loader2, 
  Sliders, 
  Info,
  Calendar,
  Layers,
  ClipboardList,
  ChevronRight,
  Stethoscope,
  ShieldCheck,
  Download,
  Printer,
  ChevronDown,
  ArrowRight
} from 'lucide-react';

const SAMPLE_REPORTS = [
  {
    id: 'lipid-panel',
    name: 'Comprehensive Lipid & Cardiovascular Panel',
    date: 'June 26, 2026',
    overallSummary: 'The panel reveals elevated LDL ("bad") cholesterol and total cholesterol levels, pointing toward mild-to-moderate hyperlipidemia. Triglycerides and HDL ("good") cholesterol are currently in healthy optimal ranges. We recommend prioritizing cardiovascular-healthy dietary adjustments and coordinating with a physician to calculate your ASCVD risk score.',
    metrics: [
      { name: 'Total Cholesterol', value: 245, unit: 'mg/dL', minRef: 125, maxRef: 200, status: 'High', explanation: 'The sum of your blood\'s cholesterol content. Elevated levels are a baseline indicator for managing cardiovascular health.' },
      { name: 'LDL Cholesterol', value: 162, unit: 'mg/dL', minRef: 0, maxRef: 100, status: 'High', explanation: 'Low-Density Lipoprotein ("bad" cholesterol). Tends to build up in arterial walls. Lifestyle or dietary monitoring is highly encouraged.' },
      { name: 'HDL Cholesterol', value: 52, unit: 'mg/dL', minRef: 40, maxRef: 120, status: 'Normal', explanation: 'High-Density Lipoprotein ("good" cholesterol). Acts as a scavenger, helping clear excess cholesterol from the bloodstream.' },
      { name: 'Triglycerides', value: 148, unit: 'mg/dL', minRef: 0, maxRef: 150, status: 'Normal', explanation: 'A major form of fat stored in the body. Keeping this in the normal range protects blood vessel elasticity.' }
    ],
    precautions: [
      'Limit saturated and trans fats (e.g., heavily processed meats, hydrogenated oils, deep-fried items).',
      'Increase dietary soluble fiber (oats, avocados, legumes, chia seeds) which actively binds to cholesterol in the digestive tract.',
      'Engage in regular moderate aerobic physical activity (aim for at least 150 minutes weekly to naturally boost HDL).'
    ],
    recommendedNextSteps: [
      'Consult with your physician to evaluate your lifetime and ASCVD 10-year cardiovascular risk score.',
      'Schedule a follow-up lipid profile test in 8 to 12 weeks to measure dietary and exercise physical improvements.'
    ],
    questionsForDoctor: [
      'Considering my healthy HDL and Triglycerides, do my current LDL levels warrant medical intervention like statins, or is a trial of lifestyle modifications preferred?',
      'Would you recommend measuring secondary biomarkers like Apolipoprotein B (ApoB) to gain a more complete picture of my cardiovascular profile?'
    ]
  },
  {
    id: 'thyroid-panel',
    name: 'Thyroid Function Evaluation (TSH & Free T4)',
    date: 'May 12, 2026',
    overallSummary: 'An elevated TSH level accompanied by a slightly subnormal Free T4 level indicates primary subclinical to mild Hypothyroidism. Your pituitary gland is releasing higher amounts of TSH to signal your thyroid to produce hormone, which is currently slightly underactive.',
    metrics: [
      { name: 'TSH (Thyroid Stimulating Hormone)', value: 6.8, unit: 'uIU/mL', minRef: 0.45, maxRef: 4.50, status: 'High', explanation: 'Pituitary hormone driving thyroid output. High values show the brain is pushing the thyroid harder to produce hormone.' },
      { name: 'Free T4 (Thyroxine)', value: 0.78, unit: 'ng/dL', minRef: 0.82, maxRef: 1.77, status: 'Low', explanation: 'The active thyroid hormone circulating in your system. This slightly low level explains metabolic and cellular sluggishness.' },
      { name: 'Free T3 (Triiodothyronine)', value: 2.4, unit: 'pg/mL', minRef: 2.0, maxRef: 4.4, status: 'Normal', explanation: 'Another critical thyroid hormone. Currently stable, though sitting in the lower normal range.' }
    ],
    precautions: [
      'Be mindful of persistent symptoms such as unusual afternoon fatigue, dry skin, or temporary sensitivity to cold temperatures.',
      'Avoid high-dose iodine or kelp supplements without a direct clinical prescription, as they can paradoxically trigger deeper thyroid thyroid imbalances.'
    ],
    recommendedNextSteps: [
      'Discuss testing for Thyroid Peroxidase (TPO) antibodies with your primary care team to screen for autoimmune Hashimoto\'s disease.',
      'Coordinate with your doctor to determine if low-dose thyroid replacement therapy or active surveillance is most beneficial.'
    ],
    questionsForDoctor: [
      'Could my reports of morning exhaustion and dry skin be explained directly by this TSH value of 6.8?',
      'Do you suggest checking for autoimmune indicators like TPO antibodies before starting any hormonal treatments?'
    ]
  },
  {
    id: 'metabolic-panel',
    name: 'Glycemic Stability & Metabolic Screening',
    date: 'April 19, 2026',
    overallSummary: 'Blood sugar markers reflect early glucose intolerance, placing you in the pre-diabetic reference range. Fasting Glucose is slightly elevated, and your HbA1c average is on the borderline. Kidney performance indicators (Creatinine) remain fully healthy and stable.',
    metrics: [
      { name: 'Fasting Blood Glucose', value: 112, unit: 'mg/dL', minRef: 70, maxRef: 99, status: 'High', explanation: 'Your blood glucose level after overnight fasting. Elevated results indicate some level of systemic insulin resistance.' },
      { name: 'HbA1c (Glycated Hemoglobin)', value: 5.9, unit: '%', minRef: 4.0, maxRef: 5.6, status: 'High', explanation: 'An index of your average blood glucose over the past 90 days. Levels between 5.7% and 6.4% fall within pre-diabetes parameters.' },
      { name: 'Serum Creatinine', value: 0.92, unit: 'mg/dL', minRef: 0.60, maxRef: 1.20, status: 'Normal', explanation: 'A waste byproduct cleared entirely by your kidneys. This optimal range demonstrates strong renal health.' }
    ],
    precautions: [
      'Incorporate complex carbohydrates (whole grains, high-fiber vegetables) and limit simple sugars, fruit juices, and refined flours.',
      'Always pair carbohydrate-rich items with high-quality protein or healthy fats to minimize sudden insulin spikes.',
      'Build physical muscle mass through moderate resistance training to naturally enhance structural cellular insulin sensitivity.'
    ],
    recommendedNextSteps: [
      'Consult a certified dietitian to build a sustainable nutrition blueprint matching glycemic control requirements.',
      'Discuss the utility of continuous glucose monitoring or structured home finger-stick tests to map physical reactions to daily meals.'
    ],
    questionsForDoctor: [
      'Does my A1c level of 5.9% mean I can completely halt or reverse pre-diabetic progression through diet and lifestyle shifts alone?',
      'Would it be educational to check my fasting insulin levels to evaluate the degree of systemic insulin resistance?'
    ]
  }
];

export default function App() {
  const [apiKey, setApiKey] = useState('');
  const [currentReport, setCurrentReport] = useState(SAMPLE_REPORTS[0]);
  const [loading, setLoading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [inputText, setInputText] = useState('');
  const [customReportText, setCustomReportText] = useState('');
  const [isPastingText, setIsPastingText] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    {
      role: 'assistant',
      text: "Hello! I am your clinical test companion. I have reviewed your loaded test panel. Feel free to ask me to explain any particular marker, explore healthy lifestyle modifications, or prepare a concise list of talking points for your next clinician appointment.\n\n*Please remember: I am an educational assistant, not a doctor. Use my analysis to collaborate with your primary physician.*",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [sendingChat, setSendingChat] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState('all');
  
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSelectSample = (sample) => {
    setCurrentReport(sample);
    setChatHistory([
      {
        role: 'assistant',
        text: `I've successfully loaded the clinical educational dashboard for the "${sample.name}". What parameters or lifestyle precautions would you like to investigate? I'm ready to help you formulate questions for your clinician.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const handleUploadOrParse = async (e, type, fileOrText) => {
    setLoading(true);
    setUploadError('');
    
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;
    
    const systemPrompt = `You are an elite, patient-friendly laboratory data analyzer designed to translate complex medical lab parameters into digestible educational reports for patients. 
    Your primary goal is to empower patients to understand what their tests measure while strictly advising clinical review.
    
    When a laboratory sheet (image or text) is provided, you must extract:
    1. A simplified name for the test panel.
    2. A brief, patient-friendly clinical executive summary in 2-3 sentences.
    3. An array of metrics. Each metric must contain: 
       - "name" (e.g. Total Cholesterol)
       - "value" (MUST be a raw numerical value or null if non-numeric)
       - "unit" (e.g. mg/dL)
       - "minRef" (lower boundary of reference range, numeric)
       - "maxRef" (upper boundary of reference range, numeric)
       - "status" ("Normal", "High", "Low", or "Critical")
       - "explanation" (one simple, plain-English sentence of what this metric measures)
    4. An array of 3 realistic, non-drug-based preventative lifestyle precautions to take care of.
    5. An array of 2 clinical next steps (e.g. follow-up retests, secondary scans).
    6. An array of 2 educational, patient-led questions to ask their actual physician.
    
    IMPORTANT SAFETY CONTROLS: 
    - Never write in a diagnostic voice (e.g., write "This may be associated with subclinical thyroid fatigue" instead of "You have hypothyroidism").
    - Always output raw valid JSON following the schema.`;

    const userPrompt = `Strictly extract and analyze this diagnostic health report. Convert findings to the defined structure. Document source data: ${type === 'text' ? fileOrText : 'See attached medical test scan.'}`;

    try {
      let payload = {
        contents: [],
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: {
            type: "OBJECT",
            properties: {
              reportName: { type: "STRING" },
              overallSummary: { type: "STRING" },
              metrics: {
                type: "ARRAY",
                items: {
                  type: "OBJECT",
                  properties: {
                    name: { type: "STRING" },
                    value: { type: "NUMBER" },
                    unit: { type: "STRING" },
                    minRef: { type: "NUMBER" },
                    maxRef: { type: "NUMBER" },
                    status: { type: "STRING" },
                    explanation: { type: "STRING" }
                  },
                  required: ["name", "value", "unit", "minRef", "maxRef", "status", "explanation"]
                }
              },
              precautions: {
                type: "ARRAY",
                items: { type: "STRING" }
              },
              recommendedNextSteps: {
                type: "ARRAY",
                items: { type: "STRING" }
              },
              questionsForDoctor: {
                type: "ARRAY",
                items: { type: "STRING" }
              }
            },
            required: ["reportName", "overallSummary", "metrics", "precautions", "recommendedNextSteps", "questionsForDoctor"]
          }
        },
        systemInstruction: {
          parts: [{ text: systemPrompt }]
        }
      };

      if (type === 'text') {
        payload.contents = [{
          role: "user",
          parts: [{ text: userPrompt }]
        }];
      } else {
        const base64Data = await fileToBase64(fileOrText);
        payload.contents = [{
          role: "user",
          parts: [
            { text: userPrompt },
            {
              inlineData: {
                mimeType: fileOrText.type,
                data: base64Data
              }
            }
          ]
        }];
      }

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`Connection failed. Server replied with status code ${response.status}`);
      }

      const result = await response.json();
      const extractedText = result?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (extractedText) {
        const parsedReport = JSON.parse(extractedText);
        
        const mappedReport = {
          id: `custom-${Date.now()}`,
          name: parsedReport.reportName || 'Extracted Laboratory Analysis',
          date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
          overallSummary: parsedReport.overallSummary,
          metrics: parsedReport.metrics,
          precautions: parsedReport.precautions,
          recommendedNextSteps: parsedReport.recommendedNextSteps,
          questionsForDoctor: parsedReport.questionsForDoctor
        };

        setCurrentReport(mappedReport);
        setIsPastingText(false);
        setCustomReportText('');
        
        setChatHistory([
          {
            role: 'assistant',
            text: `I have successfully parsed and populated your custom lab report: **${mappedReport.name}**. I've extracted ${mappedReport.metrics.length} distinct laboratory measurements. \n\nWhat would you like me to translate, explain, or help you prepare for your doctor?`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      } else {
        throw new Error("Unable to extract valid structured fields from the medical file.");
      }

    } catch (err) {
      console.error(err);
      setUploadError(`Failed to process report: ${err.message || 'Make sure the image is clearly lit and legible.'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleUploadOrParse(e, 'image', file);
    }
  };

  const handleTextSubmit = (e) => {
    e.preventDefault();
    if (!customReportText.trim()) return;
    handleUploadOrParse(e, 'text', customReportText);
  };

  const handleSendChat = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMessage = {
      role: 'user',
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatHistory(prev => [...prev, userMessage]);
    setInputText('');
    setSendingChat(true);

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;
    
    const chatSystemInstruction = `You are an empathetic, clinical test co-pilot helping a patient read their lab report: "${currentReport.name}".
    
    Current patient report parameters:
    - Overall summary: "${currentReport.overallSummary}"
    - Extracted metrics: ${JSON.stringify(currentReport.metrics)}
    - Cautions & Precautions: ${JSON.stringify(currentReport.precautions)}
    - Actionable next steps: ${JSON.stringify(currentReport.recommendedNextSteps)}
    
    Strict Safety Guidelines:
    1. NEVER make a definitive clinical diagnosis. If the patient asks "Do I have liver failure?" say: "These values show elevated markers which can be associated with liver stress, but a formal clinical diagnosis must be conducted by your primary care physician."
    2. Ground all definitions in plain English. Translate medical terms dynamically.
    3. Emphasize diet, lifestyle modifications, and prepare structured, friendly checklists the patient can print out or take to their health consultation.
    4. Maintain an objective, educational, supportive tone. Never cause unnecessary panic.
    5. At the end of major logical answers, reinforce safety by suggesting they check in with their doctor.`;

    const formattedHistory = chatHistory.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));

    formattedHistory.push({
      role: 'user',
      parts: [{ text: inputText }]
    });

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: formattedHistory,
          systemInstruction: {
            parts: [{ text: chatSystemInstruction }]
          }
        })
      });

      if (!response.ok) {
        throw new Error("Unable to establish conversation stream with clinical assistant.");
      }

      const result = await response.json();
      const responseText = result?.candidates?.[0]?.content?.parts?.[0]?.text || "I was unable to fully parse that. Could you please rephrase your request?";

      setChatHistory(prev => [
        ...prev,
        {
          role: 'assistant',
          text: responseText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);

    } catch (err) {
      console.error(err);
      setChatHistory(prev => [
        ...prev,
        {
          role: 'assistant',
          text: "Communication interrupted. Please verify your internet connection, confirm your API key is correctly typed, and try asking your clinical question again.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setSendingChat(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInputText(suggestion);
  };

  const renderRangeGauge = (metric) => {
    const { value, minRef, maxRef, status } = metric;
    if (typeof value !== 'number' || typeof minRef !== 'number' || typeof maxRef !== 'number') {
      return null;
    }

    const scaleMin = minRef * 0.5;
    const scaleMax = maxRef * 1.5;
    const rangeSpan = scaleMax - scaleMin;
    
    const normalStartPercent = ((minRef - scaleMin) / rangeSpan) * 100;
    const normalWidthPercent = ((maxRef - minRef) / rangeSpan) * 100;
    const markerPercent = Math.min(Math.max(((value - scaleMin) / rangeSpan) * 100, 2), 98);

    let markerColor = 'bg-teal-400 border-teal-200';
    if (status.toLowerCase() === 'high' || status.toLowerCase() === 'critical') markerColor = 'bg-amber-500 border-amber-300 ring-2 ring-amber-500/20';
    if (status.toLowerCase() === 'low') markerColor = 'bg-sky-400 border-sky-200 ring-2 ring-sky-400/20';

    return (
      <div className="mt-3.5 space-y-1">
        <div className="flex justify-between text-[9px] text-slate-500">
          <span>{scaleMin.toFixed(1)}</span>
          <span className="font-semibold text-slate-400">Reference: {minRef} - {maxRef}</span>
          <span>{scaleMax.toFixed(1)}</span>
        </div>
        <div className="relative h-2 bg-slate-800 rounded-full overflow-visible">
          {/* Normal Zone Area Highlight */}
          <div 
            className="absolute h-full bg-emerald-500/20 rounded-md border-x border-emerald-500/10"
            style={{ left: `${normalStartPercent}%`, width: `${normalWidthPercent}%` }}
          />
          {/* Active Value Indicator Pin */}
          <div 
            className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full border shadow ${markerColor} transition-all duration-500`}
            style={{ left: `${markerPercent}%` }}
            title={`Value: ${value}`}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-teal-500 selection:text-slate-950">
      
      {}
      <header className="border-b border-slate-900 bg-slate-950/90 backdrop-blur sticky top-0 z-50 px-4 py-3.5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-tr from-teal-500 to-cyan-600 rounded-xl shadow-lg shadow-teal-500/10">
              <HeartPulse className="h-5 w-5 text-slate-950 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-teal-400 to-cyan-300 bg-clip-text text-transparent">
                  MediPulse AI
                </h1>
                <span className="px-1.5 py-0.5 bg-slate-900 border border-slate-850 rounded text-[9px] text-teal-400 font-bold tracking-wider uppercase">
                  Patient Companion
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">Intelligent Medical Test Interpreter & Clinical Chat Agent</p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <div className="relative flex items-center bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 w-full max-w-xs">
              <Sliders className="h-3.5 w-3.5 text-teal-400 mr-2" />
              <input
                type="password"
                placeholder="Optional Gemini API Key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="bg-transparent text-xs text-slate-100 placeholder-slate-500 focus:outline-none w-full"
              />
              <span className="absolute -top-2 right-2 bg-slate-900 px-1.5 py-0.5 rounded text-[8px] text-teal-400 border border-teal-500/20">
                {apiKey ? 'API Active' : 'Sandbox Simulation Mode'}
              </span>
            </div>
          </div>

        </div>
      </header>

      {}
      <div className="bg-amber-950/20 border-b border-amber-900/40 py-2.5 px-4 text-center">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 text-xs text-amber-300/95">
          <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0" />
          <span className="font-bold uppercase tracking-wider text-[10px] bg-amber-400/15 px-1.5 py-0.5 rounded">
            Patient Advisory
          </span>
          <span>This portal parses indicators strictly for educational reference and doctor preparation. Final diagnostics require consultation with a certified healthcare professional.</span>
        </div>
      </div>

      {}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 grid grid-cols-1 lg:grid-cols-12 gap-5 overflow-hidden">
        
        {/* Left Workspace: Interactive Lab Diagnostics (7 Columns) */}
        <div className="lg:col-span-7 flex flex-col gap-4 overflow-y-auto pr-1 max-h-[calc(100vh-160px)] scrollbar-thin">
          
          {/* Intake Ingestion Card */}
          <div className="bg-slate-900/50 border border-slate-900 rounded-xl p-4 shadow-sm backdrop-blur">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Layers className="h-4 w-4 text-teal-400" />
                Select Patient Panel or Upload Report
              </span>
              <div className="flex flex-wrap gap-1.5">
                {SAMPLE_REPORTS.map((sample) => (
                  <button
                    key={sample.id}
                    onClick={() => handleSelectSample(sample)}
                    className={`px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                      currentReport.id === sample.id
                        ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/10'
                        : 'bg-slate-950 text-slate-300 hover:bg-slate-900 border border-slate-800'
                    }`}
                  >
                    {sample.id === 'lipid-panel' ? 'Lipid Profile' : sample.id === 'thyroid-panel' ? 'Thyroid Function' : 'Metabolic Screen'}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
              
              {/* Document Image Intake Dropzone */}
              <div className="relative border-2 border-dashed border-slate-800 hover:border-teal-500/50 rounded-xl p-4 text-center cursor-pointer transition-colors group bg-slate-950/20">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center justify-center gap-1.5">
                  <div className="p-2 bg-slate-900 rounded-xl group-hover:bg-slate-800 transition-colors border border-slate-800">
                    <Upload className="h-5 w-5 text-teal-400" />
                  </div>
                  <span className="text-xs font-bold text-slate-200">Upload Lab Scan / Photo</span>
                  <p className="text-[10px] text-slate-500">Supports PNG, JPEG with automatic extraction</p>
                </div>
              </div>

              {/* Text Paste Area */}
              <div className="bg-slate-950/40 border border-slate-900 rounded-xl p-4 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-200 mb-1">Paste Raw Results</h4>
                  <p className="text-[10px] text-slate-500 mb-2">Have portal findings copied? Paste them directly.</p>
                </div>
                {!isPastingText ? (
                  <button 
                    onClick={() => setIsPastingText(true)}
                    className="w-full py-1.5 bg-slate-900 hover:bg-slate-850 text-slate-300 hover:text-white text-xs font-semibold rounded-lg transition-all border border-slate-800"
                  >
                    Open Text Importer
                  </button>
                ) : (
                  <div className="flex flex-col gap-2">
                    <textarea
                      placeholder="e.g. Fasting Blood Glucose: 112 mg/dL. HbA1c: 5.9%"
                      value={customReportText}
                      onChange={(e) => setCustomReportText(e.target.value)}
                      rows={2}
                      className="bg-slate-950 text-xs text-slate-200 border border-slate-800 rounded-lg p-2 focus:outline-none focus:border-teal-500 resize-none"
                    />
                    <div className="flex items-center gap-1.5 justify-end">
                      <button 
                        onClick={() => setIsPastingText(false)}
                        className="px-2.5 py-1 text-[10px] text-slate-400 hover:text-white"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={handleTextSubmit}
                        disabled={!customReportText.trim() || loading}
                        className="px-3 py-1 bg-teal-500 hover:bg-teal-400 disabled:bg-slate-800 text-slate-950 font-bold text-[10px] rounded"
                      >
                        {loading ? 'Analyzing...' : 'Parse'}
                      </button>
                    </div>
                  </div>
                )}
              </div>

            </div>

            {uploadError && (
              <div className="mt-3 bg-red-950/20 border border-red-900/30 rounded-lg p-3 text-xs text-red-400 flex items-start gap-2 animate-fadeIn">
                <AlertTriangle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                <span>{uploadError}</span>
              </div>
            )}
          </div>

          {}
          {loading ? (
            <div className="bg-slate-900/50 border border-slate-900 rounded-xl p-16 text-center flex flex-col items-center justify-center gap-4 animate-pulse">
              <Loader2 className="h-8 w-8 text-teal-400 animate-spin" />
              <div>
                <p className="text-sm font-semibold text-slate-200">Interpreting Lab Biomarkers...</p>
                <p className="text-xs text-slate-500 mt-1">Transcribing and cross-referencing parameters with medical definitions...</p>
              </div>
            </div>
          ) : (
            <div className="bg-slate-900/30 border border-slate-900 rounded-xl p-5 shadow-sm space-y-5">
              
              {/* Lab Metadata Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="px-2 py-0.5 bg-teal-950 text-teal-300 border border-teal-800/60 rounded text-[9px] uppercase font-bold tracking-wider">
                      Medical Panel Result
                    </span>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Analyzed: {currentReport.date}
                    </span>
                  </div>
                  <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-teal-400 shrink-0" />
                    {currentReport.name}
                  </h2>
                </div>
                
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => window.print()}
                    className="p-1.5 bg-slate-950 hover:bg-slate-900 text-slate-400 hover:text-white rounded-lg border border-slate-800 transition-colors"
                    title="Print Panel Summary"
                  >
                    <Printer className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Patient Friendly Executive Educational Summary */}
              <div className="bg-slate-950/60 border border-slate-850 rounded-xl p-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 rounded-full blur-2xl" />
                <h3 className="text-xs font-bold text-teal-400 flex items-center gap-1.5 mb-2">
                  <Activity className="h-3.5 w-3.5" />
                  Overall Summary
                </h3>
                <p className="text-xs leading-relaxed text-slate-300 font-medium">
                  {currentReport.overallSummary}
                </p>
              </div>

              {}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <span>Measurements & Reference Boundaries</span>
                  </h3>
                  <span className="text-[10px] text-teal-400 bg-teal-950/50 border border-teal-900/60 px-2 py-0.5 rounded-full font-semibold">
                    Click any card to discuss
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentReport.metrics.map((metric, idx) => {
                    const isHigh = metric.status?.toLowerCase() === 'high';
                    const isLow = metric.status?.toLowerCase() === 'low';
                    const isCritical = metric.status?.toLowerCase() === 'critical';
                    
                    let statusBadge = 'bg-slate-950 text-slate-400 border-slate-800';
                    if (isHigh) statusBadge = 'bg-amber-950/45 text-amber-300 border-amber-900/50';
                    if (isLow) statusBadge = 'bg-sky-950/45 text-sky-300 border-sky-900/50';
                    if (isCritical) statusBadge = 'bg-red-950/45 text-red-300 border-red-900/50';
                    if (metric.status?.toLowerCase() === 'normal') statusBadge = 'bg-emerald-950/45 text-emerald-300 border-emerald-900/50';

                    return (
                      <div 
                        key={idx}
                        onClick={() => handleSuggestionClick(`Explain what my "${metric.name}" value of ${metric.value} ${metric.unit} means and standard precautions for it.`)}
                        className="bg-slate-950/40 hover:bg-slate-900 border border-slate-900/80 hover:border-slate-800 rounded-xl p-4 cursor-pointer transition-all duration-200 group relative"
                      >
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <span className="text-xs font-bold text-slate-200 group-hover:text-teal-400 transition-colors">
                            {metric.name}
                          </span>
                          <span className={`px-2 py-0.5 text-[8px] font-extrabold uppercase tracking-widest border rounded-md ${statusBadge}`}>
                            {metric.status}
                          </span>
                        </div>

                        <div className="flex items-baseline gap-1.5 mb-1.5">
                          <span className="text-xl font-extrabold text-slate-100">{metric.value}</span>
                          <span className="text-[11px] text-slate-400 font-semibold">{metric.unit}</span>
                        </div>

                        <p className="text-[10px] text-slate-400 leading-relaxed">
                          {metric.explanation}
                        </p>

                        {/* Interactive Diagnostic Gauge */}
                        {renderRangeGauge(metric)}
                      </div>
                    );
                  })}
                </div>
              </div>

              {}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                
                <div className="bg-slate-950/40 border border-slate-900 rounded-xl p-4">
                  <h4 className="text-xs font-bold text-slate-300 flex items-center gap-1.5 mb-3">
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                    What Need to be Careful About
                  </h4>
                  <ul className="space-y-2.5 text-xs text-slate-300">
                    {currentReport.precautions.map((prec, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="mt-1 w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                        <span>{prec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-950/40 border border-slate-900 rounded-xl p-4">
                  <h4 className="text-xs font-bold text-slate-300 flex items-center gap-1.5 mb-3">
                    <Stethoscope className="h-4 w-4 text-teal-400" />
                    Recommended Next Steps
                  </h4>
                  <ul className="space-y-2.5 text-xs text-slate-300">
                    {currentReport.recommendedNextSteps.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="mt-1 w-1.5 h-1.5 rounded-full bg-teal-400 shrink-0" />
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Patient Doctor Consultation Blueprint Questions */}
              <div className="bg-slate-950/30 border border-slate-900 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <ClipboardList className="h-4 w-4 text-indigo-400" />
                  <h4 className="text-xs font-bold text-slate-200 uppercase tracking-widest">
                    Questions to Discuss with Your Doctor or Physician
                  </h4>
                </div>
                <div className="space-y-2">
                  {currentReport.questionsForDoctor.map((question, idx) => (
                    <div 
                      key={idx}
                      onClick={() => handleSuggestionClick(question)}
                      className="bg-slate-950/60 hover:bg-slate-900 p-3 rounded-lg border border-slate-850 hover:border-slate-800 cursor-pointer text-xs text-slate-300 flex items-start gap-3 group transition-all"
                    >
                      <span className="text-[10px] font-bold bg-slate-800 text-teal-300 px-1.5 py-0.5 rounded shrink-0">
                        Q{idx+1}
                      </span>
                      <span className="group-hover:text-slate-100 transition-colors">
                        {question}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Right Workspace: Chat Co-Pilot Agent Interface (5 Columns) */}
        <div className="lg:col-span-5 flex flex-col bg-slate-900/40 border border-slate-900 rounded-xl overflow-hidden h-[calc(100vh-160px)]">
          
          {/* Chat Companion Header */}
          <div className="bg-slate-950 border-b border-slate-900 px-4 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 bg-teal-500/10 rounded-lg">
                <Bot className="h-4.5 w-4.5 text-teal-400" />
              </div>
              <div>
                <h3 className="text-xs font-extrabold tracking-widest uppercase text-slate-100">Medical Chat Agent</h3>
                <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-teal-400 animate-pulse"></span>
                  Grounded in current loaded parameters
                </p>
              </div>
            </div>

            <button 
              onClick={() => {
                setChatHistory([
                  {
                    role: 'assistant',
                    text: "Medical panel reset. How can I help you digest your diagnostic metrics today?",
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                  }
                ]);
              }}
              title="Reset Conversation"
              className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-900 transition-colors border border-slate-850"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          </div>

          {}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950/15">
            {chatHistory.map((msg, index) => {
              const isUser = msg.role === 'user';
              return (
                <div key={index} className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
                  
                  {!isUser && (
                    <div className="h-8 w-8 rounded-lg bg-teal-950/60 border border-teal-900/50 flex items-center justify-center shrink-0">
                      <Bot className="h-4 w-4 text-teal-400" />
                    </div>
                  )}

                  <div className={`max-w-[85%] rounded-xl p-3.5 text-xs leading-relaxed ${
                    isUser 
                      ? 'bg-gradient-to-tr from-teal-500 to-cyan-600 text-slate-950 font-medium rounded-br-none shadow-md shadow-teal-500/5' 
                      : 'bg-slate-900 text-slate-300 rounded-bl-none border border-slate-800'
                  }`}>
                    <div className="font-bold text-[9px] uppercase tracking-wider mb-1.5 opacity-75 flex justify-between items-center">
                      <span>{isUser ? 'Patient Query' : 'Medical Co-Pilot'}</span>
                      <span className="font-normal normal-case opacity-60">{msg.timestamp}</span>
                    </div>
                    
                    <div className="space-y-1.5 whitespace-pre-wrap">
                      {msg.text}
                    </div>
                  </div>

                  {isUser && (
                    <div className="h-8 w-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0">
                      <User className="h-4 w-4 text-slate-400" />
                    </div>
                  )}

                </div>
              );
            })}

            {sendingChat && (
              <div className="flex gap-3 justify-start">
                <div className="h-8 w-8 rounded-lg bg-teal-950/60 border border-teal-900/50 flex items-center justify-center shrink-0">
                  <Bot className="h-4 w-4 text-teal-400" />
                </div>
                <div className="bg-slate-900 text-slate-300 border border-slate-850 rounded-xl rounded-bl-none p-3.5 flex items-center gap-2">
                  <div className="flex space-x-1">
                    <span className="h-1.5 w-1.5 bg-teal-400 rounded-full animate-bounce"></span>
                    <span className="h-1.5 w-1.5 bg-teal-400 rounded-full animate-bounce delay-75"></span>
                    <span className="h-1.5 w-1.5 bg-teal-400 rounded-full animate-bounce delay-150"></span>
                  </div>
                  <span className="text-[10px] text-slate-400">Reviewing clinical definitions...</span>
                </div>
              </div>
            )}
            
            <div ref={chatEndRef} />
          </div>

          {}
          <div className="p-3 border-t border-slate-900 bg-slate-950">
            <span className="text-[9px] text-slate-500 block mb-1.5 uppercase tracking-widest font-bold">Suggested Questions:</span>
            <div className="flex flex-wrap gap-1.5">
              <button 
                onClick={() => handleSuggestionClick("What standard lifestyle and nutrition habits support optimal cholesterol values?")}
                className="text-[10px] bg-slate-900 hover:bg-slate-850 text-slate-300 border border-slate-800 px-2.5 py-1 rounded-md transition-all font-medium text-left"
              >
                Dietary & Habits
              </button>
              <button 
                onClick={() => handleSuggestionClick("What does high Fasting Glucose indicate and when should I follow up?")}
                className="text-[10px] bg-slate-900 hover:bg-slate-850 text-slate-300 border border-slate-800 px-2.5 py-1 rounded-md transition-all font-medium text-left"
              >
                Fasting Glucose Info
              </button>
              <button 
                onClick={() => handleSuggestionClick("Suggest clinical biomarkers to monitor alongside my current TSH results.")}
                className="text-[10px] bg-slate-900 hover:bg-slate-850 text-slate-300 border border-slate-800 px-2.5 py-1 rounded-md transition-all font-medium text-left"
              >
                Associated Biomarkers
              </button>
            </div>
          </div>

          {/* Chat Form Input Panel */}
          <div className="p-3 border-t border-slate-900 bg-slate-900/30">
            <form onSubmit={handleSendChat} className="flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask about lipid ratios, fasting blood glucose, or thyroid metrics..."
                className="flex-1 bg-slate-950 text-xs text-slate-200 placeholder-slate-650 border border-slate-900 rounded-lg px-3 py-2.5 focus:outline-none focus:border-teal-500"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || sendingChat}
                className="px-4 bg-teal-500 hover:bg-teal-400 disabled:bg-slate-800 text-slate-950 font-bold text-xs rounded-lg transition-colors flex items-center justify-center shrink-0"
              >
                {sendingChat ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </button>
            </form>
            <div className="text-[10px] text-slate-500 text-center mt-2 flex items-center justify-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-teal-400" />
              <span>Double-check findings and share reports with your primary care provider.</span>
            </div>
          </div>

        </div>

      </main>

      {}
      <footer className="border-t border-slate-900 bg-slate-950 py-3 text-center px-4 text-[10px] text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>MediPulse Automated Diagnostics Translation. All parsed materials are for patient education only.</span>
          <span className="flex items-center gap-1 text-slate-400 font-semibold">
            Not a clinical diagnostic device. Consult with your doctor or physician.
          </span>
        </div>
      </footer>

    </div>
  );
}
