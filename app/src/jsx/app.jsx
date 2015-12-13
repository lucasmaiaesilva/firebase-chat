var React		= require('react');
var ReactDOM	= require('react-dom');
var ReactFire	= require('reactfire'); // its the bridge between firebase and our actual component
var Firebase	= require('firebase');
var FormInput 	= require('./form'); // call the component on file form.jsx
var DisplayMsg	= require('./display');
var	rootUrl		= 'https://incandescent-fire-2082.firebaseio.com/';

var App = React.createClass({
	getInitialState: function(){
		return { items: {} };
	},

	mixins: [ ReactFire ], // import the functions inside of react component

	componentWillMount: function(){
		this.bindAsObject(new Firebase(rootUrl + 'items/'), 'items');
		// bindAsObject is a method to create an object 
		// with the data passed to reference
	},

	render: function(){
		return (
			<div className="demo-card-event mdl-card mdl-shadow--2dp">
				<DisplayMsg items={this.state.items} />
				<FormInput itemsStore={this.firebaseRefs.items} />
			</div>
		);
	}
});


ReactDOM.render(<App />, document.getElementById('content'));