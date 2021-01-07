const ErrorHandler = ({ status, message }) => (
	<header className="alert alert-danger text-center" role="alert">
		<h1>{status}</h1>
		<pre>{message}</pre>
	</header>
);

export default ErrorHandler;
