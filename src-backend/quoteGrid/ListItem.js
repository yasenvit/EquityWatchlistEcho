import React, { Component } from 'react';
import ListProps from './ListProps'

export default class ListItem extends Component {
    render() {
        return this.props.items.map((item, index) => (
            <ListProps key={index} item={item} addSymbol={this.props.addSymbol} activeTickers = {this.props.activeTickers}/>   
        ))  
    }
}
