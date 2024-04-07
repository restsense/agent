import { ExportResult } from '@opentelemetry/core';
import { ExportResultCode } from '@opentelemetry/core';
import { ReadableSpan, SpanExporter } from '@opentelemetry/sdk-trace-base';


export class InMemoryExporter implements SpanExporter {
    
    _spans : ReadableSpan[]
    _stopped : boolean

    constructor() {
        this._spans = [];
        this._stopped = false;
    }

    export(spans: ReadableSpan[], resultCallback: (result: ExportResult) => void): void {
        try {
            if (!this._stopped){
                this._spans.push(...spans);
            }
            setTimeout(() => resultCallback({ code: ExportResultCode.SUCCESS }), 0);
        } catch (error) {
            return resultCallback({
                code: ExportResultCode.FAILED,
                error: new Error('Error exporting spans\n' + error.message + '\n' + error.stack),
            })
        }
    }

    start() : void {
        this._stopped = false;
    }

    stop() : void {
        this._stopped = true;
    }

    shutdown() : Promise<void> {
        this._stopped = true;
        this._spans = [];

        return this.forceFlush();
    }

    forceFlush() : Promise<void> {
        return Promise.resolve();
    }

    reset() : void{
        this._spans = [];
    }

    getFinishedSpans() : ReadableSpan[] {
        return this._spans;
    }
}