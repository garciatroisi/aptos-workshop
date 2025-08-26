# 🚀 Guía del Taller: Galactic Move Wars

## 📋 Descripción General

**Galactic Move Wars** es un taller gamificado diseñado para enseñar Move en Aptos de manera interactiva y divertida. Los participantes aprenderán a escribir smart contracts mientras crean un juego de batallas intergalácticas con NFTs.

**Duración estimada:** 45-60 minutos

## 🎯 Objetivos de Aprendizaje

- ✅ Entender los conceptos básicos de Move
- ✅ Aprender a crear y gestionar NFTs en Aptos
- ✅ Implementar lógica de juego en smart contracts
- ✅ Interactuar con contratos desde una DApp web
- ✅ Comprender el flujo completo de desarrollo en Aptos

## 🛠️ Prerrequisitos

### Software Requerido
- **Node.js 18+** - [Descargar aquí](https://nodejs.org/)
- **Aptos CLI** - Instalar con: `curl -fsSL "https://aptos.dev/scripts/install_cli.py" | python3`
- **Git** - [Descargar aquí](https://git-scm.com/)

### Wallets
- **Petra Wallet** - [Instalar extensión](https://petra.app/)
- **Martian Wallet** - [Instalar extensión](https://martianwallet.xyz/)

### Conocimientos Básicos
- Conceptos básicos de blockchain
- Familiaridad con JavaScript/TypeScript
- Conocimiento básico de React (opcional)

## 🚀 Configuración Inicial

### 1. Clonar el Repositorio
```bash
git clone https://github.com/garciatroisi/aptos-workshop.git
cd aptos-workshop
```

### 2. Configurar Aptos CLI
```bash
aptos init --profile galactic-wars --network testnet
```

### 3. Obtener Testnet APT
- Ve a [Aptos Faucet](https://aptoslabs.com/testnet-faucet)
- Conecta tu wallet
- Solicita tokens de prueba

## 📚 Estructura del Proyecto

```
aptos-workshop/
├── move/                    # Smart contracts en Move
│   ├── sources/
│   │   └── galactic_wars.move  # Contrato principal
│   ├── Move.toml              # Configuración del proyecto
│   └── scripts/               # Scripts de automatización
├── web/                     # DApp React
│   ├── src/
│   │   ├── components/       # Componentes React
│   │   └── App.tsx          # Aplicación principal
│   └── package.json
└── docs/                    # Documentación
    └── workshop-guide.md    # Esta guía
```

## 🎮 Flujo del Juego

### Fase 1: Preparación (10 minutos)
1. **Deploy del contrato** - Los participantes deployan el smart contract
2. **Crear colección** - Cada jugador crea su colección de NFTs
3. **Mintar personajes** - Se mintean 3 personajes únicos

### Fase 2: Batallas (30 minutos)
1. **Explorar la Arena** - Ver otros jugadores y sus personajes
2. **Seleccionar oponente** - Elegir un personaje rival
3. **Iniciar batalla** - Ejecutar la función de batalla
4. **Ver resultados** - El perdedor ve su NFT quemado

### Fase 3: Análisis (15 minutos)
1. **Revisar código** - Analizar las funciones Move implementadas
2. **Discutir conceptos** - Repasar los conceptos aprendidos
3. **Preguntas y respuestas** - Resolver dudas

## 🔧 Pasos Detallados

### Paso 1: Deploy del Smart Contract

```bash
cd move
chmod +x scripts/deploy.sh
./scripts/deploy.sh
```

**¿Qué está pasando?**
- El script compila el módulo Move
- Lo publica en Aptos testnet
- Muestra la dirección del módulo desplegado

**Conceptos clave:**
- `module` - Define un módulo Move
- `entry fun` - Funciones que pueden ser llamadas desde fuera
- `struct` - Define estructuras de datos
- `resource` - Recursos que pueden ser almacenados en cuentas

### Paso 2: Crear Colección y Mintar Personajes

```bash
# Reemplaza MODULE_ADDRESS con la dirección obtenida del deploy
./scripts/mint.sh MODULE_ADDRESS
```

**¿Qué está pasando?**
- Se inicializa el módulo para la cuenta
- Se crea una colección de NFTs
- Se mintean 3 personajes con atributos únicos

**Conceptos clave:**
- `token::create_collection` - Crea una colección de tokens
- `token::create_tokendata` - Define metadatos del token
- `token::mint` - Crea tokens físicos
- `property_map` - Almacena propiedades personalizadas

### Paso 3: Explorar la DApp Web

```bash
cd ../web
npm install
npm start
```

**Funcionalidades:**
- Conectar wallet (Petra/Martian)
- Ver personajes minteados
- Explorar otros jugadores
- Iniciar batallas

### Paso 4: Iniciar Batallas

```bash
cd ../move
./scripts/battle.sh MODULE_ADDRESS OPPONENT_ADDRESS YOUR_CHAR_INDEX OPPONENT_CHAR_INDEX
```

**¿Qué está pasando?**
- Se comparan atributos de los personajes
- Se añade un factor aleatorio
- El perdedor ve su NFT quemado
- Se registra el resultado de la batalla

**Conceptos clave:**
- `assert!` - Verificaciones de seguridad
- `borrow_global` - Acceso a recursos globales
- `token::burn` - Eliminación permanente de tokens
- Manejo de errores con códigos personalizados

## 📖 Conceptos Move Explicados

### 1. Estructuras de Datos
```move
struct Character has store, drop {
    id: u64,
    character_type: u64,
    power: u64,
    defense: u64,
    owner: address,
    token_id: TokenId,
}
```

**Explicación:**
- `has store` - Permite almacenar en recursos globales
- `has drop` - Permite descartar la estructura
- `address` - Tipo para direcciones de cuenta
- `u64` - Entero sin signo de 64 bits

### 2. Recursos Globales
```move
struct GalacticWars has key {
    characters: Table<address, vector<Character>>,
    battles: Table<u64, Battle>,
    battle_counter: u64,
    collection_created: SimpleMap<address, bool>,
}
```

**Explicación:**
- `has key` - Indica que es un recurso global
- `Table` - Estructura de datos eficiente para mapeos
- `vector` - Lista dinámica
- `SimpleMap` - Mapeo simple de clave-valor

### 3. Funciones Entry
```move
public entry fun battle(
    challenger: &signer,
    opponent_address: address,
    challenger_token_index: u64,
    opponent_token_index: u64,
) acquires GalacticWars, CharacterCapability
```

**Explicación:**
- `entry` - Función que puede ser llamada desde transacciones
- `&signer` - Referencia al firmante de la transacción
- `acquires` - Lista de recursos que la función puede acceder

### 4. Manejo de Errores
```move
const ECHARACTER_NOT_FOUND: u64 = 3;

assert!(vector::length(challenger_characters) > challenger_token_index, ECHARACTER_NOT_FOUND);
```

**Explicación:**
- `const` - Define constantes
- `assert!` - Macro para verificaciones
- Códigos de error personalizados para debugging

## 🎯 Ejercicios Prácticos

### Ejercicio 1: Modificar Atributos
Cambia los valores de poder y defensa de los personajes en la función `get_character_attributes`.

### Ejercicio 2: Añadir Nuevo Tipo de Personaje
Crea un nuevo tipo de personaje (ej: "Cyborg") con sus propios atributos.

### Ejercicio 3: Implementar Sistema de Niveles
Añade un campo `level` a la estructura `Character` y lógica para subir de nivel.

### Ejercicio 4: Crear Función de Curación
Implementa una función que permita curar personajes heridos.

## 🔍 Debugging y Troubleshooting

### Errores Comunes

1. **"Account not found"**
   - Solución: Asegúrate de tener fondos en testnet
   - Verifica que la cuenta esté inicializada

2. **"Module not found"**
   - Solución: Verifica que el módulo esté desplegado
   - Confirma la dirección del módulo

3. **"Resource not found"**
   - Solución: Ejecuta la función `initialize` primero
   - Verifica que la colección esté creada

### Herramientas de Debugging

- **Aptos Explorer**: [explorer.aptoslabs.com](https://explorer.aptoslabs.com/)
- **Aptos CLI**: `aptos move view --function-id <function>`
- **Console logs**: Revisa la consola del navegador

## 📚 Recursos Adicionales

### Documentación Oficial
- [Aptos Documentation](https://aptos.dev/)
- [Move Language](https://move-language.github.io/move/)
- [Aptos Token Standard](https://aptos.dev/concepts/coin-and-token/aptos-token/)

### Comunidad
- [Aptos Discord](https://discord.gg/aptos)
- [Aptos Forum](https://forum.aptoslabs.com/)
- [GitHub Discussions](https://github.com/aptos-labs/aptos-core/discussions)

### Próximos Pasos
- Explorar otros frameworks de Move
- Implementar más funcionalidades de juego
- Crear tu propio proyecto en Aptos
- Contribuir a la comunidad

## 🎉 ¡Felicidades!

Has completado el taller **Galactic Move Wars** y ahora tienes:
- ✅ Un smart contract funcional en Move
- ✅ Una DApp web interactiva
- ✅ Experiencia práctica con NFTs en Aptos
- ✅ Conocimientos fundamentales de Move

¡Continúa explorando el ecosistema de Aptos y construye el futuro de Web3! 🚀
