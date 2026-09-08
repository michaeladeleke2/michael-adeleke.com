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
      'Collision Course: Elevating concussion awareness through immersive virtual reality',
    venue:
      'International Conference on Applied Human Factors and Ergonomics (AHFE)',
    year: 2025,
  },
  {
    id: 'tapia-2024-codebears',
    title: 'CodeBears: Breaking stereotypes and feeding the STEM pipeline',
    venue:
      'ACM Undergraduate Research Competition, ACM Richard Tapia Celebration of Diversity in Computing',
    year: 2024,
    role: 'Poster and presentation',
    note: '3rd place',
  },
  {
    id: 'tapia-2023-have-a-heart',
    title: 'Have a Heart',
    venue:
      'ACM Student Research Competition, ACM Richard Tapia Celebration of Diversity in Computing',
    year: 2023,
    role: 'Co-author on award-winning submission',
  },
  {
    id: 'techfest-2023-collision-course',
    title: 'Collision Course',
    venue: 'Morgan TechFest poster competition',
    year: 2023,
    role: 'Co-author',
    note: '2nd place',
  },
  {
    id: 'stars-2023-emotibit',
    title: 'VR stress assessment using EmotiBit',
    venue: 'STARS Celebration',
    year: 2023,
    role: 'Presenter',
  },
]
