import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-grpc';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-grpc';
import { credentials } from '@grpc/grpc-js';
import { logger } from './utils/logger';
import config from './configuration';
import api from './api';


const metricExporter = new OTLPMetricExporter({
    url: config.collectorUrl,
    credentials: credentials.createInsecure(),
    concurrencyLimit: 1,
    headers: {}
})

const tracesExporter = new OTLPTraceExporter({
    url: config.collectorUrl,
    credentials: credentials.createInsecure(),
    headers: {}
});

if (config.metrics.enable && config.tracing.enable)
    api.startInstrumentation(tracesExporter, metricExporter)
else if (config.metrics.enable)
    api.startMetricsInstrumentation(metricExporter)
else if (config.tracing.enable)
    api.startTracesInstrumentation(tracesExporter)
else
    logger.warn("Traces and Metrics are not active. No telemetry will be collected")