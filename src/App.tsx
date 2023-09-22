import { Component } from 'solid-js';
import HomeScreen from './screens/Home';
import LoginScreen from './screens/Login';
import RegisterScreen from './screens/Register';

const App: Component = () => {
  return (
    <LoginScreen />
    // <Router>
    //   <Route to='/'>
    //     <HomeScreen />
    //   </Route>
    //   <Route to='/login'>
    //     <LoginScreen />
    //   </Route>
    //   <Route to='/register'>
    //     <RegisterScreen />
    //   </Route>
    // </Router>
  );
};

export default App;
