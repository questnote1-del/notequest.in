export const videos = [
  {
    id: "react-components",
    slug: "react-components",
    title: "Understanding React Components",
    description:
      "Learn what React components are, how they work, and how to create reusable components in React.",
    thumbnail: "/videos/thumbnails/react-components.jpg",
    videoUrl: "/videos/react-components.mp4",
    duration: "12:45",
    category: "React",
    views: "1.2K views",
    publishedAt: "Sep 27, 2026",
    author: "NoteQuest",
  },

  {
    id: "react-fundamentals",
    slug: "react-fundamentals",
    title: "React Fundamentals for Beginners",
    description:
      "Learn the fundamentals of React including JSX, components, props, state, and event handling.",
    thumbnail: "/videos/thumbnails/react-fundamentals.jpg",
    videoUrl: "/videos/react-fundamentals.mp4",
    duration: "18:20",
    category: "React",
    views: "980 views",
    publishedAt: "Sep 26, 2026",
    author: "NoteQuest",
  },

  {
    id: "react-props",
    slug: "react-props",
    title: "React Props Explained",
    description:
      "Understand React props and learn how to pass data from one component to another.",
    thumbnail: "/videos/thumbnails/react-props.jpg",
    videoUrl: "/videos/react-props.mp4",
    duration: "08:32",
    category: "React",
    views: "760 views",
    publishedAt: "Sep 25, 2026",
    author: "NoteQuest",
  },

  {
    id: "react-state",
    slug: "react-state",
    title: "React State Explained",
    description:
      "Learn how state works in React and how useState helps you build interactive applications.",
    thumbnail: "/videos/thumbnails/react-state.jpg",
    videoUrl: "/videos/react-state.mp4",
    duration: "10:15",
    category: "React",
    views: "640 views",
    publishedAt: "Sep 24, 2026",
    author: "NoteQuest",
  },

  {
    id: "react-hooks",
    slug: "react-hooks",
    title: "React Hooks for Beginners",
    description:
      "A beginner-friendly introduction to React Hooks including useState and useEffect.",
    thumbnail: "/videos/thumbnails/react-hooks.jpg",
    videoUrl: "/videos/react-hooks.mp4",
    duration: "15:20",
    category: "React",
    views: "1.5K views",
    publishedAt: "Sep 23, 2026",
    author: "NoteQuest",
  },

  {
    id: "javascript-basics",
    slug: "javascript-basics",
    title: "JavaScript Basics for Beginners",
    description:
      "Start learning JavaScript fundamentals with variables, functions, arrays, objects, and more.",
    thumbnail: "/videos/thumbnails/javascript-basics.jpg",
    videoUrl: "/videos/javascript-basics.mp4",
    duration: "20:10",
    category: "JavaScript",
    views: "2.1K views",
    publishedAt: "Sep 22, 2026",
    author: "NoteQuest",
  },
];

export function getVideoBySlug(slug) {
  return videos.find((video) => video.slug === slug);
}

export function getSuggestedVideos(currentSlug) {
  return videos.filter((video) => video.slug !== currentSlug);
}
