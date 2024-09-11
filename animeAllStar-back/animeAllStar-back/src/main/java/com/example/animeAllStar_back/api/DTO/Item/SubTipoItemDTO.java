package com.example.animeAllStar_back.api.DTO.Item;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.modelmapper.ModelMapper;

import com.example.animeAllStar_back.model.entity.Item.SubTipoItem;
@AllArgsConstructor
@NoArgsConstructor
@Data
public class SubTipoItemDTO {
    private Long id;
    private String nome;
    private String descricao;

    public static SubTipoItemDTO create(SubTipoItem subTipoItem) {
        ModelMapper modelMapper = new ModelMapper();
        SubTipoItemDTO dto = modelMapper.map(subTipoItem, SubTipoItemDTO.class);

        return dto;
    }
}
