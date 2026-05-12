export interface Highlight {
  label: string;
  value: string;
}

export interface About {
  intro: string;
  experience: string;
  personal: string;
  highlights: Highlight[];
}

export interface Project {
  slug: string;
  title: string;
  type: "freelance" | "personal";
  shortDescription: string;
  fullDescription: string;
  features: string[];
  images: string[];
  detailedFunctionality: string;
  techStack: string[];
  link?: string;
  github?: string;
}

export const portfolioData: {
  about: About;
  skills: string[];
  projects: Project[];
} = {
  about: {
    intro: "Hello! I am a recent Computer Science graduate with a professional background in accounting and administration, offering a unique blend of technical skill and business acumen. Currently operating as a Freelance Software Engineer, I deliver functional solutions for real-world clients while maintaining a high standard for organized, scalable code.",
    experience: "Having managed complex financial data and administrative workflows, I bring a disciplined, detail-oriented approach to software development. I am a versatile lifelong learner eager to contribute to a forward-thinking team in roles ranging from Full-Stack Development to Cybersecurity or Machine Learning.",
    personal: "Outside of coding, I’m a big fan of football and staying active through regular workouts, swimming and snorkeling. I also enjoy gaming and watching shows. These hobbies fueled my initial curiosity for how software and immersive worlds are built.",
    highlights: [
      { label: "Based in", value: "Male', Maldives" },
      { label: "Experience", value: "Entry Level" },
      { label: "Focus", value: "Explore various fields to specialise in" },
      { label: "Status", value: "Available for Hire" }
    ]
  },
  skills: [
    "React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL",
    "Vue 3", "Electron", "SQLite", "Laravel", "PHP", "Pinia", "Vite", "Inertia.js", "Python",
    "FastAPI", "scikit-learn", "pandas", "Jupyter Notebook"
  ],
  projects: [
    {
      slug: "freelance-one",
      title: "Dahlia Core",
      type: "freelance",
      shortDescription: "A custom Logistics Business Intelligence and Operations Management Tool developed for Dahlia Pvt Ltd.",
      fullDescription: "The vision of Dahlia Core is to provide a robust, offline-first command center for logistics operations. It aims to eliminate fragmented tracking (spreadsheets/manual logs) by providing a single source of truth for the entire shipment lifecycle—from initial project quotation and container transit to customs clearance and final delivery note processing.",
      features: [
        "Multi-Level Tracking",
        "Demurrage Monitoring",
        "Financial Management",
        "Asset & CRM",
        "Document Storage"
      ],
      images: [
        "/project-gallery/freelance-one/1.png",
        "/project-gallery/freelance-one/2.png",
        "/project-gallery/freelance-one/3.png",
        "/project-gallery/freelance-one/4.png",
        "/project-gallery/freelance-one/5.png",
        "/project-gallery/freelance-one/6.png",
        "/project-gallery/freelance-one/7.png",
        "/project-gallery/freelance-one/8.png",
        "/project-gallery/freelance-one/9.png",
        "/project-gallery/freelance-one/10.png",
        "/project-gallery/freelance-one/11.png",
        "/project-gallery/freelance-one/12.png",
        "/project-gallery/freelance-one/13.png",
        "/project-gallery/freelance-one/14.png",
        "/project-gallery/freelance-one/15.png",
        "/project-gallery/freelance-one/16.png",
        "/project-gallery/freelance-one/17.png",

      ],
      detailedFunctionality: "The application leverages Electron's IPC (Inter-Process Communication) to bridge a high-performance Vue 3 frontend with a local SQLite database. This ensures that all operational data—from container tracking numbers to financial receipts—is processed instantly and securely on the user's machine. It features a custom calculation engine for demurrage, local backup options, and a unified dashboard that tracks shipments through multiple stages: Quotation, Transit, Customs, and Delivery.\n\n• Dashboard & Analytics: Provides a \"Cargo Overview\" and real-time status updates on active shipments and pending actions.\n• Project Workflow:\n  - Tracks duty-free status and links projects to specific customers.\n  - Manages \"Storage Folders\" for project-related documents.\n• Shipment & Container Deep-Dive:\n  - Phase Tracking: Containers move through stages like Transit, MyBandharu Booking, and Customs Release.\n  - Clearance Logic: Supports different clearance methods (e.g., \"Destuffed\").\n  - Demurrage Calculation: Tracks discharge dates and alerts users based on configurable \"Orange\" and \"Red\" alert thresholds (defaulting to 10 and 5 days).\n• Delivery Logistics:\n  - Generates and tracks Delivery Notes (DN).\n  - Monitors DN status: Signed, Mailed, Invoiced, and Paid.\n• Asset Management: Tracking of license plates, current locations, and operational status for vehicles and vessels.\n• System Settings: Allows configuration of default storage sites and global alert thresholds.",
      techStack: ["Vue 3", "TypeScript", "Tailwind CSS", "Electron", "Vite", "SQLite", "Pinia"],
      /* link: " ",  */
      /*github: " " */
    },
    {
      slug: "personal-one",
      title: "Kuda - URL Shortener",
      type: "personal",
      shortDescription: "Kuda is a streamlined, aesthetically focused URL shortener.",
      fullDescription: "Provide users a lightning-fast platform for users to shorten long URLs, securely save them within an authenticated dashboard, and monitor engagement metrics in real-time.",
      features: [
        "Link Shortening",
        "Secure User Authentication",
        "Personal Dashboard",
        "One-Click Copy"
      ],
      images: [
        "/project-gallery/personal-one/1.png",
        "/project-gallery/personal-one/2.png",
        "/project-gallery/personal-one/3.png",
        "/project-gallery/personal-one/4.png"
      ],
      detailedFunctionality: "Built with Laravel 13 and Vue 3 via Inertia.js, Kuda provides a seamless Single Page Application experience for link management. The backend uses Eloquent ORM to manage link ownership and real-time click tracking. Every redirect event is logged and indexed, providing users with immediate engagement analytics. The frontend features a TypeScript-powered dashboard with asynchronous clipboard integration and a responsive layout designed with Tailwind CSS, ensuring a professional and high-performance user experience.",

      techStack: ["PHP", "Laravel", "Vue 3", "Inertia.js", "Laravel Breeze", "Tailwind CSS", "SQLite"],
      github: "https://github.com/Dhain91/URL-Shortener-Kuda"
    },
    {
      slug: "personal-two",
      title: "Phishing Shield",
      type: "personal",
      shortDescription: "A machine learning-powered web application designed to analyze and identify phishing URLs in real-time.",
      fullDescription: "To empower users with a proactive defense against cyber threats by providing a fast, intelligent, and transparent link analysis tool that combines lexical heuristics with machine learning.",
      features: [
        "Real-time Lexical Analysis",
        "Machine Learning Engine",
        "Global Whitelist Guard",
        "Nuanced Risk Scoring"
      ],
      images: [
        "/project-gallery/personal-two/1.png",
        "/project-gallery/personal-two/2.png",
        "/project-gallery/personal-two/3.png",
        "/project-gallery/personal-two/4.png",
        "/project-gallery/personal-two/5.png"
      ],
      detailedFunctionality: "Phishing Shield utilizes a Python FastAPI backend to serve machine learning predictions to a responsive Vue 3 frontend. The system extracts 30+ lexical features from a submitted URL, such as special character density, obfuscation markers, and digit-to-letter ratios. These features are then evaluated by a pre-trained Scikit-Learn model. To ensure high speed and accuracy, the app implements a global whitelist guard that immediately validates known trusted domains before initiating the more compute-intensive AI analysis.",
      techStack: ["Vue 3", "Tailwind CSS", "Axios", "Python", "FastAPI", "Uvicorn", "Pydantic", "scikit-learn", "joblib", "pandas", "Jupyter Notebook"],
      github: "https://github.com/Dhain91/Phishing-Shield"
    }
  ]
};
