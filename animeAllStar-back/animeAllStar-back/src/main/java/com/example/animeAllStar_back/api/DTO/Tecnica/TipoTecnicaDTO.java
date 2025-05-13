package com.example.animeAllStar_back.api.DTO.Tecnica;

import com.example.animeAllStar_back.model.entity.Tecnicas.TipoTecnica;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.modelmapper.ModelMapper;
@AllArgsConstructor
@NoArgsConstructor
@Data
public class TipoTecnicaDTO {
    private Long id;
    private String nome;
    private String descricao;

    public static TipoTecnicaDTO create(TipoTecnica tipoTecnica) {
        ModelMapper modelMapper = new ModelMapper();
        TipoTecnicaDTO dto = modelMapper.map(tipoTecnica,TipoTecnicaDTO.class);
        return dto;
    }
}
