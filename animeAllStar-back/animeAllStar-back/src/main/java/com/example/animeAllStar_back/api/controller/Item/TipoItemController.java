package com.example.animeAllStar_back.api.controller.Item;


import com.example.animeAllStar_back.api.DTO.Item.TipoItemDTO;
import com.example.animeAllStar_back.exception.RegraNegocioException;
import com.example.animeAllStar_back.model.entity.Item.SubTipoItem;
import com.example.animeAllStar_back.model.entity.Item.TipoItem;
import com.example.animeAllStar_back.service.Item.TipoItemService;
import com.example.animeAllStar_back.service.Item.SubTipoItemService;



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
@RequestMapping("/api/v1/tipoItens")
@Api("API de Tipo de Item")
@CrossOrigin

public class TipoItemController {

    private final TipoItemService service;
    private final SubTipoItemService subTipoItemService;

    @GetMapping
    @ApiOperation("Obter a lista de Tipo de Itens")
    @ApiResponses({
            @ApiResponse(code  = 200, message  = "Lista de Tipo de Item retornada com sucesso"),
            @ApiResponse(code  = 404, message  = "Tipo de Item não encontrado"),
            @ApiResponse(code  = 500, message  = "Erro interno no servidor")
    })
    public ResponseEntity get() {
    List<TipoItem> tipoItems = service.getTipoItems();
        return ResponseEntity.ok(tipoItems.stream().map(TipoItemDTO::create).collect(Collectors.toList()));
    }

    @GetMapping("/{id}")
    @ApiOperation("Obter detalhes de um Tipo de Item")
    @ApiResponses({
            @ApiResponse(code  = 200, message  = "Tipo de Item encontrado"),
            @ApiResponse(code  = 404, message  = "Tipo de Item não encontrado"),
            @ApiResponse(code  = 500, message  = "Erro interno no servidor")
    })
    public ResponseEntity get(@PathVariable("id") @ApiParam("Id de Tipo de Item")  Long id) {
        Optional<TipoItem> tipoItem = service.getTipoItemById(id);
        if (!tipoItem.isPresent()) {
            return new ResponseEntity("Tipo de Item não encontrado", HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(tipoItem.map(TipoItemDTO::create));
    }

    @PostMapping
    @ApiOperation("Salva um Tipo de Item")
    @ApiResponses({
            @ApiResponse(code  = 201, message  = "Tipo de Item salvo com sucesso"),
            @ApiResponse(code  = 404, message  = "Erro ao salvar o Tipo de Item"),
            @ApiResponse(code  = 500, message  = "Erro interno no servidor")
    })
    public ResponseEntity post(@RequestBody TipoItemDTO dto) {
        try {
            TipoItem tipoItem = converter(dto);
            tipoItem = service.salvar(tipoItem);
            return new ResponseEntity(tipoItem, HttpStatus.CREATED);
        } catch (RegraNegocioException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("{id}")
    @ApiOperation("Atualiza um Tipo de Item")
    @ApiResponses({
            @ApiResponse(code  = 200, message  = "Tipo de Item alterado com sucesso"),
            @ApiResponse(code  = 404, message  = "Tipo de Item não encontrado"),
            @ApiResponse(code  = 500, message  = "Erro interno no servidor")
    })
    public ResponseEntity atualizar(@PathVariable("id") Long id, @RequestBody TipoItemDTO dto) {
        if (!service.getTipoItemById(id).isPresent()) {
            return new ResponseEntity("Tipo de Item não encontrado", HttpStatus.NOT_FOUND);
        }
        try {
            TipoItem tipoItem = converter(dto);
            tipoItem.setId(id);
            service.salvar(tipoItem);
            return ResponseEntity.ok(tipoItem);
        } catch (RegraNegocioException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    @ApiOperation("Exclui um Tipo de Item")
    @ApiResponses({
            @ApiResponse(code  = 200, message  = "Tipo de Item excluído com sucesso"),
            @ApiResponse(code  = 404, message  = "Tipo de Item não encontrado"),
            @ApiResponse(code  = 500, message  = "Erro interno no servidor")
    })
    public ResponseEntity excluir(@PathVariable("id")  Long id) {
        Optional<TipoItem> tipoItem = service.getTipoItemById(id);
        if (!tipoItem.isPresent()) {
            return new ResponseEntity("Tipo de Item não encontrado", HttpStatus.NOT_FOUND);
        }
        try {
            service.excluir(tipoItem.get());
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        } catch (RegraNegocioException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } 
    }

    public TipoItem converter(TipoItemDTO dto) {
        ModelMapper modelMapper = new ModelMapper();
        TipoItem tipoItem = modelMapper.map(dto, TipoItem.class);
        if (dto.getIdSubTipoItem() != null) {
            Optional<SubTipoItem> subTipoItem = subTipoItemService.getSubTipoItemById(dto.getIdSubTipoItem());
            if (!subTipoItem.isPresent()) {
                tipoItem.setSubTipoItem(null);
            } else {
                tipoItem.setSubTipoItem(subTipoItem.get());
            }
        }
        return tipoItem;
    }
}
