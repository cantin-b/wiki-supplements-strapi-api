#!/bin/bash

# Execute once chmod +x dump-db.sh 

# Load env variables (optional if you use dotenv in Node later)
source .env

# Create the backups directory if it doesn't exist
mkdir -p ./backups

# Generate timestamped filename
TIMESTAMP=$(date +"%Y-%m-%d_%H-%M-%S")
DUMP_NAME="supplementopedia_dump_$TIMESTAMP.sql"
DUMP_PATH="./backups/$DUMP_NAME"

# Run the pg_dump command
PGPASSWORD=$DATABASE_PASSWORD pg_dump -U $DATABASE_USERNAME -h $DATABASE_HOST -p $DATABASE_PORT -d $DATABASE_NAME > $DUMP_PATH

echo "✅ Database dump created: $DUMP_PATH"
