import promClient from 'prom-client';

export class Metrics {
  private static registry = new promClient.Registry();
  
  private static counters: Map<string, promClient.Counter> = new Map();
  private static histograms: Map<string, promClient.Histogram> = new Map();

  static initialize() {
    // Métricas del sistema
    this.createCounter('http_requests_total', 'Total number of HTTP requests');
    this.createCounter('http_request_errors_total', 'Total number of HTTP request errors');
    this.createHistogram('http_request_duration_ms', 'HTTP request duration in milliseconds');

    // Métricas de actividad
    this.createCounter('activity_create', 'Create operations count');
    this.createCounter('activity_read', 'Read operations count');
    this.createCounter('activity_update', 'Update operations count');
    this.createCounter('activity_delete', 'Delete operations count');

    // Métricas de entidad
    this.createCounter('entity_project', 'Project operations count');
    this.createCounter('entity_task', 'Task operations count');
    this.createCounter('entity_time_entry', 'Time entry operations count');
    this.createCounter('entity_document', 'Document operations count');
  }

  static createCounter(name: string, help: string) {
    const counter = new promClient.Counter({
      name,
      help,
      registers: [this.registry],
    });
    this.counters.set(name, counter);
  }

  static createHistogram(name: string, help: string) {
    const histogram = new promClient.Histogram({
      name,
      help,
      registers: [this.registry],
    });
    this.histograms.set(name, histogram);
  }

  static incrementCounter(name: string, value: number = 1) {
    const counter = this.counters.get(name);
    if (counter) {
      counter.inc(value);
    }
  }

  static observeHistogram(name: string, value: number) {
    const histogram = this.histograms.get(name);
    if (histogram) {
      histogram.observe(value);
    }
  }

  static getMetrics() {
    return this.registry.metrics();
  }
}