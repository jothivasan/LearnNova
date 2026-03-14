import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Copy, Upload, CheckCircle2, AlertTriangle, Zap } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Topic, PlannerDay } from '../types';
import { useNavigate } from 'react-router-dom';

export function CreatePlan() {
  const [topic, setTopic] = useState('');
  const [duration, setDuration] = useState('30');
  const [level, setLevel] = useState('Beginner');
  const [promptCopied, setPromptCopied] = useState(false);
  const [csvData, setCsvData] = useState('');
  const [error, setError] = useState('');
  
  const setPlan = useStore((state) => state.setPlan);
  const navigate = useNavigate();

  const generatedPrompt = `Act as an expert curriculum designer. Create a ${duration}-day learning plan for ${topic || '[TOPIC]'} at a ${level} level.
Output the plan STRICTLY as a CSV with the following columns:
Day,Topic,Concepts,Practice,EstimatedTime

Example:
1,JS Basics,Variables and Data Types,3 Problems,60
2,Functions,Arrow Functions,4 Problems,90

Do not include any other text, just the CSV.`;

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(generatedPrompt);
    setPromptCopied(true);
    setTimeout(() => setPromptCopied(false), 2000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCsvData(event.target?.result as string);
      };
      reader.readAsText(file);
    }
  };

  const parseCSV = () => {
    try {
      setError('');
      if (!csvData.trim()) {
        setError('CSV data is empty.');
        return;
      }

      const lines = csvData.trim().split('\n');
      if (lines.length < 2) {
        setError('CSV must contain a header and at least one data row.');
        return;
      }

      const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
      
      const requiredHeaders = ['day', 'topic', 'concepts', 'practice', 'estimatedtime'];
      const hasAllHeaders = requiredHeaders.every(h => headers.includes(h));
      
      if (!hasAllHeaders) {
        setError('CSV is missing required columns. Expected: Day, Topic, Concepts, Practice, EstimatedTime');
        return;
      }

      const dayIdx = headers.indexOf('day');
      const topicIdx = headers.indexOf('topic');
      const conceptsIdx = headers.indexOf('concepts');
      const practiceIdx = headers.indexOf('practice');
      const timeIdx = headers.indexOf('estimatedtime');

      const newTopics: Topic[] = [];
      const newPlannerDays: PlannerDay[] = [];

      for (let i = 1; i < lines.length; i++) {
        const row = lines[i].match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || lines[i].split(',');
        
        if (row.length < 5) continue;

        const dayNum = parseInt(row[dayIdx].replace(/"/g, '').trim(), 10);
        const topicName = row[topicIdx].replace(/"/g, '').trim();
        const concepts = row[conceptsIdx].replace(/"/g, '').trim();
        const practice = row[practiceIdx].replace(/"/g, '').trim();
        const time = parseInt(row[timeIdx].replace(/"/g, '').trim(), 10) || 60;

        const topicId = `t_${Date.now()}_${i}`;

        newTopics.push({
          id: topicId,
          name: topicName,
          difficulty: level === 'Beginner' ? 'Easy' : level === 'Intermediate' ? 'Medium' : 'Hard',
          estimatedTime: time,
          masteryStatus: 'NotStarted'
        });

        newPlannerDays.push({
          dayNumber: dayNum,
          topicId: topicId,
          dailyTasks: [concepts, practice],
          plannedTimeline: 'Anytime',
          studyDuration: 0,
          theoryCompleted: false,
          practiceUnlocked: false,
          completionStatus: 'Pending'
        });
      }

      if (newPlannerDays.length === 0) {
        setError('No valid data rows found in CSV.');
        return;
      }

      setPlan(newTopics, newPlannerDays);
      navigate('/planner');
    } catch (err) {
      setError('Failed to parse CSV. Ensure it matches the requested format.');
      console.error(err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4 relative border-b border-border pb-8"
      >
        <div className="flex items-center gap-5 relative z-10">
          <div className="w-12 h-12 bg-accent flex items-center justify-center border-2 border-dark text-dark transform -rotate-3 brutal-shadow-sm">
            <Zap className="w-6 h-6 fill-current" />
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-text leading-none uppercase tracking-tight">
            Initialize<br/>
            <span className="text-transparent text-stroke-accent">Protocol</span>
          </h1>
        </div>
        <p className="font-display bg-dark inline-block border border-border px-3 py-1.5 text-text text-xs uppercase tracking-widest relative z-10 ml-16">
          Generate learning directive
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Step 1: Generate Prompt */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-panel p-6 md:p-8 space-y-6 brutal-shadow-sm bg-surface relative"
        >
          <div className="absolute top-0 right-0 w-24 h-24 border-b border-l border-border opacity-20 pointer-events-none"></div>

          <div className="flex items-center space-x-5 border-b border-border pb-4">
            <div className="w-10 h-10 bg-dark flex items-center justify-center text-accent font-display font-bold text-xl border-2 border-accent brutal-shadow-sm">01</div>
            <h2 className="text-2xl font-display font-bold uppercase text-text tracking-tight">System Prompt</h2>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-[10px] font-display font-bold text-accent uppercase tracking-widest border-l-2 border-accent pl-2">Target Subject</label>
              <input 
                type="text" 
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. RUST, MACHINE LEARNING"
                className="w-full bg-dark border border-border p-4 text-text font-display text-base focus:border-accent focus:outline-none transition-all uppercase placeholder:text-text-muted"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-[10px] font-display font-bold text-accent uppercase tracking-widest border-l-2 border-accent pl-2">Duration (Days)</label>
                <input 
                  type="number" 
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  min="1"
                  max="100"
                  className="w-full bg-dark border border-border p-4 text-text font-display text-base focus:border-accent focus:outline-none transition-all placeholder:text-text-muted"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-display font-bold text-accent uppercase tracking-widest border-l-2 border-accent pl-2">Skill Level</label>
                <select 
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className="w-full bg-dark border border-border p-4 text-text font-display text-base focus:border-accent focus:outline-none transition-all appearance-none uppercase cursor-pointer"
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>
            </div>

            <div className="pt-8 space-y-4 relative">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <label className="text-xs font-display font-bold text-text uppercase tracking-widest">Compiler Output</label>
                <button 
                  onClick={handleCopyPrompt}
                  className="text-xs font-display font-bold text-accent hover:text-dark hover:bg-accent flex items-center space-x-2 transition-colors bg-dark px-4 py-2 border border-accent"
                >
                  {promptCopied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span className="uppercase">{promptCopied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <textarea 
                readOnly
                value={generatedPrompt}
                className="w-full h-56 bg-dark border border-border p-5 text-text-muted font-sans text-sm resize-none focus:outline-none leading-relaxed"
              />
            </div>
          </div>
        </motion.div>

        {/* Step 2: Upload CSV */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-panel p-6 md:p-8 space-y-6 brutal-shadow-sm bg-surface relative"
        >
          <div className="flex items-center space-x-5 border-b border-border pb-4">
            <div className="w-10 h-10 bg-dark flex items-center justify-center text-accent font-display font-bold text-xl border-2 border-accent brutal-shadow-sm">02</div>
            <h2 className="text-2xl font-display font-bold uppercase text-text tracking-tight">Data Integration</h2>
          </div>

          <div className="space-y-6">
            <p className="text-sm text-text-muted leading-relaxed font-sans border-l-2 border-border pl-3 italic">
              Deploy the generated prompt to an external AI oracle. Return the resulting CSV data to this terminal segment.
            </p>

            <div className="space-y-3">
              <label className="text-[10px] font-display font-bold text-text uppercase tracking-widest border-l-2 border-accent pl-2">Data Stream (CSV format)</label>
              <textarea 
                value={csvData}
                onChange={(e) => setCsvData(e.target.value)}
                placeholder="Day,Topic,Concepts,Practice,EstimatedTime&#10;1,JS Basics,Variables,3 Problems,60"
                className="w-full h-48 bg-dark border border-border p-4 text-text font-sans text-xs focus:border-accent focus:outline-none transition-all leading-relaxed whitespace-pre"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="cursor-pointer flex items-center space-x-2 text-xs font-display font-bold uppercase text-text-muted hover:text-dark hover:bg-accent transition-colors bg-dark px-5 py-3 border border-border hover:border-accent w-full justify-center">
                <Upload className="w-4 h-4" />
                <span>Upload .CSV File</span>
                <input 
                  type="file" 
                  accept=".csv" 
                  onChange={handleFileUpload}
                  className="hidden" 
                />
              </label>
            </div>

            {error && (
              <div className="p-4 border border-danger bg-danger/10 flex items-start space-x-3 text-danger font-sans">
                <AlertTriangle className="w-5 h-5 mt-0.5 shrink-0" />
                <span className="text-xs font-bold">{error}</span>
              </div>
            )}

            <button 
              onClick={parseCSV}
              className="w-full py-4 bg-accent text-dark font-display font-bold text-base tracking-widest uppercase brutal-shadow-sm hover:bg-white transition-all mt-6"
            >
              Sequence Startup
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
