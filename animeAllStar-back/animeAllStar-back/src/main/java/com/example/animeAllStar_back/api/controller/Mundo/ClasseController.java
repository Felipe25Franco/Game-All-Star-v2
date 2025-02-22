package com.example.animeAllStar_back.api.controller.Mundo;


import com.example.animeAllStar_back.api.DTO.Mundo.ClasseDTO;
import com.example.animeAllStar_back.exception.RegraNegocioException;
import com.example.animeAllStar_back.model.entity.Mundo.Classe;
import com.example.animeAllStar_back.model.entity.Mundo.Mundo;



import java.util.Optional;


import com.example.animeAllStar_back.service.Mundo.MundoService;
import com.example.animeAllStar_back.service.Mundo.ClasseService;

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
@RequestMapping("/api/v1/classes")
@Api("API de Classes")
@CrossOrigin
public class ClasseController {

    private final ClasseService service;    
    private final MundoService mundoService;

    @GetMapping
    @ApiOperation("Obter a lista de Classe")
    @ApiResponses({
            @ApiResponse(code  = 200, message  = "Lista de Classe retornada com sucesso"),
            @ApiResponse(code  = 404, message  = "Classe não encontrada"),
            @ApiResponse(code  = 500, message  = "Erro interno no servidor")
    })
    public ResponseEntity get() {
        List<Classe> classes = service.getClasses();
        return ResponseEntity.ok(classes.stream().map(ClasseDTO::create).collect(Collectors.toList()));
    }

    @GetMapping("/{id}")
    @ApiOperation("Obter detalhes de uma Classe")
    @ApiResponses({
            @ApiResponse(code  = 200, message  = "Classe encontrada"),
            @ApiResponse(code  = 404, message  = "Classe não encontrada"),
            @ApiResponse(code  = 500, message  = "Erro interno no servidor")
    })
    public ResponseEntity get(@PathVariable("id") @ApiParam("Id de Classe")  Long id) {
        Optional<Classe> classe = service.getClasseById(id);
        if (!classe.isPresent()) {
            return new ResponseEntity("Classe não encontrada", HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(classe.map(ClasseDTO::create));
    }

    @PostMapping
    @ApiOperation("Salva uma Classe")
    @ApiResponses({
            @ApiResponse(code  = 201, message  = "Classe salva com sucesso"),
            @ApiResponse(code  = 404, message  = "Erro ao salvar o Classe"),
            @ApiResponse(code  = 500, message  = "Erro interno no servidor")
    })
    public ResponseEntity post(@RequestBody ClasseDTO dto) {
        try {
            Classe classe = converter(dto);
            classe = service.salvar(classe);
            return new ResponseEntity(classe, HttpStatus.CREATED);
        } catch (RegraNegocioException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("{id}")
    @ApiOperation("Atualiza uma Classe")
    @ApiResponses({
            @ApiResponse(code  = 200, message  = "Classe alterada com sucesso"),
            @ApiResponse(code  = 404, message  = "Classe não encontrada"),
            @ApiResponse(code  = 500, message  = "Erro interno no servidor")
    })
    public ResponseEntity atualizar(@PathVariable("id") Long id, @RequestBody ClasseDTO dto) {
        if (!service.getClasseById(id).isPresent()) {
            return new ResponseEntity("Classe não encontrada", HttpStatus.NOT_FOUND);
        }
        try {
            Classe classe = converter(dto);
            classe.setId(id);
            service.salvar(classe);
            return ResponseEntity.ok(classe);
        } catch (RegraNegocioException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    @ApiOperation("Exclui uma Classe")
    @ApiResponses({
            @ApiResponse(code  = 200, message  = "Classe excluída com sucesso"),
            @ApiResponse(code  = 404, message  = "Classe não encontrada"),
            @ApiResponse(code  = 500, message  = "Erro interno no servidor")
    })
    public ResponseEntity excluir(@PathVariable("id")  Long id) {
        Optional<Classe> classe = service.getClasseById(id);
        if (!classe.isPresent()) {
            return new ResponseEntity("Classe não encontrada", HttpStatus.NOT_FOUND);
        }
        try {
            service.excluir(classe.get());
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        } catch (RegraNegocioException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    public Classe converter(ClasseDTO dto) {
        ModelMapper modelMapper = new ModelMapper();
        Classe classe = modelMapper.map(dto, Classe.class);
        if (dto.getIdMundo() != null) {
            Optional<Mundo> mundo = mundoService.getMundoById(dto.getIdMundo());
            if (!mundo.isPresent()) {
                classe.setMundo(null);
            } else {
                classe.setMundo(mundo.get());
            }
        }
        
        return classe;
    }
}
