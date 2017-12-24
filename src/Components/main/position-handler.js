import React, { Component } from 'react';
import FrameLoading from './webcam-frame/frame-loading';
import './position-handler.css';

class PositionHandler extends Component {

	constructor(props) {
		super(props);
		this.state = {
			posArray: [],
		}
	}

	componentDidMount() {
		setInterval(() => {
			let arr = this.state.posArray;
			if(typeof window.__positionLoop === 'function') {
				arr.unshift(window.__positionLoop());
				this.setState({ posArray: arr.slice() });
			}
		}, 1000);
	}

	render() {
		return (
			<div className="PositionHandler">
				{!this.state.posArray.some(item => item) && <FrameLoading
					loadMsg={'Loading positions...'}
					width={'640px'}
					height={'480px'}
				/>}
				{this.state.posArray.map((positions, index) => positions && <div key={index} className="positions">{
					positions.map((pos, posIndex) => <div key={posIndex} className="position">
						<span className="highlight-coords">{`x${posIndex}: `}</span>{`${pos[0]}`},&nbsp;
						<span className="highlight-coords">{`y${posIndex}: `}</span>{`${pos[1]}`}
						</div>)
				}</div>)}
			</div>
		)
	}

}

export default PositionHandler;