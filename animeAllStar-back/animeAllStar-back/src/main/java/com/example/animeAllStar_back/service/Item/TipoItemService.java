package com.example.animeAllStar_back.service.Item;

import com.example.animeAllStar_back.exception.RegraNegocioException;
import com.example.animeAllStar_back.model.entity.Item.TipoItem;
import com.example.animeAllStar_back.model.repository.Item.TipoItemRepository;

import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.springframework.transaction.annotation.Transactional;

@Service
public class TipoItemService {
   
    private TipoItemRepository repository;

    public TipoItemService(TipoItemRepository repository) {
        this.repository = repository;
    }

    public List<TipoItem> getTipoItems() {
        return repository.findAll();
    }

    public Optional<TipoItem> getTipoItemById(Long id) {
        return repository.findById(id);
    }

    @Transactional
    public TipoItem salvar(TipoItem tipoItem) {
        validar(tipoItem);
        return repository.save(tipoItem);
    }

    @Transactional
    public void excluir(TipoItem tipoItem) {
        Objects.requireNonNull(tipoItem.getId());
        repository.delete(tipoItem);
    }


    public void validar(TipoItem tipoItem) {
        if (tipoItem.getNome() == null || tipoItem.getNome().trim().equals("")) {
            throw new RegraNegocioException("Tipo de Item Invalido!!! Insira um Tipo de Item valido.");
        }
        if (tipoItem.getSubTipoItem() == null || tipoItem.getSubTipoItem().getId() == null || tipoItem.getSubTipoItem().getId() == 0) {
            throw new RegraNegocioException("SubTipo de Item inválido!!!!");
        }
    }
}
