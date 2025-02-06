# 📚 Fórum Acadêmico - API

Bem-vindo ao projeto de arquitetura do **Fórum Acadêmico**, uma estrutura modular e bem organizada para o desenvolvimento de um sistema de fórum educacional. Este projeto foi desenvolvido seguindo os princípios do **Domain-Driven Design (DDD)**, **Clean Architecture**, **Design Patterns** e **Testes Automatizados**, garantindo um código escalável, manutenável e bem estruturado.

## 🚀 Tecnologias e Arquitetura

Esta API foi construída utilizando **Node.js**, **TypeScript** e princípios de arquitetura limpa, proporcionando um design bem estruturado e desacoplado. Alguns conceitos e práticas adotados incluem:

- **Domain-Driven Design (DDD)** 🏛️ - Separação clara entre **Domínio, Aplicação, Infraestrutura e Interfaces**.
- **Design Patterns** 🎨 - Utiliza padrões como **Repository Pattern, Factory Pattern, Dependency Injection** e outros.
- **Clean Architecture** 🏗️ - Camadas bem definidas para melhor organização e testabilidade.
- **SOLID Principles** 🔍 - Código modular e de fácil manutenção.
- **Testes Automatizados** 🧪 - Garantia de confiabilidade e integridade da aplicação.

## 📂 Estrutura do Projeto

```
/src
  ├── core                # Camada central com funcionalidades reutilizáveis
  ├── domain              # Lógica do domínio
  │   ├── forum           # Subdomínio do fórum
  │   │   ├── application # Casos de uso e repositórios do fórum
  │   │   ├── enterprise  # Entidades e regras de negócio do fórum
  │   ├── notification    # Subdomínio de notificações
  │   │   ├── application # Casos de uso e repositórios de notificações
  │   │   ├── enterprise  # Entidades e regras de negócio de notificações
  ├── infrastructure      # Implementação concreta dos repositórios e serviços
  ├── interfaces          # Interfaces de comunicação, como controllers e views
  ├── tests               # Testes automatizados
```

## 📝 Licença

Este projeto está licenciado sob a **MIT License**.