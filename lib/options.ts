const toolbarOptions = {
  uploader: {
    type: "upload",
    tooltip: "Upload a screenshot",
  },
  frames: [
    {
      type: "iphone-frame",
      tooltip: "Add an iPhone frame to the screenshot",
    },
    {
      type: "no-frame",
      tooltip: "Display your screenshot without a device frame",
    },
  ],
  colors: [
    {
      name: "white",
      tooltip: "#FFFFFF",
      bg: "#fff",
    },
    {
      name: "gray",
      tooltip: "#F7F7F7",
      bg: "#F7F7F7",
    },
    {
      name: "black",
      tooltip: "#000000",
      bg: "#000",
    },
    {
      name: "red",
      tooltip: "#FF7272",
      bg: "#FF7272",
    },
    {
      name: "green",
      tooltip: "#71FF87",
      bg: "#71FF87",
    },
    {
      name: "blue",
      tooltip: "#7098FF",
      bg: "#7098FF",
    },
    {
      name: "multi",
      tooltip: "Choose a custom color",
      bg: "",
    },
  ],
};

export default toolbarOptions;
