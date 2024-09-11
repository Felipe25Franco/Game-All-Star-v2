package com.example.animeAllStar_back.api.DTO.Criatura;

import com.example.animeAllStar_back.model.entity.Criatura.TipoCriatura;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.modelmapper.ModelMapper;
@AllArgsConstructor
@NoArgsConstructor
@Data
public class TipoCriaturaDTO {
    private Long id;
    private String nome;
    private String descricao;

    public static TipoCriaturaDTO create(TipoCriatura tipoCriatura) {
        ModelMapper modelMapper = new ModelMapper();
        TipoCriaturaDTO dto = modelMapper.map(tipoCriatura, TipoCriaturaDTO.class);

        return dto;
    }
}
