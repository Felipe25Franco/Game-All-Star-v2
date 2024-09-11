package com.example.animeAllStar_back.model.entity;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
public class Noticia {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String titulo;
    private String conteudo;
    private LocalDate data;
    private String imagemUrl;


}