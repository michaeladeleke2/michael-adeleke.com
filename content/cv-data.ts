export type Education = {
  institution: string
  location: string
  degree: string
  period: string
  advisor?: string
  notes?: string[]
}

export const education: Education[] = [
  {
    institution: 'The University of Alabama',
    location: 'Tuscaloosa, AL',
    degree: 'PhD in Computer Science',
    period: 'Expected May 2030',
    advisor: 'Dr. Chris Crawford, Human-Technology Interaction Lab',
    notes: ['GPA 4.0', 'SREB Doctoral Fellow', 'Graduate Council Fellow'],
  },
  {
    institution: 'Morgan State University',
    location: 'Baltimore, MD',
    degree: 'BS in Computer Science',
    period: 'December 2024',
    advisor: 'Dr. Naja Mack, Human-AI eXperience Lab',
    notes: ['Summa cum laude', 'GPA 3.87'],
  },
]

export type Position = {
  title: string
  org: string
  /** Omit when unknown; it is left off rather than guessed. */
  location?: string
  /** Display string. */
  period: string
  /** Sort keys, `YYYY-MM`. `end` omitted means the role is current. */
  start: string
  end?: string
  summary: string
}

/**
 * Listed most recent first, ordered by when a role last ran rather than when
 * it started, so current work sits at the top and a multi-year role does not
 * sink below a shorter one that began later. Ties break on the start date.
 */
const allPositions: Position[] = [
  {
    title: 'Graduate Research Assistant',
    org: 'Human-Technology Interaction Lab, The University of Alabama',
    location: 'Tuscaloosa, AL',
    period: 'Aug 2025 – present',
    start: '2025-08',
    summary:
      'Radar-based sensing systems: signal behavior, data interpretation, and the interactive applications they support. Lead developer of SensDS.',
  },
  {
    title: 'Program Coordinator, Summer AI Research Institute',
    org: 'Center for Equitable AI & Machine Learning Systems, Morgan State University',
    location: 'Baltimore, MD',
    period: 'Summers 2025 and 2026',
    start: '2025-05',
    end: '2026-08',
    summary:
      'Coordinated 50+ undergraduate researchers across logistics, mentor management, and research workflow.',
  },
  {
    title: 'Camp Coordinator',
    org: 'CodeBears',
    location: 'Baltimore, MD',
    period: 'Summers 2023 – 2025',
    start: '2023-06',
    end: '2025-08',
    summary:
      'Three consecutive summers coordinating a K-12 computing camp introducing students to programming fundamentals.',
  },
  {
    title: 'Lead Undergraduate Researcher',
    org: 'Human-AI eXperience Lab, Morgan State University',
    location: 'Baltimore, MD',
    period: 'Dec 2022 – Aug 2025',
    start: '2022-12',
    end: '2025-08',
    summary:
      'Applied systems across AI, VR, and STEM education, including VR concussion education, conversational AI bias detection, and K-12 outreach.',
  },
  {
    title: 'Adjunct Faculty',
    org: 'Department of Computer Science, Morgan State University',
    location: 'Baltimore, MD',
    period: 'Jan 2025 – May 2025',
    start: '2025-01',
    end: '2025-05',
    summary:
      'Instructor of record for Introduction to Computer Science I, with curriculum development in computing and emerging technologies.',
  },
  {
    title: 'Summer Research Assistant',
    org: 'Human-Technology Interaction Lab, The University of Alabama',
    location: 'Tuscaloosa, AL',
    period: 'May 2023 – Aug 2023',
    start: '2023-05',
    end: '2023-08',
    summary:
      'Interactive learning systems integrating robotics, physiological sensors, and machine learning.',
  },
  {
    title: 'Information Technology Intern',
    org: 'Lavner Education',
    location: 'Baltimore, MD',
    period: 'Jun 2022 – Aug 2022',
    start: '2022-06',
    end: '2022-08',
    summary:
      'Set up and maintained on-site hardware, software, and network connectivity, and handled technical support for staff and students. Taught classroom sessions, helped students debug their code, and ran weekly inventory.',
  },
]

export const positions: Position[] = [...allPositions].sort((a, b) => {
  const recency = (p: Position) => p.end ?? '9999-99'
  return recency(b).localeCompare(recency(a)) || b.start.localeCompare(a.start)
})

export const researchInterests = [
  'Radar-based sensing and micro-Doppler signal processing',
  'Machine learning for interactive systems',
  'Conversational AI',
  'Human-computer interaction',
  'Equitable and accessible AI/ML education',
  'Virtual reality for learning and empathy',
  'Broadening participation in computing',
]
