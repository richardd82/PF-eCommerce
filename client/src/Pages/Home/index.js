import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getProductsApi } from "../../src/redux/actions";

export default function Home() {
    const dispatch = useDispatch()
    const allProducts = useSelector((state) => state.products)

    useEffect(() => {
        dispatch(getProductsApi())
    },[dispatch])

    return (
        <div>
            {
            allProducts?.map(p => {
                return(
                    <Card />
                )
            })
            }
        </div>
    )
}