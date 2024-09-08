import React, { useState, useEffect } from "react";
import { Card, Button, Form, InputGroup, Modal } from "react-bootstrap";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import FoodItemService from "../services/FoodItemService";
import "./Menu.css"; // Import your CSS file for custom styles

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);
  const [showCartModal, setShowCartModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const items = await FoodItemService.getAllFoodItems();
        setMenuItems(items);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMenuItems();
  }, []);

  const filteredMenu = menuItems.filter((menu) =>
    menu.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (menuItem) => {
    const existingItem = cart.find((item) => item.name === menuItem.name);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.name === menuItem.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...menuItem, quantity: 1 }]);
    }
  };

  const removeFromCart = (index) => {
    const updatedCart = cart.filter((item, i) => i !== index);
    setCart(updatedCart);
  };

  const increaseQuantity = (index) => {
    setCart(
      cart.map((item, i) =>
        i === index ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (index) => {
    setCart(
      cart.map((item, i) =>
        i === index && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleCartModalClose = () => setShowCartModal(false);
  const handleCartModalShow = () => setShowCartModal(true);

  const handleCheckout = () => {
    const userId = localStorage.getItem("userId");
    navigate("/checkout", { state: { cart, userId } });
  };

  return (
    <div className="menu-page">
      <header className="menu-header d-flex justify-content-center align-items-center">
        <h1 className="text-light display-4">Our Menu</h1>
      </header>

      <div className="container my-5">
        <div className="row justify-content-center my-4">
          <div className="col-md-6">
            <InputGroup>
              <Form.Control
                placeholder="Search for a dish..."
                aria-label="Search"
                aria-describedby="search-icon"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <InputGroup.Text id="search-icon">
                <FaSearch />
              </InputGroup.Text>
            </InputGroup>
          </div>
        </div>

        <div className="text-end mb-4">
          <Button variant="warning" onClick={handleCartModalShow}>
            <FaShoppingCart /> Cart ({cart.length})
          </Button>
        </div>

        <div className="row">
          {filteredMenu.length > 0 ? (
            filteredMenu.map((menu) => (
              <div className="col-md-4 mb-4" key={menu.name}>
                <Card className="menu-card h-100 shadow-sm">
                  <Card.Img
                    variant="top"
                    src={`http://localhost:8080${menu.imageUrl}`}
                    alt={menu.name}
                    className="menu-card-img"
                  />
                  <Card.Body>
                    <Card.Title className="text-primary">
                      {menu.name}
                    </Card.Title>
                    <Card.Text>{menu.description}</Card.Text>
                    <Card.Text>
                      <strong>Price:</strong> Rs{menu.price}
                    </Card.Text>
                    <Button variant="primary" onClick={() => addToCart(menu)}>
                      Add to Cart
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            ))
          ) : (
            <div className="text-center">
              <h5>No matching dishes found</h5>
            </div>
          )}
        </div>
      </div>

      <Modal show={showCartModal} onHide={handleCartModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Your Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {cart.length > 0 ? (
            <div>
              {cart.map((item, index) => (
                <div
                  key={index}
                  className="d-flex justify-content-between align-items-center mb-3"
                >
                  <span>
                    {item.name} - Rs{item.price} x {item.quantity}
                  </span>
                  <div>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => decreaseQuantity(index)}
                    >
                      -
                    </Button>{" "}
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => increaseQuantity(index)}
                    >
                      +
                    </Button>{" "}
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => removeFromCart(index)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
              <div className="text-end fw-bold">
                Total: Rs
                {cart.reduce(
                  (total, item) => total + item.price * item.quantity,
                  0
                )}
              </div>
            </div>
          ) : (
            <p>Your cart is empty.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCartModalClose}>
            Close
          </Button>
          {cart.length > 0 && (
            <Button variant="success" onClick={handleCheckout}>
              Checkout
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Menu;
