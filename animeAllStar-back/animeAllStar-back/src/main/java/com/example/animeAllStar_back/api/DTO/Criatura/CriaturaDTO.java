package com.example.animeAllStar_back.api.DTO.Criatura;

import com.example.animeAllStar_back.model.entity.Criatura.Criatura;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.modelmapper.ModelMapper;
@AllArgsConstructor
@NoArgsConstructor
@Data
public class CriaturaDTO {
    private Long id;
    private String nome;
    private String descricao;
    private Boolean invocacao;
    private Long idMundo;
    private Long idTipoCriatura;

    public static CriaturaDTO create(Criatura criatura) {
        ModelMapper modelMapper = new ModelMapper();
        CriaturaDTO dto = modelMapper.map(criatura, CriaturaDTO.class);

        return dto;
    }
}
