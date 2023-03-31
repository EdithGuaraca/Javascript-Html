// // Initialize and add the map
// function initMap() {
//     // The location of Uluru
//     const uluru = { lat: -2.903389069907639, lng: -79.01420522975039 }; //-2.903389069907639, -79.01420522975039
//     // The map, centered at Uluru
//     const map = new google.maps.Map(document.getElementById("map"), {
//         zoom: 4,
//         center: uluru,
//     });
//     // The marker, positioned at Uluru
//     const marker = new google.maps.Marker({
//         position: uluru,
//         map: map,
//     });
// }
//
// window.initMap = initMap;
//

'use Mae'
function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 10,
        center:  { lat: -2.90055, lng: -79.00453 },
    });
    const infoWindow = new google.maps.InfoWindow({
        content: "",
        disableAutoPan: true,
    });
    // Create an array of alphabetical characters used to label the markers.
    const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    // Add some markers to the map.
    const markers = locations.map((position, i) => {
        const label = labels[i % labels.length];
        const marker = new google.maps.Marker({
            position,
            label,
        });

        // markers can only be keyboard focusable when they have click listeners
        // open info window when marker is clicked
        marker.addListener("click", () => {
            infoWindow.setContent(label);
            infoWindow.open(map, marker);
        });
        return marker;
    });

    // Add a marker clusterer to manage the markers.
    new MarkerClusterer({
        markers,
        map
    });
}

const locations = [
    { lat: -2.91193804, lng: -79.06600034},
    { lat: -2.91666060, lng: -79.05538680},
    { lat: -2.92762557, lng: -79.07072567},
    { lat: -2.90659230, lng: -79.06294820},
];

window.initMap = initMap;