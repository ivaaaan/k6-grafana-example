# k6 example with Prometheus metrics and Grafana visualization

## Setup

You will need to setup a minikube locally.

```bash
minikube start
minikube addons enable metrics-server
eval $(minikube docker-env)

docker build -t hello-world-api:v1 .

kubectl apply -f deployment.yaml

kubectl create namespace monitoring

kubectl apply -f grafana-datasource-config.yaml -f grafana-deployment.yaml
kubectl apply -f prometheus-config.yaml -f prometheus-deployment.yaml -f prometheus-serviceaccount.yaml -f prometheus-rbac.yaml

K6_PROMETHEUS_RW_SERVER_URL=http://192.168.49.2:30090/api/v1/write k6 run -o experimental-prometheus-rw test.js
```

Now, you can visualize k6 metrics in Grafana by importring [this dashboard](https://grafana.com/grafana/dashboards/19665-k6-prometheus/) and correlate them k8s internal metrics of a container.
