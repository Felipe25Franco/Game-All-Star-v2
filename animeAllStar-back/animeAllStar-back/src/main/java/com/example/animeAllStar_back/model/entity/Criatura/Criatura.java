package com.example.animeAllStar_back.model.entity.Criatura;

import javax.persistence.*;

import com.example.animeAllStar_back.model.entity.Mundo.Mundo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Criatura {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String descricao;
    private Boolean invocacao;

    @ManyToOne
    private Mundo mundo;
    @ManyToOne
    private TipoCriatura tipoCriatura;
}
