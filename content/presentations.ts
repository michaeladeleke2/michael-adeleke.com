export type Presentation = {
  id: string
  title: string
  venue: string
  year: number
  note?: string
  role?: string
}

export const presentations: Presentation[] = [
  {
    id: 'ahfe-2025-collision-course',
    title:
      'Collision Course: Elevating Concussion Awareness Through Immersive Virtual Reality',
    venue:
      'International Conference on Applied Human Factors and Ergonomics (AHFE)',
    year: 2025,
    role: 'Presenter',
  },
  {
    id: 'tapia-2024-codebears',
    title: 'CodeBears: Breaking Stereotypes and Feeding the STEM Pipeline',
    venue:
      'ACM Undergraduate Research Competition, ACM Richard Tapia Celebration of Diversity in Computing',
    year: 2024,
    role: 'Poster and presentation',
    note: '3rd Place',
  },
  {
    id: 'techfest-2023-collision-course',
    title: 'Collision Course',
    venue: 'Morgan TechFest Poster Competition',
    year: 2023,
    role: 'Co-author',
    note: '2nd Place',
  },
  {
    id: 'stars-2023-emotibit',
    title: 'VR Stress Assessment Using EmotiBit',
    venue: 'STARS Celebration',
    year: 2023,
    role: 'Presenter',
  },
]
