package com.example.animeAllStar_back.service.Habilidade;

import com.example.animeAllStar_back.model.entity.Habilidade.Especializacao;
import com.example.animeAllStar_back.model.repository.Habilidade.EspecializacaoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class EspecializacaoService {

    private EspecializacaoRepository repository;

    public EspecializacaoService (com.example.animeAllStar_back.model.repository.Habilidade.EspecializacaoRepository repository) {this.repository = repository;}
    public List<Especializacao> getEspecializacoes() {return repository.findAll();}
    public Optional<Especializacao> getEspecializacaoById(Long id) {return repository.findById(id);}

    @Transactional
    public Especializacao salvar(Especializacao especializacao) {
        validar(especializacao);
        return repository.save(especializacao);
    }

    @Transactional
    public void excluir(Especializacao especializacao) {
        Objects.requireNonNull(especializacao.getId());
        repository.delete(especializacao);
    }

    public void validar(Especializacao especializacao) {

    }
}
