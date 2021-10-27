import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Input } from "react-native-elements";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { db } from "../firebase";

const AddChatScreen = ({ navigation }) => {
  const [input, setInput] = useState("");

  const createChat = async () => {
    await db
      .collection("chats")
      .add({
        chatName: input,
      })
      .then(() => {
        navigation.goBack();
      })
      .catch((err) => alert(err));
  };
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Input
        placeholder="Enter Chat Name"
        value={input}
        onChangeText={(text) => setInput(text)}
        leftIcon={<Icon name="message-square" type="feather" />}
      />
      <Button disabled={!input} onPress={createChat} title="Create New Chat" />
    </View>
  );
};

export default AddChatScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: "100%",
    padding: 5,
  },
});
