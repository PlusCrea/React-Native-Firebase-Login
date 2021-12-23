import React from "react";
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Text,
  View,
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function Login({ navigation }) {
  const [show, setShow] = React.useState(true);
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();

  const handleClick = () => setShow(!show);

  function login() {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        //console.log("user", user);
        navigation.navigate("User", { user: user.displayName });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("err", errorMessage);
      });

    //navigation.navigate("User", { user: "ali" });
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableWithoutFeedback /*onPress={Keyboard.dismiss}*/>
        <View style={styles.container}>
          <Image source={require("../assets/img/aggrement.png")} />

          <TextInput
            placeholder="E-mail"
            placeholderTextColor="#C0C0C0"
            style={styles.textInput}
            autoCapitalize="none"
            keyboardType="email-address"
            onChangeText={(val) => setEmail(val)}
          />
          <View style={styles.stylepass}>
            <TextInput
              style={{ flex: 1 }}
              placeholder="Password"
              placeholderTextColor="#C0C0C0"
              style={styles.textInput}
              autoCapitalize="none"
              secureTextEntry={show}
              onChangeText={(val) => setPassword(val)}
            />

            <Feather
              onPress={handleClick}
              name={show ? "eye-off" : "eye"}
              color="black"
              size={34}
              style={styles.lefticon}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={() => login()}>
            <View>
              <Text style={styles.buttonText}>Login</Text>
            </View>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },

  button: {
    width: "95%",
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: "#3498DB",
  },
  buttonText: {
    fontFamily: "Roboto-Light",
    letterSpacing: 2,
    color: "white",
    fontWeight: "bold",
    //textTransform: "uppercase",
    fontSize: 15,
    textAlign: "center",
  },
  textInput: {
    width: "95%",
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
  stylepass: {
    position: "relative",
    alignItems: "center",
    width: "100%",
  },
  lefticon: {
    position: "absolute",
    right: 15,
    top: 13,
  },
});
