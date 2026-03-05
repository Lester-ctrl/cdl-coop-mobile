import { Platform } from "react-native";

// Sky blue gradient palette
const skyBluePrimary = "#38bdf8"; // Main sky blue
const skyBlueDark = "#0c4a6e"; // Deep blue for dark mode
const skyBlueAccent = "#7dd3fc"; // Soft accent
const skyBlueSecondary = "#bae6fd"; // Light secondary

// Gradient colors
const skyGradientLightStart = "#e0f7ff";
const skyGradientLightEnd = "#38bdf8";

const skyGradientDarkStart = "#0c4a6e";
const skyGradientDarkEnd = "#082f49";

// Background + text
const skyBackgroundLight = "#f0f9ff";
const skyBackgroundDark = "#0a1929";

const skyTextLight = "#0c4a6e";
const skyTextDark = "#e0f7ff";

const skyIconLight = "#0284c7";
const skyIconDark = "#7dd3fc";

export const Colors = {
  light: {
    text: skyTextLight,
    background: skyBackgroundLight,
    tint: skyBluePrimary,
    icon: skyIconLight,
    tabIconDefault: skyBlueSecondary,
    tabIconSelected: skyBluePrimary,
    accent: skyBlueAccent,
    secondary: skyBlueSecondary,

    // Gradient support
    gradientStart: skyGradientLightStart,
    gradientEnd: skyGradientLightEnd,
  },
  dark: {
    text: skyTextDark,
    background: skyBackgroundDark,
    tint: skyBlueDark,
    icon: skyIconDark,
    tabIconDefault: skyIconDark,
    tabIconSelected: skyBlueDark,
    accent: skyBlueAccent,
    secondary: skyBlueSecondary,

    // Gradient support
    gradientStart: skyGradientDarkStart,
    gradientEnd: skyGradientDarkEnd,
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: "system-ui",
    serif: "ui-serif",
    rounded: "ui-rounded",
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
