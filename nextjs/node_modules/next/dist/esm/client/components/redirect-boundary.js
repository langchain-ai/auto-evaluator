"use client";
import React, { useEffect } from 'react';
import { useRouter } from './navigation';
import { getURLFromRedirectError, isRedirectError } from './redirect';

function HandleRedirect({ redirect , reset  }) {
    const router = useRouter();
    useEffect(()=>{
        // @ts-ignore startTransition exists
        React.startTransition(()=>{
            router.replace(redirect, {});
            reset();
        });
    }, [
        redirect,
        reset,
        router
    ]);
    return null;
}
export class RedirectErrorBoundary extends React.Component {
    static getDerivedStateFromError(error) {
        if (isRedirectError(error)) {
            const url = getURLFromRedirectError(error);
            return {
                redirect: url
            };
        }
        // Re-throw if error is not for redirect
        throw error;
    }
    render() {
        const redirect = this.state.redirect;
        if (redirect !== null) {
            return /*#__PURE__*/ React.createElement(HandleRedirect, {
                redirect: redirect,
                reset: ()=>this.setState({
                        redirect: null
                    })
            });
        }
        return this.props.children;
    }
    constructor(props){
        super(props);
        this.state = {
            redirect: null
        };
    }
}
export function RedirectBoundary({ children  }) {
    const router = useRouter();
    return /*#__PURE__*/ React.createElement(RedirectErrorBoundary, {
        router: router
    }, children);
}

//# sourceMappingURL=redirect-boundary.js.map