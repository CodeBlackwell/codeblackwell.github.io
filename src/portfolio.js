/* Change this file to get your personal Porfolio */

// Website related settings
const settings = {
  isSplash: true, // Change this to false if you don't want Splash screen.
};

//SEO Related settings
const seo = {
  title: "LeChristopher Blackwell | Full-Stack Engineer & AI Specialist",
  description:
    "Full-stack engineer with 8+ years of experience specializing in AI/ML integration, data warehousing, and scalable web applications. IBM Generative AI certified. Passionate about LLMs, prompt engineering, and building intelligent systems.",
  og: {
    title: "LeChristopher Blackwell Portfolio",
    type: "website",
    url: "https://codeblackwell.github.io/",
  },
};

//Home Page
const greeting = {
  title: "LeChristopher Blackwell",
  logo_name: "LeChristopherBlackwell",
  nickname: "codeblackwell",
  subTitle:
    "Building the future with AI — Full-stack engineer specializing in LLMs, data pipelines, and scalable web applications. Passionate about prompt engineering, machine learning, and turning complex problems into elegant solutions.",
  resumeLink: "./LeChristopher_Blackwell_Resume.pdf",
  portfolio_repository: "https://github.com/codeblackwell/codeblackwell.github.io",
  githubProfile: "https://github.com/codeblackwell",
};

const socialMediaLinks = [
  {
    name: "Github",
    link: "https://github.com/codeblackwell",
    fontAwesomeIcon: "fa-github",
    backgroundColor: "#181717",
  },
  {
    name: "LinkedIn",
    link: "https://www.linkedin.com/in/codeblackwell/",
    fontAwesomeIcon: "fa-linkedin-in",
    backgroundColor: "#0077B5",
  },
  {
    name: "X-Twitter",
    link: "https://twitter.com/codeblackwell",
    fontAwesomeIcon: "fa-x-twitter",
    backgroundColor: "#000000",
  },
  {
    name: "Gmail",
    link: "mailto:codeblackwell@gmail.com",
    fontAwesomeIcon: "fa-google",
    backgroundColor: "#D14836",
  },
];

const skills = {
  data: [
    {
      title: "AI & Machine Learning",
      fileName: "DataScienceImg",
      skills: [
        "⚡ Building and fine-tuning LLMs using LangChain, HuggingFace, and custom PEFT/LoRA techniques",
        "⚡ Developing AI-powered applications with RAG pipelines and prompt engineering",
        "⚡ Creating multi-agent AI systems for automated software development workflows",
      ],
      softwareSkills: [
        {
          skillName: "Python",
          fontAwesomeClassname: "ion-logo-python",
          style: {
            backgroundColor: "transparent",
            color: "#3776AB",
          },
        },
        {
          skillName: "LangChain",
          fontAwesomeClassname: "simple-icons:langchain",
          style: {
            color: "#1C3C3C",
          },
        },
        {
          skillName: "HuggingFace",
          fontAwesomeClassname: "simple-icons:huggingface",
          style: {
            color: "#FFD21E",
          },
        },
        {
          skillName: "PyTorch",
          fontAwesomeClassname: "logos-pytorch",
          style: {
            backgroundColor: "transparent",
          },
        },
        {
          skillName: "Tensorflow",
          fontAwesomeClassname: "logos-tensorflow",
          style: {
            backgroundColor: "transparent",
          },
        },
      ],
    },
    {
      title: "Full Stack Development",
      fileName: "FullStackImg",
      skills: [
        "⚡ Building responsive web applications using React, Next.js, and TypeScript",
        "⚡ Developing scalable backend services with Python, Node.js, and GraphQL",
        "⚡ Creating robust APIs and data pipelines with PostgreSQL, Snowflake, and Redis",
      ],
      softwareSkills: [
        {
          skillName: "TypeScript",
          fontAwesomeClassname: "simple-icons:typescript",
          style: {
            color: "#3178C6",
          },
        },
        {
          skillName: "JavaScript",
          fontAwesomeClassname: "simple-icons:javascript",
          style: {
            backgroundColor: "#000000",
            color: "#F7DF1E",
          },
        },
        {
          skillName: "ReactJS",
          fontAwesomeClassname: "simple-icons:react",
          style: {
            color: "#61DAFB",
          },
        },
        {
          skillName: "Next.js",
          fontAwesomeClassname: "simple-icons:nextdotjs",
          style: {
            color: "#000000",
          },
        },
        {
          skillName: "NodeJS",
          fontAwesomeClassname: "devicon-plain:nodejs-wordmark",
          style: {
            color: "#339933",
          },
        },
        {
          skillName: "GraphQL",
          fontAwesomeClassname: "simple-icons:graphql",
          style: {
            color: "#E10098",
          },
        },
        {
          skillName: "Go",
          fontAwesomeClassname: "simple-icons:go",
          style: {
            color: "#00ADD8",
          },
        },
      ],
    },
    {
      title: "Cloud & Data Infrastructure",
      fileName: "CloudInfraImg",
      skills: [
        "⚡ Designing and deploying cloud infrastructure on AWS, Heroku, and Kubernetes",
        "⚡ Building data warehousing solutions with Snowflake, Redshift, and PostgreSQL",
        "⚡ Implementing CI/CD pipelines with GitHub Actions, Jenkins, and Docker",
      ],
      softwareSkills: [
        {
          skillName: "AWS",
          fontAwesomeClassname: "simple-icons:amazonaws",
          style: {
            color: "#FF9900",
          },
        },
        {
          skillName: "Docker",
          fontAwesomeClassname: "simple-icons:docker",
          style: {
            color: "#1488C6",
          },
        },
        {
          skillName: "Kubernetes",
          fontAwesomeClassname: "simple-icons:kubernetes",
          style: {
            color: "#326CE5",
          },
        },
        {
          skillName: "PostgreSQL",
          fontAwesomeClassname: "simple-icons:postgresql",
          style: {
            color: "#336791",
          },
        },
        {
          skillName: "Snowflake",
          fontAwesomeClassname: "simple-icons:snowflake",
          style: {
            color: "#29B5E8",
          },
        },
        {
          skillName: "Redis",
          fontAwesomeClassname: "simple-icons:redis",
          style: {
            color: "#DC382D",
          },
        },
        {
          skillName: "GitHub Actions",
          fontAwesomeClassname: "simple-icons:githubactions",
          style: {
            color: "#2088FF",
          },
        },
      ],
    },
  ],
};

// Education Page
const competitiveSites = {
  competitiveSites: [
    {
      siteName: "HackTheBox",
      iconifyClassname: "simple-icons:hackthebox",
      style: {
        color: "#9FEF00",
      },
      profileLink: "https://app.hackthebox.com/",
    },
    {
      siteName: "GitHub",
      iconifyClassname: "simple-icons:github",
      style: {
        color: "#181717",
      },
      profileLink: "https://github.com/codeblackwell",
    },
  ],
};

const degrees = {
  degrees: [
    {
      title: "IBM / Coursera",
      subtitle: "Generative AI Engineering Specialist Certification",
      logo_path: "ibm_logo.png",
      alt_name: "IBM Certification",
      duration: "January 2025 - March 2025",
      descriptions: [
        "⚡ Completed comprehensive training in Generative AI foundational models for NLP",
        "⚡ Specialized in RAG pipelines, LangChain, and transformer architectures",
        "⚡ Hands-on experience with data preparation and AI architecture design",
      ],
      website_link: "https://www.coursera.org/",
    },
    {
      title: "Hack Reactor",
      subtitle: "Software Engineering Immersive Bootcamp",
      logo_path: null,
      alt_name: "Hack Reactor",
      duration: "January 2016 - April 2016",
      descriptions: [
        "⚡ Intensive full-stack JavaScript development program",
        "⚡ Built multiple production-ready web applications using React and Node.js",
        "⚡ Gained expertise in algorithms, data structures, and software architecture",
      ],
      website_link: "https://www.hackreactor.com/",
    },
  ],
};

const certifications = {
  certifications: [
    {
      title: "IBM Generative AI Engineering",
      subtitle: "- Specialization",
      logo_path: "ibm_logo.png",
      certificate_link: "https://www.coursera.org/",
      alt_name: "IBM",
      color_code: "#1F70C199",
    },
    {
      title: "Data Analysis with Python",
      subtitle: "- IBM/Coursera",
      logo_path: "ibm_logo.png",
      certificate_link: "https://www.coursera.org/",
      alt_name: "IBM",
      color_code: "#1F70C199",
    },
    {
      title: "Generative AI with RAG & LangChain",
      subtitle: "- IBM/Coursera",
      logo_path: "ibm_logo.png",
      certificate_link: "https://www.coursera.org/",
      alt_name: "IBM",
      color_code: "#1F70C199",
    },
    {
      title: "AI Language Modeling with Transformers",
      subtitle: "- IBM/Coursera",
      logo_path: "ibm_logo.png",
      certificate_link: "https://www.coursera.org/",
      alt_name: "IBM",
      color_code: "#1F70C199",
    },
  ],
};

// Experience Page
const experience = {
  title: "Experience",
  subtitle: "Work, Internships & Volunteerships",
  description:
    "8+ years crafting scalable software across AI/ML, full-stack development, and data engineering. From startup velocity to enterprise scale, I thrive at the intersection of cutting-edge technology and real-world impact.",
  header_image_path: "experience.svg",
  sections: [
    {
      title: "Work",
      work: true,
      experiences: [
        {
          title: "Fullstack Software Engineer",
          company: "Revic.ai",
          company_url: "https://revic.ai/",
          logo_path: null,
          duration: "August 2025 - September 2025",
          location: "San Francisco, CA",
          descriptionBullets: [
            "Drove rapid feature development in a high-paced AI startup, building scalable web applications and admin interfaces with Python, React, and Docker",
            "Spearheaded development of an Administrator interface, significantly reducing response time for customer customization requests",
            "Engineered robust data models and efficient APIs using PostgreSQL and GraphQL, improving data retrieval speed by 25%",
            "Built Multi-Agentic Architecture systems to optimize sales lead generation and qualification workflows",
            "Integrated AWS S3 for scalable data storage and asset management across the platform",
          ],
          color: "#6366F1",
        },
        {
          title: "Software Engineer",
          company: "AvantLink",
          company_url: "https://www.avantlink.com/",
          logo_path: null,
          duration: "October 2020 - June 2025",
          location: "Park City, UT",
          descriptionBullets: [
            "Drove innovation in an agile SaaS environment over 5 years",
            "Architected real-time analytics dashboards providing management with actionable insights",
            "Built robust automation frameworks integrating AI and React into critical workflows",
            "Pioneered R-based machine learning solutions for data optimization",
            "Developed comprehensive integration test suites for AI services",
            "Streamlined releases via GitHub Actions CI/CD",
            "Initiated development of an advanced LLM application prototype",
          ],
          color: "#10B981",
        },
        {
          title: "QA Engineer",
          company: "AvantLink",
          company_url: "https://www.avantlink.com/",
          logo_path: null,
          duration: "October 2018 - October 2020",
          location: "Park City, UT",
          descriptionBullets: [
            "Transformed QA processes through automation and innovation",
            "Built Python testing frameworks that reduced release cycles by 30%",
            "Executed comprehensive API validation, boosting user satisfaction by 15%",
            "Partnered with Data Warehousing Engineers to improve data accuracy by 25%",
            "Revamped API functionalities with UI/UX teams, elevating engagement metrics",
            "Developed end-to-end automated testing (Python + JavaScript), increasing efficiency by 40%",
            "Mastered Snowflake schemas and data warehousing practices",
          ],
          color: "#10B981",
        },
        {
          title: "Automation Engineer",
          company: "Openside",
          company_url: "https://www.openside.com/",
          logo_path: null,
          duration: "March 2018 - October 2018",
          location: "Provo, UT",
          descriptionBullets: [
            "Engineered automation solutions that transformed business operations",
            "Streamlined workflows by 30% through advanced software integrations",
            "Built custom Airtable & Zapier solutions, cutting repetitive tasks by 40%",
            "Translated complex client requirements into automation strategies (95% satisfaction)",
            "Designed database architectures that improved data retrieval by 50%",
            "Led a development team building user-friendly applications",
          ],
          color: "#F59E0B",
        },
        {
          title: "Frontend Software Engineer",
          company: "Stylisted",
          company_url: "https://www.stylisted.com/",
          logo_path: null,
          duration: "November 2016 - January 2017",
          location: "Chicago, IL",
          descriptionBullets: [
            "Launched innovative features for web and mobile platforms in education sector",
            "Tackled technical debt by optimizing React/Redux architecture for maintainability",
            "Leveraged ImmutableJS for significant performance improvements",
            "Led CRM integration as technical lead with Marketing & Analytics teams",
            "Drove CI/CD pipeline improvements for faster, more reliable deployments",
            "Utilized AWS services to enhance infrastructure reliability and scalability",
          ],
          color: "#EC4899",
        },
      ],
    },
  ],
};

// Projects Page
const projectsHeader = {
  title: "Projects",
  description:
    "I build AI-powered tools and applications that solve real problems. From prompt engineering platforms to multi-agent systems, my projects focus on leveraging cutting-edge ML/AI technology.",
  avatar_image_path: "projects_image.svg",
};

const publicationsHeader = {
  title: "Featured Projects",
  description: "Open source projects and tools I've built.",
  avatar_image_path: "projects_image.svg",
};

const publications = {
  data: [
    {
      id: "betterprompts",
      name: "BetterPrompts",
      createdAt: "2025-01-01T00:00:00Z",
      description:
        "AI-powered prompt engineering platform with microservices architecture achieving 89.3% accuracy in intent detection",
      url: "https://github.com/codeblackwell/BetterPrompts",
    },
    {
      id: "agent-blackwell",
      name: "Agent_Blackwell",
      createdAt: "2024-12-01T00:00:00Z",
      description:
        "Multi-expert AI orchestration system for automated software development using Agent Communication Protocol",
      url: "https://github.com/codeblackwell/Agent_Blackwell",
    },
    {
      id: "aura",
      name: "A.U.R.A",
      createdAt: "2024-10-01T00:00:00Z",
      description:
        "4-bit quantized Text-to-JSON engine powered by StarCoder LLM fine-tuned with PEFT & LoRA",
      url: "https://github.com/codeblackwell/A.U.R.A",
    },
    {
      id: "poi-alchemist",
      name: "POI_Alchemist",
      createdAt: "2024-08-01T00:00:00Z",
      description:
        "Blazing-fast POI reconciliation engine combining OpenStreetMap and Foursquare data",
      url: "https://github.com/codeblackwell/POI_Alchemist",
    },
  ],
};

// Contact Page
const contactPageData = {
  contactSection: {
    title: "Contact Me",
    profile_image_path: "LeAvatar.png",
    description:
      "I'm always open to discussing new projects, AI/ML opportunities, or interesting technical challenges. Feel free to reach out via email or connect on social media.",
  },
  blogSection: {
    title: "Blog",
    subtitle:
      "I write about AI, software engineering, and lessons learned building scalable systems.",
    link: "https://medium.com/@CodeBlackwell",
    avatar_image_path: "blogs_image.svg",
    posts: [
      {
        title: "MonitorsFour: From Zero to Docker Desktop Escape",
        url:
          "https://medium.com/@CodeBlackwell/monitorsfour-from-zero-to-docker-desktop-escape-af1b2522de35",
        image:
          "https://miro.medium.com/v2/resize:fit:720/format:webp/1*dCqnOHkLeJ4d7C1gt1NQQw.jpeg",
      },
    ],
  },
  addressSection: {
    title: "Location",
    subtitle: "San Francisco, CA, USA",
    locality: "San Francisco",
    country: "USA",
    region: "California",
    postalCode: "94102",
    streetAddress: "San Francisco",
    avatar_image_path: "address_image.svg",
    location_map_link: "https://maps.app.goo.gl/San-Francisco",
  },
  phoneSection: {
    title: "",
    subtitle: "",
  },
};

// Beyond The Keys Page - Personal Passions
const beyondPageData = {
  title: "Beyond The Keys",
  subtitle: "What Fuels My Fire Outside of Code",
  description:
    "Life is more than lines of code. These passions keep me balanced, creative, and constantly growing.",
  passions: [
    {
      id: "flow-arts",
      name: "Flow Arts",
      description: "Finding meditation in motion through poi, staff, and object manipulation.",
      image_path: "passions/flow-arts.jpg",
      instagram_url: "", // Add Instagram reel/post URL here
      tiktok_url: "", // Add TikTok video URL here
      color_code: "#9b5de5",
    },
    {
      id: "martial-arts",
      name: "Martial Arts",
      description: "Discipline of body and mind through continuous training and improvement.",
      image_path: "passions/martial-arts.jpg",
      instagram_url: "",
      tiktok_url: "",
      color_code: "#dc2f02",
    },
    {
      id: "fire-dancing",
      name: "Fire Dancing",
      description: "Where flow arts meets primal element - trust, focus, and performance artistry.",
      image_path: "passions/fire-dancing.jpg",
      instagram_url: "",
      tiktok_url: "",
      color_code: "#ff6b35",
    },
    {
      id: "outdoors",
      name: "Outdoors",
      description: "Hiking, camping, and reconnecting with nature for perspective and peace.",
      image_path: "passions/outdoors.jpg",
      instagram_url: "",
      tiktok_url: "",
      color_code: "#55a630",
    },
    {
      id: "travel",
      name: "Travel",
      description: "Exploring cultures, cuisines, and perspectives that expand the mind.",
      image_path: "passions/travel.jpg",
      instagram_url: "",
      tiktok_url: "",
      color_code: "#0e6ba8",
    },
  ],
};

export {
  settings,
  seo,
  greeting,
  socialMediaLinks,
  skills,
  competitiveSites,
  degrees,
  certifications,
  experience,
  projectsHeader,
  publicationsHeader,
  publications,
  contactPageData,
  beyondPageData,
};
