import React from 'react';

const MyInput = (props) => {
    return (
        <input type={props.type ?? 'text'} {...props}/>
    );
};

export default MyInput;