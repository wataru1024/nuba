import styles from '../../styles/Order.module.css' 
import { collection, query, setDoc, onSnapshot, getDocs, deleteDoc, doc, orderBy} from "firebase/firestore";
import { useEffect, useState } from "react";
import db from '../../config/firebase'

export default function OrderedCard() {
  const [orderedCard, setOrderedCard] = useState([])
  
  //時間定義
  const date = new Date()
  const orderedYear = date.getFullYear()
  const orderedMonth = date.getMonth() + 1
  const orderedDate = orderedMonth+"_"+date.getDate()
  const orderedTime = date.getHours()+"時"+date.getMinutes()+"分"

  const collectionName = orderedYear+"_"+orderedDate


  useEffect(()=>{
    const q = query(collection(db, orderedYear+"_"+orderedDate),orderBy("timeStamp", "asc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const snapArrey = []
      console.log(1)
      querySnapshot.forEach((el)=>{
        snapArrey.push(el.data())
      })
      setOrderedCard(snapArrey)
    });
},[])

    //firebase読み込み
    async function getFirebaseItems () {
      const menuCol = collection(db, collectionName);
      const menuSnapshot = await getDocs(menuCol);
      const cityList = menuSnapshot.docs.map(doc => doc.data());
      setOrderedCard(cityList)
    }
    useEffect(() => {
      getFirebaseItems();
    }, []);

  // useEffect(()=>{
  //   unsubscribe()
  // },[])


  const handleDelete = async (code,index)=>{
    const newOrderedCard = [...orderedCard]
    newOrderedCard.splice(index,1)
    setOrderedCard(newOrderedCard)
    console.log(code)
    await deleteDoc(doc(db, collectionName , code));
  }

  const doneHandle = async(code,foods,total,index)=>{
    const newOrderedCard = [...orderedCard]
    newOrderedCard.splice(index,1)
    setOrderedCard(newOrderedCard)
    await setDoc(doc(db, collectionName+":Done", code), 
      {total:total,foods:foods}
    );
    await deleteDoc(doc(db, collectionName, code));
  }

  const orderedCards = orderedCard.map((data,index)=>(
    <div className={styles.orderedCard} key={index.toString()}>
      <button onClick={()=>handleDelete(data.code,index)}>✕</button>
      <p >お客様番号{data.customerNumber}</p>
      <p >合計金額{data.total}</p>
        {data.foods.map((food ,index)=>(
          <div key={index.toString()}>
            <p>{food.name}:{food.count}</p>
          </div>
        ))}
      <button className={styles.doneBtn} onClick={()=>doneHandle(data.code,data.foods,data.total,index)}><p>完了</p></button>
    </div>
  ))


  return (
    <div className={styles.orderedCardBox}>
      {orderedCards}
    </div>
  )
}