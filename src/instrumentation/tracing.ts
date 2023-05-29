import { ExpressInstrumentation } from '@opentelemetry/instrumentation-express';
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-grpc";
import { registerInstrumentations } from "@opentelemetry/instrumentation";
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { NodeTracerProvider } from "@opentelemetry/sdk-trace-node";
import { BatchSpanProcessor } from "@opentelemetry/sdk-trace-base";
import { credentials } from '@grpc/grpc-js';
import config from '../configuration';
import resource from './resource';

/* Add instrumentation libraries */
registerInstrumentations({
  instrumentations: [
    new HttpInstrumentation(),
    ...(config.tracing.expressTraces ? [new ExpressInstrumentation()] : [])
  ],
});

/* Configure exporter */
const exporter = new OTLPTraceExporter({
  url: config.collectorUrl,
  credentials: credentials.createInsecure(),
  headers: {}
});

/* Configure provider and start tracing */
const provider = new NodeTracerProvider({resource: resource});
provider.addSpanProcessor(new BatchSpanProcessor(exporter));
provider.register();