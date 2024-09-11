package com.example.animeAllStar_back.api.controller.Criatura;

import com.example.animeAllStar_back.api.DTO.Criatura.CriaturaDTO;
import com.example.animeAllStar_back.exception.RegraNegocioException;
import com.example.animeAllStar_back.model.entity.Criatura.Criatura;
import com.example.animeAllStar_back.model.entity.Criatura.TipoCriatura;
import com.example.animeAllStar_back.model.entity.Mundo.Mundo;
import com.example.animeAllStar_back.service.Criatura.CriaturaService;


import java.util.Optional;

import com.example.animeAllStar_back.service.Criatura.TipoCriaturaService;
import com.example.animeAllStar_back.service.MundoService;
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
@RequestMapping("/api/v1/criaturas")
@Api("API de Criatura")
@CrossOrigin
public class CriaturaController {

    private final CriaturaService service;
    private final TipoCriaturaService tipoCriaturaService;
    private final MundoService mundoService;

    @GetMapping
    @ApiOperation("Obter a lista de Criaturas")
    @ApiResponses({
            @ApiResponse(code  = 200, message  = "Lista de Criaturas retornada com sucesso"),
            @ApiResponse(code  = 404, message  = "Criatura não encontrada"),
            @ApiResponse(code  = 500, message  = "Erro interno no servidor")
    })
    public ResponseEntity get() {
        List<Criatura> criaturas = service.getCriaturas();
        return ResponseEntity.ok(criaturas.stream().map(CriaturaDTO::create).collect(Collectors.toList()));
    }

    @GetMapping("/{id}")
    @ApiOperation("Obter detalhes de uma Criatura")
    @ApiResponses({
            @ApiResponse(code  = 200, message  = "Criatura encontrada"),
            @ApiResponse(code  = 404, message  = "Criatura não encontrada"),
            @ApiResponse(code  = 500, message  = "Erro interno no servidor")
    })
    public ResponseEntity get(@PathVariable("id") @ApiParam("Id de Criatura")  Long id) {
        Optional<Criatura> criatura = service.getCriaturaById(id);
        if (!criatura.isPresent()) {
            return new ResponseEntity("Criatura não encontrada", HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(criatura.map(CriaturaDTO::create));
    }

    @PostMapping
    @ApiOperation("Salva uma Criatura")
    @ApiResponses({
            @ApiResponse(code  = 201, message  = "Criatura salva com sucesso"),
            @ApiResponse(code  = 404, message  = "Erro ao salvar o Criatura"),
            @ApiResponse(code  = 500, message  = "Erro interno no servidor")
    })
    public ResponseEntity post(@RequestBody CriaturaDTO dto) {
        try {
            Criatura criatura = converter(dto);
            criatura = service.salvar(criatura);
            return new ResponseEntity(criatura, HttpStatus.CREATED);
        } catch (RegraNegocioException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("{id}")
    @ApiOperation("Atualiza uma Criatura")
    @ApiResponses({
            @ApiResponse(code  = 200, message  = "Criatura alterada com sucesso"),
            @ApiResponse(code  = 404, message  = "Criatura não encontrada"),
            @ApiResponse(code  = 500, message  = "Erro interno no servidor")
    })
    public ResponseEntity atualizar(@PathVariable("id") Long id, @RequestBody CriaturaDTO dto) {
        if (!service.getCriaturaById(id).isPresent()) {
            return new ResponseEntity("Criatura não encontrada", HttpStatus.NOT_FOUND);
        }
        try {
            Criatura criatura = converter(dto);
            criatura.setId(id);
            service.salvar(criatura);
            return ResponseEntity.ok(criatura);
        } catch (RegraNegocioException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    @ApiOperation("Exclui uma Criatura")
    @ApiResponses({
            @ApiResponse(code  = 200, message  = "Criatura excluída com sucesso"),
            @ApiResponse(code  = 404, message  = "Criatura não encontrada"),
            @ApiResponse(code  = 500, message  = "Erro interno no servidor")
    })
    public ResponseEntity excluir(@PathVariable("id")  Long id) {
        Optional<Criatura> criatura = service.getCriaturaById(id);
        if (!criatura.isPresent()) {
            return new ResponseEntity("Criatura não encontrada", HttpStatus.NOT_FOUND);
        }
        try {
            service.excluir(criatura.get());
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        } catch (RegraNegocioException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    public Criatura converter(CriaturaDTO dto) {
        ModelMapper modelMapper = new ModelMapper();
        Criatura criatura = modelMapper.map(dto, Criatura.class);
        if (dto.getIdMundo() != null) {
            Optional<Mundo> mundo = mundoService.getMundoById(dto.getIdMundo());
            if (!mundo.isPresent()) {
                criatura.setMundo(null);
            } else {
                criatura.setMundo(mundo.get());
            }
        }
        if (dto.getIdTipoCriatura() != null) {
            Optional<TipoCriatura> tipoCriatura = tipoCriaturaService.getTipoCriaturaById(dto.getIdTipoCriatura());
            if (!tipoCriatura.isPresent()) {
                criatura.setTipoCriatura(null);
            } else {
                criatura.setTipoCriatura(tipoCriatura.get());
            }
        }
        return criatura;
    }
}
