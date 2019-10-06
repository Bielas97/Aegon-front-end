import React, {Component} from 'react';
import Ground from "../../../components/UI/map/Ground";

class Customers extends Component {

    circleClicked = id => {
        console.log('place clicked! place is: ', id)
    };

    render() {

        //dummy data
        const occupiedTablesById = ['A01', 'A02', 'A03', 'D010', 'C01', 'B02'];

        return (
            <div>
                <Ground
                    onCircleClick={id => this.circleClicked(id)}
                    occupiedTables={occupiedTablesById}
                />
            </div>
        )
    }
}

export default Customers;
