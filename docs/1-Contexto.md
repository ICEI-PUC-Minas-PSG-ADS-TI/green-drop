# Introdução

Com a cidade crescendo cada vez mais e a preocupação com a sustentabilidade em alta, fica evidente a necessidade de ferramentas práticas para que a gente, cidadão, possa reportar problemas urbanos — seja um monte de lixo jogado no canto, um buraco perigoso na rua ou um mato que tomou conta da calçada. Mais do que apenas comunicar a prefeitura, essas plataformas aproximam a comunidade e tornam o processo mais transparente. Inspirados em iniciativas como o FixMyStreet do Reino Unido, nosso sistema gamificado quer dar voz ao cidadão, tornando a gestão da cidade mais colaborativa e até divertida.

## Problema
* Descarte de resíduos no lugar errado: em 2023, 41,5% do lixo no Brasil acabou em lixões ou locais não licenciados (Agência Brasil; Jornal O São Paulo), o que provoca alagamentos e até vazamentos de esgoto — só na Grande BH são cerca de 6 000 casos por mês (R7).
* Buracos e ruas mal conservadas: em São Paulo, 84% da população reclama de buracos como o principal problema urbano; em 2024, foram mais de 3 600 queixas nesse sentido na Ouvidoria do município (Folha; iG).
* Vegetação descontrolada: calçadas e canteiros sem poda não atrapalham apenas a passagem, mas podem causar entupimentos e riscos de inundação (CNN Brasil).
* Pouca informação sobre pontos de descarte: mesmo com ecopontos por aí, muita gente não sabe onde levar pilhas, móveis velhos ou entulho, reforçando o descarte irregular.

## Objetivos

1. Criar um app em React Native para cadastrar/login, enviar reportes (foto, localização, categoria e descrição) e ver no mapa denúncias e pontos de descarte.
2. Desenvolver um portal web em React para moderadores e administradores validarem reportes, gerenciar usuários e acompanhar indicadores.
3. Montar um backend em microsserviços (Spring Boot) que cubra autenticação, gestão de usuários, reportes, geolocalização de ecopontos e gamificação (níveis, pontos e conquistas).
4. Engajar a galera com gamificação: pontos por reportes aprovados, níveis de “contribuidor” e badges como “Primeira denúncia” ou “5 bairros diferentes” (IRIS).
5. Garantir qualidade e confiabilidade via testes automatizados, documentação em Swagger, CI/CD e monitoramento com Spring Boot Actuator.
   
## Justificativa

Os canais tradicionais — como ouvidorias e o 156 — têm baixa usabilidade e respostas demoradas, o que acaba desmotivando quem quer ajudar. Com um app simples e recompensas imediatas (pontos, conquistas e notificações), o cidadão sente que sua participação faz diferença de verdade. Isso acelera a solução de problemas, reduz custos públicos (por exemplo, menos gastos com desentupimento) e melhora nosso dia a dia.

## Público-Alvo

* Cidadãos (18–65 anos): quem vive na cidade, usa smartphone e quer contribuir de forma prática (e divertida).
* Moderadores: voluntários ou funcionários que revisam e validam as denúncias, garantindo credibilidade.
* Administradores: gestores públicos ou parceiros que parametrizam categorias, analisam KPIs (tempo médio de validação, número de reportes por região, ranking de usuários) e usam esses dados para planejar melhorias.
