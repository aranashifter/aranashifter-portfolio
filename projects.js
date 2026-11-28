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
  { title: "Showreel 2026", category: "Showreel", url: "https://youtu.be/4gkHbJin5dc?si=ceE1W9Ai2tmWIn9f", note: "আমার সেরা কাজ একসাথে" },
  { title: "Cinematic edit", category: "Film", url: "https://youtu.be/QUx1anKHYuI?si=P5xmoMHeJR5w6of3", note: "Color, pacing, atmosphere" },
  { title: "Short-form edit", category: "Social", url: "https://youtube.com/shorts/3L4brkOrIYM?si=EnBmsoA6TSz5ORlz", note: "Reels, Shorts, TikTok" },
  { title: "Motion graphics", category: "Motion", url: "https://youtu.be/BaWrJajJRjA?si=crOsXB7lRgrmoG0O", note: "Titles, typography, animation" },
  { title: "Cover Song edit", category: "Lyrics ", url: "https://youtu.be/af0z_511SWM?si=FlRpDrJ0hxmF4Eu_", note: "Text, Song, Lyrics" },
   { title: "unknown", category: "unknown", url: "", note: "unknown" }
   

  /* উদাহরণ (আগে // তুলে দাও):
  ,{ title: "My first video", category: "Film", url: "https://www.youtube.com/watch?v=XXXXXXXXXXX", note: "Short description" }
  */
];
