export const environment = {
  production: false,

  // API
  //apiUrl: 'http://apidoadoremnuvem.ngrok.io/api',
  apiUrl: 'http://localhost:5000/api',
  get_historico_listar: '/historico/listar',

  get_usuarios_listar: '/usuarios/listar',
  post_usuarios_salvar: '/usuarios/salvar',
  post_usuarios_editar: '/usuarios/editar',
  post_usuarios_excluir: '/usuarios/excluir',
  get_usuario_by_cpf: '/usuarios/listarbycpf',

  get_doador_listar: '/doadores/listar',
  get_permissao_notificao: '/doadores/editar-permissao-notificacao/',
  get_doador_tipo: '/doadores/listar-por-tipo/',
  get_doador_localidade: '/doadores/listar-por-localidade/',
  get_bairro_cidade: '/doadores/listar-bairro-por-cidade/',
  get_notificacao_por_codigo: '/notificar-por-codigos/',
  get_mensagem_listar: '/mensagens/listar',
  get_atualizar_mensagem: '/mensagens/editar-mensagens-notificacao/',

};
