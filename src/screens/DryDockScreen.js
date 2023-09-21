import React, { useReducer, useState } from "react";
import { Text, View, ScrollView, StyleSheet, TouchableOpacity, Image} from "react-native";
import Hardpoint from "./components/Hardpoint";

const DEFAULT_LASER_PATH = require(`../../assets/hardpoints/Laser.jpg`);
const DEFAULT_MISSILE_PATH = require(`../../assets/hardpoints/Missile.jpg`);
const DEFAULT_SHIELD_PATH = require(`../../assets/hardpoints/Shield.jpg`);
const DEFAULT_GEN_1_PATH = require(`../../assets/hardpoints/Gen_1.jpg`);
const DEFAULT_GEN_2_PATH = require(`../../assets/hardpoints/Gen_2.jpg`);
const DEFAULT_SELL_PATH = require(`../../assets/hardpoints/Sell.jpg`);

const DEFAULT_HARDPOINT_MISSILE_COST = 100;
const DEFAULT_HARDPOINT_LASER_COST = 150;
const DEFAULT_HARDPOINT_SHIELD_COST = 100;
// every shield will increase the cap on shields by 100 "shields"
const DEFAULT_HARDPOINT_SHIELD_POWER = 100;

const DEFAULT_HARD

const DEFAULT_HARDPOINT_GEN_1_COST = 200;
const DEFAULT_HARDPOINT_GEN_1_POWER = 75;
const DEFAULT_HARDPOINT_GEN_2_COST = 300;
const DEFAULT_HARDPOINT_GEN_2_POWER = 125;

const L_DRYDOCK_SCREEN_STATE = "laser_drydock";
const M_DRYDOCK_SCREEN_STATE = "missile_drydock";
const S_DRYDOCK_SCREEN_STATE = "shield_drydock";
const G1_DRYDOCK_SCREEN_STATE = "gen_1_drydock";
const G2_DRYDOCK_SCREEN_STATE = "gen_2_drydock";
const SELL_DRYDOCK_SCREEN_STATE = "sell_drydock";
const SPACE_SCREEN_STATE = "space";

const DryDockScreen = () => {

  const [gameState, setGameState] = useState(L_DRYDOCK_SCREEN_STATE);
  var currentGameState;

  // const [shipName, setShipName] = useState("");
  // const [power, setPower] = useState(100);

  var thouseand = 1000;
  const [credits, setCredits] = useState(thouseand);

  const BoatReducer = (boatState, action) => {
    switch(action.type){
      case "AssignHardpoint1":
        if (boatState.hardpoint_1 != null){
          switch (boatState.hardpoint_1){
            case laser:
              // refunds the cost of a laser hardpoint
              setCredits( ...credits, credits + DEFAULT_HARDPOINT_LASER_COST);
            case missile:
              setCredits( ...credits, credits + DEFAULT_HARDPOINT_MISSILE_COST);
            case shield:
              setCredits( ...credits, credits + DEFAULT_HARDPOINT_SHIELD_COST);
          }
        }

        return { ...boatState, hardpoint_1_text: action.payload };
      case "AssignHardpoint2":
        return { ...boatState, hardpoint_2_text: action.payload };
      case "AssignHardpoint3":
        return { ...boatState, hardpoint_3_text: action.payload };
      case "AssignHardpoint4":
        return { ...boatState, hardpoint_4_text: action.payload };
      case "AssignHardpoint5":
        return { ...boatState, hardpoint_5_text: action.payload };
      case "AssignHardpoint6":
        return { ...boatState, hardpoint_6_text: action.payload };
      case "NameChange":
        return { ...boatState, shipName: action.payload };
      case "UpdateShields":
        return { ...boatState, shield: boatState.shield + action.payload };
      case "UpdatePower":
        return { ...boatState, power: boatState.power + action.payload };
      default:
        return boatState;
    }
  }

  // reducer for boat
  const [boatState, boatDispatch] = useReducer(BoatReducer, { hardpoint_1_text: require(`../../assets/hardpoints/blank.jpg`),
  hardpoint_2_text: "require(`../../assets/hardpoints/blank.jpg`)", hardpoint_1: null, hardpoint_2: null, hardpoint_3: null, hardpoint_4: null, hardpoint_5: null, hardpoint_6: null, 
    shipName: "", shield: 0, power: 0 });

  const StoreDisplayReducer = (storeDisplayState, action) => {
    switch(action.type){
      case "ChangeDisplayItem":
        return {...storeDisplayState, displayItem: action.payload};
      case "ChangeHullDamage":
        return {...storeDisplayState, }
      default:
        return storeDisplayState;
    }
  }

  const [storeDisplayState, storeDisplayDispatch] = useReducer(StoreDisplayReducer, { displayItem: "Laser", hullDamage: 0, shieldDamage: 0, shieldBuffer: 0, generatePower: 0 });

  switch(gameState){
    case L_DRYDOCK_SCREEN_STATE:
      currentGameState = <ScrollView>
                          <Text style={styles.titleText}>Total Power Generated: {boatState.power}</Text>
                          <View style={styles.view}>
                            {/* <TouchableOpacity style={styles.hardpoint} onPress={() => {setGameState(SPACE_SCREEN_STATE)}}>
                            </TouchableOpacity> */}
                            <Hardpoint
                              assignHardpoint={ () => { boatDispatch( {type: "AssignHardpoint1",
                                                              payload: DEFAULT_LASER_PATH})
                                                        setCredits( credits - DEFAULT_HARDPOINT_LASER_COST );  
                                                      }}
                              imageSource={boatState.hardpoint_1_text}
                            />
                            <Hardpoint
                              assignHardpoint={ () => { boatDispatch( {type: "AssignHardpoint2",
                                                              payload: DEFAULT_LASER_PATH})  
                                                        // credits = {...credits}
                                                        // setCredits(credits);      
                                                      }}
                                        
                              imageSource={boatState.hardpoint_2_text}
                            />
                            <Hardpoint 
                              assignHardpoint={ () => { boatDispatch( {type: "AssignHardpoint3",
                                                              payload: DEFAULT_LASER_PATH})  
                                                        setCredits( ...credits, credits - DEFAULT_HARDPOINT_LASER_COST );      
                                                      }}

                              imageSource={boatState.hardpoint_3_text}
                            />
                            <Hardpoint 
                              assignHardpoint={ () => { boatDispatch( {type: "AssignHardpoint4",
                                                              payload: DEFAULT_LASER_PATH})  
                                                        setCredits( ...credits, credits - DEFAULT_HARDPOINT_LASER_COST );      
                                                      }}
        
                              imageSource={boatState.hardpoint_4_text}
                            />
                            <Hardpoint 
                              assignHardpoint={ () => { boatDispatch( {type: "AssignHardpoint5",
                                                              payload: DEFAULT_LASER_PATH})  
                                                        setCredits( ...credits, credits - DEFAULT_HARDPOINT_LASER_COST );      
                                                      }}
        
                              imageSource={boatState.hardpoint_5_text}
                            />
                            <Hardpoint 
                              assignHardpoint={ () => { boatDispatch( {type: "AssignHardpoint6",
                                                              payload: DEFAULT_LASER_PATH})  
                                                        setCredits( ...credits, credits - DEFAULT_HARDPOINT_LASER_COST );      
                                                      }}
        
                              imageSource={boatState.hardpoint_6_text}
                            />
                          </View>

                          {/* used Google to get euro symbol */}
                          <Text style={styles.titleText}>Remaining Credits: {credits} €</Text>

                          <Text style={styles.titleText}>Store:</Text>
                          <Text style={styles.titleText}>Currently Selected: {storeDisplayState.displayItem}</Text>
                          <Text style={styles.titleText}>Price: {DEFAULT_HARDPOINT_LASER_COST} €</Text>
                          <View style={styles.storeView}>
                            <TouchableOpacity style={styles.hardpoint} onPress={() => {   storeDisplayDispatch( {type: "ChangeDisplayItem", payload: "Laser"} )
                                                                                          storeDisplayDispatch( {type: "ChangeHullDamage", payload: DEFAULT_LASER_HULL_DAMAGE})
                                                                                          storeDisplayDispatch( {type: "ChangeShieldDamage", payload: DEFAULT_LASER_SHIELD_DAMAGE})
                                                                                          storeDisplayDispatch( {type: "ChangeShieldBuffer", payload: 0})
                                                                                          storeDisplayDispatch( {type: "ChangeGeneratePower", payload: 0})
                                                                                          setGameState(L_DRYDOCK_SCREEN_STATE); }}>
                              <Image source={require(`../../assets/hardpoints/Laser.jpg`)}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.hardpoint} onPress={() => {   storeDisplayDispatch( {type: "ChangeDisplayItem", payload: "Missile"} )
                                                                                          storeDisplayDispatch( {type: "ChangeHullDamage", payload: DEFAULT_MISSILE_HULL_DAMAGE})
                                                                                          storeDisplayDispatch( {type: "ChangeShieldDamage", payload: DEFAULT_MISSILE_SHIELD_DAMAGE})
                                                                                          storeDisplayDispatch( {type: "ChangeShieldBuffer", payload: DEFAULT_SHIELD_BUFFER})
                                                                                          setGameState(L_DRYDOCK_SCREEN_STATE); }}>
                              <Image source={require(`../../assets/hardpoints/Missile.jpg`)}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.hardpoint} onPress={() => {   storeDisplayDispatch( {type: "ChangeDisplayItem", payload: "Laser"} )
                                                                                          storeDisplayDispatch( {type: "ChangeHullDamage", payload: DEFAULT_LASER_HULL_DAMAGE})
                                                                                          storeDisplayDispatch( {type: "ChangeShieldDamage", payload: DEFAULT_SHIELD_HULL_DAMAGE})
                                                                                          storeDisplayDispatch( {type: "ChangeShieldBuffer", payload: DEFAULT_SHIELD_BUFFER})
                                                                                          setGameState(L_DRYDOCK_SCREEN_STATE); }}>
                              <Image source={require(`../../assets/hardpoints/Shield.jpg`)}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.hardpoint} onPress={() => {   storeDisplayDispatch( {type: "ChangeDisplayItem", payload: "Laser"} )
                                                                                          storeDisplayDispatch( {type: "ChangeHullDamage", payload: DEFAULT_LASER_HULL_DAMAGE})
                                                                                          storeDisplayDispatch( {type: "ChangeShieldDamage", payload: DEFAULT_SHIELD_HULL_DAMAGE})
                                                                                          storeDisplayDispatch( {type: "ChangeShieldBuffer", payload: 0})
                                                                                          storeDisplayDispatch( {type: "ChangeGeneratePower", payload: 0})
                                                                                          setGameState(L_DRYDOCK_SCREEN_STATE); }}>
                              <Image source={require(`../../assets/hardpoints/Gen_1.jpg`)}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.hardpoint} onPress={() => {   storeDisplayDispatch( {type: "ChangeDisplayItem", payload: "Laser"} )
                                                                                          storeDisplayDispatch( {type: "ChangeHullDamage", payload: DEFAULT_LASER_HULL_DAMAGE})
                                                                                          storeDisplayDispatch( {type: "ChangeShieldDamage", payload: DEFAULT_SHIELD_HULL_DAMAGE})
                                                                                          storeDisplayDispatch( {type: "ChangeShieldBuffer", payload: 0})
                                                                                          storeDisplayDispatch( {type: "ChangeGeneratePower", payload: 0})
                                                                                          setGameState(L_DRYDOCK_SCREEN_STATE); }}>
                              <Image source={require(`../../assets/hardpoints/Gen_2.jpg`)}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.hardpoint} onPress={() => {   storeDisplayDispatch( {type: "ChangeDisplayItem", payload: "Laser"} )
                                                                                          storeDisplayDispatch( {type: "ChangeHullDamage", payload: DEFAULT_LASER_HULL_DAMAGE})
                                                                                          storeDisplayDispatch( {type: "ChangeShieldDamage", payload: DEFAULT_SHIELD_HULL_DAMAGE})
                                                                                          storeDisplayDispatch( {type: "ChangeShieldBuffer", payload: DEFAULT_SHIELD_BUFFER})
                                                                                          setGameState(L_DRYDOCK_SCREEN_STATE); }}>
                              <Image source={require(`../../assets/hardpoints/Sell.jpg`)}/>
                            </TouchableOpacity>
                          </View>

                          {credits > 0 ?
                          <Text>Better Make Complete Use of Your Funds. You Never Know When You'll Catch A Break.</Text>
                          : <Text>Get Set. Ready. Blast Off!</Text>}
                        </ScrollView>
      break;

    case M_DRYDOCK_SCREEN_STATE:
      currentGameState = <ScrollView>
                          <Text style={styles.titleText}>Total Power Generated: {boatState.power}</Text>
                          <View style={styles.view}>
                            <Hardpoint
                              assignHardpoint={ () => { boatDispatch( {type: "AssignHardpoint1",
                                                              payload: DEFAULT_MISSILE_PATH})  
                                                        setCredits( ...credits, credits - DEFAULT_HARDPOINT_MISSILE_COST );      
                                                      }}
                              imageSource={boatState.hardpoint_1_text}
                            />
                            <Hardpoint
                              assignHardpoint={ () => { boatDispatch( {type: "AssignHardpoint2",
                                                              payload: DEFAULT_MISSILE_PATH})  
                                                        setCredits( ...credits, credits - DEFAULT_HARDPOINT_MISSILE_COST );      
                                                      }}
                                        
                              imageSource={boatState.hardpoint_2_text}
                            />
                            <Hardpoint 
                              assignHardpoint={ () => { boatDispatch( {type: "AssignHardpoint3",
                                                              payload: DEFAULT_MISSILE_PATH})  
                                                        setCredits( ...credits, credits - DEFAULT_HARDPOINT_MISSILE_COST );      
                                                      }}
        
                              imageSource={boatState.hardpoint_3_text}
                            />
                            <Hardpoint 
                              assignHardpoint={ () => { boatDispatch( {type: "AssignHardpoint4",
                                                              payload: DEFAULT_MISSILE_PATH})  
                                                        setCredits( ...credits, credits - DEFAULT_HARDPOINT_MISSILE_COST );      
                                                      }}
        
                              imageSource={boatState.hardpoint_4_text}
                            />
                            <Hardpoint 
                              assignHardpoint={ () => { boatDispatch( {type: "AssignHardpoint5",
                                                              payload: DEFAULT_MISSILE_PATH})  
                                                        setCredits( ...credits, credits - DEFAULT_HARDPOINT_MISSILE_COST );      
                                                      }}
        
                              imageSource={boatState.hardpoint_5_text}
                            />
                            <Hardpoint 
                              assignHardpoint={ () => { boatDispatch( {type: "AssignHardpoint6",
                                                              payload: DEFAULT_MISSILE_PATH})  
                                                        setCredits( ...credits, credits - DEFAULT_HARDPOINT_MISSILE_COST );      
                                                      }}
        
                              imageSource={boatState.hardpoint_6_text}
                            />
                          </View>

                          <Text style={styles.titleText}>Remaining Credits: {credits} €</Text>

                          <Text style={styles.titleText}>Store:</Text>
                          <Text style={styles.titleText}>Currently Selected: {storeDisplayState.displayItem}</Text>
                          <Text style={styles.titleText}>Price: {DEFAULT_HARDPOINT_MISSILE_COST} €</Text>
                          <View style={styles.storeView}>
                            <TouchableOpacity style={styles.hardpoint} onPress={() => { setGameState(L_DRYDOCK_SCREEN_STATE); }}>
                              <Image source={require(`../../assets/hardpoints/Laser.jpg`)}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.hardpoint} onPress={() => { setGameState(M_DRYDOCK_SCREEN_STATE); }}>
                              <Image source={require(`../../assets/hardpoints/Missile.jpg`)}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.hardpoint} onPress={() => { setGameState(S_DRYDOCK_SCREEN_STATE); }}>
                              <Image source={require(`../../assets/hardpoints/Shield.jpg`)}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.hardpoint} onPress={() => { setGameState(G1_DRYDOCK_SCREEN_STATE); }}>
                              <Image source={require(`../../assets/hardpoints/Gen_1.jpg`)}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.hardpoint} onPress={() => { setGameState(G2_DRYDOCK_SCREEN_STATE); }}>
                              <Image source={require(`../../assets/hardpoints/Gen_2.jpg`)}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.hardpoint} onPress={() => { setGameState(SELL_DRYDOCK_SCREEN_STATE); }}>
                              <Image source={require(`../../assets/hardpoints/Sell.jpg`)}/>
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
    height: 200,
    width: 300,
    borderWidth: 3,
    borderColor: "red",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    // try space around
    padding: 4
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
