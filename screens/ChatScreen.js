import React, { useLayoutEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import { Avatar } from "react-native-elements";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { Keyboard } from "react-native";
import { auth, db } from "../firebase";
import * as firebase from "firebase";

const ChatScreen = ({ navigation, route }) => {
  const [input, setInput] = useState("");

  const sendMessage = () => {
    Keyboard.dismiss();

    db.collection("chats").doc(route.params.id).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      photoURL: auth.currentUser.photoURL,
    });

    setInput("");
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Chat",
      headerBackTitleVisible: false,
      headerTitleAlign: "left",
      headerTitle: () => (
        <View style={styles.headerTitle}>
          <Avatar rounded source={require("../assets/dp.png")} />
          <Text style={styles.headerText}>{route.params.chatName}</Text>
        </View>
      ),
      //TODO : headerLeft() isnt over riding the default back button :( ..why ?? )
      //   headerLeft: () => (
      //     <TouchableOpacity
      //       style={{ marginLeft: 10 }}
      //       onPress={() => navigation.goBack()}
      //     >
      //       <AntDesign name="arrowleft" size={24} color="white" />
      //     </TouchableOpacity>
      //   ),
      headerRight: () => (
        <View style={styles.headerRight}>
          <TouchableOpacity>
            <FontAwesome name="video-camera" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="call" size={24} color="white" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.containerMain}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "undefined"}
        style={styles.containerSec}
        keyboardVerticalOffset={90}
      >
        {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss()}> */}
        <>
          <ScrollView></ScrollView>
          <View style={styles.footer}>
            <TextInput
              value={input}
              onSubmitEditing={sendMessage}
              onChangeText={(text) => setInput(text)}
              placeholder="Type Your Message.."
              style={styles.input}
            />
            <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
              <Ionicons name="send" size={24} color="#2B68E6" />
            </TouchableOpacity>
          </View>
        </>
        {/* </TouchableWithoutFeedback> */}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
    backgroundColor: "white",
  },
  containerSec: {
    flex: 1,
  },
  headerText: {
    color: "white",
    marginLeft: 10,
    fontWeight: "700",
    fontSize: 20,
  },
  headerRight: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 80,
    marginRight: 20,
  },
  headerTitle: {
    flexDirection: "row",
    alignItems: "center",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 15,
  },
  input: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 10,
    borderColor: "transparent",
    backgroundColor: "#ECECEC",
    // borderWidth: 1,
    padding: 10,
    color: "grey",
    borderRadius: 30,
  },
});
