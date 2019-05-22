import React from 'react'
import { YMaps, Map, Placemark } from 'react-yandex-maps';

import marker from './marker.svg'

export default function cityStatsMap() {
  return (
    <YMaps>
      <div style={{ width: '100%' }}>
        <Map style={{
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
          <Placemark defaultGeometry={[55.75, 37.57]} options={{
            iconLayout: 'default#image',
            iconImageHref: marker
          }} />
          <Placemark defaultGeometry={[25.75, 37.57]} options={{
            iconLayout: 'default#image',
            iconImageHref: marker
          }} />
          <Placemark defaultGeometry={[55.75, 57.57]} options={{
            iconLayout: 'default#image',
            iconImageHref: marker
          }} />
        </Map>
      </div>
    </YMaps>
  )
}
