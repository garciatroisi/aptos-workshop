# 🌐 Galactic Move Wars - Web DApp

Interfaz web para el juego de batallas intergalácticas con NFTs en Aptos.

## 🚀 Inicio Rápido

### Instalación
```bash
npm install
```

### Desarrollo
```bash
npm start
```

La aplicación se abrirá en [http://localhost:3000](http://localhost:3000).

### Build de Producción
```bash
npm run build
```

## 🛠️ Tecnologías

- **React 18** - Framework de UI
- **TypeScript** - Tipado estático
- **Ant Design** - Componentes de UI
- **Aptos Wallet Adapter** - Integración con wallets
- **Aptos TypeScript SDK** - Interacción con blockchain

## 📁 Estructura

```
src/
├── components/
│   ├── CharacterCollection.tsx  # Gestión de personajes
│   └── BattleArena.tsx          # Arena de batallas
├── App.tsx                      # Componente principal
├── App.css                      # Estilos principales
└── index.tsx                    # Punto de entrada
```

## 🔌 Wallets Soportadas

- **Petra Wallet** - Wallet oficial de Aptos
- **Martian Wallet** - Wallet alternativa

## 🎮 Funcionalidades

### Conexión de Wallet
- Conectar/desconectar wallet
- Mostrar dirección de cuenta
- Cambiar entre redes

### Gestión de Personajes
- Ver personajes minteados
- Mintar nuevos personajes
- Visualizar atributos (poder, defensa)

### Arena de Batallas
- Ver otros jugadores
- Seleccionar oponentes
- Iniciar batallas
- Ver resultados en tiempo real

## 🔧 Configuración

### Variables de Entorno
Crea un archivo `.env` en la raíz del proyecto:

```env
REACT_APP_MODULE_ADDRESS=0x123...  # Dirección del módulo desplegado
REACT_APP_NETWORK=testnet          # Red de Aptos
```

### Personalización
- Modifica `App.tsx` para cambiar la dirección del módulo
- Ajusta estilos en `App.css`
- Personaliza componentes en `components/`

## 🐛 Debugging

### Errores Comunes

1. **"Wallet not connected"**
   - Instala Petra o Martian Wallet
   - Asegúrate de estar en testnet

2. **"Module not found"**
   - Verifica la dirección del módulo
   - Confirma que esté desplegado en testnet

3. **"Transaction failed"**
   - Verifica que tengas APT para gas
   - Revisa la consola para errores específicos

### Herramientas
- **React Developer Tools** - Debugging de componentes
- **Aptos Explorer** - Ver transacciones
- **Console logs** - Errores y logs

## 📱 Responsive Design

La aplicación está optimizada para:
- 📱 Móviles (320px+)
- 📱 Tablets (768px+)
- 💻 Desktop (1024px+)

## 🎨 Temas y Estilos

### Paleta de Colores
- **Primario**: #1890ff (Azul)
- **Secundario**: #722ed1 (Púrpura)
- **Fondo**: Gradiente azul-púrpura
- **Texto**: #000000 (Negro)

### Componentes Personalizados
- Cards con efectos hover
- Botones con gradientes
- Modales con backdrop blur
- Animaciones suaves

## 🔒 Seguridad

- Validación de inputs
- Manejo seguro de wallets
- Verificación de transacciones
- Sanitización de datos

## 📈 Performance

- Lazy loading de componentes
- Optimización de imágenes
- Caching de datos
- Compresión de assets

## 🤝 Contribuir

1. Fork el repositorio
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📄 Licencia

MIT License - ver [LICENSE](../LICENSE) para detalles.
