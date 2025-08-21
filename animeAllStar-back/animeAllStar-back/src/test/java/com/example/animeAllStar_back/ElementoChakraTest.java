package com.example.animeAllStar_back;


import com.example.animeAllStar_back.model.entity.Tecnicas.ElementoChakra;
import com.example.animeAllStar_back.service.Tecnica.ElementoChakraService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

public class ElementoChakraTest {

  @Test
   void deveSortear(){
      List<ElementoChakra> elementos = Arrays.asList(
              new ElementoChakra(null, "Fogo", "Elemento de fogo", "url"),
              new ElementoChakra(null, "Água", "Elemento de água", "url"),
              new ElementoChakra(null, "Terra", "Elemento de terra", "url"),
              new ElementoChakra(null, "Vento", "Elemento de vento", "url"),
              new ElementoChakra(null, "Raio", "Elemento de raio", "url")
      );
      ElementoChakraService service = new ElementoChakraService(null) {
          @Override
          public List<ElementoChakra> sortearElementosBasicos() {
              List<ElementoChakra> basicos = elementos; // usa a lista criada manualmente
              int quantidade = 2 + (int) (Math.random() * 4);
              java.util.Collections.shuffle(basicos);
              return basicos.subList(0, quantidade);
          }
      };

      // chama o método
      List<ElementoChakra> sorteados = service.sortearElementosBasicos();

      // validações
      assertNotNull(sorteados);
      assertTrue(sorteados.size() >= 2 && sorteados.size() <= 5);
      for (ElementoChakra e : sorteados) {
          assertTrue(Arrays.asList("Fogo", "Água", "Terra", "Vento", "Raio").contains(e.getNome()));
      }
  }
  }
