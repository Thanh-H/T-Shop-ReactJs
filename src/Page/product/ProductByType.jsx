import React from 'react'
import { Footer } from '../../component/footer/Footer'
import { Header } from '../../component/header/Header'
import { Products } from '../homePage/products/Products'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'

export const ProductByType = () => {
    let { productType } = useParams()

    let [nameProduct, setNameProduct] = useState()
    useEffect(() => {
        if (productType === 'all') {
            setNameProduct('Tất cả')
        }

        if (productType === 'keyChain') {
            setNameProduct('Móc khóa')

        }
        if (productType === 'clothes') {
            setNameProduct('Quần áo')

        }
        if (productType === 'watch') {
            setNameProduct('Đồng hồ')

        }

    }, [productType])
    document.title = `${nameProduct}`

    return (
        <div className='product-by-type-container'>
            <Header />
            <Products
                productType={`${productType}`}
                nameProduct={`${nameProduct}`}
            />
            <Footer />
        </div>
    )
}
