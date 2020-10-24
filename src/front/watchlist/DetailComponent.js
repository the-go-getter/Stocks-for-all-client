import React from "react";
import service from '../../services/StockService'
class DetailComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        stock:{},
        show:false
    }
    componentDidMount = async() => {
        if(typeof this.props.sid!== "undefined"){
            fetch(`https://financialmodelingprep.com/api/v3/company/profile/${this.props.sid}`)
                .then(response=>response.json())
                .then(response=>this.setState({
                    stock:response,
                    show:true
                }))
        } 
    }
    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.sid !== this.props.sid){
            if(typeof this.props.sid!== "undefined"){
                fetch(`https://financialmodelingprep.com/api/v3/company/profile/${this.props.sid}`)
                    .then(response=>response.json())
                    .then(response=>this.setState({
                        stock:response,
                        show:true
                    }))
            } 
        }
    }
    render() {
        return (
            <div>
                {console.log(this.state.stock)}
                {this.state.show && <div>
                <img src={this.state.stock.profile.image}/>
                <p><h5>Stock Name:</h5>{this.state.stock.profile.companyName}</p>
                <p><h5>Company website:</h5><a
                    href={this.state.stock.profile.website}>{this.state.stock.profile.website}</a></p>
                <p><h5>Current Price:</h5>{this.state.stock.profile.price}</p>
                <p><h5>Description:</h5>{this.state.stock.profile.description}</p>
                <p><h5>Recommendation:</h5> Strong Buy</p>
                </div>}
            </div>
        )
    }
}
export default DetailComponent