import { Normalizer } from './normalizer';
export declare class PrefixingNormalizer implements Normalizer {
    private readonly prefix;
    constructor(prefix: string);
    normalize(pathname: string): string;
}
