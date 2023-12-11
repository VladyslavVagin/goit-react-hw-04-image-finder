import css from './ErrorMessage.module.css'
import ErrorPicture from 'icons/icons/error.jpg'
import { memo } from 'react'

const ErrorMessage = () => {
  return (
    <div className={css.container}>
        <p className={css.text}>Ooops, oooops, NO IMAGES, We so SORRY...</p>
        <img src={ErrorPicture} alt="weeping toad" className={css.image}/>
    </div>
  )
}

export default memo(ErrorMessage)