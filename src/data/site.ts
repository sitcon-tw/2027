import type { ImageMetadata } from "astro";
import activityImage from "../assets/recruitment/activity.jpg";
import administrationImage from "../assets/recruitment/administration.jpg";
import agendaImage from "../assets/recruitment/agenda.jpg";
import coordinatorImage from "../assets/recruitment/coordinator.jpg";
import designImage from "../assets/recruitment/design.jpg";
import developmentImage from "../assets/recruitment/development.jpg";
import editingImage from "../assets/recruitment/editing.jpg";
import marketingImage from "../assets/recruitment/marketing.jpg";
import productionImage from "../assets/recruitment/production.jpg";
import recordImage from "../assets/recruitment/record.jpg";
import venueImage from "../assets/recruitment/venue.jpg";

export interface TimelineItem {
  date: string;
  sortDate: string;
  title: string;
  description: string;
  status: "now" | "upcoming" | "event";
  tentative?: boolean;
}

export interface RecruitmentDetailSection {
  title: string;
  paragraphs?: string[];
  items?: string[];
}

export interface RecruitmentContact {
  label: string;
  url: string;
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
  image: ImageMetadata;
  imageAlt: string;
  photoUrl: string;
  recruitment:
    | { type: "form"; url: string }
    | { type: "overview" }
    | { type: "none" };
  recruitmentDetails?: {
    deadline: string;
    headcount: string;
    sections: RecruitmentDetailSection[];
    contacts?: RecruitmentContact[];
  };
}

export const siteConfig = {
  name: "SITCON 2027",
  fullName: "SITCON 學生計算機年會 2027",
  status: "籌備進行中",
  tagline: ["工作人員", "招募中"],
  seo: {
    title: "SITCON 2027 學生計算機年會｜籌備資訊與工作人員招募",
    description:
      "SITCON 2027 學生計算機年會將於 2027 年 3 月 13 日在中央研究院人文社會科學館舉行。查看最新籌備時程、工作人員招募與參與方式。",
    imageAlt: "SITCON 2027 學生計算機年會，2027 年 3 月 13 日於中央研究院舉行",
  },
  dateDisplay: "2027.03.13",
  startDate: "2027-03-13T09:00:00+08:00",
  endDate: "2027-03-13T18:00:00+08:00",
  venue: "中央研究院人文社會科學館",
  address: "臺北市南港區研究院路二段 128 號",
  recruitment: {
    overviewUrl: "https://hackmd.io/@SITCON/2027-recruit",
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
    image: coordinatorImage,
    imageAlt: "SITCON 2026 工作人員在會場入口引導與協調",
    photoUrl: "https://www.flickr.com/photos/sitcon/55245144317",
    recruitment: { type: "none" },
  },
  {
    name: "行政組",
    icon: "administration",
    description: "處理人事、財務與籌備行政大小事。",
    details: "行政股負責住宿、票務、保險與行前通知；財務股管理預算、報銷、出帳及結案帳務。",
    image: administrationImage,
    imageAlt: "SITCON 2026 工作人員在報到桌遞交紙本資料",
    photoUrl: "https://www.flickr.com/photos/sitcon/55246174900",
    recruitment: {
      type: "form",
      url: "https://forms.gle/bQLGvX2UsQoTVXaeA",
    },
    recruitmentDetails: {
      deadline: "2026/08/15 23:59",
      headcount: "行政股 1 人、財務股 1 人",
      sections: [
        {
          title: "行政股工作內容",
          items: [
            "處理工作人員與會眾事務，包含住宿、票務、保險等。",
            "所有與志工人事相關的事務都會是行政股的工作。",
            "寄送行前信、舉辦慶功宴等。",
          ],
        },
        {
          title: "行政股推薦條件",
          items: ["細心、負責、擅長溝通。", "熟悉 Email 與線上表單作業。"],
        },
        {
          title: "財務股工作內容",
          items: ["管理預算、報銷與出帳流程。", "編製會計報告與結案帳務。"],
        },
        {
          title: "財務股推薦條件",
          items: ["細心、理性，會使用 Excel 或記帳工具。", "可配合查帳與資金控管。"],
        },
      ],
      contacts: [
        { label: "Telegram：@yuan_tw_1111", url: "https://t.me/yuan_tw_1111" },
        { label: "Email：me@yuan-tw.net", url: "mailto:me@yuan-tw.net" },
      ],
    },
  },
  {
    name: "議程組與議程助理",
    icon: "agenda",
    description: "規劃議程內容，也照顧議程廳的現場節奏。",
    details: "辦理徵審稿、聯繫講者、規劃主題演講與論壇；議程助理負責前導、計時、宣達及現場協調。",
    image: agendaImage,
    imageAlt: "SITCON 講者在階梯教室向會眾分享",
    photoUrl: "https://www.flickr.com/photos/sitcon/25467227761",
    recruitment: {
      type: "form",
      url: "https://forms.gle/d8DxAM4qqA39TCpc7",
    },
    recruitmentDetails: {
      deadline: "2026/08/17 23:59",
      headcount: "組員 4 人、議程助理 10 人",
      sections: [
        {
          title: "議程組工作內容",
          items: [
            "辦理徵稿與審稿，編排議程表。",
            "聯絡稿件講者，包含蒐集議程內容授權書、更新議程資訊、調查講者飲食習慣等。",
            "邀請合適的主題演講（Keynote）講者。",
            "規劃、辦理論壇，並邀請合適的與談人。",
          ],
        },
        {
          title: "議程組推薦條件",
          items: [
            "對 SITCON 年會及各式社群活動的理念與目標，有自己的想法。",
            "喜歡問問題、聽取其他夥伴的發言，也願意發表自己的意見。",
            "樂於參與不同議題的反覆討論，並嘗試理解不同人的觀點。",
            "不畏懼閱讀大量文字，包含書籍、文章、歷屆文件與信件討論。",
            "做事時考慮周全，不遺漏狀況或細節。",
            "主動參與約 2 至 3 週一次的議程組會議；跨組會議同樣約 2 至 3 週一次，但不強迫參加。",
            "經常查看 Email，至少一天 2 次。",
          ],
        },
        {
          title: "議程助理工作內容",
          items: [
            "確認講者於議程開始前的準備狀況。",
            "進行議程前導，並在開始後掌握時間、提醒講者。",
            "宣達會場注意事項、議程異動與其他大會資訊。",
            "處理議程廳內臨時狀況，並與製播、場務及議程組夥伴協調。",
          ],
        },
        {
          title: "議程助理推薦條件",
          items: [
            "不畏懼使用麥克風進行公開宣達及提醒講者掌握時間。",
            "能尊重不同背景的講者及與會者，協助維持友善、安全的議程環境。",
            "願意閱讀工作手冊與議程資訊，熟悉自己負責議程的流程及注意事項。",
            "能留意工作群組與 Email，及時確認排班、異動與重要通知。",
            "年會當天能配合排班及現場調度，並在無法執行工作時儘早向負責夥伴反映。",
          ],
        },
        {
          title: "FAQ：我需要擁有很紮實的資訊能力嗎？",
          paragraphs: [
            "自認對資訊有充分的興趣，且有持續瞭解與進步就好。比起技術實力，議程組更需要對資訊社群有熱忱、有想法的夥伴；若有足夠的資訊知識、技術能力與開發經驗，也絕對會對籌備大有幫助。",
          ],
        },
        {
          title: "FAQ：我想幫忙，但時間不夠怎麼辦？",
          paragraphs: [
            "我們期望加入的成員半年內有足夠的時間參與籌備。如果覺得自己可能會很忙，但依然很想加入，可以先填表單，當面聊聊你的規劃；我們不會排斥任何願意幫忙的人。",
          ],
        },
        {
          title: "FAQ：工作量會很大嗎？",
          paragraphs: [
            "工作會儘量以達成共識的方式分配，並以不造成大家生活壓力為前提。若你覺得工作量太大，可以向組內夥伴反映，組長會想辦法找人解決。",
          ],
        },
      ],
      contacts: [
        { label: "Telegram：@zhan079", url: "https://t.me/zhan079" },
        { label: "Email：sitcon-agenda@googlegroups.com", url: "mailto:sitcon-agenda@googlegroups.com" },
      ],
    },
  },
  {
    name: "活動組",
    icon: "activity",
    description: "打造讓會眾投入其中的年會體驗。",
    details: "發想大地遊戲、指南針、導遊團等互動企劃，規劃流程與物資，並負責現場帶領、應變及回饋整理。",
    image: activityImage,
    imageAlt: "SITCON 2026 工作人員拿著麥克風帶領參與者互動",
    photoUrl: "https://www.flickr.com/photos/sitcon/55250534728",
    recruitment: { type: "overview" },
    recruitmentDetails: {
      deadline: "待公布",
      headcount: "3–4 人",
      sections: [
        {
          title: "關於活動組",
          paragraphs: [
            "除了精彩的議程，SITCON 還能帶給會眾什麼？今年，活動組正式獨立，希望能投入更多心力，打造屬於 SITCON 的年會體驗。",
            "我們負責規劃年會中的各式互動企劃，從經典的大地遊戲、指南針計畫、導遊團，到更多嶄新的活動設計，希望讓每位會眾都能在 SITCON 找到屬於自己的回憶。",
          ],
        },
        {
          title: "活動企劃",
          items: [
            "發想活動主題與內容。",
            "規劃活動流程、遊玩方式與體驗設計。",
            "與組員一起腦力激盪，把想法逐步完善。",
          ],
        },
        {
          title: "互動設計",
          items: [
            "設計大地遊戲、闖關、交流活動等互動企劃。",
            "思考如何提升會眾參與感與現場氛圍。",
            "規劃指南針計畫、導遊團等交流活動。",
          ],
        },
        {
          title: "活動籌備",
          items: [
            "撰寫企劃書、時程安排與執行流程。",
            "準備活動所需物資。",
            "與其他組別協調合作，確保活動順利進行。",
          ],
        },
        {
          title: "現場執行",
          items: [
            "協助活動帶領與現場應變。",
            "觀察會眾參與狀況，適時調整流程。",
            "活動結束後整理回饋，持續優化未來企劃。",
          ],
        },
        {
          title: "我們希望你",
          items: [
            "喜歡發想點子，對企劃充滿熱情。",
            "樂於與人合作，也喜歡與人交流。",
            "願意傾聽不同意見，一起把想法打磨得更完整。",
            "遇到突發狀況時願意一起解決問題。",
            "不需要辦活動經驗，只要願意學習與嘗試。",
          ],
        },
        {
          title: "一起創造年會體驗",
          paragraphs: [
            "如果你希望親手打造一場讓數千位會眾留下深刻印象的活動，歡迎加入活動組，和我們一起創造屬於 SITCON 的年會體驗！",
          ],
        },
      ],
      contacts: [
        { label: "Telegram：@osga24", url: "https://t.me/osga24" },
        { label: "Email：hi@osga.dev", url: "mailto:hi@osga.dev" },
      ],
    },
  },
  {
    name: "場務組",
    icon: "venue",
    description: "讓餐飲、報到、物流與現場支援順利運作。",
    details: "餐飲股負責餐點挑選與運送，機動股支援各組人力，報到股檢驗門票與發放物資，物流股協調會場及倉庫物品。",
    image: venueImage,
    imageAlt: "多位 SITCON 工作人員在走廊搬運折疊桌與椅子",
    photoUrl: "https://www.flickr.com/photos/sitcon/50258288467",
    recruitment: {
      type: "form",
      url: "https://forms.gle/Xfhs7qKRDCgFBUQi6",
    },
    recruitmentDetails: {
      deadline: "2026 年 9 月中旬",
      headcount: "40 人",
      sections: [
        {
          title: "關於場務組",
          paragraphs: [
            "場務組主要負責年會當天的場地相關事務，需要有足夠熱忱，以及面對突發情況時的判斷能力。",
            "場務組招募人數是各組中最多的，對初心者也很友善。不同股的工作內容略有不同，每個股都會有一位股長負責與組長、股員之間對接。",
          ],
        },
        {
          title: "餐飲股",
          items: ["負責餐飲的挑選、訂購和運送。"],
        },
        {
          title: "機動股",
          items: ["在其他股或組別人力不足時協助，通常年會當天才會被頻繁使用。"],
        },
        {
          title: "報到股",
          items: ["負責報到處門票的檢驗和物品發放。"],
        },
        {
          title: "物流股",
          items: [
            "負責物品於會場和倉庫之間的流動。",
            "需要能與廠商聯絡的夥伴。",
            "歡迎能搬東西、領取物資或整理倉儲的夥伴；倉庫位於臺北。",
          ],
        },
        {
          title: "推薦條件",
          items: [
            "年會當天一定要能出席；如果有可能無法出席，建議選擇其他組別。",
            "擁有一顆充滿熱忱的心。",
          ],
        },
        {
          title: "還想多幫忙嗎？",
          paragraphs: ["加入場務組後，也可以再看看其他組別；職務上通常不會衝突。"],
        },
      ],
      contacts: [
        { label: "Telegram：Each", url: "https://t.me/iach526" },
        { label: "Email：info@iach.cc", url: "mailto:info@iach.cc" },
      ],
    },
  },
  {
    name: "設計組",
    icon: "design",
    description: "把年度概念轉化成鮮明而完整的視覺。",
    details: "設計主視覺、周邊、服裝、背板、指標、Badge 與網站，也參與開閉幕動畫製作及年會攤位執行。",
    image: designImage,
    imageAlt: "SITCON Camp 參與者在白板上畫圖",
    photoUrl: "https://www.flickr.com/photos/sitcon/55383671611",
    recruitment: {
      type: "form",
      url: "https://forms.gle/kQ8G9AjiMHd3kZZQ9",
    },
    recruitmentDetails: {
      deadline: "2026/08/25 23:59",
      headcount: "5 人",
      sections: [
        {
          title: "工作內容",
          items: [
            "主視覺與元素設計。",
            "周邊、紀念品設計（可能包含背包）。",
            "年會衣服、背板設計。",
            "開場、閉幕動畫製作。",
            "感謝狀、Badge 設計。",
            "指標設計。",
            "網頁設計。",
            "年會當天顧攤位賣東西。",
          ],
        },
        {
          title: "招募流程",
          items: ["填寫完表單後，設計組會再聯絡並約時間簡短聊聊。"],
        },
      ],
      contacts: [
        { label: "Telegram：@tiffanylai1103", url: "https://t.me/tiffanylai1103" },
      ],
    },
  },
  {
    name: "紀錄組",
    icon: "record",
    description: "保存影像、文字與社群共同完成的軌跡。",
    details: "由靜態與動態夥伴拍攝、整理年會影像，讓每場分享與共同記憶都能被完整保存。",
    image: recordImage,
    imageAlt: "SITCON Camp 攝影工作人員在戶外取景",
    photoUrl: "https://www.flickr.com/photos/sitcon/55388194816",
    recruitment: { type: "overview" },
    recruitmentDetails: {
      deadline: "2026/08/17 23:59",
      headcount: "待公布",
      sections: [
        {
          title: "招募資訊",
          paragraphs: ["紀錄組的詳細工作內容、招募人數與表單尚待公告，請以 HackMD 最新資訊為準。"],
        },
      ],
    },
  },
  {
    name: "製播組",
    icon: "production",
    description: "掌握現場影音訊號與直播技術。",
    details: "負責導播、攝影、監看、音訊與燈控，也處理影音剪輯、素材整理及 NAS 架設等後勤工作。",
    image: productionImage,
    imageAlt: "SITCON 2026 製播工作人員戴耳機操作監看與控制設備",
    photoUrl: "https://www.flickr.com/photos/sitcon/55244847992",
    recruitment: { type: "overview" },
    recruitmentDetails: {
      deadline: "待公布",
      headcount: "30 人",
      sections: [
        {
          title: "工作內容",
          items: [
            "影像、監看：導播、攝影、直播現場支援。",
            "音訊、燈控：深入了解現場整體各式訊號控制及架構。",
            "後勤：處理影音剪輯、素材整理及 NAS 架設。",
          ],
        },
        {
          title: "推薦條件",
          items: ["對技術與影像有熱情。", "可接受大量學習與實作。", "適合技術控與喜歡研究設備的夥伴。"],
        },
        {
          title: "想進一步了解？",
          paragraphs: ["如果對製播有興趣或有其他相關問題，歡迎來找我們聊聊。"],
        },
      ],
      contacts: [
        { label: "製播組長 鯨魚：@jasonwu0504", url: "https://t.me/jasonwu0504" },
        { label: "製播智庫 御痕：@Junter0323", url: "https://t.me/Junter0323" },
        { label: "製播智庫 Camel：@Camel0311", url: "https://t.me/camel0311" },
        { label: "製播智庫 Brian：@Brian31405", url: "https://t.me/brian31405" },
        { label: "製播智庫 小弘：@hankcheng399", url: "https://t.me/hankcheng399" },
      ],
    },
  },
  {
    name: "開發組",
    icon: "development",
    description: "打造官網、系統與年會需要的數位工具。",
    details: "閱讀並維護既有專案，透過 Git 與 GitHub 協作，把籌備需求實作成可靠、好用的網頁應用與服務。",
    image: developmentImage,
    imageAlt: "參與者在筆電上操作終端機程式",
    photoUrl: "https://www.flickr.com/photos/sitcon/55388594180",
    recruitment: {
      type: "form",
      url: "https://forms.gle/mW5aqg37bEfVJLPi6",
    },
    recruitmentDetails: {
      deadline: "2026/08/21",
      headcount: "未公布",
      sections: [
        {
          title: "加入開發組",
          paragraphs: [
            "如果你想在一個資訊年會中當個資訊人，跟我們一起搓點酷酷的系統、酷酷的官網，以及年會中人們會使用到的一切酷酷東西，歡迎加入開發組，和我們一起嗨！",
          ],
        },
        {
          title: "你需要",
          items: [
            "懂得閱讀現有的資料，遇到開發相關問題時能自行上網或詢問 AI 找到解決方案。",
            "熟練使用 Git、GitHub，並懂得開 PR、CI 等基礎概念。",
            "有網頁應用實作經驗，技術棧不限。",
            "確認你的行事曆上有足夠時間投入籌備，夜貓也可以。",
            "或者你會網頁設計，可以無視上面的技術要求；除了需要有足夠時間投入，我們很需要網頁設計人才。",
          ],
        },
      ],
      contacts: [
        { label: "Telegram：@Nathan2045", url: "https://t.me/Nathan2045" },
        { label: "Email：me@nath.tw", url: "mailto:me@nath.tw" },
      ],
    },
  },
  {
    name: "編輯組",
    icon: "editing",
    description: "用文字、影音與社群讓更多人認識 SITCON。",
    details: "負責經營社群平台、撰寫文案、對外公關，尋找讓更多人認識 SITCON 的管道及方法。",
    image: editingImage,
    imageAlt: "SITCON 工作人員在玻璃白板上書寫「編輯組」",
    photoUrl: "https://www.flickr.com/photos/sitcon/55245913873/",
    recruitment: {
      type: "form",
      url: "https://forms.gle/bxmNEGEm7oJb13Z47",
    },
    recruitmentDetails: {
      deadline: "2026/08/23",
      headcount: "1–2 人",
      sections: [
        {
          title: "工作內容",
          items: [
            "經營社群，目前主要為 Facebook、Instagram、Threads；若對其他社群平台的經營有想法，也歡迎來跟組長聊聊。",
            "撰寫文案，包含各平台貼文、月刊等，可以玩梗、玩抽象。",
            "負責 Podcast、Reels 等影音的構想、剪輯與發布。",
            "負責廣告投放、宣傳等工作。",
            "年會當日負責各種訊息通知推播。",
            "編輯組是長期組別，會在年會結束後持續運作，不會解散。",
          ],
        },
        {
          title: "推薦條件",
          items: [
            "對文案、影音及各社群媒體的宣傳與經營有想法。",
            "具備文字、剪輯或公關能力任一即可。",
            "有很多梗、梗圖或宣傳點子想要玩。",
            "想要讓更多人認識 SITCON。",
            "想要一輩子辦 SITCON。",
            "偷偷說，SITCON 沒有全大寫會被組長扣分。",
          ],
        },
      ],
    },
  },
  {
    name: "行銷組",
    icon: "marketing",
    description: "連結 SITCON 與贊助夥伴及媒體。",
    details: "撰寫贊助提案、聯絡廠商與媒體，並在年會當日協助贊助商及媒體接待。",
    image: marketingImage,
    imageAlt: "社群攤位工作人員與參與者交談",
    photoUrl: "https://www.flickr.com/photos/sitcon/55388577255",
    recruitment: { type: "overview" },
    recruitmentDetails: {
      deadline: "待公布",
      headcount: "待公布",
      sections: [
        {
          title: "工作內容",
          items: ["撰寫贊助提案。", "聯絡廠商與媒體。", "年會當日協助贊助商與媒體接待。"],
        },
        {
          title: "推薦條件",
          items: ["對行銷與商務往來有興趣。", "擅長寫 Email、喜歡溝通與談判。"],
        },
      ],
    },
  },
];
