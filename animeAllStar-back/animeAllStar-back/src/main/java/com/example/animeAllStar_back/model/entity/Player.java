package com.example.animeAllStar_back.model.entity;

import javax.persistence.*;


import lombok.AllArgsConstructor;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

@Entity

public class Player extends Usuario {

    private String nickname;
    private String sexo;


}