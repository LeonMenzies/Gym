import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, View } from "react-native";

const Tab = createBottomTabNavigator();
const Placeholder = () => <View style={{flex:1,justifyContent:"center",alignItems:"center"}}><Text>Tab</Text></View>;

export default () => (
    <NavigationContainer>
        <Tab.Navigator id={undefined}>
            <Tab.Screen name="A" component={Placeholder} />
            <Tab.Screen name="B" component={Placeholder} />
        </Tab.Navigator>
    </NavigationContainer>
);
