/**
 * Created by robertzzy on 06/07/16.
 */
'use strict';

import React from 'react';
import {Router, Route, browserHistory, IndexRoute} from 'react-router'
import Main from './Main/Main'
import Home from "./Home/Home";
import Contact from "./Contact/Contact";
import About from "./About/About";

export default class MainRouter extends React.Component {
	constructor() {
		super();
	}

	render(){
		return (
			<Router history={browserHistory}>
				<Route path="/" component={Main}>
					<IndexRoute component={Home}/>
					<Route path="contact" component={Contact}/>
					<Route path="about" component={About}/>
				</Route>
			</Router>

		);
	}
	componentDidUpdate() {
		// This upgrades all upgradable components (i.e. with 'mdl-js-*' class)
		componentHandler.upgradeDom();

	}
}