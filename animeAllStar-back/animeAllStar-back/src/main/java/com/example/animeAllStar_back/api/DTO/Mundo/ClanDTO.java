package com.example.animeAllStar_back.api.DTO.Mundo;

import com.example.animeAllStar_back.model.entity.Mundo.Clan;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.modelmapper.ModelMapper;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ClanDTO {

    private Long id;
    private String nome;
    private String descricao;
    private String urlImage;

    public static ClanDTO create(Clan clan) {
        ModelMapper modelMapper = new ModelMapper();
        ClanDTO dto = modelMapper.map(clan, ClanDTO.class);

        return dto;
    }
}
