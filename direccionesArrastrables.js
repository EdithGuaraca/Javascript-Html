function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 4,
        center: { lat: -24.345, lng: 134.46 }, // Australia.
    });
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer({
        draggable: true,
        map,
        panel: document.getElementById("panel"),
    });

    directionsRenderer.addListener("directions_changed", () => {
        const directions = directionsRenderer.getDirections();

        console.log(directions);

        if (directions) {
            computeTotalDistance(directions);
        }
    });
    displayRoute(
            "42J9+3X5 Cuenca",
            "Ave Remigio Crespo Toral 453, Cuenca",
            directionsService,
            directionsRenderer
    );
}

function displayRoute(origin, destination, service, display) {
    service.route({
                origin: origin,
                destination: destination,
                waypoints: [
                    { location: "3WQM+6HH Cuenca" },
                    { location: "3WMV+8RQ Cuenca" },
                ],
                travelMode: google.maps.TravelMode.DRIVING,
                avoidTolls: true,
            })
            .then((result) => {
                display.setDirections(result);
                console.log('display', display)
            })
            .catch((e) => {
                alert("Could not display directions due to: " + e);
            });
}

function computeTotalDistance(result) {
    let total = 0;
    const myroute = result.routes[0];

    if (!myroute) {
        return;
    }

    for (let i = 0; i < myroute.legs.length; i++) {
        total += myroute.legs[i].distance.value;
    }

    total = total / 1000;
    document.getElementById("total").innerHTML = total + " km";
}

window.initMap = initMap;