var React = require('react');

module.exports = React.createClass({
	getInitialState: function(){
		return {
			text: ""
		}
	},

	handleSubmit: function(e){
		e.preventDefault();
		console.log(this.state.text);
		this.setState({text: ""});
	},

	handleInputChange: function(e){
		this.setState({ text: e.target.value });
	},

	render: function() {
		return (
			<form action="#" onSubmit={this.handleSubmit}>
				<div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
					<input 
						className="mdl-textfield__input"
						type="text"
						id="sample3"
						value={this.state.text}
						onChange={this.handleInputChange}
					/>
					<label className="mdl-textfield__label" htmlFor="sample3">Mensagem</label>
				</div>
			</form>
		);
	}
});