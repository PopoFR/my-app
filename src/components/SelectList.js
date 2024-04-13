import { conditionalExpression } from "@babel/types";

const SelectList = (props) => {

    const onChange = (e) => {
        console.log(e.target.value) 
        props.toogle(e.target.value)
    }


    return (
    <select onChange = {onChange}>{
        props.list.map((x,y) =>
         <option key={y} value={x.name}>{x.name}</option>
         )
    }</select>
    )
}
export default SelectList;