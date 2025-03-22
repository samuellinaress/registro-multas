import { SafeAreaView, Text, Image, StyleSheet, View } from "react-native";

export default function About() {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../assets/perfil-photo.png")}
        style={styles.image}
      />
      <Text style={styles.name}>Samuel Linares</Text>
      <Text style={styles.id}>2023-0215</Text>
      <View style={styles.quoteContainer}>
        <Text style={styles.quote}>
          "Conducir con responsabilidad es más que una elección, es un
          compromiso con la vida y el bienestar de toda la comunidad. La
          seguridad vial empieza contigo."
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5F5F5",
    padding: 20,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "#2E7D32",
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1B5E20",
  },
  id: {
    fontSize: 18,
    color: "#33691E",
    marginBottom: 10,
  },
  quoteContainer: {
    backgroundColor: "#FFD600",
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
    width: "90%",
  },
  quote: {
    fontSize: 16,
    color: "#263238",
    fontStyle: "italic",
    textAlign: "center",
  },
});
