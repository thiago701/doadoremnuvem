from .config import settings

class MongoDBConf:
    def __init__(self):
        self.host = settings.host_mongodb
        self.db = settings.db_mongodb
        self.collection_inicio_sistema_log = settings.collection_inicio_sistema_log
        self.collection_historico = settings.collection_historico
        self.collection_usuario = settings.collection_usuario
        self.collection_doador = settings.collection_doador
