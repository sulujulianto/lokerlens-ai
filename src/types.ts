export interface CareerProfile {
  education: string;
  skills: string;
  projects: string;
  experience: string;
  targetRole: string;
  language: 'Indonesian' | 'English';
}

export interface RoadmapWeeks {
  week1: string[];
  week2: string[];
  week3: string[];
  week4: string[];
}

export interface AnalysisResponse {
  matchScore: number;
  verdict: string;
  summary: string;
  strengths: string[];
  missingSkills: string[];
  mustHaveRequirements: string[];
  niceToHaveRequirements: string[];
  risks: string[];
  roadmap30Days: RoadmapWeeks;
  portfolioSuggestions: string[];
  cvBulletSuggestions: string[];
  applicationMessage: string;
  disclaimer: string;
}
