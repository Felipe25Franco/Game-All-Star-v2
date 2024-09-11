package com.example.animeAllStar_back.service.Item;

import com.example.animeAllStar_back.exception.RegraNegocioException;
import com.example.animeAllStar_back.model.entity.Item.Item;
import com.example.animeAllStar_back.model.entity.Item.TipoItem;
import com.example.animeAllStar_back.model.repository.Item.ItemRepository;
import com.example.animeAllStar_back.model.repository.Item.TipoItemRepository;


import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ItemService {
    
    private ItemRepository repository;

    public ItemService(ItemRepository repository) {
        this.repository = repository;
    }

    public List<Item> getItens() {
        return repository.findAll();
    }

    public Optional<Item> getItemById(Long id) {
        return repository.findById(id);
    }

    @Transactional
    public Item salvar(Item item) {
        validar(item);
        return repository.save(item);
    }

    @Transactional
    public void excluir(Item item) {
        Objects.requireNonNull(item.getId());
        repository.delete(item);
    }


    public void validar(Item item) {

    }
}
