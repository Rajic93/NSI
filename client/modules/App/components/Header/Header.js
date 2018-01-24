import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import axios from "axios";

// Import Style
import styles from './Header.css';


var appNameStyle = {
  color: "white",
  fontSize: "40px",
  marginLeft:"15%"
};


export function Header(props, context) {

  const languageNodes = props.intl.enabledLanguages.map(
    lang => <li key={lang} onClick={() => props.switchLanguage(lang)} className={lang === props.intl.locale ? styles.selected : ''}>{lang}</li>
  );

  const login = () => {
    // axios.get('http://localhost:10000/inst/feed')
    // .then((res) => {
    //   console.log(res.data);
    // })
    // .catch((error) => {
    //   console.error(error);

    // })
  };

  return (
    <div className={styles.header}>
      <div style={appNameStyle}>
        Social mixer
      </div>
    </div>
  );
}

Header.contextTypes = {
  router: React.PropTypes.object,
};

Header.propTypes = {
  toggleAddPost: PropTypes.func.isRequired,
  switchLanguage: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
};

export default Header;
