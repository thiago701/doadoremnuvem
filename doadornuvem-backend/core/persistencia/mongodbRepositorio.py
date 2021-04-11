from pymongo import MongoClient
import datetime

"""
    Repositório para persistência e consultas de dados
"""

def salvarHistorico(json, mongodb):
    print('Armazenando no repositório como histórico...')
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

def inserirDocumento(banco, doc):
    historico = banco.historico
    id = historico.insert_one(doc).inserted_id
    return id

def excluirDocumento(banco, doc):
    historico = banco.historico
    historico.delete_one(doc);

def buscarDocumento(historico):
    doc_encontrado = historico.find_one()
    print(doc_encontrado)

def conexaoBanco(mongodb):
    cliente = MongoClient(mongodb.host)
    banco = cliente[mongodb.db]
    return banco

def mongodbOnline(mongodb):
    mongo_on =  False;
    try:
        bd = conexaoBanco(mongodb)[mongodb.collection]
        doc = {
            "respostaSistema": 'Aplicação inicializada',
            "data": datetime.datetime.now()
        }
        id = inserirDocumento(bd, doc)
        excluirDocumento(bd, doc)
        mongo_on = True
    except Exception as e:
        mongo_on = False
        print("ERRO: Ocorreu uma falha de conexão ao testar mongodb!")
        print("Mensagem de erro: ", e)
    return mongo_on

