import { RecoilRoot } from "recoil";
import { AppNavigator } from "~navigation/AppNavigator";

export const App = () => {
    return (
        <RecoilRoot>
            <AppNavigator />
        </RecoilRoot>
    );
};

export default App;
