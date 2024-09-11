package com.example.animeAllStar_back.model.repository.Item;

import com.example.animeAllStar_back.model.entity.Item.Item;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<Item, Long> {
}
