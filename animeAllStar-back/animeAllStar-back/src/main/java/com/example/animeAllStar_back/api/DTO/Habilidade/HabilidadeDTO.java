package com.example.animeAllStar_back.api.DTO.Habilidade;

import com.example.animeAllStar_back.model.entity.Habilidade.Habilidade;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.modelmapper.ModelMapper;
@AllArgsConstructor
@NoArgsConstructor
@Data
public class HabilidadeDTO {
    private Long id;
    private String nome;
    public static HabilidadeDTO create(Habilidade habilidade) {
        ModelMapper modelMapper = new ModelMapper();
        HabilidadeDTO dto = modelMapper.map(habilidade, HabilidadeDTO.class);

        return dto;
    }

}
