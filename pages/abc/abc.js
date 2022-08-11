import styles from '../../styles/Order.module.css' 
import { doc, collection, setDoc, getDocs, serverTimestamp} from "firebase/firestore";
import db from '../../config/firebase'
import React, {useEffect, useState } from 'react';
import FoodCard from '../components/foodCard';
import CustomerNumbers from '../components/customerNumber';
import OrderedCard from '../components/orderedCard';
import Link from 'next/link';



export default function Aaa() {
  //firebase読み込み
  async function getFirebaseItems () {
    const menuCol = collection(db, 'menu');
    const menuSnapshot = await getDocs(menuCol);
    const cityList = menuSnapshot.docs.map(doc => doc.data());
    setMenuList(cityList)
  }
  useEffect(() => {
    getFirebaseItems();
  }, []);
  
  

  //時間定義
  const date = new Date()
  const orderedYear = date.getFullYear()
  const orderedMonth = date.getMonth() + 1
  const orderedDate = orderedMonth+"_"+date.getDate()
  const orderedTime = date.getHours()+"時"+date.getMinutes()+"分"


 
  // 変数定義
  const [menuList, setMenuList] = useState([]);
  const [customerNumber, setCustomerNumber] = useState([0,0])
  const [total, setTotal] = useState(0);
  const [orderedList, setOrderedList] = useState([])
  const [orderedData ,setOrderedData] = useState({
    total:0,
    customerNumber:[0,0],
    foods:[{name:"pizza01",count:1},{name:"pizza02",count:2}],
    timeStamp:serverTimestamp(),
    code:"-abc"
  })
  const [resetSignal,setResetSignal] = useState(false)
  


  //オーダーコード
  let chars = 'abcdefghijklmnopqrstuvwxyz';
  let rand_str = '';
  for ( var i = 0; i < 4; i++ ) {
    rand_str += chars.charAt(Math.floor(Math.random() * chars.length));
  }



  // onClickでOrderをセットする
  const desideOrder = ()=>{
    setOrderedData({
      total:total,
      customerNumber:customerNumber,
      foods:orderedList,
      timeStamp:serverTimestamp(),
      code:orderedTime+"-"+rand_str
    })
  }



  //orderに変更が加わるとFirebaseに情報が送られる
  const sendOrder = async()=>{
    console.log(orderedData)
    // if(orderedData.code !== "-abc") {
      await setDoc(doc(db, orderedYear+"_"+orderedDate, orderedData.code), 
        orderedData
      );
    // }
  }
  useEffect(()=>{
    sendOrder()
    setCustomerNumber([0,0])
    setTotal(0)
    setResetSignal(!resetSignal)
    setOrderedList([])
  },[orderedData])



  // こいつどうにかならんかなぁ、、、
  const foodCards = menuList.map((food, index) => (
    <div key={index.toString()}>      
      <FoodCard 
        food={food}
        total={total}
        setTotal={setTotal}
        orderedList={orderedList}
        setOrderedList={setOrderedList}
        resetSignal={resetSignal}
        setResetSignal={setResetSignal}
      ></FoodCard>  
    </div>
  ));


  
  //
  return (<>
    <Link href="/"><a><button><h1>←</h1></button></a></Link>
    <div className={styles.foodCards}>
      {foodCards}
    </div>
    <h1>合計金額：{total}</h1>
    <CustomerNumbers 
      customerNumber={customerNumber} 
      setCustomerNumber={setCustomerNumber}
      resetSignal={resetSignal}
    ></CustomerNumbers>
    <h1>お客様番号：{customerNumber}</h1>
    <div className={styles.desideOrder} onClick={desideOrder}><p>注文確定！</p></div>
    <OrderedCard></OrderedCard>
    <Link href="/abc/result"><a>
      <button>今日の結果を確認する</button>
    </a>
    </Link>
  </>)
}
