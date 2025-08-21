package com.example.animeAllStar_back.service.Tecnica;


import com.example.animeAllStar_back.model.entity.Tecnicas.ElementoChakra;

import com.example.animeAllStar_back.model.repository.Tecnica.ElementoChakraRepository;

import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

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

    @Transactional
    public List<ElementoChakra> sortearElementosBasicos() {
        List<ElementoChakra> elementos = repository.findAll();

        // apenas os 5 principais
        List<ElementoChakra> basicos = elementos.stream()
                .filter(e -> e.getNome().equalsIgnoreCase("Fogo") ||
                        e.getNome().equalsIgnoreCase("Água") ||
                        e.getNome().equalsIgnoreCase("Terra") ||
                        e.getNome().equalsIgnoreCase("Vento") ||
                        e.getNome().equalsIgnoreCase("Raio"))
                .collect(Collectors.toCollection(ArrayList::new)); // <- lista mutável

        if (basicos.size() < 5) {
            throw new RuntimeException("Não há todos os 5 elementos básicos cadastrados.");
        }

        Random random = new Random();
        int chance = random.nextInt(100); // número de 0 a 99
        int quantidade;

        if (chance < 80) {        // 0-79 → 80%
            quantidade = 2;
        } else if (chance < 90) { // 80-89 → 10%
            quantidade = 3;
        } else if (chance < 97) { // 90-96 → 7%
            quantidade = 4;
        } else {                   // 97-99 → 3%
            quantidade = 5;
        }

        Collections.shuffle(basicos); // agora funciona
        return basicos.subList(0, quantidade);
    }
}
