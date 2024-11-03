# Create pod
kubectl apply -f ./k8s/deployments/server.deploy.yaml
kubectl apply -f ./k8s/deployments/web.deploy.yaml

# Create service
kubectl apply -f ./k8s/services/server.service.yaml
kubectl apply -f ./k8s/services/web.service.yaml
