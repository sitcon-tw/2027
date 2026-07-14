export interface TimelineItem {
  date: string;
  sortDate: string;
  title: string;
  description: string;
  status: "now" | "upcoming" | "event";
  tentative?: boolean;
}

export interface RecruitmentTeam {
  name: string;
  icon:
    | "coordinator"
    | "administration"
    | "agenda"
    | "activity"
    | "venue"
    | "design"
    | "record"
    | "production"
    | "development"
    | "editing"
    | "marketing";
  description: string;
  details: string;
  image: string;
  imageAlt: string;
  photoUrl: string;
}

export const siteConfig = {
  name: "SITCON 2027",
  fullName: "SITCON 學生計算機年會 2027",
  status: "籌備進行中",
  tagline: "一起做出 SITCON 2027",
  dateDisplay: "2027.03.13",
  startDate: "2027-03-13T09:00:00+08:00",
  endDate: "2027-03-13T18:00:00+08:00",
  venue: "中央研究院人文社會科學館",
  address: "臺北市南港區研究院路二段 128 號",
  preJumpForm: {
    url: "https://forms.gle/qjwKhp2QAdpizGsR7",
    isPlaceholder: false,
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

export const timeline: TimelineItem[] = [
  {
    date: "2026 / 07",
    sortDate: "2026-07",
    title: "預告網站上線",
    description: "預告網站正式上線。從這裡開始追蹤 SITCON 2027 的籌備進度。",
    status: "now",
  },
  {
    date: "2026 / 08",
    sortDate: "2026-08",
    title: "籌備團隊招募開始",
    description: "無論是第一次參與，或已經熟悉社群協作，都歡迎帶著想法加入。",
    status: "upcoming",
    tentative: true,
  },
  {
    date: "2026 / 09",
    sortDate: "2026-09",
    title: "籌備正式啟動",
    description: "各組開始公開協作，讓學生社群的想法一步步長成年度年會。",
    status: "upcoming",
    tentative: true,
  },
  {
    date: "2026 / 10",
    sortDate: "2026-10",
    title: "徵稿開始",
    description: "徵稿辦法與投稿資訊預計陸續公開。",
    status: "upcoming",
    tentative: true,
  },
  {
    date: "2027 / 01",
    sortDate: "2027-01",
    title: "活動報名預計開放",
    description: "票種、議程與參與方式將以官方最新公告為準。",
    status: "upcoming",
    tentative: true,
  },
  {
    date: "2027 / 03 / 13",
    sortDate: "2027-03-13",
    title: "SITCON 2027",
    description: "在中央研究院人文社會科學館，和學生社群一起交流、分享與創造。",
    status: "event",
  },
];

export const recruitmentTeams: RecruitmentTeam[] = [
  {
    name: "總召組",
    icon: "coordinator",
    description: "串起方向、決策與每一個籌備組別。",
    details: "統整年會目標、時程與跨組協作，協助團隊做決策、排除阻礙，讓所有工作朝同一方向前進。",
    image: "assets/recruitment/coordinator.jpg",
    imageAlt: "SITCON 2026 工作人員在會場入口引導與協調",
    photoUrl: "https://www.flickr.com/photos/sitcon/55245144317",
  },
  {
    name: "行政組",
    icon: "administration",
    description: "把資訊、人與資源安放在正確的位置。",
    details: "維護籌備文件與跨組資訊，也負責財務管理、預算與報帳流程，讓每筆資源都清楚可追蹤。",
    image: "assets/recruitment/administration.jpg",
    imageAlt: "SITCON 2026 工作人員在報到桌遞交紙本資料",
    photoUrl: "https://www.flickr.com/photos/sitcon/55246174900",
  },
  {
    name: "議程組",
    icon: "agenda",
    description: "規劃徵稿、講者與年會的知識脈絡。",
    details: "從徵稿辦法、稿件審查到講者聯繫，和團隊一起梳理議程主題與分享節奏。",
    image: "assets/recruitment/agenda.jpg",
    imageAlt: "SITCON 講者在階梯教室向會眾分享",
    photoUrl: "https://www.flickr.com/photos/sitcon/25467227761",
  },
  {
    name: "活動組",
    icon: "activity",
    description: "設計讓參與者投入其中的交流體驗。",
    details: "規劃會前與年會中的互動活動，負責流程、主持與現場執行，讓參與者更容易認識彼此。",
    image: "assets/recruitment/activity.jpg",
    imageAlt: "SITCON 2026 工作人員拿著麥克風帶領參與者互動",
    photoUrl: "https://www.flickr.com/photos/sitcon/55250534728",
  },
  {
    name: "場務組",
    icon: "venue",
    description: "讓現場動線、空間與每個細節順利運作。",
    details: "規劃場地配置、報到與人流動線，協調設備與臨場支援，確保活動穩定運作。",
    image: "assets/recruitment/venue.jpg",
    imageAlt: "多位 SITCON 工作人員在走廊搬運折疊桌與椅子",
    photoUrl: "https://www.flickr.com/photos/sitcon/50258288467",
  },
  {
    name: "設計組",
    icon: "design",
    description: "把年度概念轉化成一致而鮮明的視覺。",
    details: "建立年度視覺系統，延伸到網站、社群與會場物件，讓每個接觸點保持一致。",
    image: "assets/recruitment/design.jpg",
    imageAlt: "SITCON Camp 參與者在白板上畫圖",
    photoUrl: "https://www.flickr.com/photos/sitcon/55383671611",
  },
  {
    name: "紀錄組",
    icon: "record",
    description: "保存影像、文字與社群共同完成的軌跡。",
    details: "由靜態與動態夥伴拍攝、整理年會影像，讓每場分享與共同記憶都能被完整保存。",
    image: "assets/recruitment/record.jpg",
    imageAlt: "SITCON Camp 攝影工作人員在戶外取景",
    photoUrl: "https://www.flickr.com/photos/sitcon/55388194816",
  },
  {
    name: "製播組",
    icon: "production",
    description: "把現場內容穩定送到螢幕與線上。",
    details: "負責議程直播、導播、音訊與監看設備，和場務及議程協作，讓每一場分享順利播出。",
    image: "assets/recruitment/production.jpg",
    imageAlt: "SITCON 2026 製播工作人員戴耳機操作監看與控制設備",
    photoUrl: "https://www.flickr.com/photos/sitcon/55244847992",
  },
  {
    name: "開發組",
    icon: "development",
    description: "打造官網、票務與籌備需要的數位工具。",
    details: "開發與維護官網、報名與內部工具，將籌備需求轉成可靠、好用的數位服務。",
    image: "assets/recruitment/development.jpg",
    imageAlt: "參與者在筆電上操作終端機程式",
    photoUrl: "https://www.flickr.com/photos/sitcon/55388594180",
  },
  {
    name: "編輯組",
    icon: "editing",
    description: "把年會資訊整理成清楚、準確的內容。",
    details: "負責社群文案、公告與對外公關內容，和設計協作，把議程、活動與重要資訊說清楚。",
    image: "assets/recruitment/editing.jpg",
    imageAlt: "SITCON 2025 工作人員在桌邊手寫紙卡",
    photoUrl: "https://www.flickr.com/photos/sitcon/54478181675",
  },
  {
    name: "行銷組",
    icon: "marketing",
    description: "讓 SITCON 與更多學生和社群相遇。",
    details: "規劃宣傳策略、校園與社群合作及推廣節奏，讓年會資訊抵達更多可能參與的人。",
    image: "assets/recruitment/marketing.jpg",
    imageAlt: "社群攤位工作人員與參與者交談",
    photoUrl: "https://www.flickr.com/photos/sitcon/55388577255",
  },
];
