package com.example.animeAllStar_back.api.controller;



import com.example.animeAllStar_back.model.entity.Noticia;
import com.example.animeAllStar_back.service.NoticiaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/noticias")
public class NoticiaController {
    @Autowired
    private NoticiaService noticiaService;

    @GetMapping
    public List<Noticia> getAllNoticias() {
        return noticiaService.getAllNoticias();
    }

    @GetMapping("/{id}")
    public Noticia getNoticiaById(@PathVariable Long id) {
        return noticiaService.getNoticiaById(id);
    }

    @PostMapping
    public Noticia createNoticia(@RequestBody Noticia noticia) {
        return noticiaService.saveNoticia(noticia);
    }

    @DeleteMapping("/{id}")
    public void deleteNoticia(@PathVariable Long id) {
        noticiaService.deleteNoticia(id);
    }
}
