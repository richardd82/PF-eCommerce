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

const center = { lat: 48.8584, lng: 2.2945 }

function Map() {
  const [libraries] = useState(['places']);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  })

  const [coordinates, setCoordinates] = useState([])

  const [map, setMap] = useState(/** @type google.maps.Map */(null))

  const PlaceRef = useRef()

  if (!isLoaded) {
    return <SkeletonText />
  }


  async function Print(e) {
    const directionsService = new google.maps.Geocoder()
    console.log(PlaceRef.current.value)
    try {
      var A = await directionsService.geocode({ address: PlaceRef.current.value })
      var array = [];
      for (let index = 0; index < A.results.length; index++) {
        const element = A.results[index];
        array.push({ adress: { lat: element.geometry.location.lat(), lng: element.geometry.location.lng() }, name: element.formatted_address })
      }
      setCoordinates(array);
      map.panTo(array[0].adress)
      map.setZoom(15)
    }
    catch (error) {
      console.log(error)
    }
  }

  function Pointer() {
    console.log(e)
  }

  const svgMarker = {
    path: "M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
    fillColor: "blue",
    fillOpacity: 0.6,
    strokeWeight: 0,
    rotation: 0,
    scale: 2,
    anchor: new google.maps.Point(15, 30),
  };

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
            return (<Marker key={"Marker " + index} position={elemento.adress} icon={svgMarker} />)
          })}

        </GoogleMap>
      </Box>

      <StandaloneSearchBox >
        <input
          type='text'
          placeholder='find your address'
          ref={PlaceRef}
          style={{
            boxSizing: `border-box`,
            border: `1px solid transparent`,
            padding: `0 12px`,
            borderRadius: `3px`,
            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
            fontSize: `18px`,
            outline: `none`,
            textOverflow: `ellipses`,
            position: 'absolute',
            top: '10%',
            left: '65%',
            width: `30%`,
            height: `5%`,
          }
          }
        />
      </StandaloneSearchBox>
      <IconButton
        aria-label='center back'
        icon={<FaSearchLocation
          style={{
            width: `100%`,
            height: `100%`,
          }}
        />}
        isRound
        onClick={() => { Print() }}
        style={{
          boxSizing: `border-box`,
          border: `1px solid transparent`,
          padding: `0 12px`,
          borderRadius: `3px`,
          boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
          fontSize: `100%`,
          outline: `none`,
          textOverflow: `ellipses`,
          position: 'absolute',
          top: '10%',
          left: '95%',
          width: `3%`,
          height: `5%`,
        }
        }
      />
     
     <div className='GoogleMapPlacesSearch'
      style={{position: 'absolute',
      top: '20%',
      left: '65%',
      width: `33%`}}>
    
      {coordinates.map((elemento, index) => {
        console.log(elemento)
        console.log(elemento.name)
        return (<Button 
          colorScheme='pink' type='submit' key={"adress" + elemento.address} >
          {elemento.name}
        </Button>)
      })}
     </div>
    </Flex >
  )
}


export default Map
