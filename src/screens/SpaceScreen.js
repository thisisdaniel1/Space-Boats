import React, { useReducer } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Button} from "react-native";

const HomeScreen = () => {

  const [state, dispatch] = useReducer(reducer, { hull: 0, shield: 0, firstLineFirepower: 0 });

  const reducer = (state, action) => {
    // state looks like { hull: number, shield: number, firstLineFirepower: number }
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

  return  <View>
      <Text>Space</Text>
    </View>
  };

  const styles = StyleSheet.create({});

export default HomeScreen;
