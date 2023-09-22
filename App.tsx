// React Default
import { StatusBar } from "expo-status-bar";

// React Stack Navigation

import { NavigationContainer } from "@react-navigation/native";
import { AuthContextProvider } from "./src/context/authContext";
import Routes from "./src/routes/Routes";

export default function App() {
  return (
    <NavigationContainer>
      <AuthContextProvider>
        <Routes />
        <StatusBar backgroundColor="#38a69D" style="light" />
      </AuthContextProvider>
    </NavigationContainer>
  );
}
