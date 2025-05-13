package com.example.animeAllStar_back.service.Tecnica;
import com.example.animeAllStar_back.model.entity.Tecnicas.TipoTecnica;
import com.example.animeAllStar_back.model.repository.Tecnica.TipoTecnicaRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.springframework.transaction.annotation.Transactional;

import com.example.animeAllStar_back.exception.RegraNegocioException;
@Service
public class TipoTecnicaService {
    private TipoTecnicaRepository repository;
    public TipoTecnicaService(TipoTecnicaRepository repository) {this.repository = repository;}
    public List<TipoTecnica> getTipoTecnicas(){return repository.findAll();}
    public Optional<TipoTecnica> getTipoTecnicaById(Long id){return repository.findById(id);}

    @Transactional
    public TipoTecnica salvar(TipoTecnica tipoTecnica) {
        validar(tipoTecnica);
        return repository.save(tipoTecnica);
    }

    @Transactional
    public void excluir(TipoTecnica tipoTecnica) {
        Objects.requireNonNull(tipoTecnica.getId());
        repository.delete(tipoTecnica);
    }

    public void validar(TipoTecnica tipoTecnica) {
        if (tipoTecnica.getNome() == null || tipoTecnica.getNome().trim().equals("")){
            throw new RegraNegocioException("Tipo de Tecnica Invalido!!! Insira um ipo de Tecnica valido.");
        }
        if (tipoTecnica.getDescricao() == null || tipoTecnica.getDescricao().trim().equals("")) {
            throw new RegraNegocioException("Descrição Invalida!, Insira uma descrição valida");
        }
    }
}
