package com.example.animeAllStar_back.service.Habilidade;

import com.example.animeAllStar_back.model.entity.Habilidade.Habilidade;
import com.example.animeAllStar_back.model.repository.Habilidade.HabilidadeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
@Service
public class HabilidadeService {
    @Autowired
    private HabilidadeRepository habilidadeRepository;

    public List<Habilidade> getAllHabilidades() {
        return habilidadeRepository.findAll();
    }

    public Habilidade getHabilidadeById(Long id) {
        return habilidadeRepository.findById(id).orElse(null);
    }

    public Habilidade saveHabilidade(Habilidade habilidade) {
        return habilidadeRepository.save(habilidade);
    }

    public void deleteHabilidade(Long id) {
        habilidadeRepository.deleteById(id);
    }
}
