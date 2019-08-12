import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../styles/style.css'



export default class DateRange extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      endDate: null
    };
  }

  handleChange = ({ startDate, endDate }) => {
    startDate = startDate || this.state.startDate;
    endDate = endDate || this.state.endDate;
    this.setState({ startDate, endDate });
    this.props.pickRangeHandler(startDate, endDate)
  };

  handleChangeStart = startDate => this.handleChange({ startDate });
  handleChangeEnd = endDate => this.handleChange({ endDate });

  componentWillUnmount(){
      this.setState({
        startDate: null,
        endDate: null
      })
  }
  componentDidUpdate(prevProps){
      if(this.props.isActive === false && this.props.isActive !== prevProps.isActive) {
          this.setState({
            startDate: null,
            endDate: null
          })
      }
  }

  render() {
      console.log("ISACTIVE ==>", this.props.isActive)
    return (
        <div className="row">
            <DatePicker
                className = {this.state.startDate && this.state.endDate?"rangeinput activeinput":"rangeinput"}
                placeholderText="from date"
                selected={this.state.startDate}
                selectsStart
                startDate={this.state.startDate}
                endDate={this.state.endDate}
                onChange={this.handleChangeStart}
            />
            <DatePicker
                className = {this.state.startDate && this.state.endDate?"rangeinput rangetodate activeinput":"rangeinput rangetodate"}
                placeholderText="to date"
                selected={this.state.endDate}
                selectsEnd
                startDate={this.state.startDate}
                endDate={this.state.endDate}
                onChange={this.handleChangeEnd}
                minDate={this.state.startDate}
            />
        </div>
    );
  }
}