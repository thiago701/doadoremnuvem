from .mongodbRepositorio import conexaoBanco, inserirDocumento, FORMATO_DATA
from bson import ObjectId
import datetime

def salvarHistoricoBD(status, tipo, log, doadores, mongodb):
    # mongodb
    con = conexaoBanco(mongodb)
    # cria documento formato json
    doc = {
        'status': status,
        'dt_operacao': datetime.datetime.now().strftime(FORMATO_DATA),
        'tp_operacao': tipo,
        'ds_log': log,
        'qt_doadores_notificados': doadores
    };
    # salvar na coleção
    id_doc = inserirDocumento(con, doc, mongodb.collection_historico)
    print('salvo no mongodb: ', id_doc)

def listarHistoricoBD(mongodb):
    con = conexaoBanco(mongodb)
    collection = con[mongodb.collection_historico]
    return list(collection.find())