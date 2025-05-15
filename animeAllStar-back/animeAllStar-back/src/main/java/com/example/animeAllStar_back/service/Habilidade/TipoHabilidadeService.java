package com.example.animeAllStar_back.service.Habilidade;

import com.example.animeAllStar_back.model.entity.Habilidade.TipoHabilidade;
import com.example.animeAllStar_back.model.repository.Habilidade.TipoHabilidadeRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.springframework.transaction.annotation.Transactional;

@Service
public class TipoHabilidadeService {

    private TipoHabilidadeRepository repository;

    public TipoHabilidadeService (TipoHabilidadeRepository repository) {this.repository = repository;}
    public List<TipoHabilidade> getTipoHabilidades() {return repository.findAll();}
    public Optional<TipoHabilidade> getTipoHabilidadeById(Long id) {return repository.findById(id);}

    @Transactional
    public TipoHabilidade salvar(TipoHabilidade tipoHabilidade) {
        validar(tipoHabilidade);
        return repository.save(tipoHabilidade);
    }

    @Transactional
    public void excluir(TipoHabilidade tipoHabilidade) {
        Objects.requireNonNull(tipoHabilidade.getId());
        repository.delete(tipoHabilidade);
    }

    public void validar(TipoHabilidade tipoHabilidade) {

    }

}
