//////// MAPPING DATA TO COMPONENTS
//1-map-filter-reduce.js

import contacts from './contacts';

const kontakti = contacts.map((contact) => {
  // console.log(contact.name);
  // console.log(contact.imgURL);
  // console.log(contact.phone);
  // console.log(contact.email);
  return <Card
    key={contact.id}
    name={contact.name}
    img={contact.imgURL}
    tel_num={contact.phone}
    email={contact.email}
  />;
});


const myElement = 
<>
  {/* <h1>My Contacts</h1> */}
  {kontakti}

  {/* <Card name="Dino Babić" img="https://www.w3schools.com/images/w3schools_green.jpg" tel_num="+387 61 234 567" /> */}
  {/* <Card name="Beyonce" img="https://blackhistorywall.files.wordpress.com/2010/02/picture-device-independent-bitmap-119.jpg" tel_num="+123 456 789" /> */}



</>;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(myElement);