import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { Modal, Button, Form, ListGroup, Image } from 'react-bootstrap';
import img from '../utils/img/dosa.jpg';  // Default image
import FoodItemService from '../services/FoodItemService';  // Import the FoodItemService

function Products() {
  const [toggle, setToggle] = useState(true);
  const [products, setProducts] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '', image: '', file: null });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await FoodItemService.getAllFoodItems();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProducts();
  }, []);

  const Toggle = () => {
    setToggle(!toggle);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewProduct({ ...newProduct, file, image: URL.createObjectURL(file) });
    }
  };

  const handleSaveProduct = async () => {
    const price = parseFloat(newProduct.price);
    if (isNaN(price)) {
      return; // Handle invalid price value
    }

    try {
      const formData = new FormData();
      formData.append('name', newProduct.name);
      formData.append('description', newProduct.description);
      formData.append('price', price);
      if (newProduct.file) formData.append('imageFile', newProduct.file);

      if (selectedProduct) {
        // Update existing product
        await FoodItemService.updateFoodItem(selectedProduct.id, newProduct.name, newProduct.description, price, newProduct.file);
        setProducts(products.map(product =>
          product.id === selectedProduct.id
            ? { ...product, name: newProduct.name, description: newProduct.description, price: price, image: URL.createObjectURL(newProduct.file) }
            : product
        ));
        setShowEditModal(false);
      } else {
        // Add new product
        const newProductData = await FoodItemService.addFoodItem(newProduct.name, newProduct.description, price, newProduct.file);
        setProducts([...products, newProductData]);
        setShowAddModal(false);
      }

      // Reset form and close modal
      setNewProduct({ name: '', description: '', price: '', image: '', file: null });
      setSelectedProduct(null);
    } catch (error) {
      console.error('Failed to save product:', error);
    }
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setNewProduct({ name: product.name, description: product.description, price: product.price.toString(), image: product.image, file: null });
    setShowEditModal(true);
  };

  const handleDeleteProduct = async (id) => {
    try {
      await FoodItemService.deleteFoodItem(id);
      setProducts(products.filter(product => product.id !== id));
    } catch (error) {
      console.error(`Failed to delete product with ID ${id}:`, error);
    }
  };

  return (
    <div className='container-fluid bg-secondary min-vh-100'>
      <div className='row'>
        {toggle && (
          <div className='col-4 col-md-2 bg-white vh-100 position-fixed'>
            <Sidebar />
          </div>
        )}
        <div className={toggle ? 'col-8 col-md-10 offset-md-2' : 'col'}>
          <div className='p-3'>
            <h1>.</h1>
            
            <h>.</h>
            <Button className='my-5' variant="primary" onClick={() => setShowAddModal(true)}>Add Product</Button>
            <ListGroup className='mt-3'>
              {products.map(product => (
                <ListGroup.Item key={product.id} className='d-flex justify-content-between align-items-center'>
                  <div className='d-flex align-items-center'>
                    <Image src={`http://localhost:8080${product.imageUrl}`} rounded style={{ width: '50px', height: '50px', marginRight: '10px' }} />
                    <div>
                      <h5>{product.name}</h5>
                      <p>Price: Rs{product.price}</p>
                    </div>
                  </div>
                  <div>
                    <Button variant="warning" onClick={() => handleEditProduct(product)} className='me-2'>Edit</Button>
                    <Button variant="danger" onClick={() => handleDeleteProduct(product.id)}>Delete</Button>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>

          {/* Add Product Modal */}
          <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
            
            <Modal.Header closeButton>
              <Modal.Title>Add Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formProductName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter product name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  />
                </Form.Group>
                <Form.Group controlId="formProductDescription">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter product description"
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  />
                </Form.Group>
                <Form.Group controlId="formProductPrice" className="mt-2">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter product price"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  />
                </Form.Group>
                <Form.Group controlId="formProductFile" className="mt-2">
                  <Form.Label>Upload Image</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={handleFileChange}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowAddModal(false)}>Close</Button>
              <Button variant="primary" onClick={handleSaveProduct}>Save Product</Button>
            </Modal.Footer>
          </Modal>

          {/* Edit Product Modal */}
          <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formProductName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter product name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  />
                </Form.Group>
                <Form.Group controlId="formProductDescription">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter product description"
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  />
                </Form.Group>
                <Form.Group controlId="formProductPrice" className="mt-2">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter product price"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  />
                </Form.Group>
                <Form.Group controlId="formProductFile" className="mt-2">
                  <Form.Label>Upload Image</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={handleFileChange}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowEditModal(false)}>Close</Button>
              <Button variant="primary" onClick={handleSaveProduct}>Save Changes</Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default Products;
