LearnNova — Learning Planner Platform
Product Requirements Document (PRD)
Version 1.0 — Initial Draft
Date: March 2026
Prepared By: Jothivasan
Status: Draft

1. Executive Summary
LearnNova is a web-based learning planner designed to help individuals learn any skill or subject within a defined time period.
Many learners struggle with:
lack of structured learning plans
unclear daily study goals
inconsistent study habits
no progress tracking
LearnNova solves this by allowing users to:
create N-day learning plans
Organize daily learning tasks
track study time
maintain learning streaks
practice problems
earn achievements
Users can generate structured learning plans using external AI tools by pasting a generated master prompt, then uploading the result as a CSV learning plan.
The platform converts that structured data into a daily learning roadmap with progress tracking, streaks, and gamification.
LearnNova focuses on simplicity, structured learning, and accountability.

2. Project Goals & Success Criteria
Primary Goals
• Help users learn topics in a structured N-day roadmap
• Improve learning consistency through streak tracking
• Provide a simple UI for building study plans quickly
• Enable users to track daily progress and study time

Success Metrics
Metric
Target
Learning plan creation time
< 5 minutes
Daily engagement rate
> 50%
Users maintaining streaks
> 30%
Plan completion rate
> 40%
User satisfaction
> 4/5


3. User Roles
LearnNova has two primary roles.
3.1 Learner
The main user of the platform.
Capabilities:
• Create learning plans
• Upload or manually create study roadmap
• Track study progress
• Log study hours
• Solve practice questions
• Maintain learning streaks
• Earn badges and leaderboard points
• Download certificates

3.2 Admin
Admin has limited monitoring functionality.
Capabilities:
• View total users
• Track active learners
• Monitor streak statistics
• View completed learning plans
• View leaderboard metrics
Admin cannot edit learning plans.

4. Learning Plan Creation Flow
LearnNova supports two methods for creating a learning roadmap.

Method 1 — AI Prompt Generated Plan
Users provide learning details:
• Topic to learn
• Number of days (N days)
• Current skill level
Beginner
Intermediate
Advanced
Example:
Topic: JavaScript
Duration: 30 Days
Level: Beginner

Prompt Generation
LearnNova generates a Master Prompt.
Users paste this prompt into an AI tool (ChatGPT / Claude).
The AI returns a CSV formatted study roadmap.
Example CSV structure:
Day,Topic,Concepts,Practice,EstimatedTime
1,JS Basics,Variables and Data Types,3 Problems,60
2,Functions,Arrow Functions,4 Problems,90
3,Arrays,Array Methods,5 Problems,90

Users upload this CSV into LearnNova.
LearnNova automatically creates the daily study roadmap.

Method 2 — Manual Plan Creation
Users can manually enter:
• Day number
• Topic
• Concepts to learn
• Practice problems
• Estimated study time


5. Learning Plan Structure
Each learning plan contains:
Learning Plan
→ Days
→ Topics
→ Practice Tasks
→ Study Time
→ Completion Status
Example:
JavaScript 30 Day Plan
Day 1
Topic: Variables
Practice: 3 Problems
Day 2
Topic: Functions
Practice: 4 Problems
Day 3
Topic: Arrays
Practice: 5 Problems

6. Core Features
6.1 Account System
Users can:
• Register with email
• Login securely
• Reset password
• View profile dashboard

6.2 Learning Plan Dashboard
Displays:
• Current learning plans
• Today's task
• Completion percentage
• Study streak
• Study time statistics

6.3 Daily Study Page
Shows:
• Topic for the day
• Concepts to study
• Practice tasks
• Study timer
• Mark complete button

6.4 Study Time Tracking
Users can log study time using a timer.
Tracked metrics:
• Daily study time
• Weekly study time
• Total study hours

6.5 Progress Tracking
LearnNova tracks:
• Completion percentage
• Daily tasks completed
• Study time logged

6.6 Streak System
LearnNova encourages consistency using streak tracking.
Features:
• Daily streak count
• GitHub-style heatmap calendar
• Longest streak record
Example:
🔥 Current Streak: 7 days

6.7 Leaderboard
Leaderboard ranks learners based on:
• study time
• completed tasks
• streak length
Leaderboard categories:
• weekly
• monthly
• all-time

6.8 Badges & Achievements
Users earn badges when completing milestones.
Examples:
• 7 Day Streak
• 30 Day Streak
• Plan Completion
• 100 Study Hours

6.9 Certification
When users complete an entire learning plan:
LearnNova generates a certificate of completion.
Example:
Certificate of Completion
Topic: JavaScript
Duration: 30 Days

7. Admin Dashboard
Admin dashboard displays analytics.
Metrics
• total users
• active users
• average study hours
• total completed plans
• streak statistics

8. Gamification System
To motivate users.
Features include:
• streak tracking
• badges
• leaderboard
• completion certificates

9. System Architecture
LearnNova will use a modern full-stack architecture.
Frontend
React
Tailwind CSS
Redux
Backend
Supabase (BaaS)
Database
PostgreSQL (Supabase)
Authentication
Supabase Auth
Hosting
Vercel / Netlify

10. Database Design (Simplified)
Users
users
------
id
name
email
created_at


Learning Plans
learning_plans
--------------
id
user_id
topic
duration_days
level
created_at


Learning Days
learning_days
--------------
id
plan_id
day_number
topic
concepts
practice_tasks
estimated_time
completed


Study Sessions
study_sessions
---------------
id
user_id
day_id
time_spent
date


Achievements
achievements
-------------
id
user_id
badge_name
date_earned


11. API Design (Examples)
Create Learning Plan
POST
/api/plans


Upload CSV Plan
POST
/api/plans/upload


Mark Day Completed
POST
/api/day/complete


Log Study Time
POST
/api/study-session


12. UI Pages
Public Pages
• Landing Page
• Login
• Register

Learner Pages
• Dashboard
• Create Learning Plan
• Upload CSV Plan
• Study Page
• Progress Page
• Leaderboard
• Profile

Admin Pages
• Admin Dashboard
• User Analytics

13. Mobile Responsiveness
LearnNova will be:
• Fully responsive
• Mobile friendly
• Tablet compatible
No native mobile apps in v1.

14. Monetization
LearnNova will operate on a donation model.
Integration:
Buy Me a Coffee
Users can support the project voluntarily.

15. Future Enhancements
Potential future features:

• Mock interview simulator
• Coding challenge system
• Community learning groups
• Mobile apps

16. Out of Scope (Version 1)
The following features are not included in v1:

• Mock interview system
• Course marketplace
• Instructor portal



17. Key Advantages of LearnNova
LearnNova focuses on:
• learning consistency
• simple planning
• structured roadmaps
• gamified learning
Unlike course platforms, LearnNova is designed as a learning execution system, not a content marketplace.

