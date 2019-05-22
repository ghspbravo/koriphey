import React from 'react'
import cardBlock from '../../components/cardBlock/cardBlock';

export default function requestEdit() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-8 col-md-7">
          {cardBlock(
            <h2>Создание запроса</h2>,
            <div>
              <div className="form-group mb-1">
                <div className="mb-1">
                  <label htmlFor="request-content">Описание запроса<sup>*</sup></label>
                </div>
                <textarea rows="20" id="request-content" className="w-100" placeholder="Описание запроса" type="text" />
              </div>

              <div className="d-none d-md-block form-group mb-1">
                <div className="mb-1">
                  <label htmlFor="request-photo">Фотография</label>
                </div>
                <label htmlFor="request-photo" className="link">Загрузить фотографию</label>
                <input id="request-photo" className="d-none" type="file" />
              </div>
            </div>
          )}
        </div>
        <div className="col-lg-4 col-md-5 mt-2 mt-md-0">
          <div className="mb-2">
            {cardBlock(
              <h2>Настройки</h2>,
              <div>
                <div className="form-group mb-1">
                  <div className="mb-1">
                    <label htmlFor="request-category">Категория<sup>*</sup></label>
                  </div>
                  <input id="request-category" className="w-100" placeholder="Категория" type="text" />
                </div>

                <div className="form-group mb-1">
                  <div className="mb-1">
                    <label htmlFor="request-location">Локация<sup>*</sup></label>
                  </div>
                  <input id="request-location" className="w-100" placeholder="Локация" type="text" />
                </div>

                <div className="form-group">
                  <div className="mb-1">
                    <label htmlFor="request-expire-date">Окончание необходимости<sup>*</sup></label>
                  </div>
                  <input id="request-expire-date" className="w-100" placeholder="Дата" type="text" />
                </div>
              </div>
            )}
          </div>

          <div className="d-md-none mb-2">
            {cardBlock(
              <h2>Фотография</h2>,
              <div className="form-group ">
                <label htmlFor="mobile-request-photo" className="link">Загрузить фотографию</label>
                <input id="mobile-request-photo" className="d-none" type="file" />
              </div>
            )}
          </div>

          <button className="button_expanded mb-2">Сохранить изменения</button>
          <button className="button_expanded button_secondary">Удалить запрос</button>
        </div>
      </div>
    </div>
  )
}
