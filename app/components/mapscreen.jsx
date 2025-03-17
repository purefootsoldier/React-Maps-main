import React, { useRef } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Animated } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const UT_CANCUN = {
    latitude: 21.0511,
    longitude: -86.8422,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
};

const playasCancun = [
    {
        id: '1',
        name: 'Playa Delfines',
        description: 'Una de las playas más icónicas de Cancún, con aguas cristalinas y vistas espectaculares.',
        image: require('../../assets/image/OIP.jpg'),
        coordinates: {
            latitude: 21.1193,
            longitude: -86.7456,
        },
    },
    {
        id: '2',
        name: 'Playa Norte',
        description: 'Playa de arena blanca y aguas tranquilas, ideal para relajarse.',
        image: require('../../assets/image/R.jpg'),
        coordinates: {
            latitude: 21.2466,
            longitude: -86.7294,
        },
    },
    {
        id: '3',
        name: 'Playa Marlin',
        description: 'Playa tranquila y menos concurrida, perfecta para disfrutar de la calma del Caribe.',
        image: require('../../assets/image/EA.jpg'),
        coordinates: {
            latitude: 21.1315,
            longitude: -86.7835,
        },
    },
];

export default function MapScreen() {
    const mapRef = useRef(null);
    const buttonAnimation = useRef(new Animated.Value(1)).current; // Animación del botón

    const navigateToLocation = (coords) => {
        mapRef.current?.animateToRegion(
            {
                ...coords,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
            },
            1000
        );
    };

    const onPressButton = () => {
        Animated.spring(buttonAnimation, {
            toValue: 0.8, // Efecto de animación
            friction: 3,
            useNativeDriver: true,
        }).start(() => {
            buttonAnimation.setValue(1); // Reseteamos la animación
        });
    };

    return (
        <View style={styles.container}>
            <MapView
                ref={mapRef}
                style={styles.map}
                initialRegion={UT_CANCUN}
            >
                <Marker
                    coordinate={{ latitude: 21.0511, longitude: -86.8461 }}
                    title="UT Cancún"
                    description="Universidad Tecnológica de Cancún"
                />

                {playasCancun.map((playa) => (
                    <Marker
                        key={playa.id}
                        coordinate={playa.coordinates}
                        title={playa.name}
                        description={playa.description}
                    />
                ))}
            </MapView>

            <View style={styles.cardsContainer}>
                <FlatList
                    horizontal
                    data={playasCancun}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <Image source={item.image} style={styles.cardImage} />
                            <Text style={styles.cardTitle}>{item.name}</Text>
                            <Text style={styles.cardDescription}>{item.description}</Text>
                            <TouchableOpacity
                                style={styles.cardButton}
                                onPress={() => {
                                    onPressButton();
                                    navigateToLocation(item.coordinates);
                                }}
                            >
                                <Animated.Text style={[styles.cardButtonText, { transform: [{ scale: buttonAnimation }] }]}>
                                    Ver en el Mapa
                                </Animated.Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
    cardsContainer: {
        position: 'absolute',
        bottom: 30,
    },
    card: {
        backgroundColor: '#fff',
        marginHorizontal: 10,
        padding: 15,
        borderRadius: 15,
        width: 260,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    cardImage: {
        width: '100%',
        height: 120,
        borderRadius: 10,
        marginBottom: 10,
    },
    cardTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 5,
        color: '#007BFF',
    },
    cardDescription: {
        fontSize: 14,
        color: '#555',
        marginBottom: 10,
    },
    cardButton: {
        backgroundColor: '#007BFF',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    cardButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
