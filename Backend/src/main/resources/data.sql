-- Datos de prueba para CartaDigital

-- Insertar usuario administrador
INSERT INTO usuario (usuario, contrasenia) VALUES ('admin', 'admin123');

-- Insertar productos (sin subgrupos, imágenes ni cantidad)
INSERT INTO producto (nombre, precio, grupo, descripcion, disponibilidad, id_usuario) VALUES
('Pizza Muzzarella', 3500, 'Pizzas', 'Pizza tradicional con muzzarella y salsa de tomate', true, 1),
('Pizza Margherita', 3800, 'Pizzas', 'Pizza con muzzarella, tomate y albahaca', true, 1),
('Pizza Napolitana', 4200, 'Pizzas', 'Pizza con muzzarella, jamón, tomate y aceitunas', true, 1),
('Hamburguesa Clásica', 2800, 'Hamburguesas', 'Hamburguesa con carne, lechuga, tomate y queso', true, 1),
('Hamburguesa Doble', 3500, 'Hamburguesas', 'Hamburguesa doble carne con todos los aderezos', true, 1),
('Pollo a la parrilla', 3200, 'Carnes', 'Pechuga de pollo a la parrilla con guarnición', true, 1),
('Milanesa de ternera', 2900, 'Carnes', 'Milanesa de ternera con papas fritas', true, 1),
('Ensalada César', 1800, 'Ensaladas', 'Lechuga, crutones, parmesano y aderezo César', true, 1),
('Coca Cola 500ml', 800, 'Bebidas', 'Coca Cola regular 500ml', true, 1),
('Agua Mineral 500ml', 500, 'Bebidas', 'Agua mineral sin gas 500ml', true, 1),
('Helado de Vainilla', 1200, 'Postres', 'Helado de vainilla con toppings', true, 1),
('Tiramisú', 1500, 'Postres', 'Tiramisú casero con café y cacao', true, 1);

-- Insertar clientes
INSERT INTO cliente (nombre, apellido, direccion, telefono) VALUES
('Juan', 'Pérez', 'Av. San Martín 123, CABA', '11-1234-5678'),
('María', 'González', 'Calle Corrientes 456, CABA', '11-2345-6789'),
('Carlos', 'López', 'Av. Belgrano 789, CABA', '11-3456-7890'),
('Ana', 'Martínez', 'Calle Florida 321, CABA', '11-4567-8901'),
('Roberto', 'Fernández', 'Av. Rivadavia 654, CABA', '11-5678-9012');

-- Insertar parámetros web
INSERT INTO parametro_web (estado, mensaje, barrido) VALUES
(true, 'Carta disponible', '¡Promo especial! 2x1 en pizzas los martes');

-- Insertar carritos de ejemplo
INSERT INTO carrito (fecha, cliente_id) VALUES
('2025-08-19 12:00:00', 1),
('2025-08-19 13:30:00', 2),
('2025-08-19 14:15:00', 3);

-- Insertar productos en carritos
INSERT INTO carrito_producto (carrito_id, producto_id, precio, cantidad) VALUES
(1, 1, 3500, 2),  -- 2 pizzas muzzarella en carrito 1
(1, 9, 800, 1),   -- 1 coca cola en carrito 1
(2, 4, 2800, 1),  -- 1 hamburguesa en carrito 2
(2, 8, 1800, 1),  -- 1 ensalada en carrito 2
(3, 3, 4200, 1),  -- 1 pizza napolitana en carrito 3
(3, 10, 500, 2);  -- 2 aguas en carrito 3

-- Insertar pedidos de ejemplo
INSERT INTO pedido (fecha, estado, total, notas, cliente_id) VALUES
('2025-08-18 19:00:00', 'ENTREGADO', 7800, 'Sin cebolla en la pizza', 1),
('2025-08-18 20:30:00', 'ENTREGADO', 4600, 'Hamburguesa bien cocida', 2),
('2025-08-19 11:00:00', 'EN_PREPARACION', 4700, 'Pizza extra queso', 3);

-- Insertar productos en pedidos
INSERT INTO pedido_producto (pedido_id, producto_id, precio, cantidad) VALUES
(1, 1, 3500, 2),  -- 2 pizzas muzzarella en pedido 1
(1, 9, 800, 1),   -- 1 coca cola en pedido 1
(2, 4, 2800, 1),  -- 1 hamburguesa en pedido 2
(2, 8, 1800, 1),  -- 1 ensalada en pedido 2
(3, 3, 4200, 1),  -- 1 pizza napolitana en pedido 3
(3, 10, 500, 1);  -- 1 agua en pedido 3