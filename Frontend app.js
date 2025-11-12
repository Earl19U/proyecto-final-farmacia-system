let currentToken = '';
let currentUser = '';

// Login
document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    try {
        const response = await fetch('http://localhost:8080/api/v1/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        
        if (response.ok) {
            const data = await response.json();
            currentToken = data.token;
            currentUser = data.username;
            
            document.getElementById('loginSection').style.display = 'none';
            document.getElementById('dashboard').style.display = 'block';
            document.getElementById('userRole').textContent = data.role;
            
            mostrarMensaje('Login exitoso!', 'success');
        } else {
            mostrarMensaje('Credenciales inválidas', 'error');
        }
    } catch (error) {
        mostrarMensaje('Error de conexión', 'error');
    }
});

// Cargar clientes
async function cargarClientes() {
    try {
        const response = await fetch('http://localhost:8080/api/v1/clientes', {
            headers: {
                'Authorization': `Bearer ${currentToken}`
            }
        });
        
        if (response.ok) {
            const clientes = await response.json();
            mostrarClientes(clientes);
        } else {
            mostrarMensaje('Error al cargar clientes', 'error');
        }
    } catch (error) {
        mostrarMensaje('Error de conexión', 'error');
    }
}

// Mostrar clientes en tabla
function mostrarClientes(clientes) {
    let html = `
        <div class="card">
            <div class="card-body">
                <h5>Lista de Clientes (${clientes.length})</h5>
                <div class="table-responsive">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Email</th>
                                <th>Teléfono</th>
                                <th>Dirección</th>
                            </tr>
                        </thead>
                        <tbody>
    `;
    
    clientes.forEach(cliente => {
        html += `
            <tr>
                <td>${cliente.id}</td>
                <td>${cliente.nombre}</td>
                <td>${cliente.email || '-'}</td>
                <td>${cliente.telefono || '-'}</td>
                <td>${cliente.direccion || '-'}</td>
            </tr>
        `;
    });
    
    html += `
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('resultados').innerHTML = html;
}

// Cargar medicamentos
async function cargarMedicamentos() {
    try {
        const response = await fetch('http://localhost:8080/api/v1/medicamentos', {
            headers: {
                'Authorization': `Bearer ${currentToken}`
            }
        });
        
        if (response.ok) {
            const medicamentos = await response.json();
            mostrarMedicamentos(medicamentos);
        } else {
            mostrarMensaje('Error al cargar medicamentos', 'error');
        }
    } catch (error) {
        mostrarMensaje('Error de conexión', 'error');
    }
}

// Mostrar medicamentos
function mostrarMedicamentos(medicamentos) {
    let html = `
        <div class="card">
            <div class="card-body">
                <h5>Inventario de Medicamentos (${medicamentos.length})</h5>
                <div class="table-responsive">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Laboratorio</th>
                                <th>Precio</th>
                                <th>Stock</th>
                                <th>Requiere Receta</th>
                            </tr>
                        </thead>
                        <tbody>
    `;
    
    medicamentos.forEach(med => {
        html += `
            <tr>
                <td>${med.id}</td>
                <td>${med.nombre}</td>
                <td>${med.laboratorio || '-'}</td>
                <td>$${med.precio}</td>
                <td>${med.stock}</td>
                <td>${med.requiereReceta ? 'Sí' : 'No'}</td>
            </tr>
        `;
    });
    
    html += `
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('resultados').innerHTML = html;
}

// Generar reporte de ventas
async function generarReporteVentas() {
    const startDate = '2024-01-01';
    const endDate = '2024-12-31';
    
    try {
        const response = await fetch(`http://localhost:8080/api/v1/reportes/ventas-por-medicamento?start=${startDate}&end=${endDate}`, {
            headers: {
                'Authorization': `Bearer ${currentToken}`
            }
        });
        
        if (response.ok) {
            const reporte = await response.json();
            mostrarReporteVentas(reporte);
        } else {
            mostrarMensaje('Error al generar reporte', 'error');
        }
    } catch (error) {
        mostrarMensaje('Error de conexión', 'error');
    }
}

// Mostrar reporte de ventas
function mostrarReporteVentas(reporte) {
    let html = `
        <div class="card">
            <div class="card-body">
                <h5>Reporte: Ventas por Medicamento</h5>
                <div class="table-responsive">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>Medicamento</th>
                                <th>Total Vendido</th>
                                <th>Ingresos</th>
                            </tr>
                        </thead>
                        <tbody>
    `;
    
    reporte.forEach(item => {
        html += `
            <tr>
                <td>${item[0]}</td>
                <td>${item[1]}</td>
                <td>$${item[2]}</td>
            </tr>
        `;
    });
    
    html += `
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('resultados').innerHTML = html;
}

// Funciones del formulario de cliente
function mostrarFormCliente() {
    document.getElementById('formCliente').style.display = 'block';
    document.getElementById('resultados').innerHTML = '';
}

function ocultarFormCliente() {
    document.getElementById('formCliente').style.display = 'none';
    document.getElementById('clienteForm').reset();
}

// Guardar nuevo cliente
document.getElementById('clienteForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const cliente = {
        nombre: document.getElementById('clienteNombre').value,
        email: document.getElementById('clienteEmail').value,
        telefono: document.getElementById('clienteTelefono').value,
        direccion: document.getElementById('clienteDireccion').value
    };
    
    try {
        const response = await fetch('http://localhost:8080/api/v1/clientes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${currentToken}`
            },
            body: JSON.stringify(cliente)
        });
        
        if (response.ok) {
            mostrarMensaje('Cliente creado exitosamente!', 'success');
            ocultarFormCliente();
            cargarClientes();
        } else {
            mostrarMensaje('Error al crear cliente', 'error');
        }
    } catch (error) {
        mostrarMensaje('Error de conexión', 'error');
    }
});

// Logout
function logout() {
    currentToken = '';
    currentUser = '';
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('loginSection').style.display = 'block';
    document.getElementById('resultados').innerHTML = '';
    document.getElementById('loginForm').reset();
}

// Utilidad para mostrar mensajes
function mostrarMensaje(mensaje, tipo) {
    const alertClass = tipo === 'success' ? 'alert-success' : 'alert-danger';
    const html = `<div class="alert ${alertClass} alert-dismissible fade show" role="alert">
        ${mensaje}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>`;
    
    document.getElementById('resultados').innerHTML = html;
}