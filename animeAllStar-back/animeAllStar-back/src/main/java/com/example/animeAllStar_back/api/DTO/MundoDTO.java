package com.example.animeAllStar_back.api.DTO;

import com.example.animeAllStar_back.model.entity.Mundo.Mundo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.modelmapper.ModelMapper;
@AllArgsConstructor
@NoArgsConstructor
@Data
public class MundoDTO {
    private Long id;
    private String nome;
    private String descricao;
    private String urlImage;

    public static MundoDTO create(Mundo mundo) {
        ModelMapper modelMapper = new ModelMapper();
        MundoDTO dto = modelMapper.map(mundo, MundoDTO.class);

        return dto;
    }
}
