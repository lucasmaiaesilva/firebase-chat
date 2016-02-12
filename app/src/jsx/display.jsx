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
				var valueClasse = String(this.props.items[key].classe);
				var text = "";
				var classe = "";

				if (valueText.indexOf("http:") === 0 || valueText.indexOf("https:") === 0) {
					text = <a href={valueText} target="_blank"> {valueText} </a>;
				} else {
					text = this.props.items[key].text;
					classe = this.props.items[key].classe;
				}

				msgs.push(
					<div key={key} className={classe}>
						{text}
					</div>
				);
			}
			return msgs;
		}
	},

	render: function(){
		return ( 
			<div className="display">
				{this.renderList()}
			</div>
		);
	}
});