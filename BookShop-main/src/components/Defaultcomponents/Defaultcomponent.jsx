import React, { Children } from "react";
import Headercomponent from "../Headercomponents/Headercomponent";

const Defaultcomponent = ({ children }) => {
    return (
        <div>
            <Headercomponent />
            {children}
        </div>
    )
}
export default Defaultcomponent;
