var React = require('react');

module.exports = React.createClass({
	renderList: function(){
		var msgs = [];
		if(this.props.items && Object.keys(this.props.items).length === 0){
			return ( <p>Chat vazio digite algo para iniciar</p> );
		} 
		else {
			for(var key in this.props.items){
				
				var valueText = String(this.props.items[key].text);
				var text = "";

				if (valueText.indexOf("http:") == 0 || valueText.indexOf("https:") == 0)
				{
					text = <a href={valueText} target="_blank"> {valueText} </a>;
				}
				else
				{
					text = this.props.items[key].text;
				}

				msgs.push(
					<p>
						<span className="user">{this.props.items[key].user} diz: </span>
						{text}
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