/**
 * Created by robertzzy on 05/07/16.
 */
import React from 'react';
import { Link } from 'react-router'

if (process.env.BROWSER) {
	require('./Header.sass');
}

export default class Header extends React.Component {
	constructor() {
		super();
	}

	render(){
		return (
		<div className="mdl-layout--fixed-header">
			<header className="mdl-layout__header">
				<div className="mdl-layout__header-row">
					<span className="mdl-layout-title"><Link to="/">健客</Link></span>
					<div className="mdl-layout-spacer"></div>
					<nav className="mdl-navigation">
						<Link to="/contact" className="mdl-navigation__link" activeClassName="active-link">联系我们</Link>
					</nav>
				</div>
			</header>
		</div>
		);
	}
}