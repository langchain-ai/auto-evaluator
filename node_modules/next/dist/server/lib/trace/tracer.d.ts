import { SpanNames } from './constants';
import type { ContextAPI, Span, SpanOptions } from '@opentelemetry/api';
declare const SpanStatusCode: typeof import("@opentelemetry/api").SpanStatusCode, SpanKind: typeof import("@opentelemetry/api").SpanKind;
declare type TracerSpanOptions = SpanOptions & {
    parentSpan?: Span;
    tracerName?: string;
};
interface NextTracer {
    getContext(): ContextAPI;
    /**
     * Instruments a function by automatically creating a span activated on its
     * scope.
     *
     * The span will automatically be finished when one of these conditions is
     * met:
     *
     * * The function returns a promise, in which case the span will finish when
     * the promise is resolved or rejected.
     * * The function takes a callback as its second parameter, in which case the
     * span will finish when that callback is called.
     * * The function doesn't accept a callback and doesn't return a promise, in
     * which case the span will finish at the end of the function execution.
     *
     */
    trace<T>(name: SpanNames, fn: (span: Span, done?: (error?: Error) => any) => Promise<T>): Promise<T>;
    trace<T>(name: SpanNames, fn: (span: Span, done?: (error?: Error) => any) => T): T;
    trace<T>(name: SpanNames, options: TracerSpanOptions, fn: (span: Span, done?: (error?: Error) => any) => Promise<T>): Promise<T>;
    trace<T>(name: SpanNames, options: TracerSpanOptions, fn: (span: Span, done?: (error?: Error) => any) => T): T;
    /**
     * Wrap a function to automatically create a span activated on its
     * scope when it's called.
     *
     * The span will automatically be finished when one of these conditions is
     * met:
     *
     * * The function returns a promise, in which case the span will finish when
     * the promise is resolved or rejected.
     * * The function takes a callback as its last parameter, in which case the
     * span will finish when that callback is called.
     * * The function doesn't accept a callback and doesn't return a promise, in
     * which case the span will finish at the end of the function execution.
     */
    wrap<T = (...args: Array<any>) => any>(name: SpanNames, fn: T): T;
    wrap<T = (...args: Array<any>) => any>(name: SpanNames, options: TracerSpanOptions, fn: T): T;
    wrap<T = (...args: Array<any>) => any>(name: SpanNames, options: (...args: any[]) => TracerSpanOptions, fn: T): T;
    /**
     * Starts and returns a new Span representing a logical unit of work.
     *
     * This method do NOT modify the current Context by default. In result, any inner span will not
     * automatically set its parent context to the span created by this method unless manually activate
     * context via `tracer.getContext().with`. `trace`, or `wrap` is generally recommended as it gracefully
     * handles context activation. (ref: https://github.com/open-telemetry/opentelemetry-js/issues/1923)
     */
    startSpan(name: SpanNames): Span;
    startSpan(name: SpanNames, options: TracerSpanOptions): Span;
    /**
     * Returns currently activated span if current context is in the scope of the span.
     * Returns undefined otherwise.
     */
    getActiveScopeSpan(): Span | undefined;
}
declare class NextTracerImpl implements NextTracer {
    /**
     * Returns an instance to the trace with configured name.
     * Since wrap / trace can be defined in any place prior to actual trace subscriber initialization,
     * This should be lazily evaluated.
     */
    private getTracerInstance;
    getContext(): ContextAPI;
    getActiveScopeSpan(): Span | undefined;
    trace<T>(name: SpanNames, fn: (span: Span, done?: (error?: Error) => any) => Promise<T>): Promise<T>;
    trace<T>(name: SpanNames, fn: (span: Span, done?: (error?: Error) => any) => T): T;
    trace<T>(name: SpanNames, options: TracerSpanOptions, fn: (span: Span, done?: (error?: Error) => any) => Promise<T>): Promise<T>;
    trace<T>(name: SpanNames, options: TracerSpanOptions, fn: (span: Span, done?: (error?: Error) => any) => T): T;
    wrap<T = (...args: Array<any>) => any>(name: SpanNames, fn: T): T;
    wrap<T = (...args: Array<any>) => any>(name: SpanNames, options: TracerSpanOptions, fn: T): T;
    wrap<T = (...args: Array<any>) => any>(name: SpanNames, options: (...args: any[]) => TracerSpanOptions, fn: T): T;
    startSpan(name: SpanNames): Span;
    startSpan(name: SpanNames, options: TracerSpanOptions): Span;
    private getSpanContext;
}
declare const getTracer: () => NextTracerImpl;
export { NextTracer, getTracer, Span, SpanOptions, ContextAPI, SpanStatusCode, TracerSpanOptions, SpanKind, };
