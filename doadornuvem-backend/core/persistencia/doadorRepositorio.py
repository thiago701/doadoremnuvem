from .mongodbRepositorio import conexaoBanco, inserirDocumento
from bson import ObjectId
import re

def salvarDoadorBD(registro, nome, dt_cadastro, cidade,
                   bairro, grupoabo, fatorrh, fone, celular, sexo,
                   dt_nascimento, dt_ultima_doacao, dt_proximo_doacao, mongodb):
    # mongodb
    con = conexaoBanco(mongodb)
    # cria documento formato json
    docNovo = {
        'registro': registro,
        'nome': nome,
        'dtreg': dt_cadastro,
        'cidade': cidade,
        'bairro': bairro,
        'grupoabo': grupoabo,
        'fatorrh': fatorrh,
        'fone': fone,
        'celular': celular,
        'sexo': sexo,
        'dtnasc': dt_nascimento,
        'data_ultima_doacao': dt_ultima_doacao,
        'data_proxima_doacao': dt_proximo_doacao
    }
    # salvar na coleção
    id_doc = inserirDocumento(con, docNovo, mongodb.collection_doador)
    print('salvo no mongodb: ', id_doc)


def editarDoadorBD(registro, nome, dt_cadastro, cidade,
                   bairro, grupoabo, fatorrh, fone, celular, sexo,
                   dt_nascimento, dt_ultima_doacao, dt_proximo_doacao, mongodb):
    # mongodb
    con = conexaoBanco(mongodb)
    # cria documento formato json
    docNovo = {
        'registro': registro,
        'nome': nome,
        'dtreg': dt_cadastro,
        'cidade': cidade,
        'bairro': bairro,
        'grupoabo': grupoabo,
        'fatorrh': fatorrh,
        'fone': fone,
        'celular': celular,
        'sexo': sexo,
        'dtnasc': dt_nascimento,
        'data_ultima_doacao': dt_ultima_doacao,
        'data_proxima_doacao': dt_proximo_doacao
    }
    # salvar na coleção
    #id_doc = editarDocumentoDoador(con, docNovo, mongodb.collection_doador)
    #print('editado no mongodb: ', id_doc)

def editarNotificacaoDoadorBD(registro, permissao, mongodb):
    # mongodb
    con = conexaoBanco(mongodb)
    print('atualizando permissao de notificacao:', registro, permissao)
    # salvar na coleção
    servico = con[mongodb.collection_doador]
    id = servico.update_one({"registro": registro},
                            {"$set": {"permissao_notificacao": permissao}}, upsert=True)

def listarDoadoresBD(mongodb):
    con = conexaoBanco(mongodb)
    collection = con[mongodb.collection_doador]
    return list(collection.find())[0:100]

def listarDoadoresPorTipoBD(grupo, fator, mongodb):
    con = conexaoBanco(mongodb)
    collection = con[mongodb.collection_doador]
    rgxGrupo = re.compile('.*'+grupo+'.*', re.IGNORECASE)
    rgxFator = re.compile('.*'+fator+'.*', re.IGNORECASE)
    return list(collection.find({'grupoabo': rgxGrupo, 'fatorrh': rgxFator}))

def listarDoadoresPorLocalidadeBD(cidade, bairro, mongodb):
    con = conexaoBanco(mongodb)
    collection = con[mongodb.collection_doador]
    rgxCidade = re.compile('.*'+cidade+'.*', re.IGNORECASE)
    rgxBairro = re.compile('.*'+bairro+'.*', re.IGNORECASE)
    return list(collection.find({'cidade': rgxCidade, 'bairro': rgxBairro}))

def listarBairrosPorCidadeBD(cidade, mongodb):
    con = conexaoBanco(mongodb)
    collection = con[mongodb.collection_doador]
    rgxCidade = re.compile('.*'+cidade+'.*', re.IGNORECASE)
    # return list(collection.group(key={"bairro":1}, condition={'cidade':rgxCidade},
    #                              initial={"count":0}, reduce={}))
    return list( collection.aggregate([
        {"$match": {"cidade": rgxCidade}},
        {"$group": {"_id": {"bairro": "$bairro"}}},
        {"$project": {

            "_id": 0,
            "bairro": { "$trim": {"input": "$_id.bairro"}}
        }},
        {"$sort": {"bairro": 1}}

    ])
)
#def listarDoadoresAptosParaNotificar(mongodb):
# TODO implementação