import { useState, useContext } from "react";
import {
  Text,
  View,
  TextInput,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { doc, updateDoc } from "firebase/firestore";
import db from "../../config";

import { ContentContext } from "../context/contentContext";

const screenDim = Dimensions.get("screen");

function ForgotPasswordScreen({ navigation }) {
  const { content } = useContext(ContentContext);

  const [password, setPassword] = useState(content[0].password);
  const [newPassword, setNewPassword] = useState("");

  const isOldPasswordValid = (password) => {
    return !(password.length == 0 || password == "");
  };

  const isNewPasswordValid = (newPassword) => {
    return !(newPassword.length == 0 || newPassword == "");
  };

  const isNewPasswordSameAsOld = (oldPassword, newPassword) => {
    return oldPassword === newPassword;
  };

  const handleChangePassword = async () => {
    // validation
    if (!isOldPasswordValid(password)) {
      Alert.alert("Invalid Old Password", "Please enter a valid password.");
      return;
    }

    if (!isNewPasswordValid(newPassword)) {
      Alert.alert("Invalid New Password", "Please enter a valid password.");
      return;
    }

    if (isNewPasswordSameAsOld(password, newPassword)) {
      Alert.alert(
        "New Password cannot be the same as the Old Password",
        "Please choose another password."
      );
      return;
    }

    const newProfileContent = {
      email: content[0].email,
      password: newPassword,
      id: content[0].id,
      role: content[0].role,
      arts: content[0].arts,
    };

    const profileRef = doc(db, "profiles", content[0].id);
    await updateDoc(profileRef, newProfileContent);

    // navigate back to login screen, and use the new password.
    handleGotoLogin();
  };

  const handleGotoLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Change your Password</Text>

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="New Password"
        secureTextEntry
        value={newPassword}
        onChangeText={(text) => setNewPassword(text)}
      />

      <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
        <Text style={styles.buttonText}>Change password</Text>
      </TouchableOpacity>
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
    padding: 20,
  },
  title: {
    position: "absolute",
    top: "10%",
    fontSize: 30,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default ForgotPasswordScreen;
