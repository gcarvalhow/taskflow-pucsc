## Sobre o Projeto

Projeto desenvolvido para a matéria de **Gerenciamento, Configuração e Processos de Software** do quarto período do curso de **Engenharia de Software** do Centro Universitário Católica de Santa Catarina.

O objetivo do projeto é automatizar o ciclo de vida de entrega de uma aplicação full-stack (TypeScript, Node.js, PostgreSQL), desde a submissão do código até a implantação em produção, a fim de aumentar a velocidade, a qualidade e a confiabilidade das entregas.

## Infraestrutura do Projeto

O projeto utiliza uma infraestrutura baseada em containers Docker para garantir portabilidade, isolamento e facilidade de configuração dos ambientes. Todos os serviços (banco de dados PostgreSQL, backend Node.js e frontend Next.js) são orquestrados pelo Docker Compose, conectados por uma rede interna.

## Executar o projeto localmente

### 1. Rodar a Infraestrutura Local

Para simplificar o ambiente de desenvolvimento, todos os serviços de infraestrutura são gerenciados via Docker Compose.

Na raiz do projeto, basta executar:

```bash
docker-compose up --build -d
```

Os serviços estarão disponíveis nas portas padrão (PostgreSQL: 5432).

### 2. Rodar o Backend e Frontend

O backend e o frontend já estão configurados no `docker-compose.yml` e serão iniciados automaticamente junto com a infraestrutura. Não é necessário rodar comandos separados para cada serviço.

- O **Backend** estará disponível em: http://localhost:3001

- O **Frontend** estará disponível em: http://localhost:3000
