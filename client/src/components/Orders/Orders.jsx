import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { searchProductId, getOrders, searchNameProduct } from '../../redux/actions/index'
import { Card, TableRow,  TableContainer, TableCell, TableBody, Table, Button, Modal, Box } from '@mui/material';
import s from "./Order.module.css"
import { useHistory } from 'react-router-dom';
// import empty from '../styles/assets/emptyorders.png'
// import { CartContext } from './CartContext';
// import { darkModeContext } from '../DarkModeContext';
import Comments from "../Comments/Comments";

function Orders() {
  const dispatch = useDispatch()
  const navigate = useHistory()    
  const ordersArr = useSelector(state => state.orders)
  const product = useSelector((state) => state.products);
  console.log(product,"soy products")
  const user = useSelector(state=>state.user_login)
  let userOrders = ordersArr?.filter((data) => data.userId === user.id)
  console.log(userOrders, "userOrders")
    // console.log(JSON.parse(localStorage.getItem(CARRY_LOCALHOST)))
    
  useEffect(() => {
    dispatch(getOrders())
    // dispatch(getChecklogin())
    dispatch(searchNameProduct())
    dispatch(searchProductId())
  }, [])

  function handleClick(e){
    e.preventDefault();
    navigate.replace('/')
    window.location.reload()
  }

  function Row(props) {
    const { row, orderID,allStocks } = props
    console.log(row ,"soy row")
    const [open, setOpen] = useState(false);
    const [ openReview, setOpenReview ] = useState(false);
    // console.log(openReview)
    const handleOpenReview = () => {
      setOpenReview(true);
    };
    const handleCloseReview = () => {
      setOpenReview(false);
    };
    return <>

      <TableRow key={row.id}>
        {product.map((product) => {
          return <TableCell className={""}  key={product.name}>{product.productId}</TableCell>
        })}

        <TableCell className={""} key={row.amount}>Amount:{row.amount}</TableCell>   
        <TableCell className={""} key={row.value}>${row.value}</TableCell> 
       
          <Button onClick={handleOpenReview} disabled={row.review === true}>Review</Button>
            <Modal open={openReview} onClose={handleCloseReview}>
              <Box className={""}>
                <Button onClick={handleCloseReview}>X</Button>
                <Comments detail={row && row} orderID={orderID} productId={row.productId} allStocks={allStocks} setOpenReview={setOpenReview} />
              </Box>
            </Modal>

        {/* <TableCell className={""}>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
            {open ? <KeyboardArrowUpIcon color='primary' /> : <KeyboardArrowDownIcon color='primary' />}
          </IconButton>
        </TableCell> */}
      </TableRow>

      {/* <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell s={{ paddingBottom: 15, paddingTop: 15 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <h3 className={ ""}>More Details</h3>
            <Table size='small'>
              <TableHead>
                <TableRow>
                  <TableCell key='origin' className={""}>Origin</TableCell>
                  <TableCell key='destination' className={""}>Destination</TableCell>
                  <TableCell key='arrival' className={""}>Arrival Hour</TableCell>
                  <TableCell key='departure' className={""}>Departure Hour</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell key={row.moreinfo.origin} className={""}>{row.moreinfo.origin}</TableCell>
                  <TableCell key={row.moreinfo.destination} className={""}>{row.moreinfo.destination}</TableCell>
                  <TableCell key={row.moreinfo.arrivalHour} className={""}>{row.moreinfo.arrivalHour}</TableCell>
                  <TableCell key={row.moreinfo.departureHour} className={""}>{row.moreinfo.departureHour}</TableCell>
                </TableRow>
              </TableBody>
  
            </Table>
          </Collapse>  
        </TableCell> 
      </TableRow>                         */}
    </>
  }

  return (
    <div className={ ""}>
        <Button 
          variant="contained"
          color='primary'
          onClick={(e)=>handleClick(e)}>Go back to home</Button>
        <h1 className={ ""}>Your orders</h1>

      {  console.log(userOrders,"userOrders")}

        { userOrders.length ? userOrders.map((data)=>{
            return (
              <>
              <Card className={ ""} sx={{ minWidth: 275 }} key={data.id}>

                  <h3 className={ ""}>Order nº{data.id}</h3>
                  <strong><h5 className={ ""}>Purchase id: #{data.idpurchase}</h5></strong> 
                  {data.creationdate && <h5 className={ ""}>Purchase date: {data.creationdate}</h5>}  
                  <div className={s.id_container}>
                    <p className={ ""}>Total paid: $ {data.price}</p>    
                    {data.idpurchase && <span className={""}>Payment status: confirmed</span>}     
                  </div>  

                <TableContainer>

                  <Table>
                    {/* <TableHead>
                      <TableRow>
                        <TableCell key='airline' className={""}><strong>Airline</strong></TableCell>
                        <TableCell key='amount' className={""}><strong>Amount</strong></TableCell>
                        <TableCell key='value' className={""}><strong>Value</strong></TableCell>
                        <TableCell key='review' className={""}><strong>Review</strong></TableCell>
                        <TableCell key='moreinfo' className={""}><strong>More info</strong></TableCell>                        
                      </TableRow>
                    </TableHead> */}

                    <TableBody key={data.id}>
                      {console.log(data.stocks,"soy data")}
        
                      {
                        data.stocks?.map((stock)=>{
                        return (<Row key={data.id} row={stock} orderID={data.id} allStocks={data.stocks}/>)
                        })
                      }  
                    </TableBody> 
                    
                  </Table>
                </TableContainer>
                <br />

              </Card>
              </>
          )
        })
      : (
      <div className={ ""}>
        <h3 className={ ""}>You haven't made any purchases yet. Once you purchase an item, it will show up here.</h3>

      </div>)}
    </div>
  )
}

export default Orders