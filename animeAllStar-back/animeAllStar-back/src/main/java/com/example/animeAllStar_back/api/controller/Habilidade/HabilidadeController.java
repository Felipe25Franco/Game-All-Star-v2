package com.example.animeAllStar_back.api.controller.Habilidade;

import com.example.animeAllStar_back.model.entity.Habilidade.Habilidade;
import com.example.animeAllStar_back.service.Habilidade.HabilidadeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/habilidades")
public class HabilidadeController {
    @Autowired
    private HabilidadeService habilidadeService;

    @GetMapping
    public List<Habilidade> getAllHabilidades() { return habilidadeService.getAllHabilidades();}
    @GetMapping("/{id}")
    public Habilidade getHabilidadeById(@PathVariable Long id) {
        return habilidadeService.getHabilidadeById(id);
    }

    @PostMapping
    public Habilidade createHabilidade(@RequestBody Habilidade habilidade) {
        return habilidadeService.saveHabilidade(habilidade);
    }

    @DeleteMapping("/{id}")
    public void deleteHabilidade(@PathVariable Long id) {
        habilidadeService.deleteHabilidade(id);
    }
}
