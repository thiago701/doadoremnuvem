from pymongo import MongoClient
import datetime
import re
from bson import ObjectId

FORMATO_DATA = '%Y-%m-%d %H:%M:%S'

"""
    Repositório para persistência e consultas de dados
"""

def salvarInicioSistemaLog(json, mongodb):
    # mongodb
    collection = conexaoBanco(mongodb)
    # cria documento formato json
    doc = {
        "resposta": (json),
        "data": datetime.datetime.now()
    }
    # salvar na coleção
    id_doc = inserirDocumento(collection, doc)
    print('salvo no mongodb: ', id_doc)


def inserirDocumento(banco, doc, collection):
    servico = banco[collection]
    id = servico.insert_one(doc).inserted_id
    return id

def excluirDocumento(banco, filtro):
    historico = banco.historico
    historico.delete_one(filtro);


def buscarDocumento(historico):
    doc_encontrado = historico.find_one()
    print(doc_encontrado)


def conexaoBanco(mongodb):
    cliente = MongoClient(mongodb.host)
    banco = cliente[mongodb.db]
    return banco


def mongodbOnline(mongodb):
    try:
        bd = conexaoBanco(mongodb)
        doc = {
            "mensagem": 'Aplicação inicializada',
            "data": datetime.datetime.now()
        }
        inserirDocumento(bd, doc, mongodb.collection_inicio_sistema_log)
        return True
    except Exception as e:
        mongo_on = False
        print("ERRO: Ocorreu uma falha de conexão ao testar mongodb!")
        print("Mensagem de erro: ", e)
    return False
