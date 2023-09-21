import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import DryDockScreen from "./src/screens/DryDockScreen";
import SpaceScreen from "./src/screens/SpaceScreen";

const navigator = createStackNavigator(
  {
    Welcome: WelcomeScreen,
    DryDock: DryDockScreen,
    Space: SpaceScreen,
  },
  {
    initialRouteName: "Welcome",
    defaultNavigationOptions: {
      title: "App",
    },
  }
);

export default createAppContainer(navigator);
