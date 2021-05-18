export const environment = {
  production: false,

  // API
  apiUrl: 'http://apidoadoremnuvem.ngrok.io/api',
  get_historico_listar: '/historico/listar',

  get_usuarios_listar: '/usuarios/listar',
  post_usuarios_salvar: '/usuarios/salvar',
  post_usuarios_editar: '/usuarios/editar',
  post_usuarios_excluir: '/usuarios/excluir',
  get_usuario_by_cpf: '/usuarios/listarbycpf',

  get_doador_listar: '/doadores/listar',
  get_permissao_notificao: '/doadores/editar-permissao-notificacao/',

  get_mensagem_listar: '/mensagens/listar',
  get_atualizar_mensagem: '/mensagens/editar-mensagens-notificacao/',

};
