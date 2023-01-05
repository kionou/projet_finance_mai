let username = document.getElementById('uname');
let password = document.getElementById('pass');

let form = document.querySelector('form')
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    console.log(e.target.pass.value);
    validateform()

})

        let flag = 1;

        function validateform() {
    
            
            if (username.value == "") {
                document.getElementById('u1').innerHTML = "User Name is Empty";
                flag = 0;
            }
            else if (username.value.length < 5) {
                document.getElementById('u1').innerHTML = "User Name required minimum 3 characters";
                flag = 0;
            }
            else {
                document.getElementById('u1').innerHTML = " ";
            }
            if (password.value == "") {
                document.getElementById('u2').innerHTML = "Password is Empty";
                flag = 0;
            }
            else {
                document.getElementById('u2').innerHTML = " ";
            }
            if (flag) {
                let dataUser={
                nom:username.value,
                password:password.value
                
                }
                console.log(dataUser);
                fetch('http://localhost:3000/admin', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(dataUser),
                }).then(res => res.json())
                    .then(data => {
                     console.log('data',data.alert);
                     if (data.alert) {
                        document.getElementById('u2').innerHTML = data.alert;
                        
                     } else {
                        window.location.href = "/admin/dashboard"
                     }
                    })
                    .catch(e => this.message = e?.message)
                    .then(() => {
                        // this.loading = false
                        // this.show = true
                        // this.hide()
                    })
            }
            else {
                console.log('hhhh',flag);
                return false;
            }
        }