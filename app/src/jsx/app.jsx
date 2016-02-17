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
		// this.state.items - only read data, just for display on screen
		// this.firebaseRefs.items - object from firebase, used to insert or alter data
		return (
			<div className="site">
				<aside className="barra-lateral">
					<img src="img/me.jpg" />
					<a href="https://github.com/lucasmaiaesilva/firebase-chat" className="card">
						<span>Fork me on Github</span>
					</a>
					<p className="coursive">or Leave me a message</p>
				</aside>
				<section className="conteudo">
					<DisplayMsg items={this.state.items} loaded={this.state.loaded} />
					<FormInput itemsStore={this.firebaseRefs.items} />
				</section>
			</div>
		);
	}
});


ReactDOM.render(<App />, document.getElementById('content'));