import React from "react";

class SearchDetail extends React.Component {
    constructor(props) {
        super(props);
    }
    state={
        stock:this.props.stock
    }
    render() {
        return (
            <div>
                <img src={this.state.stock.profile.image}/>
                <p><h5>Stock Name:</h5>{this.state.stock.profile.companyName}</p>
                <p><h5>Company website:</h5><a
                    href={this.state.stock.profile.website}>{this.state.stock.profile.website}</a></p>
                <p><h5>Current Price:</h5>{this.state.stock.profile.price}</p>
                <p><h5>Description:</h5>{this.state.stock.profile.description}</p>
                <p><h5>Recommendation:</h5> Strong Buy</p>
            </div>
        )
    }
}

export default SearchDetail