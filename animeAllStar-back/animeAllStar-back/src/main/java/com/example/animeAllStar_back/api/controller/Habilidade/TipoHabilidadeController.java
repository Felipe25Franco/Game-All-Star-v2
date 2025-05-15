package com.example.animeAllStar_back.api.controller.Habilidade;


import com.example.animeAllStar_back.api.DTO.Habilidade.TipoHabilidadeDTO;
import com.example.animeAllStar_back.api.DTO.Mundo.ClasseDTO;
import com.example.animeAllStar_back.api.DTO.Tecnica.TipoTecnicaDTO;
import com.example.animeAllStar_back.exception.RegraNegocioException;
import java.util.Optional;

import com.example.animeAllStar_back.model.entity.Habilidade.TipoHabilidade;
import com.example.animeAllStar_back.model.entity.Mundo.Classe;
import com.example.animeAllStar_back.model.entity.Tecnicas.TipoTecnica;
import com.example.animeAllStar_back.service.Habilidade.TipoHabilidadeService;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/tipoHabilidades")
@Api("API de Tipo de Habilidade")
@CrossOrigin
public class TipoHabilidadeController {

    private final TipoHabilidadeService service;

    @GetMapping
    @ApiOperation("Obter a lista de Tipo de Habilidade")
    @ApiResponses({
            @ApiResponse(code  = 200, message  = "Lista de Tipo de Habilidade retornada com sucesso"),
            @ApiResponse(code  = 404, message  = "Tipo de Habilidade não encontrada"),
            @ApiResponse(code  = 500, message  = "Erro interno no servidor")
    })
    public ResponseEntity get() {
        List<TipoHabilidade> tipoHabilidades = service.getTipoHabilidades();
        return ResponseEntity.ok(tipoHabilidades.stream().map(TipoHabilidadeDTO::create).collect(Collectors.toList()));
    }

    @GetMapping("/{id}")
    @ApiOperation("Obter detalhes de Tipo de Habilidade")
    @ApiResponses({
            @ApiResponse(code  = 200, message  = "Tipo de Habilidade encontrada"),
            @ApiResponse(code  = 404, message  = "Tipo de Habilidade não encontrada"),
            @ApiResponse(code  = 500, message  = "Erro interno no servidor")
    })
    public ResponseEntity get(@PathVariable("id") @ApiParam("Id de Tipo de Habilidade")  Long id) {
        Optional<TipoHabilidade> tipoHabilidades = service.getTipoHabilidadeById(id);
        if (!tipoHabilidades.isPresent()) {
            return new ResponseEntity("Tipo de Habilidade não encontrada", HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(tipoHabilidades.map(TipoHabilidadeDTO::create));
    }

    @PostMapping
    @ApiOperation("Salva um Tipo de Habilidade")
    @ApiResponses({
            @ApiResponse(code  = 201, message  = "Tipo de Habilidade salva com sucesso"),
            @ApiResponse(code  = 404, message  = "Erro ao salvar Tipo de Habilidade"),
            @ApiResponse(code  = 500, message  = "Erro interno no servidor")
    })
    public ResponseEntity post(@RequestBody TipoHabilidadeDTO dto) {
        try {
            TipoHabilidade tipoHabilidade = converter(dto);
            tipoHabilidade = service.salvar(tipoHabilidade);
            return new ResponseEntity(tipoHabilidade, HttpStatus.CREATED);
        } catch (RegraNegocioException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("{id}")
    @ApiOperation("Atualiza um Tipo de Habilidade")
    @ApiResponses({
            @ApiResponse(code  = 200, message  = "Tipo de Habilidade alterada com sucesso"),
            @ApiResponse(code  = 404, message  = "Tipo de Habilidade não encontrada"),
            @ApiResponse(code  = 500, message  = "Erro interno no servidor")
    })
    public ResponseEntity atualizar(@PathVariable("id") Long id, @RequestBody TipoHabilidadeDTO dto) {
        if (!service.getTipoHabilidadeById(id).isPresent()) {
            return new ResponseEntity("Tipo de Habilidade não encontrada", HttpStatus.NOT_FOUND);
        }
        try {
            TipoHabilidade tipoHabilidade = converter(dto);
            tipoHabilidade.setId(id);
            service.salvar(tipoHabilidade);
            return ResponseEntity.ok(tipoHabilidade);
        } catch (RegraNegocioException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    @ApiOperation("Exclui um Tipo de Habilidade")
    @ApiResponses({
            @ApiResponse(code  = 200, message  = "Tipo de Habilidade excluída com sucesso"),
            @ApiResponse(code  = 404, message  = "Tipo de Habilidade não encontrada"),
            @ApiResponse(code  = 500, message  = "Erro interno no servidor")
    })
    public ResponseEntity excluir(@PathVariable("id")  Long id) {
        Optional<TipoHabilidade> tipoHabilidade = service.getTipoHabilidadeById(id);
        if (!tipoHabilidade.isPresent()) {
            return new ResponseEntity("Tipo de Habilidade não encontrada", HttpStatus.NOT_FOUND);
        }
        try {
            service.excluir(tipoHabilidade.get());
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        } catch (RegraNegocioException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    public TipoHabilidade converter(TipoHabilidadeDTO dto) {
        ModelMapper modelMapper = new ModelMapper();
        return modelMapper.map(dto, TipoHabilidade.class);

    }
}
