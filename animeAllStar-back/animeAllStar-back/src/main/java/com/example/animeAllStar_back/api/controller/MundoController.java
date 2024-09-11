package com.example.animeAllStar_back.api.controller;


import com.example.animeAllStar_back.api.DTO.MundoDTO;
import com.example.animeAllStar_back.exception.RegraNegocioException;
import com.example.animeAllStar_back.model.entity.Mundo.Mundo;
import com.example.animeAllStar_back.service.MundoService;

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
@RequestMapping("/api/v1/mundos")
@Api("API de Mundos")
@CrossOrigin

public class MundoController {

    private final MundoService service;

    @GetMapping
    @ApiOperation("Obter a lista de Mundos")
    @ApiResponses({
            @ApiResponse(code  = 200, message  = "Lista de Mundos retornada com sucesso"),
            @ApiResponse(code  = 404, message  = "Mundo não encontrado"),
            @ApiResponse(code  = 500, message  = "Erro interno no servidor")
    })
    public ResponseEntity get() {
    List<Mundo> mundos = service.getMundos();
        return ResponseEntity.ok(mundos.stream().map(MundoDTO::create).collect(Collectors.toList()));
    }

    @GetMapping("/{id}")
    @ApiOperation("Obter detalhes de um Mundo")
    @ApiResponses({
            @ApiResponse(code  = 200, message  = "Mundo encontrado"),
            @ApiResponse(code  = 404, message  = "Mundo não encontrado"),
            @ApiResponse(code  = 500, message  = "Erro interno no servidor")
    })
    public ResponseEntity get(@PathVariable("id") @ApiParam("Id de Mundo")  Long id) {
        Optional<Mundo> mundo = service.getMundoById(id);
        if (!mundo.isPresent()) {
            return new ResponseEntity("Mundo não encontrado", HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(mundo.map(MundoDTO::create));
    }

    @PostMapping
    @ApiOperation("Salva um Mundo")
    @ApiResponses({
            @ApiResponse(code  = 201, message  = "Mundo salvo com sucesso"),
            @ApiResponse(code  = 404, message  = "Erro ao salvar o Mundo"),
            @ApiResponse(code  = 500, message  = "Erro interno no servidor")
    })
    public ResponseEntity post(@RequestBody MundoDTO dto) {
        try {
            Mundo mundo = converter(dto);
            mundo = service.salvar(mundo);
            return new ResponseEntity(mundo, HttpStatus.CREATED);
        } catch (RegraNegocioException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("{id}")
    @ApiOperation("Atualiza um Mundo")
    @ApiResponses({
            @ApiResponse(code  = 200, message  = "Mundo alterado com sucesso"),
            @ApiResponse(code  = 404, message  = "Mundo não encontrado"),
            @ApiResponse(code  = 500, message  = "Erro interno no servidor")
    })
    public ResponseEntity atualizar(@PathVariable("id") Long id, @RequestBody MundoDTO dto) {
        if (!service.getMundoById(id).isPresent()) {
            return new ResponseEntity("Mundo não encontrado", HttpStatus.NOT_FOUND);
        }
        try {
            Mundo mundo = converter(dto);
            mundo.setId(id);
            service.salvar(mundo);
            return ResponseEntity.ok(mundo);
        } catch (RegraNegocioException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    @ApiOperation("Exclui um Mundo")
    @ApiResponses({
            @ApiResponse(code  = 200, message  = "Mundo excluído com sucesso"),
            @ApiResponse(code  = 404, message  = "Mundo não encontrado"),
            @ApiResponse(code  = 500, message  = "Erro interno no servidor")
    })
    public ResponseEntity excluir(@PathVariable("id")  Long id) {
        Optional<Mundo> mundo = service.getMundoById(id);
        if (!mundo.isPresent()) {
            return new ResponseEntity("Mundo não encontrado", HttpStatus.NOT_FOUND);
        }
        try {
            service.excluir(mundo.get());
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        } catch (RegraNegocioException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } 
    }

    public Mundo converter(MundoDTO dto) {
        ModelMapper modelMapper = new ModelMapper();
        return modelMapper.map(dto, Mundo.class);
    }
}
