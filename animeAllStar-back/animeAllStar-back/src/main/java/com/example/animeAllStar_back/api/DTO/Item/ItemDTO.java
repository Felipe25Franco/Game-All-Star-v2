package com.example.animeAllStar_back.api.DTO.Item;


import com.example.animeAllStar_back.model.entity.Item.Item;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.modelmapper.ModelMapper;
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ItemDTO {
    private Long id;
    private String nome;
    private Long idTipoItem;
    private Long idMundo;

    public static ItemDTO create(Item item) {
        ModelMapper modelMapper = new ModelMapper();
        ItemDTO dto = modelMapper.map(item, ItemDTO.class);

        return dto;
    }
}
