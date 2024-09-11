package com.example.animeAllStar_back.service.Item;


import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.springframework.transaction.annotation.Transactional;

import com.example.animeAllStar_back.exception.RegraNegocioException;
import com.example.animeAllStar_back.model.entity.Item.SubTipoItem;
import com.example.animeAllStar_back.model.repository.Item.SubTipoItemRepository;

@Service
public class SubTipoItemService {
    
    private SubTipoItemRepository repository;

    public SubTipoItemService(SubTipoItemRepository repository) {
        this.repository = repository;
    }

    public List<SubTipoItem> getSubTipoItens() {
        return repository.findAll();
    }

    public Optional<SubTipoItem> getSubTipoItemById(Long id) {
        return repository.findById(id);
    }

    @Transactional
    public SubTipoItem salvar(SubTipoItem subTipoItem) {
        validar(subTipoItem);
        return repository.save(subTipoItem);
    }

    @Transactional
    public void excluir(SubTipoItem subTipoItem) {
        Objects.requireNonNull(subTipoItem.getId());
        repository.delete(subTipoItem);
    }


    public void validar(SubTipoItem subTipoItem) {
        if (subTipoItem.getNome() == null || subTipoItem.getNome().trim().equals("")) {
            throw new RegraNegocioException("Item Invalido!!! Insira um Item valido.");
        }
        if (subTipoItem.getDescricao() == null || subTipoItem.getDescricao().trim().equals("")) {
            throw new RegraNegocioException("Descrição Invalida!, Insira uma descrição valida");
        }
    }
}
