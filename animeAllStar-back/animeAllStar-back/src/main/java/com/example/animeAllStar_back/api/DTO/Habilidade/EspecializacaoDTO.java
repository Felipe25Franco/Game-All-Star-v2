package com.example.animeAllStar_back.api.DTO.Habilidade;

import com.example.animeAllStar_back.model.entity.Habilidade.Especializacao;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.modelmapper.ModelMapper;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class EspecializacaoDTO {
    private Long id;
    private String nome;
    private String descricao;
    private Long idMundo;

    public static EspecializacaoDTO create(Especializacao especializacao) {
        ModelMapper modelMapper = new ModelMapper();
        EspecializacaoDTO dto = modelMapper.map(especializacao, EspecializacaoDTO.class);
        return dto;
    }
}
