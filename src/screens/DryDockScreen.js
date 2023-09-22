import React, { useReducer, useState } from "react";
import { Text, View, ScrollView, StyleSheet, TouchableOpacity, Image} from "react-native";
import Hardpoint from "./components/Hardpoint";

const DEFAULT_LASER_PATH = require(`../../assets/hardpoints/Laser.jpg`);
const DEFAULT_MISSILE_PATH = require(`../../assets/hardpoints/Missile.jpg`);
const DEFAULT_SHIELD_PATH = require(`../../assets/hardpoints/Shield.jpg`);
const DEFAULT_GEN_1_PATH = require(`../../assets/hardpoints/Gen_1.jpg`);
const DEFAULT_GEN_2_PATH = require(`../../assets/hardpoints/Gen_2.jpg`);
const DEFAULT_SELL_PATH = require(`../../assets/hardpoints/Sell.jpg`);
const DEFAULT_BLANK_PATH = require(`../../assets/hardpoints/blank.jpg`);

// represents the health of your ship, does not include any shields
// when it hits 0, your ship has exploded
const DEFAULT_HULL = 500;

// each cost variable is the credit cost per hardpoint
// except for PW Cost which stand for power cost,
// this number is subtracted when the hardpoint is used in combat
const DEFAULT_HARDPOINT_MISSILE_COST = 100;
const DEFAULT_HARDPOINT_MISSILE_PW_COST = 100;
const DEFAULT_HARDPOINT_MISSILE_HULL_DAMAGE = 100;
const DEFAULT_HARDPOINT_MISSILE_SHIELD_DAMAGE = 20;

const DEFAULT_HARDPOINT_LASER_COST = 150;
// note how laser weapons are costlier in pw to use
const DEFAULT_HARDPOINT_LASER_PW_COST = 150;
const DEFAULT_HARDPOINT_LASER_HULL_DAMAGE = 20;
const DEFAULT_HARDPOINT_LASER_SHIELD_DAMAGE = 100;

const DEFAULT_HARDPOINT_SHIELD_COST = 150;
// every shield will increase the cap on shields by 300 "shield" points
const DEFAULT_HARDPOINT_SHIELD_POWER = 300;

const DEFAULT_HARDPOINT_GEN_1_COST = 150;
const DEFAULT_HARDPOINT_GEN_1_POWER = 200;
const DEFAULT_HARDPOINT_GEN_2_COST = 200;
const DEFAULT_HARDPOINT_GEN_2_POWER = 300;

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

  const BoatReducer = (boatState, action) => {
    switch(action.type){
      case "AssignHardpoint1":
        return { ...boatState, hardpoint_1_text: action.payload, hardpoint_1: action.payload2 };
      case "AssignHardpoint2":
        return { ...boatState, hardpoint_2_text: action.payload, hardpoint_2: action.payload2 };
      case "AssignHardpoint3":
        return { ...boatState, hardpoint_3_text: action.payload, hardpoint_3: action.payload2 };
      case "AssignHardpoint4":
        return { ...boatState, hardpoint_4_text: action.payload, hardpoint_4: action.payload2 };
      case "AssignHardpoint5":
        return { ...boatState, hardpoint_5_text: action.payload, hardpoint_5: action.payload2 };
      case "AssignHardpoint6":
        return { ...boatState, hardpoint_6_text: action.payload, hardpoint_6: action.payload2 };
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
  hardpoint_2_text: "require(`../../assets/hardpoints/blank.jpg`)", hardpoint_1: "", hardpoint_2: "", hardpoint_3: "", hardpoint_4: "", hardpoint_5: "", hardpoint_6: "", 
    shipName: "", totalShields: 0, totalPower: 0 });

  const StoreDisplayReducer = (storeDisplayState, action) => {
    switch(action.type){
      case "ChangeDisplayItem":
        return {...storeDisplayState, displayItem: action.payload};
      case "ChangeDisplayPrice":
        return {...storeDisplayState, displayPrice: action.payload};
      case "ChangeHullDamage":
        return {...storeDisplayState, hullDamage: action.payload};
      case "ChangeShieldDamage":
        return {...storeDisplayState, shieldDamage: action.payload};
      case "ChangeShieldBuffer":
        return {...storeDisplayState, shieldBuffer: action.payload};
      case "ChangeGeneratePower":
        return {...storeDisplayState, generatePower: action.payload};
      default:
        return storeDisplayState;
    }
  }

  const [credits, setCredits] = useState(1000);

  // depending on the type of hardpoint (laser, gen_1, etc.), the player is refunded an original cost
  const sellHardpoint = (hardpointType) => {
    switch(hardpointType){
      case "laser":
          setCredits( credits + DEFAULT_HARDPOINT_LASER_COST );
        break;
      case "missile":
        setCredits( credits + DEFAULT_HARDPOINT_MISSILE_COST );
        break;
      case "shield":
          setCredits( credits + DEFAULT_HARDPOINT_SHIELD_COST );
        break;
      case "gen_1":
        setCredits( credits + DEFAULT_HARDPOINT_GEN_1_COST );
        break;
      case "gen_2":
        setCredits( credits + DEFAULT_HARDPOINT_GEN_2_COST );
        break;
      default:
        console.log("error");
        break;
    }
  }

  const [storeDisplayState, storeDisplayDispatch] = useReducer(StoreDisplayReducer, { displayItem: "Laser", displayPrice: 150, hullDamage: 20, shieldDamage: 100, shieldBuffer: 0, generatePower: 0 });
  const [warningMessage, setWarningMessage] = useState("");


  switch(gameState){
    case L_DRYDOCK_SCREEN_STATE:
      currentGameState = <ScrollView>
                          <Text style={styles.titleText}>Total Power Generated: {boatState.totalPower}</Text>
                          <Text style={styles.titleText}>Total Shield Capacity: {boatState.totalShields}</Text>
                          <Text>{warningMessage}</Text>
                          <View style={styles.view}>
                            <Hardpoint
                              assignHardpoint={ () => {   if (credits - DEFAULT_HARDPOINT_LASER_COST < 0){
                                                            setWarningMessage("WARNING!!! Out of Credits")
                                                            return;
                                                          }
                                                          boatDispatch( {type: "AssignHardpoint1",
                                                                payload: DEFAULT_LASER_PATH, payload2: "laser"})
                                                          setCredits( credits - DEFAULT_HARDPOINT_LASER_COST );
                                                        }}
                              imageSource={boatState.hardpoint_1_text}
                            />
                            <Hardpoint
                              assignHardpoint={ () => { if (credits - DEFAULT_HARDPOINT_LASER_COST < 0){
                                                          setWarningMessage("WARNING!!! Out of Credits")
                                                          return;
                                                        }
                                                        boatDispatch( {type: "AssignHardpoint2",
                                                              payload: DEFAULT_LASER_PATH, payload2: "laser"})  
                                                        setCredits( credits - DEFAULT_HARDPOINT_LASER_COST );     
                                                      }}
                                        
                              imageSource={boatState.hardpoint_2_text}
                            />
                            <Hardpoint 
                              assignHardpoint={ () => { if (credits - DEFAULT_HARDPOINT_LASER_COST < 0){
                                                          setWarningMessage("WARNING!!! Out of Credits")
                                                          return;
                                                        }
                                                        boatDispatch( {type: "AssignHardpoint3",
                                                              payload: DEFAULT_LASER_PATH, payload2: "laser"})  
                                                        setCredits( credits - DEFAULT_HARDPOINT_LASER_COST );     
                                                      }}

                              imageSource={boatState.hardpoint_3_text}
                            />
                            <Hardpoint 
                              assignHardpoint={ () => { if (credits - DEFAULT_HARDPOINT_LASER_COST < 0){
                                                          setWarningMessage("WARNING!!! Out of Credits")
                                                          return;
                                                        }
                                                        boatDispatch( {type: "AssignHardpoint4",
                                                              payload: DEFAULT_LASER_PATH, payload2: "laser"})  
                                                        setCredits( credits - DEFAULT_HARDPOINT_LASER_COST );     
                                                      }}
        
                              imageSource={boatState.hardpoint_4_text}
                            />
                            <Hardpoint 
                              assignHardpoint={ () => { if (credits - DEFAULT_HARDPOINT_LASER_COST < 0){
                                                          setWarningMessage("WARNING!!! Out of Credits")
                                                          return;
                                                        }
                                                        boatDispatch( {type: "AssignHardpoint5",
                                                              payload: DEFAULT_LASER_PATH, payload2: "laser"})  
                                                        setCredits( credits - DEFAULT_HARDPOINT_LASER_COST );     
                                                      }}
        
                              imageSource={boatState.hardpoint_5_text}
                            />
                            <Hardpoint 
                              assignHardpoint={ () => { if (credits - DEFAULT_HARDPOINT_LASER_COST < 0){
                                                          setWarningMessage("WARNING!!! Out of Credits")
                                                          return;
                                                        }
                                                        boatDispatch( {type: "AssignHardpoint6",
                                                              payload: DEFAULT_LASER_PATH, payload2: "laser"})  
                                                        setCredits( credits - DEFAULT_HARDPOINT_LASER_COST );     
                                                      }}
        
                              imageSource={boatState.hardpoint_6_text}
                            />
                          </View>

                          {/* used Google to get euro symbol */}
                          <Text style={styles.titleText}>Remaining Credits: {credits} €</Text>

                          <Text style={styles.titleText}>Store:</Text>
                          <Text style={styles.titleText}>Currently Selected: {storeDisplayState.displayItem}</Text>
                          <Text style={styles.titleText}>Price: {storeDisplayState.displayPrice} €</Text>
                          <Text style={styles.titleText}>Hull Damage: {storeDisplayState.hullDamage}, Shield Damage: {storeDisplayState.shieldDamage}</Text>
                          <Text style={styles.titleText}>Shield Buffer: {storeDisplayState.shieldBuffer}, Power Generated: {storeDisplayState.generatePower}</Text>
                          <View style={styles.storeView}>
                            <TouchableOpacity style={styles.hardpoint} onPress={() => {   storeDisplayDispatch( {type: "ChangeDisplayItem", payload: "Laser"} )
                                                                                          storeDisplayDispatch( {type: "ChangeDisplayPrice", payload: DEFAULT_HARDPOINT_LASER_COST} )
                                                                                          storeDisplayDispatch( {type: "ChangeHullDamage", payload: DEFAULT_HARDPOINT_LASER_HULL_DAMAGE})
                                                                                          storeDisplayDispatch( {type: "ChangeShieldDamage", payload: DEFAULT_HARDPOINT_LASER_SHIELD_DAMAGE})
                                                                                          storeDisplayDispatch( {type: "ChangeShieldBuffer", payload: 0})
                                                                                          storeDisplayDispatch( {type: "ChangeGeneratePower", payload: 0})
                                                                                          setGameState(L_DRYDOCK_SCREEN_STATE); }}>
                              <Image source={require(`../../assets/hardpoints/Laser.jpg`)}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.hardpoint} onPress={() => {   storeDisplayDispatch( {type: "ChangeDisplayItem", payload: "Missile"} )
                                                                                          storeDisplayDispatch( {type: "ChangeDisplayPrice", payload: DEFAULT_HARDPOINT_MISSILE_COST} )
                                                                                          storeDisplayDispatch( {type: "ChangeHullDamage", payload: DEFAULT_HARDPOINT_MISSILE_HULL_DAMAGE})
                                                                                          storeDisplayDispatch( {type: "ChangeShieldDamage", payload: DEFAULT_HARDPOINT_MISSILE_SHIELD_DAMAGE})
                                                                                          storeDisplayDispatch( {type: "ChangeShieldBuffer", payload: 0})
                                                                                          storeDisplayDispatch( {type: "ChangeGeneratePower", payload: 0})
                                                                                          setGameState(M_DRYDOCK_SCREEN_STATE); }}>
                              <Image source={require(`../../assets/hardpoints/Missile.jpg`)}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.hardpoint} onPress={() => {   storeDisplayDispatch( {type: "ChangeDisplayItem", payload: "Shield"} )
                                                                                          storeDisplayDispatch( {type: "ChangeDisplayPrice", payload: DEFAULT_HARDPOINT_SHIELD_COST} )
                                                                                          storeDisplayDispatch( {type: "ChangeHullDamage", payload: 0})
                                                                                          storeDisplayDispatch( {type: "ChangeShieldDamage", payload: 0})
                                                                                          storeDisplayDispatch( {type: "ChangeShieldBuffer", payload: DEFAULT_HARDPOINT_SHIELD_POWER})
                                                                                          storeDisplayDispatch( {type: "ChangeGeneratePower", payload: 0})
                                                                                          setGameState(S_DRYDOCK_SCREEN_STATE); }}>
                              <Image source={require(`../../assets/hardpoints/Shield.jpg`)}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.hardpoint} onPress={() => {   storeDisplayDispatch( {type: "ChangeDisplayItem", payload: "Generator Lvl.1"} )
                                                                                          storeDisplayDispatch( {type: "ChangeDisplayPrice", payload: DEFAULT_HARDPOINT_GEN_1_COST} )
                                                                                          storeDisplayDispatch( {type: "ChangeHullDamage", payload: 0})
                                                                                          storeDisplayDispatch( {type: "ChangeShieldDamage", payload: 0})
                                                                                          storeDisplayDispatch( {type: "ChangeShieldBuffer", payload: 0})
                                                                                          storeDisplayDispatch( {type: "ChangeGeneratePower", payload: DEFAULT_HARDPOINT_GEN_1_POWER})
                                                                                          setGameState(G1_DRYDOCK_SCREEN_STATE); }}>
                              <Image source={require(`../../assets/hardpoints/Gen_1.jpg`)}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.hardpoint} onPress={() => {   storeDisplayDispatch( {type: "ChangeDisplayItem", payload: "Generator Lvl.2"} )
                                                                                          storeDisplayDispatch( {type: "ChangeDisplayPrice", payload: DEFAULT_HARDPOINT_GEN_2_COST} )
                                                                                          storeDisplayDispatch( {type: "ChangeHullDamage", payload: 0})
                                                                                          storeDisplayDispatch( {type: "ChangeShieldDamage", payload: 0})
                                                                                          storeDisplayDispatch( {type: "ChangeShieldBuffer", payload: 0})
                                                                                          storeDisplayDispatch( {type: "ChangeGeneratePower", payload: DEFAULT_HARDPOINT_GEN_2_POWER})
                                                                                          setGameState(G2_DRYDOCK_SCREEN_STATE); }}>
                              <Image source={require(`../../assets/hardpoints/Gen_2.jpg`)}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.hardpoint} onPress={() => {   storeDisplayDispatch( {type: "ChangeDisplayItem", payload: "Sell"} )
                                                                                          storeDisplayDispatch( {type: "ChangeDisplayPrice", payload: 0} )
                                                                                          storeDisplayDispatch( {type: "ChangeHullDamage", payload: 0})
                                                                                          storeDisplayDispatch( {type: "ChangeShieldDamage", payload: 0})
                                                                                          storeDisplayDispatch( {type: "ChangeShieldBuffer", payload: 0})
                                                                                          storeDisplayDispatch( {type: "ChangeGeneratePower", payload: 0})
                                                                                          setGameState(SELL_DRYDOCK_SCREEN_STATE); }}>
                              <Image source={require(`../../assets/hardpoints/Sell.jpg`)}/>
                            </TouchableOpacity>
                          </View>

                          {credits > 0 ?
                          <Text>Better Make Complete Use of Your Funds. You Never Know When You'll Catch A Break.</Text>
                          : <TouchableOpacity style={{borderWidth: 3, borderColor:"purple"}} onPress={() => setGameState(SPACE_SCREEN_STATE)}><Text>Get Set. Ready. Blast Off!</Text></TouchableOpacity>}
                        </ScrollView>
      break;

    case M_DRYDOCK_SCREEN_STATE:
      currentGameState = <ScrollView>
                          <Text style={styles.titleText}>Total Power Generated: {boatState.totalPower}</Text>
                          <Text style={styles.titleText}>Total Shield Capacity: {boatState.totalShields}</Text>
                          <Text>{warningMessage}</Text>
                          <View style={styles.view}>
                            <Hardpoint
                              assignHardpoint={ () => {   if (credits - DEFAULT_HARDPOINT_MISSILE_COST < 0){
                                                            setWarningMessage("WARNING!!! Out of Credits")
                                                            return;
                                                          }
                                                          boatDispatch( {type: "AssignHardpoint1",
                                                                payload: DEFAULT_MISSILE_PATH, payload2: "missile"})
                                                          setCredits( credits - DEFAULT_HARDPOINT_MISSILE_COST );
                                                        }}
                              imageSource={boatState.hardpoint_1_text}
                            />
                            <Hardpoint
                              assignHardpoint={ () => {   if (credits - DEFAULT_HARDPOINT_MISSILE_COST < 0){
                                                            setWarningMessage("WARNING!!! Out of Credits")
                                                            return;
                                                          }
                                                          boatDispatch( {type: "AssignHardpoint2",
                                                                payload: DEFAULT_MISSILE_PATH, payload2: "missile"})
                                                          setCredits( credits - DEFAULT_HARDPOINT_MISSILE_COST );
                                                        }}
                              imageSource={boatState.hardpoint_2_text}
                            />
                            <Hardpoint
                              assignHardpoint={ () => { if (credits - DEFAULT_HARDPOINT_MISSILE_COST < 0){
                                                          setWarningMessage("WARNING!!! Out of Credits")
                                                          return;
                                                        }
                                                        boatDispatch( {type: "AssignHardpoint3",
                                                              payload: DEFAULT_MISSILE_PATH, payload2: "missile"})  
                                                        setCredits( credits - DEFAULT_HARDPOINT_MISSILE_COST );     
                                                      }}
                                        
                              imageSource={boatState.hardpoint_3_text}
                            />
                            <Hardpoint 
                              assignHardpoint={ () => { if (credits - DEFAULT_HARDPOINT_MISSILE_COST < 0){
                                                          setWarningMessage("WARNING!!! Out of Credits")
                                                          return;
                                                        }
                                                        boatDispatch( {type: "AssignHardpoint4",
                                                              payload: DEFAULT_MISSILE_PATH, payload2: "missile"})  
                                                        setCredits( credits - DEFAULT_HARDPOINT_MISSILE_COST );     
                                                      }}

                              imageSource={boatState.hardpoint_4_text}
                            />
                            <Hardpoint 
                              assignHardpoint={ () => { if (credits - DEFAULT_HARDPOINT_MISSILE_COST < 0){
                                                          setWarningMessage("WARNING!!! Out of Credits")
                                                          return;
                                                        }
                                                        boatDispatch( {type: "AssignHardpoint5",
                                                              payload: DEFAULT_MISSILE_PATH, payload2: "missile"})  
                                                        setCredits( credits - DEFAULT_HARDPOINT_MISSILE_COST );     
                                                      }}
        
                              imageSource={boatState.hardpoint_5_text}
                            />
                            <Hardpoint 
                              assignHardpoint={ () => { if (credits - DEFAULT_HARDPOINT_MISSILE_COST < 0){
                                                          setWarningMessage("WARNING!!! Out of Credits")
                                                          return;
                                                        }
                                                        boatDispatch( {type: "AssignHardpoint6",
                                                              payload: DEFAULT_MISSILE_PATH, payload2: "missile"})
                                                        setCredits( credits - DEFAULT_HARDPOINT_MISSILE_COST );     
                                                      }}
        
                              imageSource={boatState.hardpoint_6_text}
                            />
                          </View>

                          <Text style={styles.titleText}>Remaining Credits: {credits} €</Text>

                          <Text style={styles.titleText}>Store:</Text>
                          <Text style={styles.titleText}>Currently Selected: {storeDisplayState.displayItem}</Text>
                          <Text style={styles.titleText}>Price: {storeDisplayState.displayPrice} €</Text>
                          <Text style={styles.titleText}>Hull Damage: {storeDisplayState.hullDamage}, Shield Damage: {storeDisplayState.shieldDamage}</Text>
                          <Text style={styles.titleText}>Shield Buffer: {storeDisplayState.shieldBuffer}, Power Generated: {storeDisplayState.generatePower}</Text>
                          <View style={styles.storeView}>
                            <TouchableOpacity style={styles.hardpoint} onPress={() => {   storeDisplayDispatch( {type: "ChangeDisplayItem", payload: "Laser"} )
                                                                                          storeDisplayDispatch( {type: "ChangeDisplayPrice", payload: DEFAULT_HARDPOINT_LASER_COST} )
                                                                                          storeDisplayDispatch( {type: "ChangeHullDamage", payload: DEFAULT_HARDPOINT_LASER_HULL_DAMAGE})
                                                                                          storeDisplayDispatch( {type: "ChangeShieldDamage", payload: DEFAULT_HARDPOINT_LASER_SHIELD_DAMAGE})
                                                                                          storeDisplayDispatch( {type: "ChangeShieldBuffer", payload: 0})
                                                                                          storeDisplayDispatch( {type: "ChangeGeneratePower", payload: 0})
                                                                                          setGameState(L_DRYDOCK_SCREEN_STATE); }}>
                              <Image source={require(`../../assets/hardpoints/Laser.jpg`)}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.hardpoint} onPress={() => {   storeDisplayDispatch( {type: "ChangeDisplayItem", payload: "Missile"} )
                                                                                          storeDisplayDispatch( {type: "ChangeDisplayPrice", payload: DEFAULT_HARDPOINT_MISSILE_COST} )
                                                                                          storeDisplayDispatch( {type: "ChangeHullDamage", payload: DEFAULT_HARDPOINT_MISSILE_HULL_DAMAGE})
                                                                                          storeDisplayDispatch( {type: "ChangeShieldDamage", payload: DEFAULT_HARDPOINT_MISSILE_SHIELD_DAMAGE})
                                                                                          storeDisplayDispatch( {type: "ChangeShieldBuffer", payload: 0})
                                                                                          storeDisplayDispatch( {type: "ChangeGeneratePower", payload: 0})
                                                                                          setGameState(M_DRYDOCK_SCREEN_STATE); }}>
                              <Image source={require(`../../assets/hardpoints/Missile.jpg`)}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.hardpoint} onPress={() => {   storeDisplayDispatch( {type: "ChangeDisplayItem", payload: "Shield"} )
                                                                                          storeDisplayDispatch( {type: "ChangeDisplayPrice", payload: DEFAULT_HARDPOINT_SHIELD_COST} )
                                                                                          storeDisplayDispatch( {type: "ChangeHullDamage", payload: 0})
                                                                                          storeDisplayDispatch( {type: "ChangeShieldDamage", payload: 0})
                                                                                          storeDisplayDispatch( {type: "ChangeShieldBuffer", payload: DEFAULT_HARDPOINT_SHIELD_POWER})
                                                                                          storeDisplayDispatch( {type: "ChangeGeneratePower", payload: 0})
                                                                                          setGameState(S_DRYDOCK_SCREEN_STATE); }}>
                              <Image source={require(`../../assets/hardpoints/Shield.jpg`)}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.hardpoint} onPress={() => {   storeDisplayDispatch( {type: "ChangeDisplayItem", payload: "Generator Lvl.1"} )
                                                                                          storeDisplayDispatch( {type: "ChangeDisplayPrice", payload: DEFAULT_HARDPOINT_GEN_1_COST} )
                                                                                          storeDisplayDispatch( {type: "ChangeHullDamage", payload: 0})
                                                                                          storeDisplayDispatch( {type: "ChangeShieldDamage", payload: 0})
                                                                                          storeDisplayDispatch( {type: "ChangeShieldBuffer", payload: 0})
                                                                                          storeDisplayDispatch( {type: "ChangeGeneratePower", payload: DEFAULT_HARDPOINT_GEN_1_POWER})
                                                                                          setGameState(G1_DRYDOCK_SCREEN_STATE); }}>
                              <Image source={require(`../../assets/hardpoints/Gen_1.jpg`)}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.hardpoint} onPress={() => {   storeDisplayDispatch( {type: "ChangeDisplayItem", payload: "Generator Lvl.2"} )
                                                                                          storeDisplayDispatch( {type: "ChangeDisplayPrice", payload: DEFAULT_HARDPOINT_GEN_2_COST} )
                                                                                          storeDisplayDispatch( {type: "ChangeHullDamage", payload: 0})
                                                                                          storeDisplayDispatch( {type: "ChangeShieldDamage", payload: 0})
                                                                                          storeDisplayDispatch( {type: "ChangeShieldBuffer", payload: 0})
                                                                                          storeDisplayDispatch( {type: "ChangeGeneratePower", payload: DEFAULT_HARDPOINT_GEN_2_POWER})
                                                                                          setGameState(G2_DRYDOCK_SCREEN_STATE); }}>
                              <Image source={require(`../../assets/hardpoints/Gen_2.jpg`)}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.hardpoint} onPress={() => {   storeDisplayDispatch( {type: "ChangeDisplayItem", payload: "Sell"} )
                                                                                          storeDisplayDispatch( {type: "ChangeDisplayPrice", payload: 0} )
                                                                                          storeDisplayDispatch( {type: "ChangeHullDamage", payload: 0})
                                                                                          storeDisplayDispatch( {type: "ChangeShieldDamage", payload: 0})
                                                                                          storeDisplayDispatch( {type: "ChangeShieldBuffer", payload: 0})
                                                                                          storeDisplayDispatch( {type: "ChangeGeneratePower", payload: 0})
                                                                                          setGameState(SELL_DRYDOCK_SCREEN_STATE); }}>
                              <Image source={require(`../../assets/hardpoints/Sell.jpg`)}/>
                            </TouchableOpacity>
                          </View>

                          {credits > 0 ?
                          <Text>Better Make Complete Use of Your Funds. You Never Know When You'll Catch A Break.</Text>
                          : <TouchableOpacity style={{borderWidth: 3, borderColor:"purple"}} onPress={() => setGameState(SPACE_SCREEN_STATE)}><Text>Get Set. Ready. Blast Off!</Text></TouchableOpacity>}
                        </ScrollView>
      break;
    case S_DRYDOCK_SCREEN_STATE:
      currentGameState = <ScrollView>
                          <Text style={styles.titleText}>Total Power Generated: {boatState.totalPower}</Text>
                          <Text style={styles.titleText}>Total Shield Capacity: {boatState.totalShields}</Text>
                          <Text>{warningMessage}</Text>
                          <View style={styles.view}>
                            <Hardpoint
                              assignHardpoint={ () => {   if (credits - DEFAULT_HARDPOINT_SHIELD_COST < 0){
                                                            setWarningMessage("WARNING!!! Out of Credits")
                                                            return;
                                                          }
                                                          boatDispatch( {type: "AssignHardpoint1",
                                                                payload: DEFAULT_SHIELD_PATH, payload2: "shield"})
                                                          setCredits( credits - DEFAULT_HARDPOINT_SHIELD_COST );
                                                        }}
                              imageSource={boatState.hardpoint_1_text}
                            />
                            <Hardpoint
                              assignHardpoint={ () => {   if (credits - DEFAULT_HARDPOINT_SHIELD_COST < 0){
                                                            setWarningMessage("WARNING!!! Out of Credits")
                                                            return;
                                                          }
                                                          boatDispatch( {type: "AssignHardpoint2",
                                                                payload: DEFAULT_SHIELD_PATH, payload2: "shield"})
                                                          setCredits( credits - DEFAULT_HARDPOINT_SHIELD_COST );
                                                        }}
                              imageSource={boatState.hardpoint_2_text}
                            />
                            <Hardpoint
                              assignHardpoint={ () => { if (credits - DEFAULT_HARDPOINT_SHIELD_COST < 0){
                                                          setWarningMessage("WARNING!!! Out of Credits")
                                                          return;
                                                        }
                                                        boatDispatch( {type: "AssignHardpoint3",
                                                              payload: DEFAULT_SHIELD_PATH, payload2: "shield"})  
                                                        setCredits( credits - DEFAULT_HARDPOINT_SHIELD_COST );     
                                                      }}
                                        
                              imageSource={boatState.hardpoint_3_text}
                            />
                            <Hardpoint 
                              assignHardpoint={ () => { if (credits - DEFAULT_HARDPOINT_SHIELD_COST < 0){
                                                          setWarningMessage("WARNING!!! Out of Credits")
                                                          return;
                                                        }
                                                        boatDispatch( {type: "AssignHardpoint4",
                                                              payload: DEFAULT_SHIELD_PATH, payload2: "shield"})  
                                                        setCredits( credits - DEFAULT_HARDPOINT_SHIELD_COST );     
                                                      }}

                              imageSource={boatState.hardpoint_4_text}
                            />
                            <Hardpoint 
                              assignHardpoint={ () => { if (credits - DEFAULT_HARDPOINT_SHIELD_COST < 0){
                                                          setWarningMessage("WARNING!!! Out of Credits")
                                                          return;
                                                        }
                                                        boatDispatch( {type: "AssignHardpoint5",
                                                              payload: DEFAULT_SHIELD_PATH, payload2: "shield"})  
                                                        setCredits( credits - DEFAULT_HARDPOINT_SHIELD_COST );     
                                                      }}
        
                              imageSource={boatState.hardpoint_5_text}
                            />
                            <Hardpoint 
                              assignHardpoint={ () => { if (credits - DEFAULT_HARDPOINT_SHIELD_COST < 0){
                                                          setWarningMessage("WARNING!!! Out of Credits")
                                                          return;
                                                        }
                                                        boatDispatch( {type: "AssignHardpoint6",
                                                              payload: DEFAULT_SHIELD_PATH, payload2: "shield"})
                                                        setCredits( credits - DEFAULT_HARDPOINT_SHIELD_COST );     
                                                      }}
        
                              imageSource={boatState.hardpoint_6_text}
                            />
                          </View>

                          <Text style={styles.titleText}>Remaining Credits: {credits} €</Text>

                          <Text style={styles.titleText}>Store:</Text>
                          <Text style={styles.titleText}>Currently Selected: {storeDisplayState.displayItem}</Text>
                          <Text style={styles.titleText}>Price: {storeDisplayState.displayPrice} €</Text>
                          <Text style={styles.titleText}>Hull Damage: {storeDisplayState.hullDamage}, Shield Damage: {storeDisplayState.shieldDamage}</Text>
                          <Text style={styles.titleText}>Shield Buffer: {storeDisplayState.shieldBuffer}, Power Generated: {storeDisplayState.generatePower}</Text>
                          <View style={styles.storeView}>
                            <TouchableOpacity style={styles.hardpoint} onPress={() => {   storeDisplayDispatch( {type: "ChangeDisplayItem", payload: "Laser"} )
                                                                                          storeDisplayDispatch( {type: "ChangeDisplayPrice", payload: DEFAULT_HARDPOINT_LASER_COST} )
                                                                                          storeDisplayDispatch( {type: "ChangeHullDamage", payload: DEFAULT_HARDPOINT_LASER_HULL_DAMAGE})
                                                                                          storeDisplayDispatch( {type: "ChangeShieldDamage", payload: DEFAULT_HARDPOINT_LASER_SHIELD_DAMAGE})
                                                                                          storeDisplayDispatch( {type: "ChangeShieldBuffer", payload: 0})
                                                                                          storeDisplayDispatch( {type: "ChangeGeneratePower", payload: 0})
                                                                                          setGameState(L_DRYDOCK_SCREEN_STATE); }}>
                              <Image source={require(`../../assets/hardpoints/Laser.jpg`)}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.hardpoint} onPress={() => {   storeDisplayDispatch( {type: "ChangeDisplayItem", payload: "Missile"} )
                                                                                          storeDisplayDispatch( {type: "ChangeDisplayPrice", payload: DEFAULT_HARDPOINT_MISSILE_COST} )
                                                                                          storeDisplayDispatch( {type: "ChangeHullDamage", payload: DEFAULT_HARDPOINT_MISSILE_HULL_DAMAGE})
                                                                                          storeDisplayDispatch( {type: "ChangeShieldDamage", payload: DEFAULT_HARDPOINT_MISSILE_SHIELD_DAMAGE})
                                                                                          storeDisplayDispatch( {type: "ChangeShieldBuffer", payload: 0})
                                                                                          storeDisplayDispatch( {type: "ChangeGeneratePower", payload: 0})
                                                                                          setGameState(M_DRYDOCK_SCREEN_STATE); }}>
                              <Image source={require(`../../assets/hardpoints/Missile.jpg`)}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.hardpoint} onPress={() => {   storeDisplayDispatch( {type: "ChangeDisplayItem", payload: "Shield"} )
                                                                                          storeDisplayDispatch( {type: "ChangeDisplayPrice", payload: DEFAULT_HARDPOINT_SHIELD_COST} )
                                                                                          storeDisplayDispatch( {type: "ChangeHullDamage", payload: 0})
                                                                                          storeDisplayDispatch( {type: "ChangeShieldDamage", payload: 0})
                                                                                          storeDisplayDispatch( {type: "ChangeShieldBuffer", payload: DEFAULT_HARDPOINT_SHIELD_POWER})
                                                                                          storeDisplayDispatch( {type: "ChangeGeneratePower", payload: 0})
                                                                                          setGameState(S_DRYDOCK_SCREEN_STATE); }}>
                              <Image source={require(`../../assets/hardpoints/Shield.jpg`)}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.hardpoint} onPress={() => {   storeDisplayDispatch( {type: "ChangeDisplayItem", payload: "Generator Lvl.1"} )
                                                                                          storeDisplayDispatch( {type: "ChangeDisplayPrice", payload: DEFAULT_HARDPOINT_GEN_1_COST} )
                                                                                          storeDisplayDispatch( {type: "ChangeHullDamage", payload: 0})
                                                                                          storeDisplayDispatch( {type: "ChangeShieldDamage", payload: 0})
                                                                                          storeDisplayDispatch( {type: "ChangeShieldBuffer", payload: 0})
                                                                                          storeDisplayDispatch( {type: "ChangeGeneratePower", payload: DEFAULT_HARDPOINT_GEN_1_POWER})
                                                                                          setGameState(G1_DRYDOCK_SCREEN_STATE); }}>
                              <Image source={require(`../../assets/hardpoints/Gen_1.jpg`)}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.hardpoint} onPress={() => {   storeDisplayDispatch( {type: "ChangeDisplayItem", payload: "Generator Lvl.2"} )
                                                                                          storeDisplayDispatch( {type: "ChangeDisplayPrice", payload: DEFAULT_HARDPOINT_GEN_2_COST} )
                                                                                          storeDisplayDispatch( {type: "ChangeHullDamage", payload: 0})
                                                                                          storeDisplayDispatch( {type: "ChangeShieldDamage", payload: 0})
                                                                                          storeDisplayDispatch( {type: "ChangeShieldBuffer", payload: 0})
                                                                                          storeDisplayDispatch( {type: "ChangeGeneratePower", payload: DEFAULT_HARDPOINT_GEN_2_POWER})
                                                                                          setGameState(G2_DRYDOCK_SCREEN_STATE); }}>
                              <Image source={require(`../../assets/hardpoints/Gen_2.jpg`)}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.hardpoint} onPress={() => {   storeDisplayDispatch( {type: "ChangeDisplayItem", payload: "Sell"} )
                                                                                          storeDisplayDispatch( {type: "ChangeDisplayPrice", payload: 0} )
                                                                                          storeDisplayDispatch( {type: "ChangeHullDamage", payload: 0})
                                                                                          storeDisplayDispatch( {type: "ChangeShieldDamage", payload: 0})
                                                                                          storeDisplayDispatch( {type: "ChangeShieldBuffer", payload: 0})
                                                                                          storeDisplayDispatch( {type: "ChangeGeneratePower", payload: 0})
                                                                                          setGameState(SELL_DRYDOCK_SCREEN_STATE); }}>
                              <Image source={require(`../../assets/hardpoints/Sell.jpg`)}/>
                            </TouchableOpacity>
                          </View>

                          {credits > 0 ?
                          <Text>Better Make Complete Use of Your Funds. You Never Know When You'll Catch A Break.</Text>
                          : <TouchableOpacity style={{borderWidth: 3, borderColor:"purple"}} onPress={() => setGameState(SPACE_SCREEN_STATE)}><Text>Get Set. Ready. Blast Off!</Text></TouchableOpacity>}
                        </ScrollView>
      break;
    case G1_DRYDOCK_SCREEN_STATE:
      currentGameState = <ScrollView>
                          <Text style={styles.titleText}>Total Power Generated: {boatState.totalPower}</Text>
                          <Text style={styles.titleText}>Total Shield Capacity: {boatState.totalShields}</Text>
                          <Text>{warningMessage}</Text>
                          <View style={styles.view}>
                            <Hardpoint
                              assignHardpoint={ () => {   if (credits - DEFAULT_HARDPOINT_GEN_1_COST < 0){
                                                            setWarningMessage("WARNING!!! Out of Credits")
                                                            return;
                                                          }
                                                          boatDispatch( {type: "AssignHardpoint1",
                                                                payload: DEFAULT_GEN_1_PATH, payload2: "gen_1"})
                                                          setCredits( credits - DEFAULT_HARDPOINT_GEN_1_COST );
                                                        }}
                              imageSource={boatState.hardpoint_1_text}
                            />
                            <Hardpoint
                              assignHardpoint={ () => {   if (credits - DEFAULT_HARDPOINT_GEN_1_COST < 0){
                                                            setWarningMessage("WARNING!!! Out of Credits")
                                                            return;
                                                          }
                                                          boatDispatch( {type: "AssignHardpoint2",
                                                                payload: DEFAULT_GEN_1_PATH, payload2: "gen_1"})
                                                          setCredits( credits - DEFAULT_HARDPOINT_GEN_1_COST );
                                                        }}
                              imageSource={boatState.hardpoint_2_text}
                            />
                            <Hardpoint
                              assignHardpoint={ () => { if (credits - DEFAULT_HARDPOINT_GEN_1_COST < 0){
                                                          setWarningMessage("WARNING!!! Out of Credits")
                                                          return;
                                                        }
                                                        boatDispatch( {type: "AssignHardpoint3",
                                                              payload: DEFAULT_GEN_1_PATH, payload2: "gen_1"})  
                                                        setCredits( credits - DEFAULT_HARDPOINT_GEN_1_COST );     
                                                      }}
                                        
                              imageSource={boatState.hardpoint_3_text}
                            />
                            <Hardpoint 
                              assignHardpoint={ () => { if (credits - DEFAULT_HARDPOINT_GEN_1_COST < 0){
                                                          setWarningMessage("WARNING!!! Out of Credits")
                                                          return;
                                                        }
                                                        boatDispatch( {type: "AssignHardpoint4",
                                                              payload: DEFAULT_GEN_1_PATH, payload2: "gen_1"})  
                                                        setCredits( credits - DEFAULT_HARDPOINT_GEN_1_COST );     
                                                      }}

                              imageSource={boatState.hardpoint_4_text}
                            />
                            <Hardpoint 
                              assignHardpoint={ () => { if (credits - DEFAULT_HARDPOINT_GEN_1_COST < 0){
                                                          setWarningMessage("WARNING!!! Out of Credits")
                                                          return;
                                                        }
                                                        boatDispatch( {type: "AssignHardpoint5",
                                                              payload: DEFAULT_GEN_1_PATH, payload2: "gen_1"})  
                                                        setCredits( credits - DEFAULT_HARDPOINT_GEN_1_COST );     
                                                      }}
        
                              imageSource={boatState.hardpoint_5_text}
                            />
                            <Hardpoint 
                              assignHardpoint={ () => { if (credits - DEFAULT_HARDPOINT_GEN_1_COST < 0){
                                                          setWarningMessage("WARNING!!! Out of Credits")
                                                          return;
                                                        }
                                                        boatDispatch( {type: "AssignHardpoint6",
                                                              payload: DEFAULT_GEN_1_PATH, payload2: "gen_1"})
                                                        setCredits( credits - DEFAULT_HARDPOINT_GEN_1_COST );     
                                                      }}
        
                              imageSource={boatState.hardpoint_6_text}
                            />
                          </View>

                          <Text style={styles.titleText}>Remaining Credits: {credits} €</Text>

                          <Text style={styles.titleText}>Store:</Text>
                          <Text style={styles.titleText}>Currently Selected: {storeDisplayState.displayItem}</Text>
                          <Text style={styles.titleText}>Price: {storeDisplayState.displayPrice} €</Text>
                          <Text style={styles.titleText}>Hull Damage: {storeDisplayState.hullDamage}, Shield Damage: {storeDisplayState.shieldDamage}</Text>
                          <Text style={styles.titleText}>Shield Buffer: {storeDisplayState.shieldBuffer}, Power Generated: {storeDisplayState.generatePower}</Text>
                          <View style={styles.storeView}>
                            <TouchableOpacity style={styles.hardpoint} onPress={() => {   storeDisplayDispatch( {type: "ChangeDisplayItem", payload: "Laser"} )
                                                                                          storeDisplayDispatch( {type: "ChangeDisplayPrice", payload: DEFAULT_HARDPOINT_LASER_COST} )
                                                                                          storeDisplayDispatch( {type: "ChangeHullDamage", payload: DEFAULT_HARDPOINT_LASER_HULL_DAMAGE})
                                                                                          storeDisplayDispatch( {type: "ChangeShieldDamage", payload: DEFAULT_HARDPOINT_LASER_SHIELD_DAMAGE})
                                                                                          storeDisplayDispatch( {type: "ChangeShieldBuffer", payload: 0})
                                                                                          storeDisplayDispatch( {type: "ChangeGeneratePower", payload: 0})
                                                                                          setGameState(L_DRYDOCK_SCREEN_STATE); }}>
                              <Image source={require(`../../assets/hardpoints/Laser.jpg`)}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.hardpoint} onPress={() => {   storeDisplayDispatch( {type: "ChangeDisplayItem", payload: "Missile"} )
                                                                                          storeDisplayDispatch( {type: "ChangeDisplayPrice", payload: DEFAULT_HARDPOINT_MISSILE_COST} )
                                                                                          storeDisplayDispatch( {type: "ChangeHullDamage", payload: DEFAULT_HARDPOINT_MISSILE_HULL_DAMAGE})
                                                                                          storeDisplayDispatch( {type: "ChangeShieldDamage", payload: DEFAULT_HARDPOINT_MISSILE_SHIELD_DAMAGE})
                                                                                          storeDisplayDispatch( {type: "ChangeShieldBuffer", payload: 0})
                                                                                          storeDisplayDispatch( {type: "ChangeGeneratePower", payload: 0})
                                                                                          setGameState(M_DRYDOCK_SCREEN_STATE); }}>
                              <Image source={require(`../../assets/hardpoints/Missile.jpg`)}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.hardpoint} onPress={() => {   storeDisplayDispatch( {type: "ChangeDisplayItem", payload: "Shield"} )
                                                                                          storeDisplayDispatch( {type: "ChangeDisplayPrice", payload: DEFAULT_HARDPOINT_SHIELD_COST} )
                                                                                          storeDisplayDispatch( {type: "ChangeHullDamage", payload: 0})
                                                                                          storeDisplayDispatch( {type: "ChangeShieldDamage", payload: 0})
                                                                                          storeDisplayDispatch( {type: "ChangeShieldBuffer", payload: DEFAULT_HARDPOINT_SHIELD_POWER})
                                                                                          storeDisplayDispatch( {type: "ChangeGeneratePower", payload: 0})
                                                                                          setGameState(S_DRYDOCK_SCREEN_STATE); }}>
                              <Image source={require(`../../assets/hardpoints/Shield.jpg`)}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.hardpoint} onPress={() => {   storeDisplayDispatch( {type: "ChangeDisplayItem", payload: "Generator Lvl.1"} )
                                                                                          storeDisplayDispatch( {type: "ChangeDisplayPrice", payload: DEFAULT_HARDPOINT_GEN_1_COST} )
                                                                                          storeDisplayDispatch( {type: "ChangeHullDamage", payload: 0})
                                                                                          storeDisplayDispatch( {type: "ChangeShieldDamage", payload: 0})
                                                                                          storeDisplayDispatch( {type: "ChangeShieldBuffer", payload: 0})
                                                                                          storeDisplayDispatch( {type: "ChangeGeneratePower", payload: DEFAULT_HARDPOINT_GEN_1_POWER})
                                                                                          setGameState(G1_DRYDOCK_SCREEN_STATE); }}>
                              <Image source={require(`../../assets/hardpoints/Gen_1.jpg`)}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.hardpoint} onPress={() => {   storeDisplayDispatch( {type: "ChangeDisplayItem", payload: "Generator Lvl.2"} )
                                                                                          storeDisplayDispatch( {type: "ChangeDisplayPrice", payload: DEFAULT_HARDPOINT_GEN_2_COST} )
                                                                                          storeDisplayDispatch( {type: "ChangeHullDamage", payload: 0})
                                                                                          storeDisplayDispatch( {type: "ChangeShieldDamage", payload: 0})
                                                                                          storeDisplayDispatch( {type: "ChangeShieldBuffer", payload: 0})
                                                                                          storeDisplayDispatch( {type: "ChangeGeneratePower", payload: DEFAULT_HARDPOINT_GEN_2_POWER})
                                                                                          setGameState(G2_DRYDOCK_SCREEN_STATE); }}>
                              <Image source={require(`../../assets/hardpoints/Gen_2.jpg`)}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.hardpoint} onPress={() => {   storeDisplayDispatch( {type: "ChangeDisplayItem", payload: "Sell"} )
                                                                                          storeDisplayDispatch( {type: "ChangeDisplayPrice", payload: 0} )
                                                                                          storeDisplayDispatch( {type: "ChangeHullDamage", payload: 0})
                                                                                          storeDisplayDispatch( {type: "ChangeShieldDamage", payload: 0})
                                                                                          storeDisplayDispatch( {type: "ChangeShieldBuffer", payload: 0})
                                                                                          storeDisplayDispatch( {type: "ChangeGeneratePower", payload: 0})
                                                                                          setGameState(SELL_DRYDOCK_SCREEN_STATE); }}>
                              <Image source={require(`../../assets/hardpoints/Sell.jpg`)}/>
                            </TouchableOpacity>
                          </View>

                          {credits > 0 ?
                          <Text>Better Make Complete Use of Your Funds. You Never Know When You'll Catch A Break.</Text>
                          : <TouchableOpacity style={{borderWidth: 3, borderColor:"purple"}} onPress={() => setGameState(SPACE_SCREEN_STATE)}><Text>Get Set. Ready. Blast Off!</Text></TouchableOpacity>}
                        </ScrollView>
      break;
    case G2_DRYDOCK_SCREEN_STATE:
      currentGameState = <ScrollView>
                          <Text style={styles.titleText}>Total Power Generated: {boatState.totalPower}</Text>
                          <Text style={styles.titleText}>Total Shield Capacity: {boatState.totalShields}</Text>
                          <Text>{warningMessage}</Text>
                          <View style={styles.view}>
                            <Hardpoint
                              assignHardpoint={ () => {   if (credits - DEFAULT_HARDPOINT_GEN_2_COST < 0){
                                                            setWarningMessage("WARNING!!! Out of Credits")
                                                            return;
                                                          }
                                                          boatDispatch( {type: "AssignHardpoint1",
                                                                payload: DEFAULT_GEN_2_PATH, payload2: "gen_2"})
                                                          setCredits( credits - DEFAULT_HARDPOINT_GEN_2_COST );
                                                        }}
                              imageSource={boatState.hardpoint_1_text}
                            />
                            <Hardpoint
                              assignHardpoint={ () => {   if (credits - DEFAULT_HARDPOINT_GEN_2_COST < 0){
                                                            setWarningMessage("WARNING!!! Out of Credits")
                                                            return;
                                                          }
                                                          boatDispatch( {type: "AssignHardpoint2",
                                                                payload: DEFAULT_GEN_2_PATH, payload2: "gen_2"})
                                                          setCredits( credits - DEFAULT_HARDPOINT_GEN_2_COST );
                                                        }}
                              imageSource={boatState.hardpoint_2_text}
                            />
                            <Hardpoint
                              assignHardpoint={ () => { if (credits - DEFAULT_HARDPOINT_GEN_2_COST < 0){
                                                          setWarningMessage("WARNING!!! Out of Credits")
                                                          return;
                                                        }
                                                        boatDispatch( {type: "AssignHardpoint3",
                                                              payload: DEFAULT_GEN_2_PATH, payload2: "gen_2"})  
                                                        setCredits( credits - DEFAULT_HARDPOINT_GEN_2_COST );     
                                                      }}
                                        
                              imageSource={boatState.hardpoint_3_text}
                            />
                            <Hardpoint 
                              assignHardpoint={ () => { if (credits - DEFAULT_HARDPOINT_GEN_2_COST < 0){
                                                          setWarningMessage("WARNING!!! Out of Credits")
                                                          return;
                                                        }
                                                        boatDispatch( {type: "AssignHardpoint4",
                                                              payload: DEFAULT_GEN_2_PATH, payload2: "gen_2"})  
                                                        setCredits( credits - DEFAULT_HARDPOINT_GEN_2_COST );     
                                                      }}

                              imageSource={boatState.hardpoint_4_text}
                            />
                            <Hardpoint 
                              assignHardpoint={ () => { if (credits - DEFAULT_HARDPOINT_GEN_2_COST < 0){
                                                          setWarningMessage("WARNING!!! Out of Credits")
                                                          return;
                                                        }
                                                        boatDispatch( {type: "AssignHardpoint5",
                                                              payload: DEFAULT_GEN_2_PATH, payload2: "gen_2"})  
                                                        setCredits( credits - DEFAULT_HARDPOINT_GEN_2_COST );     
                                                      }}
        
                              imageSource={boatState.hardpoint_5_text}
                            />
                            <Hardpoint 
                              assignHardpoint={ () => { if (credits - DEFAULT_HARDPOINT_GEN_2_COST < 0){
                                                          setWarningMessage("WARNING!!! Out of Credits")
                                                          return;
                                                        }
                                                        boatDispatch( {type: "AssignHardpoint6",
                                                              payload: DEFAULT_GEN_2_PATH, payload2: "gen_2"})
                                                        setCredits( credits - DEFAULT_HARDPOINT_GEN_2_COST );     
                                                      }}
        
                              imageSource={boatState.hardpoint_6_text}
                            />
                          </View>

                          <Text style={styles.titleText}>Remaining Credits: {credits} €</Text>

                          <Text style={styles.titleText}>Store:</Text>
                          <Text style={styles.titleText}>Currently Selected: {storeDisplayState.displayItem}</Text>
                          <Text style={styles.titleText}>Price: {storeDisplayState.displayPrice} €</Text>
                          <Text style={styles.titleText}>Hull Damage: {storeDisplayState.hullDamage}, Shield Damage: {storeDisplayState.shieldDamage}</Text>
                          <Text style={styles.titleText}>Shield Buffer: {storeDisplayState.shieldBuffer}, Power Generated: {storeDisplayState.generatePower}</Text>
                          <View style={styles.storeView}>
                            <TouchableOpacity style={styles.hardpoint} onPress={() => {   storeDisplayDispatch( {type: "ChangeDisplayItem", payload: "Laser"} )
                                                                                          storeDisplayDispatch( {type: "ChangeDisplayPrice", payload: DEFAULT_HARDPOINT_LASER_COST} )
                                                                                          storeDisplayDispatch( {type: "ChangeHullDamage", payload: DEFAULT_HARDPOINT_LASER_HULL_DAMAGE})
                                                                                          storeDisplayDispatch( {type: "ChangeShieldDamage", payload: DEFAULT_HARDPOINT_LASER_SHIELD_DAMAGE})
                                                                                          storeDisplayDispatch( {type: "ChangeShieldBuffer", payload: 0})
                                                                                          storeDisplayDispatch( {type: "ChangeGeneratePower", payload: 0})
                                                                                          setGameState(L_DRYDOCK_SCREEN_STATE); }}>
                              <Image source={require(`../../assets/hardpoints/Laser.jpg`)}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.hardpoint} onPress={() => {   storeDisplayDispatch( {type: "ChangeDisplayItem", payload: "Missile"} )
                                                                                          storeDisplayDispatch( {type: "ChangeDisplayPrice", payload: DEFAULT_HARDPOINT_MISSILE_COST} )
                                                                                          storeDisplayDispatch( {type: "ChangeHullDamage", payload: DEFAULT_HARDPOINT_MISSILE_HULL_DAMAGE})
                                                                                          storeDisplayDispatch( {type: "ChangeShieldDamage", payload: DEFAULT_HARDPOINT_MISSILE_SHIELD_DAMAGE})
                                                                                          storeDisplayDispatch( {type: "ChangeShieldBuffer", payload: 0})
                                                                                          storeDisplayDispatch( {type: "ChangeGeneratePower", payload: 0})
                                                                                          setGameState(M_DRYDOCK_SCREEN_STATE); }}>
                              <Image source={require(`../../assets/hardpoints/Missile.jpg`)}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.hardpoint} onPress={() => {   storeDisplayDispatch( {type: "ChangeDisplayItem", payload: "Shield"} )
                                                                                          storeDisplayDispatch( {type: "ChangeDisplayPrice", payload: DEFAULT_HARDPOINT_SHIELD_COST} )
                                                                                          storeDisplayDispatch( {type: "ChangeHullDamage", payload: 0})
                                                                                          storeDisplayDispatch( {type: "ChangeShieldDamage", payload: 0})
                                                                                          storeDisplayDispatch( {type: "ChangeShieldBuffer", payload: DEFAULT_HARDPOINT_SHIELD_POWER})
                                                                                          storeDisplayDispatch( {type: "ChangeGeneratePower", payload: 0})
                                                                                          setGameState(S_DRYDOCK_SCREEN_STATE); }}>
                              <Image source={require(`../../assets/hardpoints/Shield.jpg`)}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.hardpoint} onPress={() => {   storeDisplayDispatch( {type: "ChangeDisplayItem", payload: "Generator Lvl.1"} )
                                                                                          storeDisplayDispatch( {type: "ChangeDisplayPrice", payload: DEFAULT_HARDPOINT_GEN_1_COST} )
                                                                                          storeDisplayDispatch( {type: "ChangeHullDamage", payload: 0})
                                                                                          storeDisplayDispatch( {type: "ChangeShieldDamage", payload: 0})
                                                                                          storeDisplayDispatch( {type: "ChangeShieldBuffer", payload: 0})
                                                                                          storeDisplayDispatch( {type: "ChangeGeneratePower", payload: DEFAULT_HARDPOINT_GEN_1_POWER})
                                                                                          setGameState(G1_DRYDOCK_SCREEN_STATE); }}>
                              <Image source={require(`../../assets/hardpoints/Gen_1.jpg`)}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.hardpoint} onPress={() => {   storeDisplayDispatch( {type: "ChangeDisplayItem", payload: "Generator Lvl.2"} )
                                                                                          storeDisplayDispatch( {type: "ChangeDisplayPrice", payload: DEFAULT_HARDPOINT_GEN_2_COST} )
                                                                                          storeDisplayDispatch( {type: "ChangeHullDamage", payload: 0})
                                                                                          storeDisplayDispatch( {type: "ChangeShieldDamage", payload: 0})
                                                                                          storeDisplayDispatch( {type: "ChangeShieldBuffer", payload: 0})
                                                                                          storeDisplayDispatch( {type: "ChangeGeneratePower", payload: DEFAULT_HARDPOINT_GEN_2_POWER})
                                                                                          setGameState(G2_DRYDOCK_SCREEN_STATE); }}>
                              <Image source={require(`../../assets/hardpoints/Gen_2.jpg`)}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.hardpoint} onPress={() => {   storeDisplayDispatch( {type: "ChangeDisplayItem", payload: "Sell"} )
                                                                                          storeDisplayDispatch( {type: "ChangeDisplayPrice", payload: 0} )
                                                                                          storeDisplayDispatch( {type: "ChangeHullDamage", payload: 0})
                                                                                          storeDisplayDispatch( {type: "ChangeShieldDamage", payload: 0})
                                                                                          storeDisplayDispatch( {type: "ChangeShieldBuffer", payload: 0})
                                                                                          storeDisplayDispatch( {type: "ChangeGeneratePower", payload: 0})
                                                                                          setGameState(SELL_DRYDOCK_SCREEN_STATE); }}>
                              <Image source={require(`../../assets/hardpoints/Sell.jpg`)}/>
                            </TouchableOpacity>
                          </View>

                          {credits > 0 ?
                          <Text>Better Make Complete Use of Your Funds. You Never Know When You'll Catch A Break.</Text>
                          : <TouchableOpacity style={{borderWidth: 3, borderColor:"purple"}} onPress={() => setGameState(SPACE_SCREEN_STATE)}><Text>Get Set. Ready. Blast Off!</Text></TouchableOpacity>}
                        </ScrollView>
      break;
    case SELL_DRYDOCK_SCREEN_STATE:
      currentGameState = <ScrollView>
                          <Text style={styles.titleText}>Total Power Generated: {boatState.totalPower}</Text>
                          <Text style={styles.titleText}>Total Shield Capacity: {boatState.totalShields}</Text>
                          <Text>{warningMessage}</Text>
                          <View style={styles.view}>
                            <Hardpoint
                              assignHardpoint={ () => { boatDispatch( {type: "AssignHardpoint1",
                                                              payload: DEFAULT_BLANK_PATH});
                                                              sellHardpoint(boatState.hardpoint_1);
                                                      }}
                              imageSource={boatState.hardpoint_1_text}
                            />
                            <Hardpoint
                              assignHardpoint={ () => { boatDispatch( {type: "AssignHardpoint2",
                                                              payload: DEFAULT_BLANK_PATH});
                                                              sellHardpoint(boatState.hardpoint_2);
                                                      }}
                              imageSource={boatState.hardpoint_2_text}
                            />
                            <Hardpoint
                              assignHardpoint={ () => { boatDispatch( {type: "AssignHardpoint3",
                                                              payload: DEFAULT_BLANK_PATH});
                                                              sellHardpoint(boatState.hardpoint_3);
                                                      }}
                                        
                              imageSource={boatState.hardpoint_3_text}
                            />
                            <Hardpoint 
                              assignHardpoint={ () => { boatDispatch( {type: "AssignHardpoint4",
                                                              payload: DEFAULT_BLANK_PATH});
                                                              sellHardpoint(boatState.hardpoint_4);
                                                      }}

                              imageSource={boatState.hardpoint_4_text}
                            />
                            <Hardpoint 
                              assignHardpoint={ () => { boatDispatch( {type: "AssignHardpoint3",
                                                              payload: DEFAULT_BLANK_PATH});
                                                              sellHardpoint(boatState.hardpoint_5);
                                                      }}
        
                              imageSource={boatState.hardpoint_5_text}
                            />
                            <Hardpoint 
                              assignHardpoint={ () => { boatDispatch( {type: "AssignHardpoint3",
                                                              payload: DEFAULT_BLANK_PATH});
                                                              sellHardpoint(boatState.hardpoint_6);
                                                      }}
        
                              imageSource={boatState.hardpoint_6_text}
                            />
                          </View>

                          <Text style={styles.titleText}>Remaining Credits: {credits} €</Text>

                          <Text style={styles.titleText}>Store:</Text>
                          <Text style={styles.titleText}>Currently Selected: {storeDisplayState.displayItem}</Text>
                          <Text style={styles.titleText}>Price: {storeDisplayState.displayPrice} €</Text>
                          <Text style={styles.titleText}>Hull Damage: {storeDisplayState.hullDamage}, Shield Damage: {storeDisplayState.shieldDamage}</Text>
                          <Text style={styles.titleText}>Shield Buffer: {storeDisplayState.shieldBuffer}, Power Generated: {storeDisplayState.generatePower}</Text>
                          <View style={styles.storeView}>
                            <TouchableOpacity style={styles.hardpoint} onPress={() => {   storeDisplayDispatch( {type: "ChangeDisplayItem", payload: "Laser"} )
                                                                                          storeDisplayDispatch( {type: "ChangeDisplayPrice", payload: DEFAULT_HARDPOINT_LASER_COST} )
                                                                                          storeDisplayDispatch( {type: "ChangeHullDamage", payload: DEFAULT_HARDPOINT_LASER_HULL_DAMAGE})
                                                                                          storeDisplayDispatch( {type: "ChangeShieldDamage", payload: DEFAULT_HARDPOINT_LASER_SHIELD_DAMAGE})
                                                                                          storeDisplayDispatch( {type: "ChangeShieldBuffer", payload: 0})
                                                                                          storeDisplayDispatch( {type: "ChangeGeneratePower", payload: 0})
                                                                                          setGameState(L_DRYDOCK_SCREEN_STATE); }}>
                              <Image source={require(`../../assets/hardpoints/Laser.jpg`)}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.hardpoint} onPress={() => {   storeDisplayDispatch( {type: "ChangeDisplayItem", payload: "Missile"} )
                                                                                          storeDisplayDispatch( {type: "ChangeDisplayPrice", payload: DEFAULT_HARDPOINT_MISSILE_COST} )
                                                                                          storeDisplayDispatch( {type: "ChangeHullDamage", payload: DEFAULT_HARDPOINT_MISSILE_HULL_DAMAGE})
                                                                                          storeDisplayDispatch( {type: "ChangeShieldDamage", payload: DEFAULT_HARDPOINT_MISSILE_SHIELD_DAMAGE})
                                                                                          storeDisplayDispatch( {type: "ChangeShieldBuffer", payload: 0})
                                                                                          storeDisplayDispatch( {type: "ChangeGeneratePower", payload: 0})
                                                                                          setGameState(M_DRYDOCK_SCREEN_STATE); }}>
                              <Image source={require(`../../assets/hardpoints/Missile.jpg`)}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.hardpoint} onPress={() => {   storeDisplayDispatch( {type: "ChangeDisplayItem", payload: "Shield"} )
                                                                                          storeDisplayDispatch( {type: "ChangeDisplayPrice", payload: DEFAULT_HARDPOINT_SHIELD_COST} )
                                                                                          storeDisplayDispatch( {type: "ChangeHullDamage", payload: 0})
                                                                                          storeDisplayDispatch( {type: "ChangeShieldDamage", payload: 0})
                                                                                          storeDisplayDispatch( {type: "ChangeShieldBuffer", payload: DEFAULT_HARDPOINT_SHIELD_POWER})
                                                                                          storeDisplayDispatch( {type: "ChangeGeneratePower", payload: 0})
                                                                                          setGameState(S_DRYDOCK_SCREEN_STATE); }}>
                              <Image source={require(`../../assets/hardpoints/Shield.jpg`)}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.hardpoint} onPress={() => {   storeDisplayDispatch( {type: "ChangeDisplayItem", payload: "Generator Lvl.1"} )
                                                                                          storeDisplayDispatch( {type: "ChangeDisplayPrice", payload: DEFAULT_HARDPOINT_GEN_1_COST} )
                                                                                          storeDisplayDispatch( {type: "ChangeHullDamage", payload: 0})
                                                                                          storeDisplayDispatch( {type: "ChangeShieldDamage", payload: 0})
                                                                                          storeDisplayDispatch( {type: "ChangeShieldBuffer", payload: 0})
                                                                                          storeDisplayDispatch( {type: "ChangeGeneratePower", payload: DEFAULT_HARDPOINT_GEN_1_POWER})
                                                                                          setGameState(G1_DRYDOCK_SCREEN_STATE); }}>
                              <Image source={require(`../../assets/hardpoints/Gen_1.jpg`)}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.hardpoint} onPress={() => {   storeDisplayDispatch( {type: "ChangeDisplayItem", payload: "Generator Lvl.2"} )
                                                                                          storeDisplayDispatch( {type: "ChangeDisplayPrice", payload: DEFAULT_HARDPOINT_GEN_2_COST} )
                                                                                          storeDisplayDispatch( {type: "ChangeHullDamage", payload: 0})
                                                                                          storeDisplayDispatch( {type: "ChangeShieldDamage", payload: 0})
                                                                                          storeDisplayDispatch( {type: "ChangeShieldBuffer", payload: 0})
                                                                                          storeDisplayDispatch( {type: "ChangeGeneratePower", payload: DEFAULT_HARDPOINT_GEN_2_POWER})
                                                                                          setGameState(G2_DRYDOCK_SCREEN_STATE); }}>
                              <Image source={require(`../../assets/hardpoints/Gen_2.jpg`)}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.hardpoint} onPress={() => {   storeDisplayDispatch( {type: "ChangeDisplayItem", payload: "Sell"} )
                                                                                          storeDisplayDispatch( {type: "ChangeDisplayPrice", payload: 0} )
                                                                                          storeDisplayDispatch( {type: "ChangeHullDamage", payload: 0})
                                                                                          storeDisplayDispatch( {type: "ChangeShieldDamage", payload: 0})
                                                                                          storeDisplayDispatch( {type: "ChangeShieldBuffer", payload: 0})
                                                                                          storeDisplayDispatch( {type: "ChangeGeneratePower", payload: 0})
                                                                                          setGameState(SELL_DRYDOCK_SCREEN_STATE); }}>
                              <Image source={require(`../../assets/hardpoints/Sell.jpg`)}/>
                            </TouchableOpacity>
                          </View>

                          {credits > 0 ?
                          <Text>Better Make Complete Use of Your Funds. You Never Know When You'll Catch A Break.</Text>
                          : <TouchableOpacity style={{borderWidth: 3, borderColor:"purple"}} onPress={() => setGameState(SPACE_SCREEN_STATE)}><Text>Get Set. Ready. Blast Off!</Text></TouchableOpacity>}
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
