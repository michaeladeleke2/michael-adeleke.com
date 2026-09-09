export type Photo = {
  id: string
  src: string
  width: number
  height: number
  /** Required. Describes what is in the frame, for screen readers. */
  alt: string
  /**
   * Optional for now. The brief is right that a gallery without captions is
   * decoration, so these are worth filling in: what was happening, and why it
   * mattered. `where` and `when` render on their own until then.
   */
  caption?: string
  where: string
  when: string
}

/**
 * Add files to /public/gallery and describe them here. `width` and `height`
 * are the image's real pixel dimensions; next/image needs them and they
 * prevent layout shift. Newest first.
 */
export const photos: Photo[] = [
  {
    id: 'sairi-2025',
    src: '/gallery/sairi-2025.jpg',
    width: 1344,
    height: 756,
    alt:
      'The Summer AI Research Institute cohort and staff on the steps of the Earl G. Graves School of Business and Management at Morgan State.',
    where: 'Summer AI Research Institute',
    when: '2025',
  },
  {
    id: 'be-smart-hackathon-2024',
    src: '/gallery/be-smart-hackathon-2024.jpg',
    width: 1600,
    height: 1200,
    alt:
      'Five participants on stage holding award folders in front of a Black Enterprise BE Smart Hackathon screen, hosted by American Airlines.',
    where: 'Black Enterprise BE Smart Hackathon',
    when: '2024',
  },
  {
    id: 'codebears-2024-1',
    src: '/gallery/codebears-2024-1.jpg',
    width: 1600,
    height: 1066,
    alt:
      'CodeBears campers in tie-dye shirts filling the steps of the Earl G. Graves School of Business and Management.',
    where: 'CodeBears summer camp',
    when: '2024',
  },
  {
    id: 'codebears-2024-2',
    src: '/gallery/codebears-2024-2.jpg',
    width: 1600,
    height: 1066,
    alt:
      'CodeBears campers seated on the steps with mentors in navy Morgan State polos across the front row.',
    where: 'CodeBears summer camp',
    when: '2024',
  },
  {
    id: 'tapia-2024-award',
    src: '/gallery/tapia-2024-award.jpg',
    width: 1600,
    height: 1200,
    alt:
      'Standing with a certificate in front of a screen reading ACM Student Research Competition Award Winner, Third Place, Michael Adeleke, for CodeBears: Breaking Stereotypes and Feeding the STEM Pipeline.',
    where: 'ACM Richard Tapia Celebration of Diversity in Computing',
    when: '2024',
  },
  {
    id: 'tapia-2024-poster',
    src: '/gallery/tapia-2024-poster.jpg',
    width: 1600,
    height: 1200,
    alt:
      'Standing beside the CodeBears research poster, which lays out the camp motivation, lesson plan, organisation, showcase, and lessons learned.',
    where: 'ACM Richard Tapia Celebration of Diversity in Computing',
    when: '2024',
  },
  {
    id: 'sigcse-2024',
    src: '/gallery/sigcse-2024.jpg',
    width: 1179,
    height: 885,
    alt:
      'Speaking from a lectern with a microphone, one hand raised mid-sentence, a presentation screen behind.',
    where: 'SIGCSE Technical Symposium',
    when: '2024',
  },
  {
    id: 'ern-2024',
    src: '/gallery/ern-2024.jpg',
    width: 1179,
    height: 885,
    alt:
      'Presenting to a seated audience at round tables, gesturing towards a screen showing a slide of project images.',
    where: 'Emerging Researchers National Conference',
    when: '2024',
  },
  {
    id: 'graduation-2024',
    src: '/gallery/graduation-2024.jpg',
    width: 800,
    height: 1003,
    alt:
      'Graduation portrait in a Morgan State cap and gown with an orange honours stole, holding a rolled diploma.',
    where: 'Morgan State University',
    when: '2024',
  },
  {
    id: 'brain-drone-race',
    src: '/gallery/brain-drone-race.jpg',
    width: 1280,
    height: 853,
    alt:
      'Students in blue Brain Drone Race shirts gesturing at a demonstration table branded Morgan State University Computer Science, with a laptop and headsets in front of them.',
    where: 'Brain Drone Race, Morgan State University',
    when: '',
  },
  {
    id: 'codebears-2023',
    src: '/gallery/codebears-2023.jpg',
    width: 1600,
    height: 1066,
    alt:
      'The CodeBears camp in grey CodeBears shirts, campers and mentors together on the steps of the Earl G. Graves School of Business and Management.',
    where: 'CodeBears summer camp',
    when: '2023',
  },
  {
    id: 'tapia-2023',
    src: '/gallery/tapia-2023.jpg',
    width: 1600,
    height: 1199,
    alt:
      'Standing with two others in a hotel atrium at the Tapia Conference, all wearing conference lanyards.',
    where: 'ACM Richard Tapia Celebration of Diversity in Computing',
    when: '2023',
  },
  {
    id: 'be-smart-hackathon-2023',
    src: '/gallery/be-smart-hackathon-2023.jpg',
    width: 800,
    height: 600,
    alt:
      'Five team members in green All Code No Switch hoodies holding gift bags at the hackathon venue, a Morgan State University banner to one side.',
    where: 'Black Enterprise BE Smart Hackathon',
    when: '2023',
  },
  {
    id: 'techfest-2023',
    src: '/gallery/techfest-2023.jpg',
    width: 800,
    height: 600,
    alt:
      'Holding an oversized second-place cheque for five hundred dollars alongside a certificate, from the Morgan TechFest poster competition.',
    where: 'Morgan TechFest',
    when: '2023',
  },
]
