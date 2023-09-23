import React, { useReducer, useState } from "react";
import { Text, View, ScrollView, StyleSheet, TouchableOpacity, Image, TextInput} from "react-native";
import Hardpoint from "./components/Hardpoint";

const DEFAULT_LASER_PATH = require(`../../assets/hardpoints/Laser.jpg`);
const DEFAULT_MISSILE_PATH = require(`../../assets/hardpoints/Missile.jpg`);
const DEFAULT_SHIELD_PATH = require(`../../assets/hardpoints/Shield.jpg`);
const DEFAULT_GEN_1_PATH = require(`../../assets/hardpoints/Gen_1.jpg`);
const DEFAULT_GEN_2_PATH = require(`../../assets/hardpoints/Gen_2.jpg`);
const DEFAULT_SELL_PATH = require(`../../assets/hardpoints/Sell.jpg`);
const DEFAULT_BLANK_PATH = require(`../../assets/hardpoints/blank.jpg`);
const DEFAULT_BUTTON_PATH = require(`../../assets/button.jpg`);
const DEFAULT_LASER_BUTTON_PATH = require(`../../assets/laser_button.jpg`);
const DEFAULT_MISSILE_BUTTON_PATH = require(`../../assets/missile_button.jpg`);
const DEFAULT_SHIELD_BUTTON_PATH = require(`../../assets/shield_button.jpg`);

// represents the health of your ship, does not include any shields
// when it hits 0, your ship has exploded
const DEFAULT_HULL = 500;

// each cost variable is the credit cost per hardpoint
// except for PW Cost which stand for power cost,
// this number is subtracted when the hardpoint is used in combat
const DEFAULT_HARDPOINT_MISSILE_COST = 100;
var DEFAULT_HARDPOINT_MISSILE_PW_COST = 100;
var DEFAULT_HARDPOINT_MISSILE_HULL_DAMAGE = 100;
var DEFAULT_HARDPOINT_MISSILE_SHIELD_DAMAGE = 20;

const DEFAULT_HARDPOINT_LASER_COST = 150;
// note how laser weapons are costlier in pw to use
// also I need to use var instead of const because const are read-only and I need to multiply (*=) them
var DEFAULT_HARDPOINT_LASER_PW_COST = 150;
var DEFAULT_HARDPOINT_LASER_HULL_DAMAGE = 20;
var DEFAULT_HARDPOINT_LASER_SHIELD_DAMAGE = 100;

const DEFAULT_HARDPOINT_SHIELD_COST = 150;
// every shield will increase the cap on shields by 300 "shield" points
const DEFAULT_HARDPOINT_SHIELD_POWER = 300;

const DEFAULT_HARDPOINT_GEN_1_COST = 150;
const DEFAULT_HARDPOINT_GEN_1_POWER = 200;
const DEFAULT_HARDPOINT_GEN_2_COST = 200;
const DEFAULT_HARDPOINT_GEN_2_POWER = 300;

// the minimum the player has to spend before starting the game
const DEFAULT_MIN_START = 200;
const DEFAULT_LESS_MESSAGE = "Better Make Complete Use of Your Funds. You Never Know When You'll Catch A Break.";
const DEFAULT_START_MESSAGE = "Get Set. Ready. Blast Off!";

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
      case "ChangeName":
        return { ...boatState, shipName: action.payload };
      case "UpdateHull":
        return { ...boatState, totalHull: boatState.totalHull + action.payload };
      case "UpdateShields":
        return { ...boatState, totalShields: boatState.totalShields + action.payload };
      case "UpdatePower":
        return { ...boatState, totalPower: boatState.totalPower + action.payload };
      case "UpdateNumLasers":
        return { ...boatState, numLasers: boatState.numLasers + action.payload };
      case "UpdateNumMissiles":
        return { ...boatState, numMissiles: boatState.numMissiles + action.payload };
      case "UpdateLaserHullDamage":
        return { ...boatState, totalLaserHullDamage: boatState.totalLaserHullDamage + action.payload };
      case "UpdateLaserShieldDamage":
        return { ...boatState, totalLaserShieldDamage: boatState.totalLaserShieldDamage + action.payload };
      case "UpdateMissileHullDamage":
        return { ...boatState, totalMissileHullDamage: boatState.totalMissileHullDamage + action.payload };
      case "UpdateMissileShieldDamage":
        return { ...boatState, totalMissileShieldDamage: boatState.totalMissileShieldDamage + action.payload };
      case "UpdateLaserPWCost":
        return { ...boatState, totalLaserPWCost: boatState.totalLaserPWCost + action.payload};
      case "UpdateMissilePWCost":
        return { ...boatState, totalMissilePWCost: boatState.totalMissilePWCost + action.payload};
      case "UpdateShieldPWCost":
        return { ...boatState, totalShieldPWCost: boatState.totalShieldPWCost + action.payload};
      case "UpdateRemainingPower":
        return { ...boatState, totalRemainingPower: boatState.totalRemainingPower + action.payload};
      default:
        return boatState;
    }
  }

  // reducer for boat
  const [boatState, boatDispatch] = useReducer(BoatReducer, { hardpoint_1_text: DEFAULT_BLANK_PATH, hardpoint_2_text: DEFAULT_BLANK_PATH, 
    hardpoint_3_text: DEFAULT_BLANK_PATH, hardpoint_4_text: DEFAULT_BLANK_PATH, hardpoint_5_text: DEFAULT_BLANK_PATH, hardpoint_6_text: DEFAULT_BLANK_PATH, 
    hardpoint_1: "", hardpoint_2: "", hardpoint_3: "", hardpoint_4: "", hardpoint_5: "", hardpoint_6: "", 
    shipName: "", totalHull: DEFAULT_HULL, totalShields: 0, totalPower: 0, totalLaserHullDamage: 0, totalLaserShieldDamage: 0, totalMissileHullDamage: 0, totalMissileShieldDamage: 0, numLasers: 0, numMissiles: 0, 
    totalLaserPWCost: 0, totalMissilePWCost: 0, totalRemainingPower: 0, totalShieldPWCost: 0});

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
          boatDispatch( {type: "UpdateNumLasers",
                        payload: -1} );
        break;
      case "missile":
        setCredits( credits + DEFAULT_HARDPOINT_MISSILE_COST );
        boatDispatch( {type: "UpdateNumMissiles",
                        payload: -1} );
        break;
      case "shield":
          setCredits( credits + DEFAULT_HARDPOINT_SHIELD_COST );
          boatDispatch( {type: "UpdateShields", payload: -DEFAULT_HARDPOINT_SHIELD_POWER} );
        break;
      case "gen_1":
        setCredits( credits + DEFAULT_HARDPOINT_GEN_1_COST );
        boatDispatch( {type: "UpdatePower", payload: -DEFAULT_HARDPOINT_GEN_1_POWER} );
        break;
      case "gen_2":
        setCredits( credits + DEFAULT_HARDPOINT_GEN_2_COST );
        boatDispatch( {type: "UpdatePower", payload: -DEFAULT_HARDPOINT_GEN_2_POWER} );
        break;
      default:
        console.log(hardpointType);
        break;
    }
  }

  const [storeDisplayState, storeDisplayDispatch] = useReducer(StoreDisplayReducer, { displayItem: "Laser", displayPrice: 150, hullDamage: 20, shieldDamage: 100, shieldBuffer: 0, generatePower: 0 });
  const [warningMessage, setWarningMessage] = useState("");

  const IGCDespotReducer = (boatState, action) => {
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
      case "ChangeName":
        return { ...boatState, shipName: action.payload };
      case "UpdateShields":
        return { ...boatState, totalShields: boatState.totalShields + action.payload };
      case "UpdatePower":
        return { ...boatState, totalPower: boatState.totalPower + action.payload };
      default:
        return boatState;
    }
  }

  // reducer for the Despot, note how all the damage, shield, and power values are already calculated
  const [IGCDespotState, IGCDespotDispatch] = useReducer(IGCDespotReducer, { hardpoint_1_text: DEFAULT_LASER_PATH, hardpoint_2_text: DEFAULT_MISSILE_PATH, 
    hardpoint_3_text: DEFAULT_LASER_PATH, hardpoint_4_text: DEFAULT_GEN_1_PATH, hardpoint_5_text: DEFAULT_GEN_2_PATH, hardpoint_6_text: DEFAULT_SHIELD_PATH, 
    hardpoint_1: "laser", hardpoint_2: "missile", hardpoint_3: "laser", hardpoint_4: "gen_1", hardpoint_5: "gen_2", hardpoint_6: "shield", 
    shipName: "IGC Despot", totalHull: DEFAULT_HULL, totalShields: 200, totalPower: 500, totalHullDamage: 140, totalShieldDamage: 220});

  const [combatLog, setCombatLog] = useState(`Waiting...`);

  const prepStart = () => {
    boatDispatch({ type: "UpdateLaserHullDamage", payload: DEFAULT_HARDPOINT_LASER_HULL_DAMAGE *= boatState.numLasers });
    boatDispatch({ type: "UpdateLaserShieldDamage", payload: DEFAULT_HARDPOINT_LASER_SHIELD_DAMAGE *= boatState.numLasers });
    boatDispatch({ type: "UpdateLaserPWCost", payload: DEFAULT_HARDPOINT_LASER_PW_COST *= boatState.numLasers });

    boatDispatch({ type: "UpdateMissileHullDamage", payload: DEFAULT_HARDPOINT_MISSILE_HULL_DAMAGE *= boatState.numMissiles });
    boatDispatch({ type: "UpdateMissileShieldDamage", payload: DEFAULT_HARDPOINT_MISSILE_SHIELD_DAMAGE *= boatState.numMissiles });
    boatDispatch({ type: "UpdateMissilePWCost", payload: DEFAULT_HARDPOINT_MISSILE_PW_COST *= boatState.numMissiles });

    // the starting shields is the num of shields regained per charge and stored here
    boatDispatch({ type: "UpdateShieldPWCost", payload: boatState.totalShields });
  }

  const startTurn = () => {
    // the combat log clears at the start of every turn
    setCombatLog(`Waiting...`);
    boatDispatch({ type: "UpdateRemainingPower", payload: boatState.totalPower });

    despotAttack();
  }

  // ideally, you would pass in a state for a specific enemy ship but for the purposes of this app let's just do one for Despot
  // also the AI is extremely predictable and is for demonstration
  const despotAttack = () => {
    // the despot starts with 200 but immediately gains 100 with the first strike
    // also the despot will focus on firepower so will only recharge 100 shields per turn
    IGCDespotDispatch({ type: "UpdateShields", payload: 100 })

    // if the despot's attack will/or has breached your shields, his hull attack will take effect as well
    if (boatState.totalShields - IGCDespotState.totalShieldDamage < 0){
      // so knock your ship's shields back to 0, deal hull damage, and update the combat log. Am I missing something? ;)
      // quick shameless proud moment. I reset the shields by adding the negative of the current value
      boatDispatch({ type: "UpdateShields", payload: -boatState.totalShields});

      if (IGCDespotState.totalHull - boatState.totalLaserHullDamage < 0){
        boatDispatch({ type: "UpdateHull", payload: 0});
        setCombatLog(`The evil Despot has triumped! Eh.`);
      }
      else{
        boatDispatch({ type: "UpdateHull", payload: -IGCDespotState.totalHullDamage});
        setCombatLog(`Ah! The Despot has struck for ${IGCDespotState.totalHullDamage} hull damage, bypassing your shields! `);
      }
    }

    // if not, then the Despot will simply strike your shields
    else{
      boatDispatch({ type: "UpdateShields", payload: -IGCDespotState.totalShieldDamage});
      setCombatLog(`The Despots strikes for ${IGCDespotState.totalShieldDamage} shield damage. `);
    }
  }

  switch(gameState){
    case L_DRYDOCK_SCREEN_STATE:
      currentGameState = <ScrollView>
                          <Text style={styles.titleText}>Name of Ship: {boatState.shipName}</Text>
                          <TextInput 
                            style={styles.name}
                            autoCapitalize="none"
                            autoCorrect={false}
                            value={boatState.shipName}
                            onChangeText={(newText) => {boatDispatch({ type: "ChangeName", payload: newText })}}
                          />
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
                                                          boatDispatch( {type: "UpdateNumLasers",
                                                                payload: 1} )
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
                                                        boatDispatch( {type: "UpdateNumLasers",
                                                              payload: 1} ) 
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
                                                        boatDispatch( {type: "UpdateNumLasers",
                                                              payload: 1} ) 
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
                                                        boatDispatch( {type: "UpdateNumLasers",
                                                          payload: 1} )
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
                                                        boatDispatch( {type: "UpdateNumLasers",
                                                              payload: 1} ) 
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
                                                        boatDispatch( {type: "UpdateNumLasers",
                                                              payload: 1} )      
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

                          {credits > DEFAULT_MIN_START ?
                          <View><Text>{DEFAULT_LESS_MESSAGE}</Text></View>
                          : <View><TouchableOpacity style={{ borderWidth: 3, borderColor:"purple"}} onPress={() => { prepStart(); startTurn(); setGameState(SPACE_SCREEN_STATE);}}><Text>{DEFAULT_START_MESSAGE}</Text></TouchableOpacity></View>}
                        </ScrollView>
      break;

    case M_DRYDOCK_SCREEN_STATE:
      currentGameState = <ScrollView>
                          <Text style={styles.titleText}>Name of Ship: {boatState.shipName}</Text>
                          <TextInput 
                            style={styles.name}
                            autoCapitalize="none"
                            autoCorrect={false}
                            value={boatState.shipName}
                            onChangeText={(newText) => {boatDispatch({ type: "ChangeName", payload: newText })}}
                          />
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
                                                          boatDispatch( {type: "UpdateNumMissiles",
                                                                payload: 1} )
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
                                                          boatDispatch( {type: "UpdateNumMissiles",
                                                                payload: 1} )      
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
                                                        boatDispatch( {type: "UpdateNumMissiles",
                                                              payload: 1} )       
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
                                                        boatDispatch( {type: "UpdateNumMissiles",
                                                              payload: 1} )       
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
                                                        boatDispatch( {type: "UpdateNumMissiles",
                                                              payload: 1} )       
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
                                                        boatDispatch( {type: "UpdateNumMissiles",
                                                              payload: 1} )      
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

                          {credits > DEFAULT_MIN_START ?
                          <Text>{DEFAULT_LESS_MESSAGE}</Text>
                          : <TouchableOpacity style={{borderWidth: 3, borderColor:"purple"}} onPress={() => { prepStart(); startTurn(); setGameState(SPACE_SCREEN_STATE);}}><Text>{DEFAULT_START_MESSAGE}</Text></TouchableOpacity>}
                        </ScrollView>
      break;
    case S_DRYDOCK_SCREEN_STATE:
      currentGameState = <ScrollView>
                          <Text style={styles.titleText}>Name of Ship: {boatState.shipName}</Text>
                          <TextInput 
                            style={styles.name}
                            autoCapitalize="none"
                            autoCorrect={false}
                            value={boatState.shipName}
                            onChangeText={(newText) => {boatDispatch({ type: "ChangeName", payload: newText })}}
                          />
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
                                                          boatDispatch( {type: "UpdateShields", payload: DEFAULT_HARDPOINT_SHIELD_POWER} );
                                                          console.log(DEFAULT_HARDPOINT_SHIELD_POWER)
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
                                                          boatDispatch( {type: "UpdateShields", payload: DEFAULT_HARDPOINT_SHIELD_POWER} );
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
                                                        boatDispatch( {type: "UpdateShields", payload: DEFAULT_HARDPOINT_SHIELD_POWER} );
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
                                                        boatDispatch( {type: "UpdateShields", payload: DEFAULT_HARDPOINT_SHIELD_POWER} );
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
                                                        boatDispatch( {type: "UpdateShields", payload: DEFAULT_HARDPOINT_SHIELD_POWER} );
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
                                                        boatDispatch( {type: "UpdateShields", payload: DEFAULT_HARDPOINT_SHIELD_POWER} );
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

                          {credits > DEFAULT_MIN_START ?
                          <View><Text>{DEFAULT_LESS_MESSAGE}</Text></View>
                          : <View><TouchableOpacity style={{ borderWidth: 3, borderColor:"purple"}} onPress={() => { prepStart(); startTurn(); setGameState(SPACE_SCREEN_STATE);}}><Text>{DEFAULT_START_MESSAGE}</Text></TouchableOpacity></View>}
                        </ScrollView>
      break;
    case G1_DRYDOCK_SCREEN_STATE:
      currentGameState = <ScrollView>
                          <Text style={styles.titleText}>Name of Ship: {boatState.shipName}</Text>
                          <TextInput 
                            style={styles.name}
                            autoCapitalize="none"
                            autoCorrect={false}
                            value={boatState.shipName}
                            onChangeText={(newText) => {boatDispatch({ type: "ChangeName", payload: newText })}}
                          />
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
                                                          boatDispatch( {type: "UpdatePower", payload: DEFAULT_HARDPOINT_GEN_1_POWER} );
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
                                                          boatDispatch( {type: "UpdatePower", payload: DEFAULT_HARDPOINT_GEN_1_POWER} );
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
                                                        boatDispatch( {type: "UpdatePower", payload: DEFAULT_HARDPOINT_GEN_1_POWER} ); 
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
                                                        boatDispatch( {type: "UpdatePower", payload: DEFAULT_HARDPOINT_GEN_1_POWER} ); 
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
                                                        boatDispatch( {type: "UpdatePower", payload: DEFAULT_HARDPOINT_GEN_1_POWER} );
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
                                                        boatDispatch( {type: "UpdatePower", payload: DEFAULT_HARDPOINT_GEN_1_POWER} );
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

                          {credits > DEFAULT_MIN_START ?
                          <Text>{DEFAULT_LESS_MESSAGE}</Text>
                          : <TouchableOpacity style={{borderWidth: 3, borderColor:"purple"}} onPress={() => { prepStart(); startTurn(); setGameState(SPACE_SCREEN_STATE);}}><Text>{DEFAULT_START_MESSAGE}</Text></TouchableOpacity>}
                        </ScrollView>
      break;
    case G2_DRYDOCK_SCREEN_STATE:
      currentGameState = <ScrollView>
                          <Text style={styles.titleText}>Name of Ship: {boatState.shipName}</Text>
                          <TextInput 
                            style={styles.name}
                            autoCapitalize="none"
                            autoCorrect={false}
                            value={boatState.shipName}
                            onChangeText={(newText) => {boatDispatch({ type: "ChangeName", payload: newText })}}
                          />
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
                                                          boatDispatch( {type: "UpdatePower", payload: DEFAULT_HARDPOINT_GEN_2_POWER} );
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
                                                          boatDispatch( {type: "UpdatePower", payload: DEFAULT_HARDPOINT_GEN_2_POWER} );
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
                                                        boatDispatch( {type: "UpdatePower", payload: DEFAULT_HARDPOINT_GEN_2_POWER} ); 
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
                                                        boatDispatch( {type: "UpdatePower", payload: DEFAULT_HARDPOINT_GEN_2_POWER} );
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
                                                        boatDispatch( {type: "UpdatePower", payload: DEFAULT_HARDPOINT_GEN_2_POWER} );
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
                                                        boatDispatch( {type: "UpdatePower", payload: DEFAULT_HARDPOINT_GEN_2_POWER} );
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

                          {credits > DEFAULT_MIN_START ?
                          <Text>{DEFAULT_LESS_MESSAGE}</Text>
                          : <TouchableOpacity style={{borderWidth: 3, borderColor:"purple"}} onPress={() => { prepStart(); startTurn(); setGameState(SPACE_SCREEN_STATE);}}><Text>{DEFAULT_START_MESSAGE}</Text></TouchableOpacity>}
                        </ScrollView>
      break;
    case SELL_DRYDOCK_SCREEN_STATE:
      currentGameState = <ScrollView>
                          <Text style={styles.titleText}>Name of Ship: {boatState.shipName}</Text>
                          <TextInput 
                            style={styles.name}
                            autoCapitalize="none"
                            autoCorrect={false}
                            value={boatState.shipName}
                            onChangeText={(newText) => {boatDispatch({ type: "ChangeName", payload: newText })}}
                          />
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
                              assignHardpoint={ () => { boatDispatch( {type: "AssignHardpoint5",
                                                              payload: DEFAULT_BLANK_PATH});
                                                              sellHardpoint(boatState.hardpoint_5);
                                                      }}
        
                              imageSource={boatState.hardpoint_5_text}
                            />
                            <Hardpoint 
                              assignHardpoint={ () => { boatDispatch( {type: "AssignHardpoint6",
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

                          {credits > DEFAULT_MIN_START ?
                          <Text>{DEFAULT_LESS_MESSAGE}</Text>
                          : <TouchableOpacity style={{borderWidth: 3, borderColor:"purple"}} onPress={() => { prepStart(); startTurn(); setGameState(SPACE_SCREEN_STATE);}}><Text>{DEFAULT_START_MESSAGE}</Text></TouchableOpacity>}
                        </ScrollView>
      break;
    case SPACE_SCREEN_STATE:
      currentGameState = <ScrollView>
                          {/* view for the enemy ship, IGC Despot, the IGC stands for Inner Galactic Cruiser */}
                          <View style={styles.combatView}>
                            <Text style={styles.titleText}>Name of Ship: {IGCDespotState.shipName}</Text>
                            <Text style={styles.titleText}>Hull Strength: {IGCDespotState.totalHull}</Text>
                            <Text style={styles.titleText}>Total Power Generated: {IGCDespotState.totalPower}</Text>
                            <Text style={styles.titleText}>Total Shield Capacity: {IGCDespotState.totalShields}</Text>

                            <Hardpoint 
                              imageSource={IGCDespotState.hardpoint_1_text}
                            />
                            <Hardpoint
                              imageSource={IGCDespotState.hardpoint_2_text}
                            />
                            <Hardpoint 
                              imageSource={IGCDespotState.hardpoint_3_text}
                            />
                            <Hardpoint 
                              imageSource={IGCDespotState.hardpoint_4_text}
                            />
                            <Hardpoint 
                              imageSource={IGCDespotState.hardpoint_5_text}
                            />
                            <Hardpoint 
                              imageSource={IGCDespotState.hardpoint_6_text}
                            />
                          </View>

                          <View style={styles.combatLog}>
                            {/* maximum num of lines and will append an ellipsis to tail */}
                            <Text numberOfLines={4} ellipsizeMode="tail" style={{color: "white"}}>{combatLog}</Text>
                          </View>

                          <View style={styles.combatView}>
                            <Text style={styles.titleText}>Name of Ship: {boatState.shipName}</Text>
                            <Text style={styles.titleText}>Hull Strength: {boatState.totalHull}</Text>
                            <Text style={styles.titleText}>Remaining Power: {boatState.totalRemainingPower}</Text>
                            <Text style={styles.titleText}>Total Shield Capacity: {boatState.totalShields}</Text>

                            <Hardpoint 
                              imageSource={boatState.hardpoint_1_text}
                            />
                            <Hardpoint
                              imageSource={boatState.hardpoint_2_text}
                            />
                            <Hardpoint 
                              imageSource={boatState.hardpoint_3_text}
                            />
                            <Hardpoint 
                              imageSource={boatState.hardpoint_4_text}
                            />
                            <Hardpoint 
                              imageSource={boatState.hardpoint_5_text}
                            />
                            <Hardpoint 
                              imageSource={boatState.hardpoint_6_text}
                            />
                          </View>

                          <View style={styles.selector}>
                            {/* pressing will start the next turn with whatever actions the player has committed to */}
                            <TouchableOpacity onPress={ () => {startTurn()} }><Text style={{color: "white"}}>End Turn</Text></TouchableOpacity>
                          </View>

                          <View style={styles.combatActions}>
                            <View style={{flex: 1}}>
                              <TouchableOpacity style={styles.button} onPress={() => {
                                                                                      if (boatState.totalRemainingPower - boatState.totalLaserPWCost < 0){
                                                                                        return;
                                                                                      }

                                                                                      boatDispatch({ type: "UpdateRemainingPower", payload: -boatState.totalLaserPWCost});
                                                                                      IGCDespotDispatch({ type: "UpdateShields", payload: -boatState.totalLaserShieldDamage});
                                                                                      setCombatLog(`The ${boatState.shipName} has grazed the Despot's surface with ${boatState.totalLaserShieldDamage} shield damage. Keep at it!`);

                                                                                      if (IGCDespotState.totalShields - boatState.totalLaserShieldDamage < 0){
                                                                                        setCombatLog(`The mighty shield has fallen. Concentrate your Firepower!`);
                                                                                        IGCDespotDispatch({ type: "UpdateShields", payload: 0});
                                                                                        if (IGCDespotState.totalHull - boatState.totalLaserHullDamage < 0){
                                                                                          IGCDespotDispatch({ type: "UpdateHull", payload: 0});
                                                                                          setCombatLog(`The evil Despot has been slain. Huzzah!`);
                                                                                        }
                                                                                        else{
                                                                                          IGCDespotDispatch({ type: "UpdateHull", payload: -boatState.totalLaserHullDamage});
                                                                                        }
                                                                                      }
                                                                                    }}>
                                <Image source={DEFAULT_LASER_BUTTON_PATH}></Image>
                              </TouchableOpacity>
                              <Text style={{color: "white"}}>{boatState.totalLaserPWCost}</Text>
                            </View>

                            <View style={{flex: 1}}>
                              <TouchableOpacity style={styles.button} onPress={() => {
                                                                                      if (boatState.totalRemainingPower - boatState.totalMissilePWCost < 0){
                                                                                        return;
                                                                                      }

                                                                                      boatDispatch({ type: "UpdateRemainingPower", payload: -boatState.totalMissilePWCost});
                                                                                      IGCDespotDispatch({ type: "UpdateShields", payload: -boatState.totalMissileShieldDamage});
                                                                                      setCombatLog(`The ${boatState.shipName} has tickled the Despot's surface with ${boatState.totalMissileShieldDamage} shield damage. Keep at it!`);

                                                                                      if (IGCDespotState.totalShields - boatState.totalMissileShieldDamage < 0){
                                                                                        setCombatLog(`A breach has formed around the blast. Concentrate your Firepower!`);
                                                                                        IGCDespotDispatch({ type: "UpdateShields", payload: 0});
                                                                                        if (IGCDespotState.totalHull - boatState.totalMissileHullDamage < 0){
                                                                                          IGCDespotDispatch({ type: "UpdateHull", payload: 0});
                                                                                          setCombatLog(`The evil Despot has been slain. Huzzah!`);
                                                                                        }
                                                                                        else{
                                                                                          IGCDespotDispatch({ type: "UpdateHull", payload: -boatState.totalMissileHullDamage});
                                                                                        }
                                                                                      }
                                                                                    }}>
                                <Image source={DEFAULT_MISSILE_BUTTON_PATH}></Image>
                              </TouchableOpacity>
                              <Text style={{color: "white"}}>{boatState.totalMissilePWCost}</Text>
                            </View>

                            <View style={{flex: 1}}> 
                              <TouchableOpacity style={styles.button} onPress={() => {
                                                                                // if you cannot afford the recharge, skip
                                                                                if (boatState.totalRemainingPower - boatState.totalShieldPWCost < 0){
                                                                                  return;
                                                                                }
                                                                                // if not process the charge and update the combat log
                                                                                  boatDispatch({ type: "UpdateRemainingPower", payload: -boatState.totalShieldPWCost});
                                                                                  boatDispatch({ type: "UpdateShields", payload: boatState.totalShieldPWCost});
                                                                                  setCombatLog(`The ${boatState.shipName} has regained ${boatState.totalShieldPWCost} shields. En Garde!`);
                                                                              }}>
                                <Image source={DEFAULT_SHIELD_BUTTON_PATH}></Image>
                              </TouchableOpacity>
                              <Text style={{color: "white"}}>{boatState.totalShieldPWCost}</Text>
                            </View>
                          </View>

                          {/* <View style={styles.combatDesc}>
                            <Text numberOfLines={1} ellipsizeMode="tail" style={{color: "white"}}>Cost to Fire All Lasers: {boatState.totalLaserPWCost}{"\n"}</Text>
                            <Text numberOfLines={1} ellipsizeMode="tail" style={{color: "white"}}>Laser Hull Damage: {boatState.totalLaserHullDamage}{"\n"}</Text>
                            <Text numberOfLines={1} ellipsizeMode="tail" style={{color: "white"}}>Laser Shield Damage: {boatState.totalLaserShieldDamage}{"\n"}</Text>
                          </View> */}

                        </ScrollView>
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
    padding: 4,
    margin: 20
  },
  name:{
    margin: 20, 
    borderColor: "blue", 
    borderWidth: 1,
    textAlign: "center"
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
    padding: 10,
    margin: 20
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
  },
  combatView:{
    height: 300,
    width: 300,
    borderWidth: 3,
    borderColor: "red",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    padding: 4,
    margin: 20,
    alignSelf: "center"
  },
  combatLog:{
    height: 100,
    width: 300,
    backgroundColor: "black",
    borderColor: "gray",
    borderWidth: 5,
    alignSelf: "center"
  },
  combatActions:{
    height: 100,
    width: 300,
    backgroundColor: "black",
    borderColor: "gray",
    borderWidth: 5,
    alignSelf: "center",
    display: "flex",
    flexDirection: "row"
  },
  button:{
    height: 90,
    width: 90,
    flex: 1
  },
  selector:{
    color: "white",
    backgroundColor: "black",
    borderColor: "gray",
    borderWidth: 2,
    alignSelf: "center",
  },
  // combatDesc:{
  //   top: 2,
  //   height: 100,
  //   width: 200,
  //   backgroundColor: "black",
  //   borderColor: "gray",
  //   borderWidth: 5,
  //   alignSelf: "center"
  // },
});

export default DryDockScreen;
