## Sobre o Projeto

Projeto desenvolvido para a matéria de **Gerenciamento, Configuração e Processos de Software** do quarto período do curso de **Engenharia de Software** do Centro Universitário Católica de Santa Catarina.

O objetivo do projeto é automatizar o ciclo de vida de entrega de uma aplicação full-stack (TypeScript, Node.js, PostgreSQL), desde a submissão do código até a implantação em produção, a fim de aumentar a velocidade, a qualidade e a confiabilidade das entregas.

## Infraestrutura do Projeto

O projeto utiliza uma infraestrutura baseada em containers Docker para garantir portabilidade, isolamento e facilidade de configuração dos ambientes. Todos os serviços (banco de dados PostgreSQL, backend Node.js e frontend Next.js) são orquestrados pelo Docker Compose, conectados por uma rede interna.

## Executar o projeto localmente

Para simplificar o ambiente de desenvolvimento, todo o projeto é gerenciado através de containers **Docker**.

Todos os serviços estão definidos no arquivo `docker-compose.yml` e conectados pela mesma rede. Basta executar o comando:

```bash
docker-compose up --build -d
```

Tanto o **backend** quanto o **frontend** são orquestrados pelo Docker conforme a configuração no `docker-compose.yml`.

- O **Backend** estará disponível em: http://localhost:3001
- O **Frontend** estará disponível em: http://localhost:3000