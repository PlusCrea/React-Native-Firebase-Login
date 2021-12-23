import React, { useEffect } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  View,
  Text,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getFirestore } from "firebase/firestore";
import {
  collection,
  doc,
  addDoc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";

export default function Todo() {
  const [todo, setTodo] = React.useState("");
  const [tasks, setTasks] = React.useState(["Learn 1", "LEarn 2"]);
  const [tasklist, setTasklist] = React.useState([]);

  const db = getFirestore();

  const handleAddTaskPress = async () => {
    /*const newList = [...tasklist];
    newList.push({ id: doc.id, todo: doc.data().todo });
    setTasklist(newList);
    */
    setTodo("");
    const newList = [...tasklist];

    try {
      const docRef = await addDoc(collection(db, "todolist"), {
        todo: todo,
        date: Date.now(),
      });
      console.log("Document written with ID: ", docRef.id);
      newList.push({ id: docRef.id, todo: todo });
      setTasklist(newList);
    } catch (e) {
      console.log("Error adding document: ", e);
    }
  };

  const handleDeleteTaskPress = (index, todoid) => {
    Alert.alert("Delete Todo", "Are you sure?", [
      {
        text: "Cancel",
        /*onPress: () => console.log("Cancel Pressed"), */
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: async () => {
          //console.log("OK Pressed");
          await deleteDoc(doc(db, "todolist", todoid));
          const newList = [...tasklist];
          newList.splice(index, 1);
          setTasklist(newList);
        },
      },
    ]);
  };

  useEffect(async () => {
    const newList = [...tasklist];

    const querySnapshot = await getDocs(collection(db, "todolist"));
    querySnapshot.forEach((doc) => {
      //console.log(doc.id, " => ", doc.data().todo);
      newList.push({ id: doc.id, todo: doc.data().todo });
      //console.log("tasklist", newList);
    });

    setTasklist(newList);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableWithoutFeedback /*onPress={Keyboard.dismiss}*/>
        <View style={styles.container}>
          <Text style={styles.title}>My Tasks</Text>
          <TextInput
            placeholder="Todo"
            placeholderTextColor="#C0C0C0"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={setTodo}
            value={todo}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleAddTaskPress()}
          >
            <View>
              <Text style={styles.buttonText}>Add Task</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.divider}></View>
          <FlatList
            data={tasklist}
            renderItem={({ item, index }) => (
              <View style={styles.taskContainer}>
                <Text style={styles.taskText}>{item.todo}</Text>
                <TouchableOpacity
                  style={styles.taskDelete}
                  onPress={() => handleDeleteTaskPress(index, item.id)}
                >
                  <Text style={styles.taskDeleteText}>X</Text>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item) => item + Date.now() + Math.random()}
          />
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    padding: 16,
  },

  textInput: {
    width: "100%",
    paddingLeft: 20,
    marginBottom: 20,
    height: 60,
    color: "#000",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    borderColor: "#C0C0C0",
    borderWidth: 3,
    fontFamily: "Roboto-Light",
  },
  title: {
    fontFamily: "Roboto-Bold",
    fontWeight: "bold",
    fontSize: 25,
    marginVertical: 10,
  },
  button: {
    //    width: "95%",
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: "#3498DB",
    alignSelf: "flex-end",
  },
  buttonText: {
    fontFamily: "Roboto-Light",
    letterSpacing: 2,
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "center",
  },
  divider: {
    width: "100%",
    height: 2,
    backgroundColor: "#ddd",
    marginVertical: 16,
  },
  taskContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 12,
  },
  taskText: {
    fontFamily: "Roboto-Light",
    fontSize: 18,
  },
  taskDelete: {
    width: 25,
    height: 25,
    borderRadius: 15,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
  taskDeleteText: { fontSize: 18, fontWeight: "bold", color: "white" },
});
