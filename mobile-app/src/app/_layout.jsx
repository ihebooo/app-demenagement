import "../../tamagui.css";
import { config } from "../../tamagui.config";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { SplashScreen, Stack } from "expo-router";
import { useColorScheme } from "react-native";
import { TamaguiProvider } from "tamagui";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import {
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { RecoilRoot } from "recoil";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "/index",
};

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      refetchOnMount: true,
    },
  },
});

export default function RootLayout() {
  const [interLoaded, interError] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  useEffect(() => {
    if (interLoaded || interError) {
      SplashScreen.hideAsync();
    }
  }, [interLoaded, interError]);

  if (!interLoaded && !interError) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <>
      <StatusBar hidden={false} style="light" />
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <TamaguiProvider config={config} defaultTheme={colorScheme}>
            <ThemeProvider
              value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
            >
              <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen
                  name="screens/meubles"
                  options={{
                    headerShown: true,
                    title: "Step 1: Choose Meubles",
                  }}
                />
                <Stack.Screen
                  name="screens/address"
                  options={{
                    headerShown: true,
                    title: "Step 2: Enter Address",
                  }}
                />
                <Stack.Screen
                  name="screens/contact"
                  options={{
                    headerShown: true,
                    title: "Step 3: Enter Contact Details",
                  }}
                />
                <Stack.Screen
                  name="success"
                  options={{
                    headerShown: false,
                    title: "Success",
                  }}
                />
              </Stack>
            </ThemeProvider>
          </TamaguiProvider>
        </RecoilRoot>
      </QueryClientProvider>
    </>
  );
}
