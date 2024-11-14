#!/bin/env bash
set -e

IMAGE_NAME="$REGISTRY_NAME/$GCP_PROJECT/$GCP_REPOSITORY/$GCP_APPLICATION"

STAGING_URL=$(gcloud run deploy "$GCP_APPLICATION" \
  --image "$IMAGE_NAME" \
  --platform managed \
  --allow-unauthenticated \
  --memory 512M \
  --format='value(status.url)')

echo "$STAGING_URL" >url.txt
echo "$STAGING_URL"
