/**
 * Created by robertzzy on 28/09/16.
 */
import React from 'react';
import Introduction from './Introduction/Introduction'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { Jumbotron, Glyphicon }from 'react-bootstrap';

if (process.env.BROWSER) {
	require('./Home.sass');
}

export default class Home extends React.Component {
	constructor() {
		super();
	}
	showOverlay(){
		document.getElementById("overlay").style.height = "100%"
	}

	render() {
		return (
			<main>
				<ReactCSSTransitionGroup transitionName = "title"
										 transitionAppear = {true} transitionAppearTimeout = {500}
										 transitionEnter = {true} transitionEnterTimeout ={500}
										 transitionLeave = {false}>
					<Jumbotron className="title-container">
						<Glyphicon glyph="menu-down" className="open-detail" onClick={()=>this.showOverlay()}/>
					</Jumbotron>

				</ReactCSSTransitionGroup>
				<Introduction/>
			</main>
		);
	}

}