# N-Day Study Planner and Learning Progress Tracker - Blueprint

## 1. System Architecture
- **Frontend:** React.js (Vite), Tailwind CSS, Recharts, Zustand (State Management), React Router
- **Backend/Database:** PostgreSQL (or Supabase)
- **Authentication:** JWT-based or Supabase Auth
- **Deployment:** Vercel/Netlify (Frontend), Supabase/Render (Backend)

## 2. Database Schema (PostgreSQL)

```sql
CREATE TABLE Users (
  UserID UUID PRIMARY KEY,
  Email VARCHAR(255) UNIQUE,
  PasswordHash VARCHAR(255),
  Name VARCHAR(100),
  CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Topics (
  TopicID UUID PRIMARY KEY,
  TopicName VARCHAR(255),
  DifficultyLevel VARCHAR(50), -- Easy, Medium, Hard
  ResourceLinks JSONB,
  EstimatedStudyTime INT, -- minutes
  MasteryStatus VARCHAR(50) -- Learned, NeedRevision, NotStarted
);

CREATE TABLE PlannerDays (
  DayID UUID PRIMARY KEY,
  UserID UUID REFERENCES Users(UserID),
  DayNumber INT,
  TopicID UUID REFERENCES Topics(TopicID),
  DailyTasks JSONB,
  PlannedTimeline VARCHAR(100),
  StudyStartTime TIMESTAMP,
  StudyEndTime TIMESTAMP,
  StudyDuration INT, -- minutes
  TheoryCompleted BOOLEAN DEFAULT FALSE,
  PracticeUnlocked BOOLEAN DEFAULT FALSE,
  CompletionStatus VARCHAR(50) -- Pending, InProgress, Completed
);

CREATE TABLE StudySessions (
  SessionID UUID PRIMARY KEY,
  UserID UUID REFERENCES Users(UserID),
  TopicID UUID REFERENCES Topics(TopicID),
  StartTime TIMESTAMP,
  EndTime TIMESTAMP,
  Duration INT,
  Notes TEXT
);

CREATE TABLE PracticeQuestions (
  QuestionID UUID PRIMARY KEY,
  TopicID UUID REFERENCES Topics(TopicID),
  QuestionText TEXT,
  Difficulty VARCHAR(50),
  Options JSONB,
  CorrectAnswer TEXT
);

CREATE TABLE PracticeResults (
  ResultID UUID PRIMARY KEY,
  UserID UUID REFERENCES Users(UserID),
  QuestionID UUID REFERENCES PracticeQuestions(QuestionID),
  UserAnswer TEXT,
  IsCorrect BOOLEAN,
  AttemptedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE MockTests (
  TestID UUID PRIMARY KEY,
  UserID UUID REFERENCES Users(UserID),
  TestName VARCHAR(255),
  Date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  TotalQuestions INT,
  Score INT,
  Accuracy DECIMAL(5,2)
);
```

## 3. API Endpoints (RESTful)

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Authenticate user
- `GET /api/planner` - Get N-day study plan for user
- `PUT /api/planner/:dayId/theory` - Mark theory as completed (unlocks practice)
- `POST /api/sessions/start` - Start study session timer
- `POST /api/sessions/stop` - Stop study session timer
- `GET /api/topics/:topicId/questions` - Get practice questions (checks if unlocked)
- `POST /api/practice/submit` - Submit practice answers
- `GET /api/analytics/performance` - Get user performance data

## 4. Frontend Page Structure

- `/` (Dashboard) - Overview of progress, study hours, active day.
- `/planner` (Study Planner) - N-Day timeline view.
- `/theory` (Theory Learning) - Video/text resources for the current topic.
- `/practice` (Practice Questions) - MCQs unlocked after theory.
- `/tests` (Mock Tests) - Full-length simulated exams.
- `/analytics` (Performance Analytics) - Charts and weak area identification.
- `/revision` (Revision Tracker) - Topics marked for revision.

## 5. UI Component Hierarchy

```
App
âââ Layout
â   âââ Sidebar (Navigation)
â   âââ Header (Search, Profile)
â   âââ MainContent
â       âââ Dashboard
â       â   âââ StatsGrid (Progress, Hours, Accuracy)
â       â   âââ TodayPlanCard
â       â   âââ AnalyticsCharts (Recharts)
â       âââ Planner
â       â   âââ TimelineList
â       âââ Theory
â       â   âââ VideoPlayer
â       â   âââ NotesSection
â       â   âââ MarkCompletedButton
â       âââ Practice
â           âââ QuestionCard
â           âââ ResultsSummary
```

## 6. Folder Structure

```
/src
  /assets
  /components
    /layout
      Sidebar.tsx
      Header.tsx
      Layout.tsx
    /ui
      Button.tsx
      Card.tsx
      ProgressBar.tsx
  /pages
    Dashboard.tsx
    Planner.tsx
    Theory.tsx
    Practice.tsx
    Analytics.tsx
  /store
    useStore.ts      # Zustand state management
  /lib
    utils.ts         # Tailwind merge, date formatting
    api.ts           # Axios/Fetch wrappers
  /types
    index.ts         # TypeScript interfaces
  App.tsx
  main.tsx
```

## 7. Core Logic for Unlocking Practice Questions

```typescript
// In the Theory page component
const handleCompleteTheory = async (dayId: string) => {
  try {
    // 1. API call to update database
    await api.put(`/planner/${dayId}/theory`, { completed: true });
    
    // 2. Update local state (Zustand)
    markTheoryCompleted(dayId);
    
    // 3. Navigate to practice
    navigate('/practice');
  } catch (error) {
    console.error("Failed to mark theory as completed", error);
  }
};

// In the Practice page component
const PracticePage = () => {
  const { currentDayPlan } = useStore();
  
  if (!currentDayPlan.practiceUnlocked) {
    return <LockedState message="Complete theory to unlock practice questions." />;
  }
  
  return <QuestionList topicId={currentDayPlan.topicId} />;
};
```
