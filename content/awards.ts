export type Award = {
  id: string
  title: string
  org: string
  year?: string
  detail?: string
}

export const awards: Award[] = [
  {
    id: 'sreb-fellow',
    title: 'SREB Doctoral Fellow',
    org: 'The University of Alabama',
    year: '2025 – present',
  },
  {
    id: 'graduate-council-fellow',
    title: 'Graduate Council Fellow',
    org: 'The University of Alabama',
    year: '2025 – present',
  },
  {
    id: 'tapia-2024-third',
    title: '3rd Place, ACM Undergraduate Research Competition',
    org: 'Tapia Celebration of Diversity in Computing',
    year: '2024',
    detail: 'For CodeBears: Breaking Stereotypes and Feeding the STEM Pipeline',
  },
  {
    id: 'techfest-2023-second',
    title: '2nd Place, Poster Competition',
    org: 'Morgan TechFest',
    year: '2023',
    detail: 'For Collision Course',
  },
  {
    id: 'be-smart-hackathon',
    title: 'Best Technical Solution',
    org: 'Be Smart Hackathon',
    year: '2023 and 2024',
  },
  {
    id: 'summa-cum-laude',
    title: 'Summa Cum Laude',
    org: 'Morgan State University',
    year: '2024',
  },
]
