import React, {Component} from 'react';

class Customers extends Component {

    render() {
        return (
            <div className="container">
                <br/>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Max places</th>
                        <th scope="col">Sold places</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>elko</td>
                        <td>siemka</td>
                        <td>Halko</td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>elko</td>
                        <td>siemka</td>
                        <td>Halko</td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td>elko</td>
                        <td>siemka</td>
                        <td>Halko</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Customers;
