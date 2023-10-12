import { useContext } from "react";
import { Appbar } from "react-native-paper";
import { Text, View, Dimensions, StyleSheet, FlatList } from "react-native";
import { Card, Button } from "react-native-elements";

import { ContentContext } from "../context/contentContext";
import { CurrentProfileContext } from "../context/currentProfileContext";

const screenDim = Dimensions.get("screen");

function RowButtons() {
  return (
    <View style={styles.rowButton}>
      <Button buttonStyle={styles.editButton} title="Edit" onPress={() => {}} />
      <Button
        buttonStyle={styles.deleteButton}
        title="Delete"
        onPress={() => {}}
      />
    </View>
  );
}

function ManageProfileScreen({ navigation }) {
  const { content } = useContext(ContentContext);
  const { currentProfile } = useContext(CurrentProfileContext);

  const handleGoToManagement = () => {
    navigation.navigate("Management");
  };

  const handleGoToAddProfile = () => {
    navigation.navigate("AddProfile");
  };


  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.appbar}>
        <Appbar.BackAction onPress={handleGoToManagement} />
        <Appbar.Content title={currentProfile.email} />
      </Appbar.Header>

      <Button
        buttonStyle={styles.addButton}
        title="Add Profile"
        onPress={handleGoToAddProfile}
      />

      {currentProfile.role === "admin" ? (
        <FlatList
          data={content}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Card style={styles.card} title={item.id}>
              <Text style={{ marginBottom: 10 }}>{item.email}</Text>
              <Text style={{ marginBottom: 10 }}>{item.role}</Text>
              <RowButtons />
            </Card>
          )}
        />
      ) : (
        <Card style={styles.card} title={currentProfile.id}>
          <Text style={{ marginBottom: 10 }}>{currentProfile.email}</Text>
          <Text style={{ marginBottom: 10 }}>{currentProfile.role}</Text>
          <RowButtons />
        </Card>
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

export default ManageProfileScreen;
