import type { JobField } from "../../shared/analysisSchemas";

export interface JobFieldGuidance {
  fieldLabel: string;
  competencyAreas: string[];
  evidenceExamples: string[];
  analysisCautions: string[];
}

const specializedGuidance: Partial<Record<JobField, JobFieldGuidance>> = {
  it_digital: {
    fieldLabel: "IT & Digital",
    competencyAreas: [
      "Programming or technical fundamentals relevant to the target role",
      "Tools and frameworks explicitly required by the job posting",
      "Debugging, problem solving, version control, and team collaboration",
      "Practical technical implementation through projects or work tasks",
      "Testing, documentation, deployment, and APIs only when relevant",
    ],
    evidenceExamples: [
      "Source code or GitHub repository",
      "README or technical documentation",
      "Live demo, deployment, screenshots, or test results",
      "A concise explanation of technical decisions and problem solving",
    ],
    analysisCautions: [
      "Do not assume every IT role requires every framework, GitHub artifact, API, test suite, or deployment example.",
      "Treat technologies absent from the job posting as recommendations, not employer requirements.",
    ],
  },
  administration: {
    fieldLabel: "Administration",
    competencyAreas: [
      "Document handling, filing, and record management",
      "Accurate data entry and spreadsheet usage",
      "Scheduling, written communication, and basic reporting",
      "Office tools explicitly mentioned in the job posting",
      "Accuracy, organization, and task prioritization",
    ],
    evidenceExamples: [
      "Spreadsheet or data-entry sample",
      "Document template or filing structure",
      "Basic report example or scheduling sheet",
      "Administrative checklist with fictional or sanitized data",
    ],
    analysisCautions: [
      "Do not recommend GitHub, APIs, or software deployment unless the posting genuinely requires development work.",
      "Do not infer advanced office-tool proficiency without candidate evidence.",
    ],
  },
  customer_service: {
    fieldLabel: "Customer Service",
    competencyAreas: [
      "Clear communication, active listening, and empathy",
      "Complaint handling and response accuracy",
      "Escalation judgment and service consistency",
      "Handling relevant communication channels",
      "CRM or support tools only when mentioned or reasonably relevant",
    ],
    evidenceExamples: [
      "Customer response scripts or FAQ sample",
      "Complaint-resolution example or service scenario",
      "Escalation flow or response-quality checklist",
      "Communication role-play notes using fictional scenarios",
    ],
    analysisCautions: [
      "Do not treat friendliness alone as sufficient evidence of customer-service competence.",
      "Do not invent CRM experience, resolution metrics, or communication-channel experience.",
    ],
  },
  operations_logistics: {
    fieldLabel: "Operations / Warehouse / Logistics",
    competencyAreas: [
      "Receiving, stock handling, picking, and packing",
      "Inventory accuracy and stock-opname discipline",
      "Process consistency, discrepancy handling, and basic reporting",
      "Safety, shift readiness, and operational requirements stated in the posting",
      "Warehouse or inventory tools only when relevant",
    ],
    evidenceExamples: [
      "Stock card or inventory tracker",
      "Receiving, picking, or packing checklist",
      "Stock-opname example or discrepancy report",
      "Process flow or safety checklist using fictional or sanitized data",
    ],
    analysisCautions: [
      "Do not invent equipment certifications, licenses, or physical capabilities.",
      "Do not assume specific warehouse systems or machinery unless supplied by the candidate or posting.",
    ],
  },
};

// Generic guidance keeps valid but not-yet-specialized fields conservative.
const genericGuidance: JobFieldGuidance = {
  fieldLabel: "General Entry-Level Role",
  competencyAreas: [
    "Transferable competencies supported by the candidate profile",
    "Skills, tools, responsibilities, and qualifications stated in the posting",
    "Practical evidence from work, internships, organizations, school, or projects",
    "Communication, reliability, learning readiness, and role-specific fundamentals",
  ],
  evidenceExamples: [
    "A fictional or sanitized work sample relevant to the target role",
    "A checklist, short report, task example, or process explanation",
    "A concise example of responsibilities, actions, and results",
  ],
  analysisCautions: [
    "Do not claim deep specialist coverage for this field.",
    "Avoid field-specific certifications, tools, or requirements unless explicitly supported by the posting.",
    "Separate employer requirements from optional development recommendations.",
  ],
};

export function getJobFieldGuidance(jobField: JobField): JobFieldGuidance {
  return specializedGuidance[jobField] ?? genericGuidance;
}
