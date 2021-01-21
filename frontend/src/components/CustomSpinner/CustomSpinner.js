import React, {memo} from "react";
import classes from "./CustomSpinner.module.css";

const CustomSpinner = (props) => (
    <div className={classes.Loader} style={props.style}>Loading...</div>
);

export default memo(CustomSpinner);