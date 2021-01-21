import react from "react";
import {Container} from "react-bootstrap";
import {Link} from "react-router-dom";
import classes from "./ErrorPage.module.css";
import NotFoundTextImage from "../../assets/404-text.png";

const H1Style = {
    background: "url(" + NotFoundTextImage + ")",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundSize: "cover",
    backgroundPosition: "center"
}

const ErrorPage = (props) => {

	return (
		
		<Container className={classes.Container}>
			<div className={classes.Wrapper}>
				<h1 style={H1Style} className={classes.ErrorCode}>404</h1>
				<h2 className={classes.Oops}>Oops! This Page Could Not Be Found</h2>
				<p className={classes.Sorry}>Sorry but the page you are looking for does not exist</p>
				<Link to="/" className={classes.HomeLink}>Home</Link>
			</div>
		</Container>
		
	)
};

export default ErrorPage;