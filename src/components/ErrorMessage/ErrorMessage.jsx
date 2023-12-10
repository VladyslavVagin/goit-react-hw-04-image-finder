import css from './ErrorMessage.module.css'
import ErrorPicture from '../icons/error.jpg'

const ErrorMessage = () => {
  return (
    <div className={css.container}>
        <p className={css.text}>Ooops, oooops, NO IMAGES, We so SORRY...</p>
        <img src={ErrorPicture} alt="weeping toad" className={css.image}/>
    </div>
  )
}

export default ErrorMessage