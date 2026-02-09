import React, { useState, useEffect } from 'react';
import customerService from '../../api/customerService';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('ALL'); // ALL, ACTIVE, COMPLETED

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const data = await customerService.getMyOrders();
            setOrders(data || []);
        } catch (err) {
            console.error('Error fetching orders:', err);
        } finally {
            setLoading(false);
        }
    };

    const getStatusDetails = (status) => {
        switch (status) {
            case 'PLACED': return {
                badge: 'bg-info-light text-info',
                icon: 'bi-receipt',
                label: 'Order Placed',
                progress: 25
            };
            case 'PREPARING': return {
                badge: 'bg-warning-light text-warning',
                icon: 'bi-fire',
                label: 'Preparing',
                progress: 50
            };
            case 'READY': return {
                badge: 'bg-success-light text-success',
                icon: 'bi-check-circle-fill',
                label: 'Ready for Pickup',
                progress: 75
            };
            case 'DELIVERED': return {
                badge: 'bg-secondary-light text-secondary',
                icon: 'bi-bag-check-fill',
                label: 'Delivered',
                progress: 100
            };
            default: return {
                badge: 'bg-light text-dark',
                icon: 'bi-clock',
                label: status,
                progress: 0
            };
        }
    };

    const filteredOrders = orders.filter(order => {
        if (filter === 'ALL') return true;
        if (filter === 'ACTIVE') return order.status !== 'DELIVERED';
        if (filter === 'COMPLETED') return order.status === 'DELIVERED';
        return true;
    }).reverse();

    if (loading) return (
        <div className="container py-5 text-center min-vh-100 d-flex align-items-center justify-content-center">
            <div className="spinner-border text-orange" style={{ width: '3rem', height: '3rem' }}></div>
        </div>
    );

    return (
        <div className="bg-light min-vh-100 py-5">
            <div className="container mt-4">
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-5 gap-4">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-start"
                    >
                        <h1 className="display-5 fw-bold mb-1">My <span className="text-orange">Orders</span></h1>
                        <p className="text-muted mb-0">Manage and track your culinary adventures</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="glass-card p-1 d-flex gap-1"
                    >
                        {['ALL', 'ACTIVE', 'COMPLETED'].map(f => (
                            <button
                                key={f}
                                className={`btn rounded-3 px-4 py-2 fw-bold btn-sm transition-all border-0 ${filter === f ? 'btn-orange text-white shadow-sm' : 'text-muted hover-lift'}`}
                                onClick={() => setFilter(f)}
                            >
                                {f.charAt(0) + f.slice(1).toLowerCase()}
                            </button>
                        ))}
                    </motion.div>
                </div>

                {filteredOrders.length > 0 ? (
                    <div className="row g-4 d-flex">
                        <AnimatePresence mode="popLayout">
                            {filteredOrders.map((order, index) => {
                                const statusInfo = getStatusDetails(order.status);
                                return (
                                    <motion.div
                                        key={order.orderId}
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="col-12"
                                    >
                                        <div className="card border-0 shadow-premium rounded-4 overflow-hidden text-start">
                                            <div className="card-body p-4">
                                                <div className="row align-items-center g-4">
                                                    <div className="col-md-2 border-end border-light">
                                                        <div className="d-flex flex-column">
                                                            <span className="small text-muted fw-bold text-uppercase tracking-wider mb-1">Token Number</span>
                                                            <h3 className="fw-bold mb-0 text-orange">#{order.tokenNumber}</h3>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="d-flex align-items-center mb-2">
                                                            <div className="bg-orange-light p-2 rounded-3 me-3">
                                                                <i className="bi bi-shop text-orange fs-5"></i>
                                                            </div>
                                                            <div>
                                                                <h5 className="fw-bold mb-0">{order.outletName}</h5>
                                                                <span className="text-muted small">Ordered on {new Date().toLocaleDateString()}</span>
                                                            </div>
                                                        </div>
                                                        <div className="ps-5">
                                                            <p className="text-muted small mb-0 line-clamp-1">
                                                                {order.items?.map(i => `${i.quantity}x ${i.foodName}`).join(', ')}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <div className="mb-2 d-flex justify-content-between align-items-center">
                                                            <span className={`badge-premium ${statusInfo.badge} small`}>
                                                                <i className={`bi ${statusInfo.icon} me-2`}></i>
                                                                {statusInfo.label}
                                                            </span>
                                                            <span className="small text-muted fw-bold">{statusInfo.progress}%</span>
                                                        </div>
                                                        <div className="progress rounded-pill bg-light" style={{ height: '8px' }}>
                                                            <motion.div
                                                                initial={{ width: 0 }}
                                                                animate={{ width: `${statusInfo.progress}%` }}
                                                                className={`progress-bar rounded-pill ${order.status === 'DELIVERED' ? 'bg-secondary' : 'bg-orange'}`}
                                                            ></motion.div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-3 text-md-end d-flex flex-column gap-2">
                                                        <div className="mb-2">
                                                            <span className="text-muted small d-block">Total Paid</span>
                                                            <span className="h4 fw-bold mb-0">₹{order.totalAmount}</span>
                                                        </div>
                                                        <div className="d-flex gap-2 justify-content-md-end">
                                                            <button className="btn btn-orange-light btn-sm rounded-3 fw-bold px-3">
                                                                View Bill
                                                            </button>
                                                            {order.status === 'DELIVERED' && (
                                                                <button className="btn btn-orange btn-sm rounded-3 fw-bold px-3 hover-lift">
                                                                    Re-order
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-5 bg-white shadow-premium rounded-4 my-5"
                    >
                        <i className="bi bi-journal-x display-1 text-muted opacity-25 mb-4 d-block"></i>
                        <h3 className="fw-bold">No orders found</h3>
                        <p className="text-muted mb-4 px-3">It's a bit empty here. Let's start with something delicious!</p>
                        <Link to="/outlets" className="btn btn-orange px-5 py-3 rounded-3 fw-bold hover-lift">
                            Browse Outlets
                        </Link>
                    </motion.div>
                )}
            </div>

            <style>{`
                .bg-info-light { background: rgba(13, 202, 240, 0.1); }
                .bg-warning-light { background: rgba(255, 193, 7, 0.1); }
                .bg-success-light { background: rgba(25, 135, 84, 0.1); }
                .bg-secondary-light { background: rgba(108, 117, 125, 0.1); }
            `}</style>
        </div>
    );
};

export default MyOrders;
