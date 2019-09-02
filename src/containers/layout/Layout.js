import React, {Component} from 'react';
import Toolbar from "../../components/navigation/toolbar/Toolbar";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import {connect} from "react-redux";

class Layout extends Component {
    render() {
        return (
            <Auxiliary>
                <Toolbar isAuth={this.props.isAuthenticated}/>
                <main>
                    {this.props.children}
                </main>
            </Auxiliary>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
};

export default connect(mapStateToProps)(Layout);
