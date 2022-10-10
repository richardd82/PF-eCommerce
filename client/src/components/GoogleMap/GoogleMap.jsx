import './GoogleMap.css';
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Input,
  SkeletonText,
  Text,
} from '@chakra-ui/react'
import { FaSearchLocation, FaTimes } from 'react-icons/fa'

import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
  StandaloneSearchBox
} from '@react-google-maps/api'
import { useRef, useState } from 'react'

import { useHistory } from "react-router-dom";

const center = { lat: 48.8584, lng: 2.2945 }

function Map() {
  const history = useHistory();
  const [libraries] = useState(['places']);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  })

  const [coordinates, setCoordinates] = useState([])
  const [SelectTypeSearch, setSelectTypeSearch] = useState("TypeSearchBox")
  const [myAdress, setMyAdress] = useState({ name: "", adress: "" })

  const [map, setMap] = useState(/** @type google.maps.Map */(null))

  const PlaceRef = useRef()

  if (!isLoaded) {
    return <SkeletonText />
  }


  async function SearchByBox(e) {
    const directionsService = new google.maps.Geocoder()
    console.log(PlaceRef.current.value)
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

  const svgMarker = {
    path: "M 10 11 l 4 0 l 0 -3 l -2 -2 l -2 2 z M 12 2.016 q 2.906 0 4.945 2.039 t 2.039 4.945 q 0 1.453 -0.727 3.328 t -1.758 3.516 t -2.039 3.07 t -1.711 2.273 l -0.75 0.797 q -0.281 -0.328 -0.75 -0.867 t -1.688 -2.156 t -2.133 -3.141 t -1.664 -3.445 t -0.75 -3.375 q 0 -2.906 2.039 -4.945 t 4.945 -2.039 z",
    fillColor: "blue",
    fillOpacity: 0.6,
    strokeWeight: 0,
    rotation: 0,
    scale: 2,
    anchor: new google.maps.Point(15, 30),
  };

  const svgMarker2 = {
    path: "M 10 11 l 4 0 l 0 -3 l -2 -2 l -2 2 z M 12 2.016 q 2.906 0 4.945 2.039 t 2.039 4.945 q 0 1.453 -0.727 3.328 t -1.758 3.516 t -2.039 3.07 t -1.711 2.273 l -0.75 0.797 q -0.281 -0.328 -0.75 -0.867 t -1.688 -2.156 t -2.133 -3.141 t -1.664 -3.445 t -0.75 -3.375 q 0 -2.906 2.039 -4.945 t 4.945 -2.039 z",
    fillColor: "red",
    fillOpacity: 0.6,
    strokeWeight: 0,
    rotation: 0,
    scale: 2,
    anchor: new google.maps.Point(15, 30),
  };


  function ClickContinue(){
    history.push("/")
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

  var Adress = myAdress.name != "" ? myAdress.name : "Search your adress"

  return (
    <Flex
      position='relative'
      flexDirection='column'
      alignItems='center'
      h='100vh'
      w='100vw'
    >
      <Box position='absolute' left="10px" top='10%' h='80%' w='60%'>
        {/* Google Map Box */}
        <GoogleMap
          center={center}
          onClick={e => (Pointer(e))}
          zoom={15}
          mapContainerStyle={{ width: '100%', height: '100%' }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={map => setMap(map)}
        >
          {coordinates.map((elemento, index) => {
            console.log(elemento," ",myAdress)
            return (<Marker key={"Marker " + index} position={elemento.adress} 
            icon={JSON.stringify(myAdress)!==JSON.stringify(elemento)? svgMarker:svgMarker2} />)
          })}

        </GoogleMap>
      </Box>



      <div className='GoogleMapPlacesSearch'>
       <p><label>Your Adress:</label>
        <label>{Adress}</label></p> 

        <p><label>Type Search: </label>
          <select value={SelectTypeSearch} onChange={(e) => ChangeTypeSearch(e.target.value)}>
            <option key={"TypeSearchBox"} value={"TypeSearchBox"}>{"SearchBox"}</option>
            <option key={"TypePointer"} value={"TypePointer"}>{"Pointer"}</option>
          </select>
        </p>


        {SelectTypeSearch == "TypeSearchBox" &&
          <div>
            <p className='SearchBox'>
              <StandaloneSearchBox >
                <input
                  type='text'
                  placeholder='find your address'
                  ref={PlaceRef}
                />
              </StandaloneSearchBox>
              <IconButton
                aria-label='center back'
                icon={<FaSearchLocation />}
                isRound
                onClick={() => { SearchByBox() }}
              />
            </p>

            <div className='OpcionesAdress'>
              {coordinates.map((elemento, index) => {
                console.log(elemento)
                console.log(elemento.name)
                return (<button
                  type='submit' key={"adress" + elemento.name + index} onClick={(e) => SelectAdress(e, elemento)} >
                  {elemento.name}
                </button>)
              })}
            </div>
          </div>}
        {myAdress.name != "" &&
          <button onClick={()=>ClickContinue()}>Continue</button>}
      </div>
    </Flex >
  )
}


export default Map
