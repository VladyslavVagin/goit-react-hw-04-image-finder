import css from './SearchImage.module.css'
import search from 'icons/icons/search.jpg'
import { memo } from 'react'

const SearchImage = () => {
  return (
    <div className={css.container}>
        <p className={css.text}>Let's find the pictures!!!</p>
        <img src={search} alt="man who looking from window" className={css.picture}/>
    </div>
  )
}

export default memo(SearchImage)