import { RecoilRoot } from "recoil";
import { AppNavigator } from "~navigation/AppNavigator";

export const App = () => (
    <RecoilRoot>
        <AppNavigator />
    </RecoilRoot>
);

export default App;
