export const siteConfig = {
  name: "NoteQuest",
  domain: "notequest.in",
  url: "https://notequest.in",
  tagline: "Learn Programming and Computer Science Today",
  description:
    "Learn programming and computer science with clear tutorials on JavaScript, React, Next.js, Node.js, DSA, databases, system design, and interview prep skills.",
  locale: "en_IN",
  language: "en",
  email: "questnote1@gmail.com",
  social: {
    twitter: "https://twitter.com/notequest",
    github: "https://github.com/notequest",
    linkedin: "https://linkedin.com/company/notequest",
    youtube: "https://youtube.com/@notequest",
  },
  author: {
    name: "NoteQuest Editorial Team",
    url: "https://notequest.in/author/notequest-team",
  },
  navigation: [
    { name: "Home", href: "/" },
    { name: "Programming", href: "/programming" },
    { name: "Frontend", href: "/frontend" },
    { name: "Backend", href: "/backend" },
    { name: "Database", href: "/database" },
    { name: "Interview", href: "/interview-questions" },
    { name: "Career", href: "/career" },
    { name: "About", href: "/about" },
  ],
  footerLinks: {
    about: [
      { name: "About Us", href: "/about" },
      { name: "Editorial Policy", href: "/editorial-policy" },
      { name: "Authors", href: "/author/notequest-team" },
      { name: "Contact", href: "/contact" },
    ],
    categories: [
      { name: "Programming", href: "/programming" },
      { name: "Frontend", href: "/frontend" },
      { name: "Backend", href: "/backend" },
      { name: "Database", href: "/database" },
      { name: "Computer Science", href: "/computer-science" },
      { name: "Interview Questions", href: "/interview-questions" },
      { name: "Career", href: "/career" },
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy-policy" },
      { name: "Disclaimer", href: "/disclaimer" },
      { name: "Terms & Conditions", href: "/terms" },
      { name: "Cookie Policy", href: "/cookie-policy" },
    ],
    quick: [
      { name: "All Articles", href: "/articles" },
      { name: "Search", href: "/search" },
      { name: "RSS Feed", href: "/rss.xml" },
      { name: "Sitemap", href: "/sitemap.xml" },
    ],
  },
};

export const ARTICLES_PER_PAGE = 12;
