import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";
import { Card } from "react-native-elements";
import { useContext, useEffect } from "react";

import db from "../../config";
import { getDocs, collection } from "firebase/firestore";
import { ContentContext } from "../context/contentContext";

const screenDim = Dimensions.get("screen");

function AcceuilScreen({}) {
  const { content, setContent } = useContext(ContentContext);

  useEffect(() => {
    const profilesCollection = collection(db, "profiles");

    getDocs(profilesCollection).then(function (snapShot) {
      const data = [];

      snapShot.docs.map(function (doc) {
        data.push({ ...doc.data(), id: doc.id });
      });

      setContent(data);
    });
  }, []);

  const renderProfiles = ({ item }) => (
    <>
      <Text style={styles.profileTitle}>From {item.email}</Text>
      <ArtsList data={item} />
    </>
  );

  const ArtsList = ({ data }) => (
    <FlatList
      data={data.arts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Card style={styles.card} title={item.id}>
          <Image
            source={{
              uri: item.image,
              width: screenDim.width / 1.2,
              height: 200,
            }}
          />
          <Text style={{ marginBottom: 10 }}>{item.name}</Text>
          <Text style={{ marginBottom: 10 }}>{item.description}</Text>
          <Text style={{ marginBottom: 10 }}>{item.author}</Text>
        </Card>
      )}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={content}
        keyExtractor={(item) => item.id}
        renderItem={renderProfiles}
      />
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
  },
  profileTitle: {
    fontSize: 25,
    fontWeight: "bold",
  },
  card: {
    width: screenDim.width / 1.2,
  },
});

export default AcceuilScreen;
