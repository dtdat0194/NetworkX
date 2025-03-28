# fastapi_app/cosmos_db.py
import os
from azure.cosmos import CosmosClient, PartitionKey

COSMOS_ENDPOINT = os.getenv("COSMOS_ENDPOINT", "https://albertle.documents.azure.com:443/")
COSMOS_KEY = os.getenv("COSMOS_KEY", "oBwrxtcuoxeHZ4zQzWeUZyF2VaZAhrI65Q5cdtBD7ylnNM4LAnFHHWyTWNiQYyX9KZYUQfJLG40nACDbBxNwKw==")
DATABASE_NAME = "FastApiDatabase"
CONTAINER_NAME = "Users"
# Initialize the Cosmos client
client = CosmosClient(COSMOS_ENDPOINT, COSMOS_KEY)
# Create (or get) the database
database = client.create_database_if_not_exists(id=DATABASE_NAME)
# Create (or get) the container. Use "username" as the partition key.
container = database.create_container_if_not_exists(
    id=CONTAINER_NAME,
    partition_key=PartitionKey(path="/username"),
)
