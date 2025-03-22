import { useLocalSearchParams } from "expo-router";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Audio } from "expo-av";
import { useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function MultaDetails() {
  const [sound, setSound] = useState(null);

  const { item } = useLocalSearchParams();

  const multa = JSON.parse(item);

  async function playAudio() {
    if (multa.audioUri) {
      const { sound } = await Audio.Sound.createAsync({ uri: multa.audioUri });
      setSound(sound);
      await sound.playAsync();
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Detalles de la Multa</Text>

      <View style={styles.detailContainer}>
        <Text style={styles.label}>Marbete:</Text>
        <Text style={styles.value}>{multa.marbete}</Text>

        <Text style={styles.label}>Vehículo:</Text>
        <Text style={styles.value}>Marca: {multa.vehiculo.marca}</Text>
        <Text style={styles.value}>Modelo: {multa.vehiculo.modelo}</Text>
        <Text style={styles.value}>Color: {multa.vehiculo.color}</Text>
        <Text style={styles.value}>Año: {multa.vehiculo.anio}</Text>
        <Text style={styles.value}>Placa: {multa.vehiculo.placa}</Text>

        <Text style={styles.label}>Infracción:</Text>
        <Text style={[styles.value, styles.infraccionText]}>
          {multa.infraccion}
        </Text>

        <Text style={styles.label}>Descripción:</Text>
        <Text style={styles.value}>{multa.description}</Text>

        <Text style={styles.label}>Foto:</Text>
        <Image source={{ uri: multa.photo }} style={styles.image} />

        <Text style={styles.label}>Audio:</Text>
        <Pressable style={styles.audioButton} onPress={playAudio}>
          <MaterialIcons name="play-circle-outline" size={24} color="white" />
          <Text style={styles.audioText}>Reproducir Audio</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#1e1e1e",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 20,
  },
  detailContainer: {
    backgroundColor: "#333",
    padding: 15,
    borderRadius: 10,
  },
  label: {
    color: "#bbb",
    fontSize: 16,
    marginTop: 10,
  },
  value: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  infraccionText: {
    color: "#ff4d4d",
  },
  image: {
    width: "100%",
    height: 200,
    marginTop: 10,
    borderRadius: 8,
  },
  audioButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007bff",
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
  },
  audioText: {
    color: "white",
    marginLeft: 5,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#444",
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
    justifyContent: "center",
  },
  backText: {
    color: "white",
    marginLeft: 5,
  },
});
