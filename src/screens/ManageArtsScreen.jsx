import { useContext } from "react";
import { Appbar } from "react-native-paper";
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";
import { Card, Button } from "react-native-elements";

import { CurrentProfileContext } from "../context/currentProfileContext";
import { ContentContext } from "../context/contentContext";

const screenDim = Dimensions.get("screen");

function RowButtons({ navigation, currentArt }) {
  const handleGoToEditArt = () => {
    navigation.navigate("EditArt", {
      artId: currentArt.id,
      artName: currentArt.name,
      artDescription: currentArt.description,
      artAuthor: currentArt.author,
      artImage: currentArt.image,
      artCreationDate: currentArt.creationDate,
    });
  };

  return (
    <View style={styles.rowButton}>
      <Button
        buttonStyle={styles.editButton}
        title="Edit"
        onPress={handleGoToEditArt}
      />
      <Button
        buttonStyle={styles.deleteButton}
        title="Delete"
        onPress={() => {}}
      />
    </View>
  );
}

function ManageArtsScreen({ navigation }) {
  const { content } = useContext(ContentContext);
  const { currentProfile } = useContext(CurrentProfileContext);

  const handleGoToManagement = () => {
    navigation.navigate("Management");
  };

  const handleGoAddArt = () => {
    navigation.navigate("AddArt");
  };

  //const combinedArtsAsArray = [].concat(...content.map((obj) => obj.arts));
  const s = content.map((obj) => obj.arts);
  console.log(JSON.stringify(content));

  const combinedArts = content.reduce((accumulator, currentValue) => {
    return [...accumulator, ...currentValue.arts];
  }, []);

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.appbar}>
        <Appbar.BackAction onPress={handleGoToManagement} />
        <Appbar.Content title={currentProfile.email} />
      </Appbar.Header>

      <Button
        buttonStyle={styles.addButton}
        title="Add art"
        onPress={handleGoAddArt}
      />
      {currentProfile.role === "admin" ? (
        <FlatList
          data={combinedArts}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <Card style={styles.card} title={item.id}>
              <Image
                source={{
                  uri: item.image,
                  width: screenDim.width / 1.2,
                  height: 120,
                }}
              />
              <Text style={{ marginBottom: 10 }}>{item.name}</Text>
              <Text style={{ marginBottom: 10 }}>{item.description}</Text>
              <RowButtons navigation={navigation} currentArt={item} />
            </Card>
          )}
        />
      ) : (
        <FlatList
          data={currentProfile.arts}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <Card style={styles.card} title={item.id}>
              <Image
                source={{
                  uri: item.image,
                  width: screenDim.width / 1.2,
                  height: 120,
                }}
              />
              <Text style={{ marginBottom: 10 }}>{item.name}</Text>
              <RowButtons navigation={navigation} currentArt={item} />
            </Card>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: screenDim.width,
    height: screenDim.height,
    justifyContent: "start",
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
    width: screenDim.width,
    padding: 0,
    backgroundColor: "white",
  },
  rowButton: {
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default ManageArtsScreen;
