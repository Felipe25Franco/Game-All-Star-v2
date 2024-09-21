package com.example.animeAllStar_back.api.DTO.Mundo;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.modelmapper.ModelMapper;


import com.example.animeAllStar_back.model.entity.Mundo.Classe;
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ClasseDTO {
    private Long id;
    private String nome;
    private String descricao;
    private Long idMundo;

    public static ClasseDTO create(Classe classe) {
        ModelMapper modelMapper = new ModelMapper();
        ClasseDTO dto = modelMapper.map(classe, ClasseDTO.class);

        return dto;
    }
}
