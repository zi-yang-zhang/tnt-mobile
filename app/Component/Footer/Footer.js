/**
 * Created by robertzzy on 05/07/16.
 */
import React from 'react';
import componentHandler from 'material-design-lite'
import ReactDOM from 'react-dom';
if (process.env.BROWSER) {
	require('./Footer.sass');
}


export default class Footer extends React.Component{
	constructor() {
		super();
	}

	render(){
		return(
			<footer className="mdl-mini-footer navbar-fixed-bottom">
				<div className="mdl-mini-footer__left-section">
					<div className="mdl-logo"><a>T.N.T科技</a></div>
				</div>
			</footer>
		)
	}
}