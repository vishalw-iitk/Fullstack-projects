if (document.readyState == 'loading'){
	document.addEventListner('DOMContentLoaded', ready)
}else{
	ready()
}


function ready(){
    updatethetotal()

    const remove = document.getElementsByClassName('remove')

    for(var i=0; i<remove.length; i++){
        remove[i].addEventListener('click', remover)
    }

    function remover(event){
        const remv = event.target
        remv.parentElement.remove()
        updatethetotal()
    }

    function updatethetotal(){
        const price = document.getElementsByClassName('item-price')
        const qty = document.getElementsByClassName('item-quantity')
        var total = 0
        for(var i=0; i<price.length; i++){
            total = total + price[i].innerText.replace('Rs. ','') * qty[i].value
        }
        console.log(total)
        document.getElementsByClassName('total')[0].innerText = 'Rs. ' + total
    }

    var qty_inputs = document.getElementsByClassName('item-quantity')
    for(var i=0; i<qty_inputs.length ; i++){
        qty_inputs[i].addEventListener('change', qty_change)
    }
    function qty_change(event){
        var input_changed = event.target
        if(isNaN(input_changed.value) || input_changed.value <= 0){
            input_changed.value = 1
        }
        updatethetotal()
    }

    const add_it = document.getElementsByClassName('add-it')
    for(var i=0; i<add_it.length; i++){
        add_it[i].addEventListener('click', book_it_clicked)
    }

    function book_it_clicked(event){
        const adder = event.target
        var item = adder.parentElement.parentElement
        const vehicle_heading = item.getElementsByClassName('veh-head')[0].innerText
        // console.log(vehicle_heading)
        const vehicle_price = item.getElementsByClassName('veh-price')[0].innerText
        // console.log(vehicle_price)
        vehicle_image = item.getElementsByTagName("img")[0].getAttribute("src")
        // const img_link = vehicle_image.
        // console.log(vehicle_image)
        add_to_cart(vehicle_heading, vehicle_image, vehicle_price)
        // updatethetotal()
    }
    function add_to_cart(vehicle_heading, vehicle_image, vehicle_price){
        const cart_container = document.getElementsByClassName('cart-container')[0]
        console.log(cart_container)
        if(cart_container.childElementCount === 1){
            add_the_cart_row(vehicle_heading, vehicle_image, vehicle_price)
            return
        }
        else if(cart_container.childElementCount > 1){
            // for(var i=1; i<cart_container.childElementCount; i++){
                const item_row_in_cart = cart_container.getElementsByClassName('item')
                for(var i=0; i < item_row_in_cart.length; i++){
                    if(item_row_in_cart[i].innerText === vehicle_heading){
                        var qty_of_that_product = item_row_in_cart[i].parentElement.getElementsByClassName('item-quantity')[0].value
                        item_row_in_cart[i].parentElement.getElementsByClassName('item-quantity')[0].value = parseInt(qty_of_that_product) + 1
                        updatethetotal()
                        return
                    }
                }
                // [0].innerText
                console.log(vehicle_heading)
            }
        add_the_cart_row(vehicle_heading, vehicle_image, vehicle_price)
        }

    function add_the_cart_row(vehicle_heading, vehicle_image, vehicle_price){
        var cartRow = document.createElement('div')
        cartRow.classList.add('cart-row')
        var cart_container = document.getElementsByClassName('cart-container')[0]
        var cartRowContents = `
                <span class="ele item">
                    <img src=${vehicle_image}>
                    ${vehicle_heading}
                </span>
                <span class="ele item-price">${vehicle_price}</span>
                <input type="number" class="ele item-quantity" value=1></input>
                <button class="ele remove">Remove</button>
        `
        cartRow.innerHTML = cartRowContents
        console.log(cartRow.innerHTML)
        cart_container.append(cartRow)
        cartRow.getElementsByClassName('remove')[0].addEventListener('click', remover)
        cartRow.getElementsByClassName('item-quantity')[0].addEventListener('change', qty_change)
        updatethetotal()
    }

    const purchase = document.getElementsByClassName('purchase')[0]
    purchase.addEventListener('click', pay_the_fees)
    function pay_the_fees(event){
        alert("Payment completed. Total reset to ZERO")
        var cart_items = document.getElementsByClassName('cart-row')
        while(cart_items.length > 1){
            cart_items[cart_items.length-1].remove()
        }
        updatethetotal()
    }
    
    

}
