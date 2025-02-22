package com.example.animeAllStar_back.model.repository;


import com.example.animeAllStar_back.model.entity.Player;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PlayerRepository  extends JpaRepository<Player, Long> {

}
