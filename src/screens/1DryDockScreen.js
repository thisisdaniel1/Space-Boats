import React, { useReducer } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Button, Image} from "react-native";
import Boat from "./components/Boat";

const DryDockScreen = ({navigation}) => {

  const [state, dispatch] = useReducer(reducer, { hull: 0, shield: 0, power: 0, aaHardpoint: null, abHardpoint: null, acHardpoint: null, baHardpoint: null, bbHardpoint: null, bcHardpoint: null, cHardpoint: null });

  const reducer = (state, action) => {
    // state looks like { hull: number, shield: number, power: number, aaHardpoint: object, abHardpoint: object, acHardpoint: object, baHardpoint: object, bbHardpoint: object, bcHardpoint: object, cHardpoint: object }
    // action looks like { attToChange: "hull" || "shield" || "firstLineFirepower" , amount: 100 || 20 || -100 || -20 }

    switch(action.attToChange){
      case "hull":
        return { ...state, hull: state.hull + action.amount };
      case "shield":
      case "firstLineFirepower":
      default:
    }
  }

  // const [hull, setHull] = useState(0);
  // const [shield, setShield] = useState(0);
  // const [firstLineFIrepower] = useState(0);
  // const [secondLineFIrepower] = useState(0);
  // const [thirdLineFIrepower] = useState(0);

  return  <View style={styles.primaryShip}>
      <Boat />
    </View>
  };

  const styles = StyleSheet.create({
    primaryShip:{
      alignItems: "center"
    }
  });

export default DryDockScreen;
