import React from 'react';
import { connect } from "react-redux";

// Import Styles

import styles from "./Accounts.css";

// Import Actions
import { ADD_ACCOUNT, addAccount } from "../../AppActions";

// Import Selectors
import { getAccounts } from "../../AppReducer";

class Accounts extends React.Component {

    constructor(props) {
        super(props);
        this.selectedItem = null;
        this.selectedClass = "";
    }

    componentWillMount() {
        console.log('will mount');
        const getAccounts = () => {
            axios.get('http://localhost:10000/user/account').then((response) => {
                console.log(response.data);
                response.data.forEach(account => {
                    this.props.addAccount(account);
                });
            }).catch((error) => {
                console.log(error);
            });
        }
    }

    filter(str, li) {
        if (str === "MIX")
        this.selectedClass = styles["selected"];
        li.setAttribute("class", this.selectedClass);
        li.classList.add(this.selectedClass);
        if (this.selectedItem)
            this.selectedItem.removeAttribute("class", this.selectedClass)
        this.selectedItem = li;
        console.log(this.selectedClass);
        console.log(this.selectedItem);
    }

    addAccount(){
        this.selectedClass = styles["selected-facebook"];

        let li = document.createElement("li");
        let img = document.createElement("img");
        img.setAttribute("src", "#");
        img.addEventListener("click", (img, ev) => {
            this.filter("", li);
        });
        li.appendChild(img);
        let ul = document.getElementById("accounts");
        ul.appendChild(li);
    }

    addAccount(account) {
        
        let src = '';
        if (account.type === 'instagram') {
            src = 'http://www.dmc.rs/wp-content/uploads/2015/12/instagram-oglasavanje.png';
        } else if (account.type === 'facebook') {
            src = '';
        }
        return (<li>
                    <img src={src} class={styles['acc-img']}/>
                </li>)
    }

    render() {
        return (
            <div className={styles.filters}>
                <ul id="accounts">
                    <li><span className="glyphicon glyphicon-random" aria-hidden="true" onClick={this.filter.bind(this, "MIX")} ></span></li>
                    {/* {this.props.accounts.map(account => this.addAccount(account))} */}
                </ul>
                <img src="#" className={styles.add} onClick={this.addAccount.bind(this)} />
            </div>
        );
    }
}

// Retrieve data from store as props
function mapStateToProps(store) {
    return {
        accounts: getAccounts(store)
    };
}

// Bind actions
function mapDispatchToProps(dispatch) {
    return {
        addAccount: (account) => {
            dispatch(addAccount(account))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Accounts);