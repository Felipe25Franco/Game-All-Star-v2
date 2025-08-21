package com.example.animeAllStar_back.api.controller.Mundo;

import com.example.animeAllStar_back.api.DTO.Mundo.ClanDTO;
import com.example.animeAllStar_back.exception.RegraNegocioException;
import com.example.animeAllStar_back.model.entity.Mundo.Clan;
import com.example.animeAllStar_back.service.Mundo.ClanService;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.concurrent.ThreadLocalRandom;

import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/clans")
@Api("API de Clans")
@CrossOrigin
public class ClanController {

    private final ClanService service;

    @GetMapping
    @ApiOperation("Obter a lista de Clans")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Lista de Clans retornada com sucesso"),
            @ApiResponse(code = 500, message = "Erro interno no servidor")
    })
    public ResponseEntity get() {
        List<Clan> clans = service.getClans();
        return ResponseEntity.ok(clans.stream().map(ClanDTO::create).collect(Collectors.toList()));
    }

    @GetMapping("/{id}")
    @ApiOperation("Obter detalhes de um Clan")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Clan encontrado"),
            @ApiResponse(code = 404, message = "Clan não encontrado")
    })
    public ResponseEntity get(@PathVariable("id") @ApiParam("Id do Clan") Long id) {
        Optional<Clan> clan = service.getClanById(id);
        if (!clan.isPresent()) {
            return new ResponseEntity("Clan não encontrado", HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(clan.map(ClanDTO::create));
    }

    @PostMapping
    @ApiOperation("Salva um Clan")
    @ApiResponses({
            @ApiResponse(code = 201, message = "Clan salvo com sucesso"),
            @ApiResponse(code = 400, message = "Erro ao salvar o Clan")
    })
    public ResponseEntity post(@RequestBody ClanDTO dto) {
        try {
            Clan clan = converter(dto);
            clan = service.salvar(clan);
            return new ResponseEntity(clan, HttpStatus.CREATED);
        } catch (RegraNegocioException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    @ApiOperation("Atualiza um Clan")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Clan alterado com sucesso"),
            @ApiResponse(code = 404, message = "Clan não encontrado")
    })
    public ResponseEntity atualizar(@PathVariable("id") Long id, @RequestBody ClanDTO dto) {
        if (!service.getClanById(id).isPresent()) {
            return new ResponseEntity("Clan não encontrado", HttpStatus.NOT_FOUND);
        }
        try {
            Clan clan = converter(dto);
            clan.setId(id);
            service.salvar(clan);
            return ResponseEntity.ok(clan);
        } catch (RegraNegocioException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    @ApiOperation("Exclui um Clan")
    @ApiResponses({
            @ApiResponse(code = 204, message = "Clan excluído com sucesso"),
            @ApiResponse(code = 404, message = "Clan não encontrado")
    })
    public ResponseEntity excluir(@PathVariable("id") Long id) {
        Optional<Clan> clan = service.getClanById(id);
        if (!clan.isPresent()) {
            return new ResponseEntity("Clan não encontrado", HttpStatus.NOT_FOUND);
        }
        try {
            service.excluir(clan.get());
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        } catch (RegraNegocioException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // 🔥 Sorteio de Clan aleatório
    @GetMapping("/sorteio")
    @ApiOperation("Sorteia um Clan aleatório")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Clan sorteado com sucesso"),
            @ApiResponse(code = 404, message = "Nenhum Clan encontrado para sorteio")
    })
    public ResponseEntity sortearClan() {
        List<Clan> clans = service.getClans();
        if (clans.isEmpty()) {
            return new ResponseEntity("Nenhum Clan disponível para sorteio", HttpStatus.NOT_FOUND);
        }

        int randomIndex = ThreadLocalRandom.current().nextInt(clans.size());
        Clan clanSorteado = clans.get(randomIndex);

        return ResponseEntity.ok(ClanDTO.create(clanSorteado));
    }

    public Clan converter(ClanDTO dto) {
        ModelMapper modelMapper = new ModelMapper();
        return modelMapper.map(dto, Clan.class);
    }
}
