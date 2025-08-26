# 🚀 Galactic Move Wars

Un taller gamificado para aprender Move en Aptos mientras creas un juego de batallas intergalácticas con NFTs.

## 🎮 Concepto del Juego

**Galactic Move Wars** es un juego de batallas intergalácticas donde cada jugador:
- Crea su propia colección de NFTs en Aptos testnet
- Mina 3 personajes únicos (Alien, Astronauta, Robot)
- Desafía a otros jugadores en la Arena para batallas épicas
- Los perdedores ven sus NFTs quemados (eliminados de la colección)

## 🏗️ Arquitectura del Proyecto

```
aptos-workshop/
├── move/
│   ├── sources/
│   │   └── galactic_wars.move
│   ├── Move.toml
│   └── scripts/
│       ├── deploy.sh
│       ├── mint.sh
│       └── battle.sh
├── web/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── README.md
├── docs/
│   └── workshop-guide.md
└── README.md
```

## 🚀 Inicio Rápido

### Prerrequisitos
- Node.js 18+
- Aptos CLI
- Petra Wallet o Martian Wallet

### Instalación

1. **Clona el repositorio**
```bash
git clone https://github.com/garciatroisi/aptos-workshop.git
cd aptos-workshop
```

2. **Configura Aptos CLI**
```bash
aptos init --profile galactic-wars --network testnet
```

3. **Deploya el contrato Move**
```bash
cd move
aptos move publish --named-addresses galactic_wars=default
```

4. **Inicia la DApp web**
```bash
cd ../web
npm install
npm start
```

## 📚 Guía del Taller

Consulta [docs/workshop-guide.md](docs/workshop-guide.md) para instrucciones detalladas paso a paso.

## 🎯 Funcionalidades

### Smart Contract (Move)
- ✅ Crear colección de NFTs
- ✅ Mina personajes con atributos únicos
- ✅ Sistema de batallas con factor aleatorio
- ✅ Quema de NFTs perdedores
- ✅ Estándar Token v2 de Aptos

### DApp Web (React)
- ✅ Conexión de wallet
- ✅ Visualización de NFTs
- ✅ Selección de oponentes
- ✅ Inicio de batallas
- ✅ Resultados en tiempo real

## 🛠️ Tecnologías

- **Blockchain**: Aptos
- **Smart Contracts**: Move
- **Frontend**: React + TypeScript
- **Wallet**: Petra/Martian
- **SDK**: Aptos TypeScript SDK

## 📖 Aprende Más

- [Documentación de Aptos](https://aptos.dev/)
- [Guía de Move](https://move-language.github.io/move/)
- [Aptos NFT Standard](https://aptos.dev/concepts/coin-and-token/aptos-token/)

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Por favor lee las guías de contribución antes de enviar un pull request.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles. 