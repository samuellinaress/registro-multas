import { FlatList, Text, View, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useContext } from "react";
import { MultaContext } from "./multas-context";

export default function index() {
  const { multas, setMultas } = useContext(MultaContext);

  function deleteAll() {
    setMultas([]);
  }

  const renderItem = ({ item }) => (
    <View style={styles.multaItem}>
      <Link
        href={{
          pathname: "/MultaDetails",
          params: { item: JSON.stringify(item) },
        }}
        asChild
      >
        <Pressable style={styles.multaPressable}>
          <MaterialIcons name="description" size={24} color="#F4A900" />
          <Text style={styles.multaText}>{item.marbete}</Text>
          <MaterialIcons name="chevron-right" size={24} color="white" />
        </Pressable>
      </Link>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Listado de Multas</Text>

      {multas.length > 0 ? (
        <>
          <FlatList
            data={multas}
            keyExtractor={(multa) => multa.id.toString()}
            renderItem={renderItem}
          />

          <Pressable style={styles.deleteButton} onPress={deleteAll}>
            <MaterialIcons name="delete" size={24} color="white" />
            <Text style={styles.buttonText}>Eliminar todas</Text>
          </Pressable>
        </>
      ) : (
        <Text style={styles.noMultasText}>📄 No hay multas registradas</Text>
      )}

      <Link href={{ pathname: "/NewMulta" }} asChild>
        <Pressable style={styles.addButton}>
          <MaterialIcons name="playlist-add" size={24} color="black" />
          <Text style={styles.addButtonText}>Registrar Multa</Text>
        </Pressable>
      </Link>
      <Link href={{ pathname: "/About" }} asChild>
        <Pressable style={styles.aboutButton}>
          <AntDesign name="user" size={24} color="black" />
          <Text style={styles.addButtonText}>Acerca De</Text>
        </Pressable>
      </Link>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#A7C957",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  multaItem: {
    backgroundColor: "#333",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  multaPressable: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  multaText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
    marginLeft: 10,
  },
  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#D9534F",
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
    marginTop: 20,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F4A900",
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
    marginTop: 10,
  },
  aboutButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#87CEEB",
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    marginLeft: 5,
    fontSize: 16,
    fontWeight: "bold",
  },
  addButtonText: {
    color: "black",
    marginLeft: 5,
    fontSize: 16,
    fontWeight: "bold",
  },
  noMultasText: {
    color: "#333",
    textAlign: "center",
    fontSize: 18,
    marginTop: 20,
  },
});
