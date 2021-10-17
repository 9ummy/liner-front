import {
  Route,
  Switch,
  Redirect,
  BrowserRouter as Router,
} from 'react-router-dom';
import ListPage from './containers/ListPage';
import DetailPage from './containers/DetailPage';
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route
          exact
          path='/liner.us/trusted-search/en/:keyword'
          component={ListPage}
        />
        <Route
          exact
          path='/liner.us/trusted-search/highlight/en/:id/:title'
          component={DetailPage}
        />
        <Redirect exact from='/' to='/liner.us/trusted-search/en/search' />
        <Route
          render={() => <Redirect to='/liner.us/trusted-search/en/search' />}
        />
      </Switch>
    </Router>
  );
}

export default App;
