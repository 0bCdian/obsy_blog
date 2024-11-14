#!/bin/env bash

REGION="$GCP_REGION"
SERVICE="$GCP_APPLICATION"
gcloud run services delete "$SERVICE" --region "$REGION" --quiet || true
