
async function meow() {
    // Send a request to the server
    fetch('http://localhost:3000/facedata', {
        method: 'POST', // or 'GET' depending on your server configuration
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Server response:', data);
            // You can handle the response from the server here
            window.open('teachers_home.html', '_self');
        })
        .catch((error) => {
            console.error('Error:', error);
        });

}

var count = 0;



function myfunc()
{
    
    fetch('data.json')
    .then(response => response.json())
    .then(data => {
        // Log the data to the console
        console.log(data);
        console.log(data.name)
        
    
    


    if( data.name == "failed" )
    {
        count++;
        if( count < 15)
        {
            count++;
        }
        else
        {
            count = 0;

            data.name = "no person";

            alert("failed");

            const dataset = {
                name: "no person"
            };
            
            // Convert data to JSON string
            const jsonData = JSON.stringify(dataset);

            // Send JSON data to server
            fetch('http://localhost:3000/saveData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: jsonData,
            })
            .then(response => response.text())
            .then(data => {
                console.log('Data saved on server:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }

    }


    if( data.name != "no person" && data.name != "failed")
    {
        count =0;//debug

        console.log("login success");

        id = data.name[1];
        console.log(id);
        login_teacher( id);

        alert("SUCESS");

        const dataset = {
            name: "no person"
        };
        
        // Convert data to JSON string
        const jsonData = JSON.stringify(dataset);

        // Send JSON data to server
        fetch('http://localhost:3000/saveData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: jsonData,
        })
        .then(response => response.text())
        .then(data => {
            console.log('Data saved on server:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });



        window.open('teachers_home.html', '_self');
        console.log("completed");

    }





    })
    .catch(error => {
        console.error('Error:', error);
    });





}


setInterval(myfunc, 1000);








function fetchuserdata() {
    var username = document.getElementById("username").value;

    var password = document.getElementById("password").value;

    console.log(username);

    fetch('http://localhost:3000/teacherdata') // Replace with your server URL
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');

            }
            return response.json();
        })
        .then(data => {

            // Process the retrieved data
            // console.log(data);
            const x = Object.entries(data);

            for (let index = 0; index < x.length; index++) {
                const element = x[index][1];
                const tempdata = Object.entries(element);


                if (tempdata[8][1] == username) {
                    if (tempdata[9][1] == password) {
                        login_teacher(tempdata[0][1]);
                        console.log("data send success");
                        window.open('teachers_home.html', '_self');

                    }
                }


            }


        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            alert("Server is offline or there was a network error. Please try again later.");
        });
}




function login_teacher(data) {

    fetch('http://localhost:3000/LOGINdata', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data: data })
    })
        .then(response => response.text())
        .then(message => {
            console.log(message);
        })
        .catch(error => console.error('Error:', error));

}










