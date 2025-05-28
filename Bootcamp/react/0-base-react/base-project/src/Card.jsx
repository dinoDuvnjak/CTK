//statless komponenete koje ne mijenjaju nista soim sebe
//props su read only, ne mogu se mijenjati u samoj komponent

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