package com.example.animeAllStar_back.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfiguration;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.animeAllStar_back.security.JwtAuthFilter;
import com.example.animeAllStar_back.security.JwtService;
import com.example.animeAllStar_back.service.UsuarioService;

@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private JwtService jwtService;

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public OncePerRequestFilter jwtFilter(){
        return new JwtAuthFilter(jwtService, usuarioService);
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth
            .userDetailsService(usuarioService)
            .passwordEncoder(passwordEncoder());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .cors().disable()
            .csrf().disable()
            .authorizeRequests()
            
                .antMatchers("/api/v1/mundos/**")
                    .permitAll()
                .antMatchers("/api/v1/tipoItens/**")
                    .permitAll()
                .antMatchers("/api/v1/itens/**")
                    .permitAll()
                .antMatchers("/api/v1/subTipoItens/**")
                    .permitAll()
                .antMatchers("/api/v1/tipoCriaturas/**")
                    .permitAll()
                .antMatchers("/api/v1/criaturas/**")
                    .permitAll()
                .antMatchers("/api/v1/elementoChakras/**")
                    .permitAll()
                .antMatchers("/api/v1/classes/**")
                    .permitAll()
                .antMatchers("/api/v1/usuarios/**")
                    .permitAll()
                .antMatchers("/api/v1/usuarios/auth/**")
                    .permitAll()
              

                    //.antMatchers("/api/v1/vagas/**")
                    //.hasAnyRole("USER", "ADMIN")
                .anyRequest().authenticated()
            .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
                .addFilterBefore(jwtFilter(), UsernamePasswordAuthenticationFilter.class);
        ;
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers(
                "/v2/api-docs",
                "/configuration/ui",
                "/swagger-resources/**",
                "/configuration/security",
                "/swagger-ui.html",
                "/webjars/**");
    }

}
