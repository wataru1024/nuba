import { useEffect } from 'react'
import styles from '../../styles/Order.module.css' 

export default function CustomerNumbers(props) {
  
  const tensPlaceNum = [0,1,2]
  const firstPlaceNum = [0,1,2,3,4,5,6,7,8,9]


  const tensFunc = (n)=>{
    props.setCustomerNumber([n,props.customerNumber[1]])
  }
  const firstFunc = (n)=>{
    props.setCustomerNumber([props.customerNumber[0],n])
  }

  const tensPlace = tensPlaceNum.map((num,index)=>(
    <button 
      key={index.toString()}
      className={styles.customerNumber}
      onClick={()=>{tensFunc(num)}}
    >{num}</button>
  ))

  const firstPlace = firstPlaceNum.map((num,index)=>(
    <button 
      key={index.toString()}
      className={styles.customerNumber} 
      onClick={()=>{firstFunc(num)}}
    >{num}</button> 
  ))

  return(<>
    <div className={styles.tensPlace}>  {tensPlace}  </div>
    <div className={styles.firstPlace}> {firstPlace} </div>
  </>)
}


// https://ralacode.com/blog/post/react-toggle-classname/