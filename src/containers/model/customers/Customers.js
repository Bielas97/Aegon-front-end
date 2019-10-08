import React, {Component} from 'react';
import SecondFloor from "../../../components/UI/map-vector-graphics/SecondFloor";

class Customers extends Component {

    circleClicked = id => {
        console.log('place clicked! place is: ', id)
    };

    render() {

        //dummy data
        const freeTablesById = ['A11', 'A12', 'A13', 'D010', 'C01', 'B02'];

        return (
            <div className="col-6">
                <SecondFloor onCircleClick={this.circleClicked}
                             freeTables={freeTablesById}
                />
            </div>
        )
    }
}

export default Customers;
