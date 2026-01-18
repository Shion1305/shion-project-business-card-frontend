export type SNSType =
  | "x"
  | "github"
  | "gmail"
  | "line"
  | "linkedin"
  | "wantedly"
  | "discord";

export interface SNSConfig {
  icon: string;
  backgroundColor: string;
  iconBackground?: string;
  snsID: string;
  snsUrl: string;
}

export const SNS_DATA: Record<SNSType, SNSConfig> = {
  github: {
    icon: "/img/sns/github.webp",
    backgroundColor: "#171515",
    snsID: "shion1305",
    snsUrl: "https://github.com/Shion1305",
  },
  x: {
    icon: "/img/sns/x.webp",
    backgroundColor: "#000",
    snsID: "@shion1305",
    snsUrl: "https://twitter.com/shion1305",
  },
  wantedly: {
    icon: "/img/sns/wantedly.webp",
    backgroundColor: "#4cbbd9",
    snsID: "shion1305",
    snsUrl: "https://www.wantedly.com/id/shion1305",
  },
  linkedin: {
    icon: "/img/sns/linked-in.webp",
    backgroundColor: "#0077b5",
    snsID: "shion1305",
    snsUrl: "https://linkedin.com/in/shion1305",
  },
  gmail: {
    icon: "/img/sns/gmail.png",
    backgroundColor: "#df4e3c",
    iconBackground: "#fff",
    snsID: "shion1305@gmail.com",
    snsUrl: "mailto:shion1305@gmail.com",
  },
  line: {
    icon: "/img/sns/line.webp",
    backgroundColor: "#06C755",
    snsID: "id: shion1305",
    snsUrl: "https://line.me/ti/p/D-rzZO0PKQ",
  },
  discord: {
    icon: "/img/sns/discord.png",
    backgroundColor: "#7289da",
    snsID: "@shion1305",
    snsUrl: "",
  },
};

export const SNS_ORDER: SNSType[] = [
  "github",
  "x",
  "linkedin",
  "discord",
  "wantedly",
  "line",
  "gmail",
];
