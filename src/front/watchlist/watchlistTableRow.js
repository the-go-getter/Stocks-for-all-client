import React from "react";

class WatchlistTableRow extends React.Component{
    constructor(props){
        super(props);
    }
    state = {
        editing: false,
        stock: this.props.stock,
        currID: this.props.stock._id
    }
    render(){
        return{
            
        }
    }
}
export default WatchlistTableRow

