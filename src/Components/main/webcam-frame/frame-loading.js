import React, { Component } from 'react';
import logo from '../../../logo.svg';
import { Glyphicon } from 'react-bootstrap';
import './frame-loading.css';

class FrameLoading extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loadMsg: '',
			error: '',
			width: '',
			height: ''
		}
	}

	componentWillMount() {
		this.setState({
			loadMsg: this.props.loadMsg,
			width: this.props.width,
			height: this.props.height
		});
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.error && nextProps.error.name && nextProps.error.message) {
			this.setState({ error: nextProps.error });
		}
	}

	render() {
		return (
			<div className="FrameLoading">
				{!this.state.error && <img src={logo} className="loading-icon" alt="logo" />}
				{!this.state.error && <span className="loading-message">{this.state.loadMsg}</span>}
				{this.state.error && <i className="error-icon"><Glyphicon glyph="remove"></Glyphicon></i>}
				{this.state.error && <span className="error-message">
					{this.state.error.name}: {this.state.error.message}
				</span>}

				<style dangerouslySetInnerHTML={{__html: `
					.FrameLoading {
						width: ${this.state.width};
						height: ${this.state.height};
					}
					.loading-icon {
						width: calc(${this.state.width} / 2);
						height: calc(${this.state.height} / 2);
					}
					.error-icon {
						font-size: calc(calc(${this.state.width} / 5) + calc(${this.state.height} / 5));
					}
					`}
				}/>
			</div>
		)
	}
}

export default FrameLoading;