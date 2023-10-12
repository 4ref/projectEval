import { Text, View, Dimensions, StyleSheet } from "react-native";

const screenDim = Dimensions.get("screen");

function ArtDetailScreen() {
  return (
    <View style={styles.container}>
      <Text>ArtDetail Screen</Text>
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
});

export default ArtDetailScreen;
