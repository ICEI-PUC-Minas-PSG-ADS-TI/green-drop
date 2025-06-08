## 2. Planejamento do Projeto

### 2.1 Divisão de Papéis

| Função                            | Responsável   |
| --------------------------------- | ------------- |
| **Scrum Master & Dev Back-end**   | Paulo Augusto |
| **Dev Front-end Mobile & Tester** | Paulo Roberto |

---

### 2.2 Backlog do Produto

| ID       | História de Usuário / Tarefa                                                  | Prioridade |
| -------- | ----------------------------------------------------------------------------- | ---------- |
| **US01** | Cadastro de usuário (nome, e-mail, telefone e senha)                          | Must       |
| **US02** | Login/Logout (e-mail/telefone + senha, geração de JWT)                        | Must       |
| **US03** | Atualização de perfil (editar nome, e-mail e telefone)                        | Should     |
| **US04** | Envio de reportes (foto, localização, categoria e descrição)                  | Must       |
| **US05** | Visualizar reportes no mapa (aprovados, com ícones por categoria)             | Must       |
| **US06** | Busca de pontos de descarte (ecopontos, recicladoras, por tipo de resíduo)    | Should     |
| **US07** | Histórico de reportes (meus envios e status: pendente / aprovado / rejeitado) | Should     |
| **US08** | Tela de gamificação (pontos, nível atual, progresso até próximo nível)        | Should     |
| **US09** | Badges e conquistas (conquistas desbloqueadas e próximas metas)               | Could      |
| **US10** | Portal web – login de moderador/admin                                         | Must       |
| **US11** | Portal web – listagem de reportes pendentes                                   | Must       |
| **US12** | Portal web – aprovar / rejeitar reportes                                      | Must       |
| **US13** | Portal web – gestão de usuários (papéis: cidadão, moderador, admin)           | Should     |
| **US14** | Backend – serviço de autenticação (Spring Boot + JWT + Spring Security)       | Must       |
| **US15** | Backend – serviço de usuários (Spring Data JPA + PostgreSQL)                  | Must       |
| **US16** | Backend – serviço de reportes (upload em S3, persistência, endpoints REST)    | Must       |
| **US17** | Backend – serviço de gamificação (pontuação, níveis, lógica de conquistas)    | Should     |
| **US18** | Backend – serviço de geolocalização (PostGIS para consultas por proximidade)  | Could      |
| **US19** | Integração de push notifications (FCM para alertas de pontos e conquistas)    | Could      |
| **US20** | Documentação de APIs (Swagger/OpenAPI em cada microsserviço)                  | Should     |
| **US21** | Testes automatizados (JUnit no backend; Jest/RTL no frontend)                 | Should     |
| **US22** | CI/CD (GitHub Actions: build, testes e deploy)                                | Should     |
| **US23** | Monitoramento e logging (Actuator; logs centralizados / ELK básico)           | Could      |

---

### 2.3 Sprints

| Sprint |    Período    | Objetivos Principais                                                                                   | Itens do Backlog           | Documentação (Paulo Augusto)    |
| :----: | :-----------: | :----------------------------------------------------------------------------------------------------- | :------------------------- | :------------------------------ |
|  **1** | 10/05 – 23/05 | - Infra e esqueleto dos microsserviços<br>- Autenticação e cadastro/login no mobile                    | US01, US02, US14, US15     | Contexto, Planejamento          |
|  **2** | 24/05 – 06/06 | - Envio de reportes no app (foto + localização)<br>- Exibir reportes aprovados no mapa                 | US04, US05, US16           | Especificação                   |
|  **3** | 07/06 – 20/06 | - Histórico de reportes e atualização de perfil<br>- MVP de gamificação (pontos e níveis)              | US03, US07, US08, US17     | Solução do projeto              |
|  **4** | 21/06 – 15/07 | - Portal web de moderação/admin (login, listagem, moderação, gestão de usuários)<br>- Integrações e QA | US06, US09–US13, US18–US23 | Interface do sistema, Conclusão |

---

### 2.4 Detalhamento das Sprints

#### Sprint 1 (10/05 – 23/05)

**Técnico**

* Configurar repositórios Git e pipeline básico no GitHub Actions
  *Responsável: Paulo Augusto*
* Criar boilerplate dos microsserviços Spring Boot
  *Responsável: Paulo Augusto*
* Implementar Auth Service (registro/login + JWT + Spring Security)
  *Responsável: Paulo Augusto*
* Implementar User Service (CRUD de usuário)
  *Responsável: Paulo Augusto*
* Mobile: telas de cadastro e login; integração com Auth e User
  *Responsável: Paulo Roberto*

**Documentação**

1. **Contexto**: panorama do problema urbano e justificativa do projeto
2. **Planejamento**: metodologia Scrum, definição de backlog e sprints
   *Responsável: Paulo Augusto*

---

#### Sprint 2 (24/05 – 06/06)

**Técnico**

* Report Service: endpoint `POST /api/reportes`, upload em S3 + persistência
  *Responsável: Paulo Augusto*
* Mobile: fluxo de criação de reporte (foto, GPS, categoria, descrição)
  *Responsável: Paulo Roberto*
* Mobile: mapa interativo mostrando reportes aprovados
  *Responsável: Paulo Roberto*

**Documentação**

* **Especificação**: detalhamento das APIs, modelos de dados e requisitos funcionais
  *Responsável: Paulo Augusto*

---

#### Sprint 3 (07/06 – 20/06)

**Técnico**

* Mobile: telas de perfil (editar) e histórico de reportes com status
  *Responsável: Paulo Roberto*
* Gamification Service: lógica de pontuação e cálculo de níveis
  *Responsável: Paulo Augusto*
* Mobile: tela de gamificação (pontos, barra de progresso, nível)
  *Responsável: Paulo Roberto*

**Documentação**

* **Solução do projeto**: arquitetura detalhada, diagrama de microsserviços e fluxos de dados
  *Responsável: Paulo Augusto*

---

#### Sprint 4 (21/06 – 15/07)

**Técnico**

* **Portal Web**

  * Login (Auth Service)
    *Responsável: Paulo Augusto*
  * Listagem e moderação de reportes (Report Service)
    *Responsável: Paulo Augusto*
  * Gestão de usuários (User Service)
    *Responsável: Paulo Augusto*
  * Indicadores básicos (estatísticas de uso)
    *Responsável: Paulo Roberto*
* **EcoptService**: API de locais de descarte com consultas geoespaciais
  *Responsável: Paulo Augusto*
* **Push Notifications**: integração com Firebase Cloud Messaging
  *Responsável: Paulo Roberto*
* **Operações**

  * Testes automatizados

    * Backend (JUnit) → *Paulo Augusto*
    * Frontend (Jest/RTL) → *Paulo Roberto*
  * Swagger/OpenAPI em todos os microsserviços
    *Responsável: Paulo Augusto*
  * CI/CD avançado (build, testes e deploy em ambiente de teste)
    *Responsável: Paulo Augusto*
  * Monitoramento via Spring Boot Actuator + logs centralizados
    *Responsável: Paulo Augusto*
