import { RecoilRoot } from "recoil";
import { AppNavigator } from "~navigation/AppNavigator";
import { SafeAreaProvider } from "react-native";

export const App = () => {
    return (
        <RecoilRoot>
            <SafeAreaProvider>
                <NavigationContainer>
                    <AppNavigator />
                </NavigationContainer>
            </SafeAreaProvider>
        </RecoilRoot>
    );
};

export default App;
