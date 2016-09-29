/**
 * Created by robertzzy on 28/09/16.
 */
import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { Jumbotron }from 'react-bootstrap';

if (process.env.BROWSER) {
	require('./Home.sass');
}

export default class Home extends React.Component {
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
						<h1>健客</h1>
					</Jumbotron>
				</ReactCSSTransitionGroup>

			</main>
		);
	}

}