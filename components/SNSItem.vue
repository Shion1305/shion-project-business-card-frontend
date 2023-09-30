<script lang="ts" setup>
const props = defineProps<{
  snsType:
    | "x"
    | "github"
    | "gmail"
    | "line"
    | "linkedin"
    | "wantedly"
    | "discord";
}>();

const snsData = computed(
  (): {
    backgroundColor: string;
    icon: string;
    iconBackground?: string;
    snsID: string;
    snsUrl: string;
  } => {
    switch (props.snsType) {
      case "github":
        return {
          icon: "/img/sns/github.webp",
          backgroundColor: "#171515",
          snsID: "shion1305",
          snsUrl: "https://github.com/shion1305",
        };
      case "x":
        return {
          icon: "/img/sns/x.webp",
          backgroundColor: "#000",
          snsID: "@shion2021_",
          snsUrl: "https://twitter.com/shion2021_",
        };
      case "wantedly":
        return {
          icon: "/img/sns/wantedly.webp",
          backgroundColor: "#4cbbd9",
          snsID: "shion1305",
          snsUrl: "https://www.wantedly.com/id/shion1305",
        };
      case "linkedin":
        return {
          icon: "/img/sns/linked-in.webp",
          backgroundColor: "#0077b5",
          snsID: "shion1305",
          snsUrl: "https://linkedin.com/in/shion1305",
        };
      case "gmail":
        return {
          icon: "/img/sns/gmail.png",
          backgroundColor: "#df4e3c",
          iconBackground: "#fff",
          snsID: "shion1305@gmail.com",
          snsUrl: "mailto:shion1305@gmail.com",
        };
      case "line":
        return {
          icon: "/img/sns/line.webp",
          backgroundColor: "#06C755",
          snsID: "id: shion1305",
          snsUrl: "https://line.me/ti/p/D-rzZO0PKQ",
        };
      case "discord":
        return {
          icon: "/img/sns/discord.png",
          backgroundColor: "#7289da",
          snsID: "shion1305",
          snsUrl: "https://discordapp.com/users/706873888461684866",
        };
    }
  },
);

const icon = computed(() => {
  switch (props.snsType) {
    case "discord":
      return "/img/sns/discord.png";
    case "github":
      return "/img/sns/github.webp";
    case "x":
      return "/img/sns/x.webp";
    case "wantedly":
      return "/img/sns/wantedly.webp";
    case "linkedin":
      return "/img/sns/linked-in.webp";
    case "gmail":
      return "/img/sns/gmail.png";
    case "line":
      return "/img/sns/line.webp";
  }
});

const parentStyle = computed(() => {
  return {
    background: snsData.value.backgroundColor,
  };
});

const iconStyle = computed(() => {
  if (snsData.value.iconBackground) {
    return {
      background: snsData.value.iconBackground,
      "border-radius": "10%",
    };
  }
  return {};
});
</script>

<template>
  <div :style="parentStyle" class="sns-item">
    <img :src="snsData.icon" :style="iconStyle" />
    <a :href="snsData.snsUrl" rel="noopener noreferrer" target="_blank">
      {{ snsData.snsID }}
    </a>
  </div>
</template>

<style scoped>
.sns-item {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  padding: 0.5rem;
  margin: 0.5rem;
  color: white;
  gap: 0.3em;

  > img {
    width: 40px;
    aspect-ratio: 1;
    object-fit: contain;
  }

  > a {
    margin-left: 0.3rem;
    color: white;
    text-decoration: none;
    font-size: 1.15rem;
  }
}
</style>
