#!/usr/bin/env bash
set -e

IMAGE_NAME="$REGISTRY_NAME/$GCP_PROJECT/$GCP_REPOSITORY/$GCP_APPLICATION"

gcloud config set project "$GCP_PROJECT"

docker build -t "$IMAGE_NAME" -f Dockerfile .
docker push "$IMAGE_NAME"
