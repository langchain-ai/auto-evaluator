import React from 'react';
class NotFoundErrorBoundary extends React.Component {
    static getDerivedStateFromError(error) {
        if ((error == null ? void 0 : error.digest) === 'NEXT_NOT_FOUND') {
            return {
                notFoundTriggered: true
            };
        }
        // Re-throw if error is not for 404
        throw error;
    }
    render() {
        if (this.state.notFoundTriggered) {
            return /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement("meta", {
                name: "robots",
                content: "noindex"
            }), this.props.notFoundStyles, this.props.notFound);
        }
        return this.props.children;
    }
    constructor(props){
        super(props);
        this.state = {
            notFoundTriggered: !!props.asNotFound
        };
    }
}
export function NotFoundBoundary({ notFound , notFoundStyles , asNotFound , children  }) {
    return notFound ? /*#__PURE__*/ React.createElement(NotFoundErrorBoundary, {
        notFound: notFound,
        notFoundStyles: notFoundStyles,
        asNotFound: asNotFound
    }, children) : /*#__PURE__*/ React.createElement(React.Fragment, null, children);
}

//# sourceMappingURL=not-found-boundary.js.map