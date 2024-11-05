import React from 'react';
import PropTypes from 'prop-types';

const TextLoader = (props) => {
    return (
        <div id="textLoader" className="textLoader">
            <div className="textLoader_wrapper">
                <div className="textLoader_wrapper-loader"></div>
            </div>
        </div>
    );
};

TextLoader.propTypes = {};

export default TextLoader;
