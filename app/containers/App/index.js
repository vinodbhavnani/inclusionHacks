import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import HomePage from 'containers/HomePage/Loadable';
import FeaturePage from 'containers/FeaturePage/Loadable';
import ResultsPage from 'containers/ResultsPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';


import GlobalStyle from '../../global-styles';

function App() {
  return (
    <div>
      <section className="centered">
        <section className="main-content">
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/quiz" component={FeaturePage} />
            <Route path="/results" component={ResultsPage} />
            <Route path="" component={NotFoundPage} />
          </Switch>
        </section>
        <GlobalStyle />
      </section>
    </div>
  );
}
export default hot(App);
