var React = require('react');

module.exports = React.createClass({
	renderList: function(){
		var msgs = [];
		if(this.props.items && Object.keys(this.props.items).length === 0){
			return ( <p>Chat vazio digite algo para iniciar</p> );
		} 
		else {
			for(var key in this.props.items){
				msgs.push(
					<p>
						<span className="user">{this.props.items[key].user} diz: </span>
						{this.props.items[key].text}
					</p>
				);
			}
			return msgs;
		}
	},

	render: function(){
		return ( 
			<div className={"text mdl-card--expand content " + (this.props.loaded ? 'loaded': '')}>
				{this.renderList()}
			</div>
		);
	}
});