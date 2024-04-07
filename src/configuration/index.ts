import os from 'os';

if (!process.env.RESTSENSE_COLLECTOR_URL) {
    console.warn('WARNING: RESTSENSE_COLLECTOR_URL is not set, using default value: 127.0.0.1:4317');
}

export default {
    serviceVersion: process.env.npm_package_version ?? 'unknown', // Internally set
    serviceName: process.env.RESTSENSE_SERVICE_NAME ?? process.env.npm_package_name ?? 'unknown',
    serviceIp: os.networkInterfaces().eth0?.[0]?.address ?? 'unknown',
    collectorUrl: process.env.RESTSENSE_COLLECTOR_URL ?? '127.0.0.1:4317',
    metrics: {
        enable: Boolean(process.env.RESTSENSE_METRIC_INSTRUMENTATION ?? true),
        interval: parseInt(process.env.RESTSENSE_METRICS_INTERVAL) ?? 60000,
    },
    tracing: {
        enable: Boolean(process.env.RESTSENSE_TRACE_INSTRUMENTATION ?? true),
        expressTraces: process.env.RESTSENSE_TRACING_ENABLE_EXPRESS ?? false,
    }
}