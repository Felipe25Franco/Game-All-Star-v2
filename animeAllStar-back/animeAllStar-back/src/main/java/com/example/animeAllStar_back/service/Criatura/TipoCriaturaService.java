package com.example.animeAllStar_back.service.Criatura;

import com.example.animeAllStar_back.model.entity.Criatura.TipoCriatura;
import com.example.animeAllStar_back.model.entity.Item.SubTipoItem;
import com.example.animeAllStar_back.model.repository.Criatura.TipoCriaturaRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.springframework.transaction.annotation.Transactional;

import com.example.animeAllStar_back.exception.RegraNegocioException;
@Service
public class TipoCriaturaService {

    private TipoCriaturaRepository repository;
    public TipoCriaturaService(TipoCriaturaRepository repository) {this.repository = repository;}

    public List<TipoCriatura> getTipoCriaturas() {
        return repository.findAll();
    }

    public Optional<TipoCriatura> getTipoCriaturaById(Long id) {
        return repository.findById(id);
    }

    @Transactional
    public TipoCriatura salvar(TipoCriatura tipoCriatura) {
        validar(tipoCriatura);
        return repository.save(tipoCriatura);
    }

    @Transactional
    public void excluir(TipoCriatura tipoCriatura) {
        Objects.requireNonNull(tipoCriatura.getId());
        repository.delete(tipoCriatura);
    }

    public void validar(TipoCriatura tipoCriatura) {
        if (tipoCriatura.getNome() == null || tipoCriatura.getNome().trim().equals("")) {
            throw new RegraNegocioException("Item Invalido!!! Insira um Item valido.");
        }
        if (tipoCriatura.getDescricao() == null || tipoCriatura.getDescricao().trim().equals("")) {
            throw new RegraNegocioException("Descrição Invalida!, Insira uma descrição valida");
        }
    }
}
