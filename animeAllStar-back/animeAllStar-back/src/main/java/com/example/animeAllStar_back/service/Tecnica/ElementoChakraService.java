package com.example.animeAllStar_back.service.Tecnica;


import com.example.animeAllStar_back.model.entity.Tecnicas.ElementoChakra;

import com.example.animeAllStar_back.model.repository.Tecnica.ElementoChakraRepository;

import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ElementoChakraService {

    private ElementoChakraRepository repository;

    public ElementoChakraService(ElementoChakraRepository repository) {
        this.repository = repository;
    }

    public List<ElementoChakra> getElementoChakras() {
        return repository.findAll();
    }

    public Optional<ElementoChakra> getElementoChakraById(Long id) {
        return repository.findById(id);
    }

    @Transactional
    public ElementoChakra salvar(ElementoChakra elementoChakra) {
        validar(elementoChakra);
        return repository.save(elementoChakra);
    }

    @Transactional
    public void excluir(ElementoChakra elementoChakra) {
        Objects.requireNonNull(elementoChakra.getId());
        repository.delete(elementoChakra);
    }


    public void validar(ElementoChakra elementoChakra) {

    }
}
