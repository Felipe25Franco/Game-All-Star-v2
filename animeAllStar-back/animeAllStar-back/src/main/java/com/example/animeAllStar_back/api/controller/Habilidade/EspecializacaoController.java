package com.example.animeAllStar_back.api.controller.Habilidade;


import com.example.animeAllStar_back.api.DTO.Habilidade.EspecializacaoDTO;
import com.example.animeAllStar_back.exception.RegraNegocioException;
import com.example.animeAllStar_back.model.entity.Habilidade.Especializacao;
import com.example.animeAllStar_back.model.entity.Mundo.Mundo;
import com.example.animeAllStar_back.service.Habilidade.EspecializacaoService;
import com.example.animeAllStar_back.service.Mundo.MundoService;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/especializacoes")
@Api("API de Especialização")
@CrossOrigin
public class EspecializacaoController {
    private final EspecializacaoService service;
    private final MundoService mundoService;


    @GetMapping
    @ApiOperation("Obter a lista de Especializações")
    @ApiResponses({
            @ApiResponse(code  = 200, message  = "Lista de Especialização retornada com sucesso"),
            @ApiResponse(code  = 404, message  = "Especialização não encontrado"),
            @ApiResponse(code  = 500, message  = "Erro interno no servidor")
    })
    public ResponseEntity get() {
        List<Especializacao> especializacoes = service.getEspecializacoes();
        return ResponseEntity.ok(especializacoes.stream().map(EspecializacaoDTO::create).collect(Collectors.toList()));
    }

    @GetMapping("/{id}")
    @ApiOperation("Obter detalhes de uma Especialização")
    @ApiResponses({
            @ApiResponse(code  = 200, message  = "Especialização encontrada"),
            @ApiResponse(code  = 404, message  = "Especialização não encontrada"),
            @ApiResponse(code  = 500, message  = "Erro interno no servidor")
    })
    public ResponseEntity get(@PathVariable("id") @ApiParam("Id de Especialização")  Long id) {
        Optional<Especializacao> especializacao = service.getEspecializacaoById(id);
        if (!especializacao.isPresent()) {
            return new ResponseEntity("Especialização não encontrada", HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(especializacao.map(EspecializacaoDTO::create));
    }

    @PostMapping
    @ApiOperation("Salva uma Especialização")
    @ApiResponses({
            @ApiResponse(code  = 201, message  = "Especialização salva com sucesso"),
            @ApiResponse(code  = 404, message  = "Erro ao salvar a Especialização"),
            @ApiResponse(code  = 500, message  = "Erro interno no servidor")
    })
    public ResponseEntity post(@RequestBody EspecializacaoDTO dto) {
        try {
            Especializacao especializacao = converter(dto);
            especializacao = service.salvar(especializacao);
            return new ResponseEntity(especializacao, HttpStatus.CREATED);
        } catch (RegraNegocioException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("{id}")
    @ApiOperation("Atualiza uma Especialização")
    @ApiResponses({
            @ApiResponse(code  = 200, message  = "Especialização alterada com sucesso"),
            @ApiResponse(code  = 404, message  = "Especialização não encontrada"),
            @ApiResponse(code  = 500, message  = "Erro interno no servidor")
    })
    public ResponseEntity atualizar(@PathVariable("id") Long id, @RequestBody EspecializacaoDTO dto) {
        if (!service.getEspecializacaoById(id).isPresent()) {
            return new ResponseEntity("Especialização não encontrado", HttpStatus.NOT_FOUND);
        }
        try {
            Especializacao especializacao = converter(dto);
            especializacao.setId(id);
            service.salvar(especializacao);
            return ResponseEntity.ok(especializacao);
        } catch (RegraNegocioException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    @ApiOperation("Exclui uma Especialização")
    @ApiResponses({
            @ApiResponse(code  = 200, message  = "Especialização excluída com sucesso"),
            @ApiResponse(code  = 404, message  = "Especialização não encontrada"),
            @ApiResponse(code  = 500, message  = "Erro interno no servidor")
    })
    public ResponseEntity excluir(@PathVariable("id")  Long id) {
        Optional<Especializacao> especializacao = service.getEspecializacaoById(id);
        if (!especializacao.isPresent()) {
            return new ResponseEntity("Especialização não encontrada", HttpStatus.NOT_FOUND);
        }
        try {
            service.excluir(especializacao.get());
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        } catch (RegraNegocioException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    public Especializacao converter(EspecializacaoDTO dto) {
        ModelMapper modelMapper = new ModelMapper();
        Especializacao especializacao = modelMapper.map(dto, Especializacao.class);
        if (dto.getIdMundo() != null) {
            Optional<Mundo> mundo = mundoService.getMundoById(dto.getIdMundo());
            if (!mundo.isPresent()) {
                especializacao.setMundo(null);
            } else {
                especializacao.setMundo(mundo.get());
            }
        }

        return especializacao;
    }
}
