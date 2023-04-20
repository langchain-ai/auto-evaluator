interface NetworkStatus {
    downlink?: number;
    downlinkMax?: number;
    effectiveType?: 'slow-2g' | '2g' | '3g' | '4g';
    rtt?: number;
    saveData?: boolean;
    type?: 'bluetooth' | 'cellular' | 'ethernet' | 'wifi' | 'wimax' | 'none' | 'other' | 'unknown';
}
export declare function useNetwork(): {
    online: boolean;
} & NetworkStatus;
export {};
//# sourceMappingURL=use-network.d.ts.map