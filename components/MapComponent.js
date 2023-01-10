import Map, {Marker, Popup} from 'react-map-gl'


import {useState} from "react";
import {getCenter} from "geolib";

function MapComponent({searchResults}) {
    const coordinates = searchResults.map((result) => ({
        latitude: result.lat,
        longitude: result.long,
    }))

    const center = getCenter(coordinates)


    const [viewport, setViewport] = useState({
        width: '100%',
        height: '100%',
        latitude: center.latitude,
        longitude: center.longitude,
        zoom: 11
    })

    const [selectedLocation, setSelectedLocation] = useState({})

    const apiToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
    const mapStyleUrl = process.env.NEXT_PUBLIC_MAPBOX_STYLE_URL


    return (
        <div className="cursor-pointer">
            <Map
                mapStyle={mapStyleUrl}
                mapboxAccessToken={apiToken}
                initialViewState={viewport}
                onViewportChange={(nextViewport) => setViewport(nextViewport)}
            >

                {
                    searchResults.map((result, i) => (
                        <div key={i}>
                        <Marker
                            longitude={Number(result.long)}
                            latitude={Number(result.lat)}
                            offsetLeft={-20}
                            offsetTop={-10}
                        >
                            <p
                                role="img"
                                onClick={() => setSelectedLocation(result)}
                                className="cursor-pointer text-2xl animate-bounce"
                                aria-label="push-pin"
                            >👋</p>
                        </Marker>
                            {(selectedLocation.long === result.long && selectedLocation.lat === result.lat) ? (
                                <Popup
                                    onClose={() => setSelectedLocation({})}
                                    closeOnClick={false}
                                    latitude={Number(result.lat)}
                                    longitude={Number(result.long)}
                                    className="bg-white"
                                >{result.title}</Popup>
                            ) : (false)}

                        </div>

                    ))
                }
            </Map>

        </div>
    )
}

export default MapComponent