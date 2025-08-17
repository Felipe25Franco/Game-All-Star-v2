package com.example.animeAllStar_back.model.repository.Mundo;

import java.util.List;
import com.example.animeAllStar_back.model.entity.Mundo.Classe;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClasseRepository extends JpaRepository <Classe, Long>{
    List<Classe> findByMundoId(Long mundoId);
}
