import React, { Component } from 'react'
import Select, { components } from 'react-select';
import apiCall from './apiCall';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'



const customStyles = {
  control: (base, state) => ({
    ...base,
    fontFamily: 'Times New Roman',
    fontSize: 18,
    border: state.isFocused ? 0 : 0,
    boxShadow: state.isFocused ? 0 : 0,
    cursor: 'text',
    borderRadius: 0,
    // borderBottom: 'solid 1px',
  }),

  option: (styles, { isFocused }) => {
    return {
      ...styles,
      cursor: 'pointer',
      backgroundColor: isFocused ? 'white' : 'white',
      color: isFocused ? 'rgba(255, 80, 86)' : 'black',
      lineHeight: 2,
    }
  },

  input: styles => ({
    ...styles,
    color: 'black',
    fontFamily: 'Times New Roman, Times, Serif',
  }),

  menu: styles => ({
    ...styles,
    marginTop: 0,
    boxShadow: 'none',
    borderRadius: 0,
  }),

  singleValue: styles => ({
    ...styles,
    color: 'rgba(255, 80, 86)',
  }),
}
export default class SelectItemLookup extends Component {

  state = {
    selectedOption: null,
    options:[]
  };

  getStocksList() {
    const endpoint = `/api/stocks/all`
    const promise = apiCall(endpoint,'get')
    promise.then(blob => blob.json()).then(json => {
      this.setState({
        options: json
      })
    })
  }

    handleChange = (selectedOption, props) => {
      console.log(this.props.pickHandle)
      if(this.props.pickHandle) {
        this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption);
        this.props.pickHandle(selectedOption.value)
      } else {
        this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption);
        this.props.addSymbol(selectedOption.value)
      }
    };

    componentDidMount() {

      if(this.state.options && this.state.options.length===0) {
        this.getStocksList()
      }
    }

  /*  componentWillUnmount(){
      console.log("=>selectedoption has been unmounted<=")
      this.setState({selectedOption:null})
    }*/
    render() {
 
      const { selectedOption, options } = this.state;
 
      
      const DropdownIndicator = props => {
        return(
         components.DropdownIndicator && (
           <components.DropdownIndicator {...props}>
             <FontAwesomeIcon icon={faSearch} />
           </components.DropdownIndicator>
         )
        )
       }
   
      return (
        <Select
          value={selectedOption}
          onChange={this.handleChange}
          placeholder= "find ticker"
          options={options}
          styles={customStyles}
          openMenuOnClick={false}
    
    classNamePrefix= "select"
    styles={customStyles}
    
    components={ {DropdownIndicator} }
    
        />
      );
    }
  }