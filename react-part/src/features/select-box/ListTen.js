import React from 'react'
import './DDstyle.css'

class SelectList extends React.Component {
  state = {
    lists: this.props.lists || [],
    showItems: false,
    selectedList: this.props.lists[0] || this.props.selectedList,
  }

  dropDown = () => {
    this.setState(prevState => ({
      showItems: !prevState.showItems
    }))
  }

  localSelectList = (item) => {
    this.setState({
      selectedList: item,
      showItems: false,
    })
  }

  render() {
    
    return <div>
      <div className="select-box--box">
        <div className="select-box--container">
          <div className="select-box--selected-item">
            { this.state.selectedList.tag }
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
            this.state.lists.map(item => <div
              key={item.id}
              onClick={() => {
                this.props.selectList(item)
                this.localSelectList(item)
              }}
              className={this.state.selectedList === item ? 'selected' : ''}
            >
              { item.tag }
            </div>)
          }
        </div>
      </div>
      <input type="hidden" name={this.state.name} value={this.state.selectedList.id} />
    </div>
  }
}

export default SelectList