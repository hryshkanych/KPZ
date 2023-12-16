import React from 'react';

const ProtectedComponent = ({ isAuthenticated, children }) => {
    if (!isAuthenticated) {
        return <div>Access Denied</div>;
    }

    return <>{children}</>;
};

export default ProtectedComponent;
