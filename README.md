# RESTSENSE CLIENT

## Setup
To start exporting telemetry data from your services using RESTSense, you will need to install the agent on the services you wish to keep track of. The agent is a Node.js module that can be installed using npm.

```bash
npm install @restsense/agent
```

Once installed, you will need to require the package before starting your service. The agent will automatically start collecting data and sending it to the collector. Depending on what you want to track, there are three possible require statements.

### Tracing
To track the execution time of your service, you will need to require the tracer module exported from the agent package. Assuming you don't have a `start` script in your `package.json` file, you can start your service with the following command.

```bash
node -r @restsense/agent/tracing index.js
```

In case you have a start script, you can add the require statement to the start script.

```json
{
  "scripts": {
    "start": "node -r @restsense/agent/tracing index.js"
  }
}
```

### Metrics
To track metrics like the memory and CPU usage of your service, you will need to require the metrics module exported from the agent package. Assuming you don't have a `start` script in your `package.json` file, you can start your service with the following command.

```bash
node -r @restsense/agent/metrics index.js
```

In case you have a start script, you can add the require statement to the start script.

```json
{
  "scripts": {
    "start": "node -r @restsense/agent/metrics index.js"
  }
}
```

### Tracing and Metrics
By default, the agent will track both tracing and metrics, so you can require the agent module exported from the agent package. Assuming you don't have a `start` script in your `package.json` file, you can start your service with the following command.

```bash
node -r @restsense/agent index.js
```

In case you have a start script, you can add the require statement to the start script.

```json
{
  "scripts": {
    "start": "node -r @restsense/agent index.js"
  }
}
```

> Note that the agent requires the `RESTSENSE_COLLECTOR_URL` and `RESTSENSE_SERVICE_NAME` environment variables to be set. The `RESTSENSE_COLLECTOR_URL` should point to the collector service and the `RESTSENSE_SERVICE_NAME` should be a unique name for your service. See the [configuration](#configuration) section for more information.

## Configuration

RESTSense agent can be configured using environment variables. The following environment variables are supported:

- `RESTSENSE_COLLECTOR_URL`: URL of the collector, required
- `RESTSENSE_SERVICE_NAME`: Name of the service, required
- `RESTSENSE_TRACING_ENABLE_EXPRESS`: Enable express tracing, default: `false`
- `RESTSENSE_METRICS_INTERVAL`: Interval for reporting metrics, in milliseconds, default: `60000`

## License
This project is licensed under the GNU GPLv3 license. See the [LICENSE](LICENSE) file for more details.