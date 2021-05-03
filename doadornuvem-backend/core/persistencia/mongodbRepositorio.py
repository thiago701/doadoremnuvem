from pymongo import MongoClient
import datetime
import re

FORMATO_DATA = '%Y-%m-%d %H:%M:%S'

"""
    Repositório para persistência e consultas de dados
"""


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


def salvarUsuarioBD(nome, perfil, cpf, email, endereco, telefone, senha, mongodb):
    # mongodb
    con = conexaoBanco(mongodb)
    # cria documento formato json
    doc = {
        'nome': nome,
        'perfil': perfil,
        'cpf': cpf,
        'email': email,
        'endereco': endereco,
        'telefone': telefone,
        'senha': senha
    }
    # salvar na coleção
    id_doc = inserirDocumento(con, doc, mongodb.collection_usuario)
    print('salvo no mongodb: ', id_doc)


def editarUsuarioBD(nome, perfil, cpf, email, endereco, telefone, senha, mongodb):
    # mongodb
    con = conexaoBanco(mongodb)
    # cria documento formato json
    docNovo = {
        'nome': nome,
        'perfil': perfil,
        'cpf': cpf,
        'email': email,
        'endereco': endereco,
        'telefone': telefone,
        'senha': senha
    }
    # salvar na coleção
    id_doc = editarDocumentoUsuario(con, docNovo, mongodb.collection_usuario)
    print('editado no mongodb: ', id_doc)


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

def listarHistoricoBD(mongodb):
    con = conexaoBanco(mongodb)
    collection = con[mongodb.collection_historico]
    return list(collection.find())


def listarUsuariosBD(mongodb):
    con = conexaoBanco(mongodb)
    collection = con[mongodb.collection_usuario]
    return list(collection.find())

def buscarUsuarioPorCpfBD(cpf, mongodbConfig):
    db = conexaoBanco(mongodbConfig)
    collection = db[mongodbConfig.collection_usuario]
    return list(collection.find({'cpf': int(cpf)}))


def excluirUsuarioBD(cpf, mongodbConfig):
    db = conexaoBanco(mongodbConfig)
    collection = db[mongodbConfig.collection_usuario]
    collection.delete_one({"cpf": int(cpf)})

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

def listarMensagensBD(mongodb):
    con = conexaoBanco(mongodb)
    collection = con[mongodb.collection_mensagem]
    return list(collection.find())

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


def editarDocumentoUsuario(banco, docNovo, collection):
    print('docNovo', docNovo)
    servico = banco[collection]
    id = servico.update_one({"cpf": docNovo["cpf"]},
                            {"$set": {"nome": docNovo["nome"],
                                      "perfil": docNovo["perfil"],
                                      "cpf": docNovo["cpf"],
                                      "email": docNovo["email"],
                                      "telefone": docNovo["telefone"],
                                      "endereco": docNovo["endereco"],
                                      "senha": docNovo["senha"]}}, upsert=True)
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
