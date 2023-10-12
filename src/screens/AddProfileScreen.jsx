import { useState, useContext } from "react";
import { Appbar } from "react-native-paper";
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import db from "../../config";
import { updateDoc, doc } from "firebase/firestore";

import { CurrentProfileContext } from "../context/currentProfileContext";

const screenDim = Dimensions.get("screen");

function AddProfileScreen({ navigation }) {
  const { currentProfile } = useContext(CurrentProfileContext);

  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleGoToManageProfiles = () => {
    navigation.navigate("Management");
  };

  const handleGoToAcceuil = () => {
    navigation.navigate("Acceuil");
  };

  async function submitAdd() {
    const newArt = {
      id: id,
      email: email,
      role: role,
      password: password,
      arts: [],
    };

    updateDoc(doc(db, "profiles", currentProfile.id), newArt)
      .then(() => {
        handleGoToAcceuil();
      })
      .catch((error) => {
        Alert.alert("Error adding document: ", error);
      });
  }

  return (
    <View style={styles.container}>
      <View style={styles.appBar}>
        <Appbar.Header style={styles.appbar}>
          <Appbar.BackAction onPress={handleGoToManageProfiles} />
          <Appbar.Content title="Add Profile" />
        </Appbar.Header>
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={submitAdd}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>

      <ScrollView>
        <TextInput
          placeholder={"profile id"}
          style={styles.input}
          onChangeText={(currentId) => {
            setId(currentId);
          }}
          value={id}
        />

        <TextInput
          placeholder={"profile email"}
          style={styles.input}
          onChangeText={(currentEmail) => {
            setEmail(currentEmail);
          }}
          value={email}
        />

        <TextInput
          placeholder={"profile password"}
          style={styles.input}
          onChangeText={(currentPassword) => {
            setPassword(currentPassword);
          }}
          value={password}
        />

        <TextInput
          placeholder={"profile role"}
          style={styles.input}
          onChangeText={(currentRole) => {
            setRole(currentRole);
          }}
          value={role}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    width: screenDim.width,
    height: screenDim.height,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 8,
    paddingRight: 8,
    marginTop: 0,
    marginBottom: 16,
  },
  profileTitle: {
    fontSize: 25,
    fontWeight: "bold",
  },
  card: {
    width: screenDim.width / 1.2,
  },
  editButton: {
    backgroundColor: "green",
    borderRadius: 0,
    margin: 4,
    width: 140,
  },
  deleteButton: {
    backgroundColor: "red",
    borderRadius: 0,
    margin: 4,
    width: 140,
  },
  addButton: {
    backgroundColor: "purple",
    borderRadius: 0,
    margin: 4,
    width: screenDim.width,
  },
  appbar: {
    position: "relative",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    width: screenDim.width,
    padding: 0,
    backgroundColor: "white",
  },
  submitButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  submitButton: {
    backgroundColor: "green",
    padding: 10,
    width: screenDim.width - 64,
    borderRadius: 5,
    alignItems: "center",
    alignSelf: "center",
    marginTop: 20,
  },
  input: {
    borderColor: "black",
    borderWidth: 1,
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
    width: screenDim.width - 32,
  },
});

export default AddProfileScreen;
