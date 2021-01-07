import { Switch, Route, NavLink } from 'react-router-dom';
import ErrorHandler from '../components/ErrorHandler';
import NewDrawing from './NewDrawing';
import Drawings from './Drawings';

const OpenCanvas = () => (
	<div>
		<nav className="nav d-flex justify-content-center my-4">
			<NavLink
				exact
				className="nav-link"
				activeClassName="disabled"
				to="/drawings">
				Show case
			</NavLink>
			<NavLink
				exact
				className="nav-link"
				activeClassName="disabled"
				to="/drawings/new">
				New Drawing
			</NavLink>
		</nav>
		<Switch>
			<Route exact path="/drawings/new" component={NewDrawing} />
			<Route exact path="/drawings" component={Drawings} />
			<Route exact path="/" component={Drawings} />
			<Route
				exact
				path="*"
				render={() => <ErrorHandler status={404} message="Not Found" />}
			/>
		</Switch>
	</div>
);

export default OpenCanvas;
