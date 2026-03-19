console.log(place);

const map= new maplibregl.Map({
                container:'map',
                style:`https://api.maptiler.com/maps/streets-v4/style.json?key=${mapToken}`,
                center: coordinate,
                zoom: 9
            });
map.addControl(new maplibregl.NavigationControl(), 'top-left');

var marker= new maplibregl.Marker()
            .setLngLat(coordinate)
            .setPopup(new maplibregl.Popup()
            .setHTML(`<h5>${place}</h5><p>Exact location will be provided after booking.</p>`))

            .addTo(map);
    