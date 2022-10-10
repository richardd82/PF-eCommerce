import { useRef, useState,useEffect } from 'react'

import { useHistory } from "react-router-dom";
import './Pasarela.css';
import { BiWorld } from "react-icons/bi";
import { MdContactPhone, MdPayment } from "react-icons/md";
import GoogleMapPasarela from "./GoogleMapPasarela.jsx";
import FormularioContacto from "./FormularioContacto.jsx";
import ResumenPago from "./ResumenMetodoCompra.jsx";
import Thanks from "./Thanks.jsx";
import { AiFillCarryOut } from "react-icons/ai";
import { IconContext } from "react-icons";
import { useDispatch, useSelector } from "react-redux";



function Pasarela() {
  const history = useHistory();
  const user_login = useSelector((state) => state.user_login);
  const carry = useSelector((state) => state.carryProducts);
  const [page, setPage] = useState(1)
  const [coordinates, setCoordinates] = useState([])
  const [contact, setContact] = useState({ phone: (user_login.phone == undefined) ? 0 : user_login.phone, reference: "" })
  const [SelectTypeSearch, setSelectTypeSearch] = useState("TypeSearchBox")
  const [myAdress, setMyAdress] = useState({ name: "", adress: "" })
  const [map, setMap] = useState(/** @type google.maps.Map */(null))
  const PlaceRef = useRef()
  
  console.log(carry)


  useEffect(() => {
    if(JSON.stringify(carry)===JSON.stringify([]))
    history.push("/");
  }, [])


  function handleChangeContact(e, type) {
    setContact({ ...contact, [type]: e.target.value });
  }

  async function SearchByBox(e) {
    const directionsService = new google.maps.Geocoder()
    try {
      var A = await directionsService.geocode({ address: PlaceRef.current.value })
      var array = [];
      for (let index = 0; index < A.results.length; index++) {
        const element = A.results[index];
        array.push({ adress: { lat: element.geometry.location.lat(), lng: element.geometry.location.lng() }, name: element.formatted_address })
      }
      setMyAdress(array[0])
      setCoordinates(array);
      map.panTo(array[0].adress)
      map.setZoom(15)
    }
    catch (error) {
      console.log(error)
    }
  }

  function ChangeTypeSearch(e) {
    setSelectTypeSearch(e)
  }
  async function SelectAdress(e, elemento) {
    try {
      setMyAdress(elemento)
      map.panTo(elemento.adress)
    }
    catch (error) {
      console.log(error)
    }
  }

  function ClickContinue() {
    setPage(page + 1)
  }
  function ClickPreview() {
    setPage(page - 1)
  }

  async function Pointer(e) {
    if (SelectTypeSearch == "TypePointer") {
      const directionsService = new google.maps.Geocoder()
      console.log(e.latLng)
      try {
        var A = await directionsService.geocode({ location: { lat: e.latLng.lat(), lng: e.latLng.lng() } })
        var array = [];
        for (let index = 0; index < A.results.length; index++) {
          const element = A.results[index];
          array.push({ adress: { lat: element.geometry.location.lat(), lng: element.geometry.location.lng() }, name: element.formatted_address })
        }
        setMyAdress(array[0])
        var array2 = []
        array2.push(array[0])
        setCoordinates(array2);
        map.panTo(array[0].adress)
      }
      catch (error) {
        console.log(error)
      }
    }
  }

  function Validacion() {
    if (page == 1) {
      if (myAdress.name != "") {
        return true;
      }
    }
    if (page == 2) {
      if (contact.phone != 0 && contact.reference != "") {
        return true;
      }
    }

    return false
  }


  var Validacion2 = Validacion();

  var Adress = myAdress.name != "" ? myAdress.name : "Search your adress"

  return (
    <div className='BoxPasarela'>
      <div className='Pasarela '>
        <nav>
          <ul className='ListaPasarela'>
            <li key={"Pasarela" + 1}
              id={page==1?"LisPasarelaSelect":"ListPasarelaNoSelect"+1}
              className="page-itemPasarela">
              <IconContext.Provider value={{ size: "40px" }}>  <BiWorld /></IconContext.Provider></li>
            <li key={"Pasarela" + 2}
                id={page==2?"LisPasarelaSelect":"ListPasarelaNoSelect"+2}
              className="page-itemPasarela"> <IconContext.Provider value={{ size: "40px" }}><MdContactPhone /></IconContext.Provider></li>
            <li key={"Pasarela" + 3}
                id={page==3?"LisPasarelaSelect":"ListPasarelaNoSelect"+3}
              className="page-itemPasarela"> <IconContext.Provider value={{ size: "40px" }}><MdPayment /></IconContext.Provider> </li>
            <li key={"Pasarela" + 4}
                id={page==4?"LisPasarelaSelect":"ListPasarelaNoSelect"+4}
              className="page-itemPasarela"><IconContext.Provider value={{ size: "40px" }}> <AiFillCarryOut /> </IconContext.Provider></li>
          </ul>
        </nav>
        {page == 1 &&
          <GoogleMapPasarela ChangeTypeSearch={ChangeTypeSearch}
            setMap={setMap}
            Pointer={Pointer}
            Adress={Adress}
            SelectTypeSearch={SelectTypeSearch}
            PlaceRef={PlaceRef}
            coordinates={coordinates}
            SelectAdress={SelectAdress}
            myAdress={myAdress}
            map={map}
            SearchByBox={SearchByBox}
          />}
        {page == 2 &&
          <FormularioContacto handleChangeContact={handleChangeContact}
            adress={contact.adress}
            phone={contact.phone}
            reference={contact.reference}
          />
        }
        {page == 3 &&
          <ResumenPago ClickContinue={ClickContinue} contact={contact} myAdress={myAdress} />
        }
        {page == 4 &&
          <Thanks />}

        {Validacion2 &&
          <button className='buttonContinue' onClick={() => ClickContinue()}>Continue</button>}
        {page > 1 && page != 4 &&
          <button className='buttonPreview' onClick={() => ClickPreview()}>Preview</button>}
      </div>
    </div>
  )
}


export default Pasarela
