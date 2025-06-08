# 4. Projeto da Solução
## 4.1. Arquitetura da solução
![Arquitetura da solução](https://github.com/user-attachments/assets/86e77b03-d006-451f-96f6-1d396158e599) 

### 4.2. Protótipos de telas

Visão geral da interação do usuário pelas telas do sistema e protótipo interativo das telas com as funcionalidades que fazem parte do sistema (wireframes).
Apresente as principais interfaces da plataforma. Discuta como ela foi elaborada de forma a atender os requisitos funcionais, não funcionais e histórias de usuário abordados nas <a href="02-Especificação do Projeto.md"> Especificação do Projeto</a>.
A partir das atividades de usuário identificadas na seção anterior, elabore o protótipo de tela de cada uma delas.
![Exemplo de Wireframe](images/wireframe-example.png)

São protótipos usados em design de interface para sugerir a estrutura de um site web e seu relacionamentos entre suas páginas. Um wireframe web é uma ilustração semelhante do layout de elementos fundamentais na interface.
 
> **Links Úteis**:
> - [Protótipos vs Wireframes](https://www.nngroup.com/videos/prototypes-vs-wireframes-ux-projects/)
> - [Ferramentas de Wireframes](https://rockcontent.com/blog/wireframes/)
> - [MarvelApp](https://marvelapp.com/developers/documentation/tutorials/)
> - [Figma](https://www.figma.com/)
> - [Adobe XD](https://www.adobe.com/br/products/xd.html#scroll)
> - [Axure](https://www.axure.com/edu) (Licença Educacional)
> - [InvisionApp](https://www.invisionapp.com/) (Licença Educacional)


## Diagrama de Classes

O diagrama de classes ilustra graficamente como será a estrutura do software, e como cada uma das classes da sua estrutura estarão interligadas. Essas classes servem de modelo para materializar os objetos que executarão na memória.

As referências abaixo irão auxiliá-lo na geração do artefato “Diagrama de Classes”.

> - [Diagramas de Classes - Documentação da IBM](https://www.ibm.com/docs/pt-br/rational-soft-arch/9.6.1?topic=diagrams-class)
> - [O que é um diagrama de classe UML? | Lucidchart](https://www.lucidchart.com/pages/pt/o-que-e-diagrama-de-classe-uml)

## Modelo ER

O Modelo ER representa através de um diagrama como as entidades (coisas, objetos) se relacionam entre si na aplicação interativa.]

As referências abaixo irão auxiliá-lo na geração do artefato “Modelo ER”.

> - [Como fazer um diagrama entidade relacionamento | Lucidchart](https://www.lucidchart.com/pages/pt/como-fazer-um-diagrama-entidade-relacionamento)


### 4.3. Modelo de dados

O desenvolvimento da solução proposta requer a existência de bases de dados que permitam efetuar os cadastros de dados e controles associados aos processos identificados, assim como recuperações.
Utilizando a notação do DER (Diagrama Entidade e Relacionamento), elaborem um modelo, na ferramenta visual indicada na disciplina, que contemple todas as entidades e atributos associados às atividades dos processos identificados. Deve ser gerado um único DER que suporte todos os processos escolhidos, visando, assim, uma base de dados integrada. O modelo deve contemplar, também, o controle de acesso de usuários (partes interessadas dos processos) de acordo com os papéis definidos nos modelos do processo de negócio.
_Apresente o modelo de dados por meio de um modelo relacional que contemple todos os conceitos e atributos apresentados na modelagem dos processos._

#### 4.3.1 Modelo ER

O Modelo ER representa através de um diagrama como as entidades (coisas, objetos) se relacionam entre si na aplicação interativa.]

As referências abaixo irão auxiliá-lo na geração do artefato “Modelo ER”.

> - [Como fazer um diagrama entidade relacionamento | Lucidchart](https://www.lucidchart.com/pages/pt/como-fazer-um-diagrama-entidade-relacionamento)

#### 4.3.2 Esquema Relacional

![green_db](https://github.com/user-attachments/assets/eafa2740-9b32-42b9-ad5a-25c058f241ab)

---

#### 4.3.3 Modelo Físico



### 4.4. Tecnologias
| Camada                       | Tecnologias Principais                                                                   | Ferramentas / Observações                                                                                                                                                                                                                        |
| ---------------------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Frontend Mobile**          | React Native (JavaScript/TypeScript)                                                     | • UI: React Native Paper, Native Base<br>• APIs nativas: Expo (ImagePicker, Location), React Native Maps<br>• Estado global: Context API, Redux<br>• Navegação: React Navigation<br>• HTTP: Axios ou fetch                                       |
| **Frontend Web**             | React (JavaScript/TypeScript)                                                            | • UI: Material-UI, Ant Design<br>• Rotas: React Router<br>• Autenticação/autorização: JWT (localStorage/memória)<br>• Build: Webpack, Vite<br>• Testes: Jest, React Testing Library                                                              |
| **Backend (Microservices)**  | Spring Boot 3+                                                                           | • Web: Spring Web (MVC/WebFlux)<br>• Persistência: Spring Data JPA (PostgreSQL)<br>• Segurança: Spring Security (JWT)<br>• Monitoramento: Spring Boot Actuator<br>• API: springdoc-openapi/Swagger<br>• Inter-serviços: WebClient/Feign/RabbitMQ |
| **Banco de Dados**           | PostgreSQL (+ PostGIS)                                                                   | • Instância/schema dedicado por serviço<br>• Consultas geoespaciais via PostGIS<br>• Possível uso de NoSQL (ex: logs)                                                                                                                            |
| **Armazenamento de Imagens** | AWS S3 (ou MinIO on-premise)                                                             | Upload de fotos via serviço de reportes, armazenamento de URL pública/assinada e distribuição via CDN; evita BLOBs no banco                                                                                                                      |
| **Testes Automatizados**     | JUnit 5; Spring Boot Test; Jest; React Testing Library; Enzyme; Postman/Newman; Cucumber | • Unitários (backend/frontend)<br>• Integração (H2, Docker-PostgreSQL)<br>• Interface (componentes React/React Native)<br>• Contrato/API end-to-end                                                                                              |
| **CI/CD**                    | GitHub Actions (ou GitLab CI)                                                            | • Pipelines de lint, build (Docker, bundling frontend), testes<br>• Deploy via Docker Compose, scripts em VM ou Kubernetes<br>• Versionamento com Git e branches estruturadas (dev/prod)                                                         |
| **Monitoramento & Logging**  | Spring Boot Actuator; ELK Stack; Prometheus; Grafana; Zipkin/Jaeger                      | • Logs centralizados (Logstash → Elasticsearch → Kibana)<br>• Métricas e alertas (Prometheus + Grafana)<br>• Tracing distribuído (Zipkin/Jaeger ou IDs de correlação nos logs)                                                                   |

