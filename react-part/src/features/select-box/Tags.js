import React from 'react'
import './DDstyle.css'

class SelectBox extends React.Component {
  state = {
    items: this.props.items || [],
    showItems: false,
    selectedItem: this.props.items[0] || this.props.selectedItem,
  }

  dropDown = () => {
    this.setState(prevState => ({
      showItems: !prevState.showItems
    }))
  }

  localSelectItem = (item) => {
    this.setState({
      selectedItem: item,
      showItems: false,
    })
  }

  render() {
    
    return <div>
      <div className="select-box--box">
        <div className="select-box--container">
          <div className="select-box--selected-item">
            { this.state.selectedItem.tag }
          </div>
          <div
            className="select-box--arrow"
            onClick={this.dropDown}
          ><span className={`${this.state.showItems ? 'select-box--arrow-up' : 'select-box--arrow-down'}`}/></div>
        </div>
        <div
          className="select-box--items"
          style={{display: this.state.showItems ? 'block' : 'none'}}
        >
          {
            this.state.items.map(item => <div
              key={item.id}
              onClick={() => {
                this.props.selectItem(item)
                this.localSelectItem(item)
              }}
              className={this.state.selectedItem === item ? 'selected' : ''}
            >
              { item.tag }
            </div>)
          }
        </div>
      </div>
      <input type="hidden" name={this.state.name} value={this.state.selectedItem.id} />
    </div>
  }
}

export default SelectBox