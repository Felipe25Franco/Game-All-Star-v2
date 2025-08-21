package com.example.animeAllStar_back.api.controller.Tecnica;


import java.util.Optional;

import com.example.animeAllStar_back.api.DTO.Tecnica.ElementoChakraDTO;
import com.example.animeAllStar_back.exception.RegraNegocioException;
import com.example.animeAllStar_back.model.entity.Tecnicas.ElementoChakra;
import com.example.animeAllStar_back.service.Tecnica.ElementoChakraService;
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
@RequestMapping("/api/v1/elementoChakras")
@Api("API de Elementos de Chakra")
@CrossOrigin
public class ElementoChakraController {

    private final ElementoChakraService service;

    @GetMapping
    @ApiOperation("Obter a lista de Elementos de Chakra")
    @ApiResponses({
            @ApiResponse(code  = 200, message  = "Lista de Elementos de Chakra retornada com sucesso"),
            @ApiResponse(code  = 404, message  = "Elementos de Chakra não encontrado"),
            @ApiResponse(code  = 500, message  = "Erro interno no servidor")
    })
    public ResponseEntity get() {
        List<ElementoChakra> elementoChakras = service.getElementoChakras();
        return ResponseEntity.ok(elementoChakras.stream().map(ElementoChakraDTO::create).collect(Collectors.toList()));
    }

    @GetMapping("/{id}")
    @ApiOperation("Obter detalhes de um Elemento de Chakra")
    @ApiResponses({
            @ApiResponse(code  = 200, message  = "Elemento de Chakra encontrado"),
            @ApiResponse(code  = 404, message  = "Elemento de Chakra não encontrado"),
            @ApiResponse(code  = 500, message  = "Erro interno no servidor")
    })
    public ResponseEntity get(@PathVariable("id") @ApiParam("Id de Elemento de Chakra")  Long id) {
        Optional<ElementoChakra> elementoChakra = service.getElementoChakraById(id);
        if (!elementoChakra.isPresent()) {
            return new ResponseEntity("Elemento de Chakra não encontrado", HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(elementoChakra.map(ElementoChakraDTO::create));
    }

    @PostMapping
    @ApiOperation("Salva um Elemento de Chakra")
    @ApiResponses({
            @ApiResponse(code  = 201, message  = "Elemento de Chakra salvo com sucesso"),
            @ApiResponse(code  = 404, message  = "Erro ao salvar o Elemento de Chakra"),
            @ApiResponse(code  = 500, message  = "Erro interno no servidor")
    })
    public ResponseEntity post(@RequestBody ElementoChakraDTO dto) {
        try {
            ElementoChakra elementoChakra = converter(dto);
            elementoChakra = service.salvar(elementoChakra);
            return new ResponseEntity(elementoChakra, HttpStatus.CREATED);
        } catch (RegraNegocioException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("{id}")
    @ApiOperation("Atualiza um Elemento de Chakra")
    @ApiResponses({
            @ApiResponse(code  = 200, message  = "Elemento de Chakra alterado com sucesso"),
            @ApiResponse(code  = 404, message  = "Elemento de Chakra não encontrado"),
            @ApiResponse(code  = 500, message  = "Erro interno no servidor")
    })
    public ResponseEntity atualizar(@PathVariable("id") Long id, @RequestBody ElementoChakraDTO dto) {
        if (!service.getElementoChakraById(id).isPresent()) {
            return new ResponseEntity("Elemento de Chakra não encontrado", HttpStatus.NOT_FOUND);
        }
        try {
            ElementoChakra elementoChakra = converter(dto);
            elementoChakra.setId(id);
            service.salvar(elementoChakra);
            return ResponseEntity.ok(elementoChakra);
        } catch (RegraNegocioException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    @ApiOperation("Exclui um Elemento de Chakra")
    @ApiResponses({
            @ApiResponse(code  = 200, message  = "Elemento de Chakra excluído com sucesso"),
            @ApiResponse(code  = 404, message  = "Elemento de Chakra não encontrado"),
            @ApiResponse(code  = 500, message  = "Erro interno no servidor")
    })
    public ResponseEntity excluir(@PathVariable("id")  Long id) {
        Optional<ElementoChakra> elementoChakra = service.getElementoChakraById(id);
        if (!elementoChakra.isPresent()) {
            return new ResponseEntity("Elemento de Chakra não encontrado", HttpStatus.NOT_FOUND);
        }
        try {
            service.excluir(elementoChakra.get());
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        } catch (RegraNegocioException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/sorteio")
    public ResponseEntity<List<ElementoChakra>> sortearElementos() {
        List<ElementoChakra> sorteados = service.sortearElementosBasicos();
        return ResponseEntity.ok(sorteados);
    }

    public ElementoChakra converter(ElementoChakraDTO dto) {
        ModelMapper modelMapper = new ModelMapper();
        return modelMapper.map(dto, ElementoChakra.class);

    }
}
