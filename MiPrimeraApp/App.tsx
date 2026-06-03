import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./src/navigation/StackNavigator";
import { navigationRef } from "./src/navigation/NavigationService";
import { AuthProvider } from "./src/contexts/AuthContext";
import { LanguageProvider } from "./src/contexts/LanguageContext";
import { SkincareProvider } from "./src/contexts/SkincareContext";
import { ThemeProvider } from "./src/contexts/ThemeContext";

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <SkincareProvider>
            <NavigationContainer ref={navigationRef}>
              <StackNavigator />
            </NavigationContainer>
          </SkincareProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}