export default {
  control: {
    backgroundColor: "#fff",
    fontSize: 14,
    fontWeight: "normal",
  },

  "&multiLine": {
    control: {
      fontFamily: ["satoshi", "sans-serif"],
      minHeight: 63,
    },
    highlighter: {
      padding: 9,
      border: "1px solid transparent",
    },
    input: {
      padding: 9,
      border: "1px solid silver",
    },
  },

  "&singleLine": {
    display: "inline-block",
    width: 180,

    highlighter: {
      padding: 1,
      border: "2px inset transparent",
    },
    input: {
      padding: 1,
      border: "2px inset",
    },
  },

  suggestions: {
    list: {
      backgroundColor: "white",
      border: "none",
      fontSize: 14,
    },
    item: {
      padding: "1px 15px",
      borderRadius: "4px",
      margin: "3px 0",
      borderBottom: "none",
      "&focused": {
        backgroundColor: "#F0F2F5",
      },
    },
  },
};
