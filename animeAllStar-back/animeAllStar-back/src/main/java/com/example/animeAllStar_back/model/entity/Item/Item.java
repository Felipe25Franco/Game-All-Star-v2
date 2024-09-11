package com.example.animeAllStar_back.model.entity.Item;


import com.example.animeAllStar_back.model.entity.Mundo.Mundo;
import javax.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    
    @ManyToOne
    private TipoItem tipoItem;
    @ManyToOne
    private Mundo mundo;
}
