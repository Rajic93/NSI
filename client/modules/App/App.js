import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// Import Style
import './App.css';

// Import Components
import Helmet from 'react-helmet';
import DevTools from './components/DevTools';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Instagram from "../Instagram/Instagram";
import ContentContainer from "../App/components/Content/Content"

// Import Actions
import { toggleAddPost } from './AppActions';
import { switchLanguage } from '../../modules/Intl/IntlActions';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isMounted: false };
  }

  componentDidMount() {
    this.setState({isMounted: true}); // eslint-disable-line
  }

  toggleAddPostSection = () => {
    this.props.dispatch(toggleAddPost());
  };

  redirectPage() {
    if (!this.props.redirected)
      return;
    console.log('check');
    document.innerHTML = this.props.redirectPage;
    return;


    let div = document.getElementById('login');
    div.innerHTML = this.props.redirectPage;
  }

  render() {
    let x = this.redirectPage();
    let devOn = false;
    return (
      <div>
        { (devOn)? this.state.isMounted && !window.devToolsExtension && process.env.NODE_ENV === 'development' && <DevTools /> : "" }
        <div>
          <Helmet
            title="MERN Starter - Blog App"
            titleTemplate="%s - Blog App"
            meta={[
              { charset: 'utf-8' },
              {
                'http-equiv': 'X-UA-Compatible',
                content: 'IE=edge',
              },
              {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
              },
            ]} 
          />
          <Header
            switchLanguage={lang => this.props.dispatch(switchLanguage(lang))}
            intl={this.props.intl}
            toggleAddPost={this.toggleAddPostSection}
          />
            {this.props.children}
          <div id='login' className='popup-login'>
              s
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
};

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    intl: store.intl,
    redirected: store.redirected,
    redirectPage: store.redirectPage
  };
}

export default connect(mapStateToProps)(App);
