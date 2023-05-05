#!/bin/bash

# Check if the VITE_BACKEND_URL environment variable is set
if [ -z "$VITE_BACKEND_URL" ]; then
  echo "Error: 
       You must specify VITE_BACKEND_URL to a valid URL.
       For example, "-e VITE_BACKEND_URL=http://localhost:8080" on "docker run"."
  exit 1
fi

# Run the env.sh script
source /usr/share/nginx/html/env.sh

# Start nginx
nginx -g "daemon off;"