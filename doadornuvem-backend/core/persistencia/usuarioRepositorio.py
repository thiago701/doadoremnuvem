from .mongodbRepositorio import conexaoBanco, inserirDocumento
from bson import ObjectId

def editarDocumentoUsuario(banco, docNovo, collection):
    print('docNovo', docNovo)
    servico = banco[collection]
    id = servico.update_one({"_id": ObjectId(docNovo["_id"])},
                            {"$set": {"nome": docNovo["nome"],
                                      "perfil": docNovo["perfil"],
                                      "cpf": docNovo["cpf"],
                                      "email": docNovo["email"],
                                      "telefone": docNovo["telefone"],
                                      "endereco": docNovo["endereco"],
                                      "senha": docNovo["senha"]}}, upsert=False)
    return id

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


def editarUsuarioBD(id, nome, perfil, cpf, email, endereco, telefone, senha, mongodb):
    # mongodb
    con = conexaoBanco(mongodb)
    # cria documento formato json
    docNovo = {
        '_id':id,
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