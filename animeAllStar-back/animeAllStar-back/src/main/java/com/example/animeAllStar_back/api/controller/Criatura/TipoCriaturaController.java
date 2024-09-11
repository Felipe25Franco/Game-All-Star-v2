package com.example.animeAllStar_back.api.controller.Criatura;

import com.example.animeAllStar_back.api.DTO.Criatura.TipoCriaturaDTO;

import com.example.animeAllStar_back.model.entity.Criatura.TipoCriatura;

import com.example.animeAllStar_back.service.Criatura.TipoCriaturaService;

import com.example.animeAllStar_back.exception.RegraNegocioException;
import java.util.Optional;
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
@RequestMapping("/api/v1/tipoCriaturas")
@Api("API de Tipo de Criatura")
@CrossOrigin

public class TipoCriaturaController {

    private final TipoCriaturaService service;

    @GetMapping
    @ApiOperation("Obter a lista de Tipo de Criatura")
    @ApiResponses({
            @ApiResponse(code  = 200, message  = "Lista de Tipo de Criatura retornada com sucesso"),
            @ApiResponse(code  = 404, message  = "Tipo de Criatura não encontrado"),
            @ApiResponse(code  = 500, message  = "Erro interno no servidor")
    })
    public ResponseEntity get() {
        List<TipoCriatura> tipoCriaturas = service.getTipoCriaturas();
        return ResponseEntity.ok(tipoCriaturas.stream().map(TipoCriaturaDTO::create).collect(Collectors.toList()));
    }

    @GetMapping("/{id}")
    @ApiOperation("Obter detalhes de um Tipo de Criatura")
    @ApiResponses({
            @ApiResponse(code  = 200, message  = "Tipo de Criatura encontrado"),
            @ApiResponse(code  = 404, message  = "Tipo de Criatura não encontrado"),
            @ApiResponse(code  = 500, message  = "Erro interno no servidor")
    })
    public ResponseEntity get(@PathVariable("id") @ApiParam("Id de Tipo de Criatura")  Long id) {
        Optional<TipoCriatura> tipoCriatura = service.getTipoCriaturaById(id);
        if (!tipoCriatura.isPresent()) {
            return new ResponseEntity("Tipo de Criatura não encontrado", HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(tipoCriatura.map(TipoCriaturaDTO::create));
    }

    @PostMapping
    @ApiOperation("Salva um Tipo de Criatura")
    @ApiResponses({
            @ApiResponse(code  = 201, message  = "Tipo de Criatura salvo com sucesso"),
            @ApiResponse(code  = 404, message  = "Erro ao salvar o Tipo de Criatura"),
            @ApiResponse(code  = 500, message  = "Erro interno no servidor")
    })
    public ResponseEntity post(@RequestBody TipoCriaturaDTO dto) {
        try {
            TipoCriatura tipoCriatura = converter(dto);
            tipoCriatura = service.salvar(tipoCriatura);
            return new ResponseEntity(tipoCriatura, HttpStatus.CREATED);
        } catch (RegraNegocioException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("{id}")
    @ApiOperation("Atualiza um Tipo de Criatura")
    @ApiResponses({
            @ApiResponse(code  = 200, message  = "Tipo de Criatura alterado com sucesso"),
            @ApiResponse(code  = 404, message  = "Tipo de Criatura não encontrado"),
            @ApiResponse(code  = 500, message  = "Erro interno no servidor")
    })
    public ResponseEntity atualizar(@PathVariable("id") Long id, @RequestBody TipoCriaturaDTO dto) {
        if (!service.getTipoCriaturaById(id).isPresent()) {
            return new ResponseEntity("Tipo de Criatura não encontrado", HttpStatus.NOT_FOUND);
        }
        try {
            TipoCriatura tipoCriatura = converter(dto);
            tipoCriatura.setId(id);
            service.salvar(tipoCriatura);
            return ResponseEntity.ok(tipoCriatura);
        } catch (RegraNegocioException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    @ApiOperation("Exclui um Tipo de Criatura")
    @ApiResponses({
            @ApiResponse(code  = 200, message  = "Tipo de Criatura excluído com sucesso"),
            @ApiResponse(code  = 404, message  = "Tipo de Criatura não encontrado"),
            @ApiResponse(code  = 500, message  = "Erro interno no servidor")
    })
    public ResponseEntity excluir(@PathVariable("id")  Long id) {
        Optional<TipoCriatura> tipoCriatura = service.getTipoCriaturaById(id);
        if (!tipoCriatura.isPresent()) {
            return new ResponseEntity("Tipo de Criatura não encontrado", HttpStatus.NOT_FOUND);
        }
        try {
            service.excluir(tipoCriatura.get());
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        } catch (RegraNegocioException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    public TipoCriatura converter(TipoCriaturaDTO dto) {
        ModelMapper modelMapper = new ModelMapper();
        return modelMapper.map(dto, TipoCriatura.class);

    }

}
