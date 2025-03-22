import { useContext, useState } from "react";
import {
  Pressable,
  Text,
  TextInput,
  View,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import AntDesign from "@expo/vector-icons/AntDesign";
import * as ImagePicker from "expo-image-picker";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Audio } from "expo-av";
import { MultaContext } from "./multas-context";

export default function NewMulta() {
  const { multas, setMultas } = useContext(MultaContext);
  const [marbete, setMarbete] = useState("");
  const [vehiculo, setVehiculo] = useState({
    marca: "",
    modelo: "",
    color: "",
    anio: "",
    placa: "",
  });
  const [infraccion, setInfraccion] = useState("");
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState("");
  const [recording, setRecording] = useState(null);
  const [audioUri, setAudioUri] = useState(null);
  const [sound, setSound] = useState(null);

  async function getVehiculoInfo() {
    if (!marbete.trim()) {
      alert("Por favor ingresar código del marbete");
      return;
    }

    try {
      const response = await fetch(
        `https://api.adamix.net/itla.php?m=${marbete}`
      );

      const vehiculoInfo = await response.json();

      if (vehiculoInfo.ok === 0) {
        alert("No se encontraron datos, verifique el número de marbete");
      } else {
        setVehiculo({
          marca: vehiculoInfo.marca,
          modelo: vehiculoInfo.modelo,
          color: vehiculoInfo.color,
          anio: vehiculoInfo.anio,
          placa: vehiculoInfo.placa,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function pickImage() {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== "granted") {
      alert("Se requieren permisos para acceder a la cámara");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  }

  async function startRecording() {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== "granted") {
        alert("Se requieren permisos para grabar audio");
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );

      setRecording(recording);
    } catch (error) {
      console.error("Error al iniciar la grabación:", error);
    }
  }

  async function stopRecording() {
    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setAudioUri(uri);
      setRecording(null);
    } catch (error) {
      console.error("Error al detener la grabación:", error);
    }
  }

  async function playAudio() {
    if (audioUri) {
      const { sound } = await Audio.Sound.createAsync({ uri: audioUri });
      setSound(sound);
      await sound.setVolumeAsync(1.0);
      await sound.playAsync();
    }
  }

  function addMulta() {
    if (
      marbete.trim() &&
      vehiculo.marca.trim() &&
      infraccion.trim() &&
      description.trim() &&
      photo.trim()
    ) {
      const newMulta = {
        id: multas.length,
        marbete,
        vehiculo,
        infraccion,
        description,
        photo,
        audioUri,
      };

      setMultas((prevMultas) => [...prevMultas, newMulta]);

      setMarbete("");

      setVehiculo({
        marca: "",
        modelo: "",
        color: "",
        anio: "",
        placa: "",
      });

      setInfraccion("");
      setDate(new Date());
      setDescription("");
      setPhoto("");
      setRecording(null);
      setAudioUri(null);
      setSound(null);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Registro de Multas</Text>

          <TextInput
            style={styles.input}
            placeholder="Código Marbete"
            placeholderTextColor="gray"
            value={marbete}
            onChangeText={setMarbete}
          />
          <Pressable style={styles.button} onPress={getVehiculoInfo}>
            <Text style={styles.buttonText}>Buscar</Text>
          </Pressable>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Información del Vehículo</Text>
            <Text style={styles.cardText}>Marca: {vehiculo.marca}</Text>
            <Text style={styles.cardText}>Modelo: {vehiculo.modelo}</Text>
            <Text style={styles.cardText}>Color: {vehiculo.color}</Text>
            <Text style={styles.cardText}>Año: {vehiculo.anio}</Text>
            <Text style={styles.cardText}>Placa: {vehiculo.placa}</Text>
          </View>

          <View>
            <Text style={styles.infraccionLabel}>Infracción:</Text>
            <Picker
              selectedValue={infraccion}
              onValueChange={setInfraccion}
              style={{ color: "#0A4DA2", fontSize: 16 }}
            >
              <Picker.Item label="Leve" value="Leve" />
              <Picker.Item label="Grave" value="Grave" />
              <Picker.Item label="Muy Grave" value="MuyGrave" />
            </Picker>
          </View>

          <Text style={styles.dateText}>Sucedio:</Text>
          <View style={styles.date}>
            <DateTimePicker
              mode="datetime"
              value={date}
              onChange={(event, selectedDate) => setDate(selectedDate)}
            />
          </View>

          <TextInput
            style={styles.input}
            placeholder="Descripción"
            placeholderTextColor="gray"
            value={description}
            onChangeText={setDescription}
          />

          <Pressable onPress={pickImage} style={styles.cameraButton}>
            <AntDesign name="camera" size={24} color="white" />
            <Text style={styles.cameraText}>Tomar Foto</Text>
          </Pressable>

          {photo && <Image source={{ uri: photo }} style={styles.image} />}

          <Pressable
            onPress={recording ? stopRecording : startRecording}
            style={styles.cameraButton}
          >
            {recording ? (
              <>
                <FontAwesome5 name="stop-circle" size={24} color="red" />
                <Text style={styles.cameraText}>Detener audio</Text>
              </>
            ) : (
              <>
                <FontAwesome name="microphone" size={24} color="white" />
                <Text style={styles.cameraText}>Grabar audio</Text>
              </>
            )}
          </Pressable>

          {audioUri && (
            <Pressable onPress={playAudio} style={styles.cameraButton}>
              <AntDesign name="caretright" size={24} color="white" />
              <Text style={styles.cameraText}>Reproducir audio</Text>
            </Pressable>
          )}

          <Pressable style={styles.saveButton} onPress={addMulta}>
            <Text style={styles.buttonText}>Guardar</Text>
          </Pressable>
        </ScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#00471b",
    alignItems: "stretch",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "white",
    padding: 12,
    marginVertical: 10,
    borderRadius: 8,
    width: "100%",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#ffcc00",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
    marginVertical: 10,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#00471b",
  },
  card: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 8,
    width: "100%",
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 5,
    color: "#00471b",
  },
  cardText: {
    fontSize: 16,
    color: "#333",
  },
  infraccionLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffcc00",
    marginTop: 10,
  },
  infraccion: { alignItems: "center" },
  dateText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffcc00",
    marginTop: 10,
  },
  date: { alignItems: "center", marginVertical: 10 },
  cameraButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffcc00",
    padding: 12,
    borderRadius: 8,
    width: "100%",
    marginVertical: 10,
  },
  cameraText: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
    color: "#00471b",
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 10,
    borderRadius: 10,
  },
  saveButton: {
    backgroundColor: "#ffcc00",
    padding: 12,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
});
