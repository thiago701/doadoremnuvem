from .config import settings

class MongoDBConf:
    def __init__(self):
        self.host = settings.host_mongodb
        self.db = settings.db_mongodb
        self.collection = settings.collection_mongodb
