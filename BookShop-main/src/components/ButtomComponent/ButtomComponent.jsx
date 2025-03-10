import React from "react";

const ButtomComponent = ({ size, styleButton, styleTextButton, textButton, ...rests }) => {
    return (
        <button size={size}
            style={styleButton}
            {...rests}>
            <span style={styleTextButton}>{textButton}</span>
        </button>
    );
};


export default ButtomComponent;
