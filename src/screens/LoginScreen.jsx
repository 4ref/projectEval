import { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";
import { AuthenticationContext } from "../context/authenticationContext";
import { ContentContext } from "../context/contentContext";
import { CurrentProfileContext } from "../context/currentProfileContext";

const screenDim = Dimensions.get("screen");

const LoginScreen = ({ navigation }) => {
  const { content } = useContext(ContentContext);
  const { setIsAuthenticated } = useContext(AuthenticationContext);
  const { setCurrentProfile } = useContext(CurrentProfileContext);

  const [email, setEmail] = useState(content[0].email);
  const [password, setPassword] = useState(content[0].email);

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isPasswordValid = (password) => {
    return !(password.length == 0 || password == "");
  };

  const handleGoToManagement = () => {
    if (!isEmailValid(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }

    if (!isPasswordValid(password)) {
      Alert.alert("Invalid Password", "Please enter a valid password.");
      return;
    }

    const selectedProfile = content.find((profile) => profile.email === email);

    setCurrentProfile(selectedProfile);
    setIsAuthenticated(true);
  };

  const handleGoToForgotPassword = () => {
    navigation.navigate("ForgotPassword");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      <TouchableOpacity style={styles.button} onPress={handleGoToManagement}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleGoToForgotPassword}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>
    </View>
  );
};

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
    fontSize: 36,
    marginBottom: 16,
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
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  forgotPasswordText: {
    marginTop: 10,
    color: "blue",
  },
});

export default LoginScreen;
