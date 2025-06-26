import React, { useEffect, useRef } from "react";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMap
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

const FlyToDistrict = ({ searchQuery, districtCenter, markerRefs }) => {
    const map = useMap();

    useEffect(() => {
        if (!searchQuery) return;

        const match = districtCenter.find((d) =>
            d.district.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (match) {
            const latlng = [match.latitude, match.longitude];
            map.flyTo(latlng, 10, {
                duration: 1.5,
            });

            // Wait for map fly animation to finish, then open popup
            setTimeout(() => {
                const markerRef = markerRefs.current[match.district];
                if (markerRef) {
                    markerRef.openPopup();
                }
            }, 1600); // Must be longer than map.flyTo duration
        }
    }, [searchQuery, districtCenter, markerRefs, map]);

    return null;
};

const MapComponent = ({ districtCenter, searchQuery }) => {
    const markerRefs = useRef({});

    return (
        <div className="w-full h-[450px] rounded-3xl overflow-hidden">
            
            <MapContainer
                center={[23.685, 90.3563]}
                zoom={8}
                scrollWheelZoom={true}
                className="h-full w-full"
            >
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <FlyToDistrict
                    searchQuery={searchQuery}
                    districtCenter={districtCenter}
                    markerRefs={markerRefs}
                />

                {districtCenter.map((branch, index) => (
                    <Marker
                        key={index}
                        position={[branch.latitude, branch.longitude]}
                        ref={(ref) => {
                            if (ref) {
                                markerRefs.current[branch.district] = ref;
                            }
                        }}
                    >
                        <Popup>
                            <strong>{branch.city}, {branch.district}</strong><br />
                            Areas: {branch.covered_area.join(', ')}
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default MapComponent;
