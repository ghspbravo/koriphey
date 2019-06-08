import React, { useState } from 'react'
import { YMaps, Map, Placemark } from 'react-yandex-maps';

import marker from './marker.svg'
import { useStore } from 'easy-peasy';


export default function CityStatsMap() {
  const statistics = useStore(store => store.statistics.statistics)
  const [coords, coordsSet] = useState([])

  const geocode = async (ymaps) => {
    console.log('geocoder requests')
    await ymaps.loadModule('geocode')

    statistics.cityCount.filter(city => city.city !== null && city.city !== 'Другие').forEach(city => {
      ymaps.geocode(city.city)
        .then(result => {
          const cityCoord = result.geoObjects.get(0).geometry.getCoordinates()
          coordsSet(prevState => [...prevState, cityCoord])
        })

    })
    // .then(result => this.setState({ coordinates: result.geoObjects.get(0).geometry.getCoordinates() }))
  }

  return statistics && statistics.cityCount && (
    <YMaps >
      <div style={{ width: '100%' }}>
        <Map onLoad={ymaps => geocode(ymaps)} style={{
          width: '100%',
          height: '30vh',
          minHeight: '400px',
          maxHeight: '80vh'
        }} defaultState={{ center: [55.75, 37.57], zoom: 2, controls: ['zoomControl'] }}
          defaultOptions={{
            autoFitToViewport: 'always'
          }}
          instanceRef={ref => { ref && ref.behaviors.disable('scrollZoom'); }}
          modules={['control.ZoomControl']}
        >

          {coords.length !== 0 && coords.map((coordsList, index) =>
            <Placemark key={index} defaultGeometry={coordsList} options={{
              iconLayout: 'default#image',
              iconImageHref: marker
            }} />)}

        </Map>
      </div>
    </YMaps>
  )
}
