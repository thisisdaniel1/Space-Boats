import React, { useReducer } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image} from "react-native";

const DEFAULT_HARDPOINT = "Laser";

const Hardpoint = (props) => {

  return  <TouchableOpacity 
            style={styles.hardpoint}
            onPress={props.fix}
            >
        <Image source={props.imageSource}/>
      </TouchableOpacity>
  };

  const styles = StyleSheet.create({
    hardpoint:{
      height: 90,
      width: 90,
      borderWidth: 1,
      borderColor: "black",
      justifyContent: "center",
      alignItems: "center"
    }
  });

export default Hardpoint;
