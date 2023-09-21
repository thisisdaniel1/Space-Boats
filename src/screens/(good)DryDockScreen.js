import React, { useReducer, useState } from "react";
import { Text, View, ScrollView, StyleSheet, TouchableOpacity, Image} from "react-native";
import Hardpoint from "./components/Hardpoint";

const DEFAULT_HARDPOINT = "blank";
const DEFAULT_HARDPOINT_MISSILE_COST = "150";
const DEFAULT_HARDPOINT_LASER_COST = "100";
const DEFAULT_HARDPOINT_SHIELD_COST = "100";

const DEFAULT_HARDPOINT_GEN_1_COST = "200";
const DEFAULT_HARDPOINT_GEN_2_COST = "300";
const DEFAULT_HARDPOINT_GEN_3_COST = "400";

const DRYDOCK_SCREEN_STATE = "drydock";
const SPACE_SCREEN_STATE = "space";

const DryDockScreen = () => {

  const [gameState, setGameState] = useState(DRYDOCK_SCREEN_STATE);
  var currentGameState;

  // const [shipName, setShipName] = useState("");
  // const [power, setPower] = useState(100);

  // these variables are unique to the player and are not tied to any particular ship
  const [credits, setCredits] = useState(1000);

  const SelectedHardpointReducer = (selectedHardpointState, action) => {
    switch(action.type){
      case "NameChange":
        return { ...selectedHardpointState, hardpointName: action.selectedHardpointChange };
      case "ObjectChange":
        return { ...selectedHardpointState, hardpointObject: action.selectedHardpointChange };
      default:
        return selectedHardpointState;
    }
  }

  // reducer to store the selected hardpoint when selected from the store
  const [selectedHardpointState, selectedHardpointDispatch] = useReducer(SelectedHardpointReducer, { hardpointName: "", hardpointObject: null });



  const BoatReducer = (boatState, action) => {
    switch(action.type){
      case "AssignHardpoint1":
        return { ...boatState, hardpoint_1_text: action.payload };
      case "shield":
      case "firstLineFirepower":
      default:
        return boatState;
    }
  }

  // reducer for boat
  const [boatState, boatDispatch] = useReducer(BoatReducer, { hardpoint_1_text: require(`../../assets/hardpoints/Missile.jpg`),
  hardpoint_2_text: "require(`../../assets/hardpoints/Laser.jpg`)", hardpoint_1: null, hardpoint_2: null, hardpoint_3: null, hardpoint_4: null, hardpoint_5: null, hardpoint_1: null, hardpoint_1: null, hardpoint_1: null, hardpoint_1: null,
    shipName: "", shield: 0, power: 0 });

  switch(gameState){
    case DRYDOCK_SCREEN_STATE:
      currentGameState = <ScrollView>
                          {/* <Text style={styles.titleText}>Total Power Generated: {state.power}</Text> */}
                          {/* used Google to get euro symbol */}
                          <Text style={styles.titleText}>Remaining Credits: {credits} €</Text>
                          <View style={styles.view}>
                            {/* <TouchableOpacity style={styles.hardpoint} onPress={() => {setGameState(SPACE_SCREEN_STATE)}}>
                            </TouchableOpacity> */}
                            <Hardpoint
                              assignHardpoint={ () => { boatDispatch( {type: "AssignHardpoint1",
                                                                      payload: "require(`../../assets/hardpoints/Laser.jpg`)"}); 
                                                                    }}
                              title={"blank"}
                              // imageSource={boatState.ihardpoint_1_text}
                            />
                            <Hardpoint
                              assignHardpoint={ () => { boatDispatch( {type: "AssignHardpoint1",
                                                                      payload: "require(`../../assets/hardpoints/Missile.jpg`)"}); 
                                                                    }}
                                        
                              title={"blank"}
                              imageSource={boatState.hardpoint_1_text}
                            />
                            <Hardpoint />
                            <Hardpoint />
                            <Hardpoint />
                            <Hardpoint />
                            <Hardpoint />
                            <Hardpoint />
                            <Hardpoint />
                          </View>

                          <Text style={styles.titleText}>Store:</Text>
                          <Text style={styles.titleText}>Currently Selected: {selectedHardpointState.hardpointName}</Text>
                          <View style={styles.storeView}>
                            <TouchableOpacity style={styles.hardpoint} onPress={() => { selectedHardpointDispatch( {type: "NameChange", selectedHardpointChange: "Laser"} );
                                                                                        selectedHardpointDispatch( {type: "ObjectChange", selectedHardpointChange: "Laser"}); }}>
                              <Image source={require(`../../assets/hardpoints/Laser.jpg`)}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.hardpoint} onPress={() => { selectedHardpointDispatch( {type: "NameChange", selectedHardpointChange: "Missile"} );}}>
                              <Image source={require(`../../assets/hardpoints/Missile.jpg`)}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.hardpoint} onPress={() => { selectedHardpointDispatch( {type: "NameChange", selectedHardpointChange: "Shield"} );}}>
                              <Image source={require(`../../assets/hardpoints/Shield.jpg`)}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.hardpoint} onPress={() => { selectedHardpointDispatch( {type: "NameChange", selectedHardpointChange: "Generator Lvl 1"} );}}>
                              <Image source={require(`../../assets/hardpoints/Gen_1.jpg`)}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.hardpoint} onPress={() => { selectedHardpointDispatch( {type: "NameChange", selectedHardpointChange: "Generator Lvl 2"} );}}>
                              <Image source={require(`../../assets/hardpoints/Gen_2.jpg`)}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.hardpoint} onPress={() => { selectedHardpointDispatch( {type: "NameChange", selectedHardpointChange: "Generator Lvl 3"} );}}>
                              <Image source={require(`../../assets/hardpoints/Gen_3.jpg`)}/>
                            </TouchableOpacity>
                          </View>

                          {credits > 0 ?
                          <Text>Better Make Complete Use of Your Funds. You Never Know When You'll Catch A Break.</Text>
                          : <Text>Get Set. Ready. Blast Off!</Text>}
                        </ScrollView>
      break;
    case SPACE_SCREEN_STATE:
      currentGameState = <View>
                          <Text>Space</Text>
                        </View>
      break;
  }

  return currentGameState;
};

const styles = StyleSheet.create({
  view:{
    height: 300,
    width: 300,
    borderWidth: 3,
    borderColor: "red",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    padding: 10
  },
  storeView:{
    height: 200,
    width: 300,
    borderWidth: 3,
    borderColor: "red",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    padding: 10
  },
  titleText:{
    fontSize: 20,
    textAlign: "center"
  },
  hardpoint:{
    height: 90,
    width: 90,
    borderWidth: 1,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default DryDockScreen;
