/**
 * Created by robertzzy on 29/09/16.
 */
import React from 'react';
import {  Glyphicon }from 'react-bootstrap';

if (process.env.BROWSER) {
	require('./Introduction.sass');
}


export default class Introduction extends React.Component {
	constructor() {
		super();
	}
	closeOverlay(){
		document.getElementById("overlay").style.height = "0%"
	}
	render() {
		return (
		<div className="overlay" id="overlay">

			<div className="overlay-content">
				<h1>健客介绍</h1>
				<p>我们是一个集社交与健身会所为一体的平台</p>
				<p>在这里你可以找到与你同城的运动同好</p>
				<p>在这里你挖掘适合你的健身会所</p>
				<p>在这里你可以管理和购买你的健身会所服务</p>
				<p>告别老旧的会员卡</p>
				<p>这，就是你的会所通行证</p>

				<p className="coming-soon">敬请期待</p>
				<Glyphicon glyph="menu-up" className="close-btn" onClick={()=>this.closeOverlay()}/>
			</div>

		</div>
		);
	}

}