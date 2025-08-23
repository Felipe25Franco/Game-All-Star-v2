package com.example.animeAllStar_back.model.entity;

import javax.persistence.*;


import com.example.animeAllStar_back.model.entity.Mundo.Mundo;
import lombok.AllArgsConstructor;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity

public class Player {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nickname;
    private String sexo;

    @OneToOne
    @JoinColumn(name = "usuario_id", nullable = false, unique = true)
    private Usuario usuario;

    private List<Mundo> mundos;

}