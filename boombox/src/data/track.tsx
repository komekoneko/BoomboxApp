export type Track = {
    id: number;
    title: string;
    src: string;
    content: {
      projectName: string;
      description: string;
      url: string;
      linkText: string;
    };
  };
  export const track: Track[] = [
    {
      id: 0,
      title: "About Me",
      src: "/2_23_AM.mp3",
      content: {
        projectName: "Kai/大学3年",
        description:
          "フロントエンドエンジニア志望、最近はUIUXにも興味を持っています。よく使う言語→ JavaScript, TypeScript 資格→ 基本情報技術者",
        url: "https://github.com/komekoneko",
        linkText: "GitHubを見る",
      },
    },
    {
      id: 1,
      title: "BLACK BOX - Chill 2",
      src: "/blackbox-black-box-chill-2short-form-bgm-486308.mp3",
      content: {
        projectName: "温泉TodoApp",
        description: "TodoAppの温泉・銭湯に特化したバージョンです",
        url: "https://onsen-sento-app.vercel.app/",
        linkText: "デモを見る",
      },
    },
    {
      id: 2,
      title: "364 Imaginary Art Museum",
      src: "/tooone-364-imaginary-art-museum-537413.mp3",
      content: {
        projectName: "Githubユーザー検索App",
        description: "Githubユーザーの詳しい情報を知ることができます",
        url: "https://github-user-search-one-red.vercel.app/",
        linkText: "デモを見る",
      },
    },
    {
      id: 3,
      title: "Lofi — Night Haze",
      src: "/ornave-lofi-night-haze-553402.mp3",
      content: {
        projectName: "BudgetApp",
        description:
          "TodoAppに自動計算機能を加え、会計金額が事前にわかるようにしました",
        url: "https://budget-book-vert-six.vercel.app/",
        linkText: "デモを見る",
      },
    },
  ];