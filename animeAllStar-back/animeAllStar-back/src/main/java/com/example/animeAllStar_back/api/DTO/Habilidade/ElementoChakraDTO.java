package com.example.animeAllStar_back.api.DTO.Habilidade;

import com.example.animeAllStar_back.model.entity.Habilidade.ElementoChakra;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.modelmapper.ModelMapper;
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ElementoChakraDTO {
    private Long id;
    private String nome;
    private String descricao;
    private String urlImage;

    public static ElementoChakraDTO create(ElementoChakra elementoChakra) {
        ModelMapper modelMapper = new ModelMapper();
        ElementoChakraDTO dto = modelMapper.map(elementoChakra, ElementoChakraDTO.class);
        return dto;
    }
}
