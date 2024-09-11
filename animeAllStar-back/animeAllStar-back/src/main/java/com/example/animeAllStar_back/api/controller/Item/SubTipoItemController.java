package com.example.animeAllStar_back.api.controller.Item;


import java.util.Optional;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.animeAllStar_back.api.DTO.Item.SubTipoItemDTO;
import com.example.animeAllStar_back.api.DTO.Item.TipoItemDTO;
import com.example.animeAllStar_back.exception.RegraNegocioException;
import com.example.animeAllStar_back.model.entity.Item.SubTipoItem;
import com.example.animeAllStar_back.model.entity.Item.TipoItem;
import com.example.animeAllStar_back.service.Item.SubTipoItemService;
import com.example.animeAllStar_back.service.Item.TipoItemService;

import java.util.List;
import java.util.stream.Collectors;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/subTipoItens")
@Api("API de SubTipo de Item")
@CrossOrigin

public class SubTipoItemController {
    
    private final SubTipoItemService service;
    

    @GetMapping
    @ApiOperation("Obter a lista de SubTipo de Itens")
    @ApiResponses({
            @ApiResponse(code  = 200, message  = "Lista de SubTipo de Item retornada com sucesso"),
            @ApiResponse(code  = 404, message  = "SubTipo de Item não encontrado"),
            @ApiResponse(code  = 500, message  = "Erro interno no servidor")
    })
    public ResponseEntity get() {
    List<SubTipoItem> subTipoItems = service.getSubTipoItens();
        return ResponseEntity.ok(subTipoItems.stream().map(SubTipoItemDTO::create).collect(Collectors.toList()));
    }

    @GetMapping("/{id}")
    @ApiOperation("Obter detalhes de um SubTipo de Item")
    @ApiResponses({
            @ApiResponse(code  = 200, message  = "SubTipo de Item encontrado"),
            @ApiResponse(code  = 404, message  = "SubTipo de Item não encontrado"),
            @ApiResponse(code  = 500, message  = "Erro interno no servidor")
    })
    public ResponseEntity get(@PathVariable("id") @ApiParam("Id de SubTipo de Item")  Long id) {
        Optional<SubTipoItem> subTipoItem = service.getSubTipoItemById(id);
        if (!subTipoItem.isPresent()) {
            return new ResponseEntity("SubTipo de Item não encontrado", HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(subTipoItem.map(SubTipoItemDTO::create));
    }

    @PostMapping
    @ApiOperation("Salva um SubTipo de Item")
    @ApiResponses({
            @ApiResponse(code  = 201, message  = "SubTipo de Item salvo com sucesso"),
            @ApiResponse(code  = 404, message  = "Erro ao salvar o SubTipo de Item"),
            @ApiResponse(code  = 500, message  = "Erro interno no servidor")
    })
    public ResponseEntity post(@RequestBody SubTipoItemDTO dto) {
        try {
            SubTipoItem subTipoItem = converter(dto);
            subTipoItem = service.salvar(subTipoItem);
            return new ResponseEntity(subTipoItem, HttpStatus.CREATED);
        } catch (RegraNegocioException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("{id}")
    @ApiOperation("Atualiza um SubTipo de Item")
    @ApiResponses({
            @ApiResponse(code  = 200, message  = "SubTipo de Item alterado com sucesso"),
            @ApiResponse(code  = 404, message  = "SubTipo de Item não encontrado"),
            @ApiResponse(code  = 500, message  = "Erro interno no servidor")
    })
    public ResponseEntity atualizar(@PathVariable("id") Long id, @RequestBody SubTipoItemDTO dto) {
        if (!service.getSubTipoItemById(id).isPresent()) {
            return new ResponseEntity("SubTipo de Item não encontrado", HttpStatus.NOT_FOUND);
        }
        try {
            SubTipoItem subTipoItem = converter(dto);
            subTipoItem.setId(id);
            service.salvar(subTipoItem);
            return ResponseEntity.ok(subTipoItem);
        } catch (RegraNegocioException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    @ApiOperation("Exclui um SubTipo de Item")
    @ApiResponses({
            @ApiResponse(code  = 200, message  = "SubTipo de Item excluído com sucesso"),
            @ApiResponse(code  = 404, message  = "SubTipo de Item não encontrado"),
            @ApiResponse(code  = 500, message  = "Erro interno no servidor")
    })
    public ResponseEntity excluir(@PathVariable("id")  Long id) {
        Optional<SubTipoItem> subTipoItem = service.getSubTipoItemById(id);
        if (!subTipoItem.isPresent()) {
            return new ResponseEntity("SubTipo de Item não encontrado", HttpStatus.NOT_FOUND);
        }
        try {
            service.excluir(subTipoItem.get());
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        } catch (RegraNegocioException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } 
    }

    public SubTipoItem converter(SubTipoItemDTO dto) {
        ModelMapper modelMapper = new ModelMapper();
        return modelMapper.map(dto, SubTipoItem.class);
        
    }
}
