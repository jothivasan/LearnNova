import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Copy, Upload, CheckCircle2, AlertTriangle, Zap, ChevronDown } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Topic, PlannerDay } from '../types';
import { useNavigate } from 'react-router-dom';

const GOAL_TYPES = [
  'Interview Preparation',
  'Skill Learning',
  'Career Transition',
  'Academic Study',
  'Certification Prep',
  'Project-Based Learning',
];

const LEVEL_OPTIONS = ['Beginner', 'Intermediate', 'Advanced'];

export function CreatePlan() {
  // Core inputs
  const [topic, setTopic] = useState('');
  const [duration, setDuration] = useState('30');
  const [level, setLevel] = useState('Beginner');
  const [goalType, setGoalType] = useState('Skill Learning');

  // Learner profile inputs
  const [experience, setExperience] = useState('');
  const [studyHours, setStudyHours] = useState('1-2');
  const [weakAreas, setWeakAreas] = useState('');
  const [targetRoles, setTargetRoles] = useState('');
  const [preferFreeResources, setPreferFreeResources] = useState(true);

  // UI state
  const [promptCopied, setPromptCopied] = useState(false);
  const [csvData, setCsvData] = useState('');
  const [error, setError] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const setPlan = useStore((state) => state.setPlan);
  const navigate = useNavigate();

  // Build the dynamic prompt
  const buildPrompt = () => {
    const topicDisplay = topic || '[TOPIC]';
    const expDisplay = experience || 'no prior experience';
    const weakDisplay = weakAreas || 'fundamentals and core concepts';
    const targetDisplay = targetRoles || 'relevant roles in the field';
    const resourceType = preferFreeResources ? 'free resources only' : 'any resources (free or paid)';

    // Compute layers based on duration
    const totalDays = parseInt(duration) || 30;
    const foundationEnd = Math.max(1, Math.floor(totalDays * 0.23));
    const intermediateEnd = Math.max(foundationEnd + 1, Math.floor(totalDays * 0.47));
    const advancedEnd = Math.max(intermediateEnd + 1, Math.floor(totalDays * 0.70));

    return `You are a ${topicDisplay} specialist and expert curriculum designer. Your task is to create a comprehensive, actionable ${duration}-day ${goalType.toLowerCase()} guide for someone with ${expDisplay} preparing to master ${topicDisplay} at a ${level} level.

**Learner's Profile:**

- Current experience: ${expDisplay}
- Studying ${studyHours} hours per day
- Skill level: ${level}
- Weakest areas: ${weakDisplay}
- Target: ${targetDisplay}
- Prefers ${resourceType}

**The ${duration}-Day Structure (4 Progression Layers):**

_Foundation Layer (Days 1-${foundationEnd}):_ Core fundamentals of ${topicDisplay}; essential concepts, terminology, and basic skills required for the field.

_Intermediate Layer (Days ${foundationEnd + 1}-${intermediateEnd}):_ Deeper exploration of ${topicDisplay}; advanced concepts, patterns, and practical application of knowledge.

_Advanced Layer (Days ${intermediateEnd + 1}-${advancedEnd}):_ Complex topics, optimization techniques, system design, and real-world problem solving in ${topicDisplay}.

_Mastery & Readiness Layer (Days ${advancedEnd + 1}-${totalDays}):_ Final preparation including practice challenges, mock scenarios, review of all concepts, and readiness assessment.

**What to Provide for Each Day:**

For each day, deliver:

1. **Day X: [Topic]** — One focused primary topic
2. **Core Concepts** — 2-3 key concepts explained concisely
3. **Coding/Practice Challenges** — 3 specific challenges labeled easy/medium/hard with working solutions
4. **Resources** — Direct URLs to documentation, tutorials, and practice platforms (${resourceType})
5. **Time Breakdown** — How to spend ${studyHours} hours (e.g., "30 min concept learning + 60 min practice + 15 min review")
6. **End-of-Day Checkpoint** — What the learner should be able to do/explain by day's end

**Weekly Checkpoints (Every 7 days):**

At the end of each week, include a mock assessment scenario that tests all concepts covered that week.

**IMPORTANT — CSV Output Requirement:**

After generating the full guide, also output a CSV summary at the very end with the following columns:
Day,Topic,Concepts,Practice,EstimatedTime

Example CSV rows:
1,${topicDisplay} Basics,Core fundamentals and terminology,3 Problems,60
2,Essential Concepts,Key principles and patterns,4 Problems,90

Do not include any other text after the CSV block.`;
  };

  const generatedPrompt = buildPrompt();

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
        const row = lines[i].match(/(\".*?\"|[^",\s]+)(?=\s*,|\s*$)/g) || lines[i].split(',');

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
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-3 relative border-b border-border pb-6"
      >
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent shadow-sm">
            <Zap className="w-6 h-6" />
          </div>
          <h1 className="text-3xl md:text-5xl font-display font-bold text-text leading-none tracking-tight">
            Create<br/>
            <span className="text-accent">Learning Plan</span>
          </h1>
        </div>
        <p className="font-sans font-medium bg-surface-light text-text-muted px-4 py-1.5 rounded-full text-sm inline-block relative z-10 ml-16">
          Setup your plan
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Step 1: Configure & Generate Prompt */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-surface border border-border rounded-2xl p-6 md:p-8 space-y-6 shadow-xl relative"
          >
            <div className="flex items-center space-x-4 border-b border-border pb-4">
              <div className="w-10 h-10 rounded-full bg-surface-light flex items-center justify-center text-accent font-sans font-bold text-sm">01</div>
              <h2 className="text-xl font-display font-semibold text-text tracking-tight">Create Prompt</h2>
            </div>

            <div className="space-y-5">
              {/* Topic */}
              <div className="space-y-2">
                <label className="text-sm font-sans font-medium text-text-muted block">Target Subject</label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g. React, Python, Machine Learning"
                  className="w-full bg-surface-light border border-border rounded-xl p-3.5 text-text font-sans text-sm focus:ring-2 focus:ring-accent/50 focus:border-accent focus:outline-none transition-all placeholder:text-text-muted/50"
                />
              </div>

              {/* Goal Type */}
              <div className="space-y-2">
                <label className="text-sm font-sans font-medium text-text-muted block">Goal Type</label>
                <select
                  value={goalType}
                  onChange={(e) => setGoalType(e.target.value)}
                  className="w-full bg-surface-light border border-border rounded-xl p-3.5 text-text font-sans text-sm focus:ring-2 focus:ring-accent/50 focus:border-accent focus:outline-none transition-all appearance-none cursor-pointer"
                >
                  {GOAL_TYPES.map(g => <option key={g}>{g}</option>)}
                </select>
              </div>

              {/* Duration & Level */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-sans font-medium text-text-muted block">Duration (Days)</label>
                  <input
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    min="1"
                    max="365"
                    className="w-full bg-surface-light border border-border rounded-xl p-3.5 text-text font-sans text-sm focus:ring-2 focus:ring-accent/50 focus:border-accent focus:outline-none transition-all placeholder:text-text-muted/50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-sans font-medium text-text-muted block">Skill Level</label>
                  <select
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    className="w-full bg-surface-light border border-border rounded-xl p-3.5 text-text font-sans text-sm focus:ring-2 focus:ring-accent/50 focus:border-accent focus:outline-none transition-all appearance-none cursor-pointer"
                  >
                    {LEVEL_OPTIONS.map(l => <option key={l}>{l}</option>)}
                  </select>
                </div>
              </div>

            {/* Study Hours */}
            <div className="space-y-2">
              <label className="text-sm font-sans font-medium text-text-muted block">Daily Study Hours</label>
              <select
                value={studyHours}
                onChange={(e) => setStudyHours(e.target.value)}
                className="w-full bg-surface-light border border-border rounded-xl p-3.5 text-text font-sans text-sm focus:ring-2 focus:ring-accent/50 focus:border-accent focus:outline-none transition-all appearance-none cursor-pointer"
              >
                <option value="0.5-1">30 min – 1 hour</option>
                <option value="1-2">1 – 2 hours</option>
                <option value="2-3">2 – 3 hours</option>
                <option value="3-4">3 – 4 hours</option>
                <option value="4+">4+ hours</option>
              </select>
            </div>

            {/* Advanced Toggle */}
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center gap-2 text-sm font-sans font-medium text-text-muted hover:text-text transition-colors w-full justify-between border border-border rounded-xl px-4 py-3.5 bg-surface-light"
            >
              <span>Advanced Profile Options</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
            </button>

            {showAdvanced && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="space-y-4 border border-border rounded-xl p-5 bg-surface-light"
              >
                <div className="space-y-2">
                  <label className="text-sm font-sans font-medium text-text-muted block">Experience</label>
                  <input
                    type="text"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    placeholder="e.g. 1.6 years of React development"
                    className="w-full bg-surface border border-border rounded-lg p-3 text-text font-sans text-sm focus:ring-2 focus:ring-accent/50 focus:border-accent focus:outline-none transition-all placeholder:text-text-muted/50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-sans font-medium text-text-muted block">Weak Areas</label>
                  <input
                    type="text"
                    value={weakAreas}
                    onChange={(e) => setWeakAreas(e.target.value)}
                    placeholder="e.g. closures, async/await, state management"
                    className="w-full bg-surface border border-border rounded-lg p-3 text-text font-sans text-sm focus:ring-2 focus:ring-accent/50 focus:border-accent focus:outline-none transition-all placeholder:text-text-muted/50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-sans font-medium text-text-muted block">Target Roles</label>
                  <input
                    type="text"
                    value={targetRoles}
                    onChange={(e) => setTargetRoles(e.target.value)}
                    placeholder="e.g. Mid-level frontend developer"
                    className="w-full bg-surface border border-border rounded-lg p-3 text-text font-sans text-sm focus:ring-2 focus:ring-accent/50 focus:border-accent focus:outline-none transition-all placeholder:text-text-muted/50"
                  />
                </div>
                <label className="flex items-center gap-3 cursor-pointer group mt-4">
                  <input
                    type="checkbox"
                    checked={preferFreeResources}
                    onChange={(e) => setPreferFreeResources(e.target.checked)}
                    className="w-4 h-4 rounded text-accent focus:ring-offset-surface-light focus:ring-accent transition-all"
                  />
                  <span className="text-sm font-sans font-medium text-text-muted group-hover:text-text transition-colors">
                    Free Resources Only
                  </span>
                </label>
              </motion.div>
            )}

            {/* Generated Prompt Output */}
            <div className="pt-6 relative">
              <div className="flex items-center justify-between border-b border-border pb-3 mb-4">
                <label className="text-sm font-sans font-medium text-text">Generated Prompt</label>
                <button
                  onClick={handleCopyPrompt}
                  className="text-xs font-sans font-medium text-accent hover:text-white hover:bg-accent flex items-center space-x-1.5 transition-colors bg-accent/10 px-3 py-1.5 rounded-lg border border-accent/20"
                >
                  {promptCopied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{promptCopied ? 'Copied' : 'Copy Prompt'}</span>
                </button>
              </div>
              <textarea
                readOnly
                value={generatedPrompt}
                className="w-full h-48 bg-surface-light border border-border rounded-xl p-4 text-text-muted font-sans text-xs resize-none focus:outline-none focus:ring-2 focus:ring-accent/20 leading-relaxed custom-scrollbar"
              />
            </div>
          </div>
        </motion.div>

        {/* Step 2: Upload CSV */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-surface border border-border rounded-2xl p-6 md:p-8 space-y-6 shadow-xl relative"
        >
          <div className="flex items-center space-x-4 border-b border-border pb-4">
            <div className="w-10 h-10 rounded-full bg-surface-light flex items-center justify-center text-accent font-sans font-bold text-sm">02</div>
            <h2 className="text-xl font-display font-semibold text-text tracking-tight">Upload Data</h2>
          </div>

          <div className="space-y-6">
            <p className="text-sm text-text-muted leading-relaxed font-sans bg-surface-light p-4 rounded-xl border border-border/50">
              Copy the prompt above and paste it into ChatGPT, Claude, or Gemini. Paste the resulting CSV data here to generate your plan.
            </p>

            <div className="space-y-2">
              <label className="text-sm font-sans font-medium text-text block">CSV Data</label>
              <textarea
                value={csvData}
                onChange={(e) => setCsvData(e.target.value)}
                placeholder={"Day,Topic,Concepts,Practice,EstimatedTime\n1,Basics,Core fundamentals,3 Problems,60"}
                className="w-full h-44 bg-surface-light border border-border rounded-xl p-4 text-text font-sans text-sm focus:ring-2 focus:ring-accent/50 focus:border-accent focus:outline-none transition-all leading-relaxed whitespace-pre"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="cursor-pointer flex items-center space-x-2 text-sm font-sans font-medium text-text-muted hover:text-text hover:bg-surface-light transition-colors bg-surface-light px-4 py-3 border border-border rounded-xl hover:border-accent w-full justify-center shadow-sm">
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
              <div className="p-4 rounded-xl border border-danger/50 bg-danger/10 flex items-start space-x-3 text-danger font-sans">
                <AlertTriangle className="w-5 h-5 shrink-0" />
                <span className="text-sm font-medium pt-0.5">{error}</span>
              </div>
            )}

            <button
              onClick={parseCSV}
              className="w-full py-4 bg-accent text-white font-medium text-sm rounded-xl shadow-lg shadow-accent/25 hover:bg-accent/90 focus:ring-4 focus:ring-accent/20 transition-all mt-6"
            >
              Start Learning Plan
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
