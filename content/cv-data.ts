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
  location: string
  period: string
  kind: 'research' | 'teaching'
  summary: string
}

export const positions: Position[] = [
  {
    title: 'Graduate Research Assistant',
    org: 'Human-Technology Interaction Lab, The University of Alabama',
    location: 'Tuscaloosa, AL',
    period: 'Aug 2025 – present',
    kind: 'research',
    summary:
      'Radar-based sensing systems: signal behavior, data interpretation, and the interactive applications they support. Lead developer of SensDS.',
  },
  {
    title: 'Lead Undergraduate Researcher',
    org: 'Human-AI eXperience Lab, Morgan State University',
    location: 'Baltimore, MD',
    period: 'Dec 2022 – Aug 2025',
    kind: 'research',
    summary:
      'Applied systems across AI, VR, and STEM education, including VR concussion education, conversational AI bias detection, and K-12 outreach.',
  },
  {
    title: 'Summer Research Assistant',
    org: 'Human-Technology Interaction Lab, The University of Alabama',
    location: 'Tuscaloosa, AL',
    period: 'May 2023 – Aug 2023',
    kind: 'research',
    summary:
      'Interactive learning systems integrating robotics, physiological sensors, and machine learning.',
  },
  {
    title: 'Adjunct Faculty',
    org: 'Department of Computer Science, Morgan State University',
    location: 'Baltimore, MD',
    period: 'Jan 2025 – May 2025',
    kind: 'teaching',
    summary:
      'Instructor of record for Introduction to Computer Science I, with curriculum development in computing and emerging technologies.',
  },
  {
    title: 'Program Coordinator, Summer AI Research Institute',
    org: 'Center for Equitable AI & Machine Learning Systems, Morgan State University',
    location: 'Baltimore, MD',
    period: 'May 2025 – Aug 2025',
    kind: 'teaching',
    summary:
      'Coordinated 50+ undergraduate researchers across logistics, mentor management, and research workflow.',
  },
  {
    title: 'Camp Coordinator',
    org: 'CodeBears',
    location: 'Baltimore, MD',
    period: 'Summers 2023 – 2025',
    kind: 'teaching',
    summary:
      'Three consecutive summers coordinating a K-12 computing camp introducing students to programming fundamentals.',
  },
]

export const researchInterests = [
  'Radar-based sensing and micro-Doppler signal processing',
  'Machine learning for interactive systems',
  'Human-computer interaction',
  'Equitable and accessible AI/ML education',
  'Virtual reality for learning and empathy',
  'Broadening participation in computing',
]
