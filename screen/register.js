import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Text,
  Image,
  View,
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

export default function Register({ navigation }) {
  const [show, setShow] = React.useState(true);
  const [reshow, setReshow] = React.useState(true);
  const [name, setName] = React.useState();
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const [repassword, setRepassword] = React.useState();

  const handlePasShow = () => setShow(!show);
  const handleRePasShow = () => setReshow(!reshow);

  function register() {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        //update user
        console.log("auth.currentUser", auth.currentUser);
        updateProfile(user, {
          displayName: name,
        })
          .then(() => {
            // Profile updated!
            navigation.navigate("User", { user: name });
          })
          .catch((error) => {
            // An error occurred
            console.log("Update Error", error);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        console.log("Create Error", errorMessage);
      });
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Image
            source={require("../assets/img/moto.png")}
            style={{
              width: 350,
              height: 200,
              marginBottom: 10,
              borderRadius: 10,
            }}
          />
          <TextInput
            placeholder="Name"
            placeholderTextColor="#C0C0C0"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => setName(val)}
          />
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
              onPress={handlePasShow}
              name={show ? "eye-off" : "eye"}
              color="black"
              size={34}
              style={styles.lefticon}
            />
          </View>
          <View style={styles.stylepass}>
            <TextInput
              style={{ flex: 1 }}
              placeholder="Re Password"
              placeholderTextColor="#C0C0C0"
              style={styles.textInput}
              autoCapitalize="none"
              secureTextEntry={reshow}
              onChangeText={(val) => setRepassword(val)}
            />

            <Feather
              onPress={handleRePasShow}
              name={reshow ? "eye-off" : "eye"}
              color="black"
              size={34}
              style={styles.lefticon}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={() => register()}>
            <View>
              <Text style={styles.buttonText}>Register</Text>
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
