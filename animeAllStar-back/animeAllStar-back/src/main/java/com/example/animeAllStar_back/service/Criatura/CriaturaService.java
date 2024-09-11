package com.example.animeAllStar_back.service.Criatura;

import com.example.animeAllStar_back.exception.RegraNegocioException;
import com.example.animeAllStar_back.model.entity.Criatura.Criatura;
import com.example.animeAllStar_back.model.entity.Item.Item;
import com.example.animeAllStar_back.model.repository.Criatura.CriaturaRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CriaturaService {

    private CriaturaRepository repository;

    public CriaturaService (CriaturaRepository repository) {
        this.repository = repository;
    }

    public List<Criatura> getCriaturas() {return repository.findAll();}
    public Optional<Criatura> getCriaturaById(Long id) {return repository.findById(id);}

    @Transactional
    public Criatura salvar(Criatura criatura) {
        validar(criatura);
        return repository.save(criatura);
    }

    @Transactional
    public void excluir(Criatura criatura) {
        Objects.requireNonNull(criatura.getId());
        repository.delete(criatura);
    }

    public void validar(Criatura criatura) {
        if (criatura.getNome() == null || criatura.getNome().trim().equals("")) {
            throw new RegraNegocioException("Item Invalido!!! Insira um Item valido.");
        }
        if (criatura.getDescricao() == null || criatura.getDescricao().trim().equals("")) {
            throw new RegraNegocioException("Descrição Invalida!!! Insira uma Descrição valida.");
        }
        if (criatura.getTipoCriatura() == null || criatura.getTipoCriatura().getId() == null || criatura.getTipoCriatura().getId() == 0) {
            throw new RegraNegocioException("Tipo de Criatura inválida!!!!");
        }
        if (criatura.getMundo() == null || criatura.getMundo().getId() == null || criatura.getMundo().getId() == 0) {
            throw new RegraNegocioException("Mundo inválido!!!!");
        }
    }
}
