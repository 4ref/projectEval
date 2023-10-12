import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import LoginScreen from "./src/screens/LoginScreen";
import ForgotPasswordScreen from "./src/screens/ForgotPasswordScreen";
import AcceuilScreen from "./src/screens/AcceuilScreen";
import ArtDetailScreen from "./src/screens/ArtDetailScreen";
import ManagementScreen from "./src/screens/ManagementScreen";
import ManageArtsScreen from "./src/screens/ManageArtsScreen";
import ManageProfileScreen from "./src/screens/ManageProfileScreen";
import EditArtScreen from "./src/screens/EditArtScreen";
import AddArtScreen from "./src/screens/AddArtScreen";
import AddProfileScreen from "./src/screens/AddProfileScreen";

import { AuthenticationContextProvider } from "./src/context/authenticationContext";
import { ContentContextProvider } from "./src/context/contentContext";
import { CurrentProfileContextProvider } from "./src/context/currentProfileContext";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Acceuil"
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Acceuil" component={AcceuilScreen} />
      <Tab.Screen name="Management" component={ManagementScreen} />
    </Tab.Navigator>
  );
}

function MyScreens() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Root" component={Root} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="ArtDetail" component={ArtDetailScreen} />
      <Stack.Screen name="ManageArts" component={ManageArtsScreen} />
      <Stack.Screen name="ManageProfiles" component={ManageProfileScreen} />
      <Stack.Screen name="EditArt" component={EditArtScreen} />
      <Stack.Screen name="AddArt" component={AddArtScreen} />
      <Stack.Screen name="AddProfile" component={AddProfileScreen} />
    </Stack.Navigator>
  );
}

function Root() {
  return <MyTabs />;
}

export default function App() {
  return (
    <CurrentProfileContextProvider>
      <AuthenticationContextProvider>
        <ContentContextProvider>
          <NavigationContainer>
            <MyScreens />
          </NavigationContainer>
        </ContentContextProvider>
      </AuthenticationContextProvider>
    </CurrentProfileContextProvider>
  );
}
