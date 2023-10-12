import { useContext } from "react";
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { AuthenticationContext } from "../context/authenticationContext";

import LoginScreen from "./LoginScreen";

const screenDim = Dimensions.get("screen");

function ManagementScreen({ navigation }) {
  const { isAuthenticated } = useContext(AuthenticationContext);

  const handleGoToManageArts = () => {
    navigation.navigate("ManageArts");
  };

  const handleGoToManageProfiles = () => {
    navigation.navigate("ManageProfiles");
  };

  return (
    <View style={styles.container}>
      {isAuthenticated ? (
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleGoToManageArts}
          >
            <Text style={styles.buttonText}>Manage Arts</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={handleGoToManageProfiles}
          >
            <Text style={styles.buttonText}>Manage Profiles</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <LoginScreen navigation={navigation} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: screenDim.width,
    height: screenDim.height,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    marginTop: 16,
    marginBottom: 16,
  },
  buttonText: {
    borderRadius: 10,
    color: "white",
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 45,
    fontWeight: "bold",
    margin: 32,
    width: screenDim.width - 30,
    height: screenDim.height / 4,
  },
});

export default ManagementScreen;
