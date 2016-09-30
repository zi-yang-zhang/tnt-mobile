/**
 * Created by robertzzy on 28/09/16.
 */
import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { Jumbotron, Glyphicon }from 'react-bootstrap';

if (process.env.BROWSER) {
	require('./Contact.sass');
}

export default class Contact extends React.Component {
	constructor() {
		super();
	}

	render() {
		return (
			<main>
				<ReactCSSTransitionGroup transitionName = "contact-container"
										 transitionAppear = {true} transitionAppearTimeout = {500}
										 transitionEnter = {true} transitionLeave = {false}>
					<Jumbotron className="contact-container">
						<p>联系我们：</p>
						<Glyphicon glyph="envelope" className="glyph-margin"/><span>: <a href="mailto:jk-mobile@hotmail.com">jk-mobile@hotmail.com</a></span>
					</Jumbotron>
				</ReactCSSTransitionGroup>

			</main>
		);
	}

}