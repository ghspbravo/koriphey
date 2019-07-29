import React, { useRef, useEffect, useState } from 'react'

export default function PhotoEdit(photo, rotation, rotationSet) {

  const photoWrapperRef = useRef()
  const canvasWrapperRef = useRef()

  const [canvasWrapperWidth, canvasWrapperWidthSet] = useState(0)

  useEffect(() => {
    canvasWrapperWidthSet(canvasWrapperRef.current.clientWidth)

    const resizeHandler = () => {

      canvasWrapperRef.current
        && canvasWrapperWidthSet(canvasWrapperRef.current.clientWidth)
    }

    window.addEventListener('resize', resizeHandler)

    return () => {
      window.removeEventListener('resize', resizeHandler)
    }
  }, [])

  const image = new Image()
  image.src = photo

  useEffect(() => {
    if (photo === undefined) return
    const canvas = photoWrapperRef.current
    const context = canvas.getContext('2d', {
      alpha: true
    })

    image.src = photo
    rotationSet(0)
    context.clearRect(0, 0, canvas.width, canvas.height);

    const imageRelateWidth = image.width % canvas.width
    const imageRelateHeight = image.height % canvas.height

    context.drawImage(image, (canvas.width - imageRelateWidth) / 2, (canvas.height - imageRelateHeight) / 2,
      imageRelateWidth, imageRelateHeight)

    // eslint-disable-next-line
  }, [photo, canvasWrapperWidth])

  const drawRotated = (degrees) => {
    const canvas = photoWrapperRef.current
    const context = canvas.getContext('2d', {
      alpha: true
    })

    // image.src = photo

    context.clearRect(0, 0, canvas.width, canvas.height);

    // save the unrotated context of the canvas so we can restore it later
    // the alternative is to untranslate & unrotate after drawing
    context.save();

    // move to the center of the canvas
    context.translate(canvas.width / 2, canvas.height / 2);

    // rotate the canvas to the specified degrees
    const angle = rotation + degrees
    context.rotate(angle * Math.PI / 180);

    rotationSet(angle)

    // draw the image
    // since the context is rotated, the image will be rotated also
    const imageRelateWidth = image.width % canvas.width
    const imageRelateHeight = image.height % canvas.height

    context.drawImage(image, (canvas.width - imageRelateWidth) / 2 - canvas.width / 2,
      (canvas.height - imageRelateHeight) / 2 - canvas.height / 2,
      imageRelateWidth, imageRelateHeight)

    // we’re done with the rotating so restore the unrotated context
    context.restore();
  }

  return (
    <div>
      <div ref={canvasWrapperRef} className="canvas-wrapper">
        <canvas ref={photoWrapperRef}
          width={canvasWrapperWidth} height={canvasWrapperWidth}>

        </canvas>
      </div>

      <div className="row justify-content-center">
        <div>
          <button type="button" onClick={() => drawRotated(-90)} className="fas fa-chevron-circle-left"></button>
          <button type="button" onClick={() => drawRotated(90)} className="fas fa-chevron-circle-right ml-2"></button>
        </div>
      </div>
    </div>
  )
}
