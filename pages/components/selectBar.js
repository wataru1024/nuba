import componentsCSS from '../componentsCSS/selectBar.module.css'
import { doc, deleteDoc } from "firebase/firestore";
import db from '../../config/firebase'

export default function SelectBar(props) {
    
    const handleDelete = async (index)=>{
        const newMenuList = [...props.menuList]
        newMenuList.splice(index,1)
        props.setMenuList(newMenuList)
        await deleteDoc(doc(db, "menu", props.food.food_name));
    }

    return(
        <>
         <div className={componentsCSS.bar}>
            <h2>{props.food.food_name}</h2>
            <div className={componentsCSS.foodInfo}>
                <p>{props.food.food_price}円
                </p>
                <p>{props.food.food_size} size</p>
                <p>{props.food.food_color}</p>
                {/* <input type="checkbox"></input> */}
                <button onClick={()=>handleDelete(props.index)}>✕</button>
            </div>
         </div>
        </>
    )
}
// 三政党　の人
// 国民民主党　当


