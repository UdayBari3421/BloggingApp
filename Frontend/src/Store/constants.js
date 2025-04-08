export const backendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

export const getTimeAgo = (timestamp) => {
  const now = new Date();
  const postTime = new Date(timestamp);
  const diffInSeconds = Math.floor((now - postTime) / 1000);

  if (diffInSeconds < 60) return `${diffInSeconds} s ago`;

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes} min ago`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} hr ago`;

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) return `${diffInDays} d ago`;

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) return `${diffInMonths} m ago`;

  return `${Math.floor(diffInMonths / 12)} yr ago`;
};

export const genreOptions = [
  { id: "politics", title: "Politics" },
  { id: "science", title: "Science" },
  { id: "history", title: "History" },
  { id: "technology", title: "Technology" },
  { id: "art", title: "Art" },
  { id: "literature", title: "Literature" },
  { id: "sports", title: "Sports" },
  { id: "music", title: "Music" },
  { id: "travel", title: "Travel" },
  { id: "food", title: "Food" },
];
