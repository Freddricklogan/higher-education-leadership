/** Resource configuration: the kit reads this; tests/config.test.js validates it. */
export const config = {
  title: 'Higher Education Leadership & Governance',
  tagline: 'A graduate-level guide to leading in higher education: institution types, shared governance role by role, Bolman and Deal’s frames, leadership theory, finance and enrollment management, student development, student affairs, equity, change and crisis, law, assessment and accreditation, with an institution explorer, a budget allocator and a frame quiz.',
  repo: 'https://github.com/Freddricklogan/higher-education-leadership',
  theme: 'plum',
  pagesUrl: 'https://freddricklogan.github.io/higher-education-leadership/',
  quizTitle: 'Five questions on higher education leadership',
  quiz: [
    {
      id: 'board',
      prompt: 'Under shared governance, which of these belongs to the governing board rather than the administration?',
      options: ['Managing day-to-day operations', 'Hiring, evaluating and dismissing the president', 'Designing the curriculum', 'Running admissions and financial aid'],
      answer: 1,
      explanation: 'Trustees hold fiduciary authority: they set mission and policy, hire and evaluate the president, approve the budget and steward assets. The administration holds executive authority for operations; the faculty hold primary responsibility for curriculum.'
    },
    {
      id: 'nettuition',
      prompt: 'What does the resource mean by net tuition, and why does it matter more than the sticker price?',
      options: ['Tuition after state appropriations', 'Published price minus institutional aid; it is the revenue the institution actually receives', 'Tuition net of endowment returns', 'The price paid by out-of-state students'],
      answer: 1,
      explanation: 'Tuition discounting lowers the sticker price to a net price through institutional aid. For most tuition-dependent institutions net tuition revenue funds the enterprise, which is why enrollment management treats it as the business model.'
    },
    {
      id: 'yield',
      prompt: 'In the enrollment funnel, which number does the resource say keeps admissions deans awake?',
      options: ['Applications per counselor', 'The number of prospects', 'The yield rate — enrolled divided by admits', 'The retention rate'],
      answer: 2,
      explanation: 'Each funnel stage is a smaller slice of the one above; strategic enrollment management improves conversion at every step, and yield — enrolled ÷ admits — is the stage the institution controls least and depends on most.'
    },
    {
      id: 'accred',
      prompt: 'Accreditation is described as voluntary peer review. Why is it functionally mandatory?',
      options: ['State law requires it for every institution', 'Title IV federal student aid flows only to accredited institutions', 'Faculty cannot be tenured without it', 'Rankings exclude unaccredited institutions'],
      answer: 1,
      explanation: 'Institutional accreditors are the gateway to federal aid under Title IV, so an institution without accreditation cannot enroll students who rely on federal grants and loans. Specialized and programmatic accreditation add discipline-level review.'
    },
    {
      id: 'frame',
      prompt: 'A president closing a low-enrollment department stages a memorial for its history and honours its alumni. Which of Bolman and Deal’s frames is she working in?',
      options: ['Structural', 'Human resource', 'Political', 'Symbolic'],
      answer: 3,
      explanation: 'The symbolic frame reads organizations as cultures of meaning, ritual and story; a closure handled only structurally leaves grief and identity unaddressed. Effective leaders reframe, reading the same closure through all four lenses.'
    }
  ]
};
