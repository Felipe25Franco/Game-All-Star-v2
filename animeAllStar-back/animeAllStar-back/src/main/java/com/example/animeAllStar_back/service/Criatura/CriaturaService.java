package com.example.animeAllStar_back.service.Criatura;

import com.example.animeAllStar_back.exception.RegraNegocioException;
import com.example.animeAllStar_back.model.entity.Criatura.Criatura;
import com.example.animeAllStar_back.model.entity.Item.Item;
import com.example.animeAllStar_back.model.repository.Criatura.CriaturaRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CriaturaService {

    private CriaturaRepository repository;

    public CriaturaService (CriaturaRepository repository) {
        this.repository = repository;
    }

    public List<Criatura> getCriaturas() {return repository.findAll();}
    public Optional<Criatura> getCriaturaById(Long id) {return repository.findById(id);}

    @Transactional
    public Criatura salvar(Criatura criatura) {
        validar(criatura);
        return repository.save(criatura);
    }

    @Transactional
    public void excluir(Criatura criatura) {
        Objects.requireNonNull(criatura.getId());
        repository.delete(criatura);
    }

    public void validar(Criatura criatura) {
        
    }
}
