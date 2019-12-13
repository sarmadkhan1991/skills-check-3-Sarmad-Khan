import React from 'react';
import axios from 'axios';
import Wizard from '../Wizard/wizard';
import { hostname } from 'os';

export default class Dashboard extends React.Component {
    constructor (props) {
        super (props)

        this.state = {
            listings: []
        }
        this.logout = this.logout.bind(this);
        this.getAllListings = this.getAllListings.bind(this);
    }

    componentDidMount(){
        this.getAllListings();
    }

    logout() {
        axios.get('/auth/logout').then(() => {
            this.props.updateUser({});
        })
      }

    getAllListings() {
        axios.get('/api/listings').then(res => {
            this.setState({
                listings: res.data
            })

        }
        )
    }


    render () {
        const { listings } = this.state;
        console.log(listings)
        const mappedListings = listings.map(house => {
            console.log(house)
            return (
                <div key={house.id}>
                    <div>Image{}</div>
                    <div>{house.name}</div>
                    <div>{house.description}</div>
                    <div>{house.loan_amount}</div>
                    <div>{house.monthly_mortgage}</div>
                    <div>{house.recommended_rent}</div>
                    <div>{house.desired_rent}</div>
                    <div>{house.address}</div>
                    <div>{house.city}</div>
                    <div>{house.zip}</div>
                    <div>{house.state}</div>
                </div>
            )
        });
        return (
            <div>
                <div>
                Logged In!
                </div>
                <div>
                    {mappedListings}
                </div>
                <div>
                 <button onClick={this.logout} >Logout</button>
                </div>
            </div>
        )
    }
}