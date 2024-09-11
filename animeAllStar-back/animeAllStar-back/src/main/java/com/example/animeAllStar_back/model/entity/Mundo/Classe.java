package com.example.animeAllStar_back.model.entity.Mundo;

import javax.persistence.ManyToOne;

public class Classe {
    private String nome;
    private String descricao;

    @ManyToOne
    private Mundo mundo;
}
