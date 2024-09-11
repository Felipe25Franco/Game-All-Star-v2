package com.example.animeAllStar_back.service;


import com.example.animeAllStar_back.model.entity.Noticia;
import com.example.animeAllStar_back.model.repository.NoticiaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class NoticiaService {
    @Autowired
    private NoticiaRepository noticiaRepository;

    public List<Noticia> getAllNoticias() {
        return noticiaRepository.findAll();
    }

    public Noticia getNoticiaById(Long id) {
        return noticiaRepository.findById(id).orElse(null);
    }

    public Noticia saveNoticia(Noticia noticia) {
        return noticiaRepository.save(noticia);
    }

    public void deleteNoticia(Long id) {
        noticiaRepository.deleteById(id);
    }
}