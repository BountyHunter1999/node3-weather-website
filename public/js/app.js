const url = 'http://localhost:3000/weather?address=Kahun,Pokhara'

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => { // form submit vayo ki vayana check hanxa
    e.preventDefault() // refersh huna dinna page lai submit vayasi
    
    const location = search.value
    
    message1.textContent = 'Loading...'
    message2.textContent = ''
    
    fetch('http://localhost:3000/weather?address=' + location).then((response) =>{ // tya bata response ayasi call back run hunxa
        response.json().then(data => { // json data auxa parse hunxa ani balla run hunxa tyo callback (object)
            // console.log(data.error)
            if (data.error){
                    return message1.textContent = data.error
                }
            
            message1.textContent = data.location
            message2.textContent = data.forecast
        })
    })
    
})