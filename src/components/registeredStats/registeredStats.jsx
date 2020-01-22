import React from 'react'
import { useStore } from 'easy-peasy';


export default function RegisteredStats() {
  const statistics = useStore(store => store.statistics.statistics)

  return (
    <div className="row">
      <div style={{ textAlign: 'center' }} className="col-md-4 col-12"><span style={{ display: 'block', fontSize: '114px', color: '#293B49', fontWeight: 'bold' }}>{statistics && statistics.infographics && statistics.infographics.graduatesCount}</span> выпускников</div>
      <div style={{ textAlign: 'center' }} className="col-md-4 col-12"><span style={{ display: 'block', fontSize: '114px', color: '#293B49', fontWeight: 'bold' }}>{statistics && statistics.infographics && statistics.infographics.highSchoolStudentsCount}</span> старшеклассников</div>
      <div style={{ textAlign: 'center' }} className="col-md-4 col-12"><span style={{ display: 'block', fontSize: '114px', color: '#293B49', fontWeight: 'bold' }}>{statistics && statistics.infographics && statistics.infographics.teachersCount}</span> учителей</div>
    </div>
  )
}
