var React		= require('react');
var ReactDOM	= require('react-dom');
var ReactFire	= require('reactfire'); // its the bridge between firebase and our actual component
var Firebase	= require('firebase');
var FormInput 	= require('./form'); // call the component on file hello-world.jsx
var	rootUrl		= 'https://incandescent-fire-2082.firebaseio.com/';

var App = React.createClass({
	mixins: [ ReactFire ], // import the functions inside of react component

	componentWillMount: function(){
		this.bindAsObject(new Firebase(rootUrl + 'msgs/'), 'msgs');
		// bindAsObject is a method to create an object 
		// with the data passed to reference
	},

	render: function(){
		return (
			<div className="demo-card-event mdl-card mdl-shadow--2dp">
				<div className="mdl-card__title mdl-card--expand">
					<p className="text">
						Olá mundo	
					</p>
				</div>
				<div className="mdl-card__actions mdl-card--border">
					<FormInput />
				</div>
			</div>
		);
	}
});


ReactDOM.render(<App />, document.getElementById('content'));