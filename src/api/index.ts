import { MeterProvider, PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics';
import { HostMetrics } from '@opentelemetry/host-metrics';
import { IResource } from '@opentelemetry/resources';
import { PushMetricExporter } from '@opentelemetry/sdk-metrics';
import { SpanExporter } from '@opentelemetry/sdk-trace-base';

import { ExpressInstrumentation } from '@opentelemetry/instrumentation-express';
import { registerInstrumentations } from "@opentelemetry/instrumentation";
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { NodeTracerProvider } from "@opentelemetry/sdk-trace-node";
import { BatchSpanProcessor } from "@opentelemetry/sdk-trace-base";

import config from '../configuration';
import defaultResource from './resources/resource'


/* 
* Start Metric and Trace Instrumentation
*/
export function startInstrumentation(
    tracesExporter : SpanExporter,
    metricExporter : PushMetricExporter,
    resource: IResource = defaultResource
) {
    startTracesInstrumentation(tracesExporter, resource)
    startMetricsInstrumentation(metricExporter, resource)
}

/*
* Start Trace Instrumentation
*/
export function startTracesInstrumentation(
    tracesExporter : SpanExporter,
    resource: IResource = defaultResource
) {

    /* Add instrumentation libraries */
    registerInstrumentations({
        instrumentations: [
        new HttpInstrumentation(),
        ...(config.tracing.expressTraces ? [new ExpressInstrumentation()] : [])
        ],
    });
        
    /* Configure provider and start tracing */
    const provider = new NodeTracerProvider({resource: resource});
    provider.addSpanProcessor(new BatchSpanProcessor(tracesExporter));
    provider.register();
}

/*
* Start Metric Instrumentation
*/
export function startMetricsInstrumentation(
    exporter : PushMetricExporter,
    resource : IResource = defaultResource
) {
    
    /* Configure metrics reader */
    const metricReader = new PeriodicExportingMetricReader({
        exportIntervalMillis: config.metrics.interval,
        exporter: exporter
    });

    /* Configure provider and register it in opentelemetry*/
    const provider = new MeterProvider({ resource: resource });
    provider.addMetricReader(metricReader);

    /* Start host metrics collection */
    const hostMetrics = new HostMetrics({ meterProvider: provider, name: 'host-metrics' });
    hostMetrics.start();
}

/*
* Start Log Instrumentation
*/
export function startLogsInstrumentation() {
    throw Error("Operation not supporter")
}

/*
* Export Default
*/
export default {
    startInstrumentation,
    startLogsInstrumentation,
    startTracesInstrumentation,
    startMetricsInstrumentation,
}