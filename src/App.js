import "./App.css";
import "./App.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import FirstPage from "./pages/Firstpage/FirstPage";
import PrivateRoute from "./components/Auth/PrivateRoute";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import { AuthProvider } from "./components/Auth/Auth";
import CustomRoute from "./components/Auth/CustomRoute";
import HomeStudent from "./pages/Student/Content/HomeStudent";
import Students from "./pages/Professor/Content/Students";
import HomeProf from "./pages/Professor/Content/HomeProf";
import AllCourses from "./pages/Student/Content/AllCourses";
import Course from "./pages/Course";
import Lesson from "./pages/Lesson";
import Task from "./pages/Task";
import Stud from "./pages/Stud";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Switch>
            <Route exact path="/" component={FirstPage} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <CustomRoute exact path="/dashboard" component={HomeProf} />
            <CustomRoute path="/students" component={Students} />
            <PrivateRoute path="/dashboard/:id" component={Course} />
            <PrivateRoute exact path="/home" component={HomeStudent} />
            <PrivateRoute path="/allcourses" component={AllCourses} />
            <PrivateRoute path="/home/:id" component={Course} />
            <PrivateRoute path="/lesson/:id" component={Lesson} />
            <PrivateRoute path="/task/:id" component={Task} />
            <PrivateRoute path="/student/:id" component={Stud} />
          </Switch>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
