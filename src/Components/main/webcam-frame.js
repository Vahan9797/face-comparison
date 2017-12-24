import React, { Component } from 'react';
import './webcam-frame.css';
import FrameLoading from './webcam-frame/frame-loading';

class WebCamFrame extends Component {
	constructor(props) {
		super(props);
		this.state = {
			frameSource: '',
			errorMsg: '',
			width: '',
			height: ''
		}
	}

	componentWillMount() {
		this.setState({
			width: this.props.width || '200px',
			height: this.props.height || '300px'
		});
 	}

	componentDidMount() {
		window.navigator.mediaDevices.getUserMedia({camera: true, video: true})
		  .then(stream => {
		  	this.setState({
		  		frameSource: window.URL.createObjectURL(stream)
		  	});
		  	setTimeout(() => this.props.onWebCamInit(), 300);
		  })
		  .catch(error => {
		  	this.setState({
		  		frameSource: '',
		  		errorMsg: {name: error.name, message: error.message}
		  	});
		  });
	}

	render() {
		return (
			<div className="WebCamFrame">
				{!this.state.frameSource && <FrameLoading
					loadMsg={'Waiting for user allowance...'}
					error={this.state.errorMsg}
					width={this.state.width}
					height={this.state.height}
				/>}
				{this.state.frameSource && <video
					src={this.state.frameSource}
					width='100%'
					height='100%'
					preload="true" autoPlay loop muted>
				</video>}
				<style dangerouslySetInnerHTML={{__html: `
					.WebCamFrame {
						width: ${this.state.width};
						height: ${this.state.height};
					}`}
				}/>
			</div>
		)
	}
}

export default WebCamFrame;