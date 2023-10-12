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

function AddArtScreen({ navigation }) {
  const { currentProfile } = useContext(CurrentProfileContext);

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");

  const handleGoToManageArts = () => {
    navigation.navigate("Management");
  };

  const handleGoToAcceuil = () => {
    navigation.navigate("Acceuil");
  };

  async function submitAdd() {
    const newArt = {
      id: id,
      name: name,
      description: description,
      author: author,
      image: "",
      creationDate: new Date(),
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
          <Appbar.BackAction onPress={handleGoToManageArts} />
          <Appbar.Content title="Add Art" />
        </Appbar.Header>
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={submitAdd}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>

      <ScrollView>
        <TextInput
          placeholder={"art id"}
          style={styles.input}
          onChangeText={(currentId) => {
            setId(currentId);
          }}
          value={id}
        />

        <TextInput
          placeholder={"art name"}
          style={styles.input}
          onChangeText={(currentName) => {
            setName(currentName);
          }}
          value={name}
        />

        <TextInput
          placeholder={"art description"}
          style={styles.input}
          onChangeText={(currentDesc) => {
            setDescription(currentDesc);
          }}
          value={description}
        />

        <TextInput
          placeholder={"art author"}
          style={styles.input}
          onChangeText={(currentAuthor) => {
            setAuthor(currentAuthor);
          }}
          value={author}
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

export default AddArtScreen;
