import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import customerService from '../../api/customerService';
import { useCart } from '../../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

const Cart = () => {
    const { cart, loading, fetchCart } = useCart();
    const [deletingId, setDeletingId] = useState(null);
    const navigate = useNavigate();

    const removeItem = async (itemId) => {
        setDeletingId(itemId);
        try {
            await customerService.removeCartItem(itemId);
            await fetchCart(); // Refresh global state
        } catch (error) {
            console.error('Error removing item:', error);
        } finally {
            setDeletingId(null);
        }
    };

    if (loading) return (
        <div className="container py-5 text-center min-vh-100 d-flex align-items-center justify-content-center">
            <div className="spinner-border text-orange" style={{ width: '3rem', height: '3rem' }}></div>
        </div>
    );

    const totalAmount = cart?.totalAmount || 0;
    const items = cart?.items || [];

    return (
        <div className="bg-light min-vh-100 py-5">
            <div className="container mt-4">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-5 text-start"
                >
                    <h1 className="display-5 fw-bold mb-2">Shopping <span className="text-orange">Cart</span></h1>
                    <p className="text-muted">You have {items.length} items in your tray</p>
                </motion.div>

                {items.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-5 bg-white shadow-premium rounded-4"
                    >
                        <motion.div
                            animate={{ rotate: [0, -10, 10, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 4 }}
                            className="mb-4 d-inline-block"
                        >
                            <i className="bi bi-cart-x display-1 text-orange opacity-25"></i>
                        </motion.div>
                        <h3 className="fw-bold">Hungry? Your cart is empty</h3>
                        <p className="text-muted mb-4 px-3">It looks like you haven't added anything to your cart yet. <br />Browse our top outlets to find your next meal!</p>
                        <Link to="/outlets" className="btn btn-orange px-5 py-3 rounded-3 fw-bold hover-lift">
                            <i className="bi bi-shop me-2"></i> Explore Outlets
                        </Link>
                    </motion.div>
                ) : (
                    <div className="row g-4">
                        {/* Cart Items List */}
                        <div className="col-lg-8">
                            <div className="d-flex flex-column gap-3">
                                <AnimatePresence mode="popLayout">
                                    {items.map((item, index) => (
                                        <motion.div
                                            key={item.cartItemId}
                                            layout
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="card border-0 shadow-premium rounded-4 overflow-hidden"
                                        >
                                            <div className="p-4">
                                                <div className="row align-items-center">
                                                    <div className="col-auto">
                                                        <div className="bg-orange-light rounded-4 d-flex align-items-center justify-content-center shadow-sm" style={{ width: '100px', height: '100px' }}>
                                                            <i className="bi bi-egg-fried fs-1 text-orange opacity-50"></i>
                                                        </div>
                                                    </div>
                                                    <div className="col text-start ps-md-4 mt-3 mt-md-0">
                                                        <div className="d-flex justify-content-between align-items-start">
                                                            <div>
                                                                <h4 className="fw-bold mb-1">{item.foodName}</h4>
                                                                <span className="badge-premium bg-light text-muted small mb-3 d-inline-block">Standard Portion</span>
                                                            </div>
                                                            <button
                                                                className="btn btn-light-danger rounded-circle p-2 hover-lift"
                                                                onClick={() => removeItem(item.cartItemId)}
                                                                disabled={deletingId === item.cartItemId}
                                                                title="Remove item"
                                                            >
                                                                {deletingId === item.cartItemId ? (
                                                                    <span className="spinner-border spinner-border-sm"></span>
                                                                ) : <i className="bi bi-trash3-fill fs-5"></i>}
                                                            </button>
                                                        </div>
                                                        <div className="d-flex justify-content-between align-items-end mt-2">
                                                            <div className="d-flex align-items-center bg-light rounded-pill px-3 py-1">
                                                                <span className="small fw-bold text-muted me-2">Qty:</span>
                                                                <span className="fw-bold">{item.quantity}</span>
                                                            </div>
                                                            <div className="text-end">
                                                                <span className="text-muted small d-block mb-1">Item Total</span>
                                                                <span className="price-tag fs-5">₹{item.totalPrice}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Summary Column */}
                        <div className="col-lg-4">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="sticky-top"
                                style={{ top: '100px' }}
                            >
                                <div className="card border-0 shadow-premium rounded-4 p-4 overflow-hidden">
                                    <div className="position-absolute top-0 end-0 p-3 opacity-10">
                                        <i className="bi bi-receipt display-4 text-orange"></i>
                                    </div>
                                    <h3 className="fw-bold mb-4 text-start">Order Summary</h3>

                                    <div className="d-flex justify-content-between mb-4">
                                        <span className="text-muted">Items Subtotal</span>
                                        <span className="fw-bold">₹{totalAmount}</span>
                                    </div>

                                    <hr className="opacity-10 mb-4" />
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <span className="fw-bold fs-4">Total Amount</span>
                                        <span className="fw-bold fs-3 text-orange">₹{totalAmount}</span>
                                    </div>

                                    <button
                                        className="btn btn-orange w-100 py-3 rounded-3 fs-5 fw-bold hover-lift shadow-sm mb-3"
                                        onClick={() => navigate('/checkout')}
                                    >
                                        Checkout Securely <i className="bi bi-shield-check ms-1"></i>
                                    </button>

                                    <div className="text-center">
                                        <Link to="/outlets" className="text-muted small text-decoration-none fw-bold hover-lift d-inline-block">
                                            <i className="bi bi-arrow-left me-1"></i> Add more items
                                        </Link>
                                    </div>
                                </div>

                                <div className="mt-4 p-3 bg-white shadow-premium rounded-4 d-flex align-items-center gap-3">
                                    <div className="bg-success-light p-2 rounded-3">
                                        <i className="bi bi-patch-check-fill text-success fs-4"></i>
                                    </div>
                                    <div className="text-start">
                                        <h6 className="fw-bold mb-0">Safe & Secure Payment</h6>
                                        <p className="text-muted small mb-0">100% Payment Protection</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
