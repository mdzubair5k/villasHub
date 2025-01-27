    mapboxgl.accessToken = mapToken;
    const map = new mapboxgl.Map({
        container: "map", // container ID
        style: "mapbox://styles/mapbox/streets-v12",
        center: [72.8777, 19.0760], // starting position [lng, lat]. Note that lat must be set between -90 and 90
        zoom: 9 // starting zoom
    });

console.log(coordinates);
    const marker = new mapboxgl.Marker()
    .setLngLat([12.554739, 55.70651])
    .setPopup = new mapboxgl.Popup({ offset:25, className: 'my-class' })
        .setHTML("<h1>Hello World!</h1>")
        .addTo(map);
