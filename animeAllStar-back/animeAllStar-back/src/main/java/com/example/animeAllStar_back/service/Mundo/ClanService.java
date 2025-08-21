package com.example.animeAllStar_back.service.Mundo;


import com.example.animeAllStar_back.model.entity.Mundo.Clan;

import com.example.animeAllStar_back.model.repository.Mundo.ClanRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.Random;

@Service
public class ClanService {

    private ClanRepository repository;
    private final Random random = new Random();

    public ClanService(ClanRepository repository) {
        this.repository = repository;
    }

    public List<Clan> getClans() {
        return repository.findAll();
    }

    public Optional<Clan> getClanById(Long id) {
        return repository.findById(id);
    }

    @Transactional
    public Clan salvar(Clan clan) {
        validar(clan);
        return repository.save(clan);
    }

    @Transactional
    public void excluir(Clan clan) {
        Objects.requireNonNull(clan.getId());
        repository.delete(clan);
    }


    public void validar(Clan clan) {

    }

    public Optional<Clan> sortearClan() {
        List<Clan> clans = repository.findAll();
        if (clans.isEmpty()) {
            return Optional.empty();
        }
        int index = random.nextInt(clans.size());
        return Optional.of(clans.get(index));
    }
}
