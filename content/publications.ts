export type Publication = {
  id: string
  type: 'conference' | 'extended-abstract' | 'under-review'
  authors: string[] // "Michael B. Adeleke" gets bolded at render time
  year: number
  title: string
  venue: string
  venueShort?: string
  location?: string
  pages?: string
  doi?: string
  abstract?: string
  pdfUrl?: string
}

export const AUTHOR_SELF = 'Michael B. Adeleke'

export const publications: Publication[] = [
  {
    id: 'sigcse-2024-breaking-stereotypes',
    type: 'conference',
    authors: [
      'Naja A. Mack',
      'Michael B. Adeleke',
      'Elijah Ballou',
      'Destiny Davis',
      'Vincent Ingram',
      'Katlyn Cox',
    ],
    year: 2024,
    title: 'Breaking stereotypes and feeding the STEM pipeline',
    venue:
      'Proceedings of the 55th ACM Technical Symposium on Computer Science Education V. 1',
    venueShort: 'SIGCSE 2024',
    location: 'Portland, OR, USA',
    pages: '7 pages',
    doi: '10.1145/3626252.3630793',
  },
  {
    id: 'bice-2024-codebears',
    type: 'conference',
    authors: [
      'Naja A. Mack',
      'Michael B. Adeleke',
      'Vincent Ingram',
      'Elijah Ballou',
      'Jamika K. Briggs-Belt',
      'Alexis Jordan',
    ],
    year: 2024,
    title:
      'CodeBears: Key insights gained from a summer coding camp empowering underrepresented youth',
    venue: '2024 Black Issues in Computing Education',
    venueShort: 'BICE 2024',
    pages: '80–86',
    doi: '10.1109/BICE60192.2024.00021',
  },
  {
    id: 'chi-ea-2025-culturally-relevant-math',
    type: 'extended-abstract',
    authors: [
      'Naja A. Mack',
      'Clyde W. Tandjong',
      'Michael B. Adeleke',
      'Elijah Ballou',
      'Amyra Harry',
      'Jaunel Panton',
    ],
    year: 2025,
    title:
      'Revolutionizing culturally relevant math education through AI and co-designing strategies',
    venue:
      'Extended Abstracts of the CHI Conference on Human Factors in Computing Systems',
    venueShort: 'CHI EA ’25',
    location: 'Yokohama, Japan',
    pages: '6 pages',
    doi: '10.1145/3706599.3719835',
  },
  {
    id: 'sigcse-under-review-radar-tool',
    type: 'under-review',
    authors: ['Michael B. Adeleke'],
    year: 2026,
    title:
      'A radar-based tool for teaching machine learning to high school students',
    venue: 'ACM Technical Symposium on Computer Science Education',
    venueShort: 'SIGCSE',
  },
]

export const publicationGroups: {
  type: Publication['type']
  heading: string
}[] = [
  { type: 'conference', heading: 'Peer-reviewed conference papers' },
  { type: 'extended-abstract', heading: 'Extended abstracts' },
  { type: 'under-review', heading: 'Manuscripts under review' },
]
