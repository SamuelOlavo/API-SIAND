# Especificação Técnica da Agenda-API 

A Agenda-API é uma plataforma de agendamento online focada em serviços de estética, oferecendo funcionalidades que permitem tanto o agendamento pelos clientes quanto o gerenciamento dos serviços pelos usuários esteticistas e administradores. Os usuários podem controlar agendamentos e serviços de forma intuitiva, com fluxos de autenticação e gestão de usuários bem definidos. Além disso, a plataforma garante uma troca de informações eficiente com um sistema externo e possibilita a modificação de dados de agendamentos e usuários.

## Funcionalidades:

### Agendamento

Os clientes podem acessar o site público, localizar a página de agendamento, preencher seus dados pessoais, escolher entre os serviços listados, a data e o horário desejado e enviar o formulário.

#### Atores

- Cliente: realiza o agendamento dos serviços.
- Usuário esteticista: alimenta a lista de serviços.
- Sistema externo: troca informações com a Agenda-API.

#### Pré-condições

O usuário deve ter cadastrado os serviços a serem ofertados no sistema externo.

#### Pós-condições

Após o envio do agendamento, o cliente recebe um alerta de envio na página do site e o usuário consegue localizar esse agendamento na plataforma.

#### Sub-Fluxos

Autenticação do Usuário: o usuário acessa a página de login da plataforma Agenda-API, digita seu e-mail e senha cadastrados na página de cadastro ou pode seguir com a Autenticação do Google.

### Controle de Serviços

O usuário autenticado na plataforma Agenda-API pode acessar a página de serviços, preencher a descrição do serviço e incluí-lo. Esse serviço será listado no site externo no formulário de agendamento.

#### Atores

- Usuário esteticista: alimenta a lista de serviços no formulário do site externo.
- Usuário administrador: tem permissão para gerenciar os cadastros de serviço.

#### Pré-condições

O usuário deve estar logado na plataforma.

#### Pós-condições

O usuário consegue visualizar na plataforma o cadastro feito e localizar os serviços cadastrados no formulário de agendamento.

#### Fluxos de Exceção

Se o usuário não tem acesso à plataforma, deve acessar a página de cadastro e criar um novo usuário e senha ou acessar o login com a sua conta da Google. Se o usuário tentar acessar e apresentar a mensagem de "Usuário não cadastrado" (porque esqueceu seus dados de login), precisa de contactar ao usuário administrador com acesso na plataforma para criar uma nova senha para o mesmo.

#### Sub-Fluxos

Autenticação do Usuário: o usuário se cadastra na plataforma. Controle do administrador no módulo de serviço: o usuário administrador logado no sistema consegue listar, cadastrar ou excluir qualquer serviço de qualquer usuário dentro da Agenda-API.

### Controle de Agendamentos

O usuário autenticado na plataforma Agenda-API pode acessar a página de agendamento onde lhe permite ver (imprimir) e gerir (editar, cadastrar e excluir) toda lista de agendamentos feitos no seu nome.

#### Atores

- Usuário esteticista: controla a lista de agendamentos recebida (originada do formulário do site externo e cadastrada por dentro do sistema) em seu nome.
- Usuário administrador: tem permissão para gerenciar toda relação de agendamento de todos os usuários da plataforma.

#### Pré-condições

O usuário deve estar logado na plataforma, possuir agendamentos em seu nome e utilizar os filtros de data ou buscar por todos os agendamentos disponíveis.

#### Pós-condições

O usuário consegue visualizar na plataforma a relação de agendamentos feitos em seu nome.

#### Fluxos de Exceção

Se o usuário não tem acesso à plataforma ou esqueceu seus dados de login, os fluxos de exceção são os mesmos do caso de uso controle de serviço. O usuário consegue editar/incluir todos os campos de um agendamento com exceção ao campo de Esteticista que fica bloqueado devido à regra de negócio sendo permitido somente ao Usuário administrador logado.

#### Sub-Fluxos

Autenticação do Usuário: o usuário se cadastra na plataforma. Controle do administrador no módulo da agenda: o usuário administrador logado no sistema consegue listar, editar (trocar de esteticista o agendamento), cadastrar ou excluir qualquer agendamento de qualquer usuário dentro da Agenda-API.

### Gestão de Usuário

O Usuário com acesso à internet se autentica na página de login da plataforma Agenda-Api, clica na página de perfil onde lhe permite ver, editar e excluir os seus dados cadastrados no sistema.

#### Atores

- Usuário esteticista cuja finalidade é editar seus dados  cadastrados.
- Usuário administrador com permissão de gerenciar (ver, editar e excluir) toda relação de usuários da plataforma.

#### Pré-condições

O Usuário estar logado na plataforma, o Usuário possuir um e-mail cadastrado no sistema.

#### Pós-condições

O Usuário conseguir visualizar na plataforma os seus dados cadastrados.

#### Fluxos de Exceção

O Usuário sem acesso à plataforma, usuário esqueceu seus dados de login (fluxos de exceção que se repetem do caso de uso controle de serviço). 

#### Sub-Fluxos

Autenticação do Usuário, Usuário se Cadastrar na plataforma. 
Tornar adm no módulo de perfil: o usuário administrador logado no sistema, deve marcar o checkbox de Administrador e clicar em salvar para tornar o usuário desejado como Administrador, sendo liberado todo controle das páginas dentro da Agenda-Api.






