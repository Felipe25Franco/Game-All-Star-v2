package com.example.animeAllStar_back.api.DTO.Habilidade;
import com.example.animeAllStar_back.model.entity.Habilidade.TipoHabilidade;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.modelmapper.ModelMapper;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class TipoHabilidadeDTO {
    private Long id;
    private String nome;
    private String descricao;

    public static TipoHabilidadeDTO create(TipoHabilidade tipoHabilidade) {
        ModelMapper modelMapper = new ModelMapper();
        TipoHabilidadeDTO dto = modelMapper.map(tipoHabilidade, TipoHabilidadeDTO.class);
        return dto;
    }
}
