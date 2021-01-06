import React from 'react';

const ErrorHandler = ({ status, message }) => (
	<header className="Error alert alert-danger text-center" role="alert">
		<h1>{status}</h1>
		<pre>{message}</pre>
	</header>
);

export default ErrorHandler;
