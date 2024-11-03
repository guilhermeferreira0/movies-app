# Delete deployments
kubectl delete -f ./k8s/deployments/web.deploy.yaml
kubectl delete -f ./k8s/deployments/server.deploy.yaml

# Delete services
kubectl delete -f ./k8s/services/web.service.yaml
kubectl delete -f ./k8s/services/server.service.yaml