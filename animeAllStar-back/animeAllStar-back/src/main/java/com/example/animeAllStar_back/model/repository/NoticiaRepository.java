package com.example.animeAllStar_back.model.repository;

import com.example.animeAllStar_back.model.entity.Noticia;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoticiaRepository extends JpaRepository<Noticia, Long> {
}