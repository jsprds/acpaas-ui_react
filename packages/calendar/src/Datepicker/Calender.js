import React, {Component} from 'react';
import Moment from 'moment';
import Nav from './Nav';
import Body from './Body';
import Head from './Head';
import {nextItemInArray} from '../utils';

class Calendar extends Component {

	state = {
		displayedPeriod: this.props.activeDate ? Moment(this.props.activeDate) : Moment(),
		viewType: "days",
		views: ["days", "months", "years"]
	};

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.activeDate !== '') {
			return {
				displayedPeriod: Moment(nextProps.activeDate, nextProps.format)
			};
		}
		return null;
	}

	changeViewType() {
		const {viewType, views} = this.state;
		let switchTo = nextItemInArray(viewType, views);
		this.goToViewType(switchTo);
	}

	goToViewType(switchTo, displayedPeriod = "") {
		this.setState({
			viewType: switchTo,
			displayedPeriod: displayedPeriod || this.state.displayedPeriod
		});
	}

	moveDisplayedPeriod(delta) {
		const {viewType, displayedPeriod} = this.state;
		const period = viewType === 'days' ? 'months' : 'years';

		this.setState({
			displayedPeriod: displayedPeriod.clone().add(delta, period)
		});
	}

	render() {
		const {
			selectDay,
			activeDate,
			selectedDates,
			minDate,
			maxDate,
			format,
			noWeekends} = this.props;
		const {viewType, displayedPeriod} = this.state;

		return (
			<React.Fragment>
				<div className="m-datepicker__nav">
					<Nav
						viewType={viewType}
						displayedPeriod={displayedPeriod}
						onClickPrevious={this.moveDisplayedPeriod.bind(this, -1)}
						onClickViewType={this.changeViewType.bind(this)}
						onClickNext={this.moveDisplayedPeriod.bind(this, 1)}
					/>
				</div>
				<table cellPadding='0' cellSpacing='0'>
					<thead>
					<Head
						displayedPeriod={displayedPeriod}
						viewType={viewType}
					/>
					</thead>
					<tbody className="m-datepicker__calendar">
						<Body
						  viewType={viewType}
				      displayedPeriod={displayedPeriod}
				      selectDay={selectDay.bind(this)}
					    selectedDates={selectedDates}
				      minDate={minDate}
				      maxDate={maxDate}
				      format={format}
					    noWeekends={noWeekends}
				      activeDate={activeDate}
				      goToViewType={this.goToViewType.bind(this)}
						/>
					</tbody>
				</table>
			</React.Fragment>
		);
	}
}

export default Calendar;