import hocImage from "../assets/community/hour-of-code.webp";
import campImage from "../assets/community/camp.webp";
import conferenceImage from "../assets/community/conference.webp";
import hackathonImage from "../assets/community/hackathon.webp";
import reportImage from "../assets/community/report.webp";

export const siteConfig = {
  name: "SITCON 2027",
  fullName: "SITCON 學生計算機年會 2027",
  status: "籌備進行中",
  tagline: ["由學生發起的", "資訊社群與年會。"],
  seo: {
    title: "SITCON 學生計算機年會｜認識社群與 2027 年會",
    description:
      "認識由學生發起的 SITCON：資訊教育、技術交流與開源協作。探索社群活動、回顧 2026 年會與贊助徵求書，了解 2027 年會資訊。",
    imageAlt: "SITCON 學生計算機年會，由學生發起，讓交流與實作成為可能",
  },
  dateDisplay: "2027.03.13",
  startDate: "2027-03-13T09:00:00+08:00",
  endDate: "2027-03-13T18:00:00+08:00",
  venue: "中央研究院人文社會科學館",
  address: "臺北市南港區研究院路二段 128 號",
  portal: {
    introduction: "SITCON（學生計算機年會）由學生自發籌辦，提供技術分享與交流的舞台。我們透過年會、夏令營與黑客松，推廣資訊教育與開源精神，讓學生找到一起學習、實作的夥伴。",
    notice: "2027 年徵稿與贊助資訊尚未公布；2026 年資料供回顧參考。",
    archiveLinks: [
      { label: "查看 2026 年會官網", url: "https://sitcon.org/2026/" },
      { label: "查看 2026 贊助徵求書", url: "https://sitcon.org/2026/cfs/" },
    ],
  },
  links: {
    codeOfConduct: "https://sitcon.org/code-of-conduct/",
    mailingList: "https://groups.google.com/g/sitcon-general/",
    hackmd: "https://hackmd.io/@SITCON",
    github: "https://github.com/sitcon-tw",
    facebook: "https://sitcon.org/fb",
    instagram: "https://sitcon.org/ig",
    threads: "https://sitcon.org/threads",
    youtube: "https://sitcon.org/youtube",
    flickr: "https://sitcon.org/flickr",
    telegram: "https://sitcon.org/telegram",
    contact: "mailto:contact@sitcon.org",
    donate: "https://sitcon.org/donate",
    hourOfCode: "https://sitcon.org/hoc/",
    camp: "https://sitcon.camp",
    hackathon: "https://hackathon.sitcon.org",
    podcast: "https://sitcon.org/podcast/",
    goodHacker: "https://sitcon.org/hacker/",
  },
} as const;

export const aboutSource = {
  label: "2026 年會官網",
  url: "https://sitcon.org/2026/about/",
} as const;

export const communityScale = {
  period: "2026 年會官網公布之歷年累積資料",
  source: aboutSource,
  primary: [
    { value: "14,000", unit: "位以上", label: "年會參與者" },
    { value: "1,400", unit: "位以上", label: "工作人員" },
    { value: "500", unit: "位以上", label: "學生講者" },
  ],
  secondary: [
    { value: "500", unit: "場以上", label: "聚會與講座" },
    { value: "10", unit: "場以上", label: "夏令營" },
  ],
} as const;

export const communityActivities = [
  { name: "Hour of Code", label: "讓好奇，成為第一步。", description: "第一次接觸程式，也能發現自己做得到。Hour of Code 透過容易親近的活動，降低資訊學習的門檻，陪伴孩子與學生探索程式的樂趣。", detail: "從資訊啟蒙開始，讓更多人有機會走進資訊世界。", image: hocImage, imageAlt: "Hour of Code 活動現場", url: siteConfig.links.hourOfCode },
  { name: "SITCON Camp", label: "把好奇，變成實作的能力。", description: "五天四夜，和一群對資訊充滿好奇的夥伴一起學習。透過課程、動手實作與社群交流，學生能探索自己的興趣，也找到一起前進的同伴。", detail: "在共同學習中，感受分享與開源協作的精神。", image: campImage, imageAlt: "SITCON 夏令營活動現場", url: siteConfig.links.camp },
  { name: "SITCON 年會", label: "讓學生的聲音，被聽見。", description: "學生不只是台下的聽眾，也能成為台上的分享者。年會匯聚各地資訊學子，讓技術實作、探索心得與不同觀點在這裡交流。", detail: "透過分享與經驗傳承，讓跨世代、跨領域的夥伴相遇。", image: conferenceImage, imageAlt: "SITCON 年會現場", url: "https://sitcon.org/2026/" },
  { name: "SITCON Hackathon", label: "一起，把想法做出來。", description: "從天馬行空的構想，到能夠展示的成果。黑客松讓參與者在緊湊的團隊協作中，一起發想、規劃並動手開發，練習解決問題。", detail: "讓創意透過實作成形，也讓學生團隊的能力被看見。", image: hackathonImage, imageAlt: "SITCON 黑客松活動現場", url: siteConfig.links.hackathon },
].map(activity => ({ ...activity, source: "https://sitcon.camp/2026/about/" }));

export const attendeeReview = {
  period: "2025 年會回顧",
  source: aboutSource,
  stats: [
    { value: "1,300", unit: "人次", label: "會場參與" },
    { value: "200", unit: "所", label: "海內外學校" },
    { value: "70%", unit: "", label: "大專院校或研究所背景" },
    { value: "1/3", unit: "", label: "活躍於資訊社群" },
  ],
} as const;

export const mediaReport = {
  title: "台灣新驕點：開放文化基金會 — 2026 SITCON 學生計算機年會",
  description: "年代 MUCH《台灣新驕點》專訪開放文化基金會，介紹 SITCON 與學生社群如何推動資訊交流、開源文化與下一代人才培育。",
  thumbnail: reportImage,
  source: "https://sitcon.camp/2026/about/",
  embedUrl: "https://www.youtube-nocookie.com/embed/zplk0zALtOM?autoplay=1",
  watchUrl: "https://www.youtube.com/watch?v=zplk0zALtOM",
} as const;
