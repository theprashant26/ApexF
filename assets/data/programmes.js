/* ==========================================================================
   APEX — programme dataset. SINGLE SOURCE OF TRUTH.
   Everything on the site (listings, detail pages, the role finder, the
   mega-menu, the marquee, the counters) is derived from this array at runtime.
   Never hand-maintain a second list of programmes or roles anywhere.

   Delivered as a plain script (not .json) so the site also works when the
   files are opened directly from disk, where fetch() is blocked by the
   browser's file:// origin rules.

   Schema per entry:
     id            kebab-case internal id
     number        1..21, the order in the official register
     division      display name of the division
     code          unique short code, used in ?code= URLs
     certificate   full certificate title
     programme     diploma title
     group         one of the four sector groups
     intro         2-3 neutral sentences, derived only from trainingAreas
     trainingAreas string[]
     careerRoles   string[]  — "career-oriented roles this programme trains for"
     slug          URL-safe name, reserved for future static pages
   ========================================================================== */
window.AX_PROGRAMMES = [
  {
    id: "metro-rail",
    number: 1,
    division: "Metro & Rail Division",
    code: "MIRTC",
    fees: [
      { months: 3, total: "₹43,999", first: "₹13,999" },
      { months: 6, total: "₹79,999", first: null },
      { months: 12, total: "₹1,79,999", first: null }
    ],
    certificate: "Metro Industrial & Rail Technical Certificate",
    programme: "Diploma in Metro Rail Management",
    group: "Transport, Aviation & Logistics",
    intro: "This programme covers how a metro rail network runs day to day, from station operations and passenger services through to ticketing and customer care. Training also includes metro safety and security awareness alongside basic rail and metro administration. Professional communication runs through the programme as a core skill.",
    trainingAreas: ["Metro Rail Operations", "Station Operations & Management", "Passenger Services", "Ticketing & Customer Care", "Metro Safety & Security", "Basic Rail & Metro Administration", "Professional Communication"],
    careerRoles: ["Station Operations Executive", "Customer Service Executive", "Ticketing Executive", "Operations Assistant", "Passenger Service Executive"],
    slug: "metro-rail-management"
  },
  {
    id: "railway",
    number: 2,
    division: "Railway Division",
    code: "RIATC",
    fees: [
      { months: 3, total: "₹43,999", first: "₹13,999" },
      { months: 6, total: "₹79,999", first: null },
      { months: 12, total: "₹1,79,999", first: null }
    ],
    certificate: "Railway Industrial & Training Certificate",
    programme: "Diploma in Railway Management",
    group: "Transport, Aviation & Logistics",
    intro: "Training in this programme is built around railway operations, station management and the handling of passengers across a working station environment. It introduces the basics of ticketing and reservation together with railway safety awareness. Operations administration and customer service complete the scope.",
    trainingAreas: ["Railway Operations", "Station Management", "Passenger Handling", "Ticketing & Reservation Basics", "Railway Safety Awareness", "Operations Administration", "Customer Service"],
    careerRoles: ["Railway Operations Assistant", "Station Support Executive", "Passenger Service Executive", "Ticketing Assistant", "Railway Administration Assistant"],
    slug: "railway-management"
  },
  {
    id: "aviation",
    number: 3,
    division: "Aviation Division",
    code: "AATC",
    fees: [
      { months: 3, total: "₹43,999", first: "₹13,999" },
      { months: 6, total: "₹79,999", first: null },
      { months: 12, total: "₹1,79,999", first: null }
    ],
    certificate: "Airline & Aviation Training Certificate",
    programme: "Diploma in Aviation Management",
    group: "Transport, Aviation & Logistics",
    intro: "This programme spans airport and airline operations, with focused training on passenger handling, airline ticketing and reservation basics. Ground operations and airport customer service are covered as practical working areas. Aviation administration is included to round out the operational picture.",
    trainingAreas: ["Airport Operations", "Airline Operations", "Passenger Handling", "Airline Ticketing", "Reservation Basics", "Ground Operations", "Airport Customer Service", "Aviation Administration"],
    careerRoles: ["Airport Operations Executive", "Ticketing Executive", "Passenger Service Executive", "Ground Operations Assistant", "Customer Service Executive"],
    slug: "aviation-management"
  },
  {
    id: "hospitality",
    number: 4,
    division: "Hospitality Division",
    code: "HITC",
    fees: [
      { months: 3, total: "₹43,999", first: "₹13,999" },
      { months: 6, total: "₹79,999", first: null },
      { months: 12, total: "₹1,79,999", first: null }
    ],
    certificate: "Hotel Industry Training Certificate",
    programme: "Diploma in Hotel Management",
    group: "Hospitality, Travel & Retail",
    intro: "Training covers the core departments of a hotel: front office operations, housekeeping management and food and beverage services. Guest relations and customer service are treated as practical, everyday skills. Hotel administration and wider hospitality operations complete the programme.",
    trainingAreas: ["Front Office Operations", "Housekeeping Management", "Food & Beverage Services", "Guest Relations", "Hotel Administration", "Hospitality Operations", "Customer Service"],
    careerRoles: ["Front Office Executive", "Guest Relations Executive", "Hotel Operations Assistant", "Housekeeping Supervisor", "Hospitality Executive"],
    slug: "hotel-management"
  },
  {
    id: "travel-tourism",
    number: 5,
    division: "Travel & Tourism Division",
    code: "TTMC",
    fees: [
      { months: 3, total: "₹43,999", first: "₹13,999" },
      { months: 6, total: "₹79,999", first: null },
      { months: 12, total: "₹1,79,999", first: null }
    ],
    certificate: "Travel & Tourism Management Certificate",
    programme: "Diploma in Travel & Tourism Management",
    group: "Hospitality, Travel & Retail",
    intro: "This programme looks at how a travel agency operates, covering tour planning, travel documentation and ticketing and reservation work. Tourism operations and customer relationship management are studied alongside the practical side of the business. Travel business basics are introduced to give commercial context.",
    trainingAreas: ["Travel Agency Operations", "Tour Planning", "Travel Documentation", "Ticketing & Reservation", "Tourism Operations", "Customer Relationship Management", "Travel Business Basics"],
    careerRoles: ["Travel Consultant", "Tour Executive", "Ticketing Executive", "Travel Operations Executive", "Customer Service Executive"],
    slug: "travel-tourism-management"
  },
  {
    id: "medical",
    number: 6,
    division: "Medical Division",
    code: "MITC",
    fees: [
      { months: 3, total: "₹25,500", first: "₹10,500" },
      { months: 6, total: "₹45,500", first: null },
      { months: 12, total: "₹1,15,500", first: null }
    ],
    certificate: "Medical Industry Training Certificate",
    programme: "Diploma in Medical Management",
    group: "Health & Pharma",
    intro: "Training focuses on the administrative side of healthcare, including hospital front office work, patient service management and medical documentation. Healthcare operations and hospital administration basics are covered as structured processes. Professional communication is treated as an essential part of patient-facing work.",
    trainingAreas: ["Healthcare Administration", "Hospital Front Office", "Patient Service Management", "Medical Documentation", "Healthcare Operations", "Hospital Administration Basics", "Professional Communication"],
    careerRoles: ["Hospital Administration Assistant", "Patient Service Executive", "Medical Office Assistant", "Healthcare Operations Executive", "Front Office Executive"],
    slug: "medical-management"
  },
  {
    id: "pharmaceutical",
    number: 7,
    division: "Pharmaceutical Division",
    code: "PITC",
    fees: [
      { months: 3, total: "₹19,999", first: "₹9,999" },
      { months: 6, total: "₹45,500", first: null },
      { months: 12, total: "₹1,15,500", first: null }
    ],
    certificate: "Pharmaceutical Industry Training Certificate",
    programme: "Diploma in Pharmaceutical Management",
    group: "Health & Pharma",
    intro: "This programme covers pharmaceutical industry operations together with pharmacy administration and medical store management. Inventory management and product documentation are studied as working disciplines. Pharmaceutical sales and marketing and customer service are also part of the scope.",
    trainingAreas: ["Pharmaceutical Industry Operations", "Pharmacy Administration", "Medical Store Management", "Inventory Management", "Pharmaceutical Sales & Marketing", "Product Documentation", "Customer Service"],
    careerRoles: ["Pharmacy Administration Assistant", "Medical Store Assistant", "Pharmaceutical Sales Executive", "Inventory Executive", "Healthcare Sales Executive"],
    slug: "pharmaceutical-management"
  },
  {
    id: "electrical",
    number: 8,
    division: "Electrical Division",
    code: "EITC",
    fees: [
      { months: 3, total: "₹25,500", first: "₹10,500" },
      { months: 6, total: "₹45,500", first: null },
      { months: 12, total: "₹1,15,500", first: null }
    ],
    certificate: "Electrical Industrial Training Certificate",
    programme: "Diploma in Electrical Management",
    group: "Business, Technical & Engineering",
    intro: "Training begins with electrical fundamentals and electrical safety, then moves into equipment operations and maintenance management. Basic electrical systems are studied in a practical context. Workplace safety and technical documentation are carried through the programme.",
    trainingAreas: ["Electrical Fundamentals", "Electrical Safety", "Equipment Operations", "Maintenance Management", "Basic Electrical Systems", "Workplace Safety", "Technical Documentation"],
    careerRoles: ["Electrical Maintenance Assistant", "Electrical Operations Assistant", "Maintenance Executive", "Technical Support Assistant"],
    slug: "electrical-management"
  },
  {
    id: "security",
    number: 9,
    division: "Security Division",
    code: "SITC",
    fees: [
      { months: 3, total: "₹25,500", first: "₹10,500" },
      { months: 6, total: "₹45,500", first: null },
      { months: 12, total: "₹1,15,500", first: null }
    ],
    certificate: "Security Industry Training Certificate",
    programme: "Diploma in Security Management",
    group: "Hospitality, Travel & Retail",
    intro: "This programme covers security operations, access control and the supervision of a security team. Incident reporting and crowd management are treated as practical procedures. Emergency response awareness and workplace safety complete the training scope.",
    trainingAreas: ["Security Operations", "Access Control", "Security Supervision", "Incident Reporting", "Crowd Management", "Emergency Response Awareness", "Workplace Safety"],
    careerRoles: ["Security Supervisor", "Security Operations Executive", "Security Coordinator", "Access Control Executive", "Security Support Officer"],
    slug: "security-management"
  },
  {
    id: "education",
    number: 10,
    division: "Teaching & Education Division",
    code: "TITC",
    fees: [
      { months: 3, total: "₹25,500", first: "₹10,500" },
      { months: 6, total: "₹45,500", first: null },
      { months: 12, total: "₹1,15,500", first: null }
    ],
    certificate: "Teaching Industry Training Certificate",
    programme: "Diploma in Education & Teaching Management",
    group: "Business, Technical & Engineering",
    intro: "Training covers teaching fundamentals, classroom management and the support of students in a learning environment. Educational administration and academic coordination are studied as organising work. Lesson planning basics and communication skills run alongside them.",
    trainingAreas: ["Teaching Fundamentals", "Classroom Management", "Student Support", "Educational Administration", "Communication Skills", "Lesson Planning Basics", "Academic Coordination"],
    careerRoles: ["Teaching Assistant", "Academic Coordinator", "Education Support Executive", "Student Support Executive", "Administrative Assistant"],
    slug: "education-teaching-management"
  },
  {
    id: "banking",
    number: 11,
    division: "Banking Division",
    code: "BITC",
    fees: [
      { months: 3, total: "₹25,500", first: "₹10,500" },
      { months: 6, total: "₹45,500", first: null },
      { months: 12, total: "₹1,15,500", first: null }
    ],
    certificate: "Banking Industry Training Certificate",
    programme: "Diploma in Banking Management",
    group: "Business, Technical & Engineering",
    intro: "This programme covers banking operations and customer service together with the basics of account documentation. Banking administration and digital banking awareness are included as current working practice. Financial services basics and professional communication complete the scope.",
    trainingAreas: ["Banking Operations", "Customer Service", "Account Documentation Basics", "Banking Administration", "Digital Banking Awareness", "Financial Services Basics", "Professional Communication"],
    careerRoles: ["Banking Operations Assistant", "Customer Service Executive", "Banking Support Executive", "Relationship Executive", "Documentation Executive"],
    slug: "banking-management"
  },
  {
    id: "logistics",
    number: 12,
    division: "Logistics Division",
    code: "LITC",
    fees: [
      { months: 3, total: "₹25,500", first: "₹10,500" },
      { months: 6, total: "₹45,500", first: null },
      { months: 12, total: "₹1,15,500", first: null }
    ],
    certificate: "Logistics Industry Training Certificate",
    programme: "Diploma in Logistics Management",
    group: "Transport, Aviation & Logistics",
    intro: "Training covers logistics operations, warehouse management and inventory control as a connected process. Transportation operations and supply chain basics give the wider context. Dispatch and documentation work and material handling awareness are also included.",
    trainingAreas: ["Logistics Operations", "Warehouse Management", "Inventory Control", "Transportation Operations", "Supply Chain Basics", "Dispatch & Documentation", "Material Handling Awareness"],
    careerRoles: ["Logistics Executive", "Warehouse Executive", "Inventory Assistant", "Dispatch Executive", "Logistics Coordinator"],
    slug: "logistics-management"
  },
  {
    id: "manufacturing",
    number: 13,
    division: "Manufacturing Division",
    code: "MIMC",
    fees: [
      { months: 3, total: "₹25,500", first: "₹10,500" },
      { months: 6, total: "₹45,500", first: null },
      { months: 12, total: "₹1,15,500", first: null }
    ],
    certificate: "Manufacturing Industry Management Certificate",
    programme: "Diploma in Manufacturing Management",
    group: "Business, Technical & Engineering",
    intro: "Training covers production management and manufacturing operations along with the basics of quality management. Inventory management and production planning are studied as scheduling disciplines. Workplace safety and industrial administration run through the programme.",
    trainingAreas: ["Production Management", "Manufacturing Operations", "Quality Management Basics", "Inventory Management", "Production Planning", "Workplace Safety", "Industrial Administration"],
    careerRoles: ["Production Assistant", "Manufacturing Executive", "Quality Assistant", "Inventory Executive", "Production Coordinator"],
    slug: "manufacturing-management"
  },
  {
    id: "it-technology",
    number: 14,
    division: "Information Technology Division",
    code: "ITITC",
    fees: [
      { months: 3, total: "₹25,500", first: "₹10,500" },
      { months: 6, total: "₹45,500", first: null },
      { months: 12, total: "₹1,15,500", first: null }
    ],
    certificate: "IT Industry Technical Certificate",
    programme: "Diploma in IT Management",
    group: "Business, Technical & Engineering",
    intro: "This programme covers IT fundamentals, computer applications and day-to-day IT support work. Digital operations and basic networking are introduced as practical areas. Data and documentation handling and technology management complete the scope.",
    trainingAreas: ["IT Fundamentals", "Computer Applications", "IT Support", "Digital Operations", "Basic Networking", "Data & Documentation", "Technology Management"],
    careerRoles: ["IT Support Executive", "Computer Operator", "Technical Support Assistant", "IT Operations Assistant", "Data Support Executive"],
    slug: "it-management"
  },
  {
    id: "civil-engineering",
    number: 15,
    division: "Construction Division",
    code: "CETC",
    fees: [
      { months: 3, total: "₹25,500", first: "₹10,500" },
      { months: 6, total: "₹45,500", first: null },
      { months: 12, total: "₹1,15,500", first: null }
    ],
    certificate: "Civil Engineering Training Certificate",
    programme: "Diploma in Civil Management",
    group: "Business, Technical & Engineering",
    intro: "Training covers construction management basics and site operations as connected work. Project documentation, basic estimation and site coordination are studied as practical tasks. Construction safety and infrastructure operations run through the programme.",
    trainingAreas: ["Construction Management Basics", "Site Operations", "Project Documentation", "Basic Estimation", "Construction Safety", "Infrastructure Operations", "Site Coordination"],
    careerRoles: ["Site Assistant", "Construction Coordinator", "Project Support Executive", "Site Documentation Assistant"],
    slug: "civil-management"
  },
  {
    id: "infrastructure",
    number: 16,
    division: "Infrastructure Division",
    code: "IITC",
    certificate: "Infrastructure Industry Training Certificate",
    programme: "Diploma in Infrastructure Management",
    group: "Business, Technical & Engineering",
    intro: "This programme covers how infrastructure projects are run on the ground, from site supervision and materials coordination through to project documentation. Quality and safety compliance is treated as a continuous requirement rather than a final check. Contract and tender basics give the commercial context for site reporting.",
    trainingAreas: ["Infrastructure Project Operations", "Site Supervision", "Project Documentation", "Quality & Safety Compliance", "Materials & Equipment Coordination", "Contract & Tender Basics", "Site Reporting"],
    careerRoles: ["Infrastructure Project Assistant", "Site Supervisor", "Project Support Executive", "Documentation Executive", "Quality Assistant"],
    fees: [
      { months: 3, total: "₹25,500", first: "₹10,500", confirmed: true },
      { months: 6, total: "₹45,500", first: null, confirmed: true },
      { months: 12, total: "₹1,15,500", first: null, confirmed: true }
    ],
    slug: "infrastructure-management"
  },
  {
    id: "agriculture",
    number: 17,
    division: "Agriculture Division",
    code: "AITC",
    certificate: "Agriculture Industry Training Certificate",
    programme: "Diploma in Agriculture Management",
    group: "Business, Technical & Engineering",
    intro: "Training covers the business and administrative side of agriculture, including farm administration, agri input and supply management, and post-harvest handling. Crop production basics give the practical grounding for that work. Agri marketing and record keeping complete the scope.",
    trainingAreas: ["Agriculture Business Operations", "Farm Administration", "Crop Production Basics", "Agri Input & Supply Management", "Post-Harvest & Warehouse Handling", "Agri Marketing & Sales", "Record Keeping & Documentation"],
    careerRoles: ["Agriculture Field Assistant", "Farm Operations Assistant", "Agri Sales Executive", "Agri Input Coordinator", "Inventory Assistant"],
    fees: [
      { months: 3, total: "₹25,500", first: "₹10,500", confirmed: true },
      { months: 6, total: "₹45,500", first: null, confirmed: true },
      { months: 12, total: "₹1,15,500", first: null, confirmed: true }
    ],
    slug: "agriculture-management"
  },
  {
    id: "retail",
    number: 18,
    division: "Retail Division",
    code: "RIMC",
    fees: [
      { months: 3, total: "₹25,500", first: "₹10,500" },
      { months: 6, total: "₹45,500", first: null },
      { months: 12, total: "₹1,15,500", first: null }
    ],
    certificate: "Retail Industry Management Certificate",
    programme: "Diploma in Retail Management",
    group: "Hospitality, Travel & Retail",
    intro: "Training covers retail operations and store management alongside the sales side of the business. Customer service and inventory management are treated as daily working practice. Retail administration and merchandising basics complete the programme.",
    trainingAreas: ["Retail Operations", "Store Management", "Sales Management", "Customer Service", "Inventory Management", "Retail Administration", "Merchandising Basics"],
    careerRoles: ["Retail Executive", "Store Executive", "Sales Executive", "Customer Service Executive", "Inventory Assistant"],
    slug: "retail-management"
  },
  {
    id: "finance-accounting",
    number: 19,
    division: "Finance Division",
    code: "FITC",
    fees: [
      { months: 3, total: "₹25,500", first: "₹10,500" },
      { months: 6, total: "₹45,500", first: null },
      { months: 12, total: "₹1,15,500", first: null }
    ],
    certificate: "Finance & Accounting Industry Training Certificate",
    programme: "Diploma in Finance & Accounting Management",
    group: "Business, Technical & Engineering",
    intro: "Training starts from accounting fundamentals and bookkeeping, then covers billing and invoicing and financial documentation. Office accounting is studied as everyday practice. Basic financial management and computerized accounting basics are included.",
    trainingAreas: ["Accounting Fundamentals", "Bookkeeping", "Billing & Invoicing", "Financial Documentation", "Office Accounting", "Basic Financial Management", "Computerized Accounting Basics"],
    careerRoles: ["Accounts Assistant", "Billing Executive", "Finance Assistant", "Accounting Executive", "Documentation Executive"],
    slug: "finance-accounting-management"
  },
  {
    id: "insurance",
    number: 20,
    division: "Insurance Division",
    code: "INITC",
    certificate: "Insurance Industry Training Certificate",
    programme: "Diploma in Insurance Management",
    group: "Business, Technical & Engineering",
    intro: "This programme covers insurance industry operations with a focus on policy servicing and the basics of claims processing. Customer relationship management and insurance documentation are studied as everyday working practice. Regulatory awareness and professional communication run through the programme.",
    trainingAreas: ["Insurance Industry Operations", "Policy Servicing", "Claims Processing Basics", "Customer Relationship Management", "Insurance Documentation", "Regulatory Awareness", "Professional Communication"],
    careerRoles: ["Insurance Operations Assistant", "Policy Servicing Executive", "Claims Assistant", "Customer Service Executive", "Documentation Executive"],
    fees: [
      { months: 3, total: "₹25,500", first: "₹10,500", confirmed: true },
      { months: 6, total: "₹45,500", first: null, confirmed: true },
      { months: 12, total: "₹1,15,500", first: null, confirmed: true }
    ],
    slug: "insurance-management"
  },
  {
    id: "professional-skill",
    number: 21,
    division: "Professional Skill Development",
    code: "PSDC",
    fees: [
      { months: 3, total: "₹25,500", first: "₹10,500" },
      { months: 6, total: "₹45,500", first: null },
      { months: 12, total: "₹1,15,500", first: null }
    ],
    certificate: "Professional Skill Development Certificate",
    programme: "Diploma in Professional Skill Development",
    group: "Business, Technical & Engineering",
    intro: "This programme concentrates on the skills that apply across any workplace: communication, computer skills and workplace etiquette. Interview preparation and resume development are practised directly. Professional behaviour and career development are covered as ongoing habits.",
    trainingAreas: ["Communication Skills", "Computer Skills", "Interview Preparation", "Resume Development", "Workplace Etiquette", "Professional Behaviour", "Career Development"],
    careerRoles: ["Office Assistant", "Customer Support Executive", "Administrative Assistant", "Business Support Executive"],
    slug: "professional-skill-development"
  }
];

/* The four sector groups, in the order they appear in the mega-menu. */
window.AX_GROUPS = [
  {
    name: "Transport, Aviation & Logistics",
    short: "Transport & Aviation",
    blurb: "Metro, rail, air and road networks — the operations that keep people and goods moving."
  },
  {
    name: "Hospitality, Travel & Retail",
    short: "Hospitality & Retail",
    blurb: "Guest-facing work where service quality is the product: hotels, travel, stores and site security."
  },
  {
    name: "Health & Pharma",
    short: "Health & Pharma",
    blurb: "The administration, documentation and patient-service side of hospitals, clinics and pharmacy."
  },
  {
    name: "Business, Technical & Engineering",
    short: "Business & Technical",
    blurb: "Banking, finance, IT, education and the engineering and manufacturing trades."
  }
];

/* Common programme features (Section 7.1 of the brief). Wording is fixed. */
window.AX_FEATURES = [
  "Online learning, accessible from anywhere",
  "Industry-oriented curriculum",
  "Practical-oriented training",
  "Assignments and assessments",
  "Professional communication training",
  "Interview preparation",
  "Career guidance",
  "Resume/CV assistance",
  "Course completion certificate, subject to institute requirements"
];

/* Mandatory compliance copy. Referenced everywhere — never retyped by hand. */
window.AX_COMPLIANCE = {
  policy: "Apex Professional Academy clearly distinguishes its own training certificates from government, university, statutory-board or professional-licensing qualifications. Any claim of affiliation, approval, accreditation or recognition is published only when supported by the applicable official authorisation or agreement.",
  roles: "Completion of a training programme does not automatically guarantee employment, appointment, government recruitment, professional registration or a particular salary."
};

/* ==========================================================================
   ACADEMY FACTS — supplied by Apex Professional Academy.
   Everything here is client-confirmed copy. Anything the client marked
   "TO BE CONFIRMED" stays in AX.PH (assets/js/apex.js) as a visible chip
   rather than being guessed at here.
   ========================================================================== */
window.AX_ACADEMY = {
  name: "Apex Professional Academy",
  institution: "Apex Institute of Multidisciplinary Professional Studies",
  shortName: "APA / AIMPS",
  nature: "Professional Skill Development & Career-Oriented Training Institute",
  established: "2010",
  founder: "Pareshnath Shutradhar",

  /* Positioning, as worded by the client. */
  positioning: "Industry-Oriented Training. Practical Skills. Career-Focused Learning.",
  supportingLine: "Professional training programmes designed to build practical knowledge, workplace skills and career readiness.",
  careerStatement: "Our programmes are designed around industry-relevant skills and career pathways, helping learners prepare for suitable professional roles and further career opportunities.",

  address: {
    lines: ["Apex Professional Academy", "Puncha Puruliya", "Behind Anupama Medical Store",
            "Puncha", "West Bengal", "723151", "India"],
    oneLine: "Puncha Puruliya, Behind Anupama Medical Store, Puncha, West Bengal 723151, India"
  },
  /* The map is derived from this one query string, so it can never disagree
     with the address above. Swap it for the client's own Google Business
     Profile share link if they have one — that gives an exact pin. */
  mapQuery: "Apex Professional Academy, Behind Anupama Medical Store, Puncha, Purulia, West Bengal 723151, India",
  hours: { weekdays: "Monday – Saturday: 10:00 AM to 6:30 PM", sunday: "Sunday: Closed" },
  admissionsDesk: "Admissions Department / Admissions Desk",

  /* Fees. One published figure covers the whole register; see REQUIREMENTS.md
     for the open question on whether registration sits inside the total. */
  fee: {
    /* Amounts are per-programme and live on each programme entry, so there is
       no academy-wide total here that could drift out of step with them. */
    instalment: "Available",
    /* 3-month courses have a published first instalment. For 6- and 12-month
       courses the client confirmed EMI is arranged on request. */
    emiOnRequest: "EMI on request",
    emiOnRequestNote: "For the 6-month and 12-month courses an instalment plan is arranged on request. Speak to the Admissions Desk before you enrol and the schedule will be confirmed in writing.",
    structureNote: "The first instalment is part of the total programme fee, not an additional charge. The balance is payable on the schedule agreed before enrolment.",
    includes: [
      "Academic/training sessions",
      "Course study material, where applicable",
      "Practical training, where applicable",
      "Internal assessments",
      "Course-related guidance",
      "Student support",
      "Course completion certificate, subject to applicable academic requirements"
    ],
    excludes: [
      "Travel and transportation expenses",
      "Accommodation",
      "Food and personal expenses",
      "Government/statutory fees, where applicable",
      "Third-party examination or certification charges",
      "Any other expense specifically excluded from the programme fee"
    ],
    note: "The exact inclusions and exclusions will be communicated before enrolment."
  },

  /* Every programme runs at three lengths. The award title depends on the
     length, not on the division. Client-confirmed 25 Sep 2026. */
  durations: [
    { months: 3,  label: "3 months",  hours: "120 hours", category: "Short-Term Course", award: "Professional Certificate Course" },
    { months: 6,  label: "6 months",  hours: "240 hours", category: "Advanced Course",   award: "Advanced Professional Certificate" },
    { months: 12, label: "12 months", hours: "480 hours", category: "Long-Term Course",  award: "Professional Diploma Programme" }
  ],

  /* Uniform across the register, confirmed by the client. */
  eligibility: "Intermediate (Class 12) or above",
  eligibilityNote: "A minimum of Intermediate (Class 12) applies across the register. Where a specific programme has an additional educational or technical requirement, it is confirmed during counselling.",

  eligibilityOptions: [
    ["10th Pass", "Applicable to programmes accepting candidates who have completed Class 10"],
    ["12th Pass", "Applicable to programmes requiring completion of Class 12"],
    ["Graduate", "Applicable to programmes requiring a bachelor’s degree"],
    ["Other", "Where a programme has specific educational or technical requirements"]
  ],

  ageRequirement: "No general age restriction, unless otherwise specified for a particular programme. Where a specific programme, employer, regulatory authority or placement opportunity has an age requirement, the applicable requirement will be communicated separately.",

  documents: [
    "Recent passport-size photographs",
    "Aadhaar Card or other valid identity proof",
    "PAN Card, where applicable",
    "Class 10 marksheet/certificate",
    "Class 12 marksheet/certificate, where applicable",
    "Graduation marksheet/degree certificate, where applicable",
    "Previous qualification certificates, where applicable",
    "Address proof, where required",
    "Any programme-specific document",
    "Any additional document required for verification"
  ],
  documentsWarning: "Students should submit genuine and valid documents. Submission of false, forged or misleading documents may result in cancellation of admission.",

  batch: {
    types: "Online / Distance Learning",
    open: "Enrol any time",
    rolling: "Admission is open all year. Because training is delivered online, there are no fixed intake dates — you can enrol whenever you are ready and begin with the next available session."
  },

  /* Delivery is online only, confirmed by the client 25 Sep 2026. */
  learningModes: [
    "Online training, delivered remotely",
    "Self-paced study with structured assessments",
    "Practical-oriented assignments completed remotely",
    "Online professional communication and interview preparation"
  ],
  learningModeNote: "All Apex programmes are delivered online. There is no classroom attendance requirement, which is also why admission is open all year rather than running to fixed intakes.",

  /* Used by divisions added to the register before their curriculum is
     published. Nothing is invented for them — the page says so plainly. */
  pendingCurriculum: "The curriculum for this division is being finalised. Training areas and the career-oriented roles it trains for will be published once confirmed by the institute. Contact the Admissions Desk for the current position.",

  certificate: {
    description: "Upon successful completion of the prescribed training programme and fulfilment of the applicable academic requirements, eligible learners may be awarded a Course Completion Certificate by Apex Professional Academy. The certificate will identify the name of the programme completed and the applicable programme/course code.",
    caution: "The certificate is not a government certificate, a government-approved certificate, a university degree, a statutory licence or an accredited qualification."
  },

  about: {
    intro: "Apex Professional Academy is a professional training institution focused on skill development, practical learning and career-oriented education across multiple industry sectors.",
    aim: "The Academy aims to provide structured training that combines foundational knowledge, practical exposure and professional development to help learners prepare for workplace and industry environments.",
    audience: "Our programmes are designed for learners seeking to develop sector-specific knowledge and professional skills in areas such as Metro & Rail, Railway, Aviation, Hospitality, Travel & Tourism, Medical, Pharmaceutical, Electrical, Security, IT and other professional domains.",
    background: "Apex Professional Academy was established with the objective of creating accessible, structured and career-oriented professional training opportunities for learners seeking industry-specific knowledge and practical skills. The Academy focuses on developing programmes that combine academic understanding with professional and practical learning, enabling students to build relevant skills for further education, employment preparation and career development."
  },

  approach: [
    "Industry-oriented learning",
    "Practical skill development",
    "Professional communication",
    "Workplace awareness",
    "Structured assessments",
    "Career guidance",
    "Continuous learner support"
  ],

  /* Legal text, verbatim from the client. */
  legal: {
    feePolicy: [
      "Programme fees must be paid according to the fee structure communicated by Apex Professional Academy at the time of enrolment.",
      "Before completing enrolment, students should review the applicable programme fee, payment schedule, inclusions, exclusions and applicable terms.",
      "A student should retain the official fee receipt/payment acknowledgement issued by the Academy."
    ],
    refundIntro: "All applicants are advised to carefully read this Refund Policy before enrolling in any programme at Apex Professional Academy. By enrolling, the applicant acknowledges and agrees to be legally bound by this policy.",
    refundSections: [
      ["1. Strictly non-refundable fees", [
        "All fees paid to Apex Professional Academy, whether full or partial, are strictly non-refundable under any circumstances.",
        "This policy applies in all situations, including but not limited to: failure to join the course after admission; voluntary withdrawal or discontinuation by the student; personal, medical, financial or any other reasons; dissatisfaction with the course or services; failure to secure job placement or employment."
      ]],
      ["2. No adjustment or transfer of fees", [
        "Fees once paid shall not be adjusted or transferred under any circumstances, including transfer to another course, transfer to another batch, or transfer to another student or candidate."
      ]],
      ["3. Running batch / mid-session admission", [
        "Candidates enrolling in an ongoing or running batch shall have no entitlement to any refund, regardless of the remaining course duration.",
        "No claim for refund or adjustment shall be entertained on the basis of reduced course duration due to late admission."
      ]],
      ["4. Self study / distance learning courses", [
        "Fees paid for self study or distance learning programmes are strictly non-refundable.",
        "No refund shall be provided on the grounds of non-availability of classroom training, as such modes are self-driven by nature."
      ]],
      ["5. No refund in special circumstances", [
        "No refund shall be granted under any circumstances, including but not limited to: changes in course structure or content; delay in examinations or certification; administrative or operational reasons; policy updates or modifications."
      ]],
      ["6. Institute rights", [
        "Apex Professional Academy reserves the absolute right to reject any refund request, and to modify or update this Refund Policy at any time without prior notice."
      ]],
      ["7. Administrative authority", [
        "Apex Professional Academy operates under the administrative framework and supervision of Apex Institute of Multidisciplinary Professional Studies, and all financial policies are governed accordingly."
      ]],
      ["8. Final declaration", [
        "By enrolling in Apex Professional Academy, the student or applicant confirms that they have read, understood and agreed to this Refund Policy; that they acknowledge fees are non-refundable under all circumstances; and that they shall not raise any claim, dispute or legal objection regarding refund in the future."
      ]]
    ],
    refundProcessing: "Where Apex Professional Academy exercises its discretion to approve a refund, the approved amount is processed within 5–7 working days.",
    transferIntro: "Students may request a transfer from one programme to another, subject to programme availability and eligibility requirements. A transfer request must be submitted to the Admissions/Academic Department within the applicable period.",
    transferFactors: [
      "Availability of seats",
      "Eligibility for the new programme",
      "Difference in programme fees",
      "Training already completed",
      "Batch availability",
      "Administrative requirements"
    ],
    transferFee: "If the new programme has a higher fee, the student may be required to pay the applicable difference. If the new programme has a lower fee, any adjustment or refund will be governed by the Academy’s applicable fee policy.",
    dataPurposes: [
      "Admission enquiries", "Application processing", "Student registration",
      "Academic administration", "Communication", "Fee/payment administration",
      "Certificate issuance", "Student support", "Legal and regulatory compliance"
    ],
    dataRetention: "Student and enquiry information will be retained only for as long as reasonably necessary for the purpose for which it was collected, institutional record-keeping, contractual requirements, dispute resolution, legal obligations and other legitimate purposes.",
    disclaimer: [
      "Apex Professional Academy provides professional training and skill-development programmes for educational and career-development purposes.",
      "Unless specifically stated and supported by valid documentation, completion of an Academy programme should not be interpreted as a government job guarantee, university degree, statutory licence, government qualification, or guaranteed employment.",
      "Employment, placement and career outcomes may depend on the learner’s qualification, skills, experience, employer requirements, selection processes and prevailing employment opportunities.",
      "Where any third-party certification, examination, internship, placement or industry association is involved, the applicable terms and status will be disclosed separately."
    ]
  }
};
