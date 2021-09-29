import { BrowserRouter } from "react-router-dom";
import PrivateRoute from "./Services/PrivateRoute";

import PublicRoute from "./Services/PublicRoute";
import Login from "./views/Account/Login";
import SignUp from "./views/Account/SignUp";
import HomePage from "./views/Home/HomePage";


function App() {
  return (
    <BrowserRouter>
      <PublicRoute restricted={true} path="/login" component={Login} exact/>
      <PublicRoute restricted={true} path="/signup" component={SignUp} />
      <PublicRoute restricted={false} path="/" component={HomePage} exact />
      {/* <PrivateRoute restricted={true} path="/" component={HomePage} exact/> */}
    </BrowserRouter>
  );
}

export default App;
