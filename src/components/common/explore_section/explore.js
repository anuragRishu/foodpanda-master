import React from 'react'
import './explore.css'
import ExploreCard from './explore_card/explore_card'

const ExploreSection = ({list,collectionName}) => {
  return (
    <div className='max-width explore-section'>
        <div className='collection-title'>{collectionName}</div>
        <div className='explore-grid'>
            {list.map((element)=>{
                return <ExploreCard dishes={element}/>
            })}
        </div>
    </div>
  )
}

export default ExploreSection