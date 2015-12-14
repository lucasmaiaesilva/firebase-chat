var React		= require('react');
var ReactDOM	= require('react-dom');
var ReactFire	= require('reactfire'); // its the bridge between firebase and our actual component
var Firebase	= require('firebase');
var FormInput 	= require('./form'); // call the component on file form.jsx
var DisplayMsg	= require('./display');
var	rootUrl		= 'https://incandescent-fire-2082.firebaseio.com/';

var App = React.createClass({
	getInitialState: function(){
		return {
			items: {},
			loaded: false
		};
	},

	mixins: [ ReactFire ], // import the functions inside of react component

	componentWillMount: function(){
		var fb = new Firebase(rootUrl + 'items/');
		this.bindAsObject(fb, 'items');
		// bindAsObject is a method to create an object 
		// with the data passed to reference
		fb.on('value', this.handleDataLoaded);
	},

	handleDataLoaded: function(){
		this.setState({loaded: true});
	},

	render: function(){
		return (
			<div className="demo-card-event mdl-card mdl-shadow--4dp">
				<DisplayMsg items={this.state.items} loaded={this.state.loaded} />
				<FormInput itemsStore={this.firebaseRefs.items} />
			</div>
		);
	}
});


ReactDOM.render(<App />, document.getElementById('content'));