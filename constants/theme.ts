/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from "react-native";

// Green theme palette
const greenLight = "#43a047"; // Primary green
const greenDark = "#1b5e20"; // Darker green for dark mode
const greenAccent = "#69f0ae"; // Accent green
const greenSecondary = "#a5d6a7"; // Secondary green
const greenBackgroundLight = "#e8f5e9"; // Light background
const greenBackgroundDark = "#10271a"; // Dark background
const greenTextLight = "#1b5e20"; // Text for light
const greenTextDark = "#e8f5e9"; // Text for dark
const greenIconLight = "#388e3c";
const greenIconDark = "#81c784";

export const Colors = {
  light: {
    text: greenTextLight,
    background: greenBackgroundLight,
    tint: greenLight,
    icon: greenIconLight,
    tabIconDefault: greenSecondary,
    tabIconSelected: greenLight,
    accent: greenAccent,
    secondary: greenSecondary,
  },
  dark: {
    text: greenTextDark,
    background: greenBackgroundDark,
    tint: greenDark,
    icon: greenIconDark,
    tabIconDefault: greenIconDark,
    tabIconSelected: greenDark,
    accent: greenAccent,
    secondary: greenSecondary,
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
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
