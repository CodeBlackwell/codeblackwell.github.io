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
  resumeLink:
    "https://github.com/codeblackwell/codeblackwell.github.io/raw/master/resume1-Fullstack.pdf",
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
      logo_path: "hack_reactor_logo.png",
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
  subtitle: "Work Experience",
  description:
    "8+ years of experience building scalable software solutions across AI/ML, full-stack development, and data engineering. Passionate about leveraging cutting-edge technology to solve complex problems.",
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
          logo_path: "revic_logo.png",
          duration: "August 2025 - September 2025",
          location: "San Francisco, CA, USA",
          description:
            "Drove rapid development of dynamic admin interfaces using Python, React, and Docker. Engineered scalable backend services with PostgreSQL and GraphQL, improving data retrieval by 25%. Implemented CI/CD pipeline improvements reducing deployment times by 40%.",
          color: "#000000",
        },
        {
          title: "Software Engineer",
          company: "AvantLink",
          company_url: "https://www.avantlink.com/",
          logo_path: "avantlink_logo.png",
          duration: "October 2020 - June 2025",
          location: "Park City, UT",
          description:
            "Engineered user-centric software solutions enhancing process automation and data integrity. Architected multi-layered dashboards for real-time insights. Developed comprehensive regression testing frameworks. Pioneered prototype LLM application development.",
          color: "#0879bf",
        },
        {
          title: "QA Engineer",
          company: "AvantLink",
          company_url: "https://www.avantlink.com/",
          logo_path: "avantlink_logo.png",
          duration: "October 2018 - October 2020",
          location: "Park City, UT",
          description:
            "Engineered robust automated testing frameworks in Python. Drove regression testing and API validation initiatives. Collaborated with UI/UX teams to enhance API functionalities. Expanded expertise in Snowflake schemas and data warehousing.",
          color: "#0879bf",
        },
        {
          title: "Automation Engineer",
          company: "Openside",
          company_url: "https://www.openside.com/",
          logo_path: "openside_logo.png",
          duration: "March 2018 - October 2018",
          location: "Provo, UT, USA",
          description:
            "Developed automated solutions streamlining workflow processes by 30%. Designed custom integrations with Airtable and Zapier. Engineered robust database architectures improving data retrieval by 50%.",
          color: "#9b1578",
        },
        {
          title: "Frontend Software Engineer",
          company: "Stylisted",
          company_url: "https://www.stylisted.com/",
          logo_path: "stylisted_logo.png",
          duration: "November 2016 - January 2017",
          location: "Chicago, IL, USA",
          description:
            "Led design and implementation of features across web and mobile platforms. Streamlined codebase using React/Redux. Optimized performance with ImmutableJS. Served as technical lead for CRM integration.",
          color: "#fc1f20",
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
      description: "AI-powered prompt engineering platform with microservices architecture achieving 89.3% accuracy in intent detection",
      url: "https://github.com/codeblackwell/BetterPrompts",
    },
    {
      id: "agent-blackwell",
      name: "Agent_Blackwell",
      createdAt: "2024-12-01T00:00:00Z",
      description: "Multi-expert AI orchestration system for automated software development using Agent Communication Protocol",
      url: "https://github.com/codeblackwell/Agent_Blackwell",
    },
    {
      id: "aura",
      name: "A.U.R.A",
      createdAt: "2024-10-01T00:00:00Z",
      description: "4-bit quantized Text-to-JSON engine powered by StarCoder LLM fine-tuned with PEFT & LoRA",
      url: "https://github.com/codeblackwell/A.U.R.A",
    },
    {
      id: "poi-alchemist",
      name: "POI_Alchemist",
      createdAt: "2024-08-01T00:00:00Z",
      description: "Blazing-fast POI reconciliation engine combining OpenStreetMap and Foursquare data",
      url: "https://github.com/codeblackwell/POI_Alchemist",
    },
  ],
};

// Contact Page
const contactPageData = {
  contactSection: {
    title: "Contact Me",
    profile_image_path: "animated_ashutosh.png",
    description:
      "I'm always open to discussing new projects, AI/ML opportunities, or interesting technical challenges. Feel free to reach out via email or connect on social media.",
  },
  blogSection: {
    title: "GitHub",
    subtitle:
      "Check out my open source projects and contributions on GitHub.",
    link: "https://github.com/codeblackwell",
    avatar_image_path: "blogs_image.svg",
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
};
