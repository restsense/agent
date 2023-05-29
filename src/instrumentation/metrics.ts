import { MeterProvider, PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics';
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-grpc';
import { HostMetrics } from '@opentelemetry/host-metrics';
import { credentials } from '@grpc/grpc-js';
import config from '../configuration';
import resource from './resource';

/* Configure metrics reader */
const metricReader = new PeriodicExportingMetricReader({
    exportIntervalMillis: config.metrics.interval,
    exporter: new OTLPMetricExporter({
        url: config.collectorUrl,
        credentials: credentials.createInsecure(),
        concurrencyLimit: 1,
        headers: {}
    })
});

/* Configure provider and register it in opentelemetry*/
const provider = new MeterProvider({ resource: resource });
provider.addMetricReader(metricReader);

/* Start host metrics collection */
const hostMetrics = new HostMetrics({ meterProvider: provider, name: 'host-metrics' });
hostMetrics.start();