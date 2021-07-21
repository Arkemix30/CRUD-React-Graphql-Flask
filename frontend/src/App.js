import { BrowserRouter as Router,Route,Switch } from "react-router-dom";
import UserCreate from "./pages/UserCreate";
import UserEdit from "./pages/UserEdit";
import UserList from "./pages/UserList"
import Header from "./components/Header";


function App() {
  return (
      <div className="App container mx-auto">
        <Router basename="/user">
          <Header/>
          <Switch>
            <Route path="/" exact component={UserList}/>
            <Route path="/create" component={UserCreate}/>
            <Route path="/about" component={UserEdit}/>
            <Route path="/edit/:id" component={UserEdit}/>
          </Switch>
        </Router>
      </div>
  );
}

export default App;
