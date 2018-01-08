import React from 'react';


// Import Styles

import styles from "./Accounts.css";

class Accounts extends React.Component {

    constructor(props) {
        super(props);
        this.selectedItem = null;
        this.selectedClass = "";
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

    render() {
        return (
            <div className={styles.filters}>
                <ul id="accounts">
                    <li><span className="glyphicon glyphicon-random" aria-hidden="true" onClick={this.filter.bind(this, "MIX")} ></span></li>
                </ul>
                <img src="#" className={styles.add} onClick={this.addAccount.bind(this)} />
            </div>
        );
    }
}

export default Accounts;