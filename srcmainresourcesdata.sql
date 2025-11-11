-- Datos iniciales para el Sistema de Farmacias

-- Insertar usuarios (contraseñas: admin123 y user123)
INSERT INTO usuarios (username, password, email, role) VALUES 
('admin', '$2a$10$ABCDE1234567890FEDCBA9876543210ABCDEF1234567890ABCDEF123456', 'admin@farmacia.com', 'ADMIN'),
('user', '$2a$10$1234567890ABCDEFEDCBA9876543210FEDCBA1234567890FEDCBA123456', 'user@farmacia.com', 'USER');

-- Insertar clientes
INSERT INTO clientes (nombre, email, telefono, direccion) VALUES 
('Juan Pérez García', 'juan.perez@email.com', '555-123-4567', 'Calle Primavera #123, Col. Centro'),
('María Hernández López', 'maria.hernandez@email.com', '555-987-6543', 'Av. Reforma #456, Col. Moderna'),
('Carlos Rodríguez Silva', 'carlos.rodriguez@email.com', '555-555-1234', 'Calle Luna #789, Col. Norte');

-- Insertar doctores
INSERT INTO doctores (nombre, especialidad, cedula_profesional, telefono, consultorio) VALUES 
('Dr. Roberto Sánchez Mendoza', 'Cardiología', 'CARD-123456', '555-111-2233', 'Consultorio 101, Edificio Médico'),
('Dra. Ana García Fernández', 'Pediatría', 'PED-654321', '555-222-3344', 'Consultorio 205, Hospital Central'),
('Dr. Miguel Torres Rojas', 'Medicina General', 'MG-789012', '555-333-4455', 'Consultorio 304, Clínica Familiar');

-- Insertar medicamentos
INSERT INTO medicamentos (nombre, descripcion, laboratorio, principio_activo, precio, stock, requiere_receta) VALUES 
('Paracetamol 500mg', 'Analgésico y antipirético para el alivio del dolor y fiebre', 'Genfar', 'Paracetamol', 5.50, 100, false),
('Amoxicilina 500mg', 'Antibiótico de amplio espectro para infecciones bacterianas', 'Bayer', 'Amoxicilina', 12.75, 50, true),
('Omeprazol 20mg', 'Inhibidor de bomba de protones para protección gástrica', 'Pfizer', 'Omeprazol', 8.90, 75, false),
('Losartán 50mg', 'Antihipertensivo para el control de la presión arterial', 'Novartis', 'Losartán', 15.25, 60, true),
('Metformina 850mg', 'Antidiabético oral para el control de la glucosa', 'Merck', 'Metformina', 9.80, 80, true);

-- Insertar recetas
INSERT INTO recetas (fecha_emision, fecha_vencimiento, diagnostico, indicaciones, doctor_id, cliente_id) VALUES 
('2024-01-15', '2024-02-15', 'Infección bacteriana respiratoria superior', 'Tomar una tableta cada 8 horas por 7 días', 1, 1),
('2024-01-20', '2024-02-20', 'Hipertensión arterial controlada', 'Tomar una tableta cada 24 horas de por vida', 2, 2),
('2024-01-25', '2024-02-25', 'Diabetes mellitus tipo 2', 'Tomar una tableta con el desayuno y la cena', 3, 3);

-- Insertar ventas de ejemplo
INSERT INTO ventas (fecha, total, cliente_id, receta_id, usuario_id) VALUES 
('2024-01-20 10:30:00', 25.15, 1, 1, 2),
('2024-01-21 14:15:00', 18.45, 2, 2, 2);

-- Insertar detalles de venta
INSERT INTO detalles_venta (venta_id, medicamento_id, cantidad, precio_unitario, subtotal) VALUES 
(1, 1, 2, 5.50, 11.00),
(1, 2, 1, 12.75, 12.75),
(1, 3, 1, 8.90, 8.90),
(2, 4, 1, 15.25, 15.25),
(2, 5, 1, 9.80, 9.80);