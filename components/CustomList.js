import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ListItem, Avatar } from "react-native-elements";

const CustomList = ({ id, chatName, enterChat }) => {
  return (
    <ListItem>
      <Avatar rounded source={require("../assets/dp.png")} />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "800" }}>Shah Rukh</ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          Hey how to be disciplined like u in teenage
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default CustomList;

const styles = StyleSheet.create({});
