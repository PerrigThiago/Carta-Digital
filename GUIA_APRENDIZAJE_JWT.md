# 🎓 Guía de Aprendizaje: Implementación de JWT + BCrypt

## 📚 Objetivo
Implementar un sistema de autenticación y autorización seguro usando JWT y BCrypt.

---

## 📖 PARTE 1: Entendiendo los Conceptos

### 🔐 ¿Qué es JWT (JSON Web Token)?

**JWT es un estándar abierto (RFC 7519) para transmitir información de forma segura entre partes como un objeto JSON.**

#### Estructura de un JWT:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

Se divide en **3 partes** separadas por puntos (`.`):

#### 1. **Header (Encabezado)**
```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```
- `alg`: Algoritmo de encriptación (HS256 = HMAC SHA-256)
- `typ`: Tipo de token

#### 2. **Payload (Carga útil)**
```json
{
  "sub": "1234567890",    // Subject (ID del usuario)
  "name": "John Doe",     // Nombre
  "iat": 1516239022,      // Issued At (cuándo se creó)
  "exp": 1516242622       // Expiration (cuándo expira)
}
```
- Contiene los "claims" (afirmaciones) sobre el usuario
- **NO está encriptado**, solo codificado en Base64
- **Nunca pongas contraseñas aquí**

#### 3. **Signature (Firma)**
```
HMACSHA256(
  base64UrlEncode(header) + "." + base64UrlEncode(payload),
  secret_key
)
```
- Garantiza que el token no fue modificado
- Solo el servidor puede crear/verificar la firma (tiene la clave secreta)

---

### 🤔 PREGUNTA 1: ¿Por qué JWT?

Antes de continuar, investiga y responde:

**a) ¿Cuál es la diferencia entre autenticación basada en sesiones vs JWT?**

<details>
<summary>💡 Pista</summary>
Piensa en dónde se guarda la información del usuario:
- Sesiones: ¿Dónde se guarda? ¿Qué pasa si tienes 1000 usuarios?
- JWT: ¿Dónde se guarda? ¿Qué ventaja tiene esto?
</details>

**b) ¿Qué significa que JWT sea "stateless"?**

**c) Si el payload NO está encriptado, ¿por qué es seguro JWT?**

<details>
<summary>💡 Pista</summary>
La seguridad no viene del payload, viene de la _____
</details>

---

### 🔒 ¿Qué es BCrypt?

**BCrypt es un algoritmo de hashing diseñado específicamente para contraseñas.**

#### Ejemplo:
```
Contraseña: "MiContraseña123"
BCrypt Hash: "$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy"
```

#### Características importantes:
1. **Unidireccional**: No se puede "desencriptar"
2. **Salt automático**: Cada hash es diferente, incluso con la misma contraseña
3. **Costo configurable**: Más lento = más seguro contra ataques de fuerza bruta

---

### 🤔 PREGUNTA 2: ¿Por qué BCrypt?

**a) ¿Por qué no simplemente hacer SHA256(contraseña)?**

<details>
<summary>💡 Pista</summary>
Investiga qué son las "rainbow tables" y cómo BCrypt las previene
</details>

**b) ¿Qué es un "salt" y por qué es importante?**

**c) Si BCrypt es unidireccional, ¿cómo comparamos contraseñas en el login?**

<details>
<summary>💡 Pista</summary>
BCrypt tiene dos funciones principales: hash() y compare()
</details>

---

## 🛠️ PARTE 2: Arquitectura del Sistema

### Flujo de Autenticación JWT

```
Cliente                          Servidor
  │                                 │
  │  1. POST /login                 │
  │     {user, password}            │
  ├────────────────────────────────►│
  │                                 │
  │                          2. Busca usuario
  │                          3. BCrypt.compare()
  │                          4. ¿Válido? → Genera JWT
  │                                 │
  │  5. Respuesta                   │
  │     {token: "eyJhbG..."}        │
  │◄────────────────────────────────┤
  │                                 │
  │  6. Guarda token en             │
  │     localStorage                │
  │                                 │
  │  7. GET /productos              │
  │     Header: Authorization:      │
  │     Bearer eyJhbG...            │
  ├────────────────────────────────►│
  │                                 │
  │                          8. JwtFilter intercepta
  │                          9. Valida token
  │                          10. ¿Válido? → Procesa
  │                                 │
  │  11. Respuesta con datos        │
  │◄────────────────────────────────┤
```

---

### 🤔 PREGUNTA 3: Diseña el Flujo

Antes de implementar, dibuja o describe:

**a) ¿Qué pasa si el token expiró en el paso 9?**

**b) ¿Dónde debe validarse el token: Frontend, Backend, o ambos? ¿Por qué?**

**c) ¿Qué información debe contener el payload del JWT en tu aplicación?**

<details>
<summary>💡 Pista</summary>
Piensa qué necesitas saber del usuario en cada request: ¿ID? ¿Username? ¿Rol?
</details>

---

## 🎯 PARTE 3: Plan de Implementación

### Fase 1: Backend - Preparación

#### Paso 1.1: Agregar Dependencias JWT

**📝 TAREA:** Abre `Backend/pom.xml` y agrega las dependencias de JWT.

**🔍 Investiga:**
- ¿Qué librería JWT usar en Spring Boot? (Pista: jjwt de io.jsonwebtoken)
- ¿Qué versión es estable? (Busca en Maven Central)
- ¿Necesitas una o varias dependencias?

**📚 Recursos:**
- Maven Repository: https://mvnrepository.com/artifact/io.jsonwebtoken/jjwt
- Documentación JJWT: https://github.com/jwtk/jjwt

**❓ Preguntas guía:**
- ¿Por qué necesitas `jjwt-api`, `jjwt-impl` Y `jjwt-jackson`?
- ¿Cuál es la diferencia entre compilar con la API vs la implementación?

---

#### Paso 1.2: Agregar Spring Security BCrypt

**📝 TAREA:** BCrypt ya viene con Spring Security, pero necesitas configurarlo.

**🔍 Investiga:**
- ¿Qué clase de Spring Security proporciona BCrypt?
- ¿Cómo se declara como un @Bean?

**📚 Recursos:**
- Documentación Spring Security: https://docs.spring.io/spring-security/reference/features/authentication/password-storage.html

**❓ Preguntas guía:**
- ¿Dónde deberías crear el bean de PasswordEncoder?
- ¿Cuántas "rounds" de hashing usar? (strength parameter)

---

### Fase 2: Backend - Crear Utilidades

#### Paso 2.1: Crear JwtUtil

**📝 TAREA:** Crea la clase `Backend/src/main/java/com/example/util/JwtUtil.java`

**🎯 Funciones que debe tener:**
```java
public class JwtUtil {
    // 1. Generar token a partir de username
    public String generateToken(String username) { }
    
    // 2. Extraer username del token
    public String extractUsername(String token) { }
    
    // 3. Validar si el token es válido
    public Boolean validateToken(String token, String username) { }
    
    // 4. Verificar si el token expiró
    private Boolean isTokenExpired(String token) { }
    
    // 5. Extraer fecha de expiración
    private Date extractExpiration(String token) { }
}
```

**🔍 Investiga:**
- ¿Cómo usar `Jwts.builder()` para crear un token?
- ¿Qué es una "secret key" y cómo generarla de forma segura?
- ¿Cómo setear la expiración? (Pista: `.setExpiration()`)
- ¿Cómo parsear y validar un token? (Pista: `Jwts.parserBuilder()`)

**📚 Recursos:**
- JJWT Examples: https://github.com/jwtk/jjwt#quickstart
- Código de referencia: Busca "Spring Boot JWT example"

**❓ Preguntas guía:**
1. ¿Dónde debes guardar la secret key? ¿En el código o en `application.properties`?
2. ¿Cuánto tiempo debe durar el token? (Recomendación: 24 horas)
3. ¿Qué pasa si alguien modifica el payload del token?
4. ¿Cómo manejas excepciones si el token es inválido?

**💡 Pista para la Secret Key:**
```properties
# application.properties
jwt.secret=TU_CLAVE_SUPER_SECRETA_AQUI_123456789
jwt.expiration=86400000  # 24 horas en milisegundos
```

---

#### Paso 2.2: Implementar BCrypt en UsuarioServicio

**📝 TAREA:** Modifica `UsuarioServicio.java` para usar BCrypt

**🎯 Cambios necesarios:**

1. **Al crear usuario:**
```java
// ANTES (inseguro):
usuario.setContrasenia(usuario.getContrasenia());

// DESPUÉS (seguro):
String hashedPassword = passwordEncoder.encode(usuario.getContrasenia());
usuario.setContrasenia(hashedPassword);
```

2. **Al autenticar:**
```java
// ANTES (inseguro):
if (contrasenia.equals(encontrado.getContrasenia())) { }

// DESPUÉS (seguro):
if (passwordEncoder.matches(contrasenia, encontrado.getContrasenia())) { }
```

**🔍 Investiga:**
- ¿Cómo inyectar `PasswordEncoder` con `@Autowired`?
- ¿Qué hace `encode()` vs `matches()`?
- ¿Qué pasa con las contraseñas existentes en tu BD?

**❓ Preguntas guía:**
1. ¿Necesitas actualizar las contraseñas existentes? ¿Cómo?
2. ¿Puedes "desencriptar" un hash de BCrypt? ¿Por qué sí o no?
3. ¿Cada vez que hasheas "password123" obtienes el mismo resultado?

---

### Fase 3: Backend - Seguridad y Filtros

#### Paso 3.1: Crear JwtAuthenticationFilter

**📝 TAREA:** Crea `Backend/src/main/java/com/example/security/JwtAuthenticationFilter.java`

**🎯 Objetivo:** Interceptar TODAS las requests y validar el token JWT

**Estructura básica:**
```java
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    
    @Override
    protected void doFilterInternal(HttpServletRequest request, 
                                   HttpServletResponse response, 
                                   FilterChain filterChain) {
        // 1. Extraer token del header "Authorization"
        // 2. Validar token
        // 3. Si es válido, setear autenticación en SecurityContext
        // 4. Continuar con la cadena de filtros
    }
}
```

**🔍 Investiga:**
- ¿Qué es un `Filter` en Spring?
- ¿Qué significa `OncePerRequestFilter`?
- ¿Cómo extraer el header `Authorization: Bearer <token>`?
- ¿Cómo setear la autenticación en `SecurityContextHolder`?

**📚 Recursos:**
- Spring Filters: https://docs.spring.io/spring-framework/docs/current/reference/html/web.html#filters
- UsernamePasswordAuthenticationToken

**❓ Preguntas guía:**
1. ¿Por qué el token viene con "Bearer " al principio?
2. ¿Qué pasa si el token no es válido? ¿Dejas pasar el request?
3. ¿Necesitas validar el token en TODAS las rutas? ¿Qué pasa con `/login`?

**💡 Reto de Pensamiento:**
Diseña el pseudocódigo del filtro antes de escribir código real:
```
1. Obtener header "Authorization"
2. SI header existe Y empieza con "Bearer ":
   a. Extraer token (quitar "Bearer ")
   b. Extraer username del token
   c. SI username existe Y usuario NO está autenticado:
      - Validar token
      - SI es válido:
        * Crear objeto de autenticación
        * Setear en SecurityContext
3. Continuar con filterChain
```

---

#### Paso 3.2: Actualizar SecurityConfig

**📝 TAREA:** Modifica `SecurityConfig.java` para usar JWT

**🎯 Objetivos:**
1. Desactivar autenticación de sesión (usaremos JWT)
2. Agregar el JwtAuthenticationFilter
3. Configurar qué rutas son públicas y cuáles protegidas

**🔍 Investiga:**
- ¿Qué es `SessionCreationPolicy.STATELESS`?
- ¿Cómo agregar un filtro custom con `.addFilterBefore()`?
- ¿Qué diferencia hay entre `.permitAll()` y `.authenticated()`?

**❓ Preguntas guía:**
1. ¿Qué rutas deben ser públicas en tu aplicación?
   - Login: ¿Público o privado?
   - Carta digital (productos disponibles): ¿Público o privado?
   - CRUD de productos: ¿Público o privado?
   
2. ¿Dónde pones el JwtAuthenticationFilter en la cadena de filtros?

3. ¿Qué pasa si desactivas CSRF? ¿Es seguro con JWT?

**💡 Estructura a pensar:**
```
Rutas públicas (permitAll):
- /api/usuarios/login
- /api/productos/disponibles
- /api/productos/grupo/**
- /api/productos/buscar

Rutas protegidas (authenticated):
- /api/productos (POST, PUT, DELETE)
- /api/usuarios/**
```

---

### Fase 4: Backend - Actualizar Login

#### Paso 4.1: Modificar UsuarioControlador

**📝 TAREA:** Actualiza el endpoint `/login` para retornar JWT

**🎯 Cambio en la respuesta:**

ANTES:
```json
{
  "id": 1,
  "usuario": "admin"
}
```

DESPUÉS:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "tipo": "Bearer",
  "usuario": {
    "id": 1,
    "usuario": "admin"
  }
}
```

**🔍 Investiga:**
- ¿Cómo inyectar `JwtUtil` en el controlador?
- ¿Debes crear una clase DTO para la respuesta?
- ¿Dónde generas el token? (Pista: después de autenticar)

**❓ Preguntas guía:**
1. ¿Qué información pones en el payload del JWT?
2. ¿Debes retornar la contraseña? (Ya lo haces bien, pero ¿por qué no?)
3. ¿Qué status HTTP retornar si las credenciales son inválidas? (Ya usas 401, ¿es correcto?)

---

## 🎯 PARTE 4: Frontend

### Fase 5: Frontend - Componentes de Seguridad

#### Paso 5.1: Crear ProtectedRoute

**📝 TAREA:** Crea `Frontend/src/components/ProtectedRoute.jsx`

**🎯 Objetivo:** Envolver rutas que requieren autenticación

**Uso esperado:**
```jsx
<ProtectedRoute>
  <Dashboard />
</ProtectedRoute>
```

**🔍 Investiga:**
- ¿Cómo usar `Navigate` de react-router-dom para redirigir?
- ¿Cómo acceder al contexto de autenticación?
- ¿Qué validaciones hacer? (¿usuario existe? ¿token válido? ¿expiró?)

**❓ Preguntas guía:**
1. ¿Dónde rediriges si el usuario NO está autenticado?
2. ¿Qué pasa si el token expiró pero el usuario está en localStorage?
3. ¿Debes validar el token en el frontend? ¿Por qué sí o no?

**💡 Estructura a pensar:**
```jsx
export default function ProtectedRoute({ children }) {
  // 1. Obtener estado de autenticación
  // 2. Verificar si está autenticado
  // 3. Verificar si el token expiró
  // 4. SI no está autenticado O token expiró:
  //    - Limpiar localStorage
  //    - Redirigir a /login
  // 5. SI está autenticado:
  //    - Renderizar children
}
```

---

#### Paso 5.2: Actualizar auth.js

**📝 TAREA:** Modifica `Frontend/src/utils/auth.js` para manejar JWT real

**🎯 Cambios necesarios:**

1. **Decodificar JWT** (para obtener expiración)
2. **Validar expiración** antes de usar el token
3. **Auto-logout** si el token expiró

**🔍 Investiga:**
- ¿Cómo decodificar un JWT en JavaScript? (Pista: librería `jwt-decode` o manual con `atob()`)
- ¿Cómo verificar si un timestamp Unix expiró?
- ¿Debes instalar `jwt-decode`? (`npm install jwt-decode`)

**📚 Recursos:**
- jwt-decode: https://www.npmjs.com/package/jwt-decode

**❓ Preguntas guía:**
1. JWT tiene 3 partes, ¿cuál contiene la expiración?
2. ¿Puedes validar la firma del JWT en el frontend? ¿Por qué sí o no?
3. Si el token expiró, ¿qué haces? ¿Renuevas o haces logout?

**💡 Función a implementar:**
```javascript
export const auth = {
  // Decodificar token para obtener info
  decodeToken: (token) => {
    // Usa jwt-decode o implementación manual
  },
  
  // Verificar si el token expiró
  isTokenExpired: (token) => {
    // Compara exp con Date.now()
  },
  
  // Validar token (expiración + existencia)
  isTokenValid: () => {
    const token = auth.getToken();
    if (!token) return false;
    return !auth.isTokenExpired(token);
  }
}
```

---

#### Paso 5.3: Crear Interceptor de API

**📝 TAREA:** Modifica `Frontend/src/utils/auth.js` o `apiConfig.js` para agregar el token automáticamente

**🎯 Objetivo:** Agregar `Authorization: Bearer <token>` a TODAS las requests automáticamente

**🔍 Investiga:**
- ¿Cómo usar Fetch API con interceptors?
- ¿Deberías crear una función wrapper para fetch?
- ¿Qué hacer si una request retorna 401 (no autorizado)?

**❓ Preguntas guía:**
1. ¿Debes agregar el token al llamar a `/login`? ¿Por qué?
2. ¿Qué pasa si el backend retorna 401? ¿Reintentas o haces logout?
3. ¿Dónde interceptar: en cada service o en un lugar central?

**💡 Ejemplo de enfoque:**
```javascript
// apiClient con token automático
export const apiClient = {
  fetch: async (url, options = {}) => {
    const token = auth.getToken();
    
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers
    };
    
    // ¿Cuándo agregar el token?
    if (token && auth.isTokenValid()) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    const response = await fetch(url, { ...options, headers });
    
    // ¿Qué hacer si 401?
    if (response.status === 401) {
      // ¿Logout automático?
    }
    
    return response;
  }
}
```

---

## 🧪 PARTE 5: Testing y Validación

### Pruebas que debes hacer:

**Backend:**
1. [ ] Crear usuario con contraseña → Verificar que se guardó hasheada
2. [ ] Login con credenciales correctas → Recibir JWT válido
3. [ ] Login con credenciales incorrectas → Recibir 401
4. [ ] Acceder a `/api/productos` SIN token → Recibir 403/401
5. [ ] Acceder a `/api/productos` CON token válido → Recibir datos
6. [ ] Acceder con token expirado → Recibir 401
7. [ ] Acceder con token manipulado → Recibir 401

**Frontend:**
1. [ ] Login exitoso → Guardar token en localStorage
2. [ ] Dashboard requiere autenticación → Redirige a /login si no hay token
3. [ ] Crear producto → Envía token en header
4. [ ] Token expirado → Logout automático
5. [ ] Refresh página → Mantiene sesión si token válido

---

## 📚 Recursos de Aprendizaje

### Documentación Oficial:
- JWT: https://jwt.io/introduction
- Spring Security: https://spring.io/projects/spring-security
- BCrypt: https://en.wikipedia.org/wiki/Bcrypt

### Tutoriales Recomendados:
- JWT en Spring Boot: https://www.bezkoder.com/spring-boot-jwt-authentication/
- React JWT Auth: https://www.bezkoder.com/react-jwt-auth/

### Videos (opcional):
- "JWT Explained" - Fireship (YouTube)
- "Spring Security JWT" - Amigoscode (YouTube)

---

## 🎯 Plan de Ejecución Sugerido

### Día 1: Conceptos y Backend Setup
- [ ] Leer y entender JWT y BCrypt
- [ ] Responder todas las preguntas conceptuales
- [ ] Agregar dependencias
- [ ] Crear JwtUtil
- [ ] Implementar BCrypt en UsuarioServicio

### Día 2: Seguridad Backend
- [ ] Crear JwtAuthenticationFilter
- [ ] Actualizar SecurityConfig
- [ ] Modificar endpoint de login
- [ ] Probar con Postman/Insomnia

### Día 3: Frontend
- [ ] Crear ProtectedRoute
- [ ] Actualizar auth.js
- [ ] Implementar interceptor
- [ ] Testing completo

---

## 💬 Preguntas Finales de Reflexión

Antes de empezar, piensa y responde:

1. **¿Por qué es importante la seguridad?**
   - ¿Qué pasa si alguien hackea tu sistema?
   - ¿Qué información sensible proteges?

2. **¿Entiendes el flujo completo?**
   - Dibuja el diagrama de login → token → request → validación

3. **¿Estás listo para empezar?**
   - ¿Qué parte te parece más difícil?
   - ¿Qué preguntas tienes antes de empezar?

---

## 🚀 ¡Empieza Aquí!

Cuando estés listo, dime:
1. **¿Qué fase quieres empezar?** (Recomiendo Fase 1)
2. **¿Entendiste los conceptos básicos?**
3. **¿Tienes alguna duda conceptual antes de codear?**

Estaré aquí para guiarte, responder preguntas, y revisar tu código. 
¡NO te daré la respuesta completa, pero te guiaré para que la encuentres! 💪

**Principio de aprendizaje:** "Dime y lo olvidaré, enséñame y lo recordaré, involúcrame y lo aprenderé" - Benjamin Franklin

