import { useCallback, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const numOfTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.isCompleted === true);
  const numOfCompletedTasks = completedTasks.length;

  // for (let i = 0; i < 10; i++) {
  //   tasks.push({
  //     id: i,
  //     text: `Task number ${i + 1}`,
  //     isCompleted: false,
  //   });
  // }

  const handleInput = useCallback((value) => {
    setNewTask(value);
  });

  const addTask = () => {
    if (newTask !== "") {
      const taskData = {
        id: Math.random(),
        text: newTask,
        isCompleted: false,
      };
      setTasks([...tasks, taskData]);
      setNewTask("");
    }
  };

  const completeToggle = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  const completeStyle = (task) => {
    if (task.isCompleted === true) {
      return styles.done;
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.header}>
        <Text style={styles.headerText}>My ToDo List</Text>
      </View>
      <View
        style={styles.inputSection}
        // horizontal
      >
        <TextInput
          style={styles.inputField}
          placeholder="Enter a new task"
          placeholderTextColor={accentColor}
          value={newTask}
          onChangeText={(value) => handleInput(value)}
        ></TextInput>
        <TouchableOpacity style={styles.btn} onPress={addTask}>
          <Text style={styles.btnText}>Add</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <View style={styles.bodyHeader}>
          <Text style={styles.bodyHeaderText}>
            {numOfCompletedTasks} done of {numOfTasks} tasks
          </Text>
        </View>

        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.task} key={item.id}>
              <Text
                style={[styles.taskText, completeStyle(item)]}
                numberOfLines={1}
                ellipsisMode="tail"
              >
                {item.text}
              </Text>
              <View style={styles.buttonsContainer}>
                <TouchableOpacity
                  style={styles.taskBtn}
                  onPress={() => completeToggle(item.id)}
                >
                  <Text style={[styles.btnText, styles.btnDone]}>Done</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.taskBtn}
                  onPress={() => deleteTask(item.id)}
                >
                  <Text style={[styles.btnText, styles.btnDelete]}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const dominantColor = "#73768E";
const complementaryColor = "#444655";
const accentColor = "#A8AABC";
const discreetColor = "#5D3F41";

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: dominantColor,
    alignItems: "center",
  },
  header: {
    marginTop: 50,
    marginBottom: 10,
    height: "7%",
    width: "100%",
    justifyContent: "center",
  },
  headerText: {
    color: accentColor,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 25,
  },
  inputSection: {
    flexDirection: "row",
    width: "85%",
  },
  inputField: {
    backgroundColor: complementaryColor,
    color: accentColor,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    marginVertical: 10,
    paddingStart: 10,
    paddingEnd: 10,
    width: 200,
    height: 40,
    borderBottomColor: accentColor,
    borderBottomWidth: 2,
    flex: 1,
    marginLeft: 20,
  },
  btn: {
    backgroundColor: discreetColor,
    margin: 10,
    borderTopEndRadius: 20,
    borderBottomRightRadius: 20,
    width: 70,
    height: 40,
    justifyContent: "center",
    borderBottomColor: accentColor,
    borderBottomWidth: 2,
  },
  btnText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 15,
    color: accentColor,
  },
  body: {
    backgroundColor: complementaryColor,
    flex: 1,
    margin: 20,
    borderRadius: 20,
    width: "80%",
  },
  bodyHeader: {
    margin: 20,
    backgroundColor: accentColor,
    borderRadius: 50,
    height: 45,
    justifyContent: "center",
  },
  bodyHeaderText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    color: discreetColor,
  },
  task: {
    flexDirection: "row",
    backgroundColor: dominantColor,
    marginVertical: 10,
    marginHorizontal: 15,
    height: 50,
    borderRadius: 50,
    justifyContent: "space-between",
  },
  taskText: {
    marginVertical: 14,
    marginStart: 20,
    maxWidth: "70%",
    color: accentColor,
  },
  buttonsContainer: {
    flexDirection: "row",
    marginEnd:5,
  },
  taskBtn: {
    backgroundColor: accentColor,
    marginVertical: 10,
    marginHorizontal: 5,
    borderRadius: 50,
    width: 70,
    justifyContent: "center",
  },
  done: {
    textDecorationLine: "line-through",
    color: complementaryColor,
  },
  btnDelete: {
    color: discreetColor,
  },
  btnDone: {
    color: complementaryColor,
  },
});
