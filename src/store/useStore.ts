import { create } from 'zustand';
import { 
  Topic, 
  PlannerDay, 
  PracticeQuestion, 
  Achievement, 
  LeaderboardEntry 
} from '../types';

interface StoreState {
  topics: Topic[];
  plannerDays: PlannerDay[];
  questions: PracticeQuestion[];
  achievements: Achievement[];
  leaderboard: LeaderboardEntry[];
  currentDay: number;
  totalStudyHours: number;
  currentStreak: number;
  longestStreak: number;
  
  markTheoryCompleted: (dayNumber: number) => void;
  updateStudyDuration: (dayNumber: number, duration: number) => void;
  markDayCompleted: (dayNumber: number) => void;
  setPlan: (topics: Topic[], plannerDays: PlannerDay[]) => void;
}

const mockTopics: Topic[] = [
  { id: 't1', name: 'Introduction to React', difficulty: 'Easy', estimatedTime: 60, masteryStatus: 'Learned' },
  { id: 't2', name: 'State and Props', difficulty: 'Medium', estimatedTime: 90, masteryStatus: 'NeedRevision' },
  { id: 't3', name: 'Hooks Deep Dive', difficulty: 'Hard', estimatedTime: 120, masteryStatus: 'NotStarted' },
  { id: 't4', name: 'Context API', difficulty: 'Medium', estimatedTime: 90, masteryStatus: 'NotStarted' },
  { id: 't5', name: 'React Router', difficulty: 'Medium', estimatedTime: 60, masteryStatus: 'NotStarted' },
];

const mockPlannerDays: PlannerDay[] = [
  { dayNumber: 1, topicId: 't1', dailyTasks: ['Read docs', 'Watch video', 'Do practice'], plannedTimeline: 'Morning', studyDuration: 65, theoryCompleted: true, practiceUnlocked: true, completionStatus: 'Completed' },
  { dayNumber: 2, topicId: 't2', dailyTasks: ['Understand useState', 'Understand props passing'], plannedTimeline: 'Evening', studyDuration: 45, theoryCompleted: true, practiceUnlocked: true, completionStatus: 'InProgress' },
  { dayNumber: 3, topicId: 't3', dailyTasks: ['useEffect', 'useMemo', 'useCallback'], plannedTimeline: 'Morning', studyDuration: 0, theoryCompleted: false, practiceUnlocked: false, completionStatus: 'Pending' },
  { dayNumber: 4, topicId: 't4', dailyTasks: ['Setup Context', 'Provide State'], plannedTimeline: 'Afternoon', studyDuration: 0, theoryCompleted: false, practiceUnlocked: false, completionStatus: 'Pending' },
  { dayNumber: 5, topicId: 't5', dailyTasks: ['Setup Routes', 'Nested Routing'], plannedTimeline: 'Morning', studyDuration: 0, theoryCompleted: false, practiceUnlocked: false, completionStatus: 'Pending' },
];

const mockQuestions: PracticeQuestion[] = [
  { id: 'q1', topicId: 't1', questionText: 'What is React?', difficulty: 'Easy', options: ['A UI library', 'A database', 'A language', 'An OS'], correctAnswer: 'A UI library' },
  { id: 'q2', topicId: 't1', questionText: 'Who developed React?', difficulty: 'Easy', options: ['Google', 'Facebook', 'Microsoft', 'Twitter'], correctAnswer: 'Facebook' },
  { id: 'q3', topicId: 't2', questionText: 'How do you pass data to a child component?', difficulty: 'Medium', options: ['State', 'Context', 'Props', 'Redux'], correctAnswer: 'Props' },
  { id: 'q4', topicId: 't3', questionText: 'Which hook is used for side effects?', difficulty: 'Medium', options: ['useState', 'useEffect', 'useMemo', 'useRef'], correctAnswer: 'useEffect' },
];

const mockAchievements: Achievement[] = [
  { id: 'a1', title: 'First Steps', description: 'Complete your first study session.', icon: 'Zap', unlockedAt: '2026-03-10T10:00:00Z' },
  { id: 'a2', title: 'Consistency is Key', description: 'Maintain a 3-day learning streak.', icon: 'Flame', unlockedAt: '2026-03-12T10:00:00Z' },
  { id: 'a3', title: 'Knowledge Seeker', description: 'Log 10 hours of total study time.', icon: 'BookOpen', unlockedAt: null },
  { id: 'a4', title: 'Mastermind', description: 'Score 100% on a simulation test.', icon: 'Trophy', unlockedAt: null },
];

const mockLeaderboard: LeaderboardEntry[] = [
  { id: 'u1', username: 'CyberNinja', rank: 1, score: 12500, streak: 15, isCurrentUser: false },
  { id: 'u2', username: 'CodeWeaver', rank: 2, score: 11200, streak: 12, isCurrentUser: false },
  { id: 'u3', username: 'USR_JDOE', rank: 3, score: 9800, streak: 7, isCurrentUser: true },
  { id: 'u4', username: 'NeonByte', rank: 4, score: 9500, streak: 5, isCurrentUser: false },
  { id: 'u5', username: 'DataGhost', rank: 5, score: 8200, streak: 3, isCurrentUser: false },
];

export const useStore = create<StoreState>((set) => ({
  topics: mockTopics,
  plannerDays: mockPlannerDays,
  questions: mockQuestions,
  achievements: mockAchievements,
  leaderboard: mockLeaderboard,
  currentDay: 3,
  totalStudyHours: 110 / 60, // 110 minutes
  currentStreak: 7,
  longestStreak: 12,

  markTheoryCompleted: (dayNumber) => set((state) => ({
    plannerDays: state.plannerDays.map(day => 
      day.dayNumber === dayNumber 
        ? { ...day, theoryCompleted: true, practiceUnlocked: true, completionStatus: 'InProgress' }
        : day
    )
  })),

  updateStudyDuration: (dayNumber, duration) => set((state) => {
    const newDays = state.plannerDays.map(day => 
      day.dayNumber === dayNumber 
        ? { ...day, studyDuration: day.studyDuration + duration }
        : day
    );
    const totalMinutes = newDays.reduce((acc, day) => acc + day.studyDuration, 0);
    return {
      plannerDays: newDays,
      totalStudyHours: totalMinutes / 60
    };
  }),

  markDayCompleted: (dayNumber) => set((state) => {
    const newDays = state.plannerDays.map(day => 
      day.dayNumber === dayNumber 
        ? { ...day, completionStatus: 'Completed' as const }
        : day
    );
    // Advance current day if possible
    const nextDay = state.currentDay < state.plannerDays.length ? state.currentDay + 1 : state.currentDay;
    return {
      plannerDays: newDays,
      currentDay: nextDay
    };
  }),

  setPlan: (topics, plannerDays) => set({
    topics,
    plannerDays,
    currentDay: 1,
    totalStudyHours: 0,
    questions: [] // Reset questions for new plan
  })
}));
