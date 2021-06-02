from .mongodbRepositorio import conexaoBanco, inserirDocumento

def editarMensagensBD(msg_geral, msg_tipo, msg_localidade, mongodb):
    # mongodb
    con = conexaoBanco(mongodb)
    print('atualizando mensagens de notificacao:', msg_geral, msg_tipo, msg_localidade)
    # salvar na coleção
    servico = con[mongodb.collection_mensagem]
    id = servico.update({},
                            {"$set": {"msg_notifica_geral": msg_geral,
                                      'msg_notifica_por_tipo': msg_tipo,
                                      'msg_notifica_por_localidade': msg_localidade}}, upsert=True)

def listarMensagensBD(mongodb):
    con = conexaoBanco(mongodb)
    collection = con[mongodb.collection_mensagem]
    return list(collection.find())