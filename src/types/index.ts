export interface Topic {
  id: string;
  name: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  estimatedTime: number; // minutes
  masteryStatus: 'Learned' | 'NeedRevision' | 'NotStarted';
}

export interface PlannerDay {
  dayNumber: number;
  topicId: string;
  dailyTasks: string[];
  plannedTimeline: string;
  studyDuration: number; // minutes
  theoryCompleted: boolean;
  practiceUnlocked: boolean;
  completionStatus: 'Pending' | 'InProgress' | 'Completed';
}

export interface PracticeQuestion {
  id: string;
  topicId: string;
  questionText: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  options: string[];
  correctAnswer: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: string | null;
}

export interface LeaderboardEntry {
  id: string;
  username: string;
  rank: number;
  score: number;
  streak: number;
  isCurrentUser: boolean;
}
