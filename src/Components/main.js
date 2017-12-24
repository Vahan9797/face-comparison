import React, { Component } from 'react';
import './main.css';
import WebCamFrame from './main/webcam-frame';
import PositionHandler from './main/position-handler';
import clm from 'clmtrackr';

class Main extends Component {

	constructor(props) {
		super(props);
		this.ctracker = new clm.tracker();
		window.ctracker = this.ctracker;
	}

	startTracking() {
		this.ctracker.init();
		this.ctracker.start(document.querySelector('video'));
		if(!window.__positionLoop) {
			(window.__positionLoop = () => {
				window.requestAnimationFrame(window.__positionLoop);
				return this.ctracker.getCurrentPosition();
			})();
		}
	}

	render() {
		return (
			<div className="Main">
				<WebCamFrame width={'640px'} height={'480px'} onWebCamInit={() => this.startTracking()}/>
				<PositionHandler />
			</div>
		)
	}
}

export default Main;