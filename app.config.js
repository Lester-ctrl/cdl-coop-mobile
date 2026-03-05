export default {
  expo: {
    name: "coop_mobile",
    slug: "coop_mobile",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "com.cdl.coopmobile",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,

    ios: {
      supportsTablet: true,
    },

    android: {
      package: "com.cdl.coopmobile",
      adaptiveIcon: {
        backgroundColor: "#E6F4FE",
        foregroundImage: "./assets/images/android-icon-foreground.png",
        backgroundImage: "./assets/images/android-icon-background.png",
        monochromeImage: "./assets/images/android-icon-monochrome.png",
      },
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false,
    },

    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
          dark: { backgroundColor: "#000000" },
        },
      ],
      "expo-font"
    ],

    experiments: {
      typedRoutes: true,
      reactCompiler: true,
    },

    extra: {
      expoClientId:
        "806689925136-4rs2vd78ec6j2njroqbbglil6nkdf0tv.apps.googleusercontent.com",
      androidClientId:
        "806689925136-thv3erbc584ds4r6fm0q8e5tk0u1lne2.apps.googleusercontent.com",
      webClientId:
        "806689925136-4rs2vd78ec6j2njroqbbglil6nkdf0tv.apps.googleusercontent.com",

      eas: {
        projectId: "2d5ca5eb-477e-4e8c-b04e-edbad4c6c37d",
      },
    },
  },
};
