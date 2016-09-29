'use strict';

import React from 'react';
import Header from './../Header/Header'
import Footer from './../Footer/Footer'
if (process.env.BROWSER) {
	require('./Main.sass');
}

export default class Main extends React.Component {
	constructor() {
		super();
	}

	render() {
		return (
				<div className="mdl-layout mdl-js-layout">
					<Header/>
					<div className="mdl-layout__content">
						{this.props.children}
					</div>
					<Footer/>
				</div>
		);
	}
	
}