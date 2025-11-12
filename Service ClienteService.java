package com.farmacia.service;

import com.farmacia.entity.Cliente;
import com.farmacia.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClienteService {
    @Autowired
    private ClienteRepository clienteRepository;

    public List<Cliente> findAll() {
        return clienteRepository.findAll();
    }
    
    public List<Cliente> findAllActive() {
        return clienteRepository.findByActivoTrue();
    }

    public Optional<Cliente> findById(Long id) {
        return clienteRepository.findById(id);
    }

    public Cliente save(Cliente cliente) {
        return clienteRepository.save(cliente);
    }

    public Cliente update(Long id, Cliente clienteDetails) {
        Optional<Cliente> optionalCliente = clienteRepository.findById(id);
        if (optionalCliente.isPresent()) {
            Cliente cliente = optionalCliente.get();
            cliente.setNombre(clienteDetails.getNombre());
            cliente.setEmail(clienteDetails.getEmail());
            cliente.setTelefono(clienteDetails.getTelefono());
            cliente.setDireccion(clienteDetails.getDireccion());
            return clienteRepository.save(cliente);
        }
        return null;
    }

    public boolean delete(Long id) {
        Optional<Cliente> optionalCliente = clienteRepository.findById(id);
        if (optionalCliente.isPresent()) {
            Cliente cliente = optionalCliente.get();
            cliente.setActivo(false);
            clienteRepository.save(cliente);
            return true;
        }
        return false;
    }
    
    public List<Cliente> searchByNombre(String nombre) {
        return clienteRepository.findByNombreContaining(nombre);
    }
}