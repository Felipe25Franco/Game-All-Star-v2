package com.example.animeAllStar_back.model.entity;

import javax.persistence.*;

import com.example.animeAllStar_back.model.entity.Mundo.Mundo;
import lombok.AllArgsConstructor;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public class Player extends Usuario {

    private String nickname;
    private String sexo;

    @ManyToOne
    @JoinColumn(name = "mundo_id")
    private Mundo mundo;
}