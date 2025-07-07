package in.twiggy.twiggyapi.service;


import org.springframework.security.core.Authentication;

public interface AuthenticationFacade {

    public Authentication getAuthentication();
}
