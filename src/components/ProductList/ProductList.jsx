import React, { useCallback } from "react";
import './ProductList.css'
import ProductItem from "../ProductItem/ProductItem";
import { useTelegram } from "../../hooks/useTelegram";
import { useState } from "react";

const products = [
    {id: '1', title: 'item1', price: 100, description: 'description1'},
    {id: '2', title: 'item2', price: 200, description: 'description2'},
    {id: '3', title: 'item3', price: 300, description: 'description3'},
]

const getTotalPrice = (items) => {
    
    return items.reduce((acc, item) => {
        return acc += item.price
    }, 0)
}

const ProductList = () => {
    const [addedItems, setAddedItems] = useState([])
    const {tg, queryId} = useTelegram();
    
    const onSendData = useCallback(() => {
        const data = {
            products: addedItems,
            totalPrice: getTotalPrice(addedItems),
            queryId,
        }

        fetch('https://localhost:8000', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',                
            },
            body: JSON.stringify(data)
        })
    }, [addedItems, queryId])

    const handleStarsPayment = useCallback(async () => {
        try {
            const totalPrice = getTotalPrice(addedItems);
            
            const response = await fetch('https://localhost:8000/create-invoice', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    products: addedItems,
                    totalPrice: totalPrice,
                    currency: 'XTR', 
                    queryId
                })
            });

            const { invoice_link } = await response.json();

            tg.openInvoice(invoice_link, (status) => {
                if (status === 'paid') {
                    console.log('Оплата прошла успешно!');
                    setAddedItems([]);
                    tg.MainButton.hide();
                    
                    tg.showAlert('Оплата прошла успешно!');
                } else if (status === 'cancelled') {
                    console.log('Оплата отменена');
                    tg.showAlert('Оплата отменена');
                } else if (status === 'failed') {
                    console.log('Ошибка оплаты');
                    tg.showAlert('Ошибка оплаты');
                }
            });
        } catch (error) {
            console.error(error);
            tg.showAlert('Ошибка при создании инвойса');
        }
    }, [addedItems, tg, queryId]);

    const onAdd = (product) => {
        const alreadyAdded = addedItems.find(item => item.id === product.id);
        let newItems = [];

        if(alreadyAdded) {
            newItems = addedItems.filter(item => item.id !== product.id)
        } else {
            newItems = [...addedItems, product]
        }

        setAddedItems(newItems);

        if(newItems.length === 0) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
            tg.MainButton.setParams({
                text: `Купить за ${getTotalPrice(newItems)} ⭐`
            });
            
            tg.MainButton.onClick(handleStarsPayment);
        }
    }

    return (
        <div className={'list'}>
            {products.map(item => (
                <ProductItem
                    key={item.id}
                    product={item}
                    onAdd={onAdd}
                    className={'item'}
                />
            ))}
        </div>
    )
}

export default ProductList;