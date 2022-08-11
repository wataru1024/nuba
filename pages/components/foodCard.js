import { useEffect, useState } from 'react'
import styles from '../../styles/Order.module.css' 

export default function FoodCard(props) {

  const name = props.food.food_name
  const price = props.food.food_price
  const size = props.food.food_size
  const [count, setCount] = useState(0)


  const increment = () => {
    setCount(count+1)
    props.setTotal(props.total + price)
  }
  useEffect(()=>{
    //count==1 だったら追加
    if(count == 1) {
      props.setOrderedList((prev)=>([...prev,{name:name,count:count}]))
    }
    //count>=2 だったら更新
    if(count >= 2) {
      props.setOrderedList((prev)=>(    prev.map((el) => (el.name == name ? {name:name,count:count}: el))    ))
    }

  },[count])
  
  const reset = () => {
    setCount(0);
    props.setTotal(props.total-price*count)
    props.setOrderedList((prev)=>(    prev.filter((el) => (el.name !== name))    ))
  }
  

  useEffect(()=>{
    setCount(0)
  },[props.resetSignal])

  return (<>
      <div className={styles.foodCard} onClick={increment}>
        <h2>{name}</h2>
        <div className={styles.abc}>
          <p>{price}円</p>
          <p>{size}</p>
        </div>
        <h1>{count}</h1>
      </div>
      <button onClick={reset}>Reset</button>
  </>)
}





// const [orderedData ,setOrderedData] = useState({
//   total:0,
//   customerNumber:[0,0],
//   foods:{pizza01:1,pizza02:2}, ←結局この型で作れんかったなあ、、、
//   time:orderedTime
// })

// foods:[  {name:pizza01,count:1}, {name:pizza02,count:2}  ]  この型になってしまった