var React		= require('react'),
	ReactDOM	= require('react-dom'),
	Message 	= require('./hello-world'); // call the component on file hello-world.jsx


ReactDOM.render(<Message />, document.getElementById('content'));