package com.example.animeAllStar_back.service;

import com.example.animeAllStar_back.exception.RegraNegocioException;
import com.example.animeAllStar_back.model.entity.Mundo.Mundo;
import com.example.animeAllStar_back.model.repository.MundoRepository;

import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.springframework.transaction.annotation.Transactional;



@Service
public class MundoService {
  
    private MundoRepository repository;

    public MundoService(MundoRepository repository) {
        this.repository = repository;
    }

    public List<Mundo> getMundos() {
        return repository.findAll();
    }

    public Optional<Mundo> getMundoById(Long id) {
        return repository.findById(id);
    }

    @Transactional
    public Mundo salvar(Mundo mundo) {
        validar(mundo);
        return repository.save(mundo);
    }

    @Transactional
    public void excluir(Mundo mundo) {
        Objects.requireNonNull(mundo.getId());
        repository.delete(mundo);
    }


    public void validar(Mundo mundo) {

    }
}
