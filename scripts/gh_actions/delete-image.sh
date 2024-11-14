#!/bin/env bash

IMAGE_NAME="$REGISTRY_NAME/$GCP_PROJECT/$GCP_REPOSITORY/$GCP_APPLICATION:latest"

gcloud artifacts docker images delete "$IMAGE_NAME" --quiet || true
