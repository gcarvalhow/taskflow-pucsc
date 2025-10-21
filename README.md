## Sobre o Projeto

Projeto desenvolvido para a matéria de **Gerenciamento, Configuração e Processos de Software** do quarto período do curso de **Engenharia de Software** do Centro Universitário Católica de Santa Catarina.

O objetivo do projeto é automatizar o ciclo de vida de entrega de uma aplicação full-stack (TypeScript, Node.js, PostgreSQL), desde a submissão do código até a implantação em produção, a fim de aumentar a velocidade, a qualidade e a confiabilidade das entregas.

**Integrantes da equipe:**
- Gabriel Carvalho
- Adrian Gonçalves
- Renato Colin
- Igor Thiago

## Infraestrutura do Projeto

O projeto utiliza uma infraestrutura baseada em containers Docker para garantir portabilidade, isolamento e facilidade de configuração dos ambientes. Todos os serviços (banco de dados PostgreSQL, backend Node.js e frontend Next.js) são orquestrados pelo Docker Compose, conectados por uma rede interna.

### Fluxo de CI/CD

O projeto utiliza um fluxo de CI/CD robusto, com pipelines dedicadas para processo e invocadas via `workflow_call`. O principal gatilho para o processo de qualidade é a abertura de um Pull Request para a branch master.

1. Quando um PR é aberto, a pipeline principal é acionada.
2. A pipeline principal inicia o processo invocando a pipeline de build e teste do backend.
3. Após a conclusão com sucesso dos testes do backend, a pipeline de build do frontend é acionada.
4. Finalmente, a pipeline de análise estática é acionada, realizando uma varredura completa do código com o SonarQube Cloud, que analisa a qualidade, identifica code smells, bugs e vulnerabilidades de segurança, publicando um resumo no próprio PR.

## Executar o projeto localmente

### 1. Rodar a Infraestrutura Local

Para simplificar o ambiente de desenvolvimento, todos os serviços de infraestrutura são gerenciados via Docker.

Na raiz do projeto, basta executar:

```bash
docker-compose up --build -d
```

Os serviços estarão disponíveis nas portas padrão (PostgreSQL: 5432).

### 2. Rodar o Backend e Frontend

O backend e o frontend já estão configurados no `docker-compose.yml` e serão iniciados automaticamente junto com a infraestrutura. Não é necessário rodar comandos separados para cada serviço.

- O **Backend** estará disponível em: http://localhost:3001
- O **Frontend** estará disponível em: http://localhost:3000