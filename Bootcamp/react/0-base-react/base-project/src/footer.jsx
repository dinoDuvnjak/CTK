
function Footer(props) {
  return (
    <footer>
      <p>Copyright &copy; {props.year} {props.company}</p>
      <p>{props.text}</p>
    </footer>
  );
}

// export functioanlity es6
// export default Footer; // ovo je es6 nacin
export default Footer;