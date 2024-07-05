import React from 'react';
import {ClipLoader} from "react-spinners";

const Loading = () => {
    return (
        <div className='__loading'>
            <ClipLoader
                size={35}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    );
};

export default Loading;