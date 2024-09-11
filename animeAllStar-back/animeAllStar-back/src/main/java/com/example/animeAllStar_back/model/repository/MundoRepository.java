package com.example.animeAllStar_back.model.repository;

import com.example.animeAllStar_back.model.entity.Mundo.Mundo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MundoRepository extends JpaRepository<Mundo, Long> {
}
