import { ModuleLoader } from './module-loader';
/**
 * Loads a module using `require(id)`.
 */
export declare class NodeModuleLoader implements ModuleLoader {
    load<M>(id: string): M;
}
