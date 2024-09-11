package com.example.animeAllStar_back.api.DTO.Item;

import com.example.animeAllStar_back.model.entity.Item.TipoItem;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.modelmapper.ModelMapper;
@AllArgsConstructor
@NoArgsConstructor
@Data
public class TipoItemDTO {
    private Long id;
    private String nome;
    private Long idSubTipoItem;
    
    public static TipoItemDTO create(TipoItem tipoItem) {
        ModelMapper modelMapper = new ModelMapper();
        TipoItemDTO dto = modelMapper.map(tipoItem, TipoItemDTO.class);

        return dto;
    }
}
