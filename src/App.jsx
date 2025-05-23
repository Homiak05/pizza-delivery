import { useState } from "react";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";
import { Input } from "./components/ui/input";

const pizzas = [
  { id: 1, name: "Маргарита", price: 500, type: "вегетарианская" },
  { id: 2, name: "Пепперони", price: 600, type: "мясная" },
  { id: 3, name: "Гавайская", price: 550, type: "с ананасами" },
];

export default function PizzaDeliveryApp() {
  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState("");
  const [filter, setFilter] = useState("");

  const addToCart = (pizza) => {
    setCart([...cart, pizza]);
  };

  const filteredPizzas = pizzas.filter((pizza) =>
    pizza.name.toLowerCase().includes(filter.toLowerCase()) ||
    pizza.type.toLowerCase().includes(filter.toLowerCase())
  );

  const total = cart.reduce((sum, pizza) => sum + pizza.price, 0);

  const handleOrder = () => {
    if (address.trim() === "") {
      alert("Пожалуйста, введите адрес доставки.");
      return;
    }
    alert(`Заказ оформлен! Доставка по адресу: ${address}`);
    setCart([]);
    setAddress("");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">🍕 Доставка Пиццы</h1>

      <Input
        placeholder="Фильтр по названию или типу пиццы"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="mb-4"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredPizzas.map((pizza) => (
          <Card key={pizza.id}>
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold">{pizza.name}</h2>
              <p className="mb-1">Тип: {pizza.type}</p>
              <p className="mb-2">Цена: {pizza.price}₽</p>
              <Button onClick={() => addToCart(pizza)}>В корзину</Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-2">🛒 Корзина</h2>
        {cart.length === 0 ? (
          <p>Корзина пуста</p>
        ) : (
          <ul className="mb-4">
            {cart.map((item, index) => (
              <li key={index}>{item.name} - {item.price}₽</li>
            ))}
          </ul>
        )}
        <p className="text-lg font-semibold">Итого: {total}₽</p>

        <Input
          placeholder="Введите адрес доставки"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="mt-4 mb-2"
        />

        {cart.length > 0 && (
          <Button onClick={handleOrder}>Оформить заказ</Button>
        )}
      </div>
    </div>
  );
}
