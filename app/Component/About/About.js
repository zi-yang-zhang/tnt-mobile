/**
 * Created by robertzzy on 28/09/16.
 */
import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { Jumbotron }from 'react-bootstrap';

if (process.env.BROWSER) {
	require('./About.sass');
}

export default class About extends React.Component {
	constructor() {
		super();
	}

	render() {
		return (
			<main>
				<ReactCSSTransitionGroup transitionName = "title"
										 transitionAppear = {true} transitionAppearTimeout = {500}
										 transitionEnter = {true} transitionLeave = {false}>
					<Jumbotron className="title-container">
						<h1>关于</h1>
					</Jumbotron>
				</ReactCSSTransitionGroup>

			</main>
		);
	}

}