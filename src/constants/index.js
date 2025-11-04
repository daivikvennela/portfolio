import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  meta,
  tesla,
  shopify,
  carrent,
  jobit,
  tripguide,
  threejs,
  stanford,
  hidden,
  eworld,
  // Role icons
  fullstack,
  datascience,
  cloud,
  artist,
  video,
  aiml,
  berkeley,
  csm,
  canada,
  skyline,
  carlmont,
  huapi,
  sportbusiness,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "education",
    title: "Education",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Full Stack Developer",
    icon: fullstack,
  },
  {
    title: "Data Scientist",
    icon: datascience,
  },
  {
    title: "Cloud Practitioner",
    icon: cloud,
  },
  {
    title: "AI/ML Engineer",
    icon: aiml,
  },
  {
    title: "Digital Artist",
    icon: artist,
  },
  {
    title: "Videographer",
    icon: video,
  }
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Redux Toolkit",
    icon: redux,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "Three JS",
    icon: threejs,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "figma",
    icon: figma,
  },
  {
    name: "docker",
    icon: docker,
  },
];

const experiences = [
  {
    title: "Research Intern",
    company_name: "Stanford",
    icon: stanford,
    iconBg: "#0066ff",
    date: "March 2020 - April 2021",
    points: [
      "Researched Virtual Reality in the context of medicine, military and education; presented to program alumni; Later delivered TedX talk: 'How Virtual Reality Can Save Lives' which used this research and applied it to a broader more interdisciplinary context"
    ],
  },
  {
    title: "Research Intern",
    company_name: "Stanford",
    icon: stanford,
    iconBg: "#0066ff",
    date: "March 2020 - April 2021",
    points: [
      "Developing and maintaining web applications using React.js and other related technologies.",
      "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Participating in code reviews and providing constructive feedback to other developers."
    ],
  },
  {
    title: "Software Engineer",
    company_name: "HiddenUnderGround, Inc.",
    icon: hidden,
    iconBg: "#001f4d",
    date: "Jun 2024 - Aug 2024",
    points: [
      "Developed an API using FastAPI that processes company logos and analyzes whether they can be used for professional purposes.",
      "Connected to OpenAI's API to analyze images and provide recommendations.",
      "Utilized Microsoft Azure for cloud infrastructure and deployment.",
      "Technologies used: Microsoft Azure, FastAPI, Python"
    ],
  },
  {
    title: "Data Scientist",
    company_name: "eWorld Enterprise Solutions, Inc.",
    icon: eworld,
    iconBg: "#0066ff",
    date: "Jun 2024 - Jul 2024",
    points: [
      "Developed a Generative AI tool using FastAPI that processed millions of pdfs for custom keywords using Gemini.",
      "Used Streamlit to develop a POC and demo to executive board.",
      "Implemented efficient data processing pipelines for handling large PDF datasets.",
      "Technologies used: Python, Streamlit, FastAPI, Google Gemini"
    ],
  }
];

const projects = [
  {
    name: "HU Logo Analysis API",
    description:
      "A FastAPI-based service that processes company logos and analyzes their suitability for professional use. Integrates with OpenAI's API for image analysis and provides detailed recommendations for logo usage.",
    tags: [
      {
        name: "fastapi",
        color: "blue-text-gradient",
      },
      {
        name: "azure",
        color: "green-text-gradient",
      },
      {
        name: "openai",
        color: "pink-text-gradient",
      },
    ],
    image: huapi,
    source_code_link: "https://github.com/daivikvennela/huapi",
  },
  {
    name: "Sports Business Analytics",
    description:
      "Comprehensive data analysis project focusing on sports business metrics and performance analytics. Utilizes Python for data processing and visualization to derive meaningful insights from sports-related datasets.",
    tags: [
      {
        name: "python",
        color: "blue-text-gradient",
      },
      {
        name: "data-analysis",
        color: "green-text-gradient",
      },
      {
        name: "visualization",
        color: "pink-text-gradient",
      },
    ],
    image: sportbusiness,
    source_code_link: "https://github.com/daivikvennela/sportBusinessProject",
  },
];

const education = [
  {
    title: "Bachelor's degree, Data Science and Computer Science",
    school_name: "University of California, Berkeley",
    icon: berkeley,
    iconBg: "#003262", // Berkeley Blue
    date: "2024 - Present",
    points: [
      "Currently pursuing a dual degree in Data Science and Computer Science",
      "Focusing on machine learning, artificial intelligence, and software development",
      "Participating in research projects and collaborative coding initiatives",
      "Developing expertise in both theoretical foundations and practical applications"
    ],
  },
  {
    title: "Computer Science and Programming",
    school_name: "College of San Mateo",
    icon: csm,
    iconBg: "#0066ff",
    date: "2019",
    points: [
      "Introduction To Astronomy, HSCI 100 General Health Science",
      "COMM 110 Public Speaking, CIS 110 Introduction to CIS",
      "CIS 254 Intro Object-Oriented Pgm Dsgn, CIS 255 (CS1) Prgm Methods: Java",
      "CIS 256 (CS2) Data Structures: Java, CIS 117 Python Programming",
      "CIS 121 UNIX/Linux, BIOL 310 Nutrition",
      "CIS 501 (CS2) Data Structures: Python"
    ],
  },
  {
    title: "Mathematics and Communication",
    school_name: "Cañada College",
    icon: canada,
    iconBg: "#001f4d",
    date: "2020",
    points: [
      "MATH 110 Elementary Algebra",
      "MATH 120 Intermediate Algebra",
      "COMM 130 Interpersonal Communication",
      "MATH 200 Elementary Probability & Statistics"
    ],
  },
  {
    title: "Psychology and Health Sciences",
    school_name: "Skyline College",
    icon: skyline,
    iconBg: "#0066ff",
    date: "2020",
    points: [
      "PSYC 100 General Psychology",
      "MATH 115 Geometry",
      "EMC. 425 CPR: Health Care Provider",
      "PSYC 330 Intro to Sports Psychology"
    ],
  },
  {
    title: "High School Diploma",
    school_name: "Carlmont High School",
    icon: carlmont,
    iconBg: "#001f4d",
    date: "2020 - 2024",
    points: [
      "Completed comprehensive high school education",
      "Developed strong foundation in computer science and mathematics",
      "Participated in various technical and creative projects",
      "Skills: Java, Adobe Premiere Pro, WordPress Design, Google Docs, Unity, CAD, Python, After Effects"
    ],
  },
];

export { services, technologies, experiences, projects, education };
