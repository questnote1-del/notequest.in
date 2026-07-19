export const authors = [
  {
    slug: "notequest-team",
    name: "NoteQuest Editorial Team",
    role: "Editorial Team",
    bio: "The NoteQuest Editorial Team creates practical programming and computer science guides for learners at every level. We focus on clarity, accuracy, and hands-on examples that help you build real skills.",
    avatar: "/images/authors/notequest-team.svg",
    email: "questnote1@gmail.com",
    social: {
      twitter: "https://twitter.com/notequest",
      github: "https://github.com/notequest",
      linkedin: "https://linkedin.com/company/notequest",
    },
    expertise: [
      "JavaScript",
      "React",
      "Node.js",
      "System Design",
      "DSA",
      "Career Guidance",
    ],
  },
  {
    slug: "priya-sharma",
    name: "Priya Sharma",
    role: "Senior Frontend Engineer",
    bio: "Priya writes about React, Next.js, and modern frontend architecture. She has 8+ years of experience building high-performance web applications and mentoring junior developers.",
    avatar: "/images/authors/priya-sharma.svg",
    email: "questnote1@gmail.com",
    social: {
      twitter: "https://twitter.com/notequest",
      github: "https://github.com/notequest",
      linkedin: "https://linkedin.com/company/notequest",
    },
    expertise: ["React", "Next.js", "TypeScript", "CSS", "Performance"],
  },
  {
    slug: "arjun-mehta",
    name: "Arjun Mehta",
    role: "Backend & Systems Engineer",
    bio: "Arjun covers Node.js, databases, system design, and backend architecture. He specializes in building scalable APIs and explaining complex distributed systems in plain language.",
    avatar: "/images/authors/arjun-mehta.svg",
    email: "questnote1@gmail.com",
    social: {
      twitter: "https://twitter.com/notequest",
      github: "https://github.com/notequest",
      linkedin: "https://linkedin.com/company/notequest",
    },
    expertise: ["Node.js", "MongoDB", "SQL", "System Design", "DBMS"],
  },
  {
    slug: "neha-patel",
    name: "Neha Patel",
    role: "CS Educator & Interview Coach",
    bio: "Neha teaches data structures, algorithms, and interview preparation. She helps students and professionals prepare for technical interviews at product-based companies.",
    avatar: "/images/authors/neha-patel.svg",
    email: "questnote1@gmail.com",
    social: {
      twitter: "https://twitter.com/notequest",
      github: "https://github.com/notequest",
      linkedin: "https://linkedin.com/company/notequest",
    },
    expertise: ["DSA", "Algorithms", "Interview Prep", "Career", "OS"],
  },
];

export function getAuthorBySlug(slug) {
  return authors.find((a) => a.slug === slug);
}

export function getDefaultAuthor() {
  return authors[0];
}
