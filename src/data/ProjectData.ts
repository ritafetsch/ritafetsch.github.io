import { v4 as uuidv4 } from 'uuid';
import { Project } from '../types/project';

export const projects: Project[] = [
  {
    id: uuidv4(),
    title: "Finflo",
    description: "Collaborative Financial Management Web Application with group expense tracking, multi-currency support, and interactive visualizations",
    longDescription: "A comprehensive financial management solution that allows teams to collaboratively manage budgets, track expenses, and generate visual reports. Features include transaction categorization, multi-currency support, recurring transactions, and role-based permissions.",
    tags: ["Python", "Django", "PostgreSQL","jQuery","Bootstrap"],
    category: "Full Stack",
    image: "/images/project_cover/finflo.png",
    github: "https://github.com/ritafetsch/finflo.git",
    live: "",
    featured: false
  },
  {
    id: uuidv4(),
    title: "Advisorbot",
    description: "Cryptocurrency Market Analysis CLI Tool",
    longDescription: "A sophisticated C++ command-line application that performs complex cryptocurrency market analysis, providing real-time data processing, advanced statistical computations, and predictive trading insights. Implements robust financial analysis techniques including Exponential Moving Average (EMA), Simple Moving Average (SMA), price prediction, and comprehensive market data exploration across multiple cryptocurrency pairs.",
    tags: ["C++", "Data Structures", "Algorithms", "Financial Analysis", "Market Simulation"],
    category: "Application",
    image: "/images/project_cover/advisorbot.png",
    github: "https://github.com/ritafetsch/advisorbot.git",
    live: "",
    featured: false
  },
  {
    id: uuidv4(),
    title: "BioScience Protein Research API",
    description: "Comprehensive Bioinformatics Data Management System",
    longDescription: "A robust Django-based RESTful API designed for advanced bioinformatics research, enabling comprehensive management and analysis of protein data. Features include detailed protein, domain, and organism information retrieval, advanced API endpoints for protein sequence analysis, and sophisticated data serialization with support for complex relational database queries. Comprehensively documented.",
    tags: ["Python", "Django","REST API", "Bioinformatics", "PostgreSQL", "Data Serialization", "Test-Driven Development"],
    category: "API",
    image: "/images/project_cover/bioScience.png",
    github: "https://github.com/ritafetsch/bioData.git",
    live: "",
    featured: false
  },
  {
    id: uuidv4(),
    title: "Bujjit: Personal Finance Management App",
    description: "Comprehensive Expense Tracking and Financial Insights Mobile Application",
    longDescription: "A full-featured React Native mobile application for personal financial management, offering advanced expense tracking, detailed transaction analysis, and comprehensive financial insights. Implements robust user authentication, real-time transaction management, category-based expense tracking, and interactive financial summaries. Features include secure user registration, dynamic transaction filtering, monthly financial reporting, and cross-platform mobile accessibility.",
    tags: ["React Native", "Mobile Development", "Expo","SQLite","Financial Technology", "AsyncStorage", "User Authentication", "Data Visualization", ],
    category: "Mobile",
    image: "/images/project_cover/bujjit.png",
    github: "https://github.com/cozie11/bujjit.git",
    live: "",
    featured: false
  },
  {
    id: uuidv4(),
    title: "Cross-Platform Scientific Calculator",
    description: "Mobile Calculator with Dynamic Theming",
    longDescription: "A feature-rich React Native mobile application offering comprehensive scientific calculator functionality. Implements complex mathematical operations including trigonometric functions, exponential calculations, and dynamic memory management. Features customizable themes, responsive design, and advanced input handling with support for mathematical constants like π.",
    tags: ["React Native", "JavaScript", "Mobile Development", "Expo", "Cross-Platform", "Mathematical Computation"],
    category: "Mobile",
    image: "/images/project_cover/calculator.png",
    github: "https://github.com/ritafetsch/calculator.git",
    live: "https://snack.expo.dev/@mariamjo/calculator?platform=web",
    featured: false
  },
  {
    id: uuidv4(),
    title: "Physics-Based Angry Birds Web Game",
    description: "Interactive Browser-Based Physics Simulation Game",
    longDescription: "A comprehensive web-based game clone implementing advanced physics simulation using JavaScript and HTML5 Canvas. Features realistic projectile motion, collision detection, and dynamic object interactions. Demonstrates complex game mechanics through precise velocity calculations, gravitational effects, and interactive gameplay elements.",
    tags: ["JavaScript", "Canvas", "Game Development", "Physics Simulation", "HTML5","Interactive Web Graphics"],
    category: "Game",
    image: "/images/project_cover/angry-birds.png",
    github: "https://github.com/ritafetsch/angry-birds",
    live: "https://ritafetsch.github.io/angry-birds/",
    featured: false
  },
  {
    id: uuidv4(),
    title: "Instagram-Style Image Processing Web App",
    description: "Interactive Image Transformation Platform",
    longDescription: "A web-based image processing application built with p5.js, offering multiple advanced image manipulation techniques. Implements sophisticated pixel-level transformations including sepia tone, radial blur, edge detection, inverse, grayscale, and threshold filters. Features dynamic user interaction with real-time image processing and comprehensive filter application mechanisms.",
    tags: ["JavaScript", "p5.js", "Image Processing", "Canvas Manipulation", "Digital Image Algorithms"],
    category: "Web App",
    image: "/images/project_cover/insta-filter.png",
    github: "https://github.com/ritafetsch/insta-filters.git",
    live: "https://ritafetsch.github.io/insta-filters/",
    featured: false
  },
  {
    id: uuidv4(),
    title: "Space Defense: Asteroid Interception Game",
    description: "Interactive Asteroid Destruction Simulation",
    longDescription: "A browser-based p5.js space shooter game simulating asteroid threats and planetary defense mechanics. Implements advanced game systems including procedural asteroid generation, gravity simulation, collision detection, and dynamic difficulty scaling. Features include spacecraft movement physics, bullet trajectory calculations, and a sophisticated scoring mechanism.",
    tags: ["JavaScript", "p5.js", "Game Development", "Physics Simulation", "Procedural Generation"],
    category: "Game",
    image: "/images/project_cover/asteroids.png",
    github: "https://github.com/ritafetsch/asteroid-game",
    live: "https://ritafetsch.github.io/asteroid-game/",
    featured: false
  },
  {
    id: uuidv4(),
    title: "Computational Image Analysis Visualization",
    description: "Interactive Image Averaging Web Experiment",
    longDescription: "An innovative p5.js web application demonstrating advanced computational image processing techniques. Implements pixel-level analysis across multiple images, calculating and visualizing average pixel values through interactive mouse-driven interpolation. Features dynamic image selection, real-time pixel manipulation, and sophisticated image processing algorithms.",
    tags: ["JavaScript", "p5.js", "Image Processing", "Data Visualization", "Computational Photography"],
    category: "Web App",
    image: "/images/project_cover/image-average.png",
    github: "https://github.com/ritafetsch/average-face",
    live: "https://ritafetsch.github.io/average-face/",
    featured: false
  },
  {
    id: uuidv4(),
    title: "Neural Network Text Classification",
    description: "Multiclass Document Classification Implementation with Deep Learning",
    longDescription: "A comprehensive implementation of Chollet's deep learning workflow applied to the Reuters news dataset. Features include data preprocessing, neural network construction with Dense layers, model training with dropout regularization, and evaluation. Achieves ~79% accuracy in categorizing news articles into 46 topics, representing a 60% improvement over baseline performance. Demonstrates systematic model development, overfitting analysis, and optimization techniques including regularization and dropout layers.",
    tags: ["Python", "TensorFlow", "Keras", "Deep Learning", "Text Classification", "Neural Networks", "Data Science"],
    category: "Data Science",
    image: "/images/project_cover/reuters-classification.png",
    github: "https://github.com/ritafetsch/neural-network-text-classification/blob/master/Machine%20Learning%20and%20Neural%20Networks%20-%20Text%20Classification.ipynb",
    live: "",
    featured: false
  },
  {
    id: uuidv4(),
    title: "Football Age Performance Analysis",
    description: "Statistical Analysis of Age Impact on Player Performance",
    longDescription: "A comprehensive data analysis project investigating the correlation between football player age and various performance metrics in the Premier League. Implements web scraping techniques to gather team standing data, data cleansing methodologies, and advanced statistical visualization. Features include position-based performance analysis, playing time assessment across age groups, goal contribution analysis, and disciplinary record examination. The project reveals nuanced relationships between player age and performance metrics that challenge conventional assumptions about athletic prime.",
    tags: ["Python", "Pandas", "Data Visualization", "Web Scraping", "BeautifulSoup", "Statistical Analysis", "Sports Analytics"],
    category: "Data Science",
    image: "/images/project_cover/football-age-analysis.png",
    github: "https://github.com/ritafetsch/football-data-analysis/blob/master/Data%20Science%20Analysis%20-%20Football%20as%20it%20Correlates%20to%20Age.ipynb",
    live: "",
    featured: false
  },
  {
    id: uuidv4(),
    title: "Real Estate Price Prediction Model",
    description: "Machine Learning Regression Analysis for Property Pricing",
    longDescription: "A data science project implementing polynomial regression techniques to predict real estate prices based on property attributes. Features data preprocessing, statistical analysis, feature selection, and model optimization through polynomial feature transformation. Demonstrates significant performance improvements using grid search optimization and cross-validation, achieving a 73% prediction accuracy (R² score). Includes comprehensive data visualization of feature relationships, correlation analysis, and model performance metrics comparison between standard and polynomial regression approaches.",
    tags: ["Python", "Machine Learning", "Regression Analysis", "Data Visualization", "Scikit-learn", "Pandas", "Seaborn", "Property Pricing"],
    category: "Data Science",
    image: "/images/project_cover/real-estate-prediction.png",
    github: "https://github.com/ritafetsch/real-estate-regression-model/blob/master/Real%20Estate%20Regression%20Model.ipynb",
    live: "",
    featured: false
  },
  {
    id: uuidv4(),
    title: "K-Nearest Neighbors Algorithm Implementation",
    description: "Custom Machine Learning Classifier with Cross-Validation Framework",
    longDescription: "A comprehensive Python implementation of the K-Nearest Neighbors classification algorithm from scratch. Features include custom distance metrics (Euclidean and Manhattan), nested cross-validation for hyperparameter optimization, and robust evaluation metrics. The project demonstrates fundamental machine learning principles through exploratory data analysis, algorithm implementation, and systematic performance evaluation on the Wine dataset. Includes visualization of classification boundaries, confusion matrix analysis, and detailed performance comparisons between clean and noisy data scenarios to illustrate model robustness.",
    tags: ["Python", "Machine Learning", "Algorithm Implementation", "Cross-Validation", "Classification", "Data Visualization", "NumPy", "Pandas"],
    category: "Machine Learning",
    image: "/images/project_cover/knn-implementation.png",
    github: "https://github.com/ritafetsch/k-nearest-neighbor-classification-red-wine/blob/master/Machine%20Learning%20Coursework%20(Part%201).ipynb",
    live: "",
    featured: false
  },
  {
    id: uuidv4(),
    title: "SMS Spam Detection System",
    description: "NLP-Based Text Classification for Message Filtering",
    longDescription: "A machine learning system designed to classify SMS messages as spam or legitimate using natural language processing techniques. Implements a Multinomial Naive Bayes classifier with TF-IDF vectorization to analyze message content. Features comprehensive text preprocessing including tokenization, stop word removal, and lemmatization. Achieves 95.34% accuracy with 100% precision on the test dataset, significantly outperforming the baseline. The project demonstrates practical application of NLP for cybersecurity, focusing on maximizing precision to prevent legitimate messages from being incorrectly filtered.",
    tags: ["Python", "Natural Language Processing", "Machine Learning", "Text Classification", "NLTK", "Scikit-learn", "Data Preprocessing", "Naive Bayes", "Pandas"],
    category: "Machine Learning",
    image: "/images/project_cover/spam-detection.png",
    github: "https://github.com/ritafetsch/spam-detection-system/blob/master/NLP%20Text%20Categorisation%20-%20Spam%20Detection%20System.ipynb",
    live: "",
    featured: false
  }
];

// Get unique categories from the projects
export const projectCategories: string[] = [
  "All",
  ...Array.from(new Set(projects.map(project => project.category)))
];


