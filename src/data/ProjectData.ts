import { v4 as uuidv4 } from 'uuid';
import { Project } from '../types/project';

export const projects: Project[] = [
  {
    id: uuidv4(),
    title: "Finflo",
    description: "Collaborative Financial Management Web Application",
    longDescription: "A comprehensive financial management solution that allows teams to collaboratively manage budgets, track expenses, and generate reports.",
    tags: ["React", "Node.js", "MongoDB", "Express"],
    category: "Full Stack",
    image: "/images/project_cover/finflo.png",
    github: "https://github.com/ritafetsch/finflo.git",
    live: "https://github.com/ritafetsch/finflo.git",
    featured: true
  },
  {
    id: uuidv4(),
    title: "Advisorbot",
    description: "Cryptocurrency Exchange Simulation",
    longDescription: "A command-line application that simulates cryptocurrency exchange operations with real-time data analysis and trading suggestions.",
    tags: ["C++", "Data Structures", "Algorithms"],
    category: "Application",
    image: "/images/project_cover/advisorbot.png",
    github: "https://github.com/ritafetsch/advisorbot.git",
    live: "",
    featured: true
  },
  {
    id: uuidv4(),
    title: "BioScience API",
    description: "RESTful Bioscience Protein Research Web Service API",
    longDescription: "A RESTful API designed for bioscientists to access and manipulate protein research data with comprehensive documentation.",
    tags: ["JavaScript", "Node.js", "Express", "REST"],
    category: "API",
    image: "/images/project_cover/bioScience.png",
    github: "https://github.com/ritafetsch/bioData.git",
    live: "",
    featured: false
  },
  {
    id: uuidv4(),
    title: "Calculator",
    description: "Native Mobile Application",
    longDescription: "A cross-platform mobile calculator application with advanced scientific functions and customizable themes.",
    tags: ["React Native", "JavaScript", "Mobile Development"],
    category: "Mobile",
    image: "/images/project_cover/calculator.png",
    github: "https://github.com/ritafetsch/calculator.git",
    live: "https://snack.expo.dev/@mariamjo/calculator?platform=web",
    featured: false
  },
  {
    id: uuidv4(),
    title: "Angry Birds",
    description: "Interactive game clone with physics simulation",
    longDescription: "A web-based clone of the popular Angry Birds game featuring accurate physics simulations and interactive gameplay.",
    tags: ["JavaScript", "Canvas", "Physics", "Game Development"],
    category: "Game",
    image: "/images/project_cover/angry-birds.png",
    github: "https://github.com/ritafetsch/angry-birds",
    live: "https://ritafetsch.github.io/angry-birds/",
    featured: true
  },
  {
    id: uuidv4(),
    title: "Instagram Image Filters",
    description: "Web-based image processing application",
    longDescription: "A web application that applies various Instagram-like filters to images using canvas and image processing techniques.",
    tags: ["JavaScript", "Canvas", "Image Processing"],
    category: "Web App",
    image: "/images/project_cover/insta-filter.png",
    github: "https://github.com/ritafetsch/insta-filters.git",
    live: "https://ritafetsch.github.io/insta-filters/",
    featured: false
  },
  {
    id: uuidv4(),
    title: "Text Categorisation Model",
    description: "Deep Learning Workflow",
    longDescription: "A machine learning model that categorizes text documents using natural language processing and deep learning techniques.",
    tags: ["Python", "Machine Learning", "NLP", "Deep Learning"],
    category: "Data Science",
    image: "/images/project_cover/text-categorisation.png",
    github: "",
    live: "https://drive.google.com/file/d/15agUp04RxprAFERjD7uE3ZQ0I90oqQ_3/view?usp=drive_link",
    featured: false
  }
];

// Get unique categories from the projects
export const projectCategories: string[] = [
  "All",
  ...Array.from(new Set(projects.map(project => project.category)))
];