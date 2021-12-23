import React from "react";
import { View, Text, Button } from "react-native";

export default function User({ route, navigation }) {
  const user = route.params.user;
  return (
    <View>
      <Text>User : {user} </Text>
      <Button
        title="Press me"
        color="#f194ff"
        onPress={() => navigation.navigate("Todo")}
      />
    </View>
  );
}
