import { credentials } from '@grpc/grpc-js';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-grpc';

import { startTracesInstrumentation } from './api';
import { logger } from './utils/logger';
import config from './configuration';

// TODO add logger
logger.warn(
    `WARNING: Deprectation Notice - 
    Traces instrumentation through -r flag is deprecated.
    Instead of using: node -r @restsense/agent/tracing, 
    Please use: node -r @restsense/agent with the following env variable:
        RESTSENSE_METRIC_INSTRUMENTATION=False`
)

const tracesExporter = new OTLPTraceExporter({
    url: config.collectorUrl,
    credentials: credentials.createInsecure(),
    headers: {}
});

startTracesInstrumentation(tracesExporter)