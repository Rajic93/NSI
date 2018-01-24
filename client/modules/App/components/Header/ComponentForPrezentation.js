function Greeting(props) {
    const name = props.name;
    return (
        <div>
            Hello {name} !
        </div>
    );
}


class Greeting extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                Hello {this.props.name} !
            </div>
        );
    }
}

<Greeting name="Nikola" />