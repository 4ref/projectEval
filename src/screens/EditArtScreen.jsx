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

function EditArtScreen({ route, navigation }) {
  const { currentProfile } = useContext(CurrentProfileContext);

  const {
    artId,
    artName,
    artDescription,
    artAuthor,
    artImage,
    artCreationDate,
  } = route.params;
  const [id, setId] = useState(artId);
  const [name, setName] = useState(artName);
  const [description, setDescription] = useState(artDescription);
  const [author, setAuthor] = useState(artAuthor);

  const handleGoToManageArts = () => {
    navigation.navigate("ManageArts");
  };

  async function submitEdit() {
    const updatedArt = {
      id: id,
      name: name,
      description: description,
      author: author,
      image: artImage,
      creationDate: artCreationDate,
    };

    updateDoc(doc(db, "profiles", currentProfile.id), updatedArt)
      .then(() => {
        handleGoToManageArts();
      })
      .catch((error) => {
        Alert.alert("Error updating document: ", error);
      });
  }

  return (
    <View style={styles.container}>
      <View style={styles.appBar}>
        <Appbar.Header style={styles.appbar}>
          <Appbar.BackAction onPress={handleGoToManageArts} />
          <Appbar.Content title="Edit Art" />
        </Appbar.Header>
      </View>

      <Image
        source={{
          uri: artImage,
          width: screenDim.width / 1.2,
          height: 120,
        }}
      />

      <TouchableOpacity style={styles.submitButton} onPress={submitEdit}>
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

export default EditArtScreen;
