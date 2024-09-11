package com.example.animeAllStar_back.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.animeAllStar_back.model.entity.Usuario;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    Optional<Usuario> findByLogin(String login);
}
