package com.example.animeAllStar_back.service.Mundo;

import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.springframework.transaction.annotation.Transactional;


import com.example.animeAllStar_back.model.entity.Mundo.Classe;
import com.example.animeAllStar_back.model.repository.Mundo.ClasseRepository;

@Service
public class ClasseService {
    
    private ClasseRepository repository;

    public ClasseService (ClasseRepository repository) {
        this.repository = repository;
    }

    public List<Classe> getClasses() {return repository.findAll();}
    public Optional<Classe> getClasseById(Long id) {return repository.findById(id);}

    @Transactional
    public Classe salvar(Classe classe) {
        validar(classe);
        return repository.save(classe);
    }

    @Transactional
    public void excluir(Classe classe) {
        Objects.requireNonNull(classe.getId());
        repository.delete(classe);
    }

    public void validar(Classe classe) {
        
    }
}
