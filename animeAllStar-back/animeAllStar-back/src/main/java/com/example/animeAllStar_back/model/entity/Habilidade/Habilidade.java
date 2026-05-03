package com.example.animeAllStar_back.model.entity.Habilidade;

import javax.persistence.*;

import com.example.animeAllStar_back.model.entity.Mundo.Mundo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Habilidade {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    @ManyToOne
    private Mundo Mundos;
}
