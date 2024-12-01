import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import car from '@images/submit.png';
import 'leaflet/dist/leaflet.css';
import './ClaimSubmitted.scss';

const ClaimSubmitted = ({ claimID, status }) => {
    const [userLocation, setUserLocation] = useState(null); // User's current location
    const [repairShops, setRepairShops] = useState([]); // Nearby repair shops
    const [selectedShop, setSelectedShop] = useState(null); // Selected repair shop
    const [showMap, setShowMap] = useState(false); // Toggle map visibility

    // Fetch user location using Geolocation API
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                },
                (error) => {
                    console.error('Error getting user location:', error);
                }
            );
        }
    }, []);

    // Simulate fetching nearby repair shops
    useEffect(() => {
        if (userLocation) {
            const fakeRepairShops = [
                { id: 1, name: 'Auto Repair Center', lat: userLocation.lat + 0.01, lng: userLocation.lng + 0.01 },
                { id: 2, name: 'Car Fix Garage', lat: userLocation.lat - 0.01, lng: userLocation.lng - 0.01 },
                { id: 3, name: 'Speedy Repairs', lat: userLocation.lat + 0.02, lng: userLocation.lng - 0.01 },
            ];
            setRepairShops(fakeRepairShops);
        }
    }, [userLocation]);

    // Render the map with user location and repair shop markers
    const renderRepairShops = () => (
        <div
            style={{
                height: '400px',
                marginTop: '20px',
                borderRadius: '8px',
                overflow: 'hidden',
                border: '1px solid #ddd',
            }}
        >
            <MapContainer
                center={userLocation}
                zoom={13}
                style={{ height: '100%', width: '100%' }}
            >
                {/* Base map tiles */}
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap contributors"
                />

                {/* User's location marker */}
                <Marker position={userLocation}>
                    <Popup>You are here!</Popup>
                </Marker>

                {/* Repair shop markers */}
                {repairShops.map((shop) => (
                    <Marker key={shop.id} position={[shop.lat, shop.lng]}>
                        <Popup>
                            <div style={{ textAlign: 'center' }}>
                                <h4 style={{ fontSize: '14px', margin: '5px 0' }}>{shop.name}</h4>
                                <button
                                    onClick={() => setSelectedShop(shop)}
                                    style={{
                                        backgroundColor: '#FF8C00',
                                        color: '#FFF',
                                        padding: '8px 12px',
                                        border: 'none',
                                        borderRadius: '5px',
                                        cursor: 'pointer',
                                        fontSize: '12px',
                                    }}
                                >
                                    Select Shop
                                </button>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );

    // Render the thank-you message after selecting a repair shop
    const renderThankYouMessage = () => (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <h4 style={{ color: '#FF8C00', fontSize: '22px', fontWeight: 'bold', marginBottom: '10px' }}>
                Thank You!
            </h4>
            <p style={{ fontSize: '16px', color: '#333' }}>
                You have selected <strong style={{ color: '#FF8C00' }}>{selectedShop.name}</strong> as your repair shop.
            </p>
            <p style={{ fontSize: '14px', color: '#555' }}>
                We will contact you shortly with the next steps. If you have any questions, feel free to contact us.
            </p>
        </div>
    );

    // Render based on claim status
    const renderInfo = () => {
        switch (status) {
            case 'ON_GOING':
                return {
                    info: ['Please select a nearby repair shop to proceed.'],
                    status: 'Processing',
                };
            default:
                return {
                    info: ['Your claim is being processed.'],
                    status: '',
                };
        }
    };

    return (
        <div
            className="claim-submit vh-100"
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#F9FAFC',
                padding: '20px',
            }}
        >
            <div
                className="for-width"
                style={{
                    textAlign: 'center',
                    backgroundColor: '#FFFFFF',
                    padding: '20px 30px',
                    borderRadius: '8px',
                    width: '90%',
                    maxWidth: '600px',
                    border: '1px solid #ddd',
                }}
            >
                <h4 style={{ color: '#FF8C00', fontSize: '24px', fontWeight: 'bold' }}>Claim Submitted!</h4>

                <div className="ai-img mt-5">
                    <img
                        src={car}
                        alt="car"
                        style={{
                            width: '150px',
                            height: 'auto',
                            borderRadius: '8px',
                            margin: '20px auto',
                            display: 'block',
                        }}
                    />
                </div>

                {renderInfo().info?.map((e, i) => (
                    <p
                        key={i}
                        style={{
                            fontSize: '16px',
                            color: '#555',
                            margin: i === 0 ? '20px 0 10px' : '10px 0',
                        }}
                    >
                        {e}
                    </p>
                ))}

                {/* Button to show the map */}
                {!showMap && !selectedShop && (
                    <button
                        onClick={() => setShowMap(true)}
                        style={{
                            backgroundColor: '#FF8C00',
                            color: '#FFF',
                            padding: '10px 20px',
                            border: 'none',
                            borderRadius: '5px',
                            fontSize: '16px',
                            cursor: 'pointer',
                            marginTop: '20px',
                        }}
                    >
                        Find Nearby Repair Shops
                    </button>
                )}

                {/* Show map if user location is available and no shop is selected */}
                {showMap && userLocation && !selectedShop && renderRepairShops()}

                {/* Show thank-you message after selecting a shop */}
                {selectedShop && renderThankYouMessage()}

                {/* Contact Us link */}
                <div
                    className="mt-3 contact_us_"
                    style={{
                        marginTop: '20px',
                        textAlign: 'center',
                        fontSize: '14px',
                        color: '#FF8C00',
                        textDecoration: 'underline',
                        cursor: 'pointer',
                    }}
                    onClick={() => alert('Contact Us: 123-456-7890')}
                >
                    Contact Us
                </div>
            </div>
        </div>
    );
};

export default ClaimSubmitted;
