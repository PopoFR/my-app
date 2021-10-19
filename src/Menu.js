export  function Menu(props){
    return (
        <div>prout</div>
    )
}

export  function ColorMenu(props){

    const colors = require('./components/punk/traits/json/Colors.json');
    return (
    <>
        <div>BodyColor color: {props.bodyColor}</div>
        
        <div style={{ display: "flex"}}>
            {
                colors.body.forEach(color => {
                    return <div id={color}>{color}</div>
                })
            }
        </div>
    </>
    )
}
