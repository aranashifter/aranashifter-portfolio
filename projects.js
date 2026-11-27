/* =====================================================
   ARANASHIFTER — এই ফাইলটাই তোমার একমাত্র edit করার ফাইল
   ===================================================== */

const SITE = {
  name: "Rakib Al Hasan",
  email: "contact@aranashifter.online",
  instagram: "https://instagram.com/aranashifter",
  youtube: "https://youtube.com/@aranashifter",
  facebook: "",   // চাইলে link বসাও, না চাইলে ফাঁকা রাখো
  whatsapp: ""    // যেমন: "https://wa.me/8801XXXXXXXXX"
};

/* ভিডিও যোগ করার নিয়ম:
   নিচের লিস্টে একটা করে লাইন কপি করে url-এ তোমার ভিডিও link বসাও।
   YouTube, YouTube Shorts, Vimeo, Google Drive link — সবই চলবে।
   thumbnail নিজে থেকে আসবে (YouTube হলে)।
   category: "Showreel", "Film", "Social", "Motion" — যেটা ইচ্ছা লিখতে পারো।
   url ফাঁকা থাকলে "Your video here" placeholder দেখাবে। */

const PROJECTS = [
  { title: "Showreel 2026", category: "Showreel", url: "", note: "আমার সেরা কাজ একসাথে" },
  { title: "Cinematic edit", category: "Film", url: "", note: "Color, pacing, atmosphere" },
  { title: "Short-form edit", category: "Social", url: "", note: "Reels, Shorts, TikTok" },
  { title: "Motion graphics", category: "Motion", url: "", note: "Titles, typography, animation" }

  /* উদাহরণ (আগে // তুলে দাও):
  ,{ title: "My first video", category: "Film", url: "https://www.youtube.com/watch?v=XXXXXXXXXXX", note: "Short description" }
  */
];
