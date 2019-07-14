import React from 'react'
import './DDstyle.css'

class SelectFor extends React.Component {
  state = {
    pages: this.props.pages || [],
    showPages: false,
    selectedPage: this.props.pages[0] || this.props.selectedPage,
  }

  dropDown = () => {
    this.setState(prevState => ({
      showPages: !prevState.showPages
    }))
  }

  localSelectPage = (page) => {
    this.setState({
      selectedPage: page,
      showPages: false,
    })
  }

  render() {
    
    return <div>
      <div className="select-box--box">
        <div className="select-box--container">
          <div className="select-box--selected-item">
            { this.state.selectedPage.value }
          </div>
          <div
            className="select-box--arrow"
            onClick={this.dropDown}
          ><span className={`${this.state.showPages ? 'select-box--arrow-up' : 'select-box--arrow-down'}`}/></div>
        </div>
        <div
          className="select-box--items"
          style={{display: this.state.showPages ? 'block' : 'none'}}
        >
          {
            this.state.pages.map(page => <div
              key={page.id}
              onClick={() => {
                this.props.selectPage(page)
                this.localSelectPage(page)
              }}
              className={this.state.selectedPage === page ? 'selected' : ''}
            >
              { page.value }
            </div>)
          }
        </div>
      </div>
      <input type="hidden" name={this.state.name} value={this.state.selectedPage.id} />
    </div>
  }
}

export default SelectFor