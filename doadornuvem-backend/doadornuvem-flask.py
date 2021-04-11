import os
from flask import Flask, jsonify, request, render_template
from flask_cors import CORS
import flask_monitoringdashboard as dashboard
import logging
from dynaconf import FlaskDynaconf
from .config import settings as conf
from .mongoDBConf import MongoDBConf
from .core.persistencia.mongodbRepositorio import salvarHistorico, mongodbOnline

"""
    ----------------------------------------------------
    Doador em Nuvem
    Projeto desenvolvido na disciplina de mestrado do IFPB
    Engenharia de Software
    ----------------------------------------------------
"""

__autor__       = "Daniel Brandão, Danilo Marcolino Tavares, Poliana Campelo, Thiago Gonçalo Gomes"
__propriedade__ = "IFPB e alunos"
__creditos__    = "Alunos da disciplina de Engenharia de Software 2021.1"
__versao__      = conf.versao
__sistema__     = 'Doador em Nuvem ({})'.format(__versao__)
__data_criacao__        = "10/04/21"

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
if(conf.auto_start_docker_mongodb and mongoDBonline == False):
    print('inicializando mongodb via docker...')
    print('container_is_mongodb:', conf.container_is_mongodb)
    os.system('docker start {}'.format(conf.container_is_mongodb))
    mongoDBonline = mongodbOnline(MongoDBConf())
    print('mongodb-online: ', mongoDBonline)

print('sistema/versão:', __sistema__)

""" SERVIÇOS """

@app.route('/api/default', methods=['GET'])
def default():
    try:
        if(mongoDBonline):
            # executa metodo principal
            resposta ={};
            # salva resposta
            # salvarHistorico(resposta, MongoDBConf())
        else:
            print('mongodb: offline')
            raise Exception('Falha de comunicação com mongodb!')
    except Exception as e:
        logging.error(e)
        raise Exception("Ocorreu um erro geral!")
    return jsonify(resposta)

# Status
@app.route('/', methods=['GET'])
def statusFlask():
    #verifica novamente mongodb
    mongoDBonline = mongodbOnline(MongoDBConf())

    if request.headers.get('Authorization') == '42':
        return jsonify({"42": "ERRO! Algo de errado ocorreu."})

    return jsonify({"__metodo-ia": __sistema__,
                    "api-rest":'online',
                    "mongodb": 'online' if mongoDBonline else 'offline'})
# Dynaconf
@app.route("/dynaconf")
def index():
    return render_template("dynaconf.html")

# Main
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)