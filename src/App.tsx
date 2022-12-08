import { GlobalStyle } from "./Components/Global/GlobalStyle";
import AuthRoutes from "./Components/Routes/AuthRoute";
import MainRoute from "./Components/Routes/MainRoute";
import DashHeader from "./Components/DashBoard/ExpComp/Header/Header";
import { useRecoilValue } from "recoil";
import { user, userDecode } from "./Components/Global/GlobalState";
import GotoTop from "./GotoTop";

function App() {
  const userData = useRecoilValue(user);
  const users = useRecoilValue(userDecode);
  return (
    <div>
      <GlobalStyle />
      <GotoTop>
        <AuthRoutes />
        {userData && users?.status ? <DashHeader /> : null}
        <MainRoute />
      </GotoTop>
    </div>
  );
}

export default App;
