package com.example.animeAllStar_back.api.controller.Tecnica;



import com.example.animeAllStar_back.api.DTO.Tecnica.TipoTecnicaDTO;
import com.example.animeAllStar_back.exception.RegraNegocioException;
import com.example.animeAllStar_back.model.entity.Tecnicas.TipoTecnica;
import com.example.animeAllStar_back.service.Tecnica.TipoTecnicaService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import io.swagger.annotations.*;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/tipoTecnicas")
@Api("API de Tipo de Tecnica")
@CrossOrigin
public class TipoTecnicaController {
    private final TipoTecnicaService service;

    @GetMapping
    @ApiOperation("Obter a lista de Tipo de Tecnicas")
    @ApiResponses({
            @ApiResponse(code  = 200, message  = "Lista de Tipo de Tecnicas retornada com sucesso"),
            @ApiResponse(code  = 404, message  = "Tipo de Tecnica não encontrada"),
            @ApiResponse(code  = 500, message  = "Erro interno no servidor")
    })
    public ResponseEntity get() {
        List<TipoTecnica> tipoTecnicas = service.getTipoTecnicas();
        return ResponseEntity.ok(tipoTecnicas.stream().map(TipoTecnicaDTO::create).collect(Collectors.toList()));
    }

    @GetMapping("/{id}")
    @ApiOperation("Obter detalhes de Tipo de Tecnica")
    @ApiResponses({
            @ApiResponse(code  = 200, message  = "Tipo de Tecnica encontrada"),
            @ApiResponse(code  = 404, message  = "Tipo de Tecnica não encontrada"),
            @ApiResponse(code  = 500, message  = "Erro interno no servidor")
    })
    public ResponseEntity get(@PathVariable("id") @ApiParam("Id de Tipo de Tecnica")  Long id) {
        Optional<TipoTecnica> tipoTecnica = service.getTipoTecnicaById(id);
        if (!tipoTecnica.isPresent()) {
            return new ResponseEntity("Tipo de Tecnica não encontrada", HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(tipoTecnica.map(TipoTecnicaDTO::create));
    }

    @PostMapping
    @ApiOperation("Salva um Tipo de Tecnica")
    @ApiResponses({
            @ApiResponse(code  = 201, message  = "Tipo de Tecnica salvo com sucesso"),
            @ApiResponse(code  = 404, message  = "Erro ao salvar o Tipo de Tecnica"),
            @ApiResponse(code  = 500, message  = "Erro interno no servidor")
    })
    public ResponseEntity post(@RequestBody TipoTecnicaDTO dto) {
        try {
            TipoTecnica tipoTecnica = converter(dto);
            tipoTecnica = service.salvar(tipoTecnica);
            return new ResponseEntity(tipoTecnica, HttpStatus.CREATED);
        } catch (RegraNegocioException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("{id}")
    @ApiOperation("Atualiza um Tipo de Tecnica")
    @ApiResponses({
            @ApiResponse(code  = 200, message  = "Tipo de Tecnica alterada com sucesso"),
            @ApiResponse(code  = 404, message  = "Tipo de Tecnica não encontrado"),
            @ApiResponse(code  = 500, message  = "Erro interno no servidor")
    })
    public ResponseEntity atualizar(@PathVariable("id") Long id, @RequestBody TipoTecnicaDTO dto) {
        if (!service.getTipoTecnicaById(id).isPresent()) {
            return new ResponseEntity("Tipo de Tecnica não encontrado", HttpStatus.NOT_FOUND);
        }
        try {
            TipoTecnica tipoTecnica = converter(dto);
            tipoTecnica.setId(id);
            service.salvar(tipoTecnica);
            return ResponseEntity.ok(tipoTecnica);
        } catch (RegraNegocioException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    @ApiOperation("Exclui um Tipo de Tecnica")
    @ApiResponses({
            @ApiResponse(code  = 200, message  = "Tipo de Tecnica excluída com sucesso"),
            @ApiResponse(code  = 404, message  = "Tipo de Tecnica não encontrado"),
            @ApiResponse(code  = 500, message  = "Erro interno no servidor")
    })
    public ResponseEntity excluir(@PathVariable("id")  Long id) {
        Optional<TipoTecnica> tipoTecnica = service.getTipoTecnicaById(id);
        if (!tipoTecnica.isPresent()) {
            return new ResponseEntity("Tipo de Tecnica não encontrado", HttpStatus.NOT_FOUND);
        }
        try {
            service.excluir(tipoTecnica.get());
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        } catch (RegraNegocioException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    public TipoTecnica converter(TipoTecnicaDTO dto) {
        ModelMapper modelMapper = new ModelMapper();
        return modelMapper.map(dto, TipoTecnica.class);

    }
}
