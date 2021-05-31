import os
from flask import Flask, jsonify, request, render_template
from flask_cors import CORS
import flask_monitoringdashboard as dashboard
import logging
from dynaconf import FlaskDynaconf
from .config import settings as conf
from .mongoDBConf import MongoDBConf
from .core.persistencia.mongodbRepositorio import *

"""
    ----------------------------------------------------
    Doador em Nuvem
    Projeto desenvolvido na disciplina de mestrado do IFPB
    Engenharia de Software
    ----------------------------------------------------
"""

__autor__ = "Ayrton Douglas, Daniel Brandão, Danilo Marcolino Tavares, Poliana Campelo, Thiago Gonçalo"
__propriedade__ = "IFPB e alunos"
__creditos__ = "Alunos da disciplina de Engenharia de Software 2021.1"
__versao__ = conf.versao
__sistema__ = 'Doador em Nuvem ({})'.format(__versao__)
__data_criacao__ = "10/04/21"

""" INIT CONF """
# Flask
app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
dashboard.bind(app)
# dynaconf
os.environ['DYNACONF_PORT'] = '9900'
FlaskDynaconf(app, settings_files=["settings.toml"])
print("ENV -> DYNACONF_PORT:", os.environ['DYNACONF_PORT'])
# Conf MongoDB

print('auto_start_docker_mongodb:', conf.auto_start_docker_mongodb)
print('verificando conexão com mongodb...')
mongoDBonline = mongodbOnline(MongoDBConf())
# exige status atualizado do banco de dados
print('mongodb-online: ', mongoDBonline)
# auto start docker - exclusivo para docker
if conf.auto_start_docker_mongodb and mongoDBonline == False:
    print('inicializando mongodb via docker...')
    print('container_is_mongodb:', conf.container_is_mongodb)
    os.system('docker start {}'.format(conf.container_is_mongodb))
    mongoDBonline = mongodbOnline(MongoDBConf())
    print('mongodb-online: ', mongoDBonline)

print('sistema/versão:', __sistema__)

""" SERVIÇOS """


# Historico
@app.route('/api/historico/salvar', methods=['GET', 'POST'])
def salvarHistorico():
    msg = ''
    print('salvarHistorico...')
    try:
        if mongoDBonline:
            # executa metodo principal
            print('request-status:', request.args.get("status"))
            print('request-tp_operacao:', request.args.get("tp_operacao"))
            print('request-ds_log:', request.args.get("ds_log"))
            print('request-qt_doadores_notificados:', request.args.get("qt_doadores_notificados"))
            if testeParametrosHistorico(request):
                msg = 'Parametros nulos'
            else:
                # salvar
                salvarHistoricoBD(request.args.get("status"),
                                  request.args.get("tp_operacao"),
                                  request.args.get("ds_log"),
                                  request.args.get("qt_doadores_notificados"),
                                  MongoDBConf())
                msg = 'Sucesso ao salvar histórico!'
        else:
            print('mongodb: offline')
            raise Exception('Falha de comunicacao com mongodb!')
    except Exception as e:
        logging.error(e)
        msg = 'Falha geral'
        raise Exception("Ocorreu um erro geral!")
    return jsonify(msg)


# Usuario
@app.route('/api/usuarios/salvar', methods=['GET', 'POST'])
def salvarUsuario():
    msg = ''
    try:
        if mongoDBonline:
            # executa metodo principal
            print('request-nome:', request.args.get("nome"))
            print('request-perfil:', request.args.get("perfil"))
            print('request-cpf:', request.args.get("cpf"))
            print('request-email:', request.args.get("email"))
            print('request-endereco:', request.args.get("endereco"))
            print('request-telefone:', request.args.get("telefone"))
            print('request-senha:', request.args.get("senha"))
            if testeParametrosUsuario(request):
                msg = 'Parametros nulos'
                return msg, 400
            elif buscarUsuarioPorCpfBD(int(request.args.get("cpf")), MongoDBConf()):
                msg = 'Já existe usuário com o mesmo CPF cadastrado.'
                return msg, 400
            else:
                # salvar
                salvarUsuarioBD(request.args.get("nome"),
                                request.args.get("perfil"),
                                int(request.args.get("cpf")),
                                request.args.get("email"),
                                request.args.get("endereco"),
                                request.args.get("telefone"),
                                request.args.get("senha"),
                                MongoDBConf())
                msg = 'Sucesso ao salvar usuário!'
        else:
            print('mongodb: offline')
            raise Exception('Falha de comunicacao com mongodb!')
    except Exception as e:
        logging.error(e)
        msg = 'Falha geral'
        raise Exception("Ocorreu um erro geral!")
    return jsonify(msg)


@app.route('/api/usuarios/editar', methods=['GET', 'POST'])
def editarUsuario():
    msg = ''
    try:
        if mongoDBonline:
            # executa metodo principal
            print('request-nome:', request.args.get("nome"))
            print('request-perfil:', request.args.get("perfil"))
            print('request-cpf:', request.args.get("cpf"))
            print('request-email:', request.args.get("email"))
            print('request-endereco:', request.args.get("endereco"))
            print('request-telefone:', request.args.get("telefone"))
            print('request-senha:', request.args.get("senha"))
            # validacao
            if testeParametrosUsuario(request):
                msg = 'Parametros nulos'
                return msg, 400
            else:
                # salvar
                editarUsuarioBD(request.args.get("id"),
                                request.args.get("nome"),
                                request.args.get("perfil"),
                                int(request.args.get("cpf")),
                                request.args.get("email"),
                                request.args.get("endereco"),
                                request.args.get("telefone"),
                                request.args.get("senha"),
                                MongoDBConf())
                msg = 'Sucesso ao editar usuário!'
        else:
            print('mongodb: offline')
            raise Exception('Falha de comunicacao com mongodb!')
    except Exception as e:
        logging.error(e)
        raise Exception("Ocorreu um erro geral!")
    return jsonify(msg)


@app.route('/api/usuarios/excluir', methods=['GET', 'POST'])
def excluirUsuario():
    msg = ''
    try:
        if mongoDBonline:
            if request.args.get("cpf") is None:
                msg = 'Parametros nulos'
                return msg, 400
            else:
                # excluir
                excluirUsuarioBD(int(request.args.get("cpf")), MongoDBConf())
                msg = 'Sucesso ao excluir usuário!'
        else:
            print('mongodb: offline')
            raise Exception('Falha de comunicacao com mongodb!')
    except Exception as e:
        logging.error(e)
        raise Exception("Ocorreu um erro geral!")
    return jsonify(msg)


def testeParametrosHistorico(request):
    return (request.args.get("status") is None or request.args.get("tp_operacao") is None
            or request.args.get("ds_log") is None or request.args.get("qt_doadores_notificados") is None)


def testeParametrosUsuario(request):
    return (request.args.get("nome") is None or request.args.get("perfil") is None or
            request.args.get("cpf") is None or request.args.get("email") is None or
            request.args.get("endereco") is None or request.args.get("telefone") is None or
            request.args.get("senha") is None)


# Historico Listar
@app.route('/api/historico/')
@app.route('/api/historico/listar', methods=['GET'])
def listarHistorico():
    try:
        if (mongoDBonline):
            # executa metodo principal
            lista = listarHistoricoBD(MongoDBConf())
        else:
            print('mongodb: offline')
            raise Exception('Falha de comunicação com mongodb!')
    except Exception as e:
        logging.error(e)
        raise Exception("Ocorreu um erro geral!")
    return respostaHistoricoJson(lista)


# Usuario Listar
@app.route('/api/usuarios/')
@app.route('/api/usuarios/listar', methods=['GET'])
def listarUsuarios():
    try:
        if (mongoDBonline):
            # executa metodo principal
            lista = listarUsuariosBD(MongoDBConf())
        else:
            print('mongodb: offline')
            raise Exception('Falha de comunicação com mongodb!')
    except Exception as e:
        logging.error(e)
        raise Exception("Ocorreu um erro geral!")
    return respostaUsuarioJson(lista)

# Usuario By CPF
@app.route('/api/usuarios/listarbycpf', methods=['GET'])
def buscarUsuarioByCpf():
    try:
        if mongoDBonline:
            if request.args.get("cpf") is None:
                msg = 'Parametros nulos'
                return msg, 400
            else:
                usuarioEdicao = buscarUsuarioPorCpfBD(int(request.args.get("cpf")), MongoDBConf())

    except Exception as e:
        logging.error(e)
        raise Exception("Usuário não encontrado")
    return respostaUsuarioJson(usuarioEdicao)

# Doador Listar
@app.route('/api/doadores/')
@app.route('/api/doadores/listar', methods=['GET'])
def listarDoadores():
    try:
        if (mongoDBonline):
            # executa metodo principal
            lista = listarDoadoresBD(MongoDBConf())
        else:
            print('mongodb: offline')
            raise Exception('Falha de comunicação com mongodb!')
    except Exception as e:
        logging.error(e)
        raise Exception("Ocorreu um erro geral!")
    return respostaDoadorJson(lista)

# Doador editar permissão de notificação
@app.route('/api/doadores/editar-permissao-notificacao/<registro>/<valor>', methods=['GET'])
def atualizarPermissaoNotificacaoDoador(registro, valor):
    try:
        if (mongoDBonline):
            # executa metodo principal
            editarNotificacaoDoadorBD(registro, str_to_bool(valor), MongoDBConf())
        else:
            print('mongodb: offline')
            raise Exception('Falha de comunicação com mongodb!')
    except Exception as e:
        logging.error(e)
        raise Exception("Ocorreu um erro geral!")
    return jsonify('Atualizado a permissão de notificação.')

# Doador Listar por tipo
@app.route('/api/doadores/listar-por-tipo/<grupoabo>/<fatorrh>', methods=['GET'])
def listarDoadoresPorTipo(grupoabo, fatorrh):
    try:
        if (mongoDBonline):
            # executa metodo principal
            lista = listarDoadoresPorTipoBD(grupoabo, fatorrh, MongoDBConf())
        else:
            print('mongodb: offline')
            raise Exception('Falha de comunicação com mongodb!')
    except Exception as e:
        logging.error(e)
        raise Exception("Ocorreu um erro geral!")
    return respostaDoadorJson(lista)

# Doador Listar por localidade
@app.route('/api/doadores/listar-por-localidade/<cidade>/<bairro>', methods=['GET'])
def listarDoadoresPorLocalidade(cidade, bairro):
    try:
        if (mongoDBonline):
            # executa metodo principal
            lista = listarDoadoresPorLocalidadeBD(cidade, bairro, MongoDBConf())
        else:
            print('mongodb: offline')
            raise Exception('Falha de comunicação com mongodb!')
    except Exception as e:
        logging.error(e)
        raise Exception("Ocorreu um erro geral!")
    return respostaDoadorJson(lista)

# Mensagens para notificação
@app.route('/api/mensagens/editar-mensagens-notificacao/<msg_geral>/<msg_tipo>/<msg_localidade>', methods=['GET'])
def atualizarMensagensNotificacao(msg_geral, msg_tipo, msg_localidade):
    try:
        if (mongoDBonline):
            # executa metodo principal
            editarMensagensBD(msg_geral, msg_tipo, msg_localidade, MongoDBConf())
        else:
            print('mongodb: offline')
            raise Exception('Falha de comunicação com mongodb!')
    except Exception as e:
        logging.error(e)
        raise Exception("Ocorreu um erro geral!")
    return jsonify('Atualizado as mensagens de notificação.')

# Mensagens para notificação
@app.route('/api/mensagens/')
@app.route('/api/mensagens/listar', methods=['GET'])
def listarMensagens():
    try:
        if (mongoDBonline):
            # executa metodo principal
            lista = listarMensagensBD(MongoDBConf())
        else:
            print('mongodb: offline')
            raise Exception('Falha de comunicação com mongodb!')
    except Exception as e:
        logging.error(e)
        raise Exception("Ocorreu um erro geral!")
    return respostaMensagemJson(lista)

# TODO melhorar
def respostaHistoricoJson(lista):
    resposta = list()
    for r in lista:
        resposta.append({'status': r['status'],
                         'dt_operacao': r['dt_operacao'],
                         'tp_operacao': r['tp_operacao'],
                         'ds_log': r['ds_log'],
                         'qt_doadores_notificados': r['qt_doadores_notificados']
                         })
    return jsonify(resposta)


# TODO melhorar
def respostaUsuarioJson(lista):
    resposta = list()
    for r in lista:
        resposta.append({'id': str (r['_id']),
                         'nome': r['nome'],
                         'perfil': r['perfil'],
                         'cpf': r['cpf'],
                         'email': r['email'],
                         'endereco': r['endereco'],
                         'telefone': r['telefone'],
                         'senha': r['senha']
                         })
    return jsonify(resposta)


# TODO melhorar
def respostaDoadorJson(lista):
    resposta = list()
    for r in lista:
        resposta.append({
            'registro': r['registro'].strip() if not r['registro'] is None else '',
            'nome': r['nome'].strip() if not r['nome'] is None else '',
            'dtreg': r['dtreg'].strip() if not r['dtreg'] is None else '',
            'cidade': r['cidade'].strip() if not r['cidade'] is None else '',
            'bairro': r['bairro'].strip() if not r['bairro'] is None else '',
            'grupoabo': r['grupoabo'].strip() if not r['grupoabo'] is None else '',
            'fatorrh': r['fatorrh'].strip() if not r['fatorrh'] is None else '',
            'fone': r['fone'].strip() if not r['fone'] is None else '',
            'celular': r['celular'].strip() if not r['celular'] is None else '',
            'sexo': r['sexo'].strip() if not r['sexo'] is None else '',
            'dtnasc': r['dtnasc'].strip() if not r['dtnasc'] is None else '',
            'data_ultima_doacao': r['data_ultima_doacao'].strip(),
            'data_proxima_doacao': r['data_proxima_doacao'].strip(),
            'permissao_notificacao': r['permissao_notificacao']
        })
    return jsonify(resposta)

# TODO melhorar
def respostaMensagemJson(lista):
    resposta = list()
    for r in lista:
        resposta.append({'msg_notifica_geral': r['msg_notifica_geral'],
                         'msg_notifica_por_tipo': r['msg_notifica_por_tipo'],
                         'msg_notifica_por_localidade': r['msg_notifica_por_localidade']
                         })
    return jsonify(resposta)

def str_to_bool(s):
    if s == 'true':
         return True
    elif s == 'false':
         return False
    else:
         raise ValueError

# Status
@app.route('/', methods=['GET'])
def statusFlask():
    # verifica novamente mongodb
    mongoDBonline = mongodbOnline(MongoDBConf())

    if request.headers.get('Authorization') == '42':
        return jsonify({"42": "ERRO! Algo de errado ocorreu."})

    return jsonify({"__metodo-ia": __sistema__,
                    "api-rest": 'online',
                    "mongodb": 'online' if mongoDBonline else 'offline'})


# Dynaconf
@app.route("/dynaconf")
def index():
    return render_template("dynaconf.html")


# Main
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
