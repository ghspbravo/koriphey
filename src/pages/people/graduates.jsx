import React, { useRef, useState, useEffect } from 'react'
import cardBlock from '../../components/cardBlock/cardBlock'
import { Link } from 'react-router-dom'
import Swiper from 'swiper';
import './graduates.scss';
import ClassItem from '../../components/graduates/ClassItem';
import { useStore } from 'easy-peasy';
import { useActions } from 'easy-peasy';

export default function Graduates() {
  const fetchGraduates = useActions(actions => actions.graduates.fetchGraduates)

  const graduatesYears = useStore(store => store.graduates.graduatesYears)
  const graduatesByYears = useStore(store => store.graduates.graduatesByYears)

  const totalGraduates = useStore(store => store.graduates.totalGraduates)
  const totalStudents = useStore(store => store.graduates.totalStudents)

  useEffect(() => {
    if (!currentYear) {
      fetchGraduates();
    }
  }, [])

  const swiperRef = useRef();
  const [currentYearId, currentYearIdSet] = useState(0)
  const currentYear = graduatesYears[currentYearId];

  useEffect(() => {
    const swiper = new Swiper(swiperRef.current, {
      slidesPerView: 'auto',
      spaceBetween: 25,
    })
    return () => {
      // swiper.destroy()
    }
  }, []);

  const onYearClick = (id) => {
    currentYearIdSet(id)
  }
  return (
    <div className="container">
      {cardBlock(
        <div className="row no-gutters align-items-center">
          <h3 className="my-0">
            <Link to="/people" style={{ textDecoration: 'none', color: "#252d338c" }}>Сообщество</Link>&ensp;
            <i className="fas fa-angle-double-right" style={{ color: "#252d338c" }}></i>&ensp;
          </h3>
          <h2 className="my-0">Выпускники</h2>
        </div>,
        <div className="row justify-content-around">
          {totalGraduates && <div style={{ textAlign: 'center' }} className="col-md-4 col-12"><span style={{ display: 'block', fontSize: '114px', color: '#293B49', fontWeight: 'bold' }}>{totalGraduates}</span> выпусков</div>}
          {totalStudents && <div style={{ textAlign: 'center' }} className="col-md-4 col-12"><span style={{ display: 'block', fontSize: '114px', color: '#293B49', fontWeight: 'bold' }}>{totalStudents}</span> выпускников</div>}
        </div>
      )}

      {currentYear && <div className="mt-2">
        {cardBlock(
          <div ref={swiperRef} className="swiper-container">
            <div className="swiper-wrapper align-items-center">
              {graduatesYears.map((year, index) => {
                const isCurrentYear = year === currentYear;
                return (<div key={index} style={{ maxWidth: '60px' }} className="swiper-slide">
                  <button onClick={() => onYearClick(index)} style={{
                    fontSize: isCurrentYear ? "24px" : "17px",
                    opacity: isCurrentYear ? 1 : 0.25
                  }} className="no-style">{year}</button>
                </div>)
              })}
            </div>
          </div>
        )}
      </div>}

      {(() => {
        if (!currentYear) { return; }
        const classList = graduatesByYears[currentYear]
        if (!classList) {
          return <p>
            За данный год не было выпусков
          </p>
        }
        return classList.map((classInfo, index) => <ClassItem key={index} contents={classInfo} />)
      })()}

    </div>
  )
}
