import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Button, Image} from "react-native";

const WelcomeScreen = ({navigation}) => {

  return  <View>
      <Text>Space Boats: Galactic Arsenal</Text>
      <Image source={require("../../assets/laser_button.jpg")}/>
      <Button
        title="Commission Your Ship!"
        onPress={() => {navigation.navigate("DryDock")}}
      />
    </View>
  };

  const styles = StyleSheet.create({});

export default WelcomeScreen;
