import { RecoilRoot } from "recoil";
import { AppNavigator } from "~navigation/AppNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";

export const App = () => {
    return (
        <RecoilRoot>
            <SafeAreaProvider>
                <AppNavigator />
            </SafeAreaProvider>
        </RecoilRoot>
    );
};

export default App;
