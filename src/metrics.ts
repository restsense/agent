import { credentials } from '@grpc/grpc-js';
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-grpc';

import { startMetricsInstrumentation } from './api';
import { logger } from './utils/logger';
import config from './configuration';


logger.warn(
    `Deprectation Notice - 
    Metrics instrumentation through -r flag is deprecated.
    Instead of using: node -r @restsense/agent/metrics, 
    Please use: node -r @restsense/agent with the following env variable:
        RESTSENSE_TRACE_INSTRUMENTATION=False`
)

const metricExporter = new OTLPMetricExporter({
    url: config.collectorUrl,
    credentials: credentials.createInsecure(),
    concurrencyLimit: 1,
    headers: {}
})

startMetricsInstrumentation(metricExporter)