package in.twiggy.twiggyapi.service;

import in.twiggy.twiggyapi.io.CartRequest;
import in.twiggy.twiggyapi.io.CartResponse;

public interface CartService {

    CartResponse addToCart(CartRequest cartRequest);

    CartResponse getCart();

    CartResponse clearCart();

    CartResponse removeFromCart(String foodId);
}
