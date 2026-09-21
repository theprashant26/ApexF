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
    division: "Education Division",
    code: "TITC",
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
    certificate: "Banking Industry Training Certificate",
    programme: "Diploma in Banking Management",
    group: "Business, Technical & Engineering",
    intro: "This programme covers banking operations and customer service together with the basics of account documentation. Banking administration and digital banking awareness are included as current working practice. Financial services basics and professional communication complete the scope.",
    trainingAreas: ["Banking Operations", "Customer Service", "Account Documentation Basics", "Banking Administration", "Digital Banking Awareness", "Financial Services Basics", "Professional Communication"],
    careerRoles: ["Banking Operations Assistant", "Customer Service Executive", "Banking Support Executive", "Relationship Executive", "Documentation Executive"],
    slug: "banking-management"
  },
  {
    id: "finance-accounting",
    number: 12,
    division: "Finance & Accounting Division",
    code: "FITC",
    certificate: "Finance & Accounting Industry Training Certificate",
    programme: "Diploma in Finance & Accounting Management",
    group: "Business, Technical & Engineering",
    intro: "Training starts from accounting fundamentals and bookkeeping, then covers billing and invoicing and financial documentation. Office accounting is studied as everyday practice. Basic financial management and computerized accounting basics are included.",
    trainingAreas: ["Accounting Fundamentals", "Bookkeeping", "Billing & Invoicing", "Financial Documentation", "Office Accounting", "Basic Financial Management", "Computerized Accounting Basics"],
    careerRoles: ["Accounts Assistant", "Billing Executive", "Finance Assistant", "Accounting Executive", "Documentation Executive"],
    slug: "finance-accounting-management"
  },
  {
    id: "professional-skill",
    number: 13,
    division: "Professional Skill Development",
    code: "PSDC",
    certificate: "Professional Skill Development Certificate",
    programme: "Diploma in Professional Skill Development",
    group: "Business, Technical & Engineering",
    intro: "This programme concentrates on the skills that apply across any workplace: communication, computer skills and workplace etiquette. Interview preparation and resume development are practised directly. Professional behaviour and career development are covered as ongoing habits.",
    trainingAreas: ["Communication Skills", "Computer Skills", "Interview Preparation", "Resume Development", "Workplace Etiquette", "Professional Behaviour", "Career Development"],
    careerRoles: ["Office Assistant", "Customer Support Executive", "Administrative Assistant", "Business Support Executive"],
    slug: "professional-skill-development"
  },
  {
    id: "logistics",
    number: 14,
    division: "Logistics Division",
    code: "LITC",
    certificate: "Logistics Industry Training Certificate",
    programme: "Diploma in Logistics Management",
    group: "Transport, Aviation & Logistics",
    intro: "Training covers logistics operations, warehouse management and inventory control as a connected process. Transportation operations and supply chain basics give the wider context. Dispatch and documentation work and material handling awareness are also included.",
    trainingAreas: ["Logistics Operations", "Warehouse Management", "Inventory Control", "Transportation Operations", "Supply Chain Basics", "Dispatch & Documentation", "Material Handling Awareness"],
    careerRoles: ["Logistics Executive", "Warehouse Executive", "Inventory Assistant", "Dispatch Executive", "Logistics Coordinator"],
    slug: "logistics-management"
  },
  {
    id: "healthcare",
    number: 15,
    division: "Healthcare Division",
    code: "HIMTC",
    certificate: "Healthcare Industry Management Training Certificate",
    programme: "Diploma in Healthcare Management",
    group: "Health & Pharma",
    intro: "This programme covers hospital administration and healthcare operations at a management level. Patient relationship management, healthcare documentation and hospital front office work are studied as connected responsibilities. Facility administration and healthcare service management complete the scope.",
    trainingAreas: ["Hospital Administration", "Healthcare Operations", "Patient Relationship Management", "Healthcare Documentation", "Hospital Front Office", "Facility Administration", "Healthcare Service Management"],
    careerRoles: ["Healthcare Administration Executive", "Hospital Operations Executive", "Patient Relations Executive", "Healthcare Coordinator", "Hospital Front Office Executive"],
    slug: "healthcare-management"
  },
  {
    id: "manufacturing",
    number: 16,
    division: "Manufacturing Division",
    code: "MIMC",
    certificate: "Manufacturing Industry Management Certificate",
    programme: "Diploma in Manufacturing Management",
    group: "Business, Technical & Engineering",
    intro: "Training covers production management and manufacturing operations along with the basics of quality management. Inventory management and production planning are studied as scheduling disciplines. Workplace safety and industrial administration run through the programme.",
    trainingAreas: ["Production Management", "Manufacturing Operations", "Quality Management Basics", "Inventory Management", "Production Planning", "Workplace Safety", "Industrial Administration"],
    careerRoles: ["Production Assistant", "Manufacturing Executive", "Quality Assistant", "Inventory Executive", "Production Coordinator"],
    slug: "manufacturing-management"
  },
  {
    id: "driver-services",
    number: 17,
    division: "Driver Services Division",
    code: "DITC",
    certificate: "Driver Industry Training Certificate",
    programme: "Diploma in Driver Management",
    group: "Transport, Aviation & Logistics",
    intro: "This programme covers professional driving practices together with road safety and vehicle safety awareness. Fleet operations and driver responsibilities are studied as part of a managed transport service. Basic vehicle maintenance and transport operations complete the training.",
    trainingAreas: ["Professional Driving Practices", "Road Safety Awareness", "Vehicle Safety", "Fleet Operations", "Driver Responsibilities", "Basic Vehicle Maintenance", "Transport Operations"],
    careerRoles: ["Professional Driver", "Fleet Assistant", "Transport Coordinator", "Driver Supervisor"],
    slug: "driver-management"
  },
  {
    id: "retail",
    number: 18,
    division: "Retail Division",
    code: "RIMC",
    certificate: "Retail Industry Management Certificate",
    programme: "Diploma in Retail Management",
    group: "Hospitality, Travel & Retail",
    intro: "Training covers retail operations and store management alongside the sales side of the business. Customer service and inventory management are treated as daily working practice. Retail administration and merchandising basics complete the programme.",
    trainingAreas: ["Retail Operations", "Store Management", "Sales Management", "Customer Service", "Inventory Management", "Retail Administration", "Merchandising Basics"],
    careerRoles: ["Retail Executive", "Store Executive", "Sales Executive", "Customer Service Executive", "Inventory Assistant"],
    slug: "retail-management"
  },
  {
    id: "it-technology",
    number: 19,
    division: "IT & Technology Division",
    code: "ITITC",
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
    number: 20,
    division: "Civil Engineering Division",
    code: "CETC",
    certificate: "Civil Engineering Training Certificate",
    programme: "Diploma in Civil Management",
    group: "Business, Technical & Engineering",
    intro: "Training covers construction management basics and site operations as connected work. Project documentation, basic estimation and site coordination are studied as practical tasks. Construction safety and infrastructure operations run through the programme.",
    trainingAreas: ["Construction Management Basics", "Site Operations", "Project Documentation", "Basic Estimation", "Construction Safety", "Infrastructure Operations", "Site Coordination"],
    careerRoles: ["Site Assistant", "Construction Coordinator", "Project Support Executive", "Site Documentation Assistant"],
    slug: "civil-management"
  },
  {
    id: "electrical-engineering",
    number: 21,
    division: "Electrical Engineering Division",
    code: "EETC",
    certificate: "Electrical Engineering Training Certificate",
    programme: "Diploma in Electrical Management",
    group: "Business, Technical & Engineering",
    intro: "This programme covers electrical engineering fundamentals together with electrical maintenance and equipment operations. Electrical safety and workplace safety are treated as continuous requirements. Technical documentation and maintenance planning complete the scope.",
    trainingAreas: ["Electrical Engineering Fundamentals", "Electrical Maintenance", "Equipment Operations", "Electrical Safety", "Technical Documentation", "Maintenance Planning", "Workplace Safety"],
    careerRoles: ["Electrical Maintenance Assistant", "Technical Support Assistant", "Electrical Operations Assistant", "Maintenance Coordinator"],
    slug: "electrical-management-engineering"
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
  "Classroom or online learning",
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
