$(document).ready(function () {

    for (let i = 0; i < $('.btn-success').length; i++) {
        $('.btn-success')[i].addEventListener('click', addToCart)
    }

    function addToCart(event) {

        let itemContainer = document.createElement('tr')
        let btn = event.target
        let btnsubParent = btn.parentElement.parentElement
        let btnParent = btn.parentElement
        let itemImage = btnsubParent.children[0].src
        let itemName = btnParent.children[0].innerText
        let itemPrice = btnParent.children[1].innerText

        itemContainer.innerHTML = `
        <td><input class="uk-checkbox" type="checkbox" style="display: none;"></td>
        <td><img class="uk-preserve-width uk-border-circle" src=${itemImage} width="40" alt=""></td>
        <td class="uk-table-link">
            <h5 class = "nama-item">${itemName}</h5></td>
        <td class="uk-text-truncate harga-item"><h5>${itemPrice}</h5></td>
        <td><input type = 'number' class='form-control text-end num' value = '1'></td>
        <td class="uk-text-truncate total-price"><h5>${itemPrice}</h5></td>
        <td><button type="button" class="btn btn-danger">Remove</button></td>
        `
        $('tbody')[0].append(itemContainer)
        for (let i = 0; i < $('.num').length; i++) {
            $('.num')[i].value = 1
            $('.num')[i].addEventListener('change', totalCost)
        }
        for (let i = 0; i < $('.btn-danger').length; i++) {
            $('.btn-danger')[i].addEventListener('click', removeItem)
        }
        subTotal()
    }

    function totalCost(event) {
        let quantity = event.target
        quantity_parent = quantity.parentElement.parentElement
        price_field = quantity_parent.getElementsByClassName('harga-item')[0]
        total_field = quantity_parent.getElementsByClassName('total-price')[0]
        price_field_content = price_field.innerText.replace('$', '')
        total_field.children[0].innerText = quantity.value * price_field_content
        subTotal()
        if (isNaN(quantity.value) || quantity.value <= 0) {
            quantity.value = 1
        }
    }

    function subTotal() {
        let total = 0
        let sub_total = $('.sub-total')[0]
        all_total_fields = $('.total-price')
        for (let i = 0; i < all_total_fields.length; i++) {
            all_prices = Number(all_total_fields[i].innerText.replace('$', ''))
            total += all_prices
        }
        sub_total.children[0].innerText =total
        console.log (total)
    }

    $('#tax_perc').on('change', function () {
        var sub_total = $('#sub_total').text()
        var tax = $('#tax_amount').text()

        var perc = $(this).val()
        perc = perc > 0 ? perc : 0;

        var tax = parseFloat(perc / 100) * parseFloat(sub_total);
        $('#tax_amount').text(tax.toFixed(2))
        
        var total = parseFloat(sub_total) + parseFloat(tax) 
        $('#total').text(total.toFixed(2))
    })

    $('#service_perc').on('change', function () {
        var perc = $(this).val()
        perc = perc > 0 ? perc : 0;
        var sub_total = $('#sub_total').text()

        var tax = parseFloat(perc / 100) * parseFloat(sub_total);
        $('#service_amount').text(tax.toFixed(2))
        calc_total()
    })

    function calc_total() {
        var sub_total = $('#sub_total').text()
        var tax = $('#tax_amount').text()
        var service = $('#service_amount').text()

        var total = parseFloat(sub_total) + parseFloat(tax) + parseFloat(service)

        $('#total').text(total.toFixed(2))
    }

    function removeItem(event) {
        del_btn = event.target
        del_btn_parent = del_btn.parentElement.parentElement
        del_btn_parent.remove()
        console.log(del_btn)
        subTotal()
    }
})
