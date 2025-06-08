# 3. Especificação

## 3.1 Requisitos Funcionais

|  **ID**  | **Descrição**                                                                             |
| :------: | :---------------------------------------------------------------------------------------- |
| **RF01** | Cadastro de usuário (nome, e-mail, telefone e senha)                                      |
| **RF02** | Autenticação por e-mail ou telefone + senha, com emissão de token JWT                     |
| **RF03** | Atualização de perfil (nome, e-mail e telefone)                                           |
| **RF04** | Envio de reporte (foto, localização, categoria e descrição)                               |
| **RF05** | Visualização de reportes aprovados em mapa interativo, com ícones por categoria           |
| **RF06** | Histórico de reportes do usuário, com status (`Pendente`, `Aprovado`, `Rejeitado`)        |
| **RF07** | Busca de pontos de descarte por tipo de resíduo e proximidade                             |
| **RF08** | Gamificação – atribuição de pontos ao aprovar reporte e cálculo de nível                  |
| **RF09** | Gamificação – desbloqueio e exibição de conquistas (badges)                               |
| **RF10** | Push notifications para conquistas e subida de nível                                      |
| **RF11** | Portal web – login de moderador/admin                                                     |
| **RF12** | Portal web – listagem, aprovação e rejeição de reportes                                   |
| **RF13** | Portal web – gestão de usuários (atribuição de papéis e desativação de conta)             |
| **RF14** | Portal web – relatórios e indicadores (número de reportes, tempo médio de validação etc.) |
| **RF15** | Documentação de API (Swagger/OpenAPI) em cada microsserviço                               |

---

## 3.2 Requisitos Não Funcionais

|   **ID**  | **Descrição**                                                                                                          |
| :-------: | :--------------------------------------------------------------------------------------------------------------------- |
| **RNF01** | **Desempenho:** APIs respondem em ≤ 300 ms para 95 % das requisições                                                   |
| **RNF02** | **Disponibilidade:** SLA de 99,5 % de uptime; deploys sem downtime via CI/CD                                           |
| **RNF03** | **Segurança:** HTTPS obrigatório; senhas com hash BCrypt; JWT expira em 24 h                                           |
| **RNF04** | **Escalabilidade:** microsserviços escaláveis independentemente                                                        |
| **RNF05** | **Manutenibilidade:** cobertura de testes ≥ 80 % no backend; linters e análise estática no pipeline                    |
| **RNF06** | **Interoperabilidade:** APIs RESTful em JSON; URIs e códigos HTTP padronizados                                         |
| **RNF07** | **Usabilidade:** interfaces responsivas, intuitivas e com feedback claro                                               |
| **RNF08** | **Portabilidade:** React Native (iOS/Android); containers Docker para backend                                          |
| **RNF09** | **Documentação:** documentação técnica completa (Contexto, Planejamento, Especificação, Solução, Interface, Conclusão) |
| **RNF10** | **Conformidade Legal:** LGPD (coleta mínima de dados; termo de uso; política de privacidade; exclusão de conta)        |

---

## 3.3 Histórias de Usuário

|  **ID**  | **Como…**           | **Eu quero…**                                                               | **Para que…**                                                      |
| :------: | :------------------ | :-------------------------------------------------------------------------- | :----------------------------------------------------------------- |
| **US01** | cidadão não logado  | me cadastrar com nome, e-mail, telefone e senha                             | eu possa usar o app e reportar problemas                           |
| **US02** | cidadão             | fazer login com e-mail/telefone e senha                                     | acessar funcionalidades protegidas                                 |
| **US03** | cidadão autenticado | editar meu perfil (nome, e-mail, telefone)                                  | manter meus dados atualizados                                      |
| **US04** | cidadão autenticado | criar um novo reporte com foto, localização, categoria e descrição          | informar à comunidade e ao poder público sobre um problema         |
| **US05** | cidadão             | ver reportes aprovados de outras pessoas no mapa                            | entender quais problemas já estão registrados                      |
| **US06** | cidadão             | consultar pontos de descarte por tipo de resíduo e proximidade              | saber onde levar meu lixo corretamente                             |
| **US07** | cidadão             | acompanhar o status dos meus reportes (`pendente`, `aprovado`, `rejeitado`) | saber se minha contribuição foi aceita ou rejeitada                |
| **US08** | cidadão             | ver minha pontuação e nível atual                                           | acompanhar meu progresso e me manter motivado                      |
| **US09** | cidadão             | desbloquear e visualizar conquistas (badges)                                | ter metas claras e sentir reconhecimento                           |
| **US10** | moderador           | listar reportes pendentes e ver detalhes                                    | validar se os reportes são reais antes de torná-los públicos       |
| **US11** | moderador           | aprovar ou rejeitar reportes com comentário opcional                        | garantir qualidade e credibilidade das denúncias                   |
| **US12** | administrador       | atribuir papéis (cidadão, moderador, admin) a usuários                      | garantir que apenas perfis autorizados executem determinadas ações |
| **US13** | administrador       | ver indicadores (número de reportes, tempo de validação, ranking)           | monitorar a saúde e eficiência do sistema                          |
| **US14** | sistema             | enviar push notifications de conquistas e níveis                            | manter o usuário engajado e informado                              |

---

## 3.4 Restrições

| **Categoria**            | **Detalhes**                                                                                                                                              |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Tecnológicas**         | - Spring Boot no backend<br>- React Native (mobile) e React (web)<br>- PostgreSQL + PostGIS<br>- S3 para imagens<br>- JWT e HTTPS                         |
| **Prazos**               | - Entrega total até **15 de julho de 2025**<br>- Documentação atualizada até o fim de cada sprint                                                         |
| **Qualidade**            | - Cobertura de testes ≥ 80 % (backend) e ≥ 70 % (frontend)<br>- Zero erros críticos em linters                                                            |
| **Legais / Privacidade** | - LGPD: coleta mínima de dados; termo de uso; política de privacidade; exclusão de conta<br>- Logs de auditoria mantidos por ≥ 6 meses                    |
| **Arquiteturais**        | - Microsserviços com bancos de dados isolados<br>- Comunicação RESTful; broker (RabbitMQ/Kafka) opcional<br>- API Gateway opcional, seguindo padrões REST |

---
