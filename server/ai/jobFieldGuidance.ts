import type { JobField } from "../../shared/analysisSchemas";
import { jobFieldCatalogByValue } from "../../shared/jobFieldCatalog";

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
  data_ai: {
    fieldLabel: "Data, Analytics & AI",
    competencyAreas: [
      "Data cleaning, validation, and interpretation relevant to the role",
      "Spreadsheet, SQL, visualization, statistics, or programming skills explicitly required",
      "Turning a business question into a defensible analysis",
      "Explaining assumptions, limitations, and data quality clearly",
      "Responsible handling of confidential data and AI-assisted work",
    ],
    evidenceExamples: [
      "A documented analysis using public or fictional data",
      "A dashboard, notebook, query sample, or spreadsheet with clear assumptions",
      "A short explanation connecting findings to a practical decision",
      "A data-quality checklist or model-evaluation note relevant to the role",
    ],
    analysisCautions: [
      "Do not invent dataset size, model accuracy, business impact, or production deployment.",
      "Do not treat tool familiarity as proof of analytical judgment.",
    ],
  },
  cyber_network: {
    fieldLabel: "Networking, Cloud & Cybersecurity",
    competencyAreas: [
      "Network, operating-system, cloud, or security fundamentals relevant to the posting",
      "Troubleshooting based on observable symptoms, logs, and documented procedures",
      "Access control, patching, backup, monitoring, and incident-escalation awareness",
      "Clear technical documentation and handover discipline",
      "Safe lab practice and respect for authorization boundaries",
    ],
    evidenceExamples: [
      "A legal home-lab diagram or sanitized troubleshooting log",
      "A network configuration exercise or cloud lab with no exposed secrets",
      "A hardening, backup, or incident-escalation checklist",
      "A short report explaining findings, limits, and remediation priorities",
    ],
    analysisCautions: [
      "Never recommend unauthorized scanning, access, exploitation, or handling of real credentials.",
      "Do not invent certifications, production access, incident response, or cloud experience.",
    ],
  },
  product_design: {
    fieldLabel: "Digital Product, UI/UX & Product Management",
    competencyAreas: [
      "Understanding user problems, constraints, and product goals",
      "Research, flow mapping, wireframing, prototyping, or requirements work relevant to the role",
      "Usability, accessibility, and evidence-based iteration",
      "Clear documentation and collaboration with technical or business teams",
      "Explaining individual contribution and tradeoffs in portfolio work",
    ],
    evidenceExamples: [
      "A case study showing the problem, process, decisions, and iteration",
      "A user flow, wireframe, prototype, or requirements document",
      "A small usability test using consented or fictional participants",
      "A prioritized backlog or product brief with explicit assumptions",
    ],
    analysisCautions: [
      "Do not invent research participants, usability metrics, shipped features, or business outcomes.",
      "Visual polish alone is not proof of product reasoning or accessibility competence.",
    ],
  },
  human_resources: {
    fieldLabel: "Human Resources & Recruitment",
    competencyAreas: [
      "Accurate employee, applicant, attendance, and onboarding administration",
      "Professional candidate or employee communication",
      "Confidentiality, consent, fairness, and careful document handling",
      "Scheduling, follow-up, reporting, and coordination discipline",
      "HR systems or labor-process knowledge only when evidenced or required",
    ],
    evidenceExamples: [
      "A fictional recruitment tracker or onboarding checklist",
      "A professional interview invitation or follow-up template",
      "A sanitized attendance or training administration report",
      "A process flow showing secure handling and escalation of employee data",
    ],
    analysisCautions: [
      "Do not invent hiring authority, legal expertise, HRIS experience, or recruitment metrics.",
      "All work samples must use fictional or fully sanitized personal data.",
    ],
  },
  project_quality: {
    fieldLabel: "Project, Quality & Compliance",
    competencyAreas: [
      "Task planning, status tracking, documentation, and escalation",
      "Understanding SOPs, acceptance criteria, and quality checkpoints",
      "Finding, recording, and following up discrepancies objectively",
      "Clear handover and coordination across stakeholders",
      "Audit, compliance, or project tools only when supported by evidence",
    ],
    evidenceExamples: [
      "A fictional project tracker, risk log, or meeting-action register",
      "A quality checklist with sample findings and follow-up status",
      "A simple SOP or process map for a familiar task",
      "A short improvement note comparing the original and revised process",
    ],
    analysisCautions: [
      "Do not invent audit authority, certification, budget ownership, or project impact.",
      "Separate administrative coordination from formal project-manager responsibility.",
    ],
  },
  retail_commerce: {
    fieldLabel: "Retail, E-commerce & Merchandising",
    competencyAreas: [
      "Customer service, product information, and transaction accuracy",
      "Store, marketplace, catalog, order, or return workflows relevant to the role",
      "Stock visibility, display standards, and basic sales administration",
      "Handling discrepancies, complaints, and escalation consistently",
      "Cashier or marketplace tools only when supplied by the candidate",
    ],
    evidenceExamples: [
      "A fictional product catalog or marketplace listing sample",
      "An order, return, or stock-reconciliation checklist",
      "A customer-response template for common retail scenarios",
      "A simple merchandising or daily-operations report using sample data",
    ],
    analysisCautions: [
      "Do not invent sales results, cash-handling authority, platform access, or store metrics.",
      "Do not treat personal online shopping as e-commerce work experience.",
    ],
  },
  transportation: {
    fieldLabel: "Transportation, Delivery & Mobility",
    competencyAreas: [
      "Route, dispatch, delivery, or fleet-administration fundamentals relevant to the role",
      "Accurate handover, proof-of-delivery, and incident reporting",
      "Time management, customer communication, and escalation",
      "Vehicle, cargo, and road-safety awareness",
      "Licenses, vehicle operation, and systems only when explicitly evidenced",
    ],
    evidenceExamples: [
      "A fictional route plan or dispatch tracker",
      "A delivery handover and discrepancy checklist",
      "A vehicle pre-use or safety checklist appropriate to the role",
      "A sample incident report with no real customer data",
    ],
    analysisCautions: [
      "Do not invent licenses, vehicle access, geographic familiarity, or physical capability.",
      "Treat safety-critical or legal requirements as material gaps.",
    ],
  },
  security_cleaning: {
    fieldLabel: "Security, Cleaning & Facility Services",
    competencyAreas: [
      "Role-specific area checks, cleaning, access, or facility routines",
      "Safe handling of tools, materials, keys, and reported hazards",
      "Following schedules, checklists, hygiene standards, and handovers",
      "Professional communication and incident escalation",
      "Licenses, chemicals, or equipment only within demonstrated training",
    ],
    evidenceExamples: [
      "An opening, closing, patrol, or cleaning checklist",
      "A fictional area-inspection or incident report",
      "A task schedule with hygiene or safety checkpoints",
      "A supervised practice log describing procedure and result",
    ],
    analysisCautions: [
      "Do not invent security certification, chemical-handling training, or equipment authorization.",
      "Do not recommend unsafe handling of chemicals, hazards, or confrontations.",
    ],
  },
  health_care: {
    fieldLabel: "Health, Caregiving & Care Services",
    competencyAreas: [
      "Role-appropriate non-clinical support, hygiene, observation, and communication",
      "Respect, dignity, consent, privacy, and safeguarding awareness",
      "Accurate routine documentation and escalation of concerning changes",
      "Following instructions, boundaries, and infection-prevention procedures",
      "Clinical tasks only when qualifications and supervision are explicitly supported",
    ],
    evidenceExamples: [
      "A fictional daily-care or service checklist",
      "A sanitized observation and escalation scenario",
      "A hygiene or infection-prevention procedure reflection",
      "A supervised training log that clearly states scope and boundaries",
    ],
    analysisCautions: [
      "Never infer clinical authority, diagnosis, medication handling, or independent care capability.",
      "Treat missing mandatory licenses, safeguards, or health requirements as critical.",
    ],
  },
  social_community: {
    fieldLabel: "Social, Community & Program Support",
    competencyAreas: [
      "Participant communication, inclusion, and respectful support",
      "Program administration, outreach, attendance, and follow-up",
      "Field coordination, observation, documentation, and escalation",
      "Confidentiality, consent, safeguarding, and professional boundaries",
      "Understanding community context without making unsupported assumptions",
    ],
    evidenceExamples: [
      "A fictional activity plan or participant tracker",
      "A community-event checklist and post-activity reflection",
      "A sanitized outreach script or referral flow",
      "A program report using fictional or aggregated data",
    ],
    analysisCautions: [
      "Do not invent case-management authority, counseling credentials, or impact metrics.",
      "Never include identifiable participant or sensitive case data in work samples.",
    ],
  },
  agriculture_environment: {
    fieldLabel: "Agriculture, Fisheries & Environment",
    competencyAreas: [
      "Role-specific cultivation, handling, sorting, or environmental routines",
      "Following schedules, measurements, quality checks, and work instructions",
      "Safe tool, material, waste, and field-work practices",
      "Observation, record keeping, and escalation of abnormal conditions",
      "Machinery, chemicals, or regulated work only when evidenced and authorized",
    ],
    evidenceExamples: [
      "A fictional cultivation, feeding, harvest, or sorting log",
      "A field, tool, waste, or environmental inspection checklist",
      "A quality-grading exercise using sample data or permitted photos",
      "A supervised practice report describing inputs, process, and observations",
    ],
    analysisCautions: [
      "Do not invent chemical-handling certification, machinery authorization, yields, or field conditions.",
      "Do not recommend hazardous chemical or machinery practice without qualified supervision.",
    ],
  },
  media_events: {
    fieldLabel: "Media, Language, Communication & Events",
    competencyAreas: [
      "Writing, speaking, production, translation, or event fundamentals relevant to the role",
      "Understanding briefs, audiences, tone, schedules, and approval workflows",
      "Accuracy, fact checking, file management, and revision discipline",
      "Team coordination and calm execution during live activities",
      "Portfolio attribution, permissions, and confidentiality",
    ],
    evidenceExamples: [
      "A writing, translation, rundown, or production sample with clear context",
      "A fictional event plan, cue sheet, or publication calendar",
      "A short portfolio explaining the candidate's exact contribution",
      "A post-event or editorial review with lessons and revisions",
    ],
    analysisCautions: [
      "Do not invent audience metrics, language proficiency, client work, or ownership of team output.",
      "Do not include copyrighted or private material without permission.",
    ],
  },
  legal_public_service: {
    fieldLabel: "Legal, Government & Public Service",
    competencyAreas: [
      "Accurate document, case-file, correspondence, and service administration",
      "Understanding procedures, deadlines, confidentiality, and escalation",
      "Clear, respectful communication with service users and stakeholders",
      "Research or regulatory documentation only within the candidate's role",
      "Integrity, neutrality, and careful handling of personal or official data",
    ],
    evidenceExamples: [
      "A fictional document register or service-request tracker",
      "A sanitized correspondence template or procedure checklist",
      "A simple regulatory research note with cited public sources",
      "A public-service scenario showing communication and escalation",
    ],
    analysisCautions: [
      "Do not invent legal authority, civil-service status, regulatory expertise, or access to official systems.",
      "Do not present administrative support as legal advice or decision-making authority.",
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
  sales_marketing: {
    fieldLabel: "Sales & Marketing",
    competencyAreas: [
      "Understanding customer needs and explaining product value clearly",
      "Lead handling, follow-up discipline, and basic sales administration",
      "Promotion channels, content, or campaigns relevant to the posting",
      "Basic measurement such as reach, responses, leads, or conversion only when evidenced",
      "Ethical communication and accurate product claims",
    ],
    evidenceExamples: [
      "A fictional campaign brief or content calendar",
      "A product explanation, sales script, or follow-up template",
      "A simple campaign report with clearly labeled sample data",
      "An example of handling customer objections without misleading claims",
    ],
    analysisCautions: [
      "Do not invent sales targets, conversion rates, audience growth, or revenue impact.",
      "Do not treat follower counts alone as proof of marketing competence.",
    ],
  },
  hospitality: {
    fieldLabel: "Tourism & Hospitality",
    competencyAreas: [
      "Guest service, professional communication, and service recovery",
      "Role-specific operating procedures for front office, housekeeping, or tourism",
      "Cleanliness, presentation, accuracy, and handover discipline",
      "Shift readiness and teamwork across service functions",
      "Relevant reservation or property tools only when supported",
    ],
    evidenceExamples: [
      "A guest-service script or fictional complaint scenario",
      "A room, station, or shift checklist relevant to the target role",
      "A service handover note using fictional data",
      "A role-play reflection describing the situation, action, and result",
    ],
    analysisCautions: [
      "Do not invent foreign-language proficiency, system experience, or shift availability.",
      "Separate grooming expectations stated in the posting from subjective appearance judgments.",
    ],
  },
  culinary: {
    fieldLabel: "Culinary, Food Production & Barista",
    competencyAreas: [
      "Food or beverage preparation fundamentals relevant to the target role",
      "Hygiene, sanitation, cross-contamination prevention, and station cleanliness",
      "Following recipes, portions, preparation order, and quality standards",
      "Mise en place, time management, and teamwork during service",
      "Equipment operation only when training or experience is supplied",
    ],
    evidenceExamples: [
      "A preparation checklist, recipe card, or production plan",
      "A photo log or portfolio of work with honest context and no customer data",
      "A sanitation or opening-and-closing checklist",
      "A practice record showing product consistency or workflow improvement",
    ],
    analysisCautions: [
      "Do not invent food-safety certification, equipment mastery, or production volume.",
      "Treat hygiene and safe equipment use as material readiness factors.",
    ],
  },
  automotive: {
    fieldLabel: "Automotive",
    competencyAreas: [
      "Inspection, maintenance, and repair fundamentals relevant to the vehicle type",
      "Correct and safe use of tools, manuals, and diagnostic procedures",
      "Troubleshooting based on symptoms and inspection evidence",
      "Workshop cleanliness, parts handling, and job-card discipline",
      "Communicating findings without claiming unverified repairs",
    ],
    evidenceExamples: [
      "A fictional inspection sheet or maintenance checklist",
      "A troubleshooting flow for a common supervised practice case",
      "A practice log describing tools, procedure, checks, and result",
      "A sanitized job card or before-and-after documentation",
    ],
    analysisCautions: [
      "Do not invent licenses, independent repair authority, diagnostic tools, or vehicle systems not supplied.",
      "Never recommend unsafe unsupervised practice on vehicles or powered equipment.",
    ],
  },
  manufacturing: {
    fieldLabel: "Manufacturing, Machining & Welding",
    competencyAreas: [
      "Reading work instructions, drawings, measurements, or production specifications",
      "Safe operation and setup within the candidate's demonstrated authorization",
      "Quality checks, defect identification, and accurate production records",
      "5S, housekeeping, personal protective equipment, and hazard awareness",
      "Consistency, handover, and escalation when output is outside tolerance",
    ],
    evidenceExamples: [
      "A measurement or quality-control sheet using sample data",
      "A machine pre-use, 5S, or safety checklist",
      "A supervised practice log describing process and inspection points",
      "A drawing, CAD model, or work sample that is safe and permitted to share",
    ],
    analysisCautions: [
      "Do not invent machine authorization, welding qualification, tolerances, or production metrics.",
      "Do not recommend operating hazardous machinery without proper supervision and authorization.",
    ],
  },
  construction: {
    fieldLabel: "Construction, Building & CAD",
    competencyAreas: [
      "Reading drawings, dimensions, work instructions, and material requirements",
      "Role-appropriate measuring, drafting, assembly, or site fundamentals",
      "Worksite safety, housekeeping, personal protective equipment, and hazard reporting",
      "Accuracy, sequencing, teamwork, and supervisor communication",
      "CAD, surveying, or trade tools only when supported by training or experience",
    ],
    evidenceExamples: [
      "A CAD drawing, material estimate, or measurement exercise",
      "A toolbox-talk note, hazard checklist, or safe-work sequence",
      "A supervised practice log with sanitized photos when permitted",
      "A quality checklist for a fictional or training project",
    ],
    analysisCautions: [
      "Do not invent trade certification, site authorization, equipment licenses, or unsupervised capability.",
      "Treat safety-critical gaps as material even when other skills align.",
    ],
  },
  electrical_refrigeration: {
    fieldLabel: "Electrical, Electronics & Refrigeration",
    competencyAreas: [
      "Electrical or refrigeration fundamentals relevant to the target role",
      "Safe isolation, measurement, inspection, and troubleshooting procedures",
      "Reading diagrams, manuals, specifications, and maintenance records",
      "Correct tool use and escalation of unsafe or out-of-scope conditions",
      "Installation or maintenance evidence only within demonstrated training and authorization",
    ],
    evidenceExamples: [
      "A wiring or refrigeration diagram interpretation exercise",
      "A fictional inspection and preventive-maintenance checklist",
      "A supervised troubleshooting log with measurements and conclusions",
      "A safety procedure or tool-identification worksheet",
    ],
    analysisCautions: [
      "Do not invent electrical authorization, refrigerant-handling certification, or independent service capability.",
      "Never recommend live electrical or pressurized-system practice without qualified supervision.",
    ],
  },
  creative_services: {
    fieldLabel: "Design, Multimedia, Fashion & Beauty",
    competencyAreas: [
      "Role-specific craft fundamentals and consistent execution",
      "Understanding briefs, references, revisions, and client or audience needs",
      "Safe, hygienic, and appropriate tool or material handling where relevant",
      "Portfolio selection that explains the candidate's own contribution",
      "File, material, time, and quality management relevant to the role",
    ],
    evidenceExamples: [
      "A small curated portfolio with context, process, and individual contribution",
      "A fictional brief and completed response with revision notes",
      "A measurement, hygiene, preparation, or delivery checklist relevant to the craft",
      "Before-and-after documentation using consented or non-identifying material",
    ],
    analysisCautions: [
      "Do not invent software mastery, client work, engagement metrics, or ownership of collaborative work.",
      "Do not use protected client material or identifiable images without permission.",
    ],
  },
  finance_accounting: {
    fieldLabel: "Finance & Accounting",
    competencyAreas: [
      "Accurate transaction recording, classification, and reconciliation fundamentals",
      "Spreadsheet or accounting tools explicitly required by the posting",
      "Document control, confidentiality, and audit-trail discipline",
      "Basic cash, invoice, bookkeeping, or reporting tasks relevant to the role",
      "Error checking and escalation of discrepancies",
    ],
    evidenceExamples: [
      "A fictional cashbook, journal, invoice register, or reconciliation sheet",
      "A spreadsheet with formulas, validation, and clearly labeled sample data",
      "A document-control or month-end checklist",
      "A short discrepancy case explaining checks and corrections",
    ],
    analysisCautions: [
      "Do not invent financial authority, accounting-software experience, or error-reduction metrics.",
      "All samples must use fictional or fully sanitized financial data.",
    ],
  },
  education_training: {
    fieldLabel: "Education & Training",
    competencyAreas: [
      "Explaining instructions clearly and checking learner understanding",
      "Preparing materials, activities, attendance, or class administration",
      "Facilitation, patience, inclusion, and appropriate feedback",
      "Role-specific subject knowledge supported by the candidate profile",
      "Safeguarding, confidentiality, and escalation responsibilities where relevant",
    ],
    evidenceExamples: [
      "A lesson outline, facilitation plan, or learner worksheet",
      "A fictional attendance, feedback, or class-administration template",
      "A short teaching demonstration or reflection",
      "An activity plan with objectives, timing, and checks for understanding",
    ],
    analysisCautions: [
      "Do not invent teaching credentials, subject mastery, or experience with specific learner groups.",
      "Do not include identifiable learner data in evidence samples.",
    ],
  },
};

// Generic guidance keeps valid but not-yet-specialized fields conservative.
function createGenericGuidance(jobField: JobField): JobFieldGuidance {
  const field = jobFieldCatalogByValue[jobField];

  return {
    fieldLabel: field.label,
    competencyAreas: [
      `Role-specific fundamentals for ${field.shortLabel}`,
      "Transferable competencies supported by the candidate profile",
      "Skills, tools, responsibilities, and qualifications stated in the posting",
      "Practical evidence from work, training, internships, organizations, school, or projects",
    ],
    evidenceExamples: [
      `A fictional or sanitized work sample relevant to roles such as ${field.exampleRoles.join(", ")}`,
      "A checklist, short report, task example, or process explanation",
      "A concise example of responsibilities, actions, and results",
    ],
    analysisCautions: [
      "Do not claim deep specialist coverage for this field.",
      "Avoid field-specific certifications, tools, or requirements unless explicitly supported by the posting.",
      "Separate employer requirements from optional development recommendations.",
    ],
  };
}

export function getJobFieldGuidance(jobField: JobField): JobFieldGuidance {
  return specializedGuidance[jobField] ?? createGenericGuidance(jobField);
}
