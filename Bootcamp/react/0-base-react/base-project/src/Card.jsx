function Card(props) {
  return (
    <div>
      <h1>My Contacts</h1>

      <h2>{props.name}</h2>
      <img
        src={props.img}
      />
      <p>{props.tel_num}</p>
    </div>  
      )
   }          
   
export default Card;   