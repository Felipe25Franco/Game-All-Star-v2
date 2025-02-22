package com.example.animeAllStar_back.api.controller.Item;

import com.example.animeAllStar_back.api.DTO.Item.ItemDTO;
import com.example.animeAllStar_back.exception.RegraNegocioException;
import com.example.animeAllStar_back.model.entity.Mundo.Mundo;
import com.example.animeAllStar_back.model.entity.Item.Item;
import com.example.animeAllStar_back.model.entity.Item.TipoItem;
import com.example.animeAllStar_back.service.Mundo.MundoService;
import com.example.animeAllStar_back.service.Item.ItemService;
import com.example.animeAllStar_back.service.Item.TipoItemService;


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
@RequestMapping("/api/v1/itens")
@Api("API de Item")
@CrossOrigin

public class ItemController {
    
    private final ItemService service;
    private final TipoItemService tipoItemService;
    private final MundoService mundoService;

    @GetMapping
    @ApiOperation("Obter a lista de Itens")
    @ApiResponses({
            @ApiResponse(code  = 200, message  = "Lista de Item retornada com sucesso"),
            @ApiResponse(code  = 404, message  = "Item não encontrado"),
            @ApiResponse(code  = 500, message  = "Erro interno no servidor")
    })
    public ResponseEntity get() {
    List<Item> itens = service.getItens();
        return ResponseEntity.ok(itens.stream().map(ItemDTO::create).collect(Collectors.toList()));
    }

    @GetMapping("/{id}")
    @ApiOperation("Obter detalhes de um Item")
    @ApiResponses({
            @ApiResponse(code  = 200, message  = "Item encontrado"),
            @ApiResponse(code  = 404, message  = "Item não encontrado"),
            @ApiResponse(code  = 500, message  = "Erro interno no servidor")
    })
    public ResponseEntity get(@PathVariable("id") @ApiParam("Id de Item")  Long id) {
        Optional<Item> item = service.getItemById(id);
        if (!item.isPresent()) {
            return new ResponseEntity("Item não encontrado", HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(item.map(ItemDTO::create));
    }

    @PostMapping
    @ApiOperation("Salva um Item")
    @ApiResponses({
            @ApiResponse(code  = 201, message  = "Item salvo com sucesso"),
            @ApiResponse(code  = 404, message  = "Erro ao salvar o Item"),
            @ApiResponse(code  = 500, message  = "Erro interno no servidor")
    })
    public ResponseEntity post(@RequestBody ItemDTO dto) {
        try {
            Item item = converter(dto);
            item = service.salvar(item);
            return new ResponseEntity(item, HttpStatus.CREATED);
        } catch (RegraNegocioException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("{id}")
    @ApiOperation("Atualiza um Item")
    @ApiResponses({
            @ApiResponse(code  = 200, message  = "Item alterado com sucesso"),
            @ApiResponse(code  = 404, message  = "Item não encontrado"),
            @ApiResponse(code  = 500, message  = "Erro interno no servidor")
    })
    public ResponseEntity atualizar(@PathVariable("id") Long id, @RequestBody ItemDTO dto) {
        if (!service.getItemById(id).isPresent()) {
            return new ResponseEntity("Item não encontrado", HttpStatus.NOT_FOUND);
        }
        try {
            Item item = converter(dto);
            item.setId(id);
            service.salvar(item);
            return ResponseEntity.ok(item);
        } catch (RegraNegocioException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    @ApiOperation("Exclui um Item")
    @ApiResponses({
            @ApiResponse(code  = 200, message  = "Item excluído com sucesso"),
            @ApiResponse(code  = 404, message  = "Item não encontrado"),
            @ApiResponse(code  = 500, message  = "Erro interno no servidor")
    })
    public ResponseEntity excluir(@PathVariable("id")  Long id) {
        Optional<Item> item = service.getItemById(id);
        if (!item.isPresent()) {
            return new ResponseEntity("Item não encontrado", HttpStatus.NOT_FOUND);
        }
        try {
            service.excluir(item.get());
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        } catch (RegraNegocioException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } 
    }

    public Item converter(ItemDTO dto) {
        ModelMapper modelMapper = new ModelMapper();
        Item item = modelMapper.map(dto, Item.class);
        if (dto.getIdMundo() != null) {
            Optional<Mundo> mundo = mundoService.getMundoById(dto.getIdMundo());
            if (!mundo.isPresent()) {
                item.setMundo(null);
            } else {
                item.setMundo(mundo.get());
            }
        }
        if (dto.getIdTipoItem() != null) {
            Optional<TipoItem> tipoItem = tipoItemService.getTipoItemById(dto.getIdTipoItem());
            if (!tipoItem.isPresent()) {
                item.setTipoItem(null);
            } else {
                item.setTipoItem(tipoItem.get());
            }
        }
        return item;
    }

}
