import { Resource, envDetector, processDetector, detectResourcesSync } from "@opentelemetry/resources";
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions";
import config from '../configuration';

/* Config resource metadata */
export default detectResourcesSync({
  detectors: [envDetector, processDetector]
}).merge(
  new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: config.serviceName,
    [SemanticResourceAttributes.SERVICE_VERSION]: config.serviceVersion,
    ['service.ip_addr']: config.serviceIp,
  })
);