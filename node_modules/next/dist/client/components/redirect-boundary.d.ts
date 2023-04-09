import React from 'react';
import { AppRouterInstance } from '../../shared/lib/app-router-context';
interface RedirectBoundaryProps {
    router: AppRouterInstance;
    children: React.ReactNode;
}
export declare class RedirectErrorBoundary extends React.Component<RedirectBoundaryProps, {
    redirect: string | null;
}> {
    constructor(props: RedirectBoundaryProps);
    static getDerivedStateFromError(error: any): {
        redirect: string;
    };
    render(): React.ReactNode;
}
export declare function RedirectBoundary({ children }: {
    children: React.ReactNode;
}): JSX.Element;
export {};
